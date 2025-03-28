
import React, { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      const success = login(password);
      
      if (success) {
        toast({
          title: "Login successful",
          description: "Welcome back, Hitesh!",
        });
        navigate('/projects/manage');
      } else {
        toast({
          title: "Authentication failed",
          description: "Invalid password",
          variant: "destructive",
        });
      }
      
      setIsLoading(false);
      setPassword('');
    }, 800); // Simulate a network request
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full max-w-md mx-auto my-8 p-6 rounded-xl bg-card/60 backdrop-blur-sm border border-border/50 shadow-lg">
      <div className="flex items-center justify-center mb-6">
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Lock className="h-6 w-6 text-primary" />
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-center mb-6">Admin Access</h3>
      
      {isAuthenticated ? (
        <div className="text-center">
          <p className="mb-4 text-muted-foreground">You're already logged in!</p>
          <Button 
            onClick={() => navigate('/projects/manage')} 
            className="w-full mb-2"
          >
            Manage Projects
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate('/projects')}
            className="w-full"
          >
            View Projects
          </Button>
        </div>
      ) : (
        <form onSubmit={handleLogin}>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pr-10"
                  required
                />
                <button 
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Authenticating..." : "Login"}
            </Button>
          </div>
        </form>
      )}
      
      <p className="text-center text-xs text-muted-foreground mt-4">
        This area is restricted to website administrator only.
      </p>
    </div>
  );
};

export default AdminLogin;
