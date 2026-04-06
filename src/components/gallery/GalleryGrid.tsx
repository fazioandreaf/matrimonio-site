"use client";

import { useEffect, useRef } from "react";
import { Image as ImageIcon, Loader2 } from "lucide-react";
import GalleryImageCard from "./GalleryImageCard";
import type { ImageData } from "@/hooks/useGalleryImages";

interface GalleryGridProps {
	images: ImageData[];
	loading: boolean;
	hasMore: boolean;
	totalCount: number;
	onLoadMore: () => void;
	onImageClick: (image: ImageData) => void;
	onImageDownload: (image: ImageData) => void;
}

export default function GalleryGrid({
	images,
	loading,
	hasMore,
	totalCount,
	onLoadMore,
	onImageClick,
	onImageDownload,
}: GalleryGridProps) {
	const sentinelRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!hasMore || loading) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					onLoadMore();
				}
			},
			{ rootMargin: "200px" }
		);

		const sentinel = sentinelRef.current;
		if (sentinel) observer.observe(sentinel);

		return () => {
			if (sentinel) observer.unobserve(sentinel);
		};
	}, [hasMore, loading, onLoadMore]);

	if (loading) {
		return (
			<div className="py-8">
				<div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
					{Array.from({ length: 8 }).map((_, i) => (
						<div
							key={i}
							className="break-inside-avoid mb-4 bg-white/60 rounded-xl overflow-hidden border border-amber-400/10 animate-pulse"
						>
							<div
								className="bg-amber-100/50"
								style={{
									height: `${200 + (i % 3) * 80}px`,
								}}
							/>
						</div>
					))}
				</div>
			</div>
		);
	}

	if (images.length === 0) {
		return (
			<div className="text-center py-16">
				<ImageIcon className="mx-auto h-16 w-16 text-amber-400/40 mb-4" />
				<p className="text-amber-900 text-lg font-medium">
					Nessuna foto ancora
				</p>
				<p className="text-amber-800/60 mt-1">
					Inizia caricando la prima foto!
				</p>
			</div>
		);
	}

	return (
		<div>
			{totalCount > 0 && (
				<p className="text-amber-800/60 text-sm mb-4">
					{totalCount} foto condivise
				</p>
			)}

			<div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
				{images.map((image) => (
					<GalleryImageCard
						key={image.id}
						image={image}
						onClick={() => onImageClick(image)}
						onDownload={() => onImageDownload(image)}
					/>
				))}
			</div>

			{hasMore && (
				<div ref={sentinelRef} className="flex justify-center py-8">
					<Loader2 className="h-6 w-6 text-amber-800/40 animate-spin" />
				</div>
			)}
		</div>
	);
}
