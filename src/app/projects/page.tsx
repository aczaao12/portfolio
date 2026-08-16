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
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">{t.projects.title}</h1>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
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
