"use client";

import { useState } from "react";
import Image from "next/image";
import { Download } from "lucide-react";
import type { ImageData } from "@/hooks/useGalleryImages";

interface GalleryImageCardProps {
	image: ImageData;
	onClick: () => void;
	onDownload: () => void;
}

export default function GalleryImageCard({
	image,
	onClick,
	onDownload,
}: GalleryImageCardProps) {
	const [loaded, setLoaded] = useState(false);

	return (
		<div
			className={`break-inside-avoid bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden border border-amber-400/20 hover:shadow-xl transition-all duration-500 mb-4 ${
				loaded
					? "opacity-100 translate-y-0"
					: "opacity-0 translate-y-4"
			}`}
		>
			<div className="relative group">
				<div onClick={onClick} className="cursor-pointer">
					<Image
						src={image.url}
						alt={image.filename}
						width={400}
						height={600}
						className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
						sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
						onLoad={() => setLoaded(true)}
					/>
				</div>
				<div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
				<button
					onClick={(e) => {
						e.stopPropagation();
						onDownload();
					}}
					className="absolute bottom-3 right-3 p-2.5 bg-teal-800/80 backdrop-blur-sm text-white rounded-full hover:bg-teal-700 active:bg-teal-600 transition-all duration-200 shadow-lg md:opacity-0 md:group-hover:opacity-100 md:translate-y-2 md:group-hover:translate-y-0"
					title="Scarica immagine"
				>
					<Download className="h-4 w-4" />
				</button>
			</div>
		</div>
	);
}
