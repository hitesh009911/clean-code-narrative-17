
import { useState, useEffect, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Menu } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import Navigation from "@/components/Navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useProfileImage } from "@/hooks/useProfileImage";
import SplineFallback from "@/components/SplineFallback";
import { useMobileOptimization } from "@/hooks/use-mobile";

// Lazy load Spline component
const Spline = lazy(() => import('@splinetool/react-spline'));

const Index = () => {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [splineError, setSplineError] = useState(false);
  const profileImage = useProfileImage();
  const { isAuthenticated } = useAuth();
  const { shouldOptimize3D, isMobile } = useMobileOptimization();

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

  // Use a simpler scene URL for mobile
  const sceneUrl = shouldOptimize3D 
    ? "https://prod.spline.design/6sYLzNGZYtEyM0MG/scene.splinecode" // Lighter scene for mobile
    : "https://prod.spline.design/bcUN1YEwpO9lZsmS/scene.splinecode"; // Full scene for desktop

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
        <SplineFallback isError={splineError} isLoading={!splineLoaded && !splineError} sceneName="Home" />
        
        {!splineError && (
          <Suspense fallback={null}>
            <Spline 
              scene={sceneUrl} 
              onLoad={handleSplineLoad}
              onError={handleSplineError}
            />
          </Suspense>
        )}
      </div>
      
      {/* Navigation */}
      <Navigation />

      <main className="relative z-10 mx-auto max-w-screen-xl px-4 pt-16 sm:px-6 lg:px-8">
        {/* Hero/About Section */}
        <section 
          id="about" 
          className="flex min-h-[90vh] flex-col items-center justify-center py-12 md:flex-row md:items-center md:justify-between md:py-24"
        >
          <div className="max-w-md text-center md:text-left">
            <div className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary opacity-0 animate-fade-in">
              Developer
            </div>
            <h1 className="mb-4 text-3xl font-bold leading-tight md:text-5xl lg:text-6xl opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Hitesh<span className="text-primary">H</span>
            </h1>
            <p className="mb-6 text-base md:text-lg text-gray-600 dark:text-gray-300 opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              I craft elegant digital experiences with clean code and thoughtful design. Specializing in building modern, user-centric web applications that balance form and function.
            </p>
            <div className="space-x-2 md:space-x-4 opacity-0 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Button asChild className="rounded-full">
                <Link to="/projects">View My Work</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/contact">Get In Touch</Link>
              </Button>
            </div>
            
            {/* Social Links */}
            <div className="mt-6 md:mt-8 flex justify-center md:justify-start space-x-4 md:space-x-6 opacity-0 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <a href="https://github.com/hitesh009911" target="_blank" rel="noopener noreferrer" 
                 className="text-gray-500 hover:text-primary transition-colors">
                <Github className="w-5 h-5 md:w-6 md:h-6" />
              </a>
              <a href="https://www.linkedin.com/in/hitesh-h-582639215/" target="_blank" rel="noopener noreferrer" 
                 className="text-gray-500 hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5 md:w-6 md:h-6" />
              </a>
              <a href="mailto:hitumsyuru@gmail.com" 
                 className="text-gray-500 hover:text-primary transition-colors">
                <Mail className="w-5 h-5 md:w-6 md:h-6" />
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
