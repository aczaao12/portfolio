"use client";

import { motion } from "framer-motion";

interface SkillBarProps {
  name: string;
  level: number;
  index: number;
}

export default function SkillBar({ name, level, index }: SkillBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="space-y-1.5"
    >
      <div className="flex justify-between text-sm">
        <span className="font-medium text-text dark:text-text-dark">{name}</span>
        <span className="text-muted dark:text-muted-dark">{level}%</span>
      </div>
      <div className="h-2 rounded-full bg-border dark:bg-border-dark overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.08, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-primary to-primary-light dark:from-primary-dark dark:to-primary"
        />
      </div>
    </motion.div>
  );
}
