import { useInView } from '@/hooks/useInView';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function HowItWorksSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const steps = [
    {
      title: 'Create Poll',
      description: 'Set up your voting topic and options in minutes'
    },
    {
      title: 'Invite Team',
      description: 'Share secure access links with your team members'
    },
    {
      title: 'Cast Votes',
      description: 'Team members vote anonymously at their convenience'
    },
    {
      title: 'View Results',
      description: 'Get instant access to voting results and analytics'
    }
  ];

  return (
    <div ref={ref} className="bg-secondary/50 py-24" id="how-it-works">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get started with anonymous voting in four simple steps
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="bg-background rounded-lg p-6 h-full shadow-sm hover:shadow-md transition-all duration-300">
                <div className="text-4xl font-bold text-primary/20 mb-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                  <ArrowRight className="w-6 h-6 text-muted-foreground/30" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}