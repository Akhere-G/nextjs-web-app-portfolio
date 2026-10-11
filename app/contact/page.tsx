import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
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
                <p className="text-gray-600">Available for remote work</p>
              </div>
            </div>
          </div>
        </section>

        {/* 
        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Send a Message
            </h2>
            <form className="max-w-2xl space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:border-gray-500"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:border-gray-500"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:border-gray-500"
                  placeholder="Your message"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </section>
            */}
      </main>
      <Footer />
    </div>
  );
}
