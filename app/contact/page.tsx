'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulated form submission
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: '📞',
      title: 'Téléphone',
      value: '+33 1 23 45 67 89',
      link: 'tel:+33123456789'
    },
    {
      icon: '📧',
      title: 'Email',
      value: 'contact@luxe.premium',
      link: 'mailto:contact@luxe.premium'
    },
    {
      icon: '📍',
      title: 'Adresse',
      value: '123 Avenue des Champs, 75008 Paris',
      link: '#'
    },
    {
      icon: '🕐',
      title: 'Heures',
      value: 'Lun-Ven: 9h-18h (UTC+1)',
      link: '#'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-500/20 rounded-full filter blur-3xl opacity-30 animate-pulse delay-75"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-linear-to-r from-amber-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent">
            NOUS CONTACTER
          </h1>
          <p className="text-xl text-gray-400">
            Entrez en contact avec notre équipe pour discuter de votre projet
          </p>
        </motion.div>
      </section>

      {/* Content */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-8">Informations de Contact</h2>

            <div className="space-y-6">
              {contactInfo.map((info, idx) => (
                <motion.a
                  key={idx}
                  href={info.link}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="group block"
                >
                  <div className="bg-linear-to-br from-neutral-900 to-neutral-800 border border-neutral-700 rounded-lg p-6 hover:border-amber-500/50 transition-all">
                    <div className="flex items-center gap-4">
                      <span className="text-4xl">{info.icon}</span>
                      <div>
                        <p className="text-amber-400 font-semibold text-sm">{info.title}</p>
                        <p className="text-white text-lg font-bold group-hover:text-amber-400 transition-colors">{info.value}</p>
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div className="mt-12">
              <h3 className="text-xl font-bold text-white mb-6">Suivez-nous</h3>
              <div className="flex gap-4">
                {['🐦', '🔗', '📘', '📷'].map((icon, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.2, rotateZ: 10 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 rounded-full bg-neutral-800 hover:bg-amber-500 flex items-center justify-center text-2xl transition-all"
                  >
                    {icon}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="bg-linear-to-br from-neutral-900 to-neutral-800 border border-neutral-700 rounded-2xl p-12">
              <h2 className="text-2xl font-bold text-white mb-8">Envoyez-nous un message</h2>

              {/* Name */}
              <div className="mb-6">
                <label className="block text-amber-400 text-sm font-semibold mb-2">Nom</label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 focus:border-amber-400 outline-none text-white transition-colors"
                  placeholder="Votre nom"
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-6">
                <label className="block text-amber-400 text-sm font-semibold mb-2">Email</label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 focus:border-amber-400 outline-none text-white transition-colors"
                  placeholder="votre@email.com"
                  required
                />
              </div>

              {/* Subject */}
              <div className="mb-6">
                <label className="block text-amber-400 text-sm font-semibold mb-2">Sujet</label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 focus:border-amber-400 outline-none text-white transition-colors"
                  placeholder="Sujet de votre message"
                  required
                />
              </div>

              {/* Message */}
              <div className="mb-8">
                <label className="block text-amber-400 text-sm font-semibold mb-2">Message</label>
                <motion.textarea
                  whileFocus={{ scale: 1.02 }}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 focus:border-amber-400 outline-none text-white transition-colors resize-none"
                  placeholder="Votre message..."
                  required
                />
              </div>

              {/* Success Message */}
              {sent && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-400 text-sm"
                >
                  ✓ Merci! Votre message a été envoyé avec succès.
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full py-4 rounded-lg bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-bold transition-all text-lg"
              >
                ENVOYER LE MESSAGE
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="py-20 px-4 border-t border-neutral-800">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Nos bureaux</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { city: 'Paris', address: '123 Avenue des Champs-Élysées' },
              { city: 'Lyon', address: '456 Rue de la République' }
            ].map((office, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                className="bg-linear-to-br from-neutral-900 to-neutral-800 border border-neutral-700 rounded-2xl overflow-hidden h-80 hover:border-amber-500/50 transition-all group"
              >
                <div className="w-full h-full bg-neutral-800 flex items-center justify-center text-gray-400 group-hover:bg-neutral-700/50 transition-colors">
                  <div className="text-center">
                    <p className="text-4xl mb-4">📍</p>
                    <p className="font-bold text-xl text-white">{office.city}</p>
                    <p className="text-gray-400 text-sm mt-2">{office.address}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
