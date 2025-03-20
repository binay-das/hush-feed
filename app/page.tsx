"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Vote,
  Users,
  Shield,
  LineChart,
  CheckCircle2,
  ArrowRight,
  Star,
  Building2,
  Award,
  Globe2,
} from "lucide-react";
import { Navbar } from "@/components/ui/navbar";
import Link from "next/link";

export default function Home() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const features = [
    {
      icon: <Vote className="w-8 h-8 text-primary" />,
      title: "Anonymous Voting",
      description: "Cast your votes with complete privacy and security",
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Team Decisions",
      description: "Make collective decisions without peer pressure",
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Secure Platform",
      description: "End-to-end encryption for maximum data protection",
    },
    {
      icon: <LineChart className="w-8 h-8 text-primary" />,
      title: "Real-time Results",
      description: "Watch results unfold as votes are cast",
    },
  ];

  const stats = [
    { number: "1M+", label: "Votes Cast" },
    { number: "5000+", label: "Organizations" },
    { number: "99.9%", label: "Uptime" },
    { number: "150+", label: "Countries" },
  ];

  const steps = [
    {
      title: "Create Poll",
      description: "Set up your voting topic and options in minutes",
    },
    {
      title: "Invite Team",
      description: "Share secure access links with your team members",
    },
    {
      title: "Cast Votes",
      description: "Team members vote anonymously at their convenience",
    },
    {
      title: "View Results",
      description: "Get instant access to voting results and analytics",
    },
  ];

  const feedbacks = [
    {
      quote:
        "This platform has transformed how we make decisions. The anonymity feature ensures honest feedback from our team.",
      author: "Binay Das",
      role: "Head of Operations, Secret Company",
      icon: <Building2 className="w-6 h-6" />,
    },
    {
      quote:
        "The most secure and user-friendly voting platform we've used. Perfect for sensitive company-wide decisions.",
      author: "Binay Das",
      role: "CEO, Secret Company",
      icon: <Award className="w-6 h-6" />,
    },
    {
      quote:
        "We use it for everything from project prioritization to team building activities. It's become essential to our workflow.",
      author: "Binay Das",
      role: "Team Lead, Secret Company",
      icon: <Globe2 className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen">    
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
              <Link href="/user/signup">
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

      <div className="bg-background py-16 border-y">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
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

      <div className="bg-card py-24" id="features">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
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
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-shadow border-primary/10 hover:border-primary/20">
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

      <div className="bg-secondary/50 py-24" id="how-it-works">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
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
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-background rounded-lg p-6 h-full">
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

      <div className="bg-background py-24" id="testimonials">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex justify-center mb-4">
              <div className="flex -space-x-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 mx-2"
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
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full">
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

      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
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
              <Button size="lg" variant="secondary" className="text-lg px-8">
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
    </div>
  );
}
