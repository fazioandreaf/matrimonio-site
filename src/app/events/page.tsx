import { Calendar, Clock, MapPin, Users } from 'lucide-react';

const events = [
  {
    id: 1,
    title: 'Cerimonia',
    time: '16:00',
    duration: '1 ora',
    location: 'Cappella della Villa',
    description: 'La cerimonia religiosa che unirà i nostri cuori per sempre',
    guests: 'Intimi',
  },
  {
    id: 2,
    title: 'Aperitivo',
    time: '17:30',
    duration: '1 ora',
    location: 'Giardino della Villa',
    description: 'Un momento di convivialità con aperitivo e brindisi',
    guests: 'Tutti gli invitati',
  },
  {
    id: 3,
    title: 'Cena di Gala',
    time: '19:00',
    duration: '3 ore',
    location: 'Sala dei Ricevimenti',
    description: 'Una cena elegante con menu personalizzato e vini selezionati',
    guests: 'Tutti gli invitati',
  },
  {
    id: 4,
    title: 'Festa e Ballo',
    time: '22:00',
    duration: 'Fino a tardi',
    location: 'Terrazza Panoramica',
    description: 'Musica, balli e festeggiamenti fino all\'alba',
    guests: 'Tutti gli invitati',
  },
];

export default function EventsPage() {
  return (
    <div className="min-h-screen py-8">
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
                    <div className="bg-pink-100 rounded-full w-12 h-12 flex items-center justify-center">
                      <span className="text-pink-600 font-bold text-lg">
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
                    <Clock className="h-5 w-5 text-pink-600" />
                    <span>{event.time} - {event.duration}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="h-5 w-5 text-pink-600" />
                    <span>{event.location}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Users className="h-5 w-5 text-pink-600" />
                    <span>{event.guests}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-pink-50 rounded-lg p-6 text-center">
          <h3 className="font-playfair text-2xl font-semibold text-gray-800 mb-4">
            💝 Informazioni Aggiuntive
          </h3>
          <div className="space-y-2 text-gray-600">
            <p><strong>Dress Code:</strong> Elegante</p>
            <p><strong>Parcheggio:</strong> Disponibile presso la Villa</p>
            <p><strong>Contatti:</strong> Per qualsiasi domanda, contattateci</p>
          </div>
        </div>
      </div>
    </div>
  );
}
