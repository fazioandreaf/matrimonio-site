"use client";

import { useState, useCallback, useEffect } from "react";
import { Camera, Info, ArrowUp } from "lucide-react";
import { useGalleryImages } from "@/hooks/useGalleryImages";
import type { ImageData } from "@/hooks/useGalleryImages";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useGalleryPolling } from "@/hooks/useGalleryPolling";
import UploadDropzone from "@/components/gallery/UploadDropzone";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import ImageModal from "@/components/gallery/ImageModal";

export default function GalleryPage() {
	const {
		images,
		loading,
		hasMore,
		loadMore,
		refreshImages,
		mergeNewImages,
		totalCount,
	} = useGalleryImages();

	const { uploading, progress, uploadFiles } =
		useImageUpload(refreshImages);

	useGalleryPolling(mergeNewImages, !uploading);

	const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
	const [showScrollTop, setShowScrollTop] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setShowScrollTop(window.scrollY > 400);
		};
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const handleDownload = useCallback(async (image: ImageData) => {
		try {
			const response = await fetch(image.url);
			const blob = await response.blob();
			const url = window.URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.download = image.filename || `matrimonio-${image.id}`;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			window.URL.revokeObjectURL(url);
		} catch (error) {
			console.error("Download error:", error);
		}
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 py-8">
			<div className="max-w-6xl mx-auto px-4">
				{/* Header */}
				<div className="text-center mb-8 animate-fade-in">
					<h1 className="font-playfair text-5xl text-amber-900 mb-3 flex items-center justify-center gap-3">
						<Camera className="h-8 w-8 text-amber-800" />
						Galleria Foto
					</h1>
					<p className="text-amber-800 text-lg">
						Condividi i tuoi momenti speciali con noi
					</p>
				</div>

				{/* How it works */}
				<section className="mb-6 py-6 px-4 bg-white/60 backdrop-blur-sm rounded-xl border border-amber-400/20">
					<div className="max-w-3xl mx-auto text-center">
						<h2 className="font-playfair text-2xl text-amber-900 mb-5">
							Come Funziona
						</h2>

						<div className="grid grid-cols-3 gap-4 md:gap-6">
							{[
								{
									n: "1",
									title: "Carica",
									desc: "Seleziona le tue foto",
								},
								{
									n: "2",
									title: "Condividi",
									desc: "Visibili a tutti gli invitati",
								},
								{
									n: "3",
									title: "Ricorda",
									desc: "Una collezione indimenticabile",
								},
							].map((step) => (
								<div key={step.n} className="text-center">
									<div className="bg-amber-400/20 border border-amber-400/40 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-2">
										<span className="text-sm font-bold text-amber-900">
											{step.n}
										</span>
									</div>
									<h3 className="font-semibold text-sm text-amber-900 mb-1">
										{step.title}
									</h3>
									<p className="text-amber-800 text-xs">
										{step.desc}
									</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Upload */}
				<UploadDropzone
					onFilesSelected={uploadFiles}
					uploading={uploading}
					progress={progress}
				/>

				{/* Grid */}
				<GalleryGrid
					images={images}
					loading={loading}
					hasMore={hasMore}
					totalCount={totalCount}
					onLoadMore={loadMore}
					onImageClick={setSelectedImage}
					onImageDownload={handleDownload}
				/>

				{/* Contact */}
				<div className="mt-12 bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-amber-400/20">
					<div className="text-center">
						<h3 className="font-playfair text-2xl font-semibold text-amber-900 mb-4 flex items-center justify-center gap-2">
							<Info className="h-6 w-6 text-amber-800" />
							Altre domande?
						</h3>
						<p className="text-amber-800 mb-6 text-lg">
							Non hai trovato la risposta che cercavi? Non
							esitare a contattarci!
						</p>
						<div className="space-y-3 text-amber-800">
							<p className="text-base">
								<strong>Email:</strong>{" "}
								<a
									href="mailto:fazioandrea.f@gmail.com"
									className="text-amber-800 hover:text-amber-700 underline transition-colors"
								>
									fazioandrea.f@gmail.com
								</a>
							</p>
							<p className="text-base">
								<strong>Telefono:</strong>{" "}
								<a
									href="tel:+393403093977"
									className="text-amber-800 hover:text-amber-700 underline transition-colors"
								>
									+39 340 309 3977
								</a>
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Image Modal */}
			{selectedImage && (
				<ImageModal
					image={selectedImage}
					images={images}
					onClose={() => setSelectedImage(null)}
					onNavigate={setSelectedImage}
					onDownload={handleDownload}
				/>
			)}

			{/* Scroll to top */}
			<button
				onClick={scrollToTop}
				className={`fixed bottom-8 right-8 z-40 bg-amber-400/30 backdrop-blur-md hover:bg-amber-400/50 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-400/40 ${
					showScrollTop
						? "opacity-100 translate-y-0"
						: "opacity-0 translate-y-16 pointer-events-none"
				}`}
				aria-label="Torna su"
			>
				<ArrowUp className="w-6 h-6" />
			</button>
		</div>
	);
}
