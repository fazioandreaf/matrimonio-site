"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		// Osserva quando la HeroSection esce dalla viewport
		const heroSection = document.querySelector("section");
		
		if (!heroSection) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				// Mostra il bottone quando la HeroSection non è più visibile
				setIsVisible(!entry.isIntersecting);
			},
			{
				threshold: 0,
				rootMargin: "0px",
			}
		);

		observer.observe(heroSection);

		return () => {
			if (heroSection) {
				observer.unobserve(heroSection);
			}
		};
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<button
			onClick={scrollToTop}
			className={`fixed bottom-8 right-8 z-50 bg-amber-400/30 backdrop-blur-md hover:bg-amber-400/50 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-400/40 ${
				isVisible
					? "opacity-100 translate-y-0"
					: "opacity-0 translate-y-16 pointer-events-none"
			}`}
			aria-label="Torna su"
		>
			<ArrowUp className="w-6 h-6" />
		</button>
	);
};

export default ScrollToTop;
