import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            I&apos;m a full-stack developer who graduated from UCL with a
            degree in Computer Science, now returning to software engineering
            after a few years teaching. My projects are built to the standard
            I want to bring to a production codebase.
          </p>
        </div>
      </section>

      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Background</h2>
          <p className="text-gray-600 max-w-3xl mb-4">
            I graduated from UCL in 2022 with a 2:1 in Computer Science, then
            spent four months as a Frontend Engineering Intern at FundApps,
            working on their stock ownership reporting product. From there I
            joined Arkiter, an early-stage startup building technical
            interview software, where I worked across the full stack and had
            real ownership over architecture decisions and sprint planning in
            a very small team.
          </p>
          <p className="text-gray-600 max-w-3xl">
            I then moved into teaching Computing, which sharpened my
            communication, leadership and ability to manage competing
            priorities, but it also made clear that solving engineering
            problems and building software is what I enjoy most. I&apos;ve
            kept my technical skills current by building and shipping
            personal projects like the ones below, each one taken from
            requirements through design in Figma to a working, deployed app.
          </p>
        </div>
      </section>

      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            How I make engineering decisions
          </h2>
          <p className="text-gray-600 max-w-3xl mb-6">
            Five habits show up in every project, and each project page shows
            them in practice.
          </p>
          <ul className="space-y-4 max-w-3xl text-gray-600">
            <li>
              <span className="font-semibold text-gray-900">
                I write down the cost of a choice.{" "}
              </span>
              Every decision on a project page has a plain-English reason and
              the tradeoff I accepted, for example{" "}
              <Link
                href="/projects/task-flow#decisions"
                className="underline hover:text-gray-900 transition-colors"
              >
                why TaskFlow stores order as numbers with gaps
              </Link>
              .
            </li>
            <li>
              <span className="font-semibold text-gray-900">
                I do not trust AI output blindly.{" "}
              </span>
              In TripTrack, TaskFlow and Gains, AI results are validated, shown
              as a suggestion and only applied once a person approves them, as
              in{" "}
              <Link
                href="/projects/trip-track#decisions"
                className="underline hover:text-gray-900 transition-colors"
              >
                TripTrack&apos;s stale-proposal check
              </Link>
              .
            </li>
            <li>
              <span className="font-semibold text-gray-900">
                I use simple rules before a model.{" "}
              </span>
              <Link
                href="/projects/gains#decisions"
                className="underline hover:text-gray-900 transition-colors"
              >
                Gains
              </Link>{" "}
              coaches with plain rules that show their numbers, and only the
              routine builder calls an AI model.
            </li>
            <li>
              <span className="font-semibold text-gray-900">
                I review my own work.{" "}
              </span>
              I look for security, maintainability and performance problems in
              my own code, write down what I find, and fix it.
            </li>
            <li>
              <span className="font-semibold text-gray-900">
                I test and automate.{" "}
              </span>
              Each project has backend and frontend tests, browser tests and a
              CI pipeline that runs them on every push.
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Technologies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Frontend</h3>
              <ul className="space-y-2 text-gray-600">
                <li>React and Next.js</li>
                <li>TypeScript</li>
                <li>Redux Toolkit, TanStack Query, Zustand</li>
                <li>Tailwind CSS</li>
                <li>Vitest and Playwright</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Backend</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Python with Flask and FastAPI</li>
                <li>Node.js and Express</li>
                <li>Next.js server actions with Better Auth</li>
                <li>Socket.IO realtime updates</li>
                <li>AI integrations (Gemini, Groq, Bedrock, MCP)</li>
                <li>pytest</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                Database & Cloud
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  PostgreSQL with pgvector, SQLAlchemy, Alembic and Drizzle ORM
                </li>
                <li>MongoDB and Redis</li>
                <li>AWS (S3, Lambda, SQS, Bedrock)</li>
                <li>Google Cloud Run and Cloud Tasks</li>
                <li>Docker and GitHub Actions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Get in Touch
          </h2>
          <p className="text-gray-600 max-w-3xl mb-6">
            Interested in working together, or have a question about one of
            the projects? Feel free to reach out.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors"
          >
            Contact Me
          </a>
        </div>
      </section>
    </>
  );
}
