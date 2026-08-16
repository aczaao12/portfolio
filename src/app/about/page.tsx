"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLang } from "@/contexts/LanguageContext";
import { CalendarDays, MapPin, GraduationCap, BookOpen, Briefcase, BarChart3, Folder, Zap, Shield } from "lucide-react";

const infoItems = (t: any) => [
  { icon: <CalendarDays className="w-4 h-4" />, text: t.about.birth },
  { icon: <MapPin className="w-4 h-4" />, text: t.about.from },
  { icon: <GraduationCap className="w-4 h-4" />, text: t.about.major },
  { icon: <BookOpen className="w-4 h-4" />, text: t.about.specialty },
  { icon: <Briefcase className="w-4 h-4" />, text: t.about.position },
  { icon: <BarChart3 className="w-4 h-4" />, text: t.about.gpa },
];

const stats = [
  { value: "5+", label: "Dự án", icon: <Folder className="w-4 h-4" /> },
  { value: "12+", label: "Kỹ năng", icon: <Zap className="w-4 h-4" /> },
];

export default function About() {
  const { t } = useLang();

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">{t.about.title}</h1>
          <p className="text-text-secondary">{t.about.status}</p>
        </motion.div>

        <div className="grid md:grid-cols-[280px_1fr] gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="rounded-2xl overflow-hidden border border-border bg-surface">
              <Image
                src="/images/avatar.jpeg"
                alt="Hồ Quốc Thắng"
                width={400}
                height={400}
                className="w-full aspect-square object-cover"
                priority
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <p className="text-text-secondary leading-relaxed">
              {t.about.bio}
            </p>

            <div className="space-y-3">
              {infoItems(t).map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  className="flex items-center gap-3 text-sm"
                >
                  <span className="text-primary">{item.icon}</span>
                  <span className="text-text-secondary">{item.text}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex gap-6 pt-2">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-surface border border-border"
                >
                  <span className="text-primary">{stat.icon}</span>
                  <div>
                    <div className="text-lg font-bold">{stat.value}</div>
                    <div className="text-xs text-text-secondary">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="pt-4">
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                {t.about.workStyle}
              </h2>
              <ul className="space-y-2">
                {t.about.workValues.map((value: string, i: number) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.08 }}
                    className="text-sm text-text-secondary leading-relaxed flex gap-2"
                  >
                    <span className="text-primary mt-0.5 flex-shrink-0">—</span>
                    {value}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
