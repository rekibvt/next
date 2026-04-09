// app/dashboard/page.tsx
'use client';

import { motion } from 'framer-motion';

export default function Dashboard() {
  return (
    <motion.div 
      className="border-2 border-dashed border-cyber-blue rounded-2xl p-20 text-center bg-dark-void shadow-neon-blue mx-auto mt-20"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
    >
      <motion.h2 
        className="text-4xl font-extrabold text-cyber-green text-glow mb-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 120 }}
      >
        ZONE SÉCURISÉE
      </motion.h2>
      <motion.p 
        className="text-xl text-gray-400 mt-2 font-mono"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 120 }}
      >
        Ce terminal attend vos directives.
      </motion.p>
      <motion.div
        className="mt-10 flex justify-center items-center space-x-4 text-cyber-blue opacity-70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <svg className="w-8 h-8 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004 13V1a8 8 0 0015.356-2h-3.985m-1.571.102A8.001 8.001 0 004 13V1a8 8 0 0015.356-2h-3.985"></path></svg>
        <span className="font-mono text-lg">INITIALISATION EN ATTENTE...</span>
      </motion.div>
    </motion.div>
  )
}