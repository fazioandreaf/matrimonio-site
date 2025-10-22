'use client';

import { useState } from 'react';
import { Heart, ChevronDown, ChevronUp, Clock, MapPin, Car, Gift, Camera, Users, HelpCircle, Info } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  icon: React.ReactNode;
}

const faqs: FAQItem[] = [
  {
    id: '1',
    question: 'A che ora inizia la cerimonia?',
    answer: 'La cerimonia civile inizierà alle 16:00 presso Il Bosco Di Alberolungo. Ti consigliamo di arrivare con almeno 15 minuti di anticipo per trovare posto e goderti l\'atmosfera.',
    icon: <Clock className="h-5 w-5 text-teal-600" />
  },
  {
    id: '2',
    question: 'Come posso raggiungere la location?',
    answer: 'Il Bosco Di Alberolungo si trova in Via Roccamena, 95024 Acireale CT. C\'è parcheggio gratuito disponibile. Puoi cliccare sulla card dell\'indirizzo nella homepage per aprire Google Maps con le indicazioni precise.',
    icon: <MapPin className="h-5 w-5 text-teal-600" />
  },
  {
    id: '3',
    question: 'C\'è parcheggio disponibile?',
    answer: 'Sì, c\'è parcheggio gratuito disponibile presso la location. Ti consigliamo di arrivare con un po\' di anticipo per trovare facilmente un posto.',
    icon: <Car className="h-5 w-5 text-teal-600" />
  },
  {
    id: '4',
    question: 'Cosa devo indossare?',
    answer: 'Il dress code è Smart Casual Elegante. Per le donne: abito elegante da giorno, vestito o tailleur. Per gli uomini: camicia elegante con pantaloni o giacca sportiva. Evita il nero totale, rosso acceso, jeans e sneakers sportive. Consulta la sezione Dress Code per maggiori dettagli.',
    icon: <Users className="h-5 w-5 text-teal-600" />
  },
  {
    id: '5',
    question: 'Posso portare i bambini?',
    answer: 'Certamente! I bambini sono i benvenuti. Se hai bisogno di seggiolini o cibi specifici, faccelo sapere nella sezione RSVP nel messaggio per gli sposi.',
    icon: <Users className="h-5 w-5 text-teal-600" />
  },
  {
    id: '6',
    question: 'C\'è un menu vegetariano/vegano disponibile?',
    answer: 'Sì, abbiamo opzioni per tutte le esigenze alimentari. Quando confermi la tua presenza tramite RSVP, puoi specificare eventuali allergie o preferenze alimentari nel messaggio per gli sposi.',
    icon: <Gift className="h-5 w-5 text-teal-600" />
  },
  {
    id: '7',
    question: 'Posso fare foto durante la cerimonia?',
    answer: 'Durante la cerimonia civile ti chiediamo di spegnere i telefoni e lasciare che il fotografo ufficiale catturi i momenti più importanti. Dopo la cerimonia, sentiti libero di scattare foto e condividerle nella nostra galleria!',
    icon: <Camera className="h-5 w-5 text-teal-600" />
  },
  {
    id: '8',
    question: 'Cosa succede in caso di maltempo?',
    answer: 'La location ha spazi coperti per la cerimonia e la cena. In caso di pioggia, la celebrazione si svolgerà comunque in sicurezza. Ti terremo aggiornato tramite i nostri canali di comunicazione.',
    icon: <MapPin className="h-5 w-5 text-teal-600" />
  },
  {
    id: '9',
    question: 'Fino a che ora dura la festa?',
    answer: 'La festa continuerà fino a tardi! La cena inizierà alle 19:00 e i festeggiamenti con musica e balli partiranno alle 22:00. Sentiti libero di rimanere quanto vuoi per celebrare con noi.',
    icon: <Clock className="h-5 w-5 text-teal-600" />
  },
  {
    id: '10',
    question: 'Come posso condividere le mie foto?',
    answer: 'Puoi caricare le tue foto direttamente nella sezione Galleria del sito. Basta trascinare le immagini nell\'area di upload o cliccare per selezionarle. Le foto saranno visibili a tutti gli invitati in tempo reale!',
    icon: <Camera className="h-5 w-5 text-teal-600" />
  }
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <Heart className="mx-auto h-12 w-12 text-teal-600 mb-4" />
          <h1 className="font-playfair text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
            <HelpCircle className="h-8 w-8 text-teal-600" />
            Domande Frequenti
          </h1>
          <p className="text-gray-600 text-lg">
            Tutte le risposte alle domande più comuni sul nostro matrimonio
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden"
            >
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-teal-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  {faq.icon}
                  <h3 className="font-semibold text-gray-800">
                    {faq.question}
                  </h3>
                </div>
                {openItems.includes(faq.id) ? (
                  <ChevronUp className="h-5 w-5 text-teal-600" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-teal-600" />
                )}
              </button>
              
              {openItems.includes(faq.id) && (
                <div className="px-6 pb-4">
                  <div className="pl-8 border-l-2 border-green-200">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-teal-50 rounded-lg p-6 text-center">
            <h3 className="font-playfair text-xl font-semibold text-gray-800 mb-4 flex items-center justify-center gap-2">
              <Info className="h-5 w-5 text-teal-600" />
              Altre domande?
            </h3>
          <p className="text-gray-600 mb-4">
            Non hai trovato la risposta che cercavi? Non esitare a contattarci!
          </p>
          <div className="space-y-2 text-sm text-gray-600">
            <p><strong>Email:</strong>fazioandrea.f@gmail.com</p>
            <p><strong>Telefono:</strong> +39 123 456 7890</p>
          </div>
        </div>
      </div>
    </div>
  );
}
