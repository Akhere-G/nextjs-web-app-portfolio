import type { Project } from "@/lib/data";

interface ProjectActionLinksProps {
  projectSlug: string;
  projectTier: Project["tier"];
  demoUrl: string;
  githubUrls: string[];
}

// Server component: clicks are picked up by ClickTracker via data-track-*.
export default function ProjectActionLinks({
  projectSlug,
  projectTier,
  demoUrl,
  githubUrls,
}: ProjectActionLinksProps) {
  return (
    <div className="flex items-center gap-6 mb-8">
      <a
        href={demoUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-track="project_live_demo_opened"
        data-track-project-slug={projectSlug}
        data-track-project-tier={projectTier}
        data-track-source="project_detail"
        className="inline-flex items-center px-6 py-3 bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors"
      >
        Live demo
      </a>
      {githubUrls.map((href, index) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          data-track="project_source_opened"
          data-track-project-slug={projectSlug}
          data-track-source="project_detail"
          data-track-repository-type={githubUrls.length > 1 ? "split" : "single"}
          className="text-gray-900 hover:text-gray-700 underline transition-colors"
        >
          {githubUrls.length > 1
            ? index === 0
              ? "Frontend code"
              : "Backend code"
            : "Code on GitHub"}
        </a>
      ))}
    </div>
  );
}
