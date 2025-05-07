
import React, { useEffect, useState } from 'react';
import { Progress } from "@/components/ui/progress";
import { useIsMobile } from '@/hooks/use-mobile';

interface SplineFallbackProps {
  isError: boolean;
  isLoading: boolean;
  sceneName?: string;
  hideLoading?: boolean;
}

const SplineFallback: React.FC<SplineFallbackProps> = ({ 
  isError, 
  isLoading, 
  sceneName = '3D scene',
  hideLoading = false
}) => {
  const isMobile = useIsMobile();
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  useEffect(() => {
    if (isLoading && !hideLoading) {
      // Simulate loading progress for better UX
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          const nextProgress = prev + Math.random() * 5;
          // Cap at 95% until fully loaded
          return Math.min(nextProgress, 95);
        });
      }, 300);
      
      return () => {
        clearInterval(interval);
        // When loading is done, jump to 100%
        if (!isLoading) setLoadingProgress(100);
      };
    } else {
      setLoadingProgress(100);
    }
  }, [isLoading, hideLoading]);
  
  if (isLoading && !hideLoading) {
    return (
      <div className="fixed inset-0 z-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <div className="text-center px-6 py-8 rounded-lg bg-background/90 backdrop-blur-md shadow-lg border border-border/30 max-w-xs w-full">
          <div className="animate-spin h-12 w-12 mb-4 mx-auto border-4 border-primary border-t-transparent rounded-full"></div>
          <p className="text-foreground font-medium mb-2">Loading {sceneName}...</p>
          <p className="text-muted-foreground text-sm mb-4">
            {isMobile ? "Optimizing for mobile display..." : "Preparing visual experience..."}
          </p>
          <Progress 
            value={loadingProgress} 
            className="h-2 mb-2"
            indicatorClassName={loadingProgress < 100 ? "bg-primary" : "bg-green-500"} 
          />
          <p className="text-xs text-muted-foreground mt-1">{Math.round(loadingProgress)}%</p>
        </div>
      </div>
    );
  }
  
  if (isError) {
    return (
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-background/90 to-background">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6 py-8 rounded-lg bg-background/90 backdrop-blur-md shadow-lg border border-border/30 max-w-md w-full">
            <p className="text-foreground font-medium mb-4">
              3D scene couldn't be loaded
            </p>
            <p className="text-muted-foreground text-sm mb-4">
              {isMobile 
                ? "This might be due to limited mobile resources. Try refreshing or viewing on a desktop device for the full experience." 
                : "There was a problem loading the 3D content. Please refresh the page to try again."}
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  return null;
};

export default SplineFallback;
