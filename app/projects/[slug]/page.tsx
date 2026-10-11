import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import data from "@/lib/data";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return data.map((project) => ({
    slug: project.slug,
  })) as Array<{ slug: string }>;
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = data.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
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
            {project.pitch && (
              <p className="text-xl text-gray-900 font-medium max-w-3xl mb-4">
                {project.pitch}
              </p>
            )}
            <p className="text-lg text-gray-600 max-w-3xl mb-8">
              {project.desc}
            </p>
            <div className="flex items-center gap-6 mb-8">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors"
              >
                Live Site
              </a>
              {project.github.length > 0 && (
                <a
                  href={project.github[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-900 hover:text-gray-700 underline transition-colors"
                >
                  GitHub
                </a>
              )}
            </div>
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
          </div>
        </section>

        {project.coreProblem && (
          <section className="bg-gray-50 border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Core Problem Solved
              </h2>
              <p className="text-gray-600 max-w-3xl">{project.coreProblem}</p>
            </div>
          </section>
        )}

        {project.whyBuilt && (
          <section className="bg-gray-50 border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Why I Built This
              </h2>
              <p className="text-gray-600 max-w-3xl">{project.whyBuilt}</p>
            </div>
          </section>
        )}

        {project.features && project.features.length > 0 && (
          <section className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Features
              </h2>
              <ul className="space-y-3 max-w-3xl">
                {project.features.map((feature, index) => (
                  <li key={index} className="text-gray-600 flex items-start">
                    <span className="text-gray-400 mr-3">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {project.architecture && (
          <section className="bg-gray-50 border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Architecture
              </h2>
              <div className="text-gray-600 max-w-3xl whitespace-pre-line">
                {project.architecture}
              </div>
            </div>
          </section>
        )}

        {project.databaseSchemaSrc && (
          <section className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Database Modelling
              </h2>
              <div className="relative w-full min-h-200 bg-gray-100 mb-8 flex justify-center">
                <Image
                  src={project.databaseSchemaSrc.url}
                  alt={`Schema for ${project.title}`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </section>
        )}

        {project.challenges && project.challenges.length > 0 && (
          <section className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Challenges
              </h2>
              <ul className="space-y-3 max-w-3xl">
                {project.challenges.map((challenge, index) => (
                  <li key={index} className="text-gray-600 flex items-start">
                    <span className="text-gray-400 mr-3">•</span>
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {project.tradeoffs && (
          <section className="bg-gray-50 border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Tradeoffs and Decisions
              </h2>
              <div className="text-gray-600 max-w-3xl whitespace-pre-line leading-relaxed">
                {project.tradeoffs}
              </div>
            </div>
          </section>
        )}

        {project.impact && (
          <section className="bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Impact</h2>
              <p className="text-gray-600 max-w-3xl">{project.impact}</p>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
