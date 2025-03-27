"use client";

// Change this import
import { useRouter } from "next/navigation"; // <-- Change from "next/router" to "next/navigation"
import { useState, useEffect, SetStateAction } from "react";
import {
  AlertTriangle,
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
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { staggerContainer, fadeIn, textVariant } from "@/utils/motion";


const HowitWorks = () => {
  return (
    <section className="bg-gradient-to-b from-white to-emerald-50 py-24 relative overflow-hidden">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="container mx-auto px-4 relative z-10"
      >
        <motion.div
          variants={fadeIn("up", "spring", 0.2, 1)}
          className="text-center mb-16"
        >
          <div className="inline-block relative mb-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 relative z-10">
              How <span className="text-emerald-600">VeriFact AI</span> Works
            </h2>
            <div className="absolute -inset-1 bg-emerald-100 rounded-full blur-xl opacity-30 -z-10"></div>
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {[
            {
              icon: <AlertTriangle className="h-8 w-8 text-white" />,
              title: "Real-Time Detection",
              description:
                "Our AI algorithms scan online content in real-time across social media, news sites, and messaging platforms to identify potential propaganda.",
            },
            {
              icon: <CheckCircle className="h-8 w-8 text-white" />,
              title: "Fact Verification",
              description:
                "We cross-reference claims with our extensive database of verified information from trusted sources and government records.",
            },
            {
              icon: <Info className="h-8 w-8 text-white" />,
              title: "User Alerts",
              description:
                "Get instant notifications when browsing content that contains potential misinformation with clear explanations and verified facts.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeIn("up", "spring", index * 0.2, 0.75)}
            >
              <Card className="border-emerald-100 hover:border-emerald-300 transition-all duration-500 relative shadow-md hover:shadow-xl overflow-visible transform hover:-translate-y-2 group">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <CardContent className="pt-14 pb-8 px-8 text-center">
                  <h3 className="text-xl font-semibold text-emerald-700 mb-4 relative inline-block">
                    {feature.title}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-500"></span>
                  </h3>
                  <p className="text-gray-600">
                    {feature.description.split(" ").map((word, i) =>
                      i === 0 ||
                      i === 1 ||
                      i === feature.description.split(" ").length - 1 ||
                      i === feature.description.split(" ").length - 2 ? (
                        <span key={i} className="text-emerald-600 font-medium">
                          {" "}
                          {word}{" "}
                        </span>
                      ) : (
                        <span key={i}> {word} </span>
                      )
                    )}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HowitWorks;
