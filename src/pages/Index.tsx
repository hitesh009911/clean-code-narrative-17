
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Menu, Twitter, ImageIcon } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import Navigation from "@/components/Navigation";
import Spline from '@splinetool/react-spline';
import UserImageChangeDialog from "@/components/UserImageChangeDialog";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Index = () => {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [splineError, setSplineError] = useState(false);
  const [profileImage, setProfileImage] = useState<string>("");
  const { isAuthenticated } = useAuth();

  // Initialize after mount to avoid hydration issues
  useEffect(() => {
    setMounted(true);
    
    // Load profile image from localStorage if available
    const savedImage = localStorage.getItem("userProfileImage");
    if (savedImage) {
      setProfileImage(savedImage);
    }
    
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

  const handleProfileImageChange = (newImage: string) => {
    setProfileImage(newImage);
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
      </div>
      
      {/* Navigation */}
      <Navigation />

      <main className="relative z-10 mx-auto max-w-screen-xl px-4 pt-16 sm:px-6 lg:px-8">
        {/* Hero/About Section */}
        <section 
          id="about" 
          className="flex min-h-[90vh] flex-col items-center justify-center py-16 md:flex-row md:items-center md:justify-between md:py-24"
        >
          <div className="max-w-md text-center md:text-left">
            <div className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary opacity-0 animate-fade-in">
              Frontend Developer
            </div>
            <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Hitesh H
            </h1>
            <p className="mb-8 text-lg text-gray-600 dark:text-gray-300 opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              I craft elegant digital experiences with clean code and thoughtful design. Specializing in building modern, user-centric web applications that balance form and function.
            </p>
            <div className="space-x-4 opacity-0 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Button asChild className="rounded-full">
                <a href="/projects">View My Work</a>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <a href="/contact">Get In Touch</a>
              </Button>
            </div>
          </div>
          
          {/* Profile Image */}
          <div className="mt-12 md:mt-0 opacity-0 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="relative">
              <Avatar className="w-36 h-36 md:w-48 md:h-48 ring-4 ring-background shadow-xl">
                <AvatarImage 
                  src={profileImage || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=400&auto=format&fit=crop"} 
                  alt="Profile Image"
                  className="object-cover"
                />
                <AvatarFallback>HH</AvatarFallback>
              </Avatar>
              
              {isAuthenticated && (
                <UserImageChangeDialog 
                  currentImage={profileImage || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=400&auto=format&fit=crop"}
                  onImageChange={handleProfileImageChange}
                  trigger={
                    <Button 
                      size="sm"
                      className="absolute bottom-0 right-0 rounded-full"
                      variant="secondary"
                    >
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                  }
                />
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
