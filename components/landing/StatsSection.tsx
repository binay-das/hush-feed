import { useInView } from '@/hooks/useInView';
import { motion } from 'framer-motion';


export default function StatsSection() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  const stats = [
    { number: '1M+', label: 'Votes Cast' },
    { number: '5000+', label: 'Organizations' },
    { number: '99.9%', label: 'Uptime' },
    { number: '150+', label: 'Countries' }
  ];

  return (
    <div ref={ref} className="bg-background py-16 border-y">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}