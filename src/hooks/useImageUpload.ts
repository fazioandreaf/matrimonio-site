"use client";

import { useState, useCallback } from "react";

const MAX_FILES = 10;
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const CONCURRENT_UPLOADS = 3;

export interface UploadProgress {
	completed: number;
	total: number;
	failed: number;
}

export function useImageUpload(onUploadComplete: () => void) {
	const [uploading, setUploading] = useState(false);
	const [progress, setProgress] = useState<UploadProgress>({
		completed: 0,
		total: 0,
		failed: 0,
	});

	const validateFiles = useCallback(
		(files: File[]): { valid: File[]; errors: string[] } => {
			const errors: string[] = [];
			let candidates = files;

			if (candidates.length > MAX_FILES) {
				errors.push(
					`Puoi caricare massimo ${MAX_FILES} immagini alla volta. Verranno caricate solo le prime ${MAX_FILES}.`
				);
				candidates = candidates.slice(0, MAX_FILES);
			}

			const valid = candidates.filter((file) => {
				if (!file.type.startsWith("image/")) {
					errors.push(`${file.name} non è un'immagine`);
					return false;
				}
				if (file.size > MAX_FILE_SIZE) {
					errors.push(`${file.name} supera i 10MB`);
					return false;
				}
				return true;
			});

			return { valid, errors };
		},
		[]
	);

	const uploadSingleFile = async (
		file: File
	): Promise<{ success: boolean; filename: string }> => {
		const formData = new FormData();
		formData.append("file", file);

		const response = await fetch("/api/upload", {
			method: "POST",
			body: formData,
		});

		if (!response.ok) {
			throw new Error(`Upload failed for ${file.name}`);
		}

		return { success: true, filename: file.name };
	};

	const uploadFiles = useCallback(
		async (fileList: FileList | null) => {
			if (!fileList || fileList.length === 0) return;

			const { valid, errors } = validateFiles(Array.from(fileList));

			if (errors.length > 0) {
				alert(errors.join("\n"));
			}

			if (valid.length === 0) return;

			setUploading(true);
			setProgress({ completed: 0, total: valid.length, failed: 0 });

			let completed = 0;
			let failed = 0;

			for (let i = 0; i < valid.length; i += CONCURRENT_UPLOADS) {
				const batch = valid.slice(i, i + CONCURRENT_UPLOADS);
				const results = await Promise.allSettled(
					batch.map(uploadSingleFile)
				);

				for (const result of results) {
					if (
						result.status === "fulfilled" &&
						result.value.success
					) {
						completed++;
					} else {
						failed++;
					}
				}

				setProgress({ completed, total: valid.length, failed });
			}

			setUploading(false);
			onUploadComplete();
		},
		[validateFiles, onUploadComplete]
	);

	return { uploading, progress, uploadFiles };
}
