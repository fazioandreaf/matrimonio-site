import type { Metadata } from "next";
import { Allura, Montserrat } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { RecaptchaProvider } from "@/components/RecaptchaProvider";

const inter = Montserrat({
	variable: "--font-inter",
	subsets: ["latin"],
});

const playfair = Allura({
	variable: "--font-playfair",
	subsets: ["latin"],
	weight: "400",
});

export const metadata: Metadata = {
	title: "Andrea & Giuliana",
	description: "Condividi con noi i momenti più belli del nostro matrimonio",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang="it" suppressHydrationWarning>
			<body suppressHydrationWarning
				className={`${inter.variable} ${playfair.variable} antialiased bg-gradient-to-br from-green-50 to-emerald-100 min-h-screen`}
			>
				<RecaptchaProvider>
					<Navigation />
					<main className="pt-16">{children}</main>
				</RecaptchaProvider>
			</body>
		</html>
	);
};

export default RootLayout;
