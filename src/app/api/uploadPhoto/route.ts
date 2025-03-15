import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import multer from "multer";
import AWS from "aws-sdk";
import { Readable } from "stream";
import { db } from "@/../libs/firebaseAdmin";
import { s3 } from "@/../libs/awsConfig"

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 🔹 Upload function to S3
const uploadToS3 = async (fileBuffer: Buffer, fileName: string, mimeType: string): Promise<string> => {
    const params: AWS.S3.PutObjectRequest = {
        Bucket: process.env.AWS_S3_BUCKET_NAME as string,
        Key: `photos/${Date.now()}-${fileName}`,
        Body: Readable.from(fileBuffer),
        ContentType: mimeType,
        ACL: "private",
    };

    const uploadResult = await s3.upload(params).promise();
    const generatedFileName = uploadResult.Key;
    return generatedFileName;
};

// Transform a ReadableStream to a buffer
async function streamToBuffer(stream: ReadableStream<Uint8Array>): Promise<Buffer> {
    const reader = stream.getReader();
    let chunks: Uint8Array[] = [];
    let done = false;

    while (!done) {
        const { value, done: readerDone } = await reader.read();
        if (value) chunks.push(value);
        done = readerDone;
    }

    return Buffer.concat(chunks);
}

// API POST Route handler
export async function POST(request: Request) {
    try {
        // 🔹 Read the request (form-data)
        const formData = await request.formData();
        const file = formData.get("photo") as File | null;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        // 🔹 Convert the file to a Buffer
        const fileBuffer = await streamToBuffer(file.stream());

        // 🔹 Upload to AWS S3
        const pathName = await uploadToS3(fileBuffer, file.name, file.type);

        // 🔹 Save to Firebase Firestore
        const newPhotoRef = await db.collection("photos").add({
            pathName: pathName,
            createdAt: new Date(),
        });

        return NextResponse.json({ success: true, id: newPhotoRef.id, pathName }, { status: 200 });
    } catch (error) {
        console.error("Error during the upload:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
