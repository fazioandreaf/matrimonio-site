"use client";

import { Shirt, TreePine, Sun, Sparkles, Check } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonDress, faPerson } from "@fortawesome/free-solid-svg-icons";

interface DressCodeItem {
	category: string;
	icon: React.ReactNode;
	title: string;
	description: string;
	usefulTips: string[];
}

interface Tip {
	icon: typeof TreePine;
	title: string;
	description: string;
}

// Dati per il dress code
const dressCodeItems: DressCodeItem[] = [
	{
		category: "Donne",
		icon: (
			<FontAwesomeIcon
				size="xl"
				icon={faPersonDress}
				className="text-amber-800"
			/>
		),
		title: "Elegante ma Comodo",
		description: "Abito da giorno o tailleur",
		usefulTips: ["Evita tacchi troppo alti", "Porta una giacchettina"],
	},
	{
		category: "Uomini",
		icon: (
			<FontAwesomeIcon icon={faPerson} size="xl" className="text-amber-800" />
		),
		title: "Smart Casual",
		description: "Camicia o giacca con pantalone",
		usefulTips: ["Occhiali da sole", "Puoi levare la cravatta"],
	},
];

const tips: Tip[] = [
	{
		icon: TreePine,
		title: "Location",
		description:
			"Considera che saremo in un ambiente elegante, evita tacchi troppo alti",
	},
	{
		icon: Sun,
		title: "Alta Quota",
		description:
			"Siamo ad alta quota dove può fare fresco, porta una giacchettina o uno scialle",
	},
];

const DressCodeSection = () => {
	return (
		<section
			className="py-16 px-4 bg-gradient-to-br from-teal-50 to-teal-100"
			id="dresscode"
		>
			<div className="max-w-4xl mx-auto">
				<div className="text-center mb-8">
					<h3 className="font-playfair text-2xl font-semibold text-amber-900 mb-4 flex items-center justify-center gap-2">
						<TreePine className="h-6 w-6 text-amber-800" />
						Cerimonia Civile
					</h3>
					<p className="text-amber-800 text-lg">
						Il nostro matrimonio sarà una celebrazione intima ed accogliente.
						Vogliamo che tu ti senta comodo e a tuo agio in un ambiente
						rilassato ma elegante.
					</p>
				</div>
				<div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg mb-8 border border-amber-400/20">
					<div className="text-center mb-12">
						{/* <Heart className="mx-auto h-12 w-12 text-amber-800 mb-4" /> */}
						<h2 className="font-playfair text-3xl font-bold text-amber-900 mb-4 flex items-center justify-center gap-2">
							<Shirt /> Dress Code
						</h2>
						<p className="text-amber-800 text-lg">Consigli per il tuo outfit</p>
					</div>

					<div className="grid md:grid-cols-2 gap-8 mb-8">
						{dressCodeItems.map(
							({ category, icon, title, description, usefulTips }, index) => (
								<div
									key={index}
									className="bg-teal-50 rounded-lg p-6 border border-amber-400/20"
								>
									<div className="text-center mb-4">
										<div className="mb-2 flex justify-center">{icon}</div>
										<h4 className="font-playfair text-xl font-semibold text-amber-900 mb-2">
											{category}
										</h4>
										<h5 className="font-semibold text-amber-800 mb-2">
											{title}
										</h5>
										<p className="text-amber-800 text-sm">{description}</p>
									</div>

									<div className="space-y-3">
										<div>
											<h6 className="font-medium text-amber-800 mb-2 flex items-center">
												<Check className="h-4 w-4 mr-1" />
												Consigli utili:
											</h6>
											<div className="flex flex-wrap gap-2">
												<ul
													className="list-inside space-y-1"
													style={{ listStyleType: "circle" }}
												>
													{usefulTips.map((tip) => (
														<li key={tip} className="text-amber-800 text-sm">
															{tip}
														</li>
													))}
												</ul>
											</div>
										</div>
									</div>
								</div>
							)
						)}
					</div>
				</div>

				<div className="bg-white/80 rounded-lg p-6 text-center border border-amber-400/20">
					<h3 className="font-playfair text-xl font-semibold text-amber-900 mb-4 flex items-center justify-center gap-2">
						<Check className="h-5 w-5 text-amber-800" />
						L&apos;importante è essere te stesso!
					</h3>
					<p className="text-amber-800">
						Queste sono solo indicazioni per aiutarti a scegliere.
						L&apos;importante è che tu ti senta a tuo agio e felice di
						condividere con noi questo momento speciale.
					</p>
				</div>
			</div>
		</section>
	);
};

export default DressCodeSection;
