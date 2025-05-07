
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  
  // Handle scroll effect for navigation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={cn(
      "fixed left-0 right-0 top-4 z-50 mx-auto max-w-screen-lg px-4 transition-all duration-300",
      scrolled && "top-2"
    )}>
      <div className={cn(
        "mx-auto flex items-center justify-between rounded-full px-4 py-2 md:px-6 md:py-3 backdrop-blur-md border-0 shadow-md transition-all duration-300",
        scrolled ? "bg-background/90" : "bg-background/80",
      )}>
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold">
            Hitesh<span className="text-primary">H</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center space-x-6 md:flex">
          <Link 
            to="/skills" 
            className={cn(
              "nav-link text-sm",
              isActive("/skills") && "text-primary after:w-full"
            )}
          >
            About Me
          </Link>
          <Link 
            to="/projects" 
            className={cn(
              "nav-link text-sm",
              isActive("/projects") && "text-primary after:w-full"
            )}
          >
            Projects
          </Link>
          <Link 
            to="/contact" 
            className={cn(
              "nav-link text-sm",
              isActive("/contact") && "text-primary after:w-full"
            )}
          >
            Contact
          </Link>
          <ThemeToggle />
        </div>

        {/* Mobile Navigation Button */}
        <div className="flex items-center md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="ml-2"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="mt-2 rounded-xl border-0 bg-background/95 px-4 py-4 backdrop-blur-md shadow-md md:hidden">
          <div className="flex flex-col space-y-4">
            <Link
              to="/skills"
              className={cn(
                "text-sm py-2 px-3 rounded-lg transition-colors",
                isActive("/skills") ? "bg-primary/10 text-primary font-medium" : "hover:bg-secondary/50"
              )}
            >
              About Me
            </Link>
            <Link
              to="/projects"
              className={cn(
                "text-sm py-2 px-3 rounded-lg transition-colors",
                isActive("/projects") ? "bg-primary/10 text-primary font-medium" : "hover:bg-secondary/50"
              )}
            >
              Projects
            </Link>
            <Link
              to="/contact"
              className={cn(
                "text-sm py-2 px-3 rounded-lg transition-colors",
                isActive("/contact") ? "bg-primary/10 text-primary font-medium" : "hover:bg-secondary/50"
              )}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
