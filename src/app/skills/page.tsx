"use client";

import { motion } from "framer-motion";
import { useLang } from "@/contexts/LanguageContext";

export default function Skills() {
  const { t } = useLang();

  const foodTechSkills = [
    t.skills.items.word,
    t.skills.items.powerpoint,
    t.skills.items.excel,
    t.skills.items.access,
    t.skills.items.preservation,
    t.skills.items.microbiology,
  ];

  const techSkills = [
    t.skills.items.aiagent,
    t.skills.items.webdev,
    t.skills.items.qrscan,
    t.skills.items.banking,
    t.skills.items.tools,
    t.skills.items.media,
  ];

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">{t.skills.title}</h1>
        </motion.div>

        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              {t.skills.foodtech}
            </h2>
            <div className="flex flex-wrap gap-2">
              {foodTechSkills.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  className="px-4 py-2 text-sm text-text-secondary bg-surface border border-border rounded-lg hover:border-primary/40 hover:text-text transition-colors"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              {t.skills.tech}
            </h2>
            <div className="flex flex-wrap gap-2">
              {techSkills.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  className="px-4 py-2 text-sm text-text-secondary bg-surface border border-border rounded-lg hover:border-primary/40 hover:text-text transition-colors"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
