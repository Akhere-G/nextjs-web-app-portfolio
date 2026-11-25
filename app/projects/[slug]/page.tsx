import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import data, { type CodeLink } from "@/lib/data";
import { getFeatureIcon } from "@/lib/icons";
import ProjectActionLinks from "@/components/ProjectActionLinks";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface PageSection {
  id: string;
  title: string;
  body: ReactNode;
}

export async function generateStaticParams() {
  return data.map((project) => ({
    slug: project.slug,
  })) as Array<{ slug: string }>;
}

function CodeLinks({ links, label }: { links: CodeLink[]; label: string }) {
  return (
    <div className="mt-3 text-sm text-gray-600">
      <span className="font-medium text-gray-900">{label}: </span>
      {links.map((item, index) => (
        <span key={item.href}>
          {index > 0 && <span aria-hidden="true">, </span>}
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-900 transition-colors"
          >
            {item.label}
          </a>
        </span>
      ))}
    </div>
  );
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = data.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const sections: PageSection[] = [];

  sections.push({
    id: "problem",
    title: "The problem",
    body: <p className="text-gray-600 max-w-3xl">{project.problem}</p>,
  });

  sections.push({
    id: "features",
    title: "What it does",
    body: (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {project.features.map((feature) => {
          const Icon = getFeatureIcon(feature.icon);
          return (
            <div
              key={feature.title}
              className="border border-gray-200 bg-white p-6"
            >
              <Icon className="w-6 h-6 text-gray-900 mb-4" strokeWidth={1.75} />
              <h3 className="font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    ),
  });

  if (project.screenshots && project.screenshots.length > 0) {
    sections.push({
      id: "screenshots",
      title: "See it working",
      body: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {project.screenshots.map((shot) => (
            <figure key={shot.src} className="m-0">
              <Image
                src={shot.src}
                alt={shot.alt}
                width={1440}
                height={900}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="w-full h-auto border border-gray-200"
              />
              <figcaption className="mt-2 text-sm text-gray-600">
                {shot.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      ),
    });
  }

  if (project.architecture) {
    const { diagram } = project.architecture;
    sections.push({
      id: "architecture",
      title: "How it's built",
      body: (
        <div className="space-y-8">
          {diagram && (
            <div className="overflow-x-auto border border-gray-200 bg-white">
              <Image
                src={diagram.src}
                alt={diagram.alt}
                width={diagram.width}
                height={diagram.height}
                className="h-auto w-full min-w-[720px]"
              />
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.architecture.layers.map((layer) => (
              <div
                key={layer.name}
                className="border border-gray-200 bg-white p-6"
              >
                <h3 className="font-semibold text-gray-900 mb-3">
                  {layer.name}
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 leading-relaxed">
                  {layer.points.map((point) => (
                    <li key={point} className="flex items-start">
                      <span className="text-gray-400 mr-3" aria-hidden="true">
                        •
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ),
    });
  }

  if (project.decisions && project.decisions.length > 0) {
    sections.push({
      id: "decisions",
      title: "Key decisions and tradeoffs",
      body: (
        <ul className="space-y-6 max-w-3xl">
          {project.decisions.map((decision) => (
            <li
              key={decision.title}
              className="border border-gray-200 bg-white p-6"
            >
              <h3 className="font-semibold text-gray-900 mb-3">
                {decision.title}
              </h3>
              <p className="text-gray-600 mb-3">{decision.why}</p>
              <p className="text-gray-600">
                <span className="font-medium text-gray-900">The cost: </span>
                {decision.tradeoff}
              </p>
              {(decision.detail || decision.code) && (
                <details className="mt-4 border-t border-gray-200 pt-3">
                  <summary className="cursor-pointer text-sm font-medium text-gray-900">
                    Technical detail
                  </summary>
                  {decision.detail && (
                    <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                      {decision.detail}
                    </p>
                  )}
                  {decision.code && (
                    <CodeLinks links={decision.code} label="Code" />
                  )}
                </details>
              )}
            </li>
          ))}
        </ul>
      ),
    });
  }

  if (project.challenges && project.challenges.length > 0) {
    sections.push({
      id: "challenges",
      title: "Hard problems I solved",
      body: (
        <ul className="space-y-6 max-w-3xl">
          {project.challenges.map((challenge) => (
            <li
              key={challenge.title}
              className="border border-gray-200 bg-white p-6"
            >
              <h3 className="font-semibold text-gray-900 mb-3">
                {challenge.title}
              </h3>
              <dl className="space-y-3 text-gray-600">
                <div>
                  <dt className="font-medium text-gray-900">The problem</dt>
                  <dd>{challenge.problem}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">What I did</dt>
                  <dd>{challenge.approach}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">The result</dt>
                  <dd>{challenge.result}</dd>
                </div>
              </dl>
              {challenge.code && (
                <CodeLinks links={challenge.code} label="Code" />
              )}
            </li>
          ))}
        </ul>
      ),
    });
  }

  if (project.quality) {
    sections.push({
      id: "quality",
      title: "Testing and quality",
      body: (
        <div className="max-w-3xl space-y-4 text-gray-600">
          <p>{project.quality.tests}</p>
          <p>{project.quality.ci}</p>
          <ul className="space-y-2">
            {project.quality.other.map((item) => (
              <li key={item} className="flex items-start">
                <span className="text-gray-400 mr-3" aria-hidden="true">
                  •
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ),
    });
  }

  if (project.limitations && project.limitations.length > 0) {
    sections.push({
      id: "limitations",
      title: "Known limitations",
      body: (
        <ul className="space-y-2 max-w-3xl text-gray-600">
          {project.limitations.map((item) => (
            <li key={item} className="flex items-start">
              <span className="text-gray-400 mr-3" aria-hidden="true">
                •
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ),
    });
  }

  if (project.databaseSchemaSrc) {
    sections.push({
      id: "schema",
      title: "Database model",
      body: (
        <div className="relative w-full min-h-200 bg-gray-100 flex justify-center">
          <Image
            src={project.databaseSchemaSrc.url}
            alt={`Schema for ${project.title}`}
            fill
            sizes="100vw"
            className="object-contain"
          />
        </div>
      ),
    });
  }

  if (project.impact || (project.docs && project.docs.length > 0)) {
    sections.push({
      id: "more",
      title: "Use and further reading",
      body: (
        <div className="max-w-3xl space-y-4 text-gray-600">
          {project.impact && <p>{project.impact}</p>}
          {project.docs && project.docs.length > 0 && (
            <CodeLinks links={project.docs} label="Read more in the repo" />
          )}
        </div>
      ),
    });
  }

  return (
    <>
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <Link
            href="/projects"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors inline-block mb-6"
          >
            ← Back to Projects
          </Link>
          <div className="aspect-video bg-gray-100 relative mb-8 max-w-5xl">
            <Image
              src={project.img}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {project.title}
          </h1>
          <p className="text-xl text-gray-900 font-medium max-w-3xl mb-8">
            {project.pitch}
          </p>
          <ProjectActionLinks
            projectSlug={project.slug}
            projectTier={project.tier}
            demoUrl={project.url}
            githubUrls={project.github}
          />
          <div className="flex flex-wrap gap-2 mb-8">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-sm text-gray-600 bg-gray-50 px-3 py-1 border border-gray-200"
              >
                {tech}
              </span>
            ))}
          </div>
          <nav aria-label="On this page">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-gray-600 hover:text-gray-900 underline transition-colors"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {project.proof && project.proof.length > 0 && (
        <section
          aria-label="At a glance"
          className="bg-gray-900 text-white border-b border-gray-200"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <dl className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {project.proof.map((item) => (
                <div key={item.label}>
                  <dd className="text-3xl font-bold">{item.value}</dd>
                  <dt className="mt-1 text-sm text-gray-300">{item.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {sections.map((section, index) => (
        <section
          key={section.id}
          id={section.id}
          className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} border-b border-gray-200 scroll-mt-16`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {section.title}
            </h2>
            {section.body}
          </div>
        </section>
      ))}
    </>
  );
}
