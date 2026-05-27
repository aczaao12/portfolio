"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLang } from "@/contexts/LanguageContext";

const infoItems = (t: any) => [
  { icon: "📅", text: t.about.birth },
  { icon: "📍", text: t.about.from },
  { icon: "🎓", text: t.about.major },
  { icon: "📚", text: t.about.specialty },
  { icon: "📌", text: t.about.position },
  { icon: "📊", text: t.about.gpa },
];

const stats = [
  { value: "3.3", suffix: "/ 8.03", label: "GPA", icon: "star" },
  { value: "20", suffix: "", label: "Tuổi", icon: "cake" },
  { value: "5+", suffix: "", label: "Dự án", icon: "folder" },
  { value: "12+", suffix: "", label: "Kỹ năng", icon: "zap" },
];

function StatSvg({ type }: { type: string }) {
  switch (type) {
    case "star":
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    case "cake":
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.91 6 9.616 6 10.5m6-2.25c1.355 0 2.697.056 4.024.166C17.155 8.91 18 9.616 18 10.5m-6 2.25v5.25m-6-5.25v5.25m12-5.25v5.25M6 21h12M6 21a2.25 2.25 0 01-2.25-2.25V6.75A2.25 2.25 0 016 4.5h12a2.25 2.25 0 012.25 2.25v12A2.25 2.25 0 0118 21M6 21h12" />
        </svg>
      );
    case "folder":
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
        </svg>
      );
    case "zap":
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function About() {
  const { t } = useLang();

  return (
    <div className="min-h-screen pt-24 pb-16 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-cream/20 dark:from-primary-dark/[0.05] dark:via-transparent dark:to-primary-dark/[0.03] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-bold text-text dark:text-text-dark mb-4 text-center"
        >
          <span className="text-primary dark:text-primary-light">#</span> {t.about.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-muted dark:text-muted-dark mb-12 max-w-lg mx-auto"
        >
          {t.about.status}
        </motion.p>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center md:items-start"
          >
            <div className="relative group">
              <div className="w-64 h-64 rounded-full p-[3px] bg-gradient-to-br from-primary to-primary-light dark:from-primary-dark dark:to-primary shadow-xl shadow-primary/20 dark:shadow-primary-dark/20 group-hover:shadow-2xl group-hover:shadow-primary/30 dark:group-hover:shadow-primary-dark/30 transition-shadow duration-500">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <Image
                    src="/images/avatar.jpeg"
                    alt="Hồ Quốc Thắng"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </div>
              </div>
              <div className="absolute -bottom-1 right-2 w-7 h-7 rounded-full bg-green-500 border-[3px] border-surface dark:border-surface-dark flex items-center justify-center shadow-md">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="relative pl-5 border-l-2 border-primary/30 dark:border-primary-light/30">
              <p className="text-base text-muted dark:text-muted-dark leading-relaxed">
                {t.about.bio}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {infoItems(t).map((item, i) => (
                <motion.div
                  key={item.icon}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="p-4 rounded-xl bg-surface dark:bg-surface-dark border border-border dark:border-border-dark hover:border-primary/30 dark:hover:border-primary-light/30 transition-all duration-300 group cursor-default"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 dark:bg-primary-light/10 flex items-center justify-center text-lg flex-shrink-0 group-hover:bg-primary group-hover:text-white dark:group-hover:bg-primary-light dark:group-hover:text-primary-dark transition-colors duration-300">
                      {item.icon}
                    </div>
                    <div className="pt-0.5">
                      <p className="text-sm font-medium text-text dark:text-text-dark leading-snug">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="h-px bg-gradient-to-r from-transparent via-primary/30 dark:via-primary-light/30 to-transparent mt-16 mb-16"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.03 }}
              className="text-center p-6 rounded-xl bg-surface dark:bg-surface-dark border border-border dark:border-border-dark hover:border-primary/30 dark:hover:border-primary-light/30 transition-all duration-300 group cursor-default"
            >
              <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-primary/10 dark:bg-primary-light/10 flex items-center justify-center text-primary dark:text-primary-light group-hover:bg-primary group-hover:text-white dark:group-hover:bg-primary-light dark:group-hover:text-primary-dark transition-colors duration-300">
                <StatSvg type={stat.icon} />
              </div>
              <div className="text-3xl font-bold text-text dark:text-text-dark">
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
