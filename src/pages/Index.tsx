
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Menu } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import Navigation from "@/components/Navigation";
import Spline from '@splinetool/react-spline';
import { useAuth } from "@/contexts/AuthContext";
import { useProfileImage } from "@/hooks/useProfileImage";
import SplineFallback from "@/components/SplineFallback";

const Index = () => {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [splineError, setSplineError] = useState(false);
  const profileImage = useProfileImage();
  const { isAuthenticated } = useAuth();

  // Initialize after mount to avoid hydration issues
  useEffect(() => {
    setMounted(true);
    
    // Set up intersection observer for sections
    const sections = document.querySelectorAll("section[id]");
    
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.5 });
    
    sections.forEach(section => {
      observer.observe(section);
    });
    
    return () => observer.disconnect();
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
    <div className="relative min-h-screen bg-background">
      {/* Spline Background */}
      <div className="fixed inset-0 z-0">
        {!splineError && (
          <Spline 
            scene="https://prod.spline.design/bcUN1YEwpO9lZsmS/scene.splinecode" 
            onLoad={handleSplineLoad}
            onError={handleSplineError}
          />
        )}
        <SplineFallback isError={splineError} isLoading={!splineLoaded && !splineError} />
      </div>
      
      {/* Navigation */}
      <Navigation />

      <main className="relative z-10 mx-auto max-w-screen-xl px-4 pt-16 sm:px-6 lg:px-8">
        {/* Hero/About Section */}
        <section 
          id="about" 
          className="flex min-h-[90vh] flex-col items-center justify-center py-16 md:flex-row md:items-center md:justify-between md:py-24"
        >
          <div className="max-w-md text-center md:text-left glassmorphic-card p-8 rounded-2xl">
            <div className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary opacity-0 animate-fade-in">
              Developer
            </div>
            <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Hitesh<span className="text-primary">H</span>
            </h1>
            <p className="mb-8 text-lg text-foreground/90 opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              I craft elegant digital experiences with clean code and thoughtful design. Specializing in building modern, user-centric web applications that balance form and function.
            </p>
            <div className="space-x-4 opacity-0 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Button asChild className="rounded-full">
                <Link to="/projects">View My Work</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/contact">Get In Touch</Link>
              </Button>
            </div>
            
            {/* Social Links */}
            <div className="mt-8 flex justify-center md:justify-start space-x-6 opacity-0 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <a href="https://github.com/hitesh009911" target="_blank" rel="noopener noreferrer" 
                 className="text-gray-500 hover:text-primary transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/in/hitesh-h-582639215/" target="_blank" rel="noopener noreferrer" 
                 className="text-gray-500 hover:text-primary transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="mailto:hitumsyuru@gmail.com" 
                 className="text-gray-500 hover:text-primary transition-colors">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
