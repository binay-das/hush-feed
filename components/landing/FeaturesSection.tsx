import { motion } from 'framer-motion';
import { Vote, Users, Shield, LineChart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useInView } from '@/hooks/useInView';

export default function FeaturesSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const features = [
    {
      icon: <Vote className="w-8 h-8 text-primary" />,
      title: 'Anonymous Voting',
      description: 'Cast your votes with complete privacy and security'
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: 'Team Decisions',
      description: 'Make collective decisions without peer pressure'
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: 'Secure Platform',
      description: 'End-to-end encryption for maximum data protection'
    },
    {
      icon: <LineChart className="w-8 h-8 text-primary" />,
      title: 'Real-time Results',
      description: 'Watch results unfold as votes are cast'
    }
  ];

  return (
    <div ref={ref} className="bg-card py-24" id="features">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-secondary rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            <Shield className="w-4 h-4" /> Enterprise-Grade Security
          </div>
          <h2 className="text-4xl font-bold mb-4">
            Why Choose Our Platform?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform provides the tools you need for transparent and
            anonymous decision-making in your organization
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-all duration-300 border-primary/10 hover:border-primary/20 hover:scale-105">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}