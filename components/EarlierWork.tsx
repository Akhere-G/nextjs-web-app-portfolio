import Link from "next/link";
import { Project } from "@/lib/data";

interface EarlierWorkProps {
  projects: Project[];
}

export default function EarlierWork({ projects }: EarlierWorkProps) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <section className="bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Earlier work</h2>
        <p className="text-gray-600 max-w-3xl mb-8">
          Smaller projects from earlier in my career, where I learned the
          fundamentals the larger projects build on.
        </p>
        <ul className="divide-y divide-gray-200 border border-gray-200 bg-white max-w-3xl">
          {projects.map((project) => (
            <li key={project.slug} className="p-6">
              <h3 className="font-semibold text-gray-900 mb-1">
                <Link
                  href={`/projects/${project.slug}`}
                  data-track="project_details_opened"
                  data-track-project-slug={project.slug}
                  data-track-project-tier={project.tier}
                  data-track-source="earlier_work_title"
                  className="hover:text-gray-700 transition-colors"
                >
                  {project.title}
                </Link>
              </h3>
              <p className="text-sm text-gray-600 mb-3">{project.pitch}</p>
              <div className="flex items-center gap-4 text-sm">
                <Link
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="project_live_demo_opened"
                  data-track-project-slug={project.slug}
                  data-track-project-tier={project.tier}
                  data-track-source="earlier_work"
                  className="text-gray-900 hover:text-gray-700 underline transition-colors"
                >
                  Live demo
                </Link>
                <Link
                  href={`/projects/${project.slug}`}
                  data-track="project_details_opened"
                  data-track-project-slug={project.slug}
                  data-track-project-tier={project.tier}
                  data-track-source="earlier_work_details"
                  className="text-gray-900 hover:text-gray-700 underline transition-colors"
                >
                  Details
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
