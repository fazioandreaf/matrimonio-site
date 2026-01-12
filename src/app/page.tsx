"use client";

import HeroSection from "@/components/HeroSection";
import GallerySection from "@/components/GallerySection";
import EventsSection from "@/components/EventsSection";
import RSVPSection from "@/components/RSVPSection";
import DressCodeSection from "@/components/DressCodeSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import GiftSection from "@/components/GiftSection";
import ScrollToTop from "@/components/ScrollToTop";

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
			<GiftSection />
			<ContactSection />
			{/* 			<div className="mt-12 bg-white/80 backdrop-blur-sm rounded-lg p-6 text-center border border-amber-400/20">
					<h3 className="font-playfair text-2xl font-semibold text-amber-900 mb-4 flex items-center justify-center gap-2">
						<Gift className="h-6 w-6 text-amber-800" />
						Informazioni Aggiuntive
					</h3>
					<div className="space-y-2 text-amber-800">
						<p>
							<strong>Data:</strong> 13 Giugno 2027
						</p>
						<p>
							<strong>Dress Code:</strong> Casual Elegante
						</p>
						<p>
							<strong>Parcheggio:</strong> Disponibile presso Borgata Baldazza
						</p>
						<p>
							<strong>Indirizzo:</strong> Contrada Baldazza SNC, 95015
							Linguaglossa CT
						</p>
						<p>
							<strong>Contatti:</strong> Per qualsiasi domanda, contattateci
						</p>
					</div>
				</div> */}
			<ScrollToTop />
		</div>
	);
};

export default Home;
