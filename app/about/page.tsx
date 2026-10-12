export default function AboutPage() {
  return (
    <>
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            I&apos;m a full-stack developer passionate about building modern web
            applications that solve real problems.
          </p>
        </div>
      </section>

      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Background</h2>
          <p className="text-gray-600 max-w-3xl mb-4">
            I have experience building full-stack applications using modern
            technologies and best practices. My work spans from frontend
            development with React and Next.js to backend services with Python
            and cloud infrastructure.
          </p>
          <p className="text-gray-600 max-w-3xl">
            I&apos;m focused on creating efficient, scalable solutions that
            provide real value to users. I enjoy tackling complex problems and
            learning new technologies to build better software.
          </p>
        </div>
      </section>

      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Technologies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Frontend</h3>
              <ul className="space-y-2 text-gray-600">
                <li>React</li>
                <li>Next.js</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
                <li>Redux</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Backend</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Python</li>
                <li>Flask</li>
                <li>FastAPI</li>
                <li>Node.js</li>
                <li>Express</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                Database & Cloud
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>PostgreSQL</li>
                <li>MongoDB</li>
                <li>SQLAlchemy</li>
                <li>AWS (S3, Lambda, SQS)</li>
                <li>Google Cloud Run</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Get in Touch
          </h2>
          <p className="text-gray-600 max-w-3xl mb-6">
            Interested in working together or have a question? Feel free to
            reach out.
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
