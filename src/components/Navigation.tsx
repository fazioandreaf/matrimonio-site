'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Camera, Home, X, Calendar, MapPin, Users, HelpCircle } from 'lucide-react';
import { clsx } from 'clsx';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Galleria', href: '/gallery', icon: Camera },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Blocca lo scroll quando il menu è aperto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup quando il componente viene smontato
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Aggiungi le animazioni CSS
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideDown {
        from { 
          opacity: 0;
          transform: translateY(-10px);
        }
        to { 
          opacity: 1;
          transform: translateY(0);
        }
      }
      html {
        scroll-behavior: smooth;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Funzione per scroll smooth con offset
  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      const navHeight = 64; // h-16 = 4rem = 64px
      const elementPosition = element.offsetTop - navHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-teal-200 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-playfair text-2xl font-bold text-gray-800">
              Andrea & Giuliana
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={clsx(
                    'flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-teal-100 text-teal-700'
                      : 'text-gray-600 hover:text-teal-600 hover:bg-teal-50'
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-teal-600 hover:bg-teal-50 transition-all duration-200 ease-in-out"
            >
              <div className="transition-transform duration-200 ease-in-out">
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu overlay */}
        {isMenuOpen && (
          <div 
            className="md:hidden fixed inset-0 top-16 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ease-in-out"
            style={{
              animation: 'fadeIn 0.3s ease-in-out'
            }}
          >
            <div 
              className="bg-white/90 backdrop-blur-lg border-t border-teal-200 shadow-lg transition-transform duration-300 ease-in-out"
              style={{
                animation: 'slideDown 0.3s ease-in-out'
              }}
            >
              <div className="px-4 py-4 space-y-2">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={clsx(
                        'flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-colors',
                        isActive
                          ? 'bg-teal-100 text-teal-700'
                          : 'text-gray-700 hover:text-teal-600 hover:bg-teal-50'
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
                
                {/* Sezioni della homepage */}
                {pathname === '/' && (
                  <>
                    <div className="border-t border-teal-200 my-2"></div>
                    <div className="px-2 py-1">
                      <p className="text-xs font-semibold text-teal-600 uppercase tracking-wide">Sezioni</p>
                    </div>
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        setTimeout(() => smoothScrollTo('events'), 100);
                      }}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-colors w-full text-left"
                    >
                      <Calendar className="h-5 w-5" />
                      <span>Programma</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        setTimeout(() => smoothScrollTo('dresscode'), 100);
                      }}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-colors w-full text-left"
                    >
                      <Users className="h-5 w-5" />
                      <span>Dress Code</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        setTimeout(() => smoothScrollTo('rsvp'), 100);
                      }}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-colors w-full text-left"
                    >
                      <Users className="h-5 w-5" />
                      <span>RSVP</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        setTimeout(() => smoothScrollTo('faq'), 100);
                      }}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-colors w-full text-left"
                    >
                      <HelpCircle className="h-5 w-5" />
                      <span>FAQ</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
