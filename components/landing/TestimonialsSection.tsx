import { motion } from 'framer-motion';
import { Star, Building2, Award, Globe2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useInView } from '@/hooks/useInView';

export default function TestimonialsSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const feedbacks = [
    {
      quote:
        'This platform has transformed how we make decisions. The anonymity feature ensures honest feedback from our team.',
      author: 'Jane Smith',
      role: 'Head of Operations, Acme Inc',
      icon: <Building2 className="w-6 h-6" />
    },
    {
      quote:
        "The most secure and user-friendly voting platform we've used. Perfect for sensitive company-wide decisions.'",
      author: 'Michael Chen',
      role: 'CEO, Innovate Technologies',
      icon: <Award className="w-6 h-6" />
    },
    {
      quote:
        "We use it for everything from project prioritization to team building activities. It's become essential to our workflow.",
      author: "Sarah Johnson",
      role: "Team Lead, Global Solutions",
      icon: <Globe2 className="w-6 h-6" />
    }
  ];

  return (
    <div ref={ref} className="bg-background py-24" id="testimonials">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-yellow-400 mx-1"
                  fill="currentColor"
                />
              ))}
            </div>
          </div>
          <h2 className="text-4xl font-bold mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See what our customers have to say about their experience
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {feedbacks.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="p-6 h-full hover:shadow-md transition-all duration-300">
                <div className="mb-4 text-primary">{testimonial.icon}</div>
                <p className="text-lg mb-4">{testimonial.quote}</p>
                <div className="text-sm">
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}