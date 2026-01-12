"use client";

import { Gift, Copy, Check, Heart } from "lucide-react";
import { useState } from "react";

const GiftSection = () => {
	const [copied, setCopied] = useState(false);
	const iban = "IT92E0200809500000420788013";
	const beneficiary = "Andrea Fazio";

	const copyToClipboard = () => {
		navigator.clipboard.writeText(iban);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<section
			className="py-16 px-4 bg-gradient-to-br from-teal-50 to-teal-100"
			id="gift"
		>
			<div className="max-w-4xl mx-auto">
				<div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-amber-400/20">
					<div className="text-center mb-8">
						<Gift className="mx-auto h-12 w-12 text-amber-800 mb-4" />
						<h2 className="font-playfair text-3xl font-bold text-amber-900 mb-4">
							Luna di miele
						</h2>
						<p className="text-amber-800 text-lg max-w-2xl mx-auto">
							Se desiderate farci un dono, saremo felici di ricevere un
							contributo per il nostro futuro viaggio
						</p>
					</div>

					<div className="bg-teal-50 rounded-lg p-6 border border-amber-400/20 max-w-2xl mx-auto">
						<div className="space-y-4">
							<div className="text-center">
								<p className="text-amber-800 font-medium mb-2">Intestatario:</p>
								<p className="text-amber-900 font-semibold text-lg">
									{beneficiary}
								</p>
							</div>

							<div className="text-center">
								<p className="text-amber-800 font-medium mb-2">IBAN:</p>
								<div className="bg-white rounded-lg p-4 border border-amber-400/30">
									<p className="text-amber-900 font-mono text-sm md:text-base font-semibold break-all">
										{iban}
									</p>
								</div>
							</div>

							<div className="flex justify-center pt-2">
								<button
									onClick={copyToClipboard}
									className="flex items-center gap-2 bg-amber-800 hover:bg-amber-900 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-medium"
								>
									{copied ? (
										<>
											<Check className="h-5 w-5" />
											Copiato!
										</>
									) : (
										<>
											<Copy className="h-5 w-5" />
											Copia IBAN
										</>
									)}
								</button>
							</div>
						</div>
					</div>

					<div className="mt-6 text-center">
						<p className="text-amber-800 text-sm italic flex items-center justify-center gap-2">
							Grazie di cuore per il vostro pensiero! <Heart className="h-5 w-5 italic" />
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default GiftSection;
