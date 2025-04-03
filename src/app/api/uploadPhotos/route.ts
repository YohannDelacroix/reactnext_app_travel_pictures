/**
 * @file uploadPhotos.ts
 * @description This API route handles the upload of photos to AWS S3. It stores both the original and watermarked versions of the images.
 * 
 * ## Features:
 * - Uploads original images to S3 under the "originals" folder.
 * - Generates watermarked images with the text "Travel memories" placed at the center.
 * - Uploads watermarked images to S3 under the "watermark" folder.
 * - Returns the S3 paths of the watermarked images.
 * 
 * ## Accessing Images:
 * - By default, the response includes paths to the watermarked images.
 * - To access the original image, replace "watermark" with "originals" in the returned path.
 * 
 * @dependencies
 * - AWS SDK for S3 interactions.
 * - Sharp for image processing (watermarking).
 */

import { NextResponse } from "next/server";
import AWS from "aws-sdk";
import { Readable } from "stream";
import { s3 } from "@/../libs/awsConfig";
import sharp from "sharp";

/**
 * Uploads a file to AWS S3
 * @param fileBuffer - The file data as a Buffer
 * @param fileName - The original file name
 * @param mimeType - The MIME type of the file
 * @param shootingId - The unique ID of the shooting session
 * @param folder - The destination folder in S3 ("originals" or "watermark")
 * @returns The S3 path of the uploaded file
 */
const uploadToS3 = async (
    fileBuffer: Buffer,
    fileName: string,
    mimeType: string,
    shootingId: string,
    folder: string
): Promise<string> => {
    const params: AWS.S3.PutObjectRequest = {
        Bucket: process.env.AWS_S3_BUCKET_NAME as string,
        Key: `privateGalleries/${shootingId}/${folder}/${Date.now()}-${fileName}`,
        Body: Readable.from(fileBuffer),
        ContentType: mimeType,
        ACL: "private",
    };

    const uploadResult = await s3.upload(params).promise();
    return uploadResult.Key; // Returns only the S3 path
};

/**
 * Adds a textual watermark to an image
 * @param fileBuffer - The original image buffer
 * @returns A Buffer containing the watermarked image
 */
const addWatermark = async (fileBuffer: Buffer): Promise<Buffer> => {
    return sharp(fileBuffer)
        .composite([
            {
                input: Buffer.from(`
                    <svg width="1000" height="200">
                        <text x="50%" y="50%" font-size="120" text-anchor="middle" fill="white" opacity="0.5" font-family="Helvetica, Arial, sans-serif" font-weight="700">
                            Travel memories
                        </text>
                    </svg>
                `),
                gravity: "center"
            }
        ])
        .toBuffer();
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

        // Process each file
        await Promise.all(
            files.map(async (file) => {
                const buffer = await file.arrayBuffer();
                const fileBuffer = Buffer.from(buffer);

                // Upload the original image
                await uploadToS3(fileBuffer, file.name, file.type, shootingId, "originals");

                // Add watermark to the image
                const watermarkedBuffer = await addWatermark(fileBuffer);

                // Upload the watermarked image
                const watermarkPath = await uploadToS3(watermarkedBuffer, file.name, file.type, shootingId, "watermark");

                uploadedPaths[file.name] = watermarkPath;
            })
        );

        return NextResponse.json({ paths: uploadedPaths }, { status: 200 });
    } catch (error) {
        console.error("Error while uploading file", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
