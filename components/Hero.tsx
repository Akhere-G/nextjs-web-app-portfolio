import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Akhere Ihoeghinlan
          </h1>
          <p className="text-3xl"> Full-Stack Developer</p>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            I design and build full-stack web applications end to end, from
            React and Next.js on the front end to Python APIs, relational
            databases and cloud infrastructure on the back end.
          </p>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed">
            My five main projects are each covered by automated tests and a CI
            pipeline, and each project page explains the decisions I made and
            what they cost.
          </p>
          <div className="mt-8">
            <Link
              href="/projects"
              className="inline-flex items-center px-6 py-3 bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors"
            >
              View Projects
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
