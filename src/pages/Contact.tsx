
import { ArrowLeft, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";

const Contact = () => {
  return (
    <div className="relative min-h-screen bg-background pt-16">
      <Navigation />
      <main className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="pt-8">
          <Button variant="ghost" asChild className="group mb-6">
            <Link to="/" className="flex items-center text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>
          </Button>
        </div>

        <section className="py-8 md:py-16">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-6 md:text-4xl">Get In Touch</h2>
            <p className="text-muted-foreground mb-8">Have a project in mind or want to chat? Feel free to reach out.</p>
            
            <div className="inline-flex items-center justify-center rounded-full bg-primary/10 px-4 py-2 text-primary">
              <Mail className="mr-2 h-4 w-4" />
              <a href="mailto:hello@alexchen.dev" className="text-sm font-medium">hello@alexchen.dev</a>
            </div>
          </div>
          
          <div className="flex justify-center space-x-4">
            <a 
              href="https://github.com" 
              target="_blank"
              rel="noopener noreferrer" 
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-secondary hover:text-primary"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank"
              rel="noopener noreferrer" 
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-secondary hover:text-primary"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank"
              rel="noopener noreferrer" 
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-secondary hover:text-primary"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;
