export interface Project {
  id: string;
  titleKey: string;
  descKey: string;
  tech: string[];
  image?: string;
  demoUrl?: string;
  sourceUrl?: string;
  inProgress?: boolean;
}

export const projects: Project[] = [
  {
    id: "union",
    titleKey: "projects.items.union.title",
    descKey: "projects.items.union.desc",
    tech: ["Next.js", "MySQL", "AI Agent"],
    image: "/projects/DH23VT.png",
  },
  {
    id: "fire",
    titleKey: "projects.items.fire.title",
    descKey: "projects.items.fire.desc",
    tech: ["Next.js", "Tailwind CSS"],
    image: "/projects/fire-english-club.png",
  },
  {
    id: "qr",
    titleKey: "projects.items.qr.title",
    descKey: "projects.items.qr.desc",
    tech: ["QR Code", "Node.js", "Database"],
    image: "/projects/qr.png",
  },
  {
    id: "docs",
    titleKey: "projects.items.docs.title",
    descKey: "projects.items.docs.desc",
    tech: ["Next.js", "MongoDB", "File Upload"],
    image: "/projects/docs.png",
    inProgress: true,
  },
  {
    id: "banking",
    titleKey: "projects.items.banking.title",
    descKey: "projects.items.banking.desc",
    tech: ["Next.js", "Database", "Monopoly"],
    image: "/projects/monopoly.png",
    inProgress: true,
  },
  {
    id: "awing",
    titleKey: "projects.items.awing.title",
    descKey: "projects.items.awing.desc",
    tech: ["C++", "Windows"],
    image: "/projects/awing.png",
    sourceUrl: "https://github.com/anomalyco/auto-login-awifi",
  },
];
