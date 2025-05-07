
import React from 'react';

interface SplineFallbackProps {
  isError: boolean;
  isLoading: boolean;
}

const SplineFallback: React.FC<SplineFallbackProps> = ({ isError, isLoading }) => {
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-0 flex items-center justify-center bg-background/80">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 mb-4 mx-auto border-4 border-primary border-t-transparent rounded-full"></div>
          <p className="text-muted-foreground">Loading 3D scene...</p>
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
      </div>
    );
  }
  
  return null;
};

export default SplineFallback;
