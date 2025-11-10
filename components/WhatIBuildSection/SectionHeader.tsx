'use client';

import { motion } from 'framer-motion';
import { headerVariants } from './animations';

export default function SectionHeader() {
  return (
    <motion.div
      className="text-center mb-20"
      variants={headerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-[#005A9C] to-[#00BFA5] bg-clip-text text-transparent leading-tight py-2">
        What I Build
      </h2>
      <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
        Data infrastructure engineered for real-world conditions—not just the happy path. 
        I specialize in building systems that handle failures gracefully, recover automatically, 
        and provide the observability needed to debug issues when they inevitably occur.
      </p>
    </motion.div>
  );
}
