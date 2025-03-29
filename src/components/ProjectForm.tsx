import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Image, ImagePlus, Star } from 'lucide-react';

export type ProjectFormData = {
  id?: number;
  title: string;
  description: string;
  image: string;
  githubUrl?: string;
  tags: string[];
};

type ProjectFormProps = {
  initialData?: ProjectFormData;
  onSubmit: (data: ProjectFormData) => void;
  isEdit?: boolean;
};

const ProjectForm: React.FC<ProjectFormProps> = ({ 
  initialData = { title: '', description: '', image: '', githubUrl: '', tags: [] },
  onSubmit,
  isEdit = false
}) => {
  const [formData, setFormData] = useState<ProjectFormData>(initialData);
  const [tagsInput, setTagsInput] = useState(initialData.tags.join(', '));
  const [isLoading, setIsLoading] = useState(false);
  const [useCustomImage, setUseCustomImage] = useState(!!initialData.image);
  const [profileImagePreview, setProfileImagePreview] = useState(initialData.image || '');
  const imageInputRef = useRef<HTMLInputElement>(null);
  
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

  const handleImageClick = () => {
    imageInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setProfileImagePreview(result);
        setFormData(prev => ({ ...prev, image: result }));
      };
      reader.readAsDataURL(file);
    }
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
          <div className="flex items-center justify-between">
            <label htmlFor="image" className="text-sm font-medium">Project Image</label>
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={handleImageClick}
              className="flex items-center gap-2"
            >
              <ImagePlus className="h-4 w-4" />
              {profileImagePreview ? 'Change Image' : 'Upload Image'}
            </Button>
            <input 
              type="file" 
              accept="image/*" 
              ref={imageInputRef} 
              onChange={handleImageChange} 
              className="hidden" 
            />
          </div>
          
          {useCustomImage ? (
            <>
              <div className="group relative mt-2 rounded-md overflow-hidden aspect-video w-full max-w-md mx-auto">
                <img 
                  src={profileImagePreview || formData.image} 
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
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={handleImageClick}
                    className="mr-2"
                  >
                    Change
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      setUseCustomImage(false);
                      setFormData(prev => ({ ...prev, image: '' }));
                      setProfileImagePreview('');
                    }}
                  >
                    Remove
                  </Button>
                </div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-muted-foreground">Hover over image to edit</span>
                <Input
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="Or enter image URL directly"
                  className="max-w-xs text-xs"
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-md p-8 mt-2 cursor-pointer hover:bg-secondary/20 transition-colors"
                   onClick={handleImageClick}>
                <Image className="h-12 w-12 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Click to upload project image</p>
                <p className="text-xs text-muted-foreground mt-1">PNG, JPG or GIF, up to 10MB</p>
              </div>
              <Input
                id="image"
                name="image"
                value={formData.image}
                onChange={(e) => {
                  handleChange(e);
                  if (e.target.value) {
                    setUseCustomImage(true);
                    setProfileImagePreview(e.target.value);
                  }
                }}
                placeholder="Or enter image URL"
                className="mt-2"
              />
            </>
          )}
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <label htmlFor="githubUrl" className="text-sm font-medium">GitHub URL</label>
            <span className="text-muted-foreground text-xs">(Optional)</span>
            <Star className="h-4 w-4 text-amber-400" />
          </div>
          <Input
            id="githubUrl"
            name="githubUrl"
            value={formData.githubUrl || ''}
            onChange={handleChange}
            placeholder="https://github.com/username/repository"
          />
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
