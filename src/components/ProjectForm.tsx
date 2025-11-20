import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Image, ImagePlus, Star, FileText } from 'lucide-react';

export type ProjectFormData = {
  id?: string;
  title: string;
  description: string;
  image: string;
  github_url?: string;
  tags: string[];
};

type ProjectFormProps = {
  initialData?: ProjectFormData;
  onSubmit: (data: ProjectFormData) => void;
  isEdit?: boolean;
};

const ProjectForm: React.FC<ProjectFormProps> = ({ 
  initialData = { title: '', description: '', image: '', github_url: '', tags: [] },
  onSubmit,
  isEdit = false
}) => {
  const [formData, setFormData] = useState<ProjectFormData>(initialData);
  const [tagsInput, setTagsInput] = useState(initialData.tags.join(', '));
  const [isLoading, setIsLoading] = useState(false);
  const [useCustomImage, setUseCustomImage] = useState(!!initialData.image);
  const [profileImagePreview, setProfileImagePreview] = useState(initialData.image || '');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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
    if (!formData.title || !formData.description || formData.tags.length === 0) {
      toast({
        title: "Form Error",
        description: "Title, description, and tags are required",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // If we have an image preview but no image in formData, update formData
    if (profileImagePreview && !formData.image) {
      setFormData(prev => ({ ...prev, image: profileImagePreview }));
    }

    // Ensure we have an image
    if (!profileImagePreview && !formData.image) {
      toast({
        title: "Form Error",
        description: "Project image is required",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Ensure image is in the data before submitting
    const finalFormData = {
      ...formData,
      image: profileImagePreview || formData.image
    };
    
    onSubmit(finalFormData);
    setIsLoading(false);
    
    toast({
      title: isEdit ? "Project Updated" : "Project Created",
      description: isEdit ? "Your project has been updated successfully." : "Your project has been created successfully.",
    });
  };

  const handleImageClick = () => {
    imageInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Maximum file size is 10MB",
          variant: "destructive",
        });
        return;
      }
      
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setProfileImagePreview(result);
        setFormData(prev => ({ ...prev, image: result }));
      };
      reader.readAsDataURL(file);
      setUseCustomImage(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium flex items-center gap-1">
            Project Title <Star className="h-3 w-3 text-amber-400" fill="currentColor" />
          </label>
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
          <label htmlFor="description" className="text-sm font-medium flex items-center gap-1">
            Description <Star className="h-3 w-3 text-amber-400" fill="currentColor" />
          </label>
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
            <label htmlFor="image" className="text-sm font-medium flex items-center gap-1">
              Project Image <Star className="h-3 w-3 text-amber-400" fill="currentColor" />
            </label>
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
                      setSelectedFile(null);
                    }}
                  >
                    Remove
                  </Button>
                </div>
              </div>
              {selectedFile && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2 p-2 border rounded-md bg-secondary/10">
                  <FileText className="h-4 w-4" />
                  <span>
                    {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
                  </span>
                </div>
              )}
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
          </div>
          <Input
            id="github_url"
            name="github_url"
            value={formData.github_url || ''}
            onChange={handleChange}
            placeholder="https://github.com/username/repository"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="tags" className="text-sm font-medium flex items-center gap-1">
            Tags (comma-separated) <Star className="h-3 w-3 text-amber-400" fill="currentColor" />
          </label>
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
