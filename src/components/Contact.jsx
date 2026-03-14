import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, ArrowRight } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';

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
    const subject = encodeURIComponent('New project inquiry');
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    );
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
  };

  const accentMap = {
    'accent-green': {
      bg: 'bg-accent-green/10',
      text: 'text-accent-green',
      hover: 'hover:text-accent-green',
    },
    'accent-purple': {
      bg: 'bg-accent-purple/10',
      text: 'text-accent-purple',
      hover: 'hover:text-accent-purple',
    },
    'accent-blue': {
      bg: 'bg-accent-blue/10',
      text: 'text-accent-blue',
      hover: 'hover:text-accent-blue',
    },
  };

  const contactItems = [
    {
      icon: <Mail size={18} />,
      label: 'email',
      value: PERSONAL_INFO.email,
      href: `mailto:${PERSONAL_INFO.email}`,
      color: 'accent-green',
    },
    {
      icon: <Phone size={18} />,
      label: 'phone',
      value: PERSONAL_INFO.phone,
      href: `tel:${PERSONAL_INFO.phone.replace(/\s/g, '')}`,
      color: 'accent-purple',
    },
    {
      icon: <MapPin size={18} />,
      label: 'location',
      value: PERSONAL_INFO.location,
      href: null,
      color: 'accent-blue',
    },
  ];

  return (
    <motion.section
      id="contact"
      className="py-24 px-6 relative section-screen"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
    >
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent-purple/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-sans font-bold text-txt-primary mt-3">
            Contact
          </h2>
          <p className="text-txt-secondary mt-3 max-w-md mx-auto text-sm">
            Ready for a new build? Send a message and I will reply quickly.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Form - Terminal style */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="terminal-window menu-panel"
          >
            <div className="flex items-center justify-between px-6 pt-6">
              <span className="hud-chip">transmission</span>
              <span className="text-xs font-mono text-txt-muted uppercase tracking-[0.3em]">secure channel</span>
            </div>

            <form className="p-6 space-y-5" onSubmit={handleSubmit}>
              {/* Name */}
              <div>
                <label htmlFor="name" className="code-comment block mb-2">
                  {'// your name'}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused(null)}
                  placeholder="string"
                  className={`w-full bg-bg border rounded-lg py-2.5 px-4 font-mono text-sm text-txt-primary placeholder-txt-muted/40 outline-none transition-all duration-300 ${
                    focused === 'name'
                      ? 'border-accent-green/50 shadow-[0_0_10px_rgba(0,255,136,0.1)]'
                      : 'border-border hover:border-border-hover'
                  }`}
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="code-comment block mb-2">
                  {'// your email'}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  placeholder="string"
                  className={`w-full bg-bg border rounded-lg py-2.5 px-4 font-mono text-sm text-txt-primary placeholder-txt-muted/40 outline-none transition-all duration-300 ${
                    focused === 'email'
                      ? 'border-accent-green/50 shadow-[0_0_10px_rgba(0,255,136,0.1)]'
                      : 'border-border hover:border-border-hover'
                  }`}
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="code-comment block mb-2">
                  {'// your message'}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                  placeholder="string"
                  className={`w-full bg-bg border rounded-lg py-2.5 px-4 font-mono text-sm text-txt-primary placeholder-txt-muted/40 outline-none resize-none transition-all duration-300 ${
                    focused === 'message'
                      ? 'border-accent-green/50 shadow-[0_0_10px_rgba(0,255,136,0.1)]'
                      : 'border-border hover:border-border-hover'
                  }`}
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="group w-full flex items-center justify-center gap-2 font-mono text-sm border border-accent-green/40 text-accent-green py-3 rounded-lg hover:bg-accent-green/10 hover:border-accent-green/60 transition-all duration-300"
              >
                <span className="text-txt-muted group-hover:text-accent-green/70">{'>'}</span>
                {' '}send_message
                <Send size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {contactItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className="group flex items-center gap-4 p-4 rounded-xl border border-border bg-bg-surface hover:border-border-hover transition-all duration-300"
              >
                <div
                  className={`p-3 rounded-lg ${accentMap[item.color].bg} ${accentMap[item.color].text}`}
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
                      className={`text-sm text-txt-primary transition-colors truncate block ${accentMap[item.color].hover}`}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm text-txt-primary truncate">{item.value}</p>
                  )}
                </div>
                {item.href && (
                  <ArrowRight size={14} className="text-txt-muted group-hover:text-accent-green group-hover:translate-x-1 transition-all" />
                )}
              </motion.div>
            ))}

            {/* Extra message */}
            <div className="mt-8 p-5 rounded-xl border border-border bg-bg-surface/50">
              <p className="font-mono text-xs text-txt-muted leading-relaxed">
                <span className="text-accent-purple">{'/**'}</span><br />
                <span className="text-txt-muted">{' * You can also find me on'}</span><br />
                <span className="text-txt-muted">{' * GitHub and LinkedIn. Always open'}</span><br />
                <span className="text-txt-muted">{' * to new projects and collaborations.'}</span><br />
                <span className="text-accent-purple">{' */'}</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
