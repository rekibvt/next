'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Erreur de connexion');
        return;
      }

      // Small delay to ensure cookie is set
      await new Promise(resolve => setTimeout(resolve, 200));
      router.refresh();
      
      // Wait a bit more for the layout to re-check auth
      await new Promise(resolve => setTimeout(resolve, 300));
      router.push('/profile');
    } catch (err) {
      setError('Une erreur est survenue');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Titre */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-amber-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent">
            BIENVENUE
          </h1>
          <p className="text-gray-400 text-lg">Connectez-vous à votre compte</p>
        </div>

        {/* Card */}
        <div className="bg-gradient-to-br from-neutral-950 to-neutral-900 border border-neutral-800 rounded-2xl p-8 backdrop-blur-xl shadow-2xl hover:border-neutral-700 transition-all">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-amber-400 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 focus:border-amber-400 focus:outline-none transition-colors text-white placeholder-gray-500"
                placeholder="vous@exemple.com"
                required
              />
            </div>

            {/* Mot de passe */}
            <div>
              <label className="block text-sm font-medium text-amber-400 mb-2">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 focus:border-amber-400 focus:outline-none transition-colors text-white placeholder-gray-500"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Erreur */}
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Bouton */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:from-gray-600 disabled:to-gray-600 text-black font-bold transition-all transform hover:scale-105 active:scale-95"
            >
              {loading ? 'Connexion en cours...' : 'SE CONNECTER'}
            </button>
          </form>

          {/* Lien inscription */}
          <p className="text-center mt-6 text-gray-400 text-sm">
            Pas encore de compte ?{' '}
            <Link href="/register" className="text-amber-400 hover:text-amber-300 font-semibold">
              S'inscrire
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
