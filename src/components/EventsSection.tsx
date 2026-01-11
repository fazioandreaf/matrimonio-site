"use client";

import { Calendar, Clock, MapPin, Users, Gift } from "lucide-react";

interface Event {
	id: number;
	title: string;
	time: string;
	duration: string;
	location: string;
	description: string;
}

// Dati per gli eventi
const events: Event[] = [
	{
		id: 1,
		title: "Cerimonia",
		time: "18:00",
		duration: "1 ora",
		location: "Borgata Baldazza",
		description: "La cerimonia che unirà i nostri cuori per sempre",
	},
	{
		id: 2,
		title: "Aperitivo",
		time: "19:00",
		duration: "1 ore",
		location: "Borgata Baldazza",
		description: "Un momento di convivialità con aperitivo e brindisi",
	},
	{
		id: 3,
		title: "Cena",
		time: "20:00",
		duration: "3 ore",
		location: "Borgata Baldazza",
		description: "Una cena elegante con menu personalizzato e vini selezionati",
	},
];

const EventsSection = () => {
	return (
		<section
			className="py-16 px-4 bg-gradient-to-br from-teal-50 to-teal-100"
			id="events"
		>
			<div className="max-w-4xl mx-auto">
				<div className="text-center mb-12">
					<Calendar className="mx-auto h-12 w-12 text-amber-800 mb-4" />
					<h2 className="font-playfair text-3xl font-bold text-amber-900 mb-4">
						Programma della Giornata
					</h2>
					<p className="text-amber-800 text-lg">
						Scopri tutti i momenti speciali che abbiamo preparato per voi
					</p>
				</div>

				<div className="space-y-8">
					{events.map(
						({ id, title, time, duration, location, description }, index) => (
							<div
								key={id}
								className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-amber-400/20"
							>
								<div className="p-6">
									<div className="flex items-start justify-between mb-4">
										<div className="flex items-center space-x-3">
											<div className="bg-amber-400/20 border border-amber-400/40 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center flex-shrink-0">
												<span className="text-amber-400 font-bold text-sm md:text-lg">
													{index + 1}
												</span>
											</div>
											<div>
												<h3 className="font-playfair text-2xl font-semibold text-amber-900">
													{title}
												</h3>
											</div>
										</div>
									</div>

									<div className="mb-4">
									<p className="text-amber-800">{description}</p>

									</div>

									<div className="grid md:grid-cols-3 gap-4">
										<div className="flex items-center space-x-2 text-amber-800">
											<Clock className="h-5 w-5 text-amber-800" />
											<span>
												{time} - {duration}
											</span>
										</div>

										<div className="flex items-center space-x-2 text-amber-800">
											<MapPin className="h-5 w-5 text-amber-800" />
											<span>{location}</span>
										</div>
									</div>
								</div>
							</div>
						)
					)}
				</div>

				<div className="mt-12 bg-white/80 backdrop-blur-sm rounded-lg p-6 text-center border border-amber-400/20">
					<h3 className="font-playfair text-2xl font-semibold text-amber-900 mb-4 flex items-center justify-center gap-2">
						<Gift className="h-6 w-6 text-amber-800" />
						Informazioni Aggiuntive
					</h3>
					<div className="space-y-2 text-amber-800">
						{/* <p>
							<strong>Data:</strong> 13 Giugno 2027
						</p> */}
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
						{/* <p>
							<strong>Contatti:</strong> Per qualsiasi domanda, contattateci
						</p> */}
					</div>
				</div>
			</div>
		</section>
	);
};

export default EventsSection;
