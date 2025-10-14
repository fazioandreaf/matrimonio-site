import Link from 'next/link';
import { Clock, MapPin, Users } from 'lucide-react';

const events = [
  {
    id: 1,
    title: 'Cerimonia',
    time: '16:00',
    duration: '1 ora',
    location: 'Il Bosco Di Alberolungo',
    description: 'La cerimonia che unirà i nostri cuori per sempre nel verde della natura',
    guests: 'Intimi',
  },
  {
    id: 2,
    title: 'Aperitivo',
    time: '17:30',
    duration: '1 ora',
    location: 'Giardino del Bosco',
    description: 'Un momento di convivialità con aperitivo e brindisi nella natura',
    guests: 'Tutti gli invitati',
  },
  {
    id: 3,
    title: 'Cena di Gala',
    time: '19:00',
    duration: '3 ore',
    location: 'Sala del Bosco',
    description: 'Una cena elegante con menu personalizzato e vini selezionati',
    guests: 'Tutti gli invitati',
  },
  {
    id: 4,
    title: 'Festa e Ballo',
    time: '22:00',
    duration: 'Fino a tardi',
    location: 'Terrazza del Bosco',
    description: 'Musica, balli e festeggiamenti fino all\'alba sotto le stelle',
    guests: 'Tutti gli invitati',
  },
];

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="font-playfair text-4xl font-bold text-gray-800 mb-4">
            📅 Programma della Giornata
          </h1>
          <p className="text-gray-600 text-lg">
            Scopri tutti i momenti speciali che abbiamo preparato per voi
          </p>
        </div>

        <div className="space-y-8">
          {events.map((event, index) => (
            <div
              key={event.id}
              className="bg-white/70 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center">
                      <span className="text-green-600 font-bold text-lg">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <h2 className="font-playfair text-2xl font-semibold text-gray-800">
                        {event.title}
                      </h2>
                      <p className="text-gray-600">{event.description}</p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Clock className="h-5 w-5 text-green-600" />
                    <span>{event.time} - {event.duration}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="h-5 w-5 text-green-600" />
                    <span>{event.location}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Users className="h-5 w-5 text-green-600" />
                    <span>{event.guests}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-green-50 rounded-lg p-6 text-center">
          <h3 className="font-playfair text-2xl font-semibold text-gray-800 mb-4">
            💝 Informazioni Aggiuntive
          </h3>
          <div className="space-y-2 text-gray-600">
            <p><strong>Data:</strong> 30 Giugno 2027</p>
            <p><strong>Dress Code:</strong> <Link href="/dresscode" className="text-green-600 hover:text-green-700 underline">Smart Casual Elegante</Link></p>
            <p><strong>Parcheggio:</strong> Disponibile presso Il Bosco Di Alberolungo</p>
            <p><strong>Indirizzo:</strong> Via Roccamena, 95024 Acireale CT</p>
            <p><strong>Contatti:</strong> Per qualsiasi domanda, contattateci</p>
          </div>
        </div>
      </div>
    </div>
  );
}
