import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

// Funzione per inviare email
async function sendRSVPEmail(data: RSVPData) {
	const subject = `RSVP - ${data.name}`;

	// Prepara le variabili per il template Resend
	const templateVariables: Record<string, string> = {
		NAME: data.name,
		EMAIL: data.email,
		ATTENDING: data.attending ? "Sì" : "No",
		GUESTS: data.guests.toString(),
		DIETARY_RESTRICTIONS: data.dietaryRestrictions || "",
		MESSAGE: data.message || "",
	};

	try {
		const resend = new Resend(process.env.RESEND_API_KEY);

		const { data: emailData, error } = await resend.emails.send({
			from: "RSVP Matrimonio <onboarding@resend.dev>",
			to: ["fazioandrea.f@gmail.com"],
			subject: subject,
			template: {
				id: "event-rsvp-confirmation",
				variables: templateVariables,
			},
		});

		if (error) {
			throw new Error(`Resend error: ${error.message}`);
		}

		return emailData;
	} catch (error) {
		console.error("Errore invio email:", error);
		throw error;
	}
}

interface RSVPData {
	name: string;
	email: string;
	guests: number;
	message: string;
	attending: boolean;
	hasDietaryRestrictions: boolean;
	dietaryRestrictions: string;
	recaptchaToken?: string;
}

async function verifyRecaptcha(token: string): Promise<boolean> {
	try {
		const secretKey = process.env.GOOGLE_RECAPTCHA_SECRET_KEY;
		
		if (!secretKey) {
			console.error('GOOGLE_RECAPTCHA_SECRET_KEY non configurata');
			return false;
		}

		const response = await fetch(
			'https://www.google.com/recaptcha/api/siteverify',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: `secret=${secretKey}&response=${token}`,
			}
		);

		const data = await response.json();
		return data.success === true;
	} catch (error) {
		console.error('Errore verifica reCAPTCHA:', error);
		return false;
	}
}

export async function POST(request: NextRequest) {
	try {
		const data: RSVPData = await request.json();

		// Verifica reCAPTCHA
		if (!data.recaptchaToken) {
			return NextResponse.json(
				{ error: "Token reCAPTCHA mancante" },
				{ status: 400 }
			);
		}

		const isValidRecaptcha = await verifyRecaptcha(data.recaptchaToken);
		if (!isValidRecaptcha) {
			return NextResponse.json(
				{ error: "Verifica reCAPTCHA fallita. Riprova." },
				{ status: 400 }
			);
		}

		// Validazione dei dati
		if (!data.name || !data.email) {
			return NextResponse.json(
				{ error: "Nome e email sono obbligatori" },
				{ status: 400 }
			);
		}

		if (data.attending && (!data.guests || data.guests < 1)) {
			return NextResponse.json(
				{ error: "Numero di ospiti non valido" },
				{ status: 400 }
			);
		}

		// Salvare i dati nel database
		const result = await prisma.rSVP.create({
			data: {
				name: data.name,
				email: data.email,
				guests: parseInt(data.guests.toString()),
				attending: data.attending,
				message: data.message || null,
				hasDietaryRestrictions: data.hasDietaryRestrictions,
				dietaryRestrictions: data.dietaryRestrictions || null,
			},
		});

		console.log("RSVP salvato con successo:", result.id);

		// Inviare email di notifica
		try {
			console.log("Tentativo invio email per:", data.name);
			console.log("RESEND_API_KEY presente:", !!process.env.RESEND_API_KEY);

			const emailResult = await sendRSVPEmail(data);
			console.log("Email RSVP inviata con successo:", emailResult);
		} catch (emailError) {
			console.error("Errore invio email RSVP:", emailError);
			// Non bloccare la risposta anche se l'email fallisce
		}

		return NextResponse.json({
			success: true,
			message: "RSVP salvato con successo",
		});
	} catch (error) {
		console.error("Errore RSVP:", error);
		return NextResponse.json(
			{ error: "Errore interno del server" },
			{ status: 500 }
		);
	}
}

export async function GET() {
	try {
		// Recuperare tutti gli RSVP dal database
		const rsvps = await prisma.rSVP.findMany({
			orderBy: {
				createdAt: "desc",
			},
		});

		return NextResponse.json({
			rsvps,
			total: rsvps.length,
			attending: rsvps.filter((r) => r.attending).length,
			totalGuests: rsvps
				.filter((r) => r.attending)
				.reduce((sum, r) => sum + r.guests, 0),
		});
	} catch (error) {
		console.error("Errore recupero RSVP:", error);
		return NextResponse.json(
			{ error: "Errore interno del server" },
			{ status: 500 }
		);
	}
}
