
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export type ProjectFormData = {
  id?: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
};

type ProjectFormProps = {
  initialData?: ProjectFormData;
  onSubmit: (data: ProjectFormData) => void;
  isEdit?: boolean;
};

const ProjectForm: React.FC<ProjectFormProps> = ({ 
  initialData = { title: '', description: '', image: '', tags: [] },
  onSubmit,
  isEdit = false
}) => {
  const [formData, setFormData] = useState<ProjectFormData>(initialData);
  const [tagsInput, setTagsInput] = useState(initialData.tags.join(', '));
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagsInput(e.target.value);
    // Convert comma-separated string to array, trimming whitespace
    const tagsArray = e.target.value.split(',').map(tag => tag.trim()).filter(Boolean);
    setFormData(prev => ({ ...prev, tags: tagsArray }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validate form
    if (!formData.title || !formData.description || !formData.image || formData.tags.length === 0) {
      toast({
        title: "Form Error",
        description: "All fields are required",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      onSubmit(formData);
      setIsLoading(false);
      
      toast({
        title: isEdit ? "Project Updated" : "Project Created",
        description: `${formData.title} ${isEdit ? 'updated' : 'added'} successfully.`,
      });
    }, 800);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">Project Title</label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter project title"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium">Description</label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter project description"
            rows={4}
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="image" className="text-sm font-medium">Image URL</label>
          <Input
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            required
          />
          {formData.image && (
            <div className="mt-2 rounded-md overflow-hidden aspect-video w-full max-w-md mx-auto">
              <img 
                src={formData.image} 
                alt="Project preview" 
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1064&auto=format&fit=crop'; 
                  toast({
                    title: "Image Error",
                    description: "Could not load the provided image URL. Using placeholder instead.",
                    variant: "destructive",
                  });
                }}
              />
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="tags" className="text-sm font-medium">Tags (comma-separated)</label>
          <Input
            id="tags"
            name="tags"
            value={tagsInput}
            onChange={handleTagsChange}
            placeholder="React, TypeScript, Tailwind"
            required
          />
          {formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags.map((tag, index) => (
                <span key={index} className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (isEdit ? "Updating..." : "Creating...") : (isEdit ? "Update Project" : "Create Project")}
        </Button>
      </div>
    </form>
  );
};

export default ProjectForm;
