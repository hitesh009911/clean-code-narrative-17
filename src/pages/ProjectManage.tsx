import { useState, useEffect } from "react";
import { ArrowLeft, LogOut, Plus, Settings, Trash2, Key, ImageIcon, Github } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"; 
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useProjectsStore } from "@/stores/projectsStore";
import PasswordChangeDialog from "@/components/PasswordChangeDialog";
import UserImageChangeDialog from "@/components/UserImageChangeDialog";
import { useProfileImage } from "@/hooks/useProfileImage";

const ProjectManage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { projects, deleteProject, storeUploadedImage } = useProjectsStore();
  const { toast } = useToast();
  
  const [mounted, setMounted] = useState(false);
  const profileImage = useProfileImage();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      navigate('/');
    }
  }, [mounted, isAuthenticated, navigate]);

  if (!mounted || !isAuthenticated) return null;

  const handleDelete = (id: number, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteProject(id);
      toast({
        title: "Project Deleted",
        description: `"${title}" has been removed.`,
      });
    }
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
    navigate('/');
  };

  const handleProfileImageChange = (newImage: string) => {
    // Use our improved storage method
    storeUploadedImage("userProfileImage", newImage);
    
    // Also write directly to storage for immediate effect
    localStorage.setItem("userProfileImage", newImage);
    sessionStorage.setItem("userProfileImage", newImage);
    
    toast({
      title: "Profile Image Updated",
      description: "Your profile image has been updated successfully.",
    });
    
    // Force a refresh to ensure the image updates everywhere
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new Event('storage-local'));
  };

  // Default image is now the uploaded profile image
  const defaultImage = "/lovable-uploads/0b1d6edc-9ac8-441a-8901-f8943162486d.png";

  // Use the profile image or default if not available
  const displayImage = profileImage || defaultImage;

  return (
    <div className="relative min-h-screen bg-background pt-16">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild className="group mb-2">
              <Link to="/projects" className="flex items-center text-muted-foreground hover:text-foreground">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to Projects
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Project Management</h1>
              <div className="flex items-center gap-2 mt-2">
                <Avatar className="h-10 w-10 border-2 border-primary">
                  <AvatarImage 
                    src={displayImage} 
                    alt="Profile" 
                    onError={(e) => {
                      // If image fails to load, use the default
                      const target = e.target as HTMLImageElement;
                      if (target.src !== defaultImage) {
                        target.src = defaultImage;
                      }
                    }}
                  />
                  <AvatarFallback>👤</AvatarFallback>
                </Avatar>
                <span className="text-sm text-muted-foreground">Admin Dashboard</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <UserImageChangeDialog 
              currentImage={displayImage}
              onImageChange={handleProfileImageChange}
              trigger={
                <Button variant="outline" className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  Change Profile Image
                </Button>
              }
            />
            
            <PasswordChangeDialog 
              trigger={
                <Button variant="outline" className="flex items-center gap-2">
                  <Key className="h-4 w-4" />
                  Change Password
                </Button>
              }
            />
            
            <Button
              onClick={handleLogout}
              variant="outline"
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
            
            <Button asChild>
              <Link to="/projects/new">
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="bg-card/60 backdrop-blur-sm rounded-xl border border-border/50 shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Your Projects</h2>
            
            {projects.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No projects found</p>
                <Button asChild>
                  <Link to="/projects/new">Create Your First Project</Link>
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/30">
                      <th className="px-4 py-3 text-left">ID</th>
                      <th className="px-4 py-3 text-left">Title</th>
                      <th className="px-4 py-3 text-left">Tags</th>
                      <th className="px-4 py-3 text-left">GitHub</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map(project => (
                      <tr key={project.id} className="border-b border-border/10 hover:bg-muted/50">
                        <td className="px-4 py-3">{project.id}</td>
                        <td className="px-4 py-3 font-medium">{project.title}</td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            {project.tags.map(tag => (
                              <span key={tag} className="rounded-full bg-secondary/50 px-2 py-0.5 text-xs">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          {project.githubUrl ? (
                            <a 
                              href={project.githubUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center text-sm text-primary hover:underline"
                            >
                              <Github className="h-3 w-3 mr-1" />
                              Repository
                            </a>
                          ) : (
                            <span className="text-muted-foreground text-sm">-</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" asChild>
                              <Link to={`/projects/${project.id}`}>
                                View
                              </Link>
                            </Button>
                            <Button variant="outline" size="sm" asChild>
                              <Link to={`/projects/edit/${project.id}`}>
                                <Settings className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleDelete(project.id, project.title)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectManage;
