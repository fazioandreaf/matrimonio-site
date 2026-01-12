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
	Users,
	Utensils
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
			"La cerimonia civile inizierà alle 18:00 presso Borgata Baldazza. Ti consigliamo di arrivare con almeno 15 minuti di anticipo per trovare posto e goderti l'atmosfera.",
		icon: <Clock className="h-5 w-5 text-amber-800" />,
	},
	{
		id: "2",
		question: "Come posso raggiungere la location?",
		answer:
			"Borgata Baldazza si trova in Contrada Baldazza SNC, 95015 Linguaglossa CT. C'è parcheggio gratuito disponibile.",
		icon: <Car className="h-5 w-5 text-amber-800" />,
	},
	{
		id: "3",
		question: "Cosa devo indossare?",
		answer:
			"Il dress code è Casual Elegante ma sentiti libera/o di indossare quello che ti rappresenta di più. Considera che siamo ad alta quota dove può fare fresco, in un ambiente totalmente aperto con terreno naturale.",
		icon: <Users className="h-5 w-5 text-amber-800" />,
	},
	{
		id: "4",
		question: "C'è un menu vegetariano/ vegano/celiaco disponibile?",
		answer:
			"Sì, abbiamo opzioni per tutte le esigenze alimentari. Quando confermi la tua presenza tramite RSVP, puoi specificare eventuali allergie o preferenze alimentari nel messaggio per gli sposi.",
		icon: <Utensils className="h-5 w-5 text-amber-800" />,
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
					{faqs.map(({ id, question, answer, icon }) => (
						<div
							key={id}
							className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-amber-400/20"
						>
							<button
								onClick={() => toggleItem(id)}
								className="w-full px-6 py-4 text-left items-center justify-between hover:bg-teal-50 transition-colors flex"
							>
								<div className="flex items-center space-x-3 flex-1">
									{icon}
									<h3 className="font-semibold text-amber-900 grow flex-1">{question}</h3>
								</div>
								{openItems.includes(id) ? (
									<ChevronUp className="h-5 w-5 text-amber-800 w-1" />
								) : (
									<ChevronDown className="h-5 w-5 text-amber-800 w-1" />
								)}
							</button>

							{openItems.includes(id) && (
								<div className="px-6 pb-4">
									<div className="pl-8 border-l-2 border-amber-400/40">
										<p className="text-amber-800 leading-relaxed">
											{answer}
											<br />
											<br />
											{id === "2" && (
												<>
													<button
														onClick={onOpenMaps}
														className="text-amber-800 text-left hover:text-amber-700 underline bg-transparent border-none p-0 cursor-pointer"
													>
														Clicca qui per aprire Google Maps con le indicazioni
														precise
													</button>
												</>
											)}
										</p>
									</div>
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default FAQSection;
