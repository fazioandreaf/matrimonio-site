import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

const playfair = Playfair_Display({
	variable: "--font-playfair",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Andrea & Giuliana",
	description: "Condividi con noi i momenti più belli del nostro matrimonio",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang="it">
			<body
				className={`${inter.variable} ${playfair.variable} antialiased bg-gradient-to-br from-green-50 to-emerald-100 min-h-screen`}
			>
				<Navigation />
				<main className="pt-16">{children}</main>
			</body>
		</html>
	);
};

export default RootLayout;
