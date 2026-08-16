"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowLeft, ChevronDown, ChevronUp, Download, RefreshCw, Newspaper, ExternalLink } from "lucide-react";
import { projectDetails } from "@/lib/project-details";

const BASE = "https://ant05-efa02-default-rtdb.firebaseio.com";

interface RtdbEntry {
  version: string;
  date?: string;
  title?: string;
  description?: string;
  changes?: string[];
  download_url?: string;
}

interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
  link?: string;
  active?: boolean;
}

function ChangelogTimeline({ entries }: { entries: RtdbEntry[] }) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [allOpen, setAllOpen] = useState(false);

  const toggle = (v: string) => {
    setExpanded((prev) => ({ ...prev, [v]: !prev[v] }));
  };

  const toggleAll = () => {
    if (allOpen) {
      setExpanded({});
    } else {
      const all: Record<string, boolean> = {};
      entries.forEach((e) => (all[e.version] = true));
      setExpanded(all);
    }
    setAllOpen(!allOpen);
  };

  return (
    <div>
      {entries.length > 1 && (
        <button
          onClick={toggleAll}
          className="mb-4 text-sm text-primary dark:text-primary hover:underline cursor-pointer"
        >
          {allOpen ? "Thu gọn tất cả" : "Mở rộng tất cả"}
        </button>
      )}

      <div className="relative">
        <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-border dark:bg-border-dark" />

        {entries.map((entry, i) => {
          const isOpen = expanded[entry.version] ?? i === 0;

          return (
            <motion.div
              key={entry.version}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative pl-12 pb-6 last:pb-0"
            >
              <div className="absolute left-[12px] top-[6px] w-[15px] h-[15px] rounded-full border-2 border-primary bg-bg dark:bg-bg z-10" />

              <div
                onClick={() => toggle(entry.version)}
                className="group cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-1">
                  <span className="inline-flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded bg-primary text-primary dark:text-primary font-semibold">
                    v{entry.version}
                    {i === 0 && (
                      <span className="text-[9px] font-medium bg-primary text-white dark:bg-primary dark:text-bg-dark px-1.5 py-[1px] rounded-full ml-0.5">
                        latest
                      </span>
                    )}
                  </span>
                  {entry.date && (
                    <span className="text-xs text-text-secondary">
                      {entry.date}
                    </span>
                  )}
                  {isOpen ? (
                    <ChevronUp className="w-3.5 h-3.5 text-text-secondary" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-text-secondary" />
                  )}
                </div>
                <h4 className="font-semibold text-text dark:text-text group-hover:text-primary dark:group-hover:text-primary transition-colors">
                  {entry.title || `Phiên bản v${entry.version}`}
                </h4>
                {entry.description && (
                  <p className="text-sm text-text-secondary mt-0.5">
                    {entry.description}
                  </p>
                )}
              </div>

              {isOpen && ((entry.changes && entry.changes.length > 0) || entry.download_url) ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="mt-3 overflow-hidden"
                >
                  {entry.changes && entry.changes.length > 0 && (
                    <ul className="space-y-1.5">
                      {entry.changes.map((change, ci) => (
                        <li
                          key={ci}
                          className="text-sm text-text dark:text-text flex gap-2"
                        >
                          <span className="text-primary dark:text-primary mt-1 flex-shrink-0">
                            &bull;
                          </span>
                          {change}
                        </li>
                      ))}
                    </ul>
                  )}
                  {entry.download_url && (
                    <a
                      href={entry.download_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-3 text-sm font-medium text-primary dark:text-primary hover:underline"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Tải xuống v{entry.version}
                    </a>
                  )}
                </motion.div>
              ) : null}
            </motion.div>
          );
        })}

        {entries.length === 0 && (
          <p className="text-sm text-text-secondary text-center py-8">
            Chưa có phiên bản nào.
          </p>
        )}
      </div>
    </div>
  );
}

function NewsSection({ news }: { news: NewsItem[] }) {
  const activeNews = news.filter((n) => n.active !== false);

  if (activeNews.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-16 scroll-mt-24"
    >
      <h2 className="text-2xl font-bold text-center text-text dark:text-text mb-2">
        Tin tức
      </h2>
      <p className="text-center text-sm text-text-secondary mb-8">
        Thông báo mới nhất từ nhà phát triển
      </p>
      <div className="max-w-2xl mx-auto space-y-4">
        {activeNews.slice(0, 5).map((item) => (
          <div
            key={item.id}
            className="rounded-xl p-5 border border-border bg-surface"
          >
            <div className="flex items-start gap-1 mb-1">
              <Newspaper className="w-4 h-4 text-primary dark:text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-text dark:text-text">
                  {item.title}
                </h4>
                {item.date && (
                  <span className="text-xs text-text-secondary">
                    {item.date}
                  </span>
                )}
              </div>
            </div>
            <p className="text-sm text-text-secondary mt-2 whitespace-pre-line">
              {item.content}
            </p>
            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-2 text-sm font-medium text-primary dark:text-primary hover:underline"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Xem thêm
              </a>
            )}
          </div>
        ))}
      </div>
    </motion.section>
  );
}

export default function AwingMobileDetail() {
  const detail = projectDetails["awing-mobile"];
  const [allEntries, setAllEntries] = useState<RtdbEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);

  useEffect(() => {
    let cancelled = false;
    const fetchAll = async () => {
      try {
        const [upRes, histRes, newsRes] = await Promise.all([
          fetch(BASE + "/awing-android-update.json"),
          fetch(BASE + "/awing-android-history.json"),
          fetch(BASE + "/awing-notification.json"),
        ]);

        if (cancelled) return;

        const merged: RtdbEntry[] = [];

        if (upRes.ok) {
          const current = await upRes.json();
          if (current && current.version) {
            merged.push(current);
          }
        }

        if (histRes.ok) {
          const history = await histRes.json();
          if (history && typeof history === "object" && !Array.isArray(history)) {
            for (const key of Object.keys(history)) {
              const entry = history[key];
              if (entry && entry.version) {
                if (!merged.find((e) => e.version === entry.version)) {
                  merged.push(entry);
                }
              }
            }
          }
        }

        merged.sort((a, b) => {
          const va = a.version.split(".").map(Number);
          const vb = b.version.split(".").map(Number);
          for (let i = 0; i < 3; i++) {
            const diff = (vb[i] || 0) - (va[i] || 0);
            if (diff !== 0) return diff;
          }
          return 0;
        });

        setAllEntries(merged);

        if (newsRes.ok) {
          const data = await newsRes.json();
          if (Array.isArray(data)) {
            setNewsItems(data);
          } else if (data && typeof data === "object") {
            const items = Object.keys(data).map((k) => {
              const item = data[k];
              return {
                id: item.id || k,
                title: item.title || "",
                content: item.content || "",
                date: item.date || "",
                link: item.link || "",
                active: item.active,
              };
            });
            setNewsItems(items);
          }
        }
      } catch {
        if (!cancelled) {
          setAllEntries([]);
          setNewsItems([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchAll();
    return () => { cancelled = true; };
  }, []);

  const latestVersion = allEntries[0]?.version || detail.version;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-primary dark:hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Dự án
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div className="flex-1 text-center sm:text-left">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-full bg-primary text-primary dark:text-primary font-semibold mb-3">
                v{latestVersion} &middot; Android
                {loading && <RefreshCw className="w-3 h-3 animate-spin" />}
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold text-text dark:text-text mb-3">
                AWING Auto Login Android
              </h1>
              <p className="text-lg text-text-secondary mb-6">
                {detail.tagline}
              </p>
              <p className="text-sm text-text-secondary mb-6 max-w-lg">
                App Android chạy nền &mdash; phát hiện mất Internet, tự động đăng nhập lại WiFi Awing
              </p>
              <div className="flex gap-3 flex-wrap justify-center sm:justify-start">
                <a href="#changelog" className="px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors inline-flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Tải APK
                </a>
                <a href="#guide" className="px-5 py-2.5 rounded-lg border border-border text-text dark:text-text text-sm font-semibold hover:border-primary dark:hover:border-primary-light transition-colors">
                  Hướng dẫn
                </a>
                <a href="https://github.com/anomalyco/auto-login-awifi" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded-lg border border-border text-text dark:text-text text-sm font-semibold hover:border-primary dark:hover:border-primary-light transition-colors">
                  GitHub
                </a>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden shadow-lg border border-border bg-surface">
                <img
                  src="/projects/awing-android-icon.png"
                  alt="AWING Android"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="rounded-2xl overflow-hidden shadow-lg border border-border max-w-md mx-auto">
            <img
              src="/projects/awing-mobile-show.jpg"
              alt="AWING Android Screenshot"
              className="w-full object-cover"
            />
          </div>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-center text-text dark:text-text mb-2">
            Vấn đề & Giải pháp
          </h2>
          <p className="text-center text-sm text-text-secondary mb-8">
            Tại sao bạn cần AWING Auto Login trên Android?
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="rounded-xl p-6 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30">
              <h3 className="font-semibold text-red-700 dark:text-red-400 mb-3">Vấn đề</h3>
              <ul className="space-y-2">
                {detail.problemPoints.map((pt, i) => (
                  <li key={i} className="text-sm text-red-600 dark:text-red-300 flex gap-2">
                    <span className="text-red-500 mt-0.5">▸</span>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl p-6 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/30">
              <h3 className="font-semibold text-green-700 dark:text-green-400 mb-3">Giải pháp</h3>
              <ul className="space-y-2">
                {detail.solutionPoints.map((pt, i) => (
                  <li key={i} className="text-sm text-green-600 dark:text-green-300 flex gap-2">
                    <span className="text-green-500 mt-0.5">▸</span>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="features"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 scroll-mt-24"
        >
          <h2 className="text-2xl font-bold text-center text-text dark:text-text mb-2">
            Tính năng nổi bật
          </h2>
          <p className="text-center text-sm text-text-secondary mb-8">
            AWING Auto Login Android làm tất cả tự động, bạn chỉ cần bật app
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {detail.features.map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-xl p-6 border border-border bg-surface hover:border-primary/30 dark:hover:border-primary-light/30 transition-colors text-center"
              >
                <div className="text-3xl mb-3">{feat.icon}</div>
                <h3 className="font-semibold text-text dark:text-text mb-2">{feat.title}</h3>
                <p className="text-sm text-text-secondary">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <NewsSection news={newsItems} />

        <motion.section
          id="guide"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 scroll-mt-24"
        >
          <h2 className="text-2xl font-bold text-center text-text dark:text-text mb-2">
            Hướng dẫn sử dụng
          </h2>
          <p className="text-center text-sm text-text-secondary mb-8">
            Tải về, cài đặt và để app làm phần còn lại
          </p>
          <div className="max-w-2xl mx-auto space-y-5">
            {detail.guideSteps.map((step) => (
              <div key={step.num} className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                  {step.num}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-text dark:text-text">{step.title}</h4>
                  <p className="text-sm text-text-secondary mt-0.5">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <h3 className="text-lg font-semibold text-center text-text dark:text-text mt-12 mb-6">
            Các nút chức năng
          </h3>
          <div className="grid sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
            {detail.guideButtons.map((btn, i) => (
              <div key={i} className="rounded-lg p-4 border border-border bg-surface text-center">
                <div className="font-semibold text-sm text-primary dark:text-primary">{btn.label}</div>
                <div className="text-xs text-text-secondary mt-1">{btn.desc}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 max-w-2xl mx-auto rounded-lg p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/30 text-sm text-blue-700 dark:text-blue-300">
            <strong>Mẹo:</strong> Sau khi nhấn START, bạn có thể thoát app — dịch vụ vẫn chạy nền qua Foreground Service.
          </div>
        </motion.section>

        <motion.section
          id="changelog"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 scroll-mt-24"
        >
          <h2 className="text-2xl font-bold text-center text-text dark:text-text mb-2">
            Changelog
          </h2>
          <p className="text-center text-sm text-text-secondary mb-8">
            Lịch sử phiên bản của AWING Android
          </p>
          <div className="max-w-2xl mx-auto">
            <ChangelogTimeline entries={allEntries} />
          </div>
        </motion.section>

        <div className="text-center py-8 border-t border-border">
          <p className="text-sm text-text-secondary mb-4">
            AWING Auto Login Android &mdash; Ứng dụng mã nguồn mở
          </p>
          <div className="flex justify-center gap-4">
            {detail.links.map((link, i) => (
              <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary dark:text-primary hover:underline">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}