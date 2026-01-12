"use client";

import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";

interface HeroSectionProps {
	onOpenMaps: () => void;
}

const HeroSection = ({ onOpenMaps }: HeroSectionProps) => {
	const handleDownloadCalendar = () => {
		const link = document.createElement("a");
		link.href = "/calendar.ics";
		link.download = "matrimonio-13-giugno-2027.ics";
		link.click();
	};

	return (
		<section
			className="relative flex-col flex md:flex-col"
			style={{ height: "calc(100dvh - 4rem)" }}
		>
			<div className="absolute inset-0 ">
				<Image
					src="/provaa.png"
					alt="Andrea & Giuliana"
					width={450}
					className="object-cover h-full object-center md:hidden"
					height={900}
					priority
				/>
				<Image
					src="/partecipazione.png"
					alt="Andrea & Giuliana"
					width={1440 * 5}
					className="object-cover h-full object-center hidden md:block"
					height={1080 * 5}
					priority
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/5"></div>
			</div>
			{/* Contenuto sopra l'immagine */}
			<div className="relative flex h-full flex-col justify-between items-center text-center px-4">
				{/* <h1 className="font-playfair text-5xl md:text-6xl font-bold text-white mb-8 italic drop-shadow-2xl">
					Andrea & Giuliana
				</h1> */}

				<div
					className="flex flex-col h-full justify-end my-3 md:grid-cols-2 gap-3 w-2xs items-center"
					id="location"
				>
					<button
						onClick={handleDownloadCalendar}
						className="bg-teal-100/10 backdrop-blur-lg rounded-lg py-2 px-4 shadow-xl hover:shadow-2xl active:shadow-2xl transition-all duration-300 hover:bg-teal-100/20 cursor-pointer group flex-col flex border border-amber-400/30 w-full"
					>
						<h3 className="font-playfair text-xl font-bold text-amber-400 mb-2 drop-shadow-sm flex justify-center gap-2">
							<Calendar className="text-amber-400" />
							Data
						</h3>
						<p className="text-amber-300 group-hover:text-amber-200 group-active:text-amber-200 transition-colors drop-shadow-sm">
							13 Giugno 2027
						</p>
						<p className="text-sm text-amber-400/80 mt-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
							Clicca per scaricare il calendario
						</p>
					</button>

					<button
						onClick={onOpenMaps}
						className="bg-teal-100/10 backdrop-blur-lg rounded-lg py-2 px-4 shadow-xl hover:shadow-2xl active:shadow-2xl transition-all duration-300 hover:bg-teal-100/20 cursor-pointer group flex-col flex border border-amber-400/30 w-full"
					>
						<h3 className="font-playfair text-xl font-bold text-amber-400 mb-2 drop-shadow-sm flex justify-center gap-2">
							<MapPin className="text-amber-400" />
							Luogo
						</h3>
						<p className="text-sm text-amber-300 group-hover:text-amber-200 group-active:text-amber-200 transition-colors drop-shadow-sm">
							Borgata Baldazza Linguaglossa CT
						</p>
						<p className="text-sm text-amber-400/80 mt-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
							Clicca per aprire su Google Maps
						</p>
					</button>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
