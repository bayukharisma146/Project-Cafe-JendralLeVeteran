import { NextResponse } from "next/server";
import s3 from "@/lib/s3"; // Pastikan sudah ada src/lib/s3.js
import { PutObjectCommand } from "@aws-sdk/client-s3";

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get("file");
  const tab = formData.get("tab");

  if (!file || !tab) {
    return NextResponse.json({ error: "File dan tab wajib diisi" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = `gallery/${Date.now()}_${file.name}`;

  try {
    // Upload ke S3
    await s3.send(new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      Body: buffer,
      ContentType: file.type,
      ACL: "public-read",
    }));

    const url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

    return NextResponse.json({ message: "Upload berhasil", url, tab });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}