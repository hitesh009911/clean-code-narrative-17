
import { useState, useEffect, lazy, Suspense } from "react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { motion } from "framer-motion";
import { useProjectsStore } from "@/stores/projectsStore";
import SplineFallback from "@/components/SplineFallback";
import { useMobileOptimization } from "@/hooks/use-mobile";

// Lazy load Spline component to reduce initial load time
const Spline = lazy(() => import('@splinetool/react-spline'));

const FALLBACK_SCENE_URLS = {
  desktop: "https://prod.spline.design/JDyoDTFfEZbrAuAL/scene.splinecode",
  mobile: "https://prod.spline.design/r3VfM6kqKBhA4ltJ/scene.splinecode"
};

const Projects = () => {
  const { projects } = useProjectsStore();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [splineError, setSplineError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const { shouldOptimize3D, reduceAnimations } = useMobileOptimization();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Use fallback scenes that are known to work
  const sceneUrl = shouldOptimize3D 
    ? FALLBACK_SCENE_URLS.mobile
    : FALLBACK_SCENE_URLS.desktop;

  const handleSplineLoad = () => {
    console.log("Spline scene loaded");
    setSplineLoaded(true);
  };

  const handleSplineError = (error) => {
    console.error("Spline error:", error);
    setSplineError(true);
    
    // Avoid infinite retry loops
    if (retryCount < 2) {
      setTimeout(() => {
        setSplineError(false);
        setRetryCount(prev => prev + 1);
      }, 1000);
    }
  };

  // Simplified animation props for mobile
  const getAnimationProps = (index) => {
    if (reduceAnimations) {
      return { 
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.3 }
      };
    }
    
    return {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: 0.1 * index, duration: 0.5 },
      whileHover: { y: -5 }
    };
  };

  return (
    <div className="relative min-h-screen bg-background pt-16">
      {/* Spline Background */}
      <div className="fixed inset-0 z-0">
        <SplineFallback 
          isError={splineError} 
          isLoading={!splineLoaded && !splineError} 
          sceneName="Projects" 
          hideLoading={retryCount > 0}
        />
        
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

        <section className="py-6 md:py-16">
          <div className="max-w-3xl mx-auto text-center mb-10 md:mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-3xl font-bold mb-4 md:mb-6"
            >
              Featured Projects
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-muted-foreground text-sm md:text-base"
            >
              A selection of my recent work, showcasing my approach to problem-solving and design.
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="grid gap-4 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          >
            {projects.map((project, index) => (
              <motion.div 
                key={project.id} 
                className="project-card group rounded-xl border border-border bg-card/60 backdrop-blur-sm overflow-hidden hover:shadow-xl transition-all duration-300"
                {...getAnimationProps(index)}
              >
                <Link to={`/projects/${project.id}`} className="block">
                  <div className="aspect-video w-full overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      onLoad={() => setImageLoaded(true)}
                    />
                  </div>
                  <div className="p-4 md:p-6">
                    <h3 className="mb-2 text-lg md:text-xl font-semibold group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="mb-4 text-xs md:text-sm text-muted-foreground">
                      {project.description.length > 100 
                        ? `${project.description.substring(0, 100)}...` 
                        : project.description}
                    </p>
                    <div className="flex flex-wrap gap-1 md:gap-2">
                      {project.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="rounded-full bg-secondary/50 px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="rounded-full bg-secondary/30 px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>
                    <div className="mt-4 pt-4 border-t border-border/30 flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">View details</span>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default Projects;
