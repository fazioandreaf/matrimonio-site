"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { X, Download, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import type { ImageData } from "@/hooks/useGalleryImages";

interface ImageModalProps {
	image: ImageData;
	images: ImageData[];
	onClose: () => void;
	onNavigate: (image: ImageData) => void;
	onDownload: (image: ImageData) => void;
	isDeleteEnabled?: boolean;
	onDelete?: (image: ImageData) => void;
}

export default function ImageModal({
	image,
	images,
	onClose,
	onNavigate,
	onDownload,
	isDeleteEnabled,
	onDelete,
}: ImageModalProps) {
	const currentIndex = images.findIndex((img) => img.id === image.id);
	const hasPrev = currentIndex > 0;
	const hasNext = currentIndex < images.length - 1;

	const goPrev = useCallback(() => {
		if (hasPrev) onNavigate(images[currentIndex - 1]);
	}, [hasPrev, currentIndex, images, onNavigate]);

	const goNext = useCallback(() => {
		if (hasNext) onNavigate(images[currentIndex + 1]);
	}, [hasNext, currentIndex, images, onNavigate]);

	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "unset";
		};
	}, []);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
			if (e.key === "ArrowLeft") goPrev();
			if (e.key === "ArrowRight") goNext();
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [onClose, goPrev, goNext]);

	return (
		<div
			className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
			onClick={onClose}
		>
			<div className="absolute top-4 left-4 z-10 flex items-center gap-2">
				<button
					onClick={(e) => {
						e.stopPropagation();
						onDownload(image);
					}}
					className="px-4 py-2.5 bg-black/40 backdrop-blur-sm text-white rounded-full hover:bg-black/60 active:bg-black/70 transition-colors flex items-center gap-2 text-sm font-medium"
				>
					<Download className="h-5 w-5" />
					Scarica
				</button>

				{isDeleteEnabled && onDelete && (
					<button
						onClick={(e) => {
							e.stopPropagation();
							if (window.confirm("Sei sicuro di voler eliminare questa foto?")) {
								onDelete(image);
							}
						}}
						className="px-4 py-2.5 bg-red-600/80 backdrop-blur-sm text-white rounded-full hover:bg-red-700 active:bg-red-800 transition-colors flex items-center gap-2 text-sm font-medium"
					>
						<Trash2 className="h-5 w-5" />
						Elimina
					</button>
				)}
			</div>

			<button
				onClick={onClose}
				className="absolute top-4 right-4 p-3 bg-black/40 backdrop-blur-sm text-white rounded-full hover:bg-black/60 active:bg-black/70 transition-colors z-10"
			>
				<X className="h-6 w-6" />
			</button>

			{hasPrev && (
				<button
					onClick={(e) => {
						e.stopPropagation();
						goPrev();
					}}
					className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-3 bg-black/40 backdrop-blur-sm text-white rounded-full hover:bg-black/60 active:bg-black/70 transition-colors z-10"
				>
					<ChevronLeft className="h-6 w-6" />
				</button>
			)}

			{hasNext && (
				<button
					onClick={(e) => {
						e.stopPropagation();
						goNext();
					}}
					className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-3 bg-black/40 backdrop-blur-sm text-white rounded-full hover:bg-black/60 active:bg-black/70 transition-colors z-10"
				>
					<ChevronRight className="h-6 w-6" />
				</button>
			)}

			<div
				className="relative max-w-4xl max-h-full"
				onClick={(e) => e.stopPropagation()}
			>
				<Image
					src={image.url}
					alt={image.filename}
					width={1200}
					height={800}
					className="w-auto max-w-full max-h-[85dvh] object-contain rounded-lg shadow-2xl"
					sizes="100vw"
					priority
				/>

			</div>
		</div>
	);
}
