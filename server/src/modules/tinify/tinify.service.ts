import { Injectable } from '@nestjs/common';
import tinify from 'tinify';
import * as process from 'process';
@Injectable()
export class TinifyService {
  tinypng = tinify;
  constructor() {
    this.tinypng.key = process.env.TINIFY_API_KEY;
  }
  async saveImage(bufferImage: Buffer, filename: string) {
    const aws_access_key_id = process.env.AWS_S3_CLIENT;
    const aws_secret_access_key = process.env.AWS_S3_SECRET;
    const region = process.env.AWS_S3_REGION;
    const bucketName = process.env.AWS_S3_BUCKET;
    const path = `${bucketName}/${filename}.jpeg`;
    tinify
      .fromBuffer(bufferImage)
      .resize({
        method: 'cover',
        width: 70,
        height: 70,
      })
      .convert({ type: 'image/jpeg' })
      .store({
        service: 's3',
        aws_access_key_id,
        aws_secret_access_key,
        region,
        path,
      });
    return `https://${bucketName}.s3.amazonaws.com/${filename}.jpeg`;
  }
}
