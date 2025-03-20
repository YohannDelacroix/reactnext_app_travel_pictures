import { NextResponse } from "next/server";
import AWS from "aws-sdk";
import { Readable } from "stream";
import { s3 } from "@/../libs/awsConfig";
import { db } from '@/../libs/firebaseAdmin';

/**
 * Uploads a file to AWS S3
 * @param fileBuffer - The file data as a Buffer
 * @param fileName - The original file name
 * @param mimeType - The MIME type of the file
 * @param shootingId - The unique ID of the shooting session
 * @returns The S3 path of the uploaded file
 */
const uploadToS3 = async (fileBuffer: Buffer, fileName: string, mimeType: string, shootingId: string): Promise<string> => {
    const params: AWS.S3.PutObjectRequest = {
        Bucket: process.env.AWS_S3_BUCKET_NAME as string,
        Key: `privateGalleries/${shootingId}/${Date.now()}-${fileName}`,
        Body: Readable.from(fileBuffer),
        ContentType: mimeType,
        ACL: "private",
    };

    const uploadResult = await s3.upload(params).promise();
    return uploadResult.Key; //Only returns the S3 path
};

/**
 * Handles the upload of multiple photos to AWS S3
 * @param request - The incoming HTTP request with form data
 * @returns JSON response with uploaded file paths or an error
 */
export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const files = formData.getAll("photos") as File[];
        const shootingId = formData.get("shootingId") as string;

        const uploadedPaths: { [key: string]: string } = {};

        // Validation: Ensure shooting ID is provided
        if (!shootingId) {
            return NextResponse.json({ error: "Missing shooting ID" }, { status: 400 });
        }

        //Validation : Ensure files are provided
        if (!files || files.length === 0) {
            return NextResponse.json({ error: "No file have been sent" }, { status: 400 });
        }

        // Upload each files and store the paths
        await Promise.all(
            files.map(async (file) => {
                const buffer = await file.arrayBuffer();
                const path = await uploadToS3(Buffer.from(buffer), file.name, file.type, shootingId);
                uploadedPaths[file.name] = path;
            })
        );

        return NextResponse.json({ paths: uploadedPaths }, { status: 200 });
    } catch (error) {
        console.error("Error while uploading file", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
