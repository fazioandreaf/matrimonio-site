'use client';

import { Heart, X, Check } from 'lucide-react';

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
    icon: '🌿',
    title: 'Location nel Bosco',
    description: 'Considera che saremo in un ambiente naturale, evita tacchi troppo alti'
  },
  {
    icon: '☀️',
    title: 'Stagione Estiva',
    description: 'Scegli tessuti leggeri e traspiranti per il caldo di giugno'
  },
  {
    icon: '📸',
    title: 'Fotografie',
    description: 'I colori pastello e i toni naturali sono perfetti per le foto'
  },
  {
    icon: '🎉',
    title: 'Comfort',
    description: 'Scegli un outfit in cui ti senti a tuo agio per ballare e festeggiare'
  }
];

export default function DressCodePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <Heart className="mx-auto h-12 w-12 text-green-600 mb-4" />
          <h1 className="font-playfair text-4xl font-bold text-gray-800 mb-4">
            👗 Dress Code
          </h1>
          <p className="text-gray-600 text-lg">
            Indicazioni per il tuo outfit perfetto per la nostra cerimonia civile
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg mb-8">
          <div className="text-center mb-8">
            <h2 className="font-playfair text-2xl font-semibold text-gray-800 mb-4">
              🌿 Cerimonia Civile nel Bosco
            </h2>
            <p className="text-gray-600 text-lg">
              Il nostro matrimonio sarà una celebrazione intima e naturale. 
              Vogliamo che tu ti senta comodo e a tuo agio in un ambiente rilassato ma elegante.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {dressCodeItems.map((item, index) => (
              <div key={index} className="bg-green-50 rounded-lg p-6">
                <div className="text-center mb-4">
                  <span className="text-4xl mb-2 block">{item.icon}</span>
                  <h3 className="font-playfair text-xl font-semibold text-gray-800 mb-2">
                    {item.category}
                  </h3>
                  <h4 className="font-semibold text-green-700 mb-2">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium text-green-700 mb-2 flex items-center">
                      <Check className="h-4 w-4 mr-1" />
                      Colori Consigliati
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {item.colors.map((color, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                        >
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-red-600 mb-2 flex items-center">
                      <X className="h-4 w-4 mr-1" />
                      Da Evitare
                    </h5>
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
          <h2 className="font-playfair text-2xl font-semibold text-gray-800 mb-6 text-center">
            💡 Consigli Utili
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {tips.map((tip, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <span className="text-2xl">{tip.icon}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">{tip.title}</h3>
                  <p className="text-gray-600 text-sm">{tip.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-6 text-center">
          <h3 className="font-playfair text-xl font-semibold text-gray-800 mb-4">
            🌟 L&apos;importante è essere te stesso!
          </h3>
          <p className="text-gray-600">
            Queste sono solo indicazioni per aiutarti a scegliere. 
            L&apos;importante è che tu ti senta a tuo agio e felice di condividere con noi questo momento speciale.
          </p>
        </div>
      </div>
    </div>
  );
}
