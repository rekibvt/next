'use client';

import './globals.css'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

interface User {
  id: string;
  email: string;
  name?: string;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const refreshAuth = async () => {
    try {
      const res = await fetch('/api/me', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/me', { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Re-check auth whenever pathname changes (user navigates)
  useEffect(() => {
    // Check auth immediately when path changes
    refreshAuth();
    
    // Also check after a small delay to catch auth changes from login flow
    const timer = setTimeout(refreshAuth, 500);
    return () => clearTimeout(timer);
  }, [pathname]);

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST', credentials: 'include' });
    setUser(null);
    setLoading(false);
    router.push('/');
  };

  const navItems = [
    { href: '/', label: 'ACCUEIL' },
    { href: '/services', label: 'SERVICES' },
    { href: '/about', label: 'À PROPOS' },
    { href: '/blog', label: 'BLOG' },
    { href: '/pricing', label: 'TARIFS' },
    { href: '/contact', label: 'CONTACT' },
  ];

  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-black text-white min-h-screen antialiased overflow-x-hidden">
        {/* Navbar */}
        <motion.nav 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed top-0 left-0 right-0 z-50 border-b border-neutral-800/50 bg-black/40 backdrop-blur-xl"
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/" className="text-2xl font-bold bg-linear-to-r from-amber-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent hover:from-amber-300 hover:via-yellow-200 hover:to-orange-300 transition-all">
                ✨ LUXE
              </Link>
            </motion.div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-12">
              {navItems.map((item) => (
                <motion.div key={item.href} whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                  <Link 
                    href={item.href} 
                    className="text-gray-300 hover:text-amber-400 transition-colors text-sm font-medium relative group"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-amber-400 to-orange-400 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-6">
              {!loading && (user ? (
                <>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link 
                      href="/profile" 
                      className="text-gray-300 hover:text-amber-400 transition-colors text-sm font-medium"
                    >
                      👤 {user.email.split('@')[0]}
                    </Link>
                  </motion.div>
                  <motion.button 
                    onClick={handleLogout}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 rounded-full bg-linear-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-semibold transition-all text-sm"
                  >
                    DÉCONNEXION
                  </motion.button>
                </>
              ) : (
                <>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link 
                      href="/login" 
                      className="text-gray-300 hover:text-amber-400 transition-colors text-sm font-medium"
                    >
                      CONNEXION
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link 
                      href="/register" 
                      className="px-6 py-2 rounded-full bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-semibold transition-all text-sm"
                    >
                      S'INSCRIRE
                    </Link>
                  </motion.div>
                </>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-amber-400 text-2xl"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-neutral-800/50 bg-black/80 backdrop-blur-xl"
            >
              <div className="px-6 py-4 space-y-4">
                {navItems.map((item) => (
                  <Link 
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-gray-300 hover:text-amber-400 transition-colors text-sm font-medium"
                  >
                    {item.label}
                  </Link>
                ))}
                {user ? (
                  <>
                    <Link 
                      href="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-gray-300 hover:text-amber-400 transition-colors text-sm font-medium"
                    >
                      👤 Profil
                    </Link>
                    <button 
                      onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                      className="w-full px-4 py-2 rounded-lg bg-red-600 text-white font-semibold transition-all text-sm"
                    >
                      DÉCONNEXION
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-gray-300 hover:text-amber-400 transition-colors text-sm font-medium"
                    >
                      Connexion
                    </Link>
                    <Link 
                      href="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full px-4 py-2 rounded-lg bg-amber-500 text-black font-semibold transition-all text-sm"
                    >
                      S'inscrire
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </motion.nav>

        {/* Main Content */}
        <main className="pt-20">{children}</main>

        {/* Footer */}
        <footer className="border-t border-neutral-800/50 bg-gradient-to-b from-black to-neutral-950 py-16 mt-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              <div>
                <h3 className="text-amber-400 font-bold mb-4">LUXE</h3>
                <p className="text-gray-400 text-sm">Plateforme premium de luxe et d'exclusivité</p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Navigation</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  {navItems.map((item) => (
                    <li key={item.href}><Link href={item.href} className="hover:text-amber-400 transition-colors">{item.label}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Légal</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><Link href="#" className="hover:text-amber-400 transition-colors">Conditions d'utilisation</Link></li>
                  <li><Link href="#" className="hover:text-amber-400 transition-colors">Politique de confidentialité</Link></li>
                  <li><Link href="#" className="hover:text-amber-400 transition-colors">Cookies</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Contact</h4>
                <p className="text-gray-400 text-sm">contact@luxe.premium</p>
                <p className="text-gray-400 text-sm">+33 1 23 45 67 89</p>
              </div>
            </div>
            <div className="border-t border-neutral-800/50 pt-8 text-center text-gray-500 text-sm">
              <p>&copy; 2026 LUXE. Tous droits réservés.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
