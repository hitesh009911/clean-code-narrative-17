
import { useState, useEffect } from 'react';

/**
 * Custom hook to get and watch for changes to the profile image in localStorage
 * @returns The current profile image URL or null if not set
 */
export const useProfileImage = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    // Initial load from localStorage
    const savedImage = localStorage.getItem("userProfileImage");
    if (savedImage) {
      setProfileImage(savedImage);
    }

    // Function to handle storage changes (both from this tab and others)
    const handleStorageChange = () => {
      const currentImage = localStorage.getItem("userProfileImage");
      setProfileImage(currentImage);
    };

    // Listen for storage events (for cross-tab synchronization)
    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for our custom event (for same-tab synchronization)
    window.addEventListener('storage-local', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('storage-local', handleStorageChange);
    };
  }, []);

  return profileImage;
};
