import { motion } from 'framer-motion'
import { FileText } from 'lucide-react'

export default function Terms() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto"
    >
      <div className="bg-[#161b22] border border-gray-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl">

        <div className="flex items-center gap-3 mb-2">
          <FileText className="text-cyan-400" size={24} />
          <h2 className="text-2xl sm:text-3xl font-bold">Terms of Service</h2>
        </div>

        <p className="text-gray-400 text-sm mb-8">Last updated: June 2025</p>

        <section className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">1. Acceptance of Terms</h3>
          <p className="text-gray-400 text-sm sm:text-base">
            By accessing and using <strong className="text-white">usejsonforge.com</strong>, you accept and agree to be bound by these Terms of Service.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">2. Use of the Service</h3>
          <p className="text-gray-400 text-sm sm:text-base">
            JsonForge provides free online developer tools. You may use these tools for personal or commercial purposes. You agree not to misuse the service or attempt to disrupt its availability.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">3. No Warranty</h3>
          <p className="text-gray-400 text-sm sm:text-base">
            JsonForge is provided "as is" without any warranty. We do not guarantee the accuracy of results produced by our tools. Always verify critical outputs before using them in production.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">4. Limitation of Liability</h3>
          <p className="text-gray-400 text-sm sm:text-base">
            JsonForge shall not be liable for any damages arising from your use of the service, including but not limited to data loss, service interruptions, or errors in tool output.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">5. Intellectual Property</h3>
          <p className="text-gray-400 text-sm sm:text-base">
            The JsonForge name, logo, and interface design are our property. The tools themselves are free to use but may not be copied or redistributed without permission.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">6. Changes to Terms</h3>
          <p className="text-gray-400 text-sm sm:text-base">
            We reserve the right to update these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">7. Contact</h3>
          <p className="text-gray-400 text-sm sm:text-base">
            For any questions regarding these terms, please use our <a href="/contact" className="text-cyan-400 hover:underline">contact page</a>.
          </p>
        </section>

      </div>
    </motion.div>
  )
}