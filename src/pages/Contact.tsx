
import { useState, useEffect } from "react";
import { ArrowLeft, Github, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Spline from '@splinetool/react-spline';

const Contact = () => {
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
            scene="https://prod.spline.design/Do8PURpymwu4rsFQ/scene.splinecode" 
            onLoad={handleSplineLoad}
            onError={handleSplineError}
          />
        )}
      </div>

      <Navigation />
      <main className="relative z-10 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 text-white">
        <div className="pt-8">
          <Button variant="ghost" asChild className="group mb-6">
            <Link to="/" className="flex items-center text-white hover:text-white/80">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>
          </Button>
        </div>

        <section className="py-8 md:py-16">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-6 md:text-4xl text-white">Get In Touch</h2>
            <p className="text-white mb-8">Have a project in mind or want to chat? Feel free to reach out.</p>
            
            <div className="inline-flex items-center justify-center rounded-full bg-white/10 px-4 py-2 text-white hover:bg-primary/20 transition-all">
              <Mail className="mr-2 h-4 w-4" />
              <a href="mailto:hitumsyuru@gmail.com" className="text-sm font-medium hover:text-primary transition-colors">hitumsyuru@gmail.com</a>
            </div>
          </div>
          
          <div className="flex justify-center space-x-4">
            <a 
              href="https://github.com/hitesh009911" 
              target="_blank"
              rel="noopener noreferrer" 
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-colors hover:bg-primary/20 hover:text-primary text-white hover:border-primary/30"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="https://www.linkedin.com/in/hitesh-h-582639215/" 
              target="_blank"
              rel="noopener noreferrer" 
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-colors hover:bg-primary/20 hover:text-primary text-white hover:border-primary/30"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;
