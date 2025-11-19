"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function HomePage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupTimer, setPopupTimer] = useState<NodeJS.Timeout | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setIsLoggedIn(true);
        setUser(session.user);
      }
    };
    checkUser();

    // Mouse move effect
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const toolCards = [
    {
      id: 1,
      title: "LinkedIn Jobs",
      description: "Explore thousands of job opportunities from top companies worldwide",
      icon: "💼",
      link: "https://www.linkedin.com/in/apply-next-jobs/recent-activity/all/",
      gradient: "from-blue-600 via-blue-500 to-cyan-400",
      badge: "Most Popular",
    },
    {
      id: 2,
      title: "ATS Resume Checker",
      description: "Optimize your resume to pass Applicant Tracking Systems with 95% accuracy",
      icon: "🎯",
      link: "https://www.jobscan.co/",
      gradient: "from-purple-600 via-pink-500 to-rose-400",
      badge: "AI Powered",
    },
    {
      id: 3,
      title: "Resume Builder Pro",
      description: "Create ATS-friendly resumes with professional templates in minutes",
      icon: "📝",
      link: "https://www.canva.com/resumes/templates/",
      gradient: "from-emerald-600 via-green-500 to-teal-400",
      badge: "Free Tool",
    },
    {
      id: 4,
      title: "Interview Mastery",
      description: "Learn from experts and ace your next interview with proven strategies",
      icon: "🎓",
      link: "https://www.youtube.com/playlist?list=PLY1HHnh9FqT-TH0WRbF7r6Uu0vAjgz5kD",
      gradient: "from-orange-600 via-amber-500 to-yellow-400",
      badge: "Video Course",
    },
    {
      id: 5,
      title: "Email Templates",
      description: "Professional email templates for applications, follow-ups, and networking",
      icon: "✉️",
      link: "https://www.indeed.com/career-advice/resumes-cover-letters/email-templates",
      gradient: "from-indigo-600 via-violet-500 to-purple-400",
      badge: "Ready to Use",
    },
    {
      id: 6,
      title: "Salary Insights",
      description: "Compare salaries, negotiate better, and know your market worth",
      icon: "💰",
      link: "https://www.glassdoor.co.in/Salaries/index.htm",
      gradient: "from-red-600 via-rose-500 to-pink-400",
      badge: "Data Driven",
    },
  ];

  const stats = [
    { label: "Active Users", value: "50K+", icon: "👥" },
    { label: "Jobs Accessed", value: "2M+", icon: "💼" },
    { label: "Success Rate", value: "94%", icon: "🎯" },
    { label: "Tools Available", value: "6+", icon: "🛠️" },
  ];

  const handleCardClick = (link: string) => {
    if (!isLoggedIn) {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 3000);
      setPopupTimer(timer);
    } else {
      window.open(link, "_blank");
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    if (popupTimer) {
      clearTimeout(popupTimer);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setUser(null);
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          style={{
            left: mousePosition.x - 200,
            top: mousePosition.y - 200,
            transition: "all 0.3s ease-out",
          }}
        />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative backdrop-blur-xl bg-white/5 border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-2xl">
                🚀
              </div>
              <div>
                <h1 className="text-xl font-bold">Apply Next Jobs</h1>
                <p className="text-xs text-gray-400">Your Career Accelerator</p>
              </div>
            </motion.div>

            <nav className="flex gap-3 items-center">
              <Link href="/about" className="px-4 py-2 text-sm hover:text-blue-400 transition">
                About
              </Link>
              <Link href="/contact" className="px-4 py-2 text-sm hover:text-blue-400 transition">
                Contact
              </Link>

              {isLoggedIn ? (
                <>
                  <Link
                    href="/profile"
                    className="px-5 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-sm font-medium"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-5 py-2 rounded-lg bg-red-600/20 hover:bg-red-600/30 transition text-sm font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-5 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-sm font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition text-sm font-semibold shadow-lg shadow-blue-500/25"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative container mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block mb-4 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-sm text-blue-400">
            ✨ Trusted by 50,000+ Job Seekers
          </div>
          <h2 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            Land Your Dream Job
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Faster & Smarter
            </span>
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Access powerful career tools, optimize your resume, ace interviews, and connect with
            opportunities from top companies worldwide.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() =>
                document.getElementById("tools")?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition font-semibold text-lg shadow-2xl shadow-blue-500/30"
            >
              Explore Tools →
            </button>
            <button className="px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 transition font-semibold text-lg">
              Watch Demo
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-4xl mx-auto"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Tool Cards */}
      <section id="tools" className="relative container mx-auto px-4 pb-20">
        <div className="text-center mb-12">
          <h3 className="text-4xl font-bold mb-4">Career Tools Suite</h3>
          <p className="text-gray-400 text-lg">Everything you need to succeed in your job search</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {toolCards.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="relative group cursor-pointer"
              onClick={() => handleCardClick(tool.link)}
            >
              <div
                className={`absolute -inset-0.5 bg-gradient-to-r ${tool.gradient} rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500`}
              />

              <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 h-full">
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-white/10 backdrop-blur-xl rounded-full text-xs font-medium border border-white/20">
                    {tool.badge}
                  </span>
                </div>

                <div
                  className={`w-16 h-16 bg-gradient-to-br ${tool.gradient} rounded-xl flex items-center justify-center text-3xl mb-4 shadow-lg`}
                >
                  {tool.icon}
                </div>

                <h3 className="text-2xl font-bold mb-3">{tool.title}</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">{tool.description}</p>

                <button
                  className={`w-full py-3 rounded-xl bg-gradient-to-r ${tool.gradient} text-white font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:gap-3`}
                >
                  Access Tool
                  <span className="text-xl">→</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      {!isLoggedIn && (
        <section className="relative container mx-auto px-4 pb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="backdrop-blur-xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-white/10 rounded-3xl p-12 text-center"
          >
            <h3 className="text-4xl font-bold mb-4">Ready to Transform Your Career?</h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who landed their dream jobs using our platform
            </p>
            <Link
              href="/register"
              className="inline-block px-10 py-4 rounded-xl bg-white text-slate-950 hover:bg-gray-100 transition font-bold text-lg shadow-2xl"
            >
              Create Free Account
            </Link>
          </motion.div>
        </section>
      )}

      {/* Login Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
            onClick={closePopup}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-10 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg">
                  🔐
                </div>
                <h3 className="text-3xl font-bold mb-4">Access Restricted</h3>
                <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                  Create a <span className="text-blue-400 font-semibold">free account</span> to
                  access all career tools and job resources instantly.
                </p>
                <div className="space-y-3">
                  <Link
                    href="/register"
                    className="block w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 font-semibold text-lg hover:from-blue-500 hover:to-purple-500 transition shadow-lg"
                  >
                    Create Account
                  </Link>
                  <Link
                    href="/login"
                    className="block w-full py-4 rounded-xl bg-white/10 hover:bg-white/20 font-semibold text-lg transition border border-white/10"
                  >
                    Login
                  </Link>
                </div>
                <button
                  onClick={closePopup}
                  className="mt-6 text-gray-400 hover:text-white transition text-sm"
                >
                  Maybe Later
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="relative backdrop-blur-xl bg-white/5 border-t border-white/10 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-xl">
                  🚀
                </div>
                <span className="font-bold">Apply Next Jobs</span>
              </div>
              <p className="text-gray-400 text-sm">
                Empowering job seekers with smart career tools and resources.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <Link href="/" className="block hover:text-white transition">
                  Home
                </Link>
                <Link href="/about" className="block hover:text-white transition">
                  About Us
                </Link>
                <Link href="/contact" className="block hover:text-white transition">
                  Contact
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Tools</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <a href="#" className="block hover:text-white transition">
                  Resume Builder
                </a>
                <a href="#" className="block hover:text-white transition">
                  ATS Checker
                </a>
                <a href="#" className="block hover:text-white transition">
                  Interview Prep
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <a href="#" className="block hover:text-white transition">
                  Privacy Policy
                </a>
                <a href="#" className="block hover:text-white transition">
                  Terms of Service
                </a>
                <a href="#" className="block hover:text-white transition">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-gray-400 text-sm">
            <p>© 2024 Apply Next Jobs. All rights reserved. Built with ❤️ for job seekers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}