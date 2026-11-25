import EarlierWork from "@/components/EarlierWork";
import ProjectGrid from "@/components/ProjectGrid";
import data from "@/lib/data";

export default function ProjectsPage() {
  const featured = data.filter((project) => project.tier === "featured");
  const earlier = data.filter((project) => project.tier === "earlier");

  return (
    <>
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Projects</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Five full-stack applications I&apos;ve designed, built, tested and
            deployed end to end. Each page explains what the app does, the
            decisions I made and what they cost, and links to the code behind
            them.
          </p>
        </div>
      </section>
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <ProjectGrid projects={featured} />
        </div>
      </section>
      <EarlierWork projects={earlier} />
    </>
  );
}
