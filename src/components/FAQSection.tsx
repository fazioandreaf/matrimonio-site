"use client";

import { useState } from "react";
import {
	Heart,
	ChevronDown,
	ChevronUp,
	Info,
	Clock,
	MapPin,
	Car,
	Gift,
	Users,
} from "lucide-react";

export interface FAQ {
	id: string;
	question: string;
	answer: string;
	icon: React.ReactNode;
}

interface FAQSectionProps {
	onOpenMaps: () => void;
}

// Dati per le FAQ
const faqs: FAQ[] = [
	{
		id: "1",
		question: "A che ora inizia la cerimonia?",
		answer:
			"La cerimonia civile inizierà alle 11:00 presso Borgata Baldazza. Ti consigliamo di arrivare con almeno 15 minuti di anticipo per trovare posto e goderti l'atmosfera.",
		icon: <Clock className="h-5 w-5 text-amber-800" />,
	},
	{
		id: "2",
		question: "Come posso raggiungere la location?",
		answer:
			"Borgata Baldazza si trova in Contrada Baldazza SNC, 95015 Linguaglossa CT. C'è parcheggio gratuito disponibile.",
		icon: <MapPin className="h-5 w-5 text-amber-800" />,
	},
	{
		id: "3",
		question: "C'è parcheggio disponibile?",
		answer:
			"Sì, c'è parcheggio gratuito disponibile presso la location. Ti consigliamo di arrivare con un po' di anticipo per trovare facilmente un posto.",
		icon: <Car className="h-5 w-5 text-amber-800" />,
	},
	{
		id: "4",
		question: "Cosa devo indossare?",
		answer:
			"Il dress code è Smart Casual Elegante. Per le donne: abito elegante da giorno, vestito o tailleur. Per gli uomini: camicia elegante con pantaloni o giacca sportiva. Considera che siamo ad alta quota dove può fare fresco, quindi porta una giacchettina o uno scialle. Evita tacchi troppo alti per il terreno naturale.",
		icon: <Users className="h-5 w-5 text-amber-800" />,
	},
	{
		id: "6",
		question: "C'è un menu vegetariano/vegano disponibile?",
		answer:
			"Sì, abbiamo opzioni per tutte le esigenze alimentari. Quando confermi la tua presenza tramite RSVP, puoi specificare eventuali allergie o preferenze alimentari nel messaggio per gli sposi.",
		icon: <Gift className="h-5 w-5 text-amber-800" />,
	},
];

const FAQSection = ({ onOpenMaps }: FAQSectionProps) => {
	const [openItems, setOpenItems] = useState<string[]>([]);

	const toggleItem = (id: string) => {
		setOpenItems((prev) =>
			prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
		);
	};

	return (
		<section
			className="py-16 px-4 bg-gradient-to-br from-teal-50 to-teal-100"
			id="faq"
		>
			<div className="max-w-4xl mx-auto">
				<div className="text-center mb-12">
					<Heart className="mx-auto h-12 w-12 text-amber-800 mb-4" />
					<h2 className="font-playfair text-3xl font-bold text-amber-900 mb-4">
						Domande Frequenti
					</h2>
					<p className="text-amber-800 text-lg">
						Tutte le risposte alle domande più comuni sul nostro matrimonio
					</p>
				</div>

				<div className="space-y-4">
					{faqs.map((faq) => (
						<div
							key={faq.id}
							className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-amber-400/20"
						>
							<button
								onClick={() => toggleItem(faq.id)}
								className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-teal-50 transition-colors"
							>
								<div className="flex items-center space-x-3">
									{faq.icon}
									<h3 className="font-semibold text-amber-900">
										{faq.question}
									</h3>
								</div>
								{openItems.includes(faq.id) ? (
									<ChevronUp className="h-5 w-5 text-amber-800" />
								) : (
									<ChevronDown className="h-5 w-5 text-amber-800" />
								)}
							</button>

							{openItems.includes(faq.id) && (
								<div className="px-6 pb-4">
									<div className="pl-8 border-l-2 border-amber-400/40">
										<p className="text-amber-800 leading-relaxed">
											{faq.answer}
											{faq.id === "2" && (
												<>
													{" "}
													<button
														onClick={onOpenMaps}
														className="text-amber-800 hover:text-amber-700 underline bg-transparent border-none p-0 cursor-pointer"
													>
														Clicca qui per aprire Google Maps con le indicazioni
														precise
													</button>
													.
												</>
											)}
										</p>
									</div>
								</div>
							)}
						</div>
					))}
				</div>

				<div className="mt-12 bg-white/80 rounded-lg p-6 text-center border border-amber-400/20">
					<h3 className="font-playfair text-xl font-semibold text-amber-900 mb-4 flex items-center justify-center gap-2">
						<Info className="h-5 w-5 text-amber-800" />
						Altre domande?
					</h3>
					<p className="text-amber-800 mb-4">
						Non hai trovato la risposta che cercavi? Non esitare a contattarci!
					</p>
					<div className="space-y-2 text-sm text-amber-800">
						<p>
							<strong>Email:</strong>fazioandrea.f@gmail.com
						</p>
						<p>
							<strong>Telefono:</strong> +39 123 456 7890
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default FAQSection;
