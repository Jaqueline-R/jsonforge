import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'

export default function Privacy() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto"
    >
      <div className="bg-[#161b22] border border-gray-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl prose prose-invert max-w-none">

        <div className="flex items-center gap-3 mb-2">
          <ShieldCheck className="text-cyan-400" size={24} />
          <h2 className="text-2xl sm:text-3xl font-bold m-0">Privacy Policy</h2>
        </div>

        <p className="text-gray-400 text-sm mb-8">Last updated: June 2025</p>

        <section className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">1. Who We Are</h3>
          <p className="text-gray-400 text-sm sm:text-base">
            JsonForge ("we", "our", "us") operates the website <strong className="text-white">usejsonforge.com</strong>.
            This page informs you of our policies regarding the collection and use of personal data.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">2. Data We Collect</h3>
          <p className="text-gray-400 text-sm sm:text-base">
            JsonForge is a client-side tool. <strong className="text-white">We do not collect, store or transmit any data you paste into our tools.</strong> All processing happens entirely in your browser.
          </p>
          <p className="text-gray-400 text-sm sm:text-base mt-2">
            We may collect anonymous usage data (page views, tool usage) through analytics to improve the service.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">3. Local Storage</h3>
          <p className="text-gray-400 text-sm sm:text-base">
            The JSON Validator uses your browser's local storage to save your last session. This data never leaves your device and you can clear it at any time using the "Clear" button.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">4. Cookies</h3>
          <p className="text-gray-400 text-sm sm:text-base">
            We do not use tracking cookies. If we add analytics in the future, this policy will be updated accordingly.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">5. Third Party Services</h3>
          <p className="text-gray-400 text-sm sm:text-base">
            Our site is hosted on Vercel. Their privacy policy applies to infrastructure-level data. We do not share your data with any third parties.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">6. Contact</h3>
          <p className="text-gray-400 text-sm sm:text-base">
            If you have any questions about this Privacy Policy, please contact us through our <a href="/contact" className="text-cyan-400 hover:underline">contact page</a>.
          </p>
        </section>

      </div>
    </motion.div>
  )
}