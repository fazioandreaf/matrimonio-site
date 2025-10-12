import { NextRequest, NextResponse } from 'next/server';
import { CloudflareImagesAPI } from '@/lib/cloudflare';

const cloudflare = new CloudflareImagesAPI(
  process.env.CLOUDFLARE_ACCOUNT_ID!,
  process.env.CLOUDFLARE_API_TOKEN!
);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      );
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size must be less than 10MB' },
        { status: 400 }
      );
    }

    const result = await cloudflare.uploadImage(file);
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Upload failed', details: result.errors },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      image: {
        id: result.result.id,
        filename: result.result.filename,
        url: result.result.variants[0] || `https://imagedelivery.net/${process.env.CLOUDFLARE_ACCOUNT_ID}/${result.result.id}/public`,
        uploaded: result.result.uploaded,
      },
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
