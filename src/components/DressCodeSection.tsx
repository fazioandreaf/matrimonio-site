"use client";

import { Shirt, TreePine, Sun, Sparkles, Check } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonDress, faPerson } from "@fortawesome/free-solid-svg-icons";

interface DressCodeItem {
	category: string;
	icon: React.ReactNode;
	title: string;
	description: string;
	colors: string[];
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
		title: "Abito Elegante",
		description: "Abito da giorno elegante, vestito o tailleur",
		colors: [
			"Verde smeraldo",
			"Blu navy",
			"Beige",
			"Bianco panna",
			"Rosa polvere",
		],
	},
	{
		category: "Uomini",
		icon: (
			<FontAwesomeIcon icon={faPerson} size="xl" className="text-amber-800" />
		),
		title: "Smart Casual",
		description: "Camicia elegante con pantaloni o giacca sportiva",
		colors: ["Blu navy", "Beige", "Verde scuro", "Grigio", "Bianco"],
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
						Il nostro matrimonio sarà una celebrazione intima ed elegante.
						Vogliamo che tu ti senta comodo e a tuo agio in un ambiente
						rilassato ma raffinato.
					</p>
				</div>
				<div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg mb-8 border border-amber-400/20">
					<div className="text-center mb-12">
						{/* <Heart className="mx-auto h-12 w-12 text-amber-800 mb-4" /> */}
						<h2 className="font-playfair text-3xl font-bold text-amber-900 mb-4 flex items-center justify-center gap-2">
							<Shirt /> Dress Code
						</h2>
						<p className="text-amber-800 text-lg">
							Indicazioni per il tuo outfit perfetto per la nostra cerimonia
							civile
						</p>
					</div>

					<div className="grid md:grid-cols-2 gap-8 mb-8">
						{dressCodeItems.map((item, index) => (
							<div
								key={index}
								className="bg-teal-50 rounded-lg p-6 border border-amber-400/20"
							>
								<div className="text-center mb-4">
									<div className="mb-2 flex justify-center">{item.icon}</div>
									<h4 className="font-playfair text-xl font-semibold text-amber-900 mb-2">
										{item.category}
									</h4>
									<h5 className="font-semibold text-amber-800 mb-2">
										{item.title}
									</h5>
									<p className="text-amber-800 text-sm">{item.description}</p>
								</div>

								<div className="space-y-3">
									<div>
										<h6 className="font-medium text-amber-800 mb-2 flex items-center">
											<Check className="h-4 w-4 mr-1" />
											Colori Consigliati
										</h6>
										<div className="flex flex-wrap gap-2">
											{item.colors.map((color, i) => (
												<span
													key={i}
													className="px-3 py-1 bg-amber-400/20 border border-amber-400/40 text-amber-800 rounded-full text-sm"
												>
													{color}
												</span>
											))}
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg mb-8 border border-amber-400/20">
					<h3 className="font-playfair text-2xl font-semibold text-amber-900 mb-6 text-center flex items-center justify-center gap-2">
						<Sparkles className="h-6 w-6 text-amber-800" />
						Consigli Utili
					</h3>

					<div className="grid md:grid-cols-2 gap-6">
						{tips.map((tip, index) => (
							<div key={index} className="flex items-start space-x-4">
								<div className="flex-shrink-0">
									<tip.icon className="h-6 w-6 text-amber-800" />
								</div>
								<div>
									<h4 className="font-semibold text-amber-900 mb-1">
										{tip.title}
									</h4>
									<p className="text-amber-800 text-sm">{tip.description}</p>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="bg-white/80 rounded-lg p-6 text-center border border-amber-400/20">
					<h3 className="font-playfair text-xl font-semibold text-amber-900 mb-4 flex items-center justify-center gap-2">
						<Sparkles className="h-5 w-5 text-amber-800" />
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
