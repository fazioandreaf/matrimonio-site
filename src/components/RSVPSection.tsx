"use client";

import { useState } from "react";
import {
	Heart,
	CheckCircle,
	Users,
	MessageSquare,
	PartyPopper,
	Signature,
} from "lucide-react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faFaceSadTear } from "@fortawesome/free-solid-svg-icons";

export interface RSVPFormData {
	name: string;
	email: string;
	guests: number;
	message: string;
	attending: boolean;
	hasDietaryRestrictions: boolean;
	dietaryRestrictions: string;
}

interface RSVPSectionProps {
	onSubmit?: (data: RSVPFormData) => Promise<void>;
}

const RSVPSection = ({ onSubmit }: RSVPSectionProps) => {
	const [formData, setFormData] = useState<RSVPFormData>({
		name: "",
		email: "",
		guests: 1,
		message: "",
		attending: true,
		hasDietaryRestrictions: false,
		dietaryRestrictions: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError("");

		try {
			if (onSubmit) {
				await onSubmit(formData);
			} else {
				const response = await fetch("/api/rsvp", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formData),
				});

				if (!response.ok) {
					throw new Error("Errore durante l'invio della risposta");
				}
			}

			setIsSubmitted(true);
		} catch (err) {
			setError("Si è verificato un errore. Riprova più tardi.");
			console.error(err);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value, type } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]:
				type === "checkbox"
					? (e.target as HTMLInputElement).checked
					: type === "number"
						? parseInt(value) || 1
						: value,
		}));
	};

	return (
		<section
			className="py-16 px-4 bg-gradient-to-br from-teal-50 to-teal-100"
			id="rsvp"
		>
			<div className="max-w-2xl mx-auto">
				<div className="text-center mb-8">
					<Signature className="mx-auto h-12 w-12 text-amber-800 mb-4" />
					<h2 className="font-playfair text-3xl font-bold text-amber-900 mb-4">
						Conferma la tua presenza
					</h2>
					<p className="text-amber-800 text-lg">
						Aiutaci a organizzare al meglio la nostra giornata speciale
					</p>
				</div>

				{isSubmitted ? (
					<div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg text-center border border-amber-400/20">
						<CheckCircle className="mx-auto h-16 w-16 text-amber-800 mb-6" />
						<h3 className="font-playfair text-3xl font-bold text-amber-900 mb-4 flex items-center justify-center gap-2">
							Grazie per la tua risposta!
							<Heart className="h-8 w-8 text-amber-800" />
						</h3>
						<p className="text-amber-800 text-lg mb-6">
							Abbiamo ricevuto la tua conferma di presenza. Non vediamo
							l&apos;ora di condividere con te questo momento speciale!
						</p>
						<div className="bg-teal-50 rounded-lg p-4 border border-amber-400/20">
							<p className="text-amber-800">
								<strong>Data:</strong> 13 Giugno 2027
								<br />
								<strong>Luogo:</strong> Borgata Baldazza
								<br />
								<strong>Indirizzo:</strong> Contrada Baldazza SNC, 95015
								Linguaglossa CT
							</p>
						</div>
					</div>
				) : (
					<div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-amber-400/20">
						<form onSubmit={handleSubmit} className="space-y-6">
							{/* Nome */}
							<div>
								<label
									htmlFor="name"
									className="block text-sm font-medium text-amber-900 mb-2"
								>
									Nome e Cognome *
								</label>
								<input
									type="text"
									id="name"
									name="name"
									required
									value={formData.name}
									onChange={handleChange}
									className="w-full px-4 py-3 bg-white/90 border border-amber-400/30 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 text-amber-900 placeholder-amber-600/60 transition-colors"
									placeholder="Il tuo nome completo"
								/>
							</div>

							{/* Email */}
							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium text-amber-900 mb-2"
								>
									Email
								</label>
								<input
									type="email"
									id="email"
									name="email"
									required
									value={formData.email}
									onChange={handleChange}
									className="w-full px-4 py-3 bg-white/90 border border-amber-400/30 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 text-amber-900 placeholder-amber-600/60 transition-colors"
									placeholder="la-tua-email@example.com"
								/>
							</div>

							{/* Partecipazione */}
							<div>
								<label className="block text-sm font-medium text-amber-900 mb-3">
									Parteciperai al nostro matrimonio? *
								</label>
								<div className="space-y-2">
									<label className="flex items-center">
										<input
											type="radio"
											name="attending"
											value="true"
											checked={formData.attending === true}
											onChange={() =>
												setFormData((prev) => ({ ...prev, attending: true }))
											}
											className="mr-3 text-amber-800 focus:ring-amber-400"
										/>
										<span className="text-amber-900 flex items-center gap-1">
											Sì, parteciperò!
											<PartyPopper className="h-4 w-4 text-amber-800" />
										</span>
									</label>
									<label className="flex items-center">
										<input
											type="radio"
											name="attending"
											value="false"
											checked={formData.attending === false}
											onChange={() =>
												setFormData((prev) => ({ ...prev, attending: false }))
											}
											className="mr-3 text-amber-800 focus:ring-amber-400"
										/>
										<div className="text-amber-900 flex items-center gap-1">
											Purtroppo non potrò esserci <FontAwesomeIcon icon={faFaceSadTear} width={16} height={16} className="text-amber-800" />
										</div>
									</label>
								</div>
							</div>

							{/* Numero ospiti */}
							{formData.attending && (
								<div>
									<label
										htmlFor="guests"
										className="block text-sm font-medium text-amber-900 mb-2"
									>
										<Users className="inline h-4 w-4 mr-1" />
										Numero di ospiti (incluso te) *
									</label>
									<select
										id="guests"
										name="guests"
										required
										value={formData.guests}
										onChange={handleChange}
										className="w-full px-4 py-3 bg-white/90 border border-amber-400/30 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 text-amber-900 transition-colors"
									>
										{[1, 2, 3, 4, 5, 6].map((num) => (
											<option key={num} value={num} className="bg-teal-800">
												{num} {num === 1 ? "persona" : "persone"}
											</option>
										))}
									</select>
								</div>
							)}

							{/* Esigenze alimentari */}
							{formData.attending && (
								<div>
									<label className="block text-sm font-medium text-amber-900 mb-3">
										Hai esigenze alimentari particolari? (allergie,
										intolleranze, preferenze)
									</label>
									<div className="space-y-3">
										<label className="flex items-center">
											<input
												type="radio"
												name="hasDietaryRestrictions"
												value="false"
												checked={formData.hasDietaryRestrictions === false}
												onChange={() =>
													setFormData((prev) => ({
														...prev,
														hasDietaryRestrictions: false,
														dietaryRestrictions: "",
													}))
												}
												className="mr-3 text-amber-800 focus:ring-amber-400"
											/>
											<span className="text-amber-900">
												No, nessuna esigenza particolare
											</span>
										</label>
										<label className="flex items-center">
											<input
												type="radio"
												name="hasDietaryRestrictions"
												value="true"
												checked={formData.hasDietaryRestrictions === true}
												onChange={() =>
													setFormData((prev) => ({
														...prev,
														hasDietaryRestrictions: true,
													}))
												}
												className="mr-3 text-amber-800 focus:ring-amber-400"
											/>
											<span className="text-amber-900">
												Sì, ho esigenze alimentari
											</span>
										</label>
									</div>

									{formData.hasDietaryRestrictions && (
										<div className="mt-4">
											<label
												htmlFor="dietaryRestrictions"
												className="block text-sm font-medium text-amber-900 mb-2"
											>
												Specifica le tue esigenze alimentari *
											</label>
											<textarea
												id="dietaryRestrictions"
												name="dietaryRestrictions"
												required
												rows={3}
												value={formData.dietaryRestrictions}
												onChange={handleChange}
												className="w-full px-4 py-3 bg-white/90 border border-amber-400/30 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 text-amber-900 placeholder-amber-600/60 transition-colors resize-none"
												placeholder="Es: Vegetariano, allergico ai frutti di mare, celiaco, etc..."
											/>
										</div>
									)}
								</div>
							)}

							{/* Messaggio */}
							<div>
								<label
									htmlFor="message"
									className="block text-sm font-medium text-amber-900 mb-2"
								>
									<MessageSquare className="inline h-4 w-4 mr-1" />
									Messaggio per gli sposi (opzionale)
								</label>
								<textarea
									id="message"
									name="message"
									rows={4}
									value={formData.message}
									onChange={handleChange}
									className="w-full px-4 py-3 bg-white/90 border border-amber-400/30 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 text-amber-900 placeholder-amber-600/60 transition-colors resize-none"
									placeholder="Scrivi un messaggio speciale per gli sposi..."
								/>
							</div>

							{error && (
								<div className="bg-red-50 border border-red-200 rounded-lg p-4">
									<p className="text-red-800">{error}</p>
								</div>
							)}

							<button
								type="submit"
								disabled={isSubmitting}
								className="w-full bg-teal-800 hover:bg-teal-700 disabled:bg-teal-400 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center shadow-lg"
							>
								{isSubmitting ? (
									<>
										<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
										Invio in corso...
									</>
								) : (
									<>
										<Heart className="mr-2 h-5 w-5" />
										Conferma la presenza
									</>
								)}
							</button>
						</form>
					</div>
				)}
			</div>
		</section>
	);
};

export default RSVPSection;
