import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';

const region = process.env.AWS_REGION;
const bucketName = process.env.AWS_S3_BUCKET_NAME;

export const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export function getPublicUrl(key: string) {
  return `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;
}

function extensionFromName(name: string) {
  const match = name.match(/\.[a-zA-Z0-9]+$/);
  return match ? match[0] : '';
}

export async function uploadImage(file: File, folder: string = 'vehicles') {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const key = `td-car-centre/${folder}/${randomUUID()}${extensionFromName(file.name)}`;

  await s3Client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: buffer,
      ContentType: file.type || 'application/octet-stream',
    })
  );

  return {
    secure_url: getPublicUrl(key),
    public_id: key,
  };
}

export async function uploadPDF(file: File, folder: string = 'documents') {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const key = `td-car-centre/${folder}/${randomUUID()}.pdf`;

  await s3Client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: buffer,
      ContentType: 'application/pdf',
    })
  );

  return {
    secure_url: getPublicUrl(key),
    public_id: key,
  };
}

export async function uploadBuffer(buffer: Buffer, key: string, contentType: string) {
  await s3Client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    })
  );

  return {
    secure_url: getPublicUrl(key),
    public_id: key,
  };
}

export async function deleteImage(key: string) {
  return await s3Client.send(
    new DeleteObjectCommand({
      Bucket: bucketName,
      Key: key,
    })
  );
}
