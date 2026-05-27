"use client";

import { motion } from "framer-motion";
import { useLang } from "@/contexts/LanguageContext";

interface ProjectCardProps {
  title: string;
  desc: string;
  tech: string[];
  image?: string;
  demoUrl?: string;
  sourceUrl?: string;
  inProgress?: boolean;
  index: number;
}

export default function ProjectCard({
  title,
  desc,
  tech,
  image,
  demoUrl,
  sourceUrl,
  inProgress,
  index,
}: ProjectCardProps) {
  const { t } = useLang();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative bg-surface dark:bg-surface-dark rounded-xl overflow-hidden border border-border dark:border-border-dark hover:border-primary/30 dark:hover:border-primary-light/30 transition-all duration-300"
    >
      <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary-dark/20 dark:to-primary-dark/10 flex items-center justify-center overflow-hidden">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="text-primary/30 dark:text-primary-light/20 text-6xl font-bold">{title[0]}</div>
        )}
        {inProgress && (
          <span className="absolute top-3 right-3 px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300">
            {t.projects.inProgress}
          </span>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-text dark:text-text-dark mb-2">{title}</h3>
        <p className="text-sm text-muted dark:text-muted-dark mb-4 line-clamp-2">{desc}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {tech.map((t) => (
            <span
              key={t}
              className="px-2 py-1 text-xs font-medium rounded-md bg-primary/10 text-primary dark:bg-primary-light/10 dark:text-primary-light"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-primary dark:text-primary-light hover:underline"
            >
              {t.projects.viewDemo} →
            </a>
          )}
          {sourceUrl && (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-muted dark:text-muted-dark hover:text-primary dark:hover:text-primary-light hover:underline"
            >
              {t.projects.viewSource} →
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
