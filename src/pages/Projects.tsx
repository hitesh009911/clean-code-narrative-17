
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Spline from '@splinetool/react-spline';

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

const Projects = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
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
            scene="https://prod.spline.design/C8o-RCpz0hHQdBa8/scene.splinecode" 
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

        <section className="py-8 md:py-16">
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
                    onLoad={() => setImageLoaded(true)}
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
      </main>
    </div>
  );
};

export default Projects;
