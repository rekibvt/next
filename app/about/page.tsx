'use client';

import { motion } from 'framer-motion';

const timeline = [
  { year: '2020', event: 'Fondation de LUXE', description: 'Création de la vision d\'une plateforme premium' },
  { year: '2021', event: 'Expansion', description: 'Élargissement de notre portefeuille de services' },
  { year: '2022', event: 'Innovation', description: 'Lancement de nos solutions IA et ML' },
  { year: '2023', event: 'Croissance', description: 'Atteinte de 500 clients satisfaits' },
  { year: '2024', event: 'Leadership', description: 'Reconnaissance en tant que leader du marché' },
  { year: '2025', event: 'Excellence', description: 'Obtention des certifications ISO' },
];

const values = [
  { icon: '✨', title: 'Excellence', description: 'Nous visons l\'excellence dans chaque projet' },
  { icon: '🔒', title: 'Intégrité', description: 'La confiance est au cœur de nos relations' },
  { icon: '🚀', title: 'Innovation', description: 'Nous repoussons constamment les limites' },
  { icon: '👥', title: 'Collaboration', description: 'Travail d\'équipe pour des résultats exceptionnels' },
];

export default function AboutPage() {
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
            À PROPOS DE LUXE
          </h1>
          <p className="text-xl text-gray-400">
            L'histoire de notre passion pour l'excellence et l'innovation
          </p>
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-linear-to-br from-neutral-900 to-neutral-800 border border-neutral-700 rounded-2xl p-12"
          >
            <h2 className="text-3xl font-bold text-amber-400 mb-4">Notre Mission</h2>
            <p className="text-gray-300 leading-relaxed">
              Fournir des solutions premium et innovantes qui transforment les entreprises en leaders de leur secteur. Nous nous engageons à livrer une excellence inégalée dans chaque projet, en mettant l'accent sur la qualité, la créativité et les résultats mesurables.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-linear-to-br from-neutral-900 to-neutral-800 border border-neutral-700 rounded-2xl p-12"
          >
            <h2 className="text-3xl font-bold text-orange-400 mb-4">Notre Vision</h2>
            <p className="text-gray-300 leading-relaxed">
              Devenir la plateforme de référence pour les services premium et l'innovation technologique. Nous aspir ons à créer un écosystème où l'excellence, la créativité et la technologie convergent pour créer des solutions exceptionnelles.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 border-t border-neutral-800">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16 bg-linear-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent"
          >
            Nos Valeurs
          </motion.h2>

          <div className="grid md:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 text-center hover:border-amber-500/50 transition-colors"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                <p className="text-gray-400 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 border-t border-neutral-800">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16 bg-linear-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent"
          >
            Notre Parcours
          </motion.h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-linear-to-b from-amber-500 to-orange-500"></div>

            <div className="space-y-12">
              {timeline.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`flex ${idx % 2 === 0 ? 'flex-row-reverse' : ''}`}
                >
                  <div className="w-1/2"></div>
                  <div className="w-1/2 px-8">
                    <div className="bg-linear-to-br from-neutral-900 to-neutral-800 border border-neutral-700 rounded-lg p-6">
                      <p className="text-amber-400 font-bold text-lg">{item.year}</p>
                      <h3 className="text-xl font-bold text-white mt-2">{item.event}</h3>
                      <p className="text-gray-400 text-sm mt-2">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Stats */}
      <section className="py-20 px-4 border-t border-neutral-800">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          {[
            { number: '500+', label: 'Clients' },
            { number: '1000+', label: 'Projets' },
            { number: '50+', label: 'Experts' },
            { number: '15+', label: 'Années' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center"
            >
              <p className="text-5xl font-bold bg-linear-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">{stat.number}</p>
              <p className="text-gray-400 text-lg mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
