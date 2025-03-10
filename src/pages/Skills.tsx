
import { useState, useEffect } from "react";
import { ArrowLeft, Code, FileCode, Monitor } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Spline from '@splinetool/react-spline';

const skills = [
  { name: "JavaScript/TypeScript", icon: <Code className="h-4 w-4" /> },
  { name: "React & Next.js", icon: <FileCode className="h-4 w-4" /> },
  { name: "UI/UX Design", icon: <Monitor className="h-4 w-4" /> },
  { name: "Node.js", icon: <Code className="h-4 w-4" /> },
  { name: "RESTful APIs", icon: <Code className="h-4 w-4" /> },
  { name: "PostgreSQL", icon: <FileCode className="h-4 w-4" /> },
  { name: "Tailwind CSS", icon: <FileCode className="h-4 w-4" /> },
  { name: "Git/Version Control", icon: <Code className="h-4 w-4" /> },
];

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
            <h2 className="text-3xl font-bold mb-6 md:text-4xl">Technical Expertise</h2>
            <p className="text-muted-foreground">A collection of technologies I work with to bring digital products to life.</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {skills.map((skill, index) => (
              <div 
                key={skill.name} 
                className="skill-tag flex flex-col items-center rounded-lg border border-border bg-card p-6 text-center shadow-sm"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  {skill.icon}
                </div>
                <h3 className="text-sm font-medium">{skill.name}</h3>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Skills;
