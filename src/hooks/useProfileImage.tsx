
import { useState, useEffect } from 'react';
import { useProjectsStore } from '@/stores/projectsStore';

/**
 * Custom hook to get and watch for changes to the profile image in localStorage
 * @returns The current profile image URL or null if not set
 */
export const useProfileImage = () => {
  const { getUploadedImage } = useProjectsStore();
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    // Initial load
    loadProfileImage();

    // Set up event listeners
    window.addEventListener('storage', loadProfileImage);
    window.addEventListener('storage-local', loadProfileImage);
    
    // Clean up
    return () => {
      window.removeEventListener('storage', loadProfileImage);
      window.removeEventListener('storage-local', loadProfileImage);
    };
  }, []);
  
  // We're defining the function directly in this scope to avoid dependency issues
  function loadProfileImage() {
    // Try direct localStorage first for immediate access
    const directImage = localStorage.getItem("userProfileImage") || 
                        sessionStorage.getItem("userProfileImage");
                        
    if (directImage) {
      setProfileImage(directImage);
      return;
    }
    
    // Fall back to store function if direct access fails
    const storeImage = getUploadedImage("userProfileImage");
    if (storeImage) {
      setProfileImage(storeImage);
    }
  }

  return profileImage;
};
