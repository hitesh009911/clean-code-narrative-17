
import { useState, useEffect } from "react";
import { ArrowLeft, Code, FileCode, Monitor, Database, Terminal, Server, Github, Layers, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Spline from '@splinetool/react-spline';
import { motion } from "framer-motion";

const skills = [
  { name: "JavaScript/TypeScript", icon: <Code className="h-4 w-4" />, color: "#9b87f5" },
  { name: "React & Next.js", icon: <FileCode className="h-4 w-4" />, color: "#D946EF" },
  { name: "UI/UX Design", icon: <Monitor className="h-4 w-4" />, color: "#0EA5E9" },
  { name: "Node.js", icon: <Server className="h-4 w-4" />, color: "#8B5CF6" },
  { name: "RESTful APIs", icon: <Zap className="h-4 w-4" />, color: "#F97316" },
  { name: "PostgreSQL", icon: <Database className="h-4 w-4" />, color: "#0EA5E9" },
  { name: "Tailwind CSS", icon: <Layers className="h-4 w-4" />, color: "#9b87f5" },
  { name: "Git/Version Control", icon: <Github className="h-4 w-4" />, color: "#D946EF" },
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
        
        {/* About Me Section */}
        <section className="py-8 md:py-12 mb-8">
          <div className="max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-6 md:text-4xl text-center">About Me</h2>
            <div className="prose dark:prose-invert max-w-none space-y-4 text-pretty">
              <p>
                Hello! I'm Hitesh, a passionate full-stack developer with a keen eye for design and user experience. 
                I specialize in creating modern, performant web applications that blend functionality with aesthetic appeal.
              </p>
              <p>
                With over 5 years of experience in web development, I've worked on projects ranging from simple landing pages to complex 
                enterprise applications. My approach combines technical excellence with creative problem-solving to deliver solutions 
                that exceed expectations.
              </p>
              <p>
                When I'm not coding, you can find me exploring new technologies, contributing to open-source, or enjoying the outdoors. 
                I believe in continuous learning and staying ahead of industry trends to deliver cutting-edge solutions.
              </p>
            </div>
          </div>
        </section>
        
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
          
          <motion.div 
            className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {skills.map((skill, index) => (
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
        </section>
      </main>
    </div>
  );
};

export default Skills;
