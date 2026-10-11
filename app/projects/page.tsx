import Navbar from '@/components/Navbar';
import ProjectGrid from '@/components/ProjectGrid';
import Footer from '@/components/Footer';
import data from '@/lib/data';

export default function ProjectsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Projects</h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              A collection of full-stack web applications built with modern
              technologies.
            </p>
          </div>
        </section>
        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <ProjectGrid projects={data} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
