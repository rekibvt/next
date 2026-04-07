'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const services = [
  {
    id: 1,
    icon: '💎',
    title: 'Conseil Premium',
    description: 'Services de conseil haut de gamme pour vos projets les plus exigeants',
    features: ['Stratégie personnalisée', 'Expert dédié', 'Support 24/7'],
    price: 'Sur devis'
  },
  {
    id: 2,
    icon: '🎨',
    title: 'Design Exclusif',
    description: 'Création de designs luxueux et futuristes pour votre marque',
    features: ['Designs uniques', 'Portfolio premium', 'Révisions illimitées'],
    price: 'À partir de 5000€'
  },
  {
    id: 3,
    icon: '🚀',
    title: 'Développement Web',
    description: 'Applications web haute performance et sécurisées',
    features: ['Stack moderne', 'Performance optimale', 'Maintenance incluse'],
    price: 'À partir de 8000€'
  },
  {
    id: 4,
    icon: '📱',
    title: 'Application Mobile',
    description: 'Applications mobiles natives pour iOS et Android',
    features: ['Interface intuitive', 'Offline ready', 'Analytics intégrés'],
    price: 'À partir de 12000€'
  },
  {
    id: 5,
    icon: '📊',
    title: 'Analytics & Data',
    description: 'Analyse de données et insights pour optimiser votre croissance',
    features: ['Dashboard personnalisé', 'Rapports hebdo', 'Predictions IA'],
    price: 'À partir de 3000€'
  },
  {
    id: 6,
    icon: '🔒',
    title: 'Sécurité Enterprise',
    description: 'Solutions de sécurité de niveau enterprise',
    features: ['Audit complet', 'Compliance GDPR', 'Monitoring 24/7'],
    price: 'Sur devis'
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function ServicesPage() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

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
            NOS SERVICES
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Une gamme complète de solutions premium pour transformer votre vision en réalité
          </p>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                onMouseEnter={() => setHoveredId(service.id)}
                onMouseLeave={() => setHoveredId(null)}
                whileHover={{ y: -10 }}
                className="relative group"
              >
                <div className="bg-linear-to-br from-neutral-900 to-neutral-800 border border-neutral-700 rounded-2xl p-8 h-full overflow-hidden">
                  {/* Gradient Background Effect */}
                  <div className="absolute inset-0 bg-linear-to-br from-amber-500/0 to-orange-500/0 group-hover:from-amber-500/10 group-hover:to-orange-500/10 transition-all duration-500"></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="text-5xl mb-4">{service.icon}</div>
                    <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                    <p className="text-gray-400 mb-6">{service.description}</p>

                    {/* Features */}
                    <ul className="space-y-3 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="text-amber-400 text-sm flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Price */}
                    <div className="pt-6 border-t border-neutral-700">
                      <p className="text-amber-400 font-bold text-lg">{service.price}</p>
                    </div>

                    {/* CTA */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full mt-6 py-3 rounded-lg bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-bold transition-all"
                    >
                      En savoir plus
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 border-t border-neutral-800">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-linear-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Prêt à commencer ?
            </span>
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Contactez-nous pour discuter de votre projet et découvrir comment nous pouvons vous aider
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-10 py-4 rounded-full bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-bold transition-all"
          >
            Nous contacter
          </motion.a>
        </motion.div>
      </section>
    </div>
  );
}
