import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectGrid from "@/components/ProjectGrid";
import Footer from "@/components/Footer";
import data from "@/lib/data";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Projects</h2>
            <ProjectGrid projects={data} />
          </div>
        </section>
        <section className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">About</h2>
            <p className="text-lg text-gray-600 max-w-3xl">
              I&apos;m a full-stack developer focused on building modern web
              applications. I work with React, Next.js, Python, and cloud
              infrastructure to create efficient, scalable solutions that solve
              real problems.
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
              Interested in working together? Get in touch to discuss your
              project.
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
      </main>
      <Footer />
    </div>
  );
}
