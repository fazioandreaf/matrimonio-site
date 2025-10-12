import Link from 'next/link';
import { Heart, Camera, Calendar, MapPin } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Heart className="mx-auto h-16 w-16 text-pink-600 mb-6" />
            <h1 className="font-playfair text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              Il Nostro Matrimonio
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Condividi con noi i momenti più belli della nostra giornata speciale
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 shadow-lg">
              <Calendar className="h-8 w-8 text-pink-600 mb-4 mx-auto" />
              <h3 className="font-playfair text-2xl font-semibold text-gray-800 mb-2">
                Data
              </h3>
              <p className="text-gray-600">15 Giugno 2024</p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 shadow-lg">
              <MapPin className="h-8 w-8 text-pink-600 mb-4 mx-auto" />
              <h3 className="font-playfair text-2xl font-semibold text-gray-800 mb-2">
                Luogo
              </h3>
              <p className="text-gray-600">Villa dei Fiori, Toscana</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/gallery"
              className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 transition-colors"
            >
              <Camera className="mr-2 h-5 w-5" />
              Vedi Galleria
            </Link>
            
            <Link
              href="/events"
              className="inline-flex items-center px-8 py-4 border border-pink-600 text-base font-medium rounded-md text-pink-600 bg-white hover:bg-pink-50 transition-colors"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Programma Eventi
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-playfair text-3xl font-bold text-gray-800 mb-8">
            Come Funziona
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-pink-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-pink-600">1</span>
              </div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                Carica le Foto
              </h3>
              <p className="text-gray-600">
                Vai nella galleria e carica le tue foto più belle del matrimonio
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-pink-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-pink-600">2</span>
              </div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                Condividi i Momenti
              </h3>
              <p className="text-gray-600">
                Le tue foto saranno visibili a tutti gli invitati in tempo reale
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-pink-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-pink-600">3</span>
              </div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                Crea Ricordi
              </h3>
              <p className="text-gray-600">
                Insieme creeremo una collezione di ricordi indimenticabili
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
