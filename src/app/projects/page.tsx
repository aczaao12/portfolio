"use client";

import { motion } from "framer-motion";
import { useLang } from "@/contexts/LanguageContext";
import { projects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";

export default function Projects() {
  const { t } = useLang();

  const getNestedValue = (obj: any, path: string) => {
    return path.split(".").reduce((acc, part) => acc?.[part], obj);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-bold text-text dark:text-text-dark mb-4 text-center"
        >
          <span className="text-primary dark:text-primary-light">#</span> {t.projects.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-muted dark:text-muted-dark mb-12 max-w-lg mx-auto"
        >
          {t.about.bio}
        </motion.p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={getNestedValue(t, project.titleKey)}
              desc={getNestedValue(t, project.descKey)}
              tech={project.tech}
              image={project.image}
              demoUrl={project.demoUrl}
              sourceUrl={project.sourceUrl}
              inProgress={project.inProgress}
              index={i}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
