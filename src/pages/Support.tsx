import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search } from "lucide-react";

const Support = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    {
      question: "How do I find study partners in my course?",
      answer: "Use the search feature on the dashboard to filter by course name or code. You can also browse all active students and filter by department or interests."
    },
    {
      question: "How do I update my availability status?",
      answer: "Go to your profile settings and update your status to Available, Busy, or Offline. This helps other students know when you're free to study."
    },
    {
      question: "Can I create study groups with multiple people?",
      answer: "Yes! You can connect with multiple study partners and coordinate group study sessions. Use the messaging feature to organize your group."
    },
    {
      question: "Is StudyBuddy free to use?",
      answer: "Yes, StudyBuddy is completely free for all students. We believe in making collaborative learning accessible to everyone."
    },
    {
      question: "How do I report inappropriate behavior?",
      answer: "If you encounter any inappropriate behavior, please use the report button on the user's profile or contact our support team directly."
    },
    {
      question: "Can I use StudyBuddy on my mobile device?",
      answer: "Yes! StudyBuddy is fully responsive and works great on all devices including smartphones and tablets."
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-background">
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Support & FAQs
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions or get help with using StudyBuddy
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No FAQs found matching your search.</p>
              <Button variant="outline" onClick={() => setSearchQuery("")} className="mt-4">
                Clear Search
              </Button>
            </div>
          )}
        </div>

        {/* Contact Support */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-semibold mb-4">Still need help?</h2>
          <p className="text-muted-foreground mb-6">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <Button variant="hero" asChild>
            <a href="/contact">Contact Support</a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Support;