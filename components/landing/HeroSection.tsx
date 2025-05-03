import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface HeroSectionProps {
  redirectUrl: string;
}

export default function HeroSection({ redirectUrl }: HeroSectionProps) {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="relative bg-gradient-to-b from-background to-secondary overflow-hidden min-h-screen">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
        <div className="container mx-auto px-4 pt-32 pb-32 relative">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-block mb-4">
              <span className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mt-12">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Now with real-time analytics
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold my-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary">
              <span className="relative">
                <span className="absolute inset-0 blur-sm opacity-40">
                  Anonymous
                </span>
                <span className="bg-gradient-to-r from-gray-600 via-gray-300 to-gray-600 bg-clip-text text-transparent">
                  Anonymous
                </span>
              </span>{" "}
              Voting Made Simple
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Empower your organization with secure, anonymous voting for better
              decision-making
            </p>
            <div className="flex gap-4 justify-center">
              <Link href={redirectUrl}>
                <Button size="lg" className="text-lg px-8">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="#">
                <Button size="lg" variant="outline" className="text-lg">
                  Watch Demo
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
  );
}