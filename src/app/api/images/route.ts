import { NextResponse } from 'next/server';
import { CloudflareImagesAPI } from '@/lib/cloudflare';

const cloudflare = new CloudflareImagesAPI(
  process.env.CLOUDFLARE_ACCOUNT_ID!,
  process.env.CLOUDFLARE_API_TOKEN!
);

export async function GET() {
  try {
    const images = await cloudflare.getImages();
    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const imageId = searchParams.get('id');

    if (!imageId) {
      return NextResponse.json(
        { error: 'Image ID is required' },
        { status: 400 }
      );
    }

    await cloudflare.deleteImage(imageId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    );
  }
}
