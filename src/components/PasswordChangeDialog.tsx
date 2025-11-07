
import React, { useState } from 'react';
import { Eye, EyeOff, Key, AlertCircle, Shield } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

type PasswordChangeDialogProps = {
  trigger?: React.ReactNode;
};

const PasswordChangeDialog = ({ trigger }: PasswordChangeDialogProps) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { updatePassword } = useAuth();
  const { toast } = useToast();

  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const calculatePasswordStrength = (password: string) => {
    let score = 0;
    
    // Length check
    if (password.length >= 8) score += 20;
    if (password.length >= 12) score += 10;
    
    // Complexity checks
    if (/[A-Z]/.test(password)) score += 20; // Has uppercase
    if (/[a-z]/.test(password)) score += 15; // Has lowercase
    if (/[0-9]/.test(password)) score += 15; // Has number
    if (/[^A-Za-z0-9]/.test(password)) score += 20; // Has special char
    
    return Math.min(100, score);
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewPassword(value);
    setPasswordStrength(calculatePasswordStrength(value));
  };

  const getPasswordStrengthLabel = () => {
    if (passwordStrength >= 80) return { text: "Strong", color: "text-green-500" };
    if (passwordStrength >= 50) return { text: "Medium", color: "text-yellow-500" };
    return { text: "Weak", color: "text-red-500" };
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength >= 80) return "bg-green-500";
    if (passwordStrength >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirmation password must match",
        variant: "destructive",
      });
      return;
    }
    
    if (passwordStrength < 50) {
      toast({
        title: "Password too weak",
        description: "Please choose a stronger password with a mix of uppercase, lowercase, numbers, and symbols",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    const { error } = await updatePassword(newPassword);
    
    if (!error) {
      toast({
        title: "Password updated",
        description: "Your password has been successfully changed",
      });
      setOpen(false);
      resetForm();
    } else {
      toast({
        title: "Password update failed",
        description: error.message,
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  const resetForm = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    setPasswordStrength(0);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button variant="outline">Change Password</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Change Password
          </DialogTitle>
          <DialogDescription>
            Update your admin password. Make sure to choose a strong password.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="new-password">New Password</Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  className="pr-10"
                  required
                  autoComplete="new-password"
                />
                <button 
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={toggleNewPasswordVisibility}
                >
                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {newPassword && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs">Password strength:</span>
                    <span className={`text-xs font-medium ${getPasswordStrengthLabel().color}`}>
                      {getPasswordStrengthLabel().text}
                    </span>
                  </div>
                  <Progress 
                    value={passwordStrength} 
                    className="h-1"
                    indicatorClassName={getPasswordStrengthColor()}
                  />
                  {passwordStrength < 50 && (
                    <div className="flex items-center gap-1 text-xs text-amber-500">
                      <AlertCircle className="h-3 w-3" />
                      <span>Use uppercase, lowercase, numbers and symbols</span>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pr-10"
                  required
                  autoComplete="new-password"
                />
                <button 
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {confirmPassword && newPassword !== confirmPassword && (
                <p className="text-xs text-destructive flex items-center gap-1 mt-1">
                  <AlertCircle className="h-3 w-3" /> Passwords don't match
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                setOpen(false);
                resetForm();
              }}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={isLoading || !newPassword || !confirmPassword || newPassword !== confirmPassword}
            >
              {isLoading ? "Updating..." : "Update Password"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PasswordChangeDialog;
