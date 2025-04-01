
import { useState, useEffect } from "react";
import { ArrowLeft, Eye } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import ProjectForm, { ProjectFormData } from "@/components/ProjectForm";
import { useAuth } from "@/contexts/AuthContext";
import { useProjectsStore } from "@/stores/projectsStore";
import { useToast } from "@/hooks/use-toast";

const ProjectEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { getProjectById, updateProject } = useProjectsStore();
  const { toast } = useToast();
  
  const [mounted, setMounted] = useState(false);
  const project = id ? getProjectById(Number(id)) : null;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      if (!isAuthenticated) {
        navigate('/');
      } else if (id && !project) {
        toast({
          title: "Project not found",
          description: "The project you're trying to edit doesn't exist.",
          variant: "destructive"
        });
        navigate('/projects/manage');
      }
    }
  }, [mounted, isAuthenticated, project, navigate, id, toast]);

  if (!mounted || !isAuthenticated || !project) return null;

  const handleSubmit = (data: ProjectFormData) => {
    if (id) {
      updateProject(Number(id), data);
      toast({
        title: "Project Updated",
        description: "Your project has been updated successfully."
      });
      // Changed navigation from project detail to project management
      navigate('/projects/manage');
    }
  };

  return (
    <div className="relative min-h-screen bg-background pt-16">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" asChild className="group mb-2">
            <Link to={`/projects/${id}`} className="flex items-center text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Project
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Edit Project</h1>
        </div>
        
        <div className="flex justify-end mb-4">
          <Button variant="outline" asChild>
            <Link to={`/projects/${id}`} className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              View Project
            </Link>
          </Button>
        </div>
        
        <div className="bg-card/60 backdrop-blur-sm rounded-xl border border-border/50 shadow-lg p-6">
          <ProjectForm 
            initialData={project} 
            onSubmit={handleSubmit} 
            isEdit={true} 
          />
        </div>
      </main>
    </div>
  );
};

export default ProjectEdit;
