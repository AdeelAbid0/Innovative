import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import {
  Upload,
  Globe,
  CheckCircle,
  ArrowRight,
  ExternalLink,
  Zap,
  Shield,
  Clock,
  HelpCircle,
  Monitor,
  Code,
  Play,
  Star,
  Users,
  Rocket,
} from "lucide-react";

type Page =
  | "home"
  | "templates"
  | "template-detail"
  | "how-to-launch"
  | "custom-web"
  | "thank-you";

interface HowToLaunchPageProps {
  onNavigate: (page: Page) => void;
}

// Process Steps Data
const processSteps = [
  {
    id: 1,
    title: "Choose & Purchase",
    subtitle: "Select your perfect template",
    description:
      "Browse our curated collection of premium templates and purchase the one that matches your vision.",
    icon: <Monitor className="w-6 h-6" />,
    visual: (
      <div className="w-full h-40 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center relative overflow-hidden">
        <div className="grid grid-cols-2 gap-3 w-full px-6">
          <div className="bg-card rounded-lg p-3 shadow-sm border-2 border-primary">
            <div className="w-full h-16 bg-primary/20 rounded mb-2"></div>
            <div className="h-2 bg-primary/30 rounded mb-1"></div>
            <div className="h-2 bg-primary/20 rounded w-3/4"></div>
          </div>
          <div className="bg-card rounded-lg p-3 shadow-sm opacity-50">
            <div className="w-full h-16 bg-muted rounded mb-2"></div>
            <div className="h-2 bg-muted rounded mb-1"></div>
            <div className="h-2 bg-muted rounded w-2/3"></div>
          </div>
        </div>
        <div className="absolute top-3 right-3">
          <CheckCircle className="w-5 h-5 text-primary" />
        </div>
      </div>
    ),
    features: [
      "Instant download after purchase",
      "Complete source files included",
      "Documentation and setup guide",
      "Mobile-responsive design",
    ],
    duration: "2 minutes",
  },
  {
    id: 2,
    title: "Setup Hosting",
    subtitle: "Choose your hosting platform",
    description:
      "Select from our recommended free hosting platforms. All offer easy deployment and professional features.",
    icon: <Globe className="w-6 h-6" />,
    visual: (
      <div className="w-full h-40 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl flex items-center justify-center relative">
        <div className="grid grid-cols-3 gap-2 w-full px-4">
          {[
            { name: "Netlify", color: "bg-green-500", selected: true },
            { name: "Vercel", color: "bg-blue-500", selected: false },
            { name: "GitHub", color: "bg-purple-500", selected: false },
          ].map((platform, i) => (
            <div
              key={i}
              className={`bg-card rounded-lg p-3 text-center transition-all duration-300 ${
                platform.selected
                  ? "ring-2 ring-primary shadow-lg"
                  : "opacity-60"
              }`}
            >
              <div
                className={`w-8 h-8 ${platform.color}/20 rounded-lg mx-auto mb-2 flex items-center justify-center`}
              >
                <div className={`w-4 h-4 ${platform.color} rounded`}></div>
              </div>
              <div className="text-xs font-medium">{platform.name}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    features: [
      "Free hosting with SSL certificate",
      "Global CDN for fast loading",
      "Automatic backups included",
      "Custom domain support",
    ],
    duration: "5 minutes",
  },
  {
    id: 3,
    title: "Deploy Website",
    subtitle: "Upload with drag & drop",
    description:
      "Simply drag your template files to the hosting platform. Deployment is automatic and takes seconds.",
    icon: <Upload className="w-6 h-6" />,
    visual: (
      <div className="w-full h-40 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl flex items-center justify-center relative overflow-hidden">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-20 h-16 bg-card rounded-lg border-2 border-dashed border-primary/50 flex items-center justify-center relative">
            <Upload className="w-6 h-6 text-primary" />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-sm text-primary font-medium">
              Deploying...
            </span>
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    ),
    features: [
      "Drag & drop file upload",
      "Automatic build process",
      "Live preview URL generated",
      "Version control included",
    ],
    duration: "3 minutes",
  },
  {
    id: 4,
    title: "Go Live",
    subtitle: "Your website is ready",
    description:
      "Connect your custom domain or use the provided URL. Your professional website is now live for the world to see.",
    icon: <Rocket className="w-6 h-6" />,
    visual: (
      <div className="w-full h-40 bg-gradient-to-br from-primary/10 to-green-500/10 rounded-xl flex items-center justify-center relative">
        <div className="flex flex-col items-center space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-8 bg-card rounded flex items-center justify-center shadow-sm">
              <Globe className="w-5 h-5 text-primary" />
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
            <div className="bg-primary/20 px-3 py-2 rounded-lg">
              <span className="text-sm font-medium text-primary">
                yoursite.com
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-green-600 font-medium">
              Live & Secure
            </span>
          </div>
        </div>
        <div className="absolute top-3 right-3">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <CheckCircle className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    ),
    features: [
      "Custom domain connection",
      "SSL certificate included",
      "SEO optimization ready",
      "Analytics integration",
    ],
    duration: "5 minutes",
  },
];

// Platform recommendations
const hostingPlatforms = [
  {
    name: "Netlify",
    description: "Best for beginners with drag & drop deployment",
    features: [
      "Drag & drop deployment",
      "Automatic SSL",
      "Form handling",
      "Edge functions",
    ],
    url: "https://netlify.com",
    recommended: true,
    logo: "🌟",
  },
  {
    name: "Vercel",
    description: "Perfect for modern web applications",
    features: [
      "Git integration",
      "Preview deployments",
      "Edge network",
      "Analytics",
    ],
    url: "https://vercel.com",
    recommended: true,
    logo: "⚡",
  },
  {
    name: "GitHub Pages",
    description: "Free hosting for open source projects",
    features: [
      "GitHub integration",
      "Custom domains",
      "HTTPS",
      "Jekyll support",
    ],
    url: "https://pages.github.com",
    recommended: false,
    logo: "🐙",
  },
];

// FAQ Data
const faqData = [
  {
    question: "Do I need coding knowledge?",
    answer:
      "No coding knowledge required! Our templates are ready to use and come with clear instructions for customization.",
  },
  {
    question: "How long does deployment take?",
    answer:
      "Most deployments complete in under 30 seconds. The entire process from purchase to live website takes 15-30 minutes.",
  },
  {
    question: "Can I use my own domain?",
    answer:
      "Yes! All recommended hosting platforms support custom domains. You can connect your domain in just a few clicks.",
  },
  {
    question: "Is hosting really free?",
    answer:
      "Yes, all recommended platforms offer generous free tiers that are perfect for personal and small business websites.",
  },
  {
    question: "What if I need help?",
    answer:
      "We provide comprehensive documentation, video tutorials, and email support to help you every step of the way.",
  },
  {
    question: "Can I customize the templates?",
    answer:
      "Absolutely! Templates are fully customizable. Change colors, fonts, content, and layout to match your brand.",
  },
];

export function HowToLaunchPage({ onNavigate }: HowToLaunchPageProps) {
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set()
  );
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set());
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    // Hero animation
    if (heroRef.current) {
      const heroObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsHeroVisible(true);
          }
        },
        { threshold: 0.1 }
      );
      heroObserver.observe(heroRef.current);
      observers.push(heroObserver);
    }

    // Section animations
    const sectionElements = document.querySelectorAll("[data-section]");
    sectionElements.forEach((element) => {
      const sectionObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const sectionName = entry.target.getAttribute("data-section") || "";
            setVisibleSections((prev) => new Set([...prev, sectionName]));
          }
        },
        { threshold: 0.1 }
      );
      sectionObserver.observe(element);
      observers.push(sectionObserver);
    });

    // Step animations
    const stepElements = document.querySelectorAll("[data-step]");
    stepElements.forEach((element) => {
      const stepObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const stepId = parseInt(
              entry.target.getAttribute("data-step") || "0"
            );
            setVisibleSteps((prev) => new Set([...prev, stepId]));
          }
        },
        { threshold: 0.2 }
      );
      stepObserver.observe(element);
      observers.push(stepObserver);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section ref={heroRef} className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-6">
            <div
              className={`transition-all duration-800 ease-out ${
                isHeroVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <Badge variant="outline" className="mb-4 px-3 py-1">
                <Zap className="w-3 h-3 mr-1" />
                Lightning Fast Setup
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Launch Your Website in
                <span className="text-primary block md:inline md:ml-3">
                  15 Minutes
                </span>
              </h1>
            </div>

            <p
              className={`text-lg text-muted-foreground max-w-2xl mx-auto transition-all duration-800 delay-200 ${
                isHeroVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              Transform your vision into a live website with our simple 4-step
              process. No coding knowledge required, no monthly fees, just
              professional results.
            </p>

            <div
              className={`flex flex-wrap items-center justify-center gap-6 text-sm transition-all duration-800 delay-400 ${
                isHeroVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              {[
                { icon: <Clock className="w-4 h-4" />, text: "15-30 minutes" },
                {
                  icon: <Code className="w-4 h-4" />,
                  text: "No coding required",
                },
                {
                  icon: <Shield className="w-4 h-4" />,
                  text: "Free SSL included",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center space-x-2 text-muted-foreground"
                >
                  <div className="text-primary">{item.icon}</div>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            <div
              className={`transition-all duration-800 delay-600 ${
                isHeroVisible
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-8 scale-95"
              }`}
            >
              <Button
                size="lg"
                className="btn-premium"
                onClick={() => onNavigate("templates")}
              >
                <Play className="w-4 h-4 mr-2" />
                Get Started Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 space-y-20 pb-20">
        {/* Process Steps */}
        <section data-section="process" className="space-y-12">
          <div
            className={`text-center space-y-4 transition-all duration-700 ${
              visibleSections.has("process")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl font-bold text-foreground">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Four simple steps to transform your idea into a professional
              website
            </p>
          </div>

          <div className="space-y-16">
            {processSteps.map((step, index) => (
              <div
                key={step.id}
                data-step={step.id}
                className={`transition-all duration-700 ${
                  visibleSteps.has(step.id)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? "lg:grid-flow-dense" : ""
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`space-y-6 ${
                      index % 2 === 1 ? "lg:col-start-2" : ""
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div
                        className={`w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold transition-all duration-500 ${
                          visibleSteps.has(step.id)
                            ? "scale-100 rotate-0"
                            : "scale-75 rotate-12"
                        }`}
                      >
                        {step.id}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center space-x-3">
                          <div className="text-primary">{step.icon}</div>
                          <Badge variant="secondary" className="text-xs">
                            {step.duration}
                          </Badge>
                        </div>
                        <h3 className="text-2xl font-bold text-foreground">
                          {step.title}
                        </h3>
                        <p className="text-sm text-primary font-medium">
                          {step.subtitle}
                        </p>
                        <p className="text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    <ul className="space-y-3 ml-16">
                      {step.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className={`flex items-center space-x-3 transition-all duration-500 ${
                            visibleSteps.has(step.id)
                              ? "opacity-100 translate-x-0"
                              : "opacity-0 translate-x-4"
                          }`}
                          style={{
                            transitionDelay: `${featureIndex * 100 + 300}ms`,
                          }}
                        >
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Visual */}
                  <div
                    className={`${
                      index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""
                    }`}
                  >
                    <Card
                      className={`p-6 transition-all duration-700 hover:shadow-lg ${
                        visibleSteps.has(step.id)
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-95"
                      }`}
                    >
                      <CardContent className="p-0">{step.visual}</CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Hosting Platforms */}
        <section data-section="hosting" className="space-y-12">
          <div
            className={`text-center space-y-4 transition-all duration-700 ${
              visibleSections.has("hosting")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl font-bold text-foreground">
              Choose Your Platform
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select from our recommended hosting platforms. All offer free
              plans perfect for getting started.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hostingPlatforms.map((platform, index) => (
              <Card
                key={index}
                className={`p-6 hover:shadow-lg transition-all duration-700 relative group hover:scale-105 ${
                  visibleSections.has("hosting")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                } ${platform.recommended ? "ring-2 ring-primary/20" : ""}`}
                style={{ transitionDelay: `${index * 150 + 200}ms` }}
              >
                {platform.recommended && (
                  <div className="absolute -top-3 left-6 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                    <Star className="w-3 h-3 inline mr-1" />
                    Recommended
                  </div>
                )}

                <CardContent className="p-0 space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{platform.logo}</div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">
                        {platform.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {platform.description}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {platform.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center space-x-2 text-sm"
                      >
                        <CheckCircle className="w-3 h-3 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300"
                    onClick={() => window.open(platform.url, "_blank")}
                  >
                    Learn More
                    <ExternalLink className="w-3 h-3 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Stats */}
        <section
          data-section="stats"
          className={`py-12 transition-all duration-700 ${
            visibleSections.has("stats")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                {[
                  {
                    number: "15min",
                    label: "Average Setup Time",
                    icon: <Clock className="w-5 h-5" />,
                  },
                  {
                    number: "99.9%",
                    label: "Uptime Guarantee",
                    icon: <Shield className="w-5 h-5" />,
                  },
                  {
                    number: "1000+",
                    label: "Websites Launched",
                    icon: <Users className="w-5 h-5" />,
                  },
                  {
                    number: "24/7",
                    label: "Support Available",
                    icon: <HelpCircle className="w-5 h-5" />,
                  },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className={`space-y-2 transition-all duration-700 ${
                      visibleSections.has("stats")
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                    style={{ transitionDelay: `${index * 100 + 200}ms` }}
                  >
                    <div className="flex justify-center text-primary">
                      {stat.icon}
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      {stat.number}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* FAQ Section */}
        <section data-section="faq" className="space-y-12">
          <div
            className={`text-center space-y-4 transition-all duration-700 ${
              visibleSections.has("faq")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl font-bold text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about getting your website online
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqData.map((faq, index) => (
              <Card
                key={index}
                className={`transition-all duration-700 ${
                  visibleSections.has("faq")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
              >
                <CardContent className="p-0">
                  <button
                    className="w-full text-left p-6 flex items-center justify-between hover:bg-muted/20 transition-colors duration-200"
                    onClick={() =>
                      setActiveFaq(activeFaq === index ? null : index)
                    }
                  >
                    <span className="font-medium text-foreground">
                      {faq.question}
                    </span>
                    <div
                      className={`transition-transform duration-200 ${
                        activeFaq === index ? "rotate-45" : ""
                      }`}
                    >
                      <HelpCircle className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </button>
                  {activeFaq === index && (
                    <div className="px-6 pb-6">
                      <Separator className="mb-4" />
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section
          data-section="cta"
          className={`text-center space-y-8 py-12 transition-all duration-700 ${
            visibleSections.has("cta")
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-8 scale-95"
          }`}
        >
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">
              Ready to Launch Your Website?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of users who have successfully launched their
              websites using our templates and proven process.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="btn-premium"
              onClick={() => onNavigate("templates")}
            >
              <Rocket className="w-4 h-4 mr-2" />
              Browse Templates
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => onNavigate("custom-web")}
            >
              Get Custom Help
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            {[
              {
                icon: <CheckCircle className="w-4 h-4" />,
                text: "Money-back guarantee",
              },
              {
                icon: <CheckCircle className="w-4 h-4" />,
                text: "Lifetime updates",
              },
              {
                icon: <CheckCircle className="w-4 h-4" />,
                text: "24/7 support",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-center space-x-2">
                <div className="text-primary">{item.icon}</div>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
