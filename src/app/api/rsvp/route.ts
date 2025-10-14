import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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
        { error: 'Nome e email sono obbligatori' },
        { status: 400 }
      );
    }

    if (data.attending && (!data.guests || data.guests < 1)) {
      return NextResponse.json(
        { error: 'Numero di ospiti non valido' },
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

    console.log('RSVP salvato con successo:', result.id);

    return NextResponse.json({ 
      success: true, 
      message: 'RSVP salvato con successo' 
    });

  } catch (error) {
    console.error('Errore RSVP:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Recuperare tutti gli RSVP dal database
    const rsvps = await prisma.rSVP.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return NextResponse.json({ 
      rsvps,
      total: rsvps.length,
      attending: rsvps.filter(r => r.attending).length,
      totalGuests: rsvps.filter(r => r.attending).reduce((sum, r) => sum + r.guests, 0)
    });
  } catch (error) {
    console.error('Errore recupero RSVP:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
}
