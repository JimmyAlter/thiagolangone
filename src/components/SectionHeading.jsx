import { motion } from 'framer-motion';

const SectionHeading = ({ index, eyebrow, title, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="text-center mb-10 md:mb-16"
  >
    <div className="flex items-center justify-center gap-4 mb-5">
      <span className="accent-rule w-10 md:w-16" />
      <span className="section-eyebrow">
        <span className="text-accent-blue">{index}</span>
        {eyebrow}
      </span>
      <span className="accent-rule w-10 md:w-16" />
    </div>

    <h2 className="section-title text-txt-primary">{title}</h2>

    {description && (
      <p className="text-txt-secondary mt-4 max-w-xl mx-auto text-sm leading-relaxed">
        {description}
      </p>
    )}
  </motion.div>
);

export default SectionHeading;
