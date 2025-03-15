import { NextResponse } from "next/server";
import { s3 } from "@/../libs/awsConfig"

// Function to generate a signed URL
const generateSignedUrl = async (fileName: string): Promise<string> => {
    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME as string,
        Key: `${fileName}`,
        Expires: 3600,
    };

    console.log("🔍 Request to S3 with:", params);

    return s3.getSignedUrlPromise("getObject", params);
};

// Next.js API Route to get a signed URL
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const fileName = searchParams.get("fileName");

        if (!fileName) {
            console.error("Error: No fileName provided");
            return NextResponse.json({ error: "File name is missing" }, { status: 400 });
        }

        console.log("Generating the signed URL for:", fileName);
        
        const signedUrl = await generateSignedUrl(fileName);
        console.log("Signed URL generated:", signedUrl);

        return NextResponse.json({ url: signedUrl }, { status: 200 });
    } catch (error) {
        console.error("Error during signed URL generation:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
