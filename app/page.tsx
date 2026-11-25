import EarlierWork from '@/components/EarlierWork';
import Hero from '@/components/Hero';
import ProjectGrid from '@/components/ProjectGrid';
import data from '@/lib/data';

export default function Home() {
  const featured = data.filter((project) => project.tier === 'featured');
  const earlier = data.filter((project) => project.tier === 'earlier');

  return (
    <>
      <Hero />
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Projects</h2>
          <ProjectGrid projects={featured} />
        </div>
      </section>
      <EarlierWork projects={earlier} />
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">About</h2>
          <p className="text-lg text-gray-600 max-w-3xl">
            I&apos;m a full-stack developer with a background in React,
            Next.js, Python and cloud infrastructure, returning to software
            engineering after a spell teaching Computing. The projects below
            are built to the same standard I&apos;d bring to a production
            codebase.
          </p>
          <div className="mt-6">
            <a
              href="/about"
              className="text-gray-900 hover:text-gray-700 underline transition-colors"
            >
              Learn more →
            </a>
          </div>
        </div>
      </section>
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact</h2>
          <p className="text-lg text-gray-600 max-w-3xl">
            Looking for a backend-focused or full-stack engineer? I&apos;d be
            glad to talk through any of the projects above in more detail.
          </p>
          <div className="mt-6">
            <a
              href="/contact"
              className="text-gray-900 hover:text-gray-700 underline transition-colors"
            >
              Get in touch →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

