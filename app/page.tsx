'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name?: string;
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/me', { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <div className="min-h-[calc(100vh-80px)]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-500/20 rounded-full filter blur-3xl opacity-30 animate-pulse delay-75"></div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center space-y-8">
            {/* Main Title */}
            <h1 className="text-6xl md:text-8xl font-bold leading-tight">
              <span className="bg-linear-to-r from-amber-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent">
                LUXE
              </span>
              <br />
              <span className="text-white">PLATEFORME PREMIUM</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Découvrez l'expérience ultime de luxe et d'exclusivité. 
              {!user ? ' Rejoignez notre communauté d\'élite.' : ` Bienvenue ${user.email}.`}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              {!loading && !user ? (
                <>
                  <Link 
                    href="/register"
                    className="px-8 py-4 rounded-full bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-bold text-lg transition-all transform hover:scale-105 active:scale-95 shadow-xl"
                  >
                    COMMENCER
                  </Link>
                  <Link 
                    href="/login"
                    className="px-8 py-4 rounded-full border-2 border-amber-500 text-amber-400 hover:bg-amber-500/10 font-bold text-lg transition-all"
                  >
                    SE CONNECTER
                  </Link>
                </>
              ) : (
                <Link 
                  href="/profile"
                  className="px-8 py-4 rounded-full bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-bold text-lg transition-all transform hover:scale-105 active:scale-95 shadow-xl"
                >
                  ALLER AU PROFIL
                </Link>
              )}
            </div>
          </div>

          {/* Features Grid */}
          <div className="mt-24 grid md:grid-cols-3 gap-8">
            {[
              { icon: '✨', title: 'Exclusivité', desc: 'Accès à du contenu premium' },
              { icon: '🔐', title: 'Sécurité', desc: 'Votre compte protégé' },
              { icon: '⚡', title: 'Performance', desc: 'Expérience ultra-rapide' },
            ].map((item, i) => (
              <div key={i} className="bg-linear-to-br from-neutral-900 to-neutral-800 border border-neutral-700 rounded-2xl p-8 hover:border-amber-500/50 transition-all hover:shadow-lg hover:shadow-amber-500/20">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-amber-400 mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 border-t border-neutral-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-linear-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Prêt à rejoindre l'élite ?
            </span>
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Accédez à des avantages exclusifs et une expérience inégalée.
          </p>
          {!loading && !user && (
            <Link 
              href="/register"
              className="inline-block px-10 py-4 rounded-full bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-bold text-lg transition-all transform hover:scale-105"
            >
              S'INSCRIRE MAINTENANT
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
