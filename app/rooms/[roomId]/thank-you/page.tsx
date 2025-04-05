"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Home } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const ThankYouPage = () => {
  const params = useSearchParams();
  const alreadySubmitted = params.get("alreadySubmitted") === "true";
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-lg p-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex justify-center mb-6"
          >
            <CheckCircle className="w-16 h-16 text-green-500" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-3xl font-bold text-center mb-4">
              {alreadySubmitted ? "You've already submitted feedback for this room": "Thank you for your responses!"}
            </h1>
            <p className="text-muted-foreground text-center mb-8">
              Your feedback has been submitted successfully and will help us improve our services.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center"
          >
            <Link href="/home">
              <Button variant="outline" size="lg" className="gap-2">
                <Home className="w-4 h-4" />
                Return Home
              </Button>
            </Link>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
};

export default ThankYouPage;