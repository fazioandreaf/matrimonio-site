"use client";

import { useState } from "react";
import { Upload, AlertCircle } from "lucide-react";
import type { UploadProgress } from "@/hooks/useImageUpload";

interface UploadDropzoneProps {
	onFilesSelected: (files: FileList | null) => void;
	uploading: boolean;
	progress: UploadProgress;
}

export default function UploadDropzone({
	onFilesSelected,
	uploading,
	progress,
}: UploadDropzoneProps) {
	const [dragOver, setDragOver] = useState(false);

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
		onFilesSelected(e.dataTransfer.files);
	};

	return (
		<div
			className={`border-2 border-dashed rounded-xl p-8 mb-8 transition-all duration-300 ${
				dragOver
					? "border-amber-400 bg-amber-50/50 scale-[1.01]"
					: "border-amber-400/30 hover:border-amber-400/60 bg-white/40"
			}`}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={handleDrop}
		>
			<div className="text-center">
				{uploading ? (
					<div className="space-y-3">
						<p className="text-amber-900 font-medium">
							Caricamento {progress.completed} di{" "}
							{progress.total}...
						</p>
						<div className="w-full max-w-xs mx-auto bg-amber-100 rounded-full h-2">
							<div
								className="bg-teal-700 h-2 rounded-full transition-all duration-500"
								style={{
									width: `${(progress.completed / progress.total) * 100}%`,
								}}
							/>
						</div>
						{progress.failed > 0 && (
							<p className="text-red-600 text-sm flex items-center justify-center gap-1">
								<AlertCircle className="h-4 w-4" />
								{progress.failed}{" "}
								{progress.failed === 1
									? "file non caricato"
									: "file non caricati"}
							</p>
						)}
					</div>
				) : (
					<>
						<input
							type="file"
							multiple
							accept="image/*"
							onChange={(e) => {
								onFilesSelected(e.target.files);
								e.target.value = "";
							}}
							className="hidden"
							id="gallery-upload"
						/>
						<label
							htmlFor="gallery-upload"
							className="inline-flex items-center px-6 py-3 text-base font-medium rounded-lg text-white bg-teal-800 hover:bg-teal-700 cursor-pointer transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
						>
							<Upload className="mr-2 h-5 w-5" />
							Seleziona Immagini
						</label>
						<p className="mt-3 text-sm text-amber-800/60">
							<span className="hidden md:inline">
								Trascina qui le foto o clicca per
								selezionarle
							</span>
							<span className="md:hidden">
								Max 10 foto alla volta
							</span>
							<span className="hidden md:inline">
								{" "}
								(max 10 alla volta)
							</span>
						</p>
					</>
				)}
			</div>
		</div>
	);
}
