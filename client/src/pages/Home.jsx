import React from 'react';
import { motion } from "framer-motion";

const Home = () => {
  return (
    <motion.div
      className="p-8 text-center"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-4xl font-bold mb-4 text-blue-700">
        Welcome to SkillSpark
      </h1>
      <p className="text-lg text-gray-700">
        Your online learning platform to upskill efficiently.
      </p>
    </motion.div>
  );
};

export default Home;
