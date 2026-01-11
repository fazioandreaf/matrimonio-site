import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

// Funzione per inviare email
async function sendRSVPEmail(data: RSVPData) {
	const subject = `RSVP - ${data.name}`;

	const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #0d9488; border-bottom: 2px solid #0d9488; padding-bottom: 10px;">
        🎉 Nuova Conferma RSVP
      </h2>
      
      <div style="background-color: #f0fdfa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #0f766e; margin-top: 0;">Informazioni Personali</h3>
        <p><strong>Nome:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Partecipa:</strong> ${data.attending ? "✅ Sì" : "❌ No"}</p>
        ${data.attending ? `<p><strong>Numero ospiti:</strong> ${data.guests}</p>` : ""}
      </div>
      
      ${
				data.hasDietaryRestrictions && data.dietaryRestrictions
					? `
        <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #92400e; margin-top: 0;">🍽️ Esigenze Alimentari</h3>
          <p>${data.dietaryRestrictions}</p>
        </div>
      `
					: ""
			}
      
      ${
				data.message
					? `
        <div style="background-color: #e0f2fe; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #0369a1; margin-top: 0;">💌 Messaggio per gli Sposi</h3>
          <p style="font-style: italic;">"${data.message}"</p>
        </div>
      `
					: ""
			}
      
      <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin-top: 20px; text-align: center;">
        <p style="margin: 0; color: #6b7280; font-size: 14px;">
          RSVP ricevuto il ${new Date().toLocaleDateString("it-IT")} alle ${new Date().toLocaleTimeString("it-IT")}
        </p>
      </div>
    </div>
  `;

	const textContent = `
Nuova Conferma RSVP

Informazioni Personali:
- Nome: ${data.name}
- Email: ${data.email}
- Partecipa: ${data.attending ? "Sì" : "No"}
${data.attending ? `- Numero ospiti: ${data.guests}` : ""}

${
	data.hasDietaryRestrictions && data.dietaryRestrictions
		? `
Esigenze Alimentari:
${data.dietaryRestrictions}
`
		: ""
}

${
	data.message
		? `
Messaggio per gli Sposi:
"${data.message}"
`
		: ""
}

RSVP ricevuto il ${new Date().toLocaleDateString("it-IT")} alle ${new Date().toLocaleTimeString("it-IT")}
  `;

	try {
		const resend = new Resend(process.env.RESEND_API_KEY);

		const { data: emailData, error } = await resend.emails.send({
			from: "RSVP Matrimonio <onboarding@resend.dev>",
			to: ["fazioandrea.f@gmail.com"],
			cc: ["giuliana.riolo@gmail.com"],
			subject: subject,
			html: htmlContent,
			text: textContent,
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
}

export async function POST(request: NextRequest) {
	try {
		const data: RSVPData = await request.json();

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
