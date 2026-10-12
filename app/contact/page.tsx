export default function ContactPage() {
  return (
    <>
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Interested in working together or have a question? Get in touch.
          </p>
        </div>
      </section>

      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Get in Touch
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Email</h3>
              <a
                href="mailto:akhereaihoeghinlan@gamil.com"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                akhereaihoeghinlan@gamil.com
              </a>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">GitHub</h3>
              <a
                href="https://github.com/Akhere-G"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                github.com/Akhere-G
              </a>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">LinkedIn</h3>
              <a
                href="https://linkedin.com/in/akhereihoeghinlan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                linkedin.com/in/akhereihoeghinlan
              </a>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Location</h3>
              <p className="text-gray-600">London, UK</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

