"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { NEXT_PUBLIC_BASE_URL } from "@/config";
import CtaSection from "@/components/landing/CtaSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import StatsSection from "@/components/landing/StatsSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const authToken = localStorage.getItem("token");
      try {
        const { data } = await axios.get(`${NEXT_PUBLIC_BASE_URL}/api/user`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setUser(data);
        console.log(data);
      } catch (error) {
        console.error("User not found!", error);
      }
    };

    fetchUser();
  }, []);

  const redirectUrl = user ? "/home" : "/user/signin";

  return (
    <div className="min-h-screen">
      <HeroSection redirectUrl={redirectUrl} />
      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CtaSection />
    </div>
  );
}
