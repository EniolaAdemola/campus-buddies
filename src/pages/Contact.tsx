import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Sparkles } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    };

    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: data
      });

      if (error) throw error;

      toast({
        title: "Message sent! 🚀",
        description: "Thanks for reaching out! We'll get back to you within 24 hours.",
      });
      
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Oops! Something went wrong 😔",
        description: "Please try again or email us directly at it.eniolaademola@gmail.com",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-background">
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 genz-text-gradient animate-float">
            Let's Chat! <Sparkles className="inline h-8 w-8" />
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Got questions? Ideas? Just want to say hi? 
            We're here and we're excited to hear from you! ✨
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="p-8 genz-card">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-primary font-medium">What should we call you? 👋</Label>
                <Input 
                  id="name" 
                  name="name"
                  type="text" 
                  placeholder="Your awesome name here..."
                  required 
                  className="border-primary/20 focus:border-primary"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-primary font-medium">Where can we reach you? 📧</Label>
                <Input 
                  id="email" 
                  name="email"
                  type="email" 
                  placeholder="your.email@example.com"
                  required 
                  className="border-primary/20 focus:border-primary"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message" className="text-primary font-medium">What's on your mind? 💭</Label>
                <Textarea 
                  id="message" 
                  name="message"
                  placeholder="Tell us your thoughts, ideas, or how we can help you be awesome! ✨"
                  className="min-h-32 border-primary/20 focus:border-primary"
                  required 
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full genz-button text-white font-semibold py-3 text-lg"
              >
                {isSubmitting ? "Sending your message... 🚀" : "Send Message ✨"}
              </Button>
            </form>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-muted-foreground">support@lisiobuddy.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium">Address</h3>
                    <p className="text-muted-foreground">
                      123 University Ave<br />
                      Study City, SC 12345
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5">
              <h3 className="font-semibold mb-3">Quick Response</h3>
              <p className="text-muted-foreground text-sm">
                We typically respond to all inquiries within 24 hours during business days. 
                For urgent matters, please include "URGENT" in your message subject.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;