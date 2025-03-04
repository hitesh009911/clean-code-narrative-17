
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronDown, Github, Linkedin, Mail, Menu, Twitter } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const Index = () => {
  const [mounted, setMounted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState("");

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

  return (
    <div className="relative min-h-screen bg-background">
      {/* Navigation */}
      <header className="fixed top-0 z-50 w-full border-b border-gray-100 dark:border-gray-800 bg-background/80 backdrop-blur transition-all">
        <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="text-lg font-semibold">
            <Link to="/" className="text-primary">
              <span className="text-primary">Alex</span> Chen
            </Link>
          </div>
          <nav className="hidden md:flex md:items-center">
            <ul className="flex space-x-8">
              <li>
                <Link 
                  to="/" 
                  className={cn(
                    "nav-link px-1 py-2 text-sm font-medium transition-colors",
                    activeSection === "about" 
                      ? "text-primary" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  to="/skills" 
                  className="nav-link px-1 py-2 text-sm font-medium transition-colors text-muted-foreground hover:text-foreground"
                >
                  Skills
                </Link>
              </li>
              <li>
                <Link 
                  to="/projects" 
                  className="nav-link px-1 py-2 text-sm font-medium transition-colors text-muted-foreground hover:text-foreground"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="nav-link px-1 py-2 text-sm font-medium transition-colors text-muted-foreground hover:text-foreground"
                >
                  Contact
                </Link>
              </li>
            </ul>
            <ThemeToggle />
          </nav>
          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <Button variant="ghost" size="sm">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-screen-xl px-4 pt-16 sm:px-6 lg:px-8">
        {/* Hero/About Section */}
        <section 
          id="about" 
          className="flex min-h-[90vh] flex-col items-center justify-center py-16 md:flex-row md:items-center md:justify-between md:py-24"
        >
          <div className="mb-10 max-w-md text-center md:mb-0 md:max-w-md md:text-left">
            <div className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary opacity-0 animate-fade-in">
              Frontend Developer
            </div>
            <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Alex Chen
            </h1>
            <p className="mb-8 text-lg text-gray-600 opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
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
          </div>
          <div className="relative h-64 w-64 overflow-hidden rounded-full border border-gray-100 shadow-lg transition-all md:h-80 md:w-80 opacity-0 animate-fade-in-delayed">
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop"
              alt="Alex Chen - Developer"
              className={cn(
                "h-full w-full object-cover transition-all",
                imageLoaded ? "animate-image-load" : "blur-md scale-105"
              )}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
        </section>

        {/* Scroll indicator */}
        <div className="flex justify-center mb-12 opacity-0 animate-fade-in-delayed">
          <Link to="/skills" className="flex flex-col items-center text-sm text-muted-foreground transition-colors hover:text-foreground">
            <span className="mb-2">Scroll to explore</span>
            <ChevronDown className="h-6 w-6 animate-bounce" />
          </Link>
        </div>
      </main>

      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Alex Chen. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Back to top
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
