
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import ProjectForm, { ProjectFormData } from "@/components/ProjectForm";
import { useAuth } from "@/contexts/AuthContext";
import { useProjectsStore } from "@/stores/projectsStore";

const ProjectNew = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addProject } = useProjectsStore();
  
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      navigate('/');
    }
  }, [mounted, isAuthenticated, navigate]);

  if (!mounted || !isAuthenticated) return null;

  const handleSubmit = (data: ProjectFormData) => {
    addProject(data);
    navigate('/projects/manage');
  };

  return (
    <div className="relative min-h-screen bg-background pt-16">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" asChild className="group mb-2">
            <Link to="/projects/manage" className="flex items-center text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Management
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Create New Project</h1>
        </div>
        
        <div className="bg-card/60 backdrop-blur-sm rounded-xl border border-border/50 shadow-lg p-6">
          <ProjectForm onSubmit={handleSubmit} />
        </div>
      </main>
    </div>
  );
};

export default ProjectNew;
