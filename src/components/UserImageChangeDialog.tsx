
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Image, Upload } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProjectsStore } from "@/stores/projectsStore";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

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
  const { storeUploadedImage } = useProjectsStore();
  const [tabValue, setTabValue] = useState("upload");
  const [imageUrl, setImageUrl] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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

      setSelectedFile(file);
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
        if (selectedFile) {
          // In a real app with backend, you would upload the file here
          // For now, we're using the base64 representation
          newImage = previewImage;
          
          // Store file information for demonstration
          const fileInfo = {
            name: selectedFile.name,
            type: selectedFile.type,
            size: selectedFile.size,
            lastModified: selectedFile.lastModified,
            uploadedAt: new Date().toISOString()
          };
          
          // Store file info using our central store
          storeUploadedImage("userProfileImageInfo", JSON.stringify(fileInfo));
        }
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
      
      // Store the image using our central store
      storeUploadedImage("userProfileImage", newImage); 
      
      // Dispatch events to ensure all components are updated
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
  
  // Reset the dialog state when it opens
  const handleOpenChange = (open: boolean) => {
    if (open) {
      setPreviewImage(null);
      setImageUrl("");
      setTabValue("upload");
      setSelectedFile(null);
    }
  };

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span>Change Profile Image</span>
            <Avatar className="h-8 w-8">
              <AvatarImage src={currentImage} alt="Current profile" />
              <AvatarFallback>👤</AvatarFallback>
            </Avatar>
          </DialogTitle>
        </DialogHeader>
        
        <Tabs value={tabValue} onValueChange={setTabValue} className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload Image
            </TabsTrigger>
            <TabsTrigger value="url" className="flex items-center gap-2">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                <path d="M8.51194 3.00541C9.18829 2.54594 10.0435 2.53694 10.6788 2.95419C10.8231 3.04893 10.9771 3.1993 11.389 3.61119C11.8009 4.02307 11.9513 4.17714 12.046 4.32141C12.4633 4.95675 12.4543 5.81192 11.9948 6.48827C11.8899 6.64264 11.7276 6.80534 11.3006 7.23239L10.6819 7.85109C10.4867 8.04632 10.4867 8.36298 10.6819 8.55821C10.8772 8.75344 11.1938 8.75344 11.3891 8.55821L12.0077 7.93951L12.0507 7.89647C12.4203 7.52691 12.6568 7.2854 12.822 7.0502C13.4972 6.05623 13.5321 4.76252 12.8819 3.77248C12.7233 3.53102 12.4922 3.30001 12.1408 2.94871L12.0961 2.90408L12.0515 2.85942C11.7002 2.50807 11.4692 2.27697 11.2277 2.11832C10.2377 1.46813 8.94398 1.50299 7.95001 2.17822C7.71481 2.34336 7.47331 2.57996 7.10374 2.94953L7.06071 2.99257L6.44201 3.61127C6.24678 3.8065 6.24678 4.12316 6.44201 4.31839C6.63724 4.51362 6.9539 4.51362 7.14913 4.31839L7.76783 3.69969C8.19489 3.27263 8.35758 3.11027 8.51194 3.00541ZM4.31796 7.14984C4.51319 6.95461 4.51319 6.63795 4.31796 6.44272C4.12273 6.24749 3.80607 6.24749 3.61084 6.44272L2.99214 7.06142C2.56508 7.48848 2.40239 7.65085 2.24803 7.7557C1.57168 8.21517 0.716471 8.22417 0.0811358 7.80692C-0.0631187 7.71218 -0.217218 7.56181 -0.62911 7.14992C-1.041 6.73804 -1.19136 6.58397 -1.28609 6.4397C-1.7033 5.80436 -1.69428 4.94919 -1.23482 4.27284C-1.12995 4.11848 -0.967578 3.95578 -0.540525 3.52872L0.0781729 2.91002C0.273403 2.71479 0.273403 2.39813 0.0781729 2.2029C-0.117057 2.00767 -0.433716 2.00767 -0.628946 2.2029L-1.24765 2.8216L-1.29068 2.86464C-1.66025 3.2342 -1.89683 3.47573 -2.06197 3.71091C-2.7372 4.70489 -2.77207 5.99858 -2.12187 6.98863C-1.96322 7.2301 -1.73213 7.4611 -1.38077 7.8124L-1.33615 7.85702L-1.29148 7.9016C-0.940183 8.25297 -0.709088 8.48407 -0.467625 8.64272C0.522352 9.29292 1.81605 9.25805 2.81003 8.58283C3.04523 8.41769 3.28672 8.18108 3.65629 7.81152L3.69933 7.76848L4.31796 7.14984ZM9.62172 6.08558C9.81695 5.89035 9.81695 5.57369 9.62172 5.37846C9.42649 5.18323 9.10983 5.18323 8.9146 5.37846L5.37908 8.91398C5.18385 9.10921 5.18385 9.42587 5.37908 9.6211C5.57431 9.81633 5.89097 9.81633 6.0862 9.6211L9.62172 6.08558Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
              </svg>
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
                    {selectedFile && (
                      <div className="mt-2 text-sm text-muted-foreground">
                        {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
                      </div>
                    )}
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
