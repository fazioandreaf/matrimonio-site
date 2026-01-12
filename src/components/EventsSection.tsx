"use client";

import { Calendar, Clock, MapPin, Users, Gift } from "lucide-react";

interface Event {
	id: number;
	title: string;
	time: string;
	location: string;
	description: string;
}

// Dati per gli eventi
const events: Event[] = [
	{
		id: 1,
		title: "Cerimonia",
		time: "17:00",
		location: "Borgata Baldazza",
		description: "Trovate il vostro posto a sedere nel bosco",
	},
	{
		id: 2,
		title: "Aperitivo",
		time: "18:30",
		location: "Borgata Baldazza",
		description: "Un momento di convivialità, brindisi e foto",
	},
	{
		id: 3,
		title: "Cena",
		time: "20:00",
		location: "Borgata Baldazza",
		description: "Cena immersa nel bosco sotto le luci",
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
				</div>

				<div className="space-y-8">
					{events.map(
						({ id, title, time, location, description }, index) => (
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
												{time}
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
			</div>
		</section>
	);
};

export default EventsSection;
