'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const articles = [
  {
    id: 1,
    category: 'Technology',
    title: 'L\'avenir de l\'IA en 2026',
    excerpt: 'Découvrez comment l\'intelligence artificielle transforme les industries',
    date: '15 Mars 2026',
    image: '🤖',
    readTime: '5 min'
  },
  {
    id: 2,
    category: 'Design',
    title: 'Tendances du design luxe',
    excerpt: 'Les styles et palettes de couleurs qui dominent le design premium',
    date: '10 Mars 2026',
    image: '🎨',
    readTime: '7 min'
  },
  {
    id: 3,
    category: 'Business',
    title: 'Stratégies de croissance digitale',
    excerpt: 'Comment les entreprises dominent le marché digital',
    date: '5 Mars 2026',
    image: '📈',
    readTime: '6 min'
  },
  {
    id: 4,
    category: 'Technology',
    title: 'Web3 et blockchain expliqués',
    excerpt: 'Comprendre les technologies décentralisées',
    date: '1 Mars 2026',
    image: '⛓️',
    readTime: '8 min'
  },
  {
    id: 5,
    category: 'Design',
    title: 'UX/UI: créer des expériences mémorables',
    excerpt: 'Les principes fondamentaux du design centré utilisateur',
    date: '25 Février 2026',
    image: '✨',
    readTime: '6 min'
  },
  {
    id: 6,
    category: 'Business',
    title: 'Leadership en 2026',
    excerpt: 'Compétences essentielles pour les leaders modernes',
    date: '20 Février 2026',
    image: '👑',
    readTime: '5 min'
  },
];

const categories = ['Tous', 'Technology', 'Design', 'Business'];

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

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  const filteredArticles = selectedCategory === 'Tous' 
    ? articles 
    : articles.filter(a => a.category === selectedCategory);

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
            BLOG LUXE
          </h1>
          <p className="text-xl text-gray-400">
            Insights, tendances et expertise des leaders de l'industrie
          </p>
        </motion.div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto flex justify-center gap-4 flex-wrap">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full transition-all ${
                selectedCategory === cat
                  ? 'bg-linear-to-r from-amber-500 to-orange-500 text-black font-bold'
                  : 'border border-neutral-700 text-gray-400 hover:text-amber-400 hover:border-amber-500'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredArticles.map((article) => (
              <motion.article
                key={article.id}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
              >
                <div className="bg-linear-to-br from-neutral-900 to-neutral-800 border border-neutral-700 rounded-2xl overflow-hidden h-full hover:border-amber-500/50 transition-all">
                  {/* Image/Icon */}
                  <div className="h-48 bg-linear-to-br from-neutral-800 to-neutral-700 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
                    {article.image}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-amber-400 text-sm font-bold uppercase">{article.category}</p>
                    <h3 className="text-xl font-bold text-white mt-3 mb-2 group-hover:text-amber-400 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">{article.excerpt}</p>

                    {/* Meta */}
                    <div className="flex items-center justify-between pt-4 border-t border-neutral-700 text-xs text-gray-500">
                      <span>{article.date}</span>
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="px-6 pb-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-2 rounded-lg bg-neutral-800 hover:bg-amber-500 hover:text-black text-gray-300 font-semibold transition-all"
                    >
                      Lire plus →
                    </motion.button>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-4 border-t border-neutral-800">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center bg-linear-to-br from-neutral-900 to-neutral-800 border border-neutral-700 rounded-2xl p-12"
        >
          <h2 className="text-3xl font-bold mb-4">Abonnez-vous à notre newsletter</h2>
          <p className="text-gray-400 mb-8">
            Recevez les derniers articles et insights directement dans votre boîte mail
          </p>
          <div className="flex gap-4">
            <input
              type="email"
              placeholder="votre@email.com"
              className="flex-1 px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 focus:border-amber-400 outline-none text-white"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-lg bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-bold transition-all"
            >
              S'abonner
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
