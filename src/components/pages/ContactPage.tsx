import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import {
  Mail,
  Phone,
  Clock,
  ArrowRight,
  MessageSquare,
  Users,
  Zap,
  CheckCircle,
  Building,
  Calendar,
  Globe,
  Shield,
  Code,
  Headphones,
} from "lucide-react";
import {
  useScrollAnimation,
  useStaggeredAnimation,
} from "../hooks/useScrollAnimation";

type Page = "home" | "about" | "services" | "contact" | "thank-you" | "admin";

interface ContactPageProps {
  onNavigate: (page: Page) => void;
}

export function ContactPage({ onNavigate }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
  });
  console.log({ formData });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Define all data arrays first, before scroll animation hooks
  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us a detailed message",
      value: "hello@nexuscore.dev",
      action: "mailto:hello@nexuscore.dev",
      note: "Response within 24 hours",
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak with our team directly",
      value: "+1 (555) 123-4567",
      action: "tel:+15551234567",
      note: "Mon-Fri, 9 AM - 6 PM EST",
    },
    {
      icon: Calendar,
      title: "Schedule a Call",
      description: "Book a consultation meeting",
      value: "Free 30-min consultation",
      action: "#",
      note: "Available this week",
    },
  ];

  const companyInfo = [
    {
      icon: Building,
      title: "Headquarters",
      details: ["123 Tech Street", "San Francisco, CA 94105", "United States"],
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: [
        "Monday - Friday: 9:00 AM - 6:00 PM",
        "Saturday: 10:00 AM - 2:00 PM",
        "Sunday: Closed",
      ],
    },
    {
      icon: Globe,
      title: "Global Reach",
      details: [
        "Clients in 25+ countries",
        "Remote-first development",
        "24/7 support available",
      ],
    },
  ];

  const faqs = [
    {
      question: "How long does a typical project take?",
      answer:
        "Most projects take 4-12 weeks depending on complexity and scope.",
    },
    {
      question: "Do you work with startups?",
      answer:
        "Yes! We love working with startups and offer flexible pricing models.",
    },
    {
      question: "What technologies do you specialize in?",
      answer:
        "We specialize in React, Node.js, Python, cloud platforms, and AI/ML solutions.",
    },
    {
      question: "Do you provide ongoing support?",
      answer:
        "Yes, we offer maintenance packages and 24/7 support for all our clients.",
    },
  ];

  const projectTypes = [
    "Web Application",
    "Mobile App",
    "Enterprise Software",
    "AI/ML Solution",
    "Cloud Migration",
    "System Integration",
    "Other",
  ];

  const budgetRanges = [
    "$10K - $25K",
    "$25K - $50K",
    "$50K - $100K",
    "$100K - $250K",
    "$250K+",
    "Not Sure",
  ];

  // Now initialize scroll animation hooks after data arrays are defined
  const heroRef = useScrollAnimation({ threshold: 0.2 });
  const contactMethodsRef = useStaggeredAnimation(contactMethods.length, {
    threshold: 0.1,
  });
  const formRef = useScrollAnimation({ threshold: 0.1 });
  const faqRef = useStaggeredAnimation(faqs.length, { threshold: 0.1 });
  const finalCtaRef = useScrollAnimation({ threshold: 0.2 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setIsSubmitting(false);
      onNavigate("thank-you");
    }, 2000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section
        ref={heroRef.elementRef}
        className={`py-24 md:py-32 bg-background section-reveal ${heroRef.isVisible ? "visible" : ""
          }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-8">
            <Badge className="bg-primary/20 text-primary border-primary/30 mb-4 scroll-animate-badge">
              <MessageSquare className="w-4 h-4 mr-2" />
              Get In Touch
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold text-foreground max-w-4xl mx-auto leading-tight">
              Let's Build Something
              <span className="text-primary"> Amazing</span> Together
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Ready to transform your ideas into powerful software solutions?
              Our team of experts is here to help you every step of the way.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="btn-premium px-8 py-4 text-lg"
                onClick={() =>
                  document
                    .getElementById("contact-form")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <Zap className="w-5 h-5 mr-2" />
                Start Your Project
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary/40 hover:border-primary text-primary hover:bg-primary/10 px-8 py-4 text-lg"
                onClick={() => window.open("tel:+15551234567")}
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section
        ref={contactMethodsRef.elementRef}
        className={`py-20 bg-muted/30 section-reveal ${contactMethodsRef.isVisible ? "visible" : ""
          }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              How Can We Help You?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the best way to reach out to our team
            </p>
          </div>

          <div
            className={`grid grid-cols-1 md:grid-cols-3 gap-8 stagger-children ${contactMethodsRef.isVisible ? "animate" : ""
              }`}
          >
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <Card
                  key={index}
                  className="p-6 scroll-animate-card hover:shadow-lg transition-all duration-300 hover:scale-105 group cursor-pointer"
                  onClick={() => {
                    if (method.action.startsWith("#")) {
                      document
                        .getElementById("contact-form")
                        ?.scrollIntoView({ behavior: "smooth" });
                    } else {
                      window.open(method.action);
                    }
                  }}
                >
                  <CardContent className="text-center space-y-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        {method.title}
                      </h3>
                      <p className="text-muted-foreground mb-3">
                        {method.description}
                      </p>
                      <p className="font-semibold text-primary">
                        {method.value}
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        {method.note}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section
        id="contact-form"
        ref={formRef.elementRef}
        className={`py-20 bg-background section-reveal ${formRef.isVisible ? "visible" : ""
          }`}
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <Card className="p-8 shadow-xl scroll-animate-card">
                <CardContent className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold text-foreground mb-4">
                      Tell Us About Your Project
                    </h2>
                    <p className="text-muted-foreground">
                      Fill out the form below and we'll get back to you within
                      24 hours with a detailed proposal.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          name="company"
                          type="text"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Your Company"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="projectType">Project Type *</Label>
                        <select
                          id="projectType"
                          name="projectType"
                          required
                          value={formData.projectType}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-full border border-input-border bg-input-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        >
                          <option value="">Select project type</option>
                          {projectTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="budget">Budget Range</Label>
                        <select
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-full border border-input-border bg-input-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        >
                          <option value="">Select budget range</option>
                          {budgetRanges.map((range) => (
                            <option key={range} value={range}>
                              {range}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timeline">Preferred Timeline</Label>
                      <Input
                        id="timeline"
                        name="timeline"
                        type="text"
                        value={formData.timeline}
                        onChange={handleChange}
                        placeholder="e.g., 3 months, ASAP, Q2 2024"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Project Description *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your project goals, technical requirements, target audience, and any specific features you need..."
                        rows={6}
                        className="resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full btn-premium py-4 text-lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Mail className="w-5 h-5 mr-2" />
                          Send Message
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </Button>

                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">
                        By submitting this form, you agree to our privacy
                        policy. We'll never share your information with third
                        parties.
                      </p>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Company Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6">
                  Company Information
                </h3>

                {companyInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <div key={index} className="mb-8 scroll-animate-card">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-primary" />
                        </div>
                        <h4 className="font-semibold text-foreground">
                          {info.title}
                        </h4>
                      </div>
                      <div className="ml-13 space-y-1">
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-muted-foreground">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              <Card className="p-6 bg-primary/5 border-primary/20 scroll-animate-card">
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Shield className="w-6 h-6 text-primary" />
                    <h4 className="font-semibold text-foreground">
                      Why Choose Nexus Core?
                    </h4>
                  </div>
                  <ul className="space-y-3">
                    {[
                      "Expert team with 8+ years experience",
                      "Proven track record with 500+ projects",
                      "24/7 support and maintenance",
                      "Agile development methodology",
                      "Transparent pricing and communication",
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-3 scroll-animate-badge"
                      >
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground text-sm">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        ref={faqRef.elementRef}
        className={`py-20 bg-muted/30 section-reveal ${faqRef.isVisible ? "visible" : ""
          }`}
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground">
              Quick answers to common questions about our services
            </p>
          </div>

          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-8 stagger-children ${faqRef.isVisible ? "animate" : ""
              }`}
          >
            {faqs.map((faq, index) => (
              <Card
                key={index}
                className="p-6 scroll-animate-card hover:shadow-lg transition-shadow"
              >
                <CardContent className="space-y-3">
                  <h3 className="font-semibold text-foreground">
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">Still have questions?</p>
            <Button
              variant="outline"
              className="border-primary/40 hover:border-primary text-primary hover:bg-primary/10 scroll-animate-badge"
              onClick={() => onNavigate("about")}
            >
              <Headphones className="w-4 h-4 mr-2" />
              View More FAQs
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        ref={finalCtaRef.elementRef}
        className={`py-20 bg-background section-reveal ${finalCtaRef.isVisible ? "visible" : ""
          }`}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join hundreds of companies that trust Nexus Core for their software
            development needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="btn-premium px-8 py-4 text-lg"
              onClick={() =>
                document
                  .getElementById("contact-form")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <Code className="w-5 h-5 mr-2" />
              Start Your Project
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-primary/40 hover:border-primary text-primary hover:bg-primary/10 px-8 py-4 text-lg"
              onClick={() => onNavigate("about")}
            >
              <Users className="w-5 h-5 mr-2" />
              Learn About Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
