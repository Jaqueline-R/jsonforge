import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, CheckCircle } from 'lucide-react'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Formspree sends the email - replace YOUR_FORM_ID with your Formspree ID
    fetch('https://formspree.io/f/xredjdgd', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    }).then(() => setSent(true))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-[#161b22] border border-gray-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl">

        <div className="flex items-center gap-3 mb-2">
          <Mail className="text-cyan-400" size={24} />
          <h2 className="text-2xl sm:text-3xl font-bold">Contact Us</h2>
        </div>

        <p className="text-gray-400 mb-8 text-sm sm:text-base">
          Have a question, suggestion or found a bug? We'd love to hear from you.
        </p>

        {sent ? (
          <div className="flex flex-col items-center gap-4 py-10 text-center">
            <CheckCircle className="text-green-400" size={48} />
            <h3 className="text-xl font-bold text-green-400">Message sent!</h3>
            <p className="text-gray-400">We'll get back to you as soon as possible.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
                className="w-full bg-[#0d1117] border border-gray-700 rounded-xl p-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="your@email.com"
                className="w-full bg-[#0d1117] border border-gray-700 rounded-xl p-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Message</label>
              <textarea
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Write your message here..."
                rows={5}
                className="w-full bg-[#0d1117] border border-gray-700 rounded-xl p-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-gray-600 resize-none"
              />
            </div>

            <button
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-6 py-3 rounded-xl transition flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <Send size={16} />
              Send Message
            </button>
          </form>
        )}

      </div>
    </motion.div>
  )
}