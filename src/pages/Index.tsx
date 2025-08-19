import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FeatureCard from "@/components/FeatureCard";
import StepCard from "@/components/StepCard";
import { Search, Users, Eye, MessageCircle, UserPlus, Settings, Heart, BookOpen } from "lucide-react";
import heroImage from "@/assets/hero-study-buddy.jpg";

const Index = () => {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Find your perfect
              <span className="hero-gradient bg-clip-text text-transparent"> study buddy</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Match by course, interests, and availability. Connect with motivated students for collaborative learning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/signup">Get Started</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/dashboard">See Dashboard Demo</Link>
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
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
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
      <section className="hero-gradient py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to boost your studies?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Start free · No card required
          </p>
          <Button variant="secondary" size="lg" asChild>
            <Link to="/signup">Sign Up Now</Link>
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
                <Heart className="h-5 w-5 text-background/70 hover:text-background cursor-pointer transition-colors" />
                <MessageCircle className="h-5 w-5 text-background/70 hover:text-background cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
          <div className="border-t border-background/10 mt-8 pt-8 text-center text-background/70">
            <p>&copy; 2024 LisioBuddy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;