import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import tinify from 'tinify';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TinifyService {
  constructor(private readonly configService: ConfigService) {
    tinify.key = this.configService.get<string>('TINIFY_API_KEY');
  }

  async saveImage(bufferImage: Buffer, filename: string): Promise<string> {
    const aws_access_key_id = this.configService.get<string>('AWS_S3_CLIENT');
    const aws_secret_access_key = this.configService.get<string>('AWS_S3_SECRET');
    const region = this.configService.get<string>('AWS_S3_REGION');
    const bucketName = this.configService.get<string>('AWS_S3_BUCKET');
    const path = `${bucketName}/${filename}.jpeg`;

    try {
      await tinify
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
    } catch (error) {
      console.error('Error during image processing:', error.message);
      throw new Error('Failed to process image');
    }
  }

  async getImageUrl(fullBase64: string): Promise<string> {
    const base64Str = fullBase64.replace(/^data:image\/\w+;base64,/, '');
    const bufferImage = Buffer.from(base64Str, 'base64');
    const fileName = uuidv4();

    try {
      return await this.saveImage(bufferImage, fileName);
    } catch (error) {
      console.error('Error while getting image URL:', error.message);
      throw new Error('Failed to get image URL');
    }
  }
}
