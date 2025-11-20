"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function AboutPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const features = [
    {
      icon: "🎯",
      title: "Mission-Driven",
      description: "Empowering job seekers with cutting-edge tools to land their dream careers faster and smarter.",
    },
    {
      icon: "🚀",
      title: "Innovation First",
      description: "Leveraging AI and modern technology to simplify your job search journey.",
    },
    {
      icon: "💼",
      title: "Career Focused",
      description: "Every tool is designed with one goal: to help you succeed in your professional journey.",
    },
    {
      icon: "🤝",
      title: "Community Driven",
      description: "Built by job seekers, for job seekers. We understand your challenges because we've been there.",
    },
  ];

  const stats = [
    { value: "50K+", label: "Active Users", icon: "👥" },
    { value: "2M+", label: "Tools Accessed", icon: "🛠️" },
    { value: "94%", label: "Success Rate", icon: "📈" },
    { value: "150+", label: "Countries", icon: "🌍" },
  ];

  const team = [
    {
      name: "Career Tools",
      role: "Resume Builder & ATS Checker",
      icon: "📝",
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Job Resources",
      role: "LinkedIn Jobs & Opportunities",
      icon: "💼",
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Interview Prep",
      role: "Expert Tips & Strategies",
      icon: "🎓",
      color: "from-green-500 to-teal-500",
    },
    {
      name: "Email Templates",
      role: "Professional Communications",
      icon: "✉️",
      color: "from-orange-500 to-red-500",
    },
  ];

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
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-2xl">
                🚀
              </div>
              <div>
                <h1 className="text-xl font-bold">Apply Next Jobs</h1>
                <p className="text-xs text-gray-400">Your Career Accelerator</p>
              </div>
            </Link>

            <nav className="flex gap-3">
              <Link
                href="/"
                className="px-4 py-2 text-sm hover:text-blue-400 transition"
              >
                Home
              </Link>
              <Link
                href="/contact"
                className="px-4 py-2 text-sm hover:text-blue-400 transition"
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="inline-block mb-6 px-6 py-3 bg-blue-500/10 border border-blue-500/20 rounded-full text-sm text-blue-400">
            🌟 About Apply Next Jobs
          </div>
          
          <h2 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            Transforming
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Career Journeys
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 mb-10 leading-relaxed">
            We're on a mission to democratize access to career tools and resources, 
            helping job seekers worldwide land their dream opportunities with confidence.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-5xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Our Story */}
      <section className="relative container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-12"
          >
            <h3 className="text-4xl font-bold mb-6 flex items-center gap-3">
              <span>📖</span> Our Story
            </h3>
            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
              <p>
                <span className="text-blue-400 font-semibold">Apply Next Jobs</span> was born 
                from a simple observation: job seekers spend countless hours navigating fragmented 
                tools and resources, often feeling overwhelmed and lost in the process.
              </p>
              <p>
                We believed there had to be a better way. A centralized platform where professionals 
                could access everything they need - from resume optimization to interview preparation - 
                all in one place, completely free.
              </p>
              <p>
                Today, we're proud to serve over <span className="text-purple-400 font-semibold">50,000 
                active users</span> across 150+ countries, helping them take control of their career 
                journeys with confidence and clarity.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h3 className="text-4xl font-bold mb-4">What Drives Us</h3>
          <p className="text-gray-400 text-lg">The values that guide everything we do</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h4 className="text-2xl font-bold mb-3">{feature.title}</h4>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* What We Offer */}
      <section className="relative container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h3 className="text-4xl font-bold mb-4">What We Offer</h3>
          <p className="text-gray-400 text-lg">Comprehensive tools for every stage of your job search</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {team.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition"
            >
              <div
                className={`w-20 h-20 mx-auto mb-4 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center text-4xl shadow-lg`}
              >
                {item.icon}
              </div>
              <h4 className="text-xl font-bold mb-2">{item.name}</h4>
              <p className="text-sm text-gray-400">{item.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="backdrop-blur-xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-white/10 rounded-3xl p-12 text-center"
        >
          <h3 className="text-4xl font-bold mb-4">Join Our Community</h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Start your journey to career success today with our comprehensive suite of tools
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/register"
              className="px-10 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition font-semibold text-lg shadow-2xl shadow-blue-500/30"
            >
              Get Started Free
            </Link>
            <Link
              href="/contact"
              className="px-10 py-4 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/10 transition font-semibold text-lg"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </section>

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