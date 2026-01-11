"use client";

import Link from "next/link";
import { Camera } from "lucide-react";

const GallerySection = () => {
	return (
		<section className="py-16 px-4 bg-gradient-to-br from-teal-50 to-teal-100">
			<div className="max-w-4xl mx-auto text-center">
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<div className="text-center">
						<p className="text-xl text-amber-800 mb-6">
							Condividi con noi i momenti più belli della nostra giornata
							speciale
						</p>
						<Link
							href="/gallery"
							className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-white bg-teal-800 hover:bg-teal-700 transition-colors"
						>
							<Camera className="mr-2 h-5 w-5" />
							Vedi Galleria
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default GallerySection;
