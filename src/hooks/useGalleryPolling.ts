"use client";

import { useEffect, useRef } from "react";
import type { ImageData } from "./useGalleryImages";

const POLL_INTERVAL = 30_000;

export function useGalleryPolling(
	mergeNewImages: (images: ImageData[]) => void,
	enabled: boolean = true
) {
	const mergeRef = useRef(mergeNewImages);
	mergeRef.current = mergeNewImages;

	useEffect(() => {
		if (!enabled) return;

		const poll = async () => {
			try {
				const response = await fetch("/api/images");
				if (response.ok) {
					const data = await response.json();
					mergeRef.current(data.images || []);
				}
			} catch {
				// Silently ignore polling errors
			}
		};

		const id = setInterval(poll, POLL_INTERVAL);
		return () => clearInterval(id);
	}, [enabled]);
}
