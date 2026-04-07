'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/me', { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
        <div className="text-2xl text-gray-400">Chargement...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Vous devez être connecté</p>
          <Link href="/login" className="text-amber-400 hover:text-amber-300">
            Aller à la connexion
          </Link>
        </div>
      </div>
    );
  }

  const joinDate = new Date(user.createdAt).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Titre */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-linear-to-r from-amber-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent">
            MON PROFIL
          </h1>
          <p className="text-gray-400 text-lg">Bienvenue {user.email}</p>
        </div>

        {/* Card Principale */}
        <div className="bg-linear-to-br from-neutral-950 to-neutral-900 border border-neutral-800 rounded-3xl p-12 backdrop-blur-xl shadow-2xl hover:border-neutral-700 transition-all mb-8">
          {/* Avatar Section */}
          <div className="text-center mb-12">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-linear-to-br from-amber-500 to-orange-500 flex items-center justify-center">
              <span className="text-5xl font-bold text-black">
                {user.email.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>

          {/* Infos */}
          <div className="space-y-8">
            {/* Email */}
            <div className="bg-neutral-800/50 rounded-2xl p-6 border border-neutral-700">
              <p className="text-amber-400 text-sm font-semibold mb-2">ADRESSE EMAIL</p>
              <p className="text-white text-2xl font-medium">{user.email}</p>
            </div>

            {/* ID */}
            <div className="bg-neutral-800/50 rounded-2xl p-6 border border-neutral-700">
              <p className="text-amber-400 text-sm font-semibold mb-2">IDENTIFIANT</p>
              <p className="text-gray-300 text-lg font-mono break-all">{user.id}</p>
            </div>

            {/* Date d'inscription */}
            <div className="bg-neutral-800/50 rounded-2xl p-6 border border-neutral-700">
              <p className="text-amber-400 text-sm font-semibold mb-2">MEMBRE DEPUIS</p>
              <p className="text-white text-lg">{joinDate}</p>
            </div>
          </div>

          {/* Bouton Déconnexion */}
          <div className="mt-12 pt-8 border-t border-neutral-700">
            <button
              onClick={async () => {
                await fetch('/api/logout', { method: 'POST', credentials: 'include' });
                router.push('/');
              }}
              className="w-full py-3 rounded-lg bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 hover:border-red-500 text-red-400 font-bold transition-all"
            >
              DÉCONNEXION
            </button>
          </div>
        </div>

        {/* Retour Accueil */}
        <div className="text-center">
          <Link href="/" className="text-gray-400 hover:text-amber-400 transition-colors">
            ← Retourner à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
