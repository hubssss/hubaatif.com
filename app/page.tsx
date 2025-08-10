"use client";

import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import LoadingScreen from "./components/LoadingScreen";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isHoveringBox, setIsHoveringBox] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Scroll animations
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  // Check if this is first visit
  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited");
    if (hasVisited) {
      setIsLoading(false);
    }
  }, []);

  const handleLoadingComplete = () => {
    sessionStorage.setItem("hasVisited", "true");
    setIsLoading(false);
  };

  // Scroll effect for navigation
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "services", "work", "about", "faq"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const services = [
    {
      title: "Basic",
      price: "$499",
      features: [
        "Responsive Web Design",
        "Basic UI/UX",
        "3 Page Website",
        "Mobile Optimization",
        "1 Week Delivery",
      ],
      popular: false,
    },
    {
      title: "Standard",
      price: "$999",
      features: [
        "Full Stack Development",
        "Advanced UI/UX Design",
        "5-8 Page Application",
        "Database Integration",
        "2 Week Delivery",
      ],
      popular: true,
    },
    {
      title: "Premium",
      price: "$1999",
      features: [
        "Custom Web Application",
        "Complete Design System",
        "Unlimited Pages",
        "API Integration",
        "3-4 Week Delivery",
      ],
      popular: false,
    },
  ];

  const faqs = [
    {
      question: "What technologies do you work with?",
      answer:
        "I specialize in modern web technologies including React, Next.js, TypeScript, Node.js, and various UI/UX design tools like Figma and Adobe Creative Suite.",
    },
    {
      question: "How long does a typical project take?",
      answer:
        "Project timelines vary based on complexity. Simple websites take 1-2 weeks, while complex applications can take 4-8 weeks. I&apos;ll provide a detailed timeline after understanding your requirements.",
    },
    {
      question: "Do you offer ongoing support?",
      answer:
        "Yes! I provide post-launch support and maintenance packages to ensure your website continues to perform optimally.",
    },
    {
      question: "Can you help with branding and design?",
      answer:
        "Absolutely! As a UI/UX designer, I can create complete brand identities, including logos, color schemes, and design systems.",
    },
    {
      question: "What&apos;s your development process?",
      answer:
        "I follow an agile approach: Discovery → Design → Development → Testing → Launch. You&apos;ll be involved at every stage with regular updates.",
    },
  ];

  const testimonials = [
    {
      name: "Alex Johnson",
      role: "CEO, TechStart",
      content:
        "Huba delivered an exceptional website that exceeded our expectations. His attention to detail and technical expertise are outstanding.",
      rating: 5,
    },
    {
      name: "Sarah Miller",
      role: "Marketing Director",
      content:
        "Working with Huba was a pleasure. He understood our vision perfectly and created a beautiful, functional design.",
      rating: 5,
    },
    {
      name: "David Chen",
      role: "Founder, InnovateCo",
      content:
        "Professional, creative, and reliable. Huba transformed our ideas into a stunning digital experience.",
      rating: 5,
    },
  ];

  // Animation variants for scroll animations
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const fadeInLeft = {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const fadeInRight = {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onLoadingComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.div
        className="min-h-screen bg-black text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Navigation - Logo removed */}
        <nav
          className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50 border-b"
          style={{ borderColor: "rgba(155, 89, 182, 0.3)" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Empty div to maintain layout */}
              <div className="w-20"></div>

              {/* Desktop Menu */}
              <div className="hidden md:flex space-x-8">
                {["Home", "Services", "Work", "About", "FAQ"].map((item) => (
                  <motion.button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`text-sm font-medium transition-all duration-300 relative ${
                      activeSection === item.toLowerCase()
                        ? ""
                        : "text-gray-400 hover:text-gray-200"
                    }`}
                    style={{
                      color:
                        activeSection === item.toLowerCase()
                          ? "#9b59b6"
                          : undefined,
                    }}
                  >
                    {item}
                    {activeSection === item.toLowerCase() && (
                      <div
                        className="absolute -bottom-[21px] left-0 right-0 h-0.5"
                        style={{ backgroundColor: "#9b59b6" }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2"
              >
                <div className="w-6 h-5 flex flex-col justify-between">
                  <span
                    className="w-full h-0.5 block transition-all duration-300"
                    style={{
                      backgroundColor: "#9b59b6",
                      transform: isMenuOpen
                        ? "rotate(45deg) translateY(8px)"
                        : "none",
                    }}
                  />
                  <span
                    className="w-full h-0.5 block transition-all duration-300"
                    style={{
                      backgroundColor: "#9b59b6",
                      opacity: isMenuOpen ? 0 : 1,
                    }}
                  />
                  <span
                    className="w-full h-0.5 block transition-all duration-300"
                    style={{
                      backgroundColor: "#9b59b6",
                      transform: isMenuOpen
                        ? "rotate(-45deg) translateY(-8px)"
                        : "none",
                    }}
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden bg-black/95 border-t"
                style={{ borderColor: "rgba(155, 89, 182, 0.3)" }}
              >
                <div className="px-4 py-4 space-y-3">
                  {["Home", "Services", "Work", "About", "FAQ"].map((item) => (
                    <motion.button
                      key={item}
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="block w-full text-left py-2 text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      {item}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Hero Section */}
        <section
          id="home"
          className="pt-16 min-h-screen flex items-center relative overflow-hidden"
        >
          {/* Minimal background gradient */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-10"
              style={{ backgroundColor: "#9b59b6" }}
            />
            <div
              className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl opacity-10"
              style={{ backgroundColor: "#9b59b6" }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.h1
                  className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  Hi! I&apos;m <span style={{ color: "#9b59b6" }}>Huba</span>
                  <span className="text-3xl md:text-4xl lg:text-5xl block mt-4 font-normal text-gray-300">
                    the mind behind exceptional digital experiences.
                  </span>
                </motion.h1>

                <motion.p
                  className="text-xl text-gray-400 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Software Engineer & UI/UX Designer crafting beautiful,
                  functional solutions that drive results.
                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <button
                    onClick={() => scrollToSection("services")}
                    className="px-8 py-4 rounded-full font-medium transition-all duration-300"
                    style={{
                      background: "linear-gradient(90deg, #9b59b6, #9b59b6)",
                      color: "white",
                    }}
                  >
                    View Services
                  </button>
                  <button
                    onClick={() => scrollToSection("work")}
                    className="px-8 py-4 bg-black border rounded-full font-medium text-white transition-all duration-300 hover:shadow-lg"
                    style={{
                      borderColor: "#9b59b6",
                      borderWidth: "1px",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0 0 10px rgba(155, 89, 182, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    See My Work
                  </button>
                </motion.div>
              </motion.div>

              {/* Interactive Box */}
              <motion.div
                className="relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div
                  className="relative w-full aspect-square max-w-md mx-auto cursor-pointer"
                  onMouseEnter={() => setIsHoveringBox(true)}
                  onMouseLeave={() => setIsHoveringBox(false)}
                >
                  {/* Interactive Box with Text */}
                  <div
                    className="w-full h-full rounded-lg flex items-center justify-center bg-black border-2 relative"
                    style={{
                      borderColor: "#9b59b6", // Muted neon purple
                      transition: "all 0.5s ease",
                    }}
                  >
                    {/* Text content */}
                    <div className="relative z-10 text-center px-8">
                      <AnimatePresence mode="wait">
                        {!isHoveringBox ? (
                          <motion.div
                            key="default"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                          >
                            <p className="text-3xl md:text-4xl font-light text-white">
                              I&apos;m a Software Engineer
                            </p>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="hover"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                          >
                            <p className="text-3xl md:text-4xl font-light text-white">
                              I&apos;m a UI/UX Designer
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Section with scroll animations */}
        <section id="services" className="py-20 bg-black/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Which package is{" "}
                <span style={{ color: "#9b59b6" }}>right for you?</span>
              </h2>
              <p className="text-xl text-gray-400">
                Choose the perfect solution for your needs
              </p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-3 gap-8"
              variants={staggerChildren}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.3 }}
            >
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  className={`relative bg-gray-900/50 backdrop-blur-sm rounded-lg p-8 border transition-all duration-300 hover:scale-[1.02] ${
                    service.popular ? "shadow-lg" : ""
                  }`}
                  style={{
                    borderColor: service.popular
                      ? "#9b59b6"
                      : "rgba(155, 89, 182, 0.3)",
                  }}
                  variants={fadeInUp}
                >
                  {service.popular && (
                    <motion.div
                      className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <span
                        className="text-white px-4 py-1 rounded-full text-sm font-medium"
                        style={{ backgroundColor: "#9b59b6" }}
                      >
                        Most Popular
                      </span>
                    </motion.div>
                  )}
                  <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                  <p
                    className="text-4xl font-bold mb-6"
                    style={{ color: "#9b59b6" }}
                  >
                    {service.price}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, i) => (
                      <motion.li
                        key={feature}
                        className="flex items-start"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <svg
                          className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0"
                          style={{ color: "#9b59b6" }}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-300">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <motion.button
                    className={`w-full py-3 rounded-full font-medium transition-all duration-300 ${
                      service.popular
                        ? "text-white"
                        : "bg-black text-white border"
                    }`}
                    style={{
                      backgroundColor: service.popular ? "#9b59b6" : "black",
                      borderColor: service.popular ? undefined : "#9b59b6",
                      borderWidth: service.popular ? undefined : "1px",
                    }}
                  >
                    Get Started
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Work Section with enhanced animations */}
        <section id="work" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Development isn&apos;t just{" "}
                <span style={{ color: "#9b59b6" }}>code</span>
              </h2>
              <p className="text-xl text-gray-400">
                It&apos;s about creating experiences that matter
              </p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerChildren}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.2 }}
            >
              {[
                {
                  title: "E-Commerce Platform",
                  tech: "Next.js, Stripe, PostgreSQL",
                  color: "from-purple-600 to-purple-800",
                },
                {
                  title: "SaaS Dashboard",
                  tech: "React, Node.js, MongoDB",
                  color: "from-pink-600 to-pink-800",
                },
                {
                  title: "Mobile App Design",
                  tech: "Figma, React Native",
                  color: "from-purple-500 to-pink-500",
                },
                {
                  title: "Corporate Website",
                  tech: "WordPress, Custom Theme",
                  color: "from-purple-700 to-purple-900",
                },
                {
                  title: "Web Application",
                  tech: "Vue.js, Firebase",
                  color: "from-pink-700 to-pink-900",
                },
                {
                  title: "Design System",
                  tech: "Storybook, Tailwind CSS",
                  color: "from-purple-600 to-pink-600",
                },
              ].map((project, index) => (
                <motion.div
                  key={project.title}
                  className="group cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                  variants={fadeInUp}
                >
                  <motion.div
                    className={`h-48 rounded-lg bg-gradient-to-br ${project.color} mb-4 flex items-center justify-center text-white text-4xl font-bold relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-300" />
                    <span>{project.title.charAt(0)}</span>
                  </motion.div>
                  <h3
                    className="text-xl font-bold mb-2 transition-colors duration-300"
                    style={{ color: "white" }}
                  >
                    {project.title}
                  </h3>
                  <p className="text-gray-500 text-sm">{project.tech}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* About Section with parallax effect */}
        <section id="about" className="py-20 bg-black/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                variants={fadeInLeft}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.3 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  The right <span style={{ color: "#9b59b6" }}>skills</span> are
                  essential
                </h2>
                <p className="text-xl text-gray-400 mb-8">
                  With years of experience in software engineering and UI/UX
                  design, I bring a unique blend of technical expertise and
                  creative vision to every project.
                </p>
                <div className="space-y-4">
                  {[
                    { skill: "Frontend Development", level: 95 },
                    { skill: "UI/UX Design", level: 90 },
                    { skill: "Backend Development", level: 85 },
                    { skill: "Database Design", level: 80 },
                  ].map((item, index) => (
                    <motion.div
                      key={item.skill}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-gray-300">
                          {item.skill}
                        </span>
                        <span style={{ color: "#9b59b6" }}>{item.level}%</span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full"
                          style={{ backgroundColor: "#9b59b6" }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.level}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1,
                            delay: 0.2 + index * 0.1,
                            ease: "easeOut",
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="grid grid-cols-2 gap-4"
                variants={staggerChildren}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.3 }}
              >
                {[
                  {
                    icon: "⚡",
                    title: "Fast Delivery",
                    desc: "Quick turnaround times",
                  },
                  {
                    icon: "🎨",
                    title: "Creative Design",
                    desc: "Unique & modern designs",
                  },
                  {
                    icon: "📱",
                    title: "Responsive",
                    desc: "Works on all devices",
                  },
                  {
                    icon: "🔒",
                    title: "Secure Code",
                    desc: "Best security practices",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-lg border transition-all duration-300 hover:scale-[1.02]"
                    style={{ borderColor: "rgba(155, 89, 182, 0.3)" }}
                    variants={fadeInUp}
                  >
                    <div className="text-3xl mb-3">{item.icon}</div>
                    <h3 className="font-bold mb-1" style={{ color: "#9b59b6" }}>
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials with slide animations */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Ratings & <span style={{ color: "#9b59b6" }}>Reviews</span>
              </h2>
              <p className="text-xl text-gray-400">
                What clients say about working with me
              </p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-3 gap-8"
              variants={staggerChildren}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.2 }}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-lg border transition-all duration-300 hover:scale-[1.01]"
                  style={{ borderColor: "rgba(155, 89, 182, 0.3)" }}
                  variants={fadeInUp}
                >
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.svg
                        key={i}
                        className="w-5 h-5"
                        style={{ color: "#9b59b6" }}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </motion.svg>
                    ))}
                  </div>
                  <p className="text-gray-400 mb-4 italic">
                    {testimonial.content}
                  </p>
                  <div>
                    <p className="font-bold" style={{ color: "#9b59b6" }}>
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* FAQ Section with smooth accordion */}
        <section id="faq" className="py-20 bg-black/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Help Center:{" "}
                <span style={{ color: "#9b59b6" }}>Questions? Answers.</span>
              </h2>
            </motion.div>

            <motion.div
              className="space-y-4"
              variants={staggerChildren}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.2 }}
            >
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-900/50 backdrop-blur-sm rounded-lg border overflow-hidden transition-all duration-300 hover:scale-[1.01]"
                  style={{ borderColor: "rgba(155, 89, 182, 0.3)" }}
                  variants={fadeInUp}
                >
                  <button
                    onClick={() =>
                      setActiveFaq(activeFaq === index ? null : index)
                    }
                    className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-800/50 transition-colors duration-300"
                  >
                    <span className="font-medium text-lg text-gray-300">
                      {faq.question}
                    </span>
                    <svg
                      className="w-5 h-5 transition-transform duration-300"
                      style={{
                        color: "#9b59b6",
                        transform:
                          activeFaq === index
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                      }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <AnimatePresence>
                    {activeFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-8 pb-6">
                          <p className="text-gray-400">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section with pulse animation */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to start your{" "}
                <span style={{ color: "#9b59b6" }}>project?</span>
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Let&apos;s create something amazing together.
              </p>
              <button
                className="px-12 py-4 text-white rounded-full font-medium text-lg transition-all duration-300 hover:shadow-lg"
                style={{
                  backgroundColor: "#9b59b6",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 0 20px rgba(155, 89, 182, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Get in Touch
              </button>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 bg-black border-t border-purple-500/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="flex flex-col md:flex-row justify-between items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-4 md:mb-0">
                <p className="text-sm text-gray-400">
                  © 2024 Huba Atif. All rights reserved.
                </p>
                <p className="text-sm mt-1" style={{ color: "#9b59b6" }}>
                  Software Engineer & UI/UX Designer
                </p>
              </div>
              <div className="flex space-x-6">
                {["LinkedIn", "GitHub", "Email"].map((link) => (
                  <motion.a
                    key={link}
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {link}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </footer>
      </motion.div>
    </>
  );
}

