"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  id: string;
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
  id,
  title,
  desc,
  tech,
  image,
  inProgress,
  index,
}: ProjectCardProps) {
  return (
    <Link href={`/projects/${id}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.4, delay: index * 0.08 }}
        className="group relative bg-surface rounded-xl overflow-hidden border border-border hover:border-primary/30 transition-colors"
      >
        <div className="aspect-video bg-surface-elevated overflow-hidden relative">
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-text-secondary/20 text-5xl font-bold">
              {title[0]}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-bg/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ArrowUpRight className="w-5 h-5 text-text" />
          </div>
          {inProgress && (
            <span className="absolute top-3 left-3 px-2 py-0.5 text-[10px] font-medium rounded-full bg-primary/20 text-primary border border-primary/20">
              WIP
            </span>
          )}
        </div>

        <div className="p-5">
          <h3 className="text-base font-semibold mb-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-text-secondary mb-3 line-clamp-2">{desc}</p>
          <div className="flex flex-wrap gap-1.5">
            {tech.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 text-[11px] font-medium text-text-secondary bg-surface-elevated rounded"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
