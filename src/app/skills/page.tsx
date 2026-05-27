"use client";

import { motion } from "framer-motion";
import { useLang } from "@/contexts/LanguageContext";
import SkillBar from "@/components/SkillBar";

export default function Skills() {
  const { t } = useLang();

  const foodTechSkills = [
    { name: t.skills.items.word, level: 85 },
    { name: t.skills.items.powerpoint, level: 80 },
    { name: t.skills.items.excel, level: 75 },
    { name: t.skills.items.access, level: 70 },
    { name: t.skills.items.preservation, level: 80 },
    { name: t.skills.items.microbiology, level: 75 },
  ];

  const techSkills = [
    { name: t.skills.items.aiagent, level: 90 },
    { name: t.skills.items.webdev, level: 85 },
    { name: t.skills.items.qrscan, level: 80 },
    { name: t.skills.items.banking, level: 70 },
    { name: t.skills.items.tools, level: 90 },
    { name: t.skills.items.media, level: 85 },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-bold text-text dark:text-text-dark mb-12 text-center"
        >
          <span className="text-primary dark:text-primary-light">#</span> {t.skills.title}
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="p-6 rounded-xl bg-surface dark:bg-surface-dark border border-border dark:border-border-dark"
          >
            <h2 className="text-xl font-semibold text-text dark:text-text-dark mb-6 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-primary" />
              {t.skills.foodtech}
            </h2>
            <div className="space-y-4">
              {foodTechSkills.map((skill, i) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} index={i} />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-6 rounded-xl bg-surface dark:bg-surface-dark border border-border dark:border-border-dark"
          >
            <h2 className="text-xl font-semibold text-text dark:text-text-dark mb-6 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-primary" />
              {t.skills.tech}
            </h2>
            <div className="space-y-4">
              {techSkills.map((skill, i) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} index={i} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
