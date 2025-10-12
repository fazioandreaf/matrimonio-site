import { S3Client, PutObjectCommand, ListObjectsV2Command, DeleteObjectCommand } from '@aws-sdk/client-s3';

export interface R2UploadResponse {
  success: boolean;
  url: string;
  filename: string;
  uploaded: string;
}

export interface R2Image {
  id: string;
  filename: string;
  url: string;
  uploaded: string;
}

export class CloudflareR2API {
  private s3Client: S3Client;
  private bucketName: string;

  constructor(accessKeyId: string, secretAccessKey: string, bucketName: string, endpoint: string) {
    this.bucketName = bucketName;
    this.s3Client = new S3Client({
      region: 'auto',
      endpoint: endpoint,
      credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      },
    });
  }

  async uploadImage(file: File): Promise<R2UploadResponse> {
    const filename = `${Date.now()}-${file.name}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: filename,
      Body: buffer,
      ContentType: file.type,
    });

    await this.s3Client.send(command);

    return {
      success: true,
      url: `https://pub-${this.bucketName}.r2.dev/${filename}`,
      filename: file.name,
      uploaded: new Date().toISOString(),
    };
  }

  async getImages(): Promise<R2Image[]> {
    try {
      const command = new ListObjectsV2Command({
        Bucket: this.bucketName,
      });

      const response = await this.s3Client.send(command);
      
      if (!response.Contents) {
        return [];
      }

      const images: R2Image[] = response.Contents.map((object) => ({
        id: object.Key!,
        filename: object.Key!.split('-').slice(1).join('-'), // Remove timestamp prefix
        url: `https://pub-${this.bucketName}.r2.dev/${object.Key}`,
        uploaded: object.LastModified?.toISOString() || new Date().toISOString(),
      }));

      return images;
    } catch (error) {
      console.error('Error fetching images from R2:', error);
      return [];
    }
  }

  async deleteImage(filename: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: filename,
    });

    await this.s3Client.send(command);
  }
}
