import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FeatureCard from "@/components/FeatureCard";
import StepCard from "@/components/StepCard";
import { Search, Users, Eye, MessageCircle, UserPlus, Settings, Heart, BookOpen } from "lucide-react";
import heroImage from "@/assets/hero-study-buddy.jpg";

const Index = () => {
  return (
    <div className="bg-background overflow-x-hidden">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8 lg:py-16 xl:py-24">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight">
              Find your perfect
              <span className="genz-text-gradient animate-float"> study buddy</span> ✨
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              Match by course, interests, and availability. Connect with motivated students for collaborative learning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="genz-button text-white font-semibold py-3 px-8" size="lg" asChild>
                <Link to="/signup">Get Started 🚀</Link>
              </Button>
              <Button variant="outline" size="lg" className="border-primary/30 hover:bg-primary/10" asChild>
                <Link to="/dashboard">See Dashboard Demo ✨</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <img 
              src={heroImage} 
              alt="Students collaborating and studying together" 
              className="rounded-2xl shadow-study w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="surface-soft py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Everything you need to connect</h2>
            <p className="text-muted-foreground text-lg">Powerful features to help you find the perfect study partner</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={Users}
              title="Browse Active Students"
              description="See who's currently available and looking for study partners in real-time."
            />
            <FeatureCard
              icon={Search}
              title="Search by Course & Interests"
              description="Filter by specific courses, subjects, and shared academic interests."
            />
            <FeatureCard
              icon={Eye}
              title="Quick Profile View"
              description="Get instant access to student profiles, skills, and availability status."
            />
            <FeatureCard
              icon={MessageCircle}
              title="Ask Chatbot by ID"
              description="Use our AI assistant to quickly find students by ID or specific criteria."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How it works</h2>
            <p className="text-muted-foreground text-lg">Get connected in three simple steps</p>
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <StepCard
              step={1}
              title="Sign Up"
              description="Create your profile with your courses, interests, and availability"
            />
            <StepCard
              step={2}
              title="Setup Profile"
              description="Add your skills, bio, and study preferences to help others find you"
            />
            <StepCard
              step={3}
              title="Find a Buddy"
              description="Browse, search, or get matched with compatible study partners"
            />
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="hero-gradient py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold text-white mb-4 animate-float">
            Ready to boost your studies? 🚀
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Join the study revolution · Start free · No card required ✨
          </p>
          <Button className="bg-white text-primary hover:bg-white/90 genz-button" size="lg" asChild>
            <Link to="/signup">Sign Up Now 💜</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 text-xl font-bold mb-4">
                <BookOpen className="h-6 w-6" />
                LisioBuddy
              </div>
              <p className="text-background/70">
                Connecting students for better learning experiences.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-2">
                <Link to="/about" className="block text-background/70 hover:text-background transition-colors">
                  About
                </Link>
                <Link to="/contact" className="block text-background/70 hover:text-background transition-colors">
                  Contact
                </Link>
                <Link to="/support" className="block text-background/70 hover:text-background transition-colors">
                  Support
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <div className="space-y-2">
                <a href="#" className="block text-background/70 hover:text-background transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="block text-background/70 hover:text-background transition-colors">
                  Terms of Service
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex gap-4">
                <a 
                  href="https://github.com/EniolaAdemola/lisio-buddy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-background/70 hover:text-background cursor-pointer transition-colors"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <Heart className="h-5 w-5 text-background/70 hover:text-background cursor-pointer transition-colors" />
                <MessageCircle className="h-5 w-5 text-background/70 hover:text-background cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
          <div className="border-t border-background/10 mt-8 pt-8 text-center text-background/70">
            <p className="flex items-center justify-center gap-2">
              Built with 💜 by FGD Students 2025
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;