import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Sun, Chrome, Mail, Lock } from "lucide-react";
import { authService, type User } from "@/services/authService";
import { GoogleAccountSelector } from "@/components/GoogleAccountSelector";
import { toast } from "sonner";

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

export const RegisterPage = () => {
  const [credentials, setCredentials] = useState<RegisterCredentials>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    name: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showGoogleSelector, setShowGoogleSelector] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = (): boolean => {
    if (!credentials.username || !credentials.email || !credentials.password || !credentials.confirmPassword || !credentials.name) {
      toast.error("Please fill in all fields");
      return false;
    }

    if (credentials.password !== credentials.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    if (credentials.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(credentials.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // In a real app, this would call your backend API to register the user
      // For now, we'll simulate registration and auto-login
        toast.success("Account created successfully! You can now log in.");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-0 relative overflow-hidden">
      {/* Enhanced background decoration with orange accents */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(251,146,60,0.15)_0%,transparent_50%),radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.15)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,146,60,0.08),transparent_70%)]"></div>
      
      <div className="relative z-10 w-full max-w-6xl mx-auto flex items-center min-h-screen">
        {/* Left side - Logo and Title */}
        <div className="flex-1 flex flex-col items-center justify-center p-12">
          <div className="text-center max-w-lg">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-transparent to-blue-500/20 rounded-3xl blur-2xl animate-pulse"></div>
              <div className="relative">
                <img
                  src="/logo.png"
                  alt="Smart Drying Rack Logo"
                  className="h-52 w-auto mx-auto drop-shadow-2xl brightness-125 contrast-125 saturate-150 hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-blue-500 mb-4 animate-fade-in">Smart Drying Rack</h1>
            <p className="text-xl text-slate-300 font-light">Intelligent Solar-Powered Drying System</p>
            <div className="mt-8 flex justify-center space-x-4">
              <div className="h-1 w-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"></div>
              <div className="h-1 w-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Right side - Register Card */}
        <div className="flex-1 flex items-center justify-center p-12">
          <Card className="bg-gradient-to-br from-slate-800/70 to-slate-900/70 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-orange-500/60 hover:border-orange-500/80 transition-all duration-500 hover:shadow-orange-500/40 hover:scale-[1.02] w-full max-w-md">
            <CardHeader className="space-y-2 pt-8">
              <CardTitle className="text-3xl font-bold text-center text-white">Create Account</CardTitle>
              <CardDescription className="text-center text-slate-400 text-lg">
                Join our smart drying system today
              </CardDescription>
            </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-300">Full Name</Label>
                <div className="relative">
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={credentials.name}
                    onChange={handleInputChange}
                    className="bg-gradient-to-br from-slate-700/40 to-slate-800/40 border border-orange-500/30 text-white placeholder:text-slate-400 focus:ring-orange-500 focus:border-orange-500 rounded-xl py-3 pl-10"
                    required
                    autoComplete="name"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                    <Sun className="h-4 w-4" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="username" className="text-slate-300">Username</Label>
                <div className="relative">
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Choose a username"
                    value={credentials.username}
                    onChange={handleInputChange}
                    className="bg-gradient-to-br from-slate-700/40 to-slate-800/40 border border-orange-500/30 text-white placeholder:text-slate-400 focus:ring-orange-500 focus:border-orange-500 rounded-xl py-3 pl-10"
                    required
                    autoComplete="username"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                    <Mail className="h-4 w-4" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">Email</Label>
                <div className="relative">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={credentials.email}
                    onChange={handleInputChange}
                    className="bg-gradient-to-br from-slate-700/40 to-slate-800/40 border border-orange-500/30 text-white placeholder:text-slate-400 focus:ring-orange-500 focus:border-orange-500 rounded-xl py-3 pl-10"
                    required
                    autoComplete="email"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                    <Mail className="h-4 w-4" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-300">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={credentials.password}
                    onChange={handleInputChange}
                    className="bg-gradient-to-br from-slate-700/40 to-slate-800/40 border border-orange-500/30 text-white placeholder:text-slate-400 focus:ring-orange-500 focus:border-orange-500 rounded-xl py-3 pr-10 pl-10"
                    required
                    autoComplete="new-password"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                    <Lock className="h-4 w-4" />
                  </div>
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-400 hover:text-orange-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-slate-300">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={credentials.confirmPassword}
                    onChange={handleInputChange}
                    className="bg-gradient-to-br from-slate-700/40 to-slate-800/40 border border-orange-500/30 text-white placeholder:text-slate-400 focus:ring-orange-500 focus:border-orange-500 rounded-xl py-3 pr-10 pl-10"
                    required
                    autoComplete="new-password"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                    <Lock className="h-4 w-4" />
                  </div>
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-400 hover:text-orange-300 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4 pb-6">
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-6 text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-orange-500/30 rounded-xl relative overflow-hidden group"
                disabled={isLoading}
              >
                <span className="relative z-10 flex items-center justify-center">
                  <Sun className="h-5 w-5 mr-2" />
                  {isLoading ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2"></div>
                      <span>Creating account...</span>
                    </>
                  ) : (
                    "Create Account"
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
              
              <div className="text-center text-sm text-slate-400 pt-2">
                <p>Already have an account? <a href="/login" className="text-orange-400 hover:text-orange-300 transition-colors">Sign in</a></p>
              </div>
              
              <div className="flex items-center gap-2 my-4">
                <div className="flex-grow border-t border-orange-500/30"></div>
                <span className="text-slate-400 text-sm px-2 bg-gradient-to-br from-slate-800/60 to-slate-900/60 px-3 py-1 rounded-full border border-orange-500/20">OR</span>
                <div className="flex-grow border-t border-orange-500/30"></div>
              </div>
              
              <Button 
                type="button" 
                variant="outline" 
                className="w-full bg-gradient-to-r from-slate-700/50 to-slate-800/50 hover:from-slate-700/60 hover:to-slate-800/60 text-white border border-orange-500/30 py-6 text-lg font-medium transition-all duration-300 flex items-center justify-center gap-3 rounded-xl relative overflow-hidden group"
                onClick={() => {
                  setShowGoogleSelector(true);
                }}
              >
                <div className="bg-white rounded-full p-1.5">
                  <img src="/google.png" alt="Google" className="h-5 w-5" />
                </div>
                <span className="relative z-10">Continue with Google</span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
              
              {showGoogleSelector && (
                <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
                  <GoogleAccountSelector
                    onSelectAccount={async (account) => {
                      // This won't be called since we're redirecting to Google
                      // The actual login will happen after Google redirects back
                    }}
                    onCancel={() => {
                      setShowGoogleSelector(false);
                    }}
                  />
                </div>
              )}
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  </div>
  );
};

export default RegisterPage;