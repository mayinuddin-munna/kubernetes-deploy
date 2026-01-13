import fs from 'fs';
import multer from 'multer';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { NextFunction, Request, Response } from 'express';
import sendResponse from '../utils/sendResponse';
import httpStatus from 'http-status';

const upload = multer({ dest: 'uploads/' });

// Extend Express Request type to include fileUrls
declare module 'express-serve-static-core' {
  interface Request {
    fileUrls?: string[];
    files?: Express.Multer.File[];
  }
}

export const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export function s3UploadMiddleware(
  s3: S3Client,
  fieldName = 'file',
  maxCount = 10,
) {
  return [
    upload.array(fieldName, maxCount),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const files = req.files as Express.Multer.File[];
        if (!files || files.length === 0) {
          return res.status(400).json({ message: 'No files uploaded' });
        }

        const fileUrls: string[] = [];

        for (const file of files) {
          const fileStream = fs.createReadStream(file.path);
          const key = `${Date.now()}_${file.originalname}`;

          await s3.send(
            new PutObjectCommand({
              Bucket: process.env.S3_BUCKET_NAME!,
              Key: key,
              Body: fileStream,
              ContentType: file.mimetype,
            }),
          );

          fileUrls.push(
            `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
          );

          // Cleanup local file
          fs.unlinkSync(file.path);
        }

        req.fileUrls = fileUrls;
        next();
      } catch (err) {
        sendResponse(res, {
          statusCode: httpStatus.INTERNAL_SERVER_ERROR,
          success: true,
          message: 'Upload failed',
          data: err,
        });
      }
    },
  ];
}
