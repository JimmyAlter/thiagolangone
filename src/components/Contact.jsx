import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, ArrowRight } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';
import SectionHeading from './SectionHeading';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [focused, setFocused] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent('Project inquiry');
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    );
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
  };

  const contactItems = [
    {
      icon: <Mail size={18} />,
      label: 'email',
      value: PERSONAL_INFO.email,
      href: `mailto:${PERSONAL_INFO.email}`,
    },
    {
      icon: <Phone size={18} />,
      label: 'phone',
      value: PERSONAL_INFO.phone,
      href: `tel:${PERSONAL_INFO.phone.replace(/\s/g, '')}`,
    },
    {
      icon: <MapPin size={18} />,
      label: 'location',
      value: PERSONAL_INFO.location,
      href: null,
    },
  ];

  return (
    <section
      id="contact"
      className="py-12 md:py-24 px-4 md:px-6 relative"
    >
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent-blue/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <SectionHeading
          index="04"
          eyebrow="Get in Touch"
          title="Contact"
          description="Open to remote roles in infrastructure automation, applied AI, and platform engineering."
        />

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="terminal-window menu-panel"
          >
            <div className="flex items-center justify-between px-6 pt-6">
              <span className="hud-chip">contact</span>
              <span className="text-xs font-mono text-txt-muted uppercase tracking-[0.26em]">opens email client</span>
            </div>

            <form className="p-6 space-y-5" onSubmit={handleSubmit}>
              {/* Name */}
              <div>
                <label htmlFor="name" className="text-xs font-mono text-txt-muted uppercase tracking-[0.22em] block mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused(null)}
                  placeholder="Your name"
                  className={`w-full bg-bg border rounded-lg py-2.5 px-4 font-mono text-sm text-txt-primary placeholder-txt-muted/40 outline-none transition-all duration-300 ${
                    focused === 'name'
                      ? 'border-accent-blue/45 shadow-[0_0_18px_rgba(96,218,255,0.10)]'
                      : 'border-border hover:border-border-hover'
                  }`}
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="text-xs font-mono text-txt-muted uppercase tracking-[0.22em] block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  placeholder="you@example.com"
                  className={`w-full bg-bg border rounded-lg py-2.5 px-4 font-mono text-sm text-txt-primary placeholder-txt-muted/40 outline-none transition-all duration-300 ${
                    focused === 'email'
                      ? 'border-accent-blue/45 shadow-[0_0_18px_rgba(96,218,255,0.10)]'
                      : 'border-border hover:border-border-hover'
                  }`}
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="text-xs font-mono text-txt-muted uppercase tracking-[0.22em] block mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                  placeholder="A short note about your project or role"
                  className={`w-full bg-bg border rounded-lg py-2.5 px-4 font-mono text-sm text-txt-primary placeholder-txt-muted/40 outline-none resize-none transition-all duration-300 ${
                    focused === 'message'
                      ? 'border-accent-blue/45 shadow-[0_0_18px_rgba(96,218,255,0.10)]'
                      : 'border-border hover:border-border-hover'
                  }`}
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="btn btn-primary w-full"
              >
                <Send size={16} />
                <span className="font-mono text-xs uppercase tracking-[0.18em]">Send Email</span>
              </button>
            </form>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {contactItems.map((item, i) => (
              <div
                key={item.label}
                className="group flex items-center gap-4 p-4 rounded-xl border border-border bg-bg-surface hover:border-border-hover transition-all duration-300"
              >
                <div
                  className="p-3 rounded-lg bg-accent-blue/10 text-accent-blue"
                >
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-mono text-txt-muted uppercase tracking-wider mb-0.5">
                    {`// ${item.label}`}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm text-txt-primary transition-colors truncate block hover:text-accent-blue"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm text-txt-primary truncate">{item.value}</p>
                  )}
                </div>
                {item.href && (
                  <ArrowRight size={14} className="text-txt-muted group-hover:text-accent-blue group-hover:translate-x-1 transition-all" />
                )}
              </div>
            ))}

            <div className="mt-8 p-5 rounded-xl border border-border bg-bg-surface/35">
              <p className="text-xs font-mono text-txt-muted uppercase tracking-[0.22em] mb-3 flex items-center gap-2">
                <span className="status-dot" />
                Availability
              </p>
              <p className="text-sm text-txt-secondary leading-relaxed">
                Based in {PERSONAL_INFO.timezone} — {PERSONAL_INFO.overlap}.
                Open to remote roles in infrastructure automation, applied AI, and internal tooling.
                You can also reach me on LinkedIn.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
