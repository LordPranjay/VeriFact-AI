import { Shield, Github } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-emerald-50 to-white text-gray-600 py-16 border-t border-emerald-100 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(16, 185, 129, 0.05) 1px, transparent 0)",
            backgroundSize: "30px 30px",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center gap-2 mb-4 group">
              <Shield className="h-6 w-6 text-emerald-600 transition-transform duration-300 group-hover:rotate-12" />
              <span className="font-bold text-xl text-gray-900">
                VeriFact{" "}
                <span className="text-emerald-600 relative">
                  AI
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-emerald-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                </span>
              </span>
            </div>
            <p className="text-gray-600 mb-6">
            Real-Time Fact Checking to{" "}
              <span className="text-emerald-600 font-medium">Combat Misinformation</span>
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-emerald-200 text-center">
          <p className="text-emerald-600">© {new Date().getFullYear()} VeriFact AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
