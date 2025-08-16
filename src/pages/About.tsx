import { Card } from "@/components/ui/card";
import { Users, GraduationCap, BookOpen } from "lucide-react";

const About = () => {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            About StudyBuddy
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Our mission is simple: helping students connect, learn, and grow together. 
            We believe that collaborative learning creates stronger academic outcomes and lasting friendships.
          </p>
        </div>
      </section>

      {/* Cards Section */}
      <section className="surface-soft py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">For Students</h3>
              <p className="text-muted-foreground">
                Find study partners who share your courses and academic goals. 
                Connect with motivated peers and boost your learning experience through collaboration.
              </p>
            </Card>

            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-4">For Study Groups</h3>
              <p className="text-muted-foreground">
                Organize and manage study groups more effectively. 
                Find new members, schedule sessions, and create lasting study communities.
              </p>
            </Card>

            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-8 w-8 text-success" />
              </div>
              <h3 className="text-xl font-semibold mb-4">For Tutors</h3>
              <p className="text-muted-foreground">
                Connect with students who need help in your areas of expertise. 
                Build your tutoring network and help others succeed academically.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Our Vision</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              We envision a world where every student has access to collaborative learning opportunities. 
              By connecting students with similar academic interests and goals, we're building a community 
              where knowledge sharing and peer support drive academic success.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">10K+</div>
                <p className="text-muted-foreground">Active Students</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">500+</div>
                <p className="text-muted-foreground">Study Groups Formed</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-success mb-2">95%</div>
                <p className="text-muted-foreground">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;