"use client";

// Change this import
import { useRouter } from "next/navigation"; // <-- Change from "next/router" to "next/navigation"
import { useState, useEffect, SetStateAction } from "react";
import {
  AlertTriangle,
  ArrowRight,
  ArrowUp,
  CheckCircle,
  Download,
  Info,
  Search,
  Send,
  Shield,
  X,
  Menu,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { staggerContainer, fadeIn, textVariant } from "@/utils/motion";

const HeroSection = () => {

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const handleInstallClick = () => {
    window.open("x.com", "_blank");
  };

  return (
    <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-32">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="container mx-auto px-4 relative z-10"
      >
        <div className="flex flex-col items-center text-center">
          <motion.div
            variants={fadeIn("down", "spring", 0.2, 1)}
            className="relative group"
          >
            <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-200 mb-6 px-4 py-1.5 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-0.5">
              Welcome to VeriFact AI
            </Badge>
          </motion.div>

          <motion.h1
            variants={textVariant(0.4)}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 max-w-4xl leading-tight tracking-tight"
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Real-Time Fact Checking to{" "}
            </motion.span>
            <motion.span
              className="text-blue-600 relative inline-block"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              Combat Misinformation
              <svg
                className="absolute -bottom-2 left-0 w-full"
                height="8"
                viewBox="0 0 100 8"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M0 4C20 0 40 8 60 4C80 0 100 4 100 4"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                />
              </svg>
            </motion.span>
          </motion.h1>

          <motion.p
            variants={fadeIn("up", "spring", 0.8, 1)}
            className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl leading-relaxed"
          >
            VeriFact uses{" "}
            <span className="text-blue-600 font-medium">
            AI-powered analysis
            </span>
            {" "}
            to spot and bust misinformation with verified facts, ensuring truth
            prevails.
          </motion.p>

          {/* CTA Buttons with enhanced animations */}
          <motion.div
            variants={fadeIn("up", "spring", 1.2, 1)}
            className="flex flex-col sm:flex-row gap-4 w-full max-w-lg justify-center items-center"
          >
            <Button
              size="lg"
              onClick={handleInstallClick}
              className="bg-blue-600 max-w-72  hover:bg-blue-700 text-white md:px-8 md:py-6 py-2 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 flex-1 transform hover:-translate-y-1 relative overflow-hidden group"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-blue-600 -z-10"></span>
              <span className="absolute inset-0 w-0 bg-gradient-to-r from-blue-600 to-blue-800 transition-all duration-300 group-hover:w-full -z-10"></span>
              <Download className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              <span>Install Extension</span>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
