"use client";

import { Info } from "lucide-react";

const ContactSection = () => {
	return (
		<section className="py-16 px-4 bg-gradient-to-br from-teal-50 to-teal-100">
			<div className="max-w-4xl mx-auto">
				<div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-amber-400/20">
					<div className="text-center">
						<h3 className="font-playfair text-2xl font-semibold text-amber-900 mb-4 flex items-center justify-center gap-2">
							<Info className="h-6 w-6 text-amber-800" />
							Altre domande?
						</h3>
						<p className="text-amber-800 mb-6 text-lg">
							Non hai trovato la risposta che cercavi? Non esitare a
							contattarci!
						</p>
						<div className="space-y-3 text-amber-800">
							<p className="text-base">
								<strong>Email:</strong>{" "}
								<a
									href="mailto:fazioandrea.f@gmail.com"
									className="text-amber-800 hover:text-amber-700 underline transition-colors"
								>
									fazioandrea.f@gmail.com
								</a>
							</p>
							<p className="text-base">
								<strong>Telefono:</strong>
								<a
									href="tel:+393403093977"
									className="text-amber-800 hover:text-amber-700 underline transition-colors"
								>
									+39 340 309 3977
								</a>
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ContactSection;
