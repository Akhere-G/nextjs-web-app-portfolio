import Image from "next/image";
import Link from "next/link";
import { Project } from "@/lib/data";

interface ProjectGridProps {
  projects: Project[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <article
          key={project.slug}
          className="bg-white border border-gray-200 overflow-hidden"
        >
          <div className="aspect-video bg-gray-100 relative">
            <Image
              src={project.img}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              <Link
                href={`/projects/${project.slug}`}
                className="hover:text-gray-700 transition-colors"
              >
                {project.title}
              </Link>
            </h2>
            <p
              className="text-sm text-gray-600 mb-4 overflow-hidden"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
              }}
            >
              {project.desc}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="text-xs text-gray-500 bg-gray-50 px-2 py-1"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1">
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm">
              <Link
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 hover:text-gray-700 underline transition-colors"
              >
                Live Site
              </Link>
              {project.github.length && (
                <Link
                  href={project.github[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 underline transition-colors"
                >
                  GitHub
                </Link>
              )}
              <Link
                href={`/projects/${project.slug}`}
                className="text-gray-900 hover:text-gray-700 underline transition-colors"
              >
                Details
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
