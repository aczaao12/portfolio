"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/contexts/LanguageContext";

function CopyToast({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.9 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-full bg-text dark:bg-text-dark text-bg dark:text-bg-dark text-sm font-medium shadow-xl z-50"
        >
          Copied
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface Social {
  name: string;
  url: string;
  icon: React.ReactNode;
  copyText?: string;
}

const socials: Social[] = [
  {
    name: "Facebook",
    url: "https://web.facebook.com/pi.colo.125/",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    url: "https://www.tiktok.com/@codelor123",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@hot3g-310",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: "Discord",
    url: "https://discord.com",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
      </svg>
    ),
    copyText: "yangio_2005",
  },
  {
    name: "Telegram",
    url: "https://t.me/picolo125",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
    copyText: "0339072926",
  },
  {
    name: "Zalo",
    url: "https://zalo.me/0339072926",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 14h-9a.5.5 0 01-.5-.5v-7a.5.5 0 01.5-.5h9a.5.5 0 01.5.5v7a.5.5 0 01-.5.5z" />
      </svg>
    ),
    copyText: "0339072926",
  },
];

function TiltCard({
  social,
  index,
  onCopy,
}: {
  social: Social;
  index: number;
  onCopy: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setTilt({
      y: ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 12,
      x: -((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * 12,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHover(false);
  };

  const Content = (
    <div className="flex flex-col items-center gap-3 relative z-10 p-6">
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center text-lg flex-shrink-0 transition-all duration-500 ${
          hover
            ? "bg-gradient-to-br from-primary via-primary-light to-amber-400 text-white shadow-lg shadow-amber-500/20"
            : "bg-primary/10 dark:bg-primary-light/10 text-primary dark:text-primary-light"
        }`}
      >
        {social.icon}
      </div>
      <span className="text-sm font-medium text-text dark:text-text-dark">
        {social.name}
      </span>
      {social.copyText && (
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-muted dark:text-muted-dark">
            {social.copyText}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigator.clipboard.writeText(social.copyText!);
              onCopy();
            }}
            className="w-5 h-5 rounded-full bg-primary/10 dark:bg-primary-light/10 flex items-center justify-center text-primary dark:text-primary-light hover:bg-primary hover:text-white dark:hover:bg-primary-light dark:hover:text-primary-dark transition-colors"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setHover(true)}
      style={{ perspective: 800 }}
    >
      <motion.div
        animate={{ rotateX: tilt.x, rotateY: tilt.y, y: hover ? -10 : 0, scale: hover ? 1.05 : 1 }}
        transition={{ type: "spring", stiffness: 250, damping: 18, mass: 0.8 }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative cursor-pointer"
        onClick={() => {
          window.open(social.url, "_blank", "noopener,noreferrer");
        }}
      >
        <div
          className={`absolute -inset-[2px] rounded-xl bg-gradient-to-br from-primary via-primary-light to-amber-400 bg-[length:200%_200%] transition-all duration-500 ${
            hover ? "opacity-100 blur-sm" : "opacity-0"
          } ${hover ? "animate-gradient" : ""}`}
        />
        <div
          className={`relative rounded-xl border transition-all duration-500 ${
            hover
              ? "border-transparent bg-surface dark:bg-surface-dark shadow-xl shadow-amber-500/20 dark:shadow-amber-500/10"
              : "border-border dark:border-border-dark bg-surface dark:bg-surface-dark"
          }`}
        >
          {Content}
        </div>
      </motion.div>
    </div>
  );
}

export default function Contact() {
  const { t } = useLang();
  const [toast, setToast] = useState(false);

  const showToast = useCallback(() => {
    setToast(true);
    setTimeout(() => setToast(false), 1500);
  }, []);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06 } },
  };

  const item = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring" as const, stiffness: 200, damping: 16 },
    },
  };

  return (
    <div className="min-h-screen pt-24 pb-16 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.03] via-primary/[0.02] to-transparent dark:from-amber-500/[0.04] dark:via-primary-dark/[0.03] dark:to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-bold text-text dark:text-text-dark mb-4 text-center"
        >
          <span className="text-primary dark:text-primary-light">#</span> {t.contact.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-muted dark:text-muted-dark mb-12 max-w-lg mx-auto"
        >
          {t.contact.subtitle}
        </motion.p>

        <div className="max-w-2xl mx-auto">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 sm:grid-cols-3 gap-4"
          >
            {socials.map((social, i) => (
              <motion.div key={social.name} variants={item}>
                <TiltCard social={social} index={i} onCopy={showToast} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.8, type: "spring", stiffness: 200, damping: 16 }}
            className="mt-12 text-center"
          >
            <div className="relative inline-block group cursor-pointer">
              <div className="absolute -inset-[2px] rounded-xl bg-gradient-to-br from-primary via-primary-light to-amber-400 bg-[length:200%_200%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
              <div className="absolute -inset-[2px] rounded-xl bg-gradient-to-br from-primary via-primary-light to-amber-400 bg-[length:200%_200%] opacity-0 group-hover:opacity-100 group-hover:animate-gradient" />
              <div className="relative p-6 rounded-xl bg-surface dark:bg-surface-dark border border-border dark:border-border-dark group-hover:border-transparent transition-all duration-500 group-hover:shadow-xl group-hover:shadow-amber-500/20">
                <p className="text-sm text-muted dark:text-muted-dark mb-2">{t.contact.email}</p>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=aczaao12@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-medium text-primary dark:text-primary-light hover:underline"
                >
                  aczaao12@gmail.com
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <CopyToast visible={toast} />
    </div>
  );
}
