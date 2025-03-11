
import { useState, useEffect } from "react";
import { ArrowLeft, Code, FileCode, Monitor, Database, Terminal, Server, Github, Layers, Zap, Cpu, Globe, Award, BrainCircuit, Bot, Sparkles, LineChart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Spline from '@splinetool/react-spline';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Updated skill categories with AI/ML
const skillCategories = [
  {
    title: "Frontend Development",
    skills: [
      { name: "React & Next.js", icon: <FileCode className="h-5 w-5" />, color: "#D946EF" },
      { name: "TypeScript", icon: <Code className="h-5 w-5" />, color: "#0EA5E9" },
      { name: "Tailwind CSS", icon: <Layers className="h-5 w-5" />, color: "#0EA5E9" },
      { name: "UI/UX Design", icon: <Monitor className="h-5 w-5" />, color: "#F97316" },
    ],
  },
  {
    title: "Backend Development",
    skills: [
      { name: "Node.js", icon: <Server className="h-5 w-5" />, color: "#8B5CF6" },
      { name: "Express & NestJS", icon: <Terminal className="h-5 w-5" />, color: "#9b87f5" },
      { name: "PostgreSQL", icon: <Database className="h-5 w-5" />, color: "#0EA5E9" },
      { name: "RESTful APIs", icon: <Zap className="h-5 w-5" />, color: "#F97316" },
    ],
  },
  {
    title: "AI & Machine Learning",
    skills: [
      { name: "Python", icon: <Code className="h-5 w-5" />, color: "#8B5CF6" },
      { name: "TensorFlow & PyTorch", icon: <BrainCircuit className="h-5 w-5" />, color: "#D946EF" },
      { name: "NLP & Computer Vision", icon: <Bot className="h-5 w-5" />, color: "#0EA5E9" },
      { name: "Data Analysis", icon: <LineChart className="h-5 w-5" />, color: "#F97316" },
    ],
  },
  {
    title: "DevOps & Tools",
    skills: [
      { name: "Git & GitHub", icon: <Github className="h-5 w-5" />, color: "#D946EF" },
      { name: "Docker", icon: <Cpu className="h-5 w-5" />, color: "#0EA5E9" },
      { name: "CI/CD Pipelines", icon: <Layers className="h-5 w-5" />, color: "#9b87f5" },
      { name: "AWS & Vercel", icon: <Globe className="h-5 w-5" />, color: "#F97316" },
    ],
  },
];

// Updated stats with 1+ year
const developerStats = [
  { value: "1+", label: "Year Experience", icon: <Award className="h-5 w-5" />, color: "from-purple-500 to-indigo-500" },
  { value: "35+", label: "Projects Completed", icon: <Layers className="h-5 w-5" />, color: "from-pink-500 to-rose-500" },
  { value: "15+", label: "Happy Clients", icon: <Globe className="h-5 w-5" />, color: "from-blue-500 to-cyan-500" },
  { value: "99%", label: "Success Rate", icon: <Zap className="h-5 w-5" />, color: "from-amber-500 to-orange-500" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  },
  hover: {
    y: -10,
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};

const Skills = () => {
  const [mounted, setMounted] = useState(false);
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [splineError, setSplineError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleSplineLoad = () => {
    console.log("Spline scene loaded");
    setSplineLoaded(true);
  };

  const handleSplineError = (error) => {
    console.error("Spline error:", error);
    setSplineError(true);
  };

  return (
    <div className="relative min-h-screen bg-background pt-16">
      {/* Spline Background */}
      <div className="fixed inset-0 z-0">
        {!splineError && (
          <Spline 
            scene="https://prod.spline.design/unVoHzNnqDrA5Ql1/scene.splinecode" 
            onLoad={handleSplineLoad}
            onError={handleSplineError}
          />
        )}
      </div>
      
      <Navigation />
      <main className="relative z-10 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="pt-8">
          <Button variant="ghost" asChild className="group mb-6">
            <Link to="/" className="flex items-center text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>
          </Button>
        </div>
        
        {/* About Me Section with Image */}
        <section className="py-8 md:py-12 mb-8">
          <div className="max-w-3xl mx-auto mb-12 flex flex-col md:flex-row items-center gap-8">
            <div className="relative h-64 w-64 overflow-hidden rounded-full border border-gray-100 shadow-lg transition-all md:h-80 md:w-80 opacity-0 animate-fade-in-delayed">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop"
                alt="Hitesh H - Developer"
                className={cn(
                  "h-full w-full object-cover transition-all",
                  imageLoaded ? "animate-image-load" : "blur-md scale-105"
                )}
                onLoad={() => setImageLoaded(true)}
              />
            </div>
            
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-6 md:text-4xl">About Me</h2>
              <div className="prose dark:prose-invert max-w-none space-y-4 text-pretty">
                <p>
                  Hello! I'm Hitesh, a passionate full-stack developer with expertise in AI and machine learning. 
                  I combine technical skills with creative problem-solving to build innovative solutions.
                </p>
                <p>
                  With over a year of experience in web and AI development, I've worked on projects ranging from 
                  responsive web applications to advanced machine learning models. My approach focuses on 
                  creating user-friendly experiences while leveraging cutting-edge technologies.
                </p>
                <p>
                  When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
                  or diving into the latest research in artificial intelligence. I believe in continuous learning and 
                  staying ahead of industry trends to deliver innovative solutions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Modern KPI Stats Section - Redesigned for better visual appeal */}
        <section className="py-8 md:py-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-16"
          >
            {developerStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
                className={`relative overflow-hidden rounded-xl p-6 bg-gradient-to-br ${stat.color} shadow-lg backdrop-blur-sm border border-white/10`}
              >
                <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-white/10 blur-xl"></div>
                <div className="absolute bottom-0 left-0 h-16 w-16 rounded-full bg-white/5 blur-lg"></div>
                <div className="relative flex flex-col text-white">
                  <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
                    {stat.icon}
                  </div>
                  <span className="text-3xl font-bold">{stat.value}</span>
                  <span className="text-sm font-medium text-white/80">{stat.label}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>
        
        {/* Skills Categories Section */}
        <section className="py-8 md:py-16">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold mb-6 md:text-4xl"
            >
              Technical Expertise
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-muted-foreground"
            >
              A collection of technologies I work with to bring digital products to life.
            </motion.p>
          </div>
          
          <div className="grid gap-12">
            {skillCategories.map((category, categoryIndex) => (
              <div key={category.title} className="mb-10">
                <motion.h3 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: categoryIndex * 0.1, duration: 0.5 }}
                  className="text-xl font-semibold mb-6 border-l-4 border-primary pl-4"
                >
                  {category.title}
                </motion.h3>
                
                <motion.div 
                  className="grid grid-cols-2 gap-6 md:grid-cols-4"
                  variants={container}
                  initial="hidden"
                  animate="show"
                >
                  {category.skills.map((skill, index) => (
                    <motion.div 
                      key={skill.name} 
                      className="flex flex-col items-center rounded-lg backdrop-blur-md bg-card/50 p-6 text-center shadow-sm border border-border/50"
                      variants={item}
                      whileHover={{
                        y: -10,
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                      }}
                    >
                      <motion.div 
                        className="mb-3 flex h-12 w-12 items-center justify-center rounded-full"
                        style={{ backgroundColor: `${skill.color}20` }}
                        whileHover={{
                          scale: 1.1,
                          backgroundColor: `${skill.color}30`,
                        }}
                      >
                        <span style={{ color: skill.color }}>{skill.icon}</span>
                      </motion.div>
                      <h3 className="text-sm font-medium">{skill.name}</h3>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Skills;
