"use client";

import { useLang } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { t, lang, toggleLang } = useLang();
  const { dark, toggle: toggleTheme } = useTheme();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/skills", label: t.nav.skills },
    { href: "/projects", label: t.nav.projects },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-lg font-bold text-primary dark:text-primary-light"
          >
            HT
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary dark:hover:text-primary-light ${
                  pathname === link.href
                    ? "text-primary dark:text-primary-light"
                    : "text-muted dark:text-muted-dark"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <button
              onClick={toggleLang}
              className="px-2 py-1 text-xs font-mono font-bold rounded border border-border dark:border-border-dark text-muted dark:text-muted-dark hover:text-primary dark:hover:text-primary-light transition-colors"
            >
              {lang === "vi" ? "EN" : "VI"}
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-muted dark:text-muted-dark hover:text-primary dark:hover:text-primary-light transition-colors"
              aria-label="Toggle theme"
            >
              {dark ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
            </button>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-muted dark:text-muted-dark"
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-black border-t border-border dark:border-border-dark"
          >
            <div className="px-4 py-4 space-y-3">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block text-sm font-medium ${
                    pathname === link.href
                      ? "text-primary dark:text-primary-light"
                      : "text-muted dark:text-muted-dark"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-4 pt-2">
                <button
                  onClick={toggleLang}
                  className="px-3 py-1 text-xs font-mono font-bold rounded border border-border dark:border-border-dark text-muted dark:text-muted-dark"
                >
                  {lang === "vi" ? "EN" : "VI"}
                </button>
                <button
                  onClick={toggleTheme}
                  className="p-1 text-muted dark:text-muted-dark"
                >
                  {dark ? "☀️" : "🌙"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
