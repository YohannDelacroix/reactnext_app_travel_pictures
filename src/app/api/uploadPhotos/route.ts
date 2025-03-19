import { NextResponse } from "next/server";
import AWS from "aws-sdk";
import { Readable } from "stream";
import { s3 } from "@/../libs/awsConfig";

// Upload function to S3
const uploadToS3 = async (fileBuffer: Buffer, fileName: string, mimeType: string): Promise<string> => {
    const params: AWS.S3.PutObjectRequest = {
        Bucket: process.env.AWS_S3_BUCKET_NAME as string,
        Key: `photos/${Date.now()}-${fileName}`,
        Body: Readable.from(fileBuffer),
        ContentType: mimeType,
        ACL: "private",
    };

    const uploadResult = await s3.upload(params).promise();
    return uploadResult.Key; //Only returns the S3 path
};

// API POST Route handler api/uploadPhotos
export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const files = formData.getAll("photos") as File[];

        const uploadedPaths: { [key: string]: string } = {};

        if (!files || files.length === 0) {
            return NextResponse.json({ error: "No file have been sent" }, { status: 400 });
        }

        // Upload each files and store the paths
        await Promise.all(
            files.map(async (file) => {
                const buffer = await file.arrayBuffer();
                const path = await uploadToS3(Buffer.from(buffer), file.name, file.type);
                uploadedPaths[file.name] = path;
            })
        );

        return NextResponse.json({ paths: uploadedPaths }, { status: 200 });
    } catch (error) {
        console.error("Error while uploading file", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
