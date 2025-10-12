import { NextResponse } from 'next/server';
import { CloudflareR2API } from '@/lib/cloudflare';

const r2 = new CloudflareR2API(
  process.env.ACCCESS_KEY_ID!,
  process.env.SECRET_ACCESS_KEY!,
  'images',
  'https://c5d6065544067a918713b8af67f46e14.r2.cloudflarestorage.com'
);

export async function GET() {
  try {
    const images = await r2.getImages();
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
    const filename = searchParams.get('id');

    if (!filename) {
      return NextResponse.json(
        { error: 'Image ID is required' },
        { status: 400 }
      );
    }

    await r2.deleteImage(filename);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    );
  }
}
