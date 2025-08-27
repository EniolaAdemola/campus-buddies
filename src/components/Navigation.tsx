import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import ProfileModal from "./ProfileModal";
import { supabase } from "@/integrations/supabase/client";

const Navigation = () => {
  const [user, setUser] = useState<any>(null);
  const [session, setSession] = useState<any>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Defer async operations to prevent callback blocking
        if (session?.user) {
          setTimeout(async () => {
            const { data, error } = await supabase.rpc('get_current_user_role');
            if (error) {
              console.error('Error fetching role via RPC:', error);
            }
            setUserRole((data as any) || null);
          }, 0);
        } else {
          setUserRole(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        setTimeout(async () => {
          const { data, error } = await supabase.rpc('get_current_user_role');
          if (error) {
            console.error('Error fetching role via RPC:', error);
          }
          setUserRole((data as any) || null);
        }, 0);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const getInitials = (name: string) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return name[0].toUpperCase();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    // State will be updated automatically via onAuthStateChange
  };

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
            <BookOpen className="h-6 w-6" />
            LisioBuddy
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
            <Link to="/support" className="text-foreground hover:text-primary transition-colors">
              Support
            </Link>
            <Link to="/dashboard" className="text-foreground hover:text-primary transition-colors">
              Dashboard
            </Link>
          </div>

          {/* Auth Buttons / Profile */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <Avatar 
                  className="h-8 w-8 cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all"
                  onClick={() => setShowProfileModal(true)}
                >
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
                    {getInitials(user.user_metadata?.full_name || user.email)}
                  </AvatarFallback>
                </Avatar>
                <Button variant="ghost" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button variant="hero" asChild>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      <ProfileModal open={showProfileModal} onOpenChange={setShowProfileModal} />
    </nav>
  );
};

export default Navigation;