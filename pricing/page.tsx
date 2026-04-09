'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const plans = [
  {
    name: 'STARTER',
    price: '29',
    description: 'Pour les petits projets',
    features: [
      '5 Projets',
      'Support email',
      'Mises à jour incluses',
      'Templates de base',
      'Rapports mensuels'
    ],
    highlighted: false
  },
  {
    name: 'PROFESSIONAL',
    price: '99',
    description: 'Pour les entreprises en croissance',
    features: [
      'Projets illimités',
      'Support prioritaire',
      'Mises à jour en temps réel',
      'Templates premium',
      'Rapports détaillés',
      'API access',
      'Équipe dédiée'
    ],
    highlighted: true
  },
  {
    name: 'ENTERPRISE',
    price: 'Devis',
    description: 'Solutions personnalisées',
    features: [
      'Tout inclus',
      'Support 24/7',
      'Mises à jour custom',
      'Designs uniques',
      'Analytics avancées',
      'API illimitée',
      'Équipe dédiée fulltime',
      'Consulting stratégique'
    ],
    highlighted: false
  }
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

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

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
            TARIFICATION TRANSPARENTE
          </h1>
          <p className="text-xl text-gray-400">
            Choisissez le plan qui convient à vos besoins
          </p>
        </motion.div>
      </section>

      {/* Billing Toggle */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto flex justify-center items-center gap-4">
          <span className={`text-lg font-semibold ${billingCycle === 'monthly' ? 'text-white' : 'text-gray-500'}`}>
            Mensuel
          </span>
          <motion.button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            className="relative w-16 h-8 rounded-full bg-neutral-800 border border-neutral-700"
            whileHover={{ borderColor: '#b45309' }}
          >
            <motion.div
              animate={{ x: billingCycle === 'yearly' ? 32 : 2 }}
              className="absolute top-1 w-6 h-6 bg-linear-to-r from-amber-500 to-orange-500 rounded-full"
            />
          </motion.button>
          <span className={`text-lg font-semibold ${billingCycle === 'yearly' ? 'text-white' : 'text-gray-500'}`}>
            Annuel
          </span>
          {billingCycle === 'yearly' && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="ml-4 px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-semibold"
            >
              Économisez 20%
            </motion.span>
          )}
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {plans.map((plan, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className={`relative rounded-2xl overflow-hidden transition-all ${
                  plan.highlighted ? 'ring-2 ring-amber-400' : ''
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-amber-500 to-orange-500"></div>
                )}

                <div className={`bg-linear-to-br from-neutral-900 to-neutral-800 border ${
                  plan.highlighted ? 'border-amber-400/50' : 'border-neutral-700'
                } p-12 h-full flex flex-col`}>
                  {plan.highlighted && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      className="absolute top-4 right-4 px-4 py-1 rounded-full bg-amber-500/20 text-amber-400 font-bold text-sm"
                    >
                      POPULAIRE
                    </motion.div>
                  )}

                  {/* Plan Name */}
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 text-sm mb-8">{plan.description}</p>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold text-white">{plan.price}</span>
                      {plan.price !== 'Devis' && <span className="text-gray-400">€/{billingCycle === 'monthly' ? 'mois' : 'an'}</span>}
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-12 flex-1">
                    {plan.features.map((feature, fidx) => (
                      <motion.li
                        key={fidx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: fidx * 0.05 }}
                        className="flex items-center gap-3 text-gray-300"
                      >
                        <span className="w-2 h-2 bg-linear-to-r from-amber-400 to-orange-400 rounded-full"></span>
                        {feature}
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-3 rounded-lg font-bold transition-all ${
                      plan.highlighted
                        ? 'bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black'
                        : 'bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700 hover:border-amber-500'
                    }`}
                  >
                    {plan.price === 'Devis' ? 'Nous contacter' : 'Commencer'}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 border-t border-neutral-800">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-center mb-16 bg-linear-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
            Questions Fréquentes
          </h2>

          <div className="space-y-6">
            {[
              { q: 'Puis-je changer de plan?', a: 'Oui, vous pouvez changer de plan à tout moment sans frais supplémentaires.' },
              { q: 'Y a-t-il une période d\'essai gratuit?', a: 'Oui, 14 jours gratuits pour tous les nouveaux utilisateurs.' },
              { q: 'Quel support client proposez-vous?', a: 'Support email 24/7 inclus, support prioritaire sur les plans Pro et Enterprise.' },
              { q: 'Acceptez-vous les paiements récurrents?', a: 'Oui, facturation automatique chaque mois ou chaque année selon votre choix.' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6 hover:border-amber-500/50 transition-colors"
              >
                <h4 className="font-bold text-white mb-2">{item.q}</h4>
                <p className="text-gray-400 text-sm">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
