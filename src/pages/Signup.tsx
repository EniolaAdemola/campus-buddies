import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { BookOpen } from "lucide-react";
import { useState } from "react";

const Signup = () => {
  // Unique admin passwords
  const ADMIN_PASSWORDS = [
    "ADMIN2024_LISIO_001",
    "ADMIN2024_LISIO_002", 
    "ADMIN2024_LISIO_003",
    "ADMIN2024_LISIO_004",
    "ADMIN2024_LISIO_005"
  ];

  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");

  const isAdminPasswordValid = isAdmin ? ADMIN_PASSWORDS.includes(adminPassword) : true;
  const isCreateButtonEnabled = !isAdmin || isAdminPasswordValid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup and redirect to dashboard
    console.log("Signup submitted", { isAdmin, adminPasswordValid: isAdminPasswordValid });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-2xl font-bold text-primary">
            <BookOpen className="h-8 w-8" />
            LisioBuddy
          </Link>
          <h2 className="mt-6 text-3xl font-bold">Create your account</h2>
          <p className="mt-2 text-muted-foreground">
            Join thousands of students finding study partners
          </p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="isAdmin" 
                checked={isAdmin}
                onCheckedChange={(checked) => {
                  setIsAdmin(checked as boolean);
                  if (!checked) {
                    setAdminPassword("");
                  }
                }}
              />
              <Label htmlFor="isAdmin" className="text-sm font-medium">
                I am an Admin
              </Label>
            </div>

            {isAdmin && (
              <div className="space-y-2">
                <Label htmlFor="adminPassword">Admin Password</Label>
                <Input
                  id="adminPassword"
                  type="password"
                  placeholder="Enter admin password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  required={isAdmin}
                  className={!isAdminPasswordValid && adminPassword ? "border-destructive" : ""}
                />
                {!isAdminPasswordValid && adminPassword && (
                  <p className="text-sm text-destructive">Invalid admin password</p>
                )}
              </div>
            )}

            <Button 
              type="submit" 
              variant="hero" 
              size="lg" 
              className="w-full"
              disabled={!isCreateButtonEnabled}
            >
              Create Account
            </Button>

            <div className="text-xs text-center text-muted-foreground">
              By signing up, you agree to our{" "}
              <a href="#" className="text-primary hover:underline">Terms of Service</a>
              {" "}and{" "}
              <a href="#" className="text-primary hover:underline">Privacy Policy</a>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Signup;