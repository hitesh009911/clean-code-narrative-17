
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Image, Upload, Link as LinkIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface UserImageChangeDialogProps {
  currentImage: string;
  onImageChange: (image: string) => void;
  trigger: React.ReactNode;
}

const UserImageChangeDialog: React.FC<UserImageChangeDialogProps> = ({ 
  currentImage, 
  onImageChange, 
  trigger 
}) => {
  const [tabValue, setTabValue] = useState("upload");
  const [imageUrl, setImageUrl] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Maximum file size is 5MB",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsLoading(true);
    
    try {
      let newImage = currentImage;
      
      if (tabValue === "upload" && previewImage) {
        newImage = previewImage;
      } else if (tabValue === "url" && imageUrl) {
        newImage = imageUrl;
      } else {
        toast({
          title: "No changes",
          description: "No new image was selected",
        });
        setIsLoading(false);
        return;
      }
      
      // Save the image URL or base64 data to localStorage
      localStorage.setItem("userProfileImage", newImage);
      
      // Dispatch both events to ensure all components are updated
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new Event('storage-local'));
      
      // Update parent component
      onImageChange(newImage);
      
      toast({
        title: "Success",
        description: "Profile image updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile image",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUrlInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
    setPreviewImage(e.target.value);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Change Profile Image</DialogTitle>
        </DialogHeader>
        
        <Tabs value={tabValue} onValueChange={setTabValue} className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload Image
            </TabsTrigger>
            <TabsTrigger value="url" className="flex items-center gap-2">
              <LinkIcon className="h-4 w-4" />
              Image URL
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="space-y-4 py-4">
            <div className="space-y-2">
              <div
                className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg p-6 cursor-pointer hover:bg-secondary/20 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                {previewImage ? (
                  <div className="relative w-full max-w-xs aspect-square">
                    <img 
                      src={previewImage} 
                      alt="Preview" 
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                ) : (
                  <>
                    <Image className="h-12 w-12 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Click to upload image</p>
                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG or GIF, up to 5MB</p>
                  </>
                )}
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleUpload} 
                className="hidden"
                accept="image/*" 
              />
            </div>
          </TabsContent>
          
          <TabsContent value="url" className="space-y-4 py-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input 
                  id="imageUrl" 
                  placeholder="https://example.com/image.jpg" 
                  value={imageUrl}
                  onChange={handleUrlInputChange}
                />
              </div>
              
              {previewImage && (
                <div className="border rounded-md p-2">
                  <Label className="text-xs text-muted-foreground mb-2">Preview</Label>
                  <div className="relative w-full max-w-xs mx-auto aspect-square">
                    <img 
                      src={previewImage} 
                      alt="Preview" 
                      className="w-full h-full object-cover rounded-md"
                      onError={() => {
                        setPreviewImage(null);
                        toast({
                          title: "Invalid Image URL",
                          description: "The provided URL does not contain a valid image",
                          variant: "destructive",
                        });
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="flex justify-between sm:justify-between">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSave} disabled={isLoading || !previewImage}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserImageChangeDialog;
