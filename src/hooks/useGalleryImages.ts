"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export interface ImageData {
	id: string;
	filename: string;
	url: string;
	uploaded: string;
}

const BATCH_SIZE = 30;

export function useGalleryImages() {
	const [allImages, setAllImages] = useState<ImageData[]>([]);
	const [visibleImages, setVisibleImages] = useState<ImageData[]>([]);
	const [loading, setLoading] = useState(true);
	const [hasMore, setHasMore] = useState(false);
	const batchIndexRef = useRef(1);

	const fetchImages = useCallback(async () => {
		try {
			const response = await fetch("/api/images");
			if (response.ok) {
				const data = await response.json();
				const images: ImageData[] = data.images || [];
				setAllImages(images);
				setVisibleImages(images.slice(0, BATCH_SIZE));
				setHasMore(images.length > BATCH_SIZE);
				batchIndexRef.current = 1;
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

	const loadMore = useCallback(() => {
		const nextBatch = batchIndexRef.current + 1;
		const endIndex = nextBatch * BATCH_SIZE;
		setVisibleImages(allImages.slice(0, endIndex));
		setHasMore(endIndex < allImages.length);
		batchIndexRef.current = nextBatch;
	}, [allImages]);

	const mergeNewImages = useCallback((newImages: ImageData[]) => {
		setAllImages((prev) => {
			const existingIds = new Set(prev.map((img) => img.id));
			const fresh = newImages.filter((img) => !existingIds.has(img.id));
			if (fresh.length === 0) return prev;
			return [...fresh, ...prev];
		});
	}, []);

	useEffect(() => {
		const endIndex = batchIndexRef.current * BATCH_SIZE;
		setVisibleImages(allImages.slice(0, endIndex));
		setHasMore(endIndex < allImages.length);
	}, [allImages]);

	return {
		images: visibleImages,
		allImages,
		loading,
		hasMore,
		loadMore,
		refreshImages: fetchImages,
		mergeNewImages,
		totalCount: allImages.length,
	};
}
