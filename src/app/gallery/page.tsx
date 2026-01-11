"use client";

import { useState, useEffect, useCallback } from "react";
import {
	Upload,
	Image as ImageIcon,
	Download,
	X,
	Camera,
	Info,
} from "lucide-react";
import Image from "next/image";

interface ImageData {
	id: string;
	filename: string;
	url: string;
	uploaded: string;
}

export default function GalleryPage() {
	const [images, setImages] = useState<ImageData[]>([]);
	const [uploading, setUploading] = useState(false);
	const [loading, setLoading] = useState(true);
	const [dragOver, setDragOver] = useState(false);
	const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);

	const fetchImages = useCallback(async () => {
		try {
			const response = await fetch("/api/images");
			if (response.ok) {
				const data = await response.json();
				setImages(data.images);
			}
		} catch (error) {
			console.error("Error fetching images:", error);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchImages();
	}, [fetchImages]);

	// Cleanup: ripristina lo scroll quando il componente viene smontato
	useEffect(() => {
		return () => {
			document.body.style.overflow = "unset";
		};
	}, []);

	const handleFileUpload = async (files: FileList | null) => {
		if (!files || files.length === 0) return;

		setUploading(true);
		const uploadPromises = Array.from(files).map(async (file) => {
			const formData = new FormData();
			formData.append("file", file);

			const response = await fetch("/api/upload", {
				method: "POST",
				body: formData,
			});

			if (!response.ok) {
				throw new Error(`Upload failed for ${file.name}`);
			}

			return response.json();
		});

		try {
			await Promise.all(uploadPromises);
			await fetchImages();
		} catch (error) {
			console.error("Upload error:", error);
			alert("Errore durante il caricamento delle immagini");
		} finally {
			setUploading(false);
		}
	};

	/*   const handleDelete = async (imageId: string) => {
    if (!confirm('Sei sicuro di voler eliminare questa immagine?')) return;

    try {
      const response = await fetch(`/api/images?id=${imageId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setImages(images.filter(img => img.id !== imageId));
      } else {
        alert('Errore durante l\'eliminazione dell\'immagine');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Errore durante l\'eliminazione dell\'immagine');
    }
  }; */

	const handleDownload = async (image: ImageData) => {
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
			alert("Errore durante il download dell'immagine");
		}
	};

	const openImageModal = (image: ImageData) => {
		setSelectedImage(image);
		// Impedisce lo scroll del body quando il modal è aperto
		document.body.style.overflow = "hidden";
	};

	const closeImageModal = () => {
		setSelectedImage(null);
		// Ripristina lo scroll del body
		document.body.style.overflow = "unset";
	};

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		setDragOver(true);
	};

	const handleDragLeave = (e: React.DragEvent) => {
		e.preventDefault();
		setDragOver(false);
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		setDragOver(false);
		handleFileUpload(e.dataTransfer.files);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-8">
			<div className="max-w-6xl mx-auto px-4">
				<div className="text-center mb-8">
					<h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
						<Camera className="h-8 w-8 text-green-800" />
						Galleria Foto
					</h1>
					<p className="text-green-800 text-lg">
						Condividi i tuoi momenti speciali con noi
					</p>
				</div>

				<div
					className={`border-2 border-dashed rounded-lg p-8 mb-8 transition-colors ${
						dragOver
							? "border-green-400 bg-green-50"
							: "border-gray-300 hover:border-green-300"
					}`}
					onDragOver={handleDragOver}
					onDragLeave={handleDragLeave}
					onDrop={handleDrop}
				>
					<div className="text-center">
						<Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
						<input
							type="file"
							multiple
							accept="image/*"
							onChange={(e) => handleFileUpload(e.target.files)}
							className="hidden"
							id="file-upload"
						/>
						<label
							htmlFor="file-upload"
							className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-800 hover:bg-green-700 cursor-pointer transition-colors"
						>
							{uploading ? "Caricamento..." : "Seleziona Immagini"}
						</label>
					</div>
				</div>

				{loading ? (
					<div className="text-center py-12">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
						<p className="mt-4 text-green-800">Caricamento immagini...</p>
					</div>
				) : images.length === 0 ? (
					<div className="text-center py-12">
						<ImageIcon className="mx-auto h-16 w-16 text-gray-400 mb-4" />
						<p className="text-green-800 text-lg">
							Nessuna immagine caricata ancora
						</p>
						<p className="text-gray-500">Inizia caricando la prima foto!</p>
					</div>
				) : (
					<div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
						{images.map((image) => (
							<div
								key={image.id}
								className="break-inside-avoid bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow mb-6"
							>
								<div className="relative">
									<div
										onClick={() => openImageModal(image)}
										className="cursor-pointer"
									>
										<Image
											src={image.url}
											alt={image.filename}
											width={400}
											height={600}
											className="w-full h-auto object-cover"
											sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
										/>
									</div>
									<div className="absolute top-2 right-2">
										<button
											onClick={(e) => {
												e.stopPropagation();
												handleDownload(image);
											}}
											className="p-2 bg-green-500 text-white rounded-full hover:bg-green-800 transition-colors shadow-lg"
											title="Scarica immagine"
										>
											<Download className="h-4 w-4" />
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				)}

				<section className="mt-16 py-12 px-4 bg-white/50 rounded-lg">
					<div className="max-w-4xl mx-auto text-center">
						<h2 className="font-playfair text-3xl font-bold text-gray-800 mb-8">
							Come Funziona
						</h2>

						<div className="grid md:grid-cols-3 gap-8">
							<div className="text-center">
								<div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
									<span className="text-2xl font-bold text-green-800">1</span>
								</div>
								<h3 className="font-semibold text-lg text-gray-800 mb-2">
									Carica le Foto
								</h3>
								<p className="text-green-800">
									Trascina le tue foto nell&apos;area di upload o clicca per
									selezionarle
								</p>
							</div>

							<div className="text-center">
								<div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
									<span className="text-2xl font-bold text-green-800">2</span>
								</div>
								<h3 className="font-semibold text-lg text-gray-800 mb-2">
									Condividi i Momenti
								</h3>
								<p className="text-green-800">
									Le tue foto saranno visibili a tutti gli invitati in tempo
									reale
								</p>
							</div>

							<div className="text-center">
								<div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
									<span className="text-2xl font-bold text-green-800">3</span>
								</div>
								<h3 className="font-semibold text-lg text-gray-800 mb-2">
									Crea Ricordi
								</h3>
								<p className="text-green-800">
									Insieme creeremo una collezione di ricordi indimenticabili
								</p>
							</div>
						</div>
					</div>
				</section>

				<div className="mt-12 bg-green-50 rounded-lg p-6 text-center">
					<h3 className="font-playfair text-xl font-semibold text-gray-800 mb-4 flex items-center justify-center gap-2">
						<Info className="h-5 w-5 text-green-800" />
						Altre domande?
					</h3>
					<p className="text-green-800">
						Se hai bisogno di aiuto o hai domande sulla galleria, non esitare a
						contattarci.
						<br />
						<a
							href="mailto:fazioandrea.f@gmail.com"
							className="text-green-800 hover:text-green-700 underline"
						>
							fazioandrea.f@gmail.com
						</a>
					</p>
				</div>
			</div>

			{/* Modal per visualizzazione immagine */}
			{selectedImage && (
				<div
					className="fixed inset-0 z-50 bg-white/20 backdrop-blur-md flex items-center justify-center p-4"
					onClick={closeImageModal}
				>
					<div className="relative max-w-4xl max-h-full">
						<button
							onClick={closeImageModal}
							className="absolute -top-12 right-0 p-2 bg-white/80 text-gray-800 rounded-full hover:bg-white transition-colors shadow-lg"
						>
							<X className="h-6 w-6" />
						</button>

						<div className="relative">
							<Image
								src={selectedImage.url}
								alt={selectedImage.filename}
								width={0}
								height={0}
								className="w-auto max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
								sizes="100vw"
							/>

							<div className="absolute bottom-4 right-4">
								<button
									onClick={(e) => {
										e.stopPropagation();
										handleDownload(selectedImage);
									}}
									className="p-3 bg-green-500 text-white rounded-full hover:bg-green-800 transition-colors shadow-lg"
									title="Scarica immagine"
								>
									<Download className="h-5 w-5" />
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
