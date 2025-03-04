
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronDown, Code, FileCode, Github, Linkedin, Mail, MessageSquare, Monitor, Moon, Sun, Twitter } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const projects = [
  {
    id: 1,
    title: "Personal Finance Dashboard",
    description: "An elegant financial tracking application with data visualization and budgeting tools.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    tags: ["React", "TypeScript", "D3.js"],
  },
  {
    id: 2,
    title: "E-commerce Platform",
    description: "A minimalist shopping experience with intuitive product browsing and checkout flow.",
    image: "https://images.unsplash.com/photo-1524055988636-436cfa46e59e?q=80&w=2035&auto=format&fit=crop",
    tags: ["Next.js", "Tailwind CSS", "Stripe"],
  },
  {
    id: 3,
    title: "Content Management System",
    description: "A clean, user-friendly CMS built for writers and content creators with markdown support.",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop",
    tags: ["Node.js", "MongoDB", "Express"],
  },
];

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
            <span className="text-primary">Alex</span> Chen
          </div>
          <nav className="hidden md:flex md:items-center">
            <ul className="flex space-x-8">
              {["About", "Skills", "Projects", "Contact"].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    className={cn(
                      "nav-link px-1 py-2 text-sm font-medium transition-colors",
                      activeSection === item.toLowerCase() 
                        ? "text-primary" 
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item}
                  </a>
                </li>
              ))}
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
                <a href="#projects">View My Work</a>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <a href="#contact">Get In Touch</a>
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
          <a href="#skills" className="flex flex-col items-center text-sm text-muted-foreground transition-colors hover:text-foreground">
            <span className="mb-2">Scroll to explore</span>
            <ChevronDown className="h-6 w-6 animate-bounce" />
          </a>
        </div>

        {/* Skills Section */}
        <section id="skills" className="py-16 md:py-24">
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

        {/* Projects Section */}
        <section id="projects" className="py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6 md:text-4xl">Featured Projects</h2>
            <p className="text-muted-foreground">A selection of my recent work, showcasing my approach to problem-solving and design.</p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <div 
                key={project.id} 
                className="project-card group rounded-xl border border-border bg-card overflow-hidden"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="aspect-video w-full overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-semibold group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 md:py-24">
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

      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Alex Chen. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Back to top
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

const Menu = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="4" x2="20" y1="12" y2="12"></line>
    <line x1="4" x2="20" y1="6" y2="6"></line>
    <line x1="4" x2="20" y1="18" y2="18"></line>
  </svg>
);
