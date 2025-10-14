'use client';

import { useState } from 'react';
import { Heart, Users, Mail, MessageSquare, CheckCircle } from 'lucide-react';

interface RSVPFormData {
  name: string;
  email: string;
  guests: number;
  message: string;
  attending: boolean;
  hasDietaryRestrictions: boolean;
  dietaryRestrictions: string;
}

export default function RSVPPage() {
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

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg text-center">
            <CheckCircle className="mx-auto h-16 w-16 text-green-600 mb-6" />
            <h1 className="font-playfair text-3xl font-bold text-gray-800 mb-4">
              Grazie per la tua risposta! 💚
            </h1>
            <p className="text-gray-600 text-lg mb-6">
              Abbiamo ricevuto la tua conferma di presenza. Non vediamo l'ora di condividere con te questo momento speciale!
            </p>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-green-800">
                <strong>Data:</strong> 30 Giugno 2027<br />
                <strong>Luogo:</strong> Il Bosco Di Alberolungo<br />
                <strong>Indirizzo:</strong> Via Roccamena, 95024 Acireale CT
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <Heart className="mx-auto h-12 w-12 text-green-600 mb-4" />
          <h1 className="font-playfair text-4xl font-bold text-gray-800 mb-4">
            Conferma la tua presenza
          </h1>
          <p className="text-gray-600 text-lg">
            Aiutaci a organizzare al meglio la nostra giornata speciale
          </p>
        </div>

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
                    className="mr-3 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-gray-700">Sì, parteciperò! 🎉</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="attending"
                    value="false"
                    checked={formData.attending === false}
                    onChange={() => setFormData(prev => ({ ...prev, attending: false }))}
                    className="mr-3 text-green-600 focus:ring-green-500"
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
                      className="mr-3 text-green-600 focus:ring-green-500"
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
                      className="mr-3 text-green-600 focus:ring-green-500"
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
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
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
      </div>
    </div>
  );
}
