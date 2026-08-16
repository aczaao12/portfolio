"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useLang } from "@/contexts/LanguageContext";
import { projects } from "@/lib/projects";
import { projectDetails } from "@/lib/project-details";
import AwingDetail from "@/components/projects/AwingDetail";
import AwingMobileDetail from "@/components/projects/AwingMobileDetail";

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { t } = useLang();

  if (slug === "awing") {
    return <AwingDetail />;
  }

  if (slug === "awing-mobile") {
    return <AwingMobileDetail />;
  }

  const project = projects.find((p) => p.id === slug);
  const detail = projectDetails[slug];

  if (!project || !detail) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text dark:text-text-dark mb-4">
            Project not found
          </h1>
          <Link
            href="/projects"
            className="text-primary dark:text-primary-light hover:underline"
          >
            &larr; Back to projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <p className="text-muted dark:text-muted-dark">
          Generic detail view for &quot;{project.id}&quot; — implement in
          <code className="mx-1 px-1 py-0.5 bg-surface-dark/10 dark:bg-surface/10 rounded text-sm">
            src/components/projects/YourProjectDetail.tsx
          </code>
        </p>
      </div>
    </div>
  );
}
