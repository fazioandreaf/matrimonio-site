'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Calendar, MapPin, Clock, Users, ChevronDown, ChevronUp, Car, Gift, X, Check, Camera, MessageSquare, CheckCircle, TreePine, Sun, PartyPopper, Sparkles, HelpCircle, Info } from 'lucide-react';

// Dati per gli eventi
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

// Dati per il dress code
const dressCodeItems = [
  {
    category: 'Donne',
    icon: '👗',
    title: 'Abito Elegante',
    description: 'Abito da giorno elegante, vestito o tailleur',
    colors: ['Verde smeraldo', 'Blu navy', 'Beige', 'Bianco panna', 'Rosa polvere'],
    avoid: ['Nero totale', 'Rosso acceso', 'Bianco puro']
  },
  {
    category: 'Uomini',
    icon: '👔',
    title: 'Smart Casual',
    description: 'Camicia elegante con pantaloni o giacca sportiva',
    colors: ['Blu navy', 'Beige', 'Verde scuro', 'Grigio', 'Bianco'],
    avoid: ['Jeans', 'T-shirt', 'Sneakers sportive']
  }
];

const tips = [
  {
    icon: TreePine,
    title: 'Location nel Bosco',
    description: 'Considera che saremo in un ambiente naturale, evita tacchi troppo alti'
  },
  {
    icon: Sun,
    title: 'Stagione Estiva',
    description: 'Scegli tessuti leggeri e traspiranti per il caldo di maggio'
  },
  {
    icon: Camera,
    title: 'Fotografie',
    description: 'I colori pastello e i toni naturali sono perfetti per le foto'
  },
  {
    icon: PartyPopper,
    title: 'Comfort',
    description: 'Scegli un outfit in cui ti senti a tuo agio per ballare e festeggiare'
  }
];

// Dati per le FAQ
const faqs = [
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
    answer: 'Il dress code è Smart Casual Elegante. Per le donne: abito elegante da giorno, vestito o tailleur. Per gli uomini: camicia elegante con pantaloni o giacca sportiva. Evita il nero totale, rosso acceso, jeans e sneakers sportive.',
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
  }
];

// Interface per RSVP
interface RSVPFormData {
  name: string;
  email: string;
  guests: number;
  message: string;
  attending: boolean;
  hasDietaryRestrictions: boolean;
  dietaryRestrictions: string;
}

export default function Home() {
  // Stati per RSVP
  const [formData, setFormData] = useState<RSVPFormData>({
    name: '',
    email: '',
    guests: 1,
    message: '',
    attending: true,
    hasDietaryRestrictions: false,
    dietaryRestrictions: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Stati per FAQ
  const [openItems, setOpenItems] = useState<string[]>([]);

  // Funzioni per RSVP
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Errore durante l\'invio della risposta');
      }

      setIsSubmitted(true);
    } catch (err) {
      setError('Si è verificato un errore. Riprova più tardi.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
              type === 'number' ? parseInt(value) || 1 : value
    }));
  };

  // Funzioni per FAQ
  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100">
      {/* Sezione Hero con immagine */}
      <section className="relative" style={{ height: 'calc(100vh - 4rem)' }}>
        <div className="absolute inset-0">
          <Image
            src="/6532996.jpeg"
            alt="Andrea & Giuliana - Il nostro amore"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10"></div>
        </div>
        
        {/* Contenuto sopra l'immagine */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
          <h1 className="font-playfair text-5xl md:text-6xl font-bold text-white mb-8 italic drop-shadow-2xl">
            Andrea & Giuliana
          </h1>
          
          <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-3xl">
            <button
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/calendar.ics';
                link.download = 'matrimonio-30-maggio-2027.ics';
                link.click();
              }}
              className="bg-white/60 backdrop-blur-lg rounded-lg p-4 shadow-xl hover:shadow-2xl active:shadow-2xl transition-all duration-300 hover:bg-white/75 cursor-pointer group"
            >
              <Calendar className="h-6 w-6 text-teal-600 mb-3 mx-auto group-hover:scale-110 group-active:scale-110 transition-transform" />
              <h3 className="font-playfair text-xl font-bold text-gray-900 mb-2 drop-shadow-sm">
                Data
              </h3>
              <p className="text-gray-900 group-hover:text-black group-active:text-black transition-colors font-semibold drop-shadow-sm">30 Maggio 2027</p>
              <p className="text-sm text-teal-600 mt-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                Clicca per scaricare il calendario
              </p>
            </button>
            
            <button
              onClick={() => {
                window.open('https://maps.google.com/maps?q=Il+Bosco+Di+Alberolungo+Via+Roccamena+95024+Acireale+CT', '_blank');
              }}
              className="bg-white/60 backdrop-blur-lg rounded-lg p-4 shadow-xl hover:shadow-2xl active:shadow-2xl transition-all duration-300 hover:bg-white/75 cursor-pointer group"
            >
              <MapPin className="h-6 w-6 text-teal-600 mb-3 mx-auto group-hover:scale-110 group-active:scale-110 transition-transform" />
              <h3 className="font-playfair text-xl font-bold text-gray-900 mb-2 drop-shadow-sm">
                Luogo
              </h3>
              <p className="text-gray-900 group-hover:text-black group-active:text-black transition-colors font-semibold drop-shadow-sm">
                Il Bosco Di Alberolungo<br />Via Roccamena, 95024 Acireale CT
              </p>
              <p className="text-sm text-teal-600 mt-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                Clicca per aprire su Google Maps
              </p>
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="text-center">
              <p className="text-xl text-gray-600 mb-6">
                Condividi con noi i momenti più belli della nostra giornata speciale
              </p>
              <Link
                href="/gallery"
                className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 transition-colors"
              >
                <Camera className="mr-2 h-5 w-5" />
                Vedi Galleria
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sezione Eventi */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
              <Calendar className="h-8 w-8 text-teal-600" />
              Programma della Giornata
            </h2>
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
                      <div className="bg-teal-100 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center flex-shrink-0">
                        <span className="text-teal-600 font-bold text-sm md:text-lg">
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-playfair text-2xl font-semibold text-gray-800">
                          {event.title}
                        </h3>
                        <p className="text-gray-600">{event.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Clock className="h-5 w-5 text-teal-600" />
                      <span>{event.time} - {event.duration}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MapPin className="h-5 w-5 text-teal-600" />
                      <span>{event.location}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Users className="h-5 w-5 text-teal-600" />
                      <span>{event.guests}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-teal-50 rounded-lg p-6 text-center">
            <h3 className="font-playfair text-2xl font-semibold text-gray-800 mb-4 flex items-center justify-center gap-2">
              <Gift className="h-6 w-6 text-teal-600" />
              Informazioni Aggiuntive
            </h3>
            <div className="space-y-2 text-gray-600">
              <p><strong>Data:</strong> 30 Maggio 2027</p>
              <p><strong>Dress Code:</strong> Smart Casual Elegante</p>
              <p><strong>Parcheggio:</strong> Disponibile presso Il Bosco Di Alberolungo</p>
              <p><strong>Indirizzo:</strong> Via Roccamena, 95024 Acireale CT</p>
              <p><strong>Contatti:</strong> Per qualsiasi domanda, contattateci</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sezione RSVP */}
      <section className="py-16 px-4 bg-white/30">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <Heart className="mx-auto h-12 w-12 text-teal-600 mb-4" />
            <h2 className="font-playfair text-4xl font-bold text-gray-800 mb-4">
              Conferma la tua presenza
            </h2>
            <p className="text-gray-600 text-lg">
              Aiutaci a organizzare al meglio la nostra giornata speciale
            </p>
          </div>

          {isSubmitted ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg text-center">
              <CheckCircle className="mx-auto h-16 w-16 text-teal-600 mb-6" />
              <h3 className="font-playfair text-3xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-2">
                Grazie per la tua risposta! 
                <Heart className="h-8 w-8 text-teal-600" />
              </h3>
              <p className="text-gray-600 text-lg mb-6">
                Abbiamo ricevuto la tua conferma di presenza. Non vediamo l&apos;ora di condividere con te questo momento speciale!
              </p>
              <div className="bg-teal-50 rounded-lg p-4">
                <p className="text-teal-800">
                  <strong>Data:</strong> 30 Maggio 2027<br />
                  <strong>Luogo:</strong> Il Bosco Di Alberolungo<br />
                  <strong>Indirizzo:</strong> Via Roccamena, 95024 Acireale CT
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nome */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nome e Cognome *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    placeholder="Il tuo nome completo"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    placeholder="la-tua-email@example.com"
                  />
                </div>

                {/* Partecipazione */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Parteciperai al nostro matrimonio? *
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="attending"
                        value="true"
                        checked={formData.attending === true}
                        onChange={() => setFormData(prev => ({ ...prev, attending: true }))}
                        className="mr-3 text-teal-600 focus:ring-green-500"
                      />
                      <span className="text-gray-700 flex items-center gap-1">
                        Sì, parteciperò! 
                        <PartyPopper className="h-4 w-4 text-teal-600" />
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="attending"
                        value="false"
                        checked={formData.attending === false}
                        onChange={() => setFormData(prev => ({ ...prev, attending: false }))}
                        className="mr-3 text-teal-600 focus:ring-green-500"
                      />
                      <span className="text-gray-700">Purtroppo non potrò esserci 😔</span>
                    </label>
                  </div>
                </div>

                {/* Numero ospiti */}
                {formData.attending && (
                  <div>
                    <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-2">
                      <Users className="inline h-4 w-4 mr-1" />
                      Numero di ospiti (incluso te) *
                    </label>
                    <select
                      id="guests"
                      name="guests"
                      required
                      value={formData.guests}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    >
                      {[1, 2, 3, 4, 5, 6].map(num => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'persona' : 'persone'}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Esigenze alimentari */}
                {formData.attending && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Hai esigenze alimentari particolari? (allergie, intolleranze, preferenze)
                    </label>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="hasDietaryRestrictions"
                          value="false"
                          checked={formData.hasDietaryRestrictions === false}
                          onChange={() => setFormData(prev => ({ 
                            ...prev, 
                            hasDietaryRestrictions: false,
                            dietaryRestrictions: ''
                          }))}
                          className="mr-3 text-teal-600 focus:ring-green-500"
                        />
                        <span className="text-gray-700">No, nessuna esigenza particolare</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="hasDietaryRestrictions"
                          value="true"
                          checked={formData.hasDietaryRestrictions === true}
                          onChange={() => setFormData(prev => ({ 
                            ...prev, 
                            hasDietaryRestrictions: true 
                          }))}
                          className="mr-3 text-teal-600 focus:ring-green-500"
                        />
                        <span className="text-gray-700">Sì, ho esigenze alimentari</span>
                      </label>
                    </div>

                    {formData.hasDietaryRestrictions && (
                      <div className="mt-4">
                        <label htmlFor="dietaryRestrictions" className="block text-sm font-medium text-gray-700 mb-2">
                          Specifica le tue esigenze alimentari *
                        </label>
                        <textarea
                          id="dietaryRestrictions"
                          name="dietaryRestrictions"
                          required
                          rows={3}
                          value={formData.dietaryRestrictions}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none"
                          placeholder="Es: Vegetariano, allergico ai frutti di mare, celiaco, etc..."
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Messaggio */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    <MessageSquare className="inline h-4 w-4 mr-1" />
                    Messaggio per gli sposi (opzionale)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none"
                    placeholder="Scrivi un messaggio speciale per gli sposi..."
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-800">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-green-400 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Invio in corso...
                    </>
                  ) : (
                    <>
                      <Heart className="mr-2 h-5 w-5" />
                      Conferma la presenza
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* Sezione Dress Code */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Heart className="mx-auto h-12 w-12 text-teal-600 mb-4" />
            <h2 className="font-playfair text-4xl font-bold text-gray-800 mb-4">
              👗 Dress Code
            </h2>
            <p className="text-gray-600 text-lg">
              Indicazioni per il tuo outfit perfetto per la nostra cerimonia civile
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg mb-8">
            <div className="text-center mb-8">
              <h3 className="font-playfair text-2xl font-semibold text-gray-800 mb-4 flex items-center justify-center gap-2">
                <TreePine className="h-6 w-6 text-teal-600" />
                Cerimonia Civile nel Bosco
              </h3>
              <p className="text-gray-600 text-lg">
                Il nostro matrimonio sarà una celebrazione intima e naturale. 
                Vogliamo che tu ti senta comodo e a tuo agio in un ambiente rilassato ma elegante.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {dressCodeItems.map((item, index) => (
                <div key={index} className="bg-teal-50 rounded-lg p-6">
                  <div className="text-center mb-4">
                    <span className="text-4xl mb-2 block">{item.icon}</span>
                    <h4 className="font-playfair text-xl font-semibold text-gray-800 mb-2">
                      {item.category}
                    </h4>
                    <h5 className="font-semibold text-teal-700 mb-2">{item.title}</h5>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h6 className="font-medium text-teal-700 mb-2 flex items-center">
                        <Check className="h-4 w-4 mr-1" />
                        Colori Consigliati
                      </h6>
                      <div className="flex flex-wrap gap-2">
                        {item.colors.map((color, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm"
                          >
                            {color}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h6 className="font-medium text-red-600 mb-2 flex items-center">
                        <X className="h-4 w-4 mr-1" />
                        Da Evitare
                      </h6>
                      <div className="flex flex-wrap gap-2">
                        {item.avoid.map((item, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg mb-8">
            <h3 className="font-playfair text-2xl font-semibold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
              <Sparkles className="h-6 w-6 text-teal-600" />
              Consigli Utili
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {tips.map((tip, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <tip.icon className="h-6 w-6 text-teal-600" />
                </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">{tip.title}</h4>
                    <p className="text-gray-600 text-sm">{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-teal-50 rounded-lg p-6 text-center">
            <h3 className="font-playfair text-xl font-semibold text-gray-800 mb-4 flex items-center justify-center gap-2">
              <Sparkles className="h-5 w-5 text-teal-600" />
              L&apos;importante è essere te stesso!
            </h3>
            <p className="text-gray-600">
              Queste sono solo indicazioni per aiutarti a scegliere. 
              L&apos;importante è che tu ti senta a tuo agio e felice di condividere con noi questo momento speciale.
            </p>
          </div>
        </div>
      </section>

      {/* Sezione FAQ */}
      <section className="py-16 px-4 bg-white/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Heart className="mx-auto h-12 w-12 text-teal-600 mb-4" />
            <h2 className="font-playfair text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
              <HelpCircle className="h-8 w-8 text-teal-600" />
              Domande Frequenti
            </h2>
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
      </section>
    </div>
  );
}
