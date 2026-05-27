"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/contexts/LanguageContext";
import Link from "next/link";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), { ssr: false });

function useTypewriter(text: string, speed = 60) {
  const [display, setDisplay] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplay("");
    setDone(false);
    let i = 0;
    const timer = setInterval(() => {
      setDisplay(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(timer);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return { display, done };
}

function MagneticButton({
  href,
  children,
  primary,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const base = primary
    ? "bg-primary text-white hover:bg-primary-dark"
    : "border border-border dark:border-border-dark text-text dark:text-text-dark hover:border-primary dark:hover:border-primary-light";

  return (
    <motion.div
      ref={ref}
      className="relative"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 150;
        const strength = Math.min(1, Math.max(0, 1 - dist / maxDist));
        setPos({ x: dx * 0.15 * strength, y: dy * 0.15 * strength });
      }}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 250, damping: 15, mass: 0.5 }}
    >
      <Link
        href={href}
        className={`block px-8 py-3 rounded-full font-medium transition-colors ${base}`}
      >
        {children}
      </Link>
    </motion.div>
  );
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

const wordItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Home() {
  const { t } = useLang();
  const { display: typedName, done } = useTypewriter(t.hero.name, 70);
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setCursor((c) => !c), 530);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const hadDark = html.classList.contains("dark");
    html.classList.add("dark");
    const observer = new MutationObserver(() => {
      if (!html.classList.contains("dark")) {
        html.classList.add("dark");
      }
    });
    observer.observe(html, { attributes: true, attributeFilter: ["class"] });
    return () => {
      observer.disconnect();
      if (!hadDark) {
        html.classList.remove("dark");
      }
    };
  }, []);

  const subtitleWords = t.hero.subtitle.split(" ");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <HeroScene />

      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-cream/30 dark:from-primary-dark/10 dark:via-transparent dark:to-primary-dark/5" />

      <div className="relative z-10 text-center px-4 max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-sm font-medium text-primary dark:text-primary-light tracking-[0.2em] uppercase mb-4"
        >
          {t.hero.greeting}
        </motion.p>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-text dark:text-text-dark mb-4 h-[1.2em]">
          {typedName}
          {!done && (
            <span
              className={`inline-block w-[3px] h-[0.8em] ml-1 bg-primary dark:bg-primary-light align-middle ${
                cursor ? "opacity-100" : "opacity-0"
              } transition-opacity`}
            />
          )}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl font-medium text-primary dark:text-primary-light mb-2"
        >
          {t.hero.tagline}
        </motion.p>

        <motion.p
          variants={container}
          initial="hidden"
          animate="show"
          className="text-sm sm:text-base text-muted dark:text-muted-dark mb-8 max-w-xl mx-auto overflow-hidden"
        >
          {subtitleWords.map((word, i) => (
            <motion.span key={i} variants={wordItem} className="inline-block mr-1">
              {word}
            </motion.span>
          ))}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticButton href="/projects" primary>
            {t.hero.cta}
          </MagneticButton>
          <MagneticButton href="/contact">
            {t.hero.contact}
          </MagneticButton>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-muted/40 dark:border-muted-dark/40 flex items-start justify-center pt-2"
        >
          <div className="w-1 h-2 rounded-full bg-muted/40 dark:bg-muted-dark/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
