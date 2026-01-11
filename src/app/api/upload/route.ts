import { NextRequest, NextResponse } from "next/server";
import { CloudflareR2API } from "@/lib/cloudflare";

const r2 = new CloudflareR2API(
	process.env.ACCCESS_KEY_ID!,
	process.env.SECRET_ACCESS_KEY!,
	"images",
	"https://c5d6065544067a918713b8af67f46e14.r2.cloudflarestorage.com",
	process.env.R2_PUBLIC_URL!
);

export async function POST(request: NextRequest) {
	try {
		const formData = await request.formData();
		const file = formData.get("file") as File;

		if (!file) {
			return NextResponse.json({ error: "No file provided" }, { status: 400 });
		}

		if (!file.type.startsWith("image/")) {
			return NextResponse.json(
				{ error: "File must be an image" },
				{ status: 400 }
			);
		}

		const maxSize = 10 * 1024 * 1024;
		if (file.size > maxSize) {
			return NextResponse.json(
				{ error: "File size must be less than 10MB" },
				{ status: 400 }
			);
		}

		const result = await r2.uploadImage(file);

		if (!result.success) {
			return NextResponse.json({ error: "Upload failed" }, { status: 500 });
		}

		return NextResponse.json({
			success: true,
			image: {
				id: result.filename,
				filename: result.filename,
				url: result.url,
				uploaded: result.uploaded,
			},
		});
	} catch (error) {
		console.error("Upload error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
