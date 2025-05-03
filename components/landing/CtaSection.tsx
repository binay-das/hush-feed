import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useInView } from '@/hooks/useInView';

export default function CtaSection() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <div className="container mx-auto px-4 py-24">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-2xl p-12 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]" />
        <div className="relative">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Transform Your Decision-Making?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of organizations making better decisions with
            anonymous voting
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              className="text-lg px-8 hover:scale-105 transition-transform"
            >
              Start Your Free Trial
            </Button>
            <Button
                size="lg"
                variant="outline"
                className="text-lg text-black border-white/20 hover:bg-white/10 hover:text-white"
              >
                Schedule Demo
              </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}