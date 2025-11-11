import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import {
  ArrowLeft,
  Star,
  Calendar,
  Users,
  Building,
  Target,
  TrendingUp,
  Globe,
  Zap,
  ExternalLink,
  Award,
  Lightbulb,
} from "lucide-react";

type Page =
  | "home"
  | "about"
  | "services"
  | "work"
  | "contact"
  | "thank-you"
  | "case-study";

interface CaseStudyPageProps {
  caseStudy: any;
  onNavigate: (page: Page) => void;
}

// Professional case study images
const caseStudyImages = {
  1: "https://images.unsplash.com/photo-1658297063569-162817482fb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBvbmxpbmUlMjBzaG9wcGluZyUyMHdlYnNpdGV8ZW58MXx8fHwxNzU3OTMyMjk2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  2: "https://images.unsplash.com/photo-1747224317356-6dd1a4a078fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwbWVkaWNhbCUyMHRlY2hub2xvZ3klMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzU3OTMyMzAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  3: "https://images.unsplash.com/photo-1642055509518-adafcad1d22e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW50ZWNoJTIwYmFua2luZyUyMG1vYmlsZSUyMGFwcHxlbnwxfHx8fDE3NTc4NTQzODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
};

export function CaseStudyPage({ caseStudy, onNavigate }: CaseStudyPageProps) {
  if (!caseStudy) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Case Study Not Found
          </h2>
          <Button
            onClick={() => onNavigate("home")}
            className="bg-primary hover:bg-primary/90"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Back Navigation */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-xl border-b border-border shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              onClick={() => onNavigate("home")}
              variant="ghost"
              className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
              Back to Portfolio
            </Button>

            {/* Project Title in Navigation */}
            <div className="hidden md:block">
              <Badge
                variant="outline"
                className="bg-primary/10 text-primary border-primary/30"
              >
                {caseStudy.title}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content Column */}
            <div className="space-y-6">
              <Badge className="bg-primary/20 text-primary border-primary/30 px-4 py-2">
                <Building className="w-4 h-4 mr-2" />
                {caseStudy.industry}
              </Badge>

              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
                  {caseStudy.title}
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {caseStudy.subtitle}
                </p>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-4">
                {caseStudy.results.metrics.map((metric: any, index: number) => (
                  <div
                    key={index}
                    className="text-center p-4 bg-card/50 rounded-xl border border-border/50"
                  >
                    <div className="text-2xl font-bold text-primary mb-1">
                      {metric.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Column */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src={
                    caseStudyImages[
                      caseStudy.id as keyof typeof caseStudyImages
                    ]
                  }
                  alt={caseStudy.title}
                  className="w-full h-96 object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
            {/* Project Info Cards */}
            <Card className="p-6 text-center bg-card border border-border/50">
              <Calendar className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-sm text-muted-foreground mb-1">Timeline</div>
              <div className="font-semibold text-foreground">
                {caseStudy.timeline}
              </div>
            </Card>

            <Card className="p-6 text-center bg-card border border-border/50">
              <Users className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-sm text-muted-foreground mb-1">
                Team Size
              </div>
              <div className="font-semibold text-foreground">
                {caseStudy.teamSize}
              </div>
            </Card>

            <Card className="p-6 text-center bg-card border border-border/50">
              <Building className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-sm text-muted-foreground mb-1">Industry</div>
              <div className="font-semibold text-foreground">
                {caseStudy.industry}
              </div>
            </Card>

            <Card className="p-6 text-center bg-card border border-border/50">
              <Award className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-sm text-muted-foreground mb-1">Status</div>
              <div className="font-semibold text-foreground">Completed</div>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Content Column */}
            <div className="lg:col-span-2 space-y-12">
              {/* Challenge Section */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">
                      The Challenge
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Understanding the problem
                    </p>
                  </div>
                </div>
                <Card className="p-8 bg-card border border-border/50">
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {caseStudy.challenge}
                  </p>
                </Card>
              </div>

              {/* Solution Section */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">
                      Our Solution
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      How we solved it
                    </p>
                  </div>
                </div>
                <Card className="p-8 bg-card border border-border/50">
                  <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                    {caseStudy.solution}
                  </p>

                  {/* Technologies */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">
                      Technologies Used
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {caseStudy.technologies.map(
                        (tech: string, index: number) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2 p-3 bg-muted/50 rounded-lg border border-border/30"
                          >
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span className="text-foreground font-medium text-sm">
                              {tech}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </Card>
              </div>

              {/* Results Section */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">
                      Results & Impact
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Measurable outcomes
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {caseStudy.results.metrics.map(
                    (metric: any, index: number) => (
                      <Card
                        key={index}
                        className="p-6 text-center bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20"
                      >
                        <div className="text-3xl font-bold text-primary mb-2">
                          {metric.value}
                        </div>
                        <div className="text-sm font-medium text-foreground mb-1">
                          {metric.label}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Within first quarter
                        </div>
                      </Card>
                    )
                  )}
                </div>

                {/* Client Testimonial */}
                <Card className="p-8 bg-gradient-to-r from-muted/50 to-muted/30 border border-border/50">
                  <div className="text-center">
                    <div className="flex justify-center mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-yellow-500 fill-current"
                        />
                      ))}
                    </div>
                    <blockquote className="text-lg text-foreground italic mb-6 leading-relaxed">
                      "{caseStudy.results.quote}"
                    </blockquote>
                    <div className="space-y-1">
                      <div className="font-bold text-foreground">
                        {caseStudy.results.author}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {caseStudy.results.role}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Project Details Sidebar */}
              <Card className="p-6 bg-card border border-border/50 sticky top-32">
                <h3 className="text-lg font-bold text-foreground mb-6">
                  Project Details
                </h3>

                <div className="space-y-6">
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">
                      Industry
                    </div>
                    <div className="text-foreground font-medium">
                      {caseStudy.industry}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground mb-2">
                      Duration
                    </div>
                    <div className="text-foreground font-medium">
                      {caseStudy.timeline}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground mb-2">
                      Team
                    </div>
                    <div className="text-foreground font-medium">
                      {caseStudy.teamSize}
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <h4 className="font-semibold text-foreground mb-3">
                    Interested in Similar Results?
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Let's discuss how we can help your business achieve similar
                    success.
                  </p>
                  <Button
                    onClick={() => {
                      onNavigate("home");
                      setTimeout(() => {
                        document
                          .getElementById("contact")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }, 100);
                    }}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Start Your Project
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>

              {/* Quick Stats */}
              <Card className="p-6 bg-card border border-border/50">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  Quick Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Client Satisfaction
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      100%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Project Complexity
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      High
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Delivery
                    </span>
                    <span className="text-sm font-semibold text-primary">
                      On Time
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help you achieve similar results and
            transform your business operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              onClick={() => {
                onNavigate("home");
                setTimeout(() => {
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3"
            >
              <Zap className="w-4 h-4 mr-2" />
              Get Started Today
            </Button>
            <Button
              onClick={() => {
                onNavigate("home");
                setTimeout(() => {
                  document
                    .getElementById("work")
                    ?.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
              variant="outline"
              className="px-8 py-3"
            >
              <Globe className="w-4 h-4 mr-2" />
              View More Projects
            </Button>
          </div>

          {/* Bottom Back Button */}
          <div className="border-t border-border pt-8">
            <Button
              onClick={() => onNavigate("home")}
              variant="ghost"
              className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
              Back to Portfolio
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
