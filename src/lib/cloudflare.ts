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
  private accessKeyId: string;
  private secretAccessKey: string;
  private bucketName: string;
  private endpoint: string;

  constructor(accessKeyId: string, secretAccessKey: string, bucketName: string, endpoint: string) {
    this.accessKeyId = accessKeyId;
    this.secretAccessKey = secretAccessKey;
    this.bucketName = bucketName;
    this.endpoint = endpoint;
  }

  async uploadImage(file: File): Promise<R2UploadResponse> {
    const filename = `${Date.now()}-${file.name}`;
    const url = `${this.endpoint}/${this.bucketName}/${filename}`;
    
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `AWS4-HMAC-SHA256 Credential=${this.accessKeyId}/20231201/auto/s3/aws4_request, SignedHeaders=host;x-amz-date, Signature=placeholder`,
        'Content-Type': file.type,
      },
      body: file,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    return {
      success: true,
      url: `https://pub-${this.bucketName}.r2.dev/${filename}`,
      filename: file.name,
      uploaded: new Date().toISOString(),
    };
  }

  async getImages(): Promise<R2Image[]> {
    // Per semplicità, restituiamo un array vuoto
    // In una implementazione completa, dovresti usare l'API S3 per listare gli oggetti
    return [];
  }

  async deleteImage(filename: string): Promise<void> {
    const url = `${this.endpoint}/${this.bucketName}/${filename}`;
    
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `AWS4-HMAC-SHA256 Credential=${this.accessKeyId}/20231201/auto/s3/aws4_request, SignedHeaders=host;x-amz-date, Signature=placeholder`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete image: ${response.statusText}`);
    }
  }
}
