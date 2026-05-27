"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLang } from "@/contexts/LanguageContext";

export default function About() {
  const { t } = useLang();

  const stats = [
    { label: "GPA", value: "3.3", suffix: "/ 8.03" },
    { label: "Tuổi", value: "20", suffix: "" },
    { label: "Dự án", value: "5+", suffix: "" },
    { label: "Kỹ năng", value: "12+", suffix: "" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-bold text-text dark:text-text-dark mb-12 text-center"
        >
          <span className="text-primary dark:text-primary-light">#</span> {t.about.title}
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="aspect-square max-w-sm mx-auto md:mx-0 rounded-2xl overflow-hidden border border-border dark:border-border-dark">
              <Image
                src="/images/avatar.jpeg"
                alt="Hồ Quốc Thắng"
                width={400}
                height={400}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-base text-muted dark:text-muted-dark leading-relaxed">
              {t.about.bio}
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "📅", value: t.about.birth },
                { label: "📍", value: t.about.from },
                { label: "🎓", value: t.about.major },
                { label: "📚", value: t.about.specialty },
                { label: "📌", value: t.about.position },
                { label: "📊", value: t.about.gpa },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  className="p-3 rounded-lg bg-surface dark:bg-surface-dark border border-border dark:border-border-dark"
                >
                  <p className="text-xs text-muted dark:text-muted-dark mb-0.5">{item.label}</p>
                  <p className="text-sm font-medium text-text dark:text-text-dark">{item.value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 rounded-xl bg-surface dark:bg-surface-dark border border-border dark:border-border-dark hover:border-primary/30 dark:hover:border-primary-light/30 transition-colors"
            >
              <div className="text-3xl font-bold text-primary dark:text-primary-light">
                {stat.value}
                <span className="text-sm text-muted dark:text-muted-dark">{stat.suffix}</span>
              </div>
              <p className="text-sm text-muted dark:text-muted-dark mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
