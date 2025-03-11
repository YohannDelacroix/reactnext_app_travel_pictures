import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import multer from "multer";
import AWS from "aws-sdk";
import admin from "firebase-admin";
import { Readable } from "stream";
import { db } from "@/../libs/firebaseAdmin";

// AWS S3 Configuration 
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 🔹 Fonction d'upload vers S3
const uploadToS3 = async (fileBuffer: Buffer, fileName: string, mimeType: string): Promise<string> => {
    const params: AWS.S3.PutObjectRequest = {
        Bucket: process.env.AWS_S3_BUCKET_NAME as string,
        Key: `photos/${Date.now()}-${fileName}`,
        Body: Readable.from(fileBuffer),
        ContentType: mimeType,
        ACL: "private",
    };

    await s3.upload(params).promise();
    return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
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
        // 🔹 Lire la requête (form-data)
        const formData = await request.formData();
        const file = formData.get("photo") as File | null;

        if (!file) {
            return NextResponse.json({ error: "Aucun fichier fourni" }, { status: 400 });
        }

        // 🔹 Convertir le fichier en Buffer
        const fileBuffer = await streamToBuffer(file.stream());

        // 🔹 Upload vers AWS S3
        const imageUrl = await uploadToS3(fileBuffer, file.name, file.type);

        // 🔹 Sauvegarde dans Firebase Firestore
        const newPhotoRef = await db.collection("photos").add({
            url: imageUrl,
            createdAt: new Date(),
        });

        return NextResponse.json({ success: true, id: newPhotoRef.id, imageUrl }, { status: 200 });
    } catch (error) {
        console.error("Erreur lors de l'upload :", error);
        return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 });
    }
}

