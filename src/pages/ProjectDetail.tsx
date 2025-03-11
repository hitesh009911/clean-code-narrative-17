
import { useState, useEffect } from "react";
import { ArrowLeft, Edit, ExternalLink } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Spline from '@splinetool/react-spline';
import { useAuth } from "@/contexts/AuthContext";
import { useProjectsStore } from "@/stores/projectsStore";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { getProjectById } = useProjectsStore();
  
  const [mounted, setMounted] = useState(false);
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [splineError, setSplineError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const project = getProjectById(Number(id));

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !project) {
      navigate('/projects');
    }
  }, [mounted, project, navigate]);

  if (!mounted || !project) return null;

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
            <Link to="/projects" className="flex items-center text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Projects
            </Link>
          </Button>
        </div>

        <article className="max-w-3xl mx-auto bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 shadow-xl overflow-hidden">
          <div className="aspect-video w-full overflow-hidden">
            <img 
              src={project.image} 
              alt={project.title}
              className="h-full w-full object-cover"
              onLoad={() => setImageLoaded(true)}
            />
          </div>
          
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <h1 className="text-3xl font-bold">{project.title}</h1>
              {isAuthenticated && (
                <Button variant="outline" size="sm" asChild className="ml-4">
                  <Link to={`/projects/edit/${project.id}`}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Link>
                </Button>
              )}
            </div>
            
            <p className="text-lg text-muted-foreground mb-8">{project.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map(tag => (
                <span key={tag} className="rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="flex justify-between items-center pt-6 border-t border-border/30">
              <Button variant="outline" asChild>
                <Link to="/projects">
                  View All Projects
                </Link>
              </Button>
              
              <Button className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                <span>Live Demo</span>
              </Button>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
};

export default ProjectDetail;
