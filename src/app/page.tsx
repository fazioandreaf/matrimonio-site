"use client";

import HeroSection from "@/components/HeroSection";
import GallerySection from "@/components/GallerySection";
import EventsSection from "@/components/EventsSection";
import RSVPSection from "@/components/RSVPSection";
import DressCodeSection from "@/components/DressCodeSection";
import FAQSection from "@/components/FAQSection";

const Home = () => {
	// Funzione per aprire Google Maps con la posizione corrente
	const openGoogleMapsWithCurrentLocation = () => {
		const waypoint =
			"Giap+-+Servizi+e+Gestioni+Zenit+srl,+SS120+km+206.343+dir.+Nord-Ovest,+95015+Linguaglossa+CT";
		const destination =
			"Borgata+Baldazza,+Contrada+Baldazza+SNC,+95015+Linguaglossa+CT";

		// Fallback URL senza punto di partenza
		const fallbackUrl = `https://www.google.com/maps/dir//${waypoint}/${destination}`;

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					// Costruisce l'URL con la posizione corrente come punto di partenza
					const url = `https://www.google.com/maps/dir/${latitude},${longitude}/${waypoint}/${destination}`;
					window.open(url, "_blank");
				},
				(error) => {
					// Se la geolocalizzazione fallisce, usa il fallback
					console.error("Errore geolocalizzazione:", error);
					window.open(fallbackUrl, "_blank");
				}
			);
		} else {
			// Se la geolocalizzazione non è supportata, usa il fallback
			window.open(fallbackUrl, "_blank");
		}
	};

	return (
		<div className="min-h-screen">
			<HeroSection onOpenMaps={openGoogleMapsWithCurrentLocation} />
			{/* <GallerySection /> */}
			<EventsSection />
			<RSVPSection />
			<DressCodeSection />
			<FAQSection onOpenMaps={openGoogleMapsWithCurrentLocation} />
		</div>
	);
};

export default Home;
