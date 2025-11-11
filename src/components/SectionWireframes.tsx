import {
  Monitor,
  User,
  Grid3x3,
  Briefcase,
  BookOpen,
  Mail,
  Globe,
  Star,
  Menu,
  Search,
  Play,
  Heart,
  ShoppingCart,
  MapPin,
  Phone,
  Calendar,
  Users,
  Settings,
} from "lucide-react";

interface WireframeProps {
  sectionType: string;
  isActive?: boolean;
}

export function SectionWireframe({
  sectionType,
  isActive = false,
}: WireframeProps) {
  const getWireframeContent = () => {
    // Consistent minimal styling for all wireframes
    const baseClasses = `relative w-full h-full bg-card rounded-lg overflow-hidden transition-all duration-300 ${
      isActive ? "scale-105 ring-2 ring-primary/20" : ""
    }`;
    const contentPadding = "p-4 h-full";
    const elementBg = "bg-muted";
    const elementBgSecondary = "bg-muted/60";
    const accentBg = "bg-primary/20";

    switch (sectionType) {
      case "Hero Section":
        return (
          <div className={baseClasses}>
            <div className={contentPadding}>
              {/* Navigation bar */}
              <div className="flex items-center justify-between mb-4">
                <div className={`w-6 h-2 ${accentBg} rounded-sm`}></div>
                <div className="flex gap-1">
                  <div className={`w-4 h-1 ${elementBg} rounded`}></div>
                  <div className={`w-4 h-1 ${elementBg} rounded`}></div>
                  <div className={`w-4 h-1 ${elementBg} rounded`}></div>
                </div>
                <Menu className="w-2 h-2 text-muted-foreground" />
              </div>

              {/* Hero content */}
              <div className="text-center space-y-2">
                <div className={`w-12 h-2 ${elementBg} rounded mx-auto`}></div>
                <div className={`w-8 h-2 ${accentBg} rounded mx-auto`}></div>
                <div
                  className={`w-16 h-1 ${elementBgSecondary} rounded mx-auto`}
                ></div>

                {/* CTA buttons */}
                <div className="flex gap-1 justify-center mt-3">
                  <div className={`w-6 h-2 ${accentBg} rounded-full`}></div>
                  <div className={`w-6 h-2 ${elementBg} rounded-full`}></div>
                </div>

                {/* Hero image placeholder */}
                <div
                  className={`w-full h-6 ${elementBgSecondary} rounded mt-3 flex items-center justify-center`}
                >
                  <Monitor className="w-3 h-3 text-muted-foreground" />
                </div>
              </div>
            </div>
          </div>
        );

      case "About Me":
      case "About Us":
      case "About Author":
      case "About Restaurant":
        return (
          <div className={baseClasses}>
            <div className={contentPadding}>
              <div className="flex items-start gap-2">
                {/* Profile image */}
                <div
                  className={`w-6 h-6 ${accentBg} rounded-full flex items-center justify-center flex-shrink-0`}
                >
                  <User className="w-3 h-3 text-primary" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className={`w-8 h-1.5 ${accentBg} rounded mb-2`}></div>
                  <div className="space-y-1 mb-2">
                    <div className={`w-full h-1 ${elementBg} rounded`}></div>
                    <div className={`w-3/4 h-1 ${elementBg} rounded`}></div>
                    <div className={`w-2/3 h-1 ${elementBg} rounded`}></div>
                  </div>

                  {/* Tags */}
                  <div className="flex gap-1 mb-2">
                    <div
                      className={`w-4 h-1 ${elementBgSecondary} rounded`}
                    ></div>
                    <div
                      className={`w-3 h-1 ${elementBgSecondary} rounded`}
                    ></div>
                    <div
                      className={`w-4 h-1 ${elementBgSecondary} rounded`}
                    ></div>
                  </div>

                  {/* Stats */}
                  <div className="flex gap-2">
                    <div className="text-center">
                      <div className={`w-2 h-1 ${accentBg} rounded mb-1`}></div>
                      <div
                        className={`w-3 h-0.5 ${elementBgSecondary} rounded`}
                      ></div>
                    </div>
                    <div className="text-center">
                      <div className={`w-2 h-1 ${accentBg} rounded mb-1`}></div>
                      <div
                        className={`w-3 h-0.5 ${elementBgSecondary} rounded`}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "Portfolio Gallery":
      case "Portfolio":
      case "Photo Gallery":
        return (
          <div className={baseClasses}>
            <div className="p-3 h-full">
              {/* Header */}
              <div className="flex items-center justify-between mb-2">
                <div className={`w-6 h-1.5 ${accentBg} rounded`}></div>
                <div className="flex gap-0.5">
                  <div className={`w-1 h-1 ${elementBg} rounded-full`}></div>
                  <div className={`w-1 h-1 ${elementBg} rounded-full`}></div>
                  <div className={`w-1 h-1 ${elementBg} rounded-full`}></div>
                </div>
              </div>

              {/* Gallery grid - Fixed spacing and sizing */}
              <div className="grid grid-cols-3 gap-0.5">
                {[1, 2, 3, 4, 5, 6].map((item, index) => (
                  <div
                    key={item}
                    className={`w-full h-4 ${
                      index < 3 ? elementBg : elementBgSecondary
                    } rounded relative overflow-hidden`}
                  >
                    {index < 3 && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Grid3x3 className="w-1.5 h-1.5 text-muted-foreground" />
                      </div>
                    )}
                    {index === 0 && (
                      <div className="absolute top-0.5 right-0.5">
                        <Heart className="w-1 h-1 text-primary" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "Services":
        return (
          <div className={baseClasses}>
            <div className={contentPadding}>
              <div className={`w-6 h-1.5 ${accentBg} rounded mb-3`}></div>

              {/* Services list */}
              <div className="space-y-2">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className={`flex items-center gap-2 p-1.5 ${elementBgSecondary} rounded`}
                  >
                    <div
                      className={`w-3 h-3 ${accentBg} rounded flex items-center justify-center`}
                    >
                      <Briefcase className="w-1.5 h-1.5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div
                        className={`w-8 h-1 ${elementBg} rounded mb-0.5`}
                      ></div>
                      <div
                        className={`w-6 h-0.5 ${elementBgSecondary} rounded`}
                      ></div>
                    </div>
                    <div className={`w-3 h-1 ${accentBg} rounded`}></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "Team":
        return (
          <div className={baseClasses}>
            <div className={contentPadding}>
              <div className={`w-6 h-1.5 ${accentBg} rounded mb-3`}></div>

              {/* Team members */}
              <div className="grid grid-cols-2 gap-2">
                {[1, 2, 3, 4].map((member) => (
                  <div key={member} className="text-center">
                    <div
                      className={`w-4 h-4 ${accentBg} rounded-full mx-auto mb-1 flex items-center justify-center`}
                    >
                      <Users className="w-2 h-2 text-primary" />
                    </div>
                    <div
                      className={`w-6 h-0.5 ${elementBg} rounded mx-auto mb-0.5`}
                    ></div>
                    <div
                      className={`w-4 h-0.5 ${elementBgSecondary} rounded mx-auto`}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "Testimonials":
        return (
          <div className={baseClasses}>
            <div className={contentPadding}>
              <div className={`w-6 h-1.5 ${accentBg} rounded mb-3`}></div>

              {/* Testimonial card */}
              <div className={`${elementBgSecondary} rounded p-2 mb-2`}>
                <div className="flex gap-0.5 mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-1 h-1 text-primary fill-current"
                    />
                  ))}
                </div>
                <div className="space-y-1 mb-2">
                  <div className={`w-full h-0.5 ${elementBg} rounded`}></div>
                  <div className={`w-3/4 h-0.5 ${elementBg} rounded`}></div>
                </div>
                <div className="flex items-center gap-1">
                  <div className={`w-3 h-3 ${accentBg} rounded-full`}></div>
                  <div>
                    <div
                      className={`w-6 h-0.5 ${elementBg} rounded mb-0.5`}
                    ></div>
                    <div
                      className={`w-4 h-0.5 ${elementBgSecondary} rounded`}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Navigation dots */}
              <div className="flex justify-center gap-1">
                <div className={`w-1 h-1 ${accentBg} rounded-full`}></div>
                <div className={`w-1 h-1 ${elementBg} rounded-full`}></div>
                <div className={`w-1 h-1 ${elementBg} rounded-full`}></div>
              </div>
            </div>
          </div>
        );

      case "Blog":
      case "Blog Posts":
        return (
          <div className={baseClasses}>
            <div className={contentPadding}>
              <div className={`w-6 h-1.5 ${accentBg} rounded mb-3`}></div>

              {/* Blog posts */}
              <div className="space-y-2">
                {[1, 2].map((post) => (
                  <div key={post} className="flex gap-2">
                    <div
                      className={`w-4 h-4 ${accentBg} rounded flex items-center justify-center`}
                    >
                      <BookOpen className="w-2 h-2 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div
                        className={`w-8 h-1 ${elementBg} rounded mb-0.5`}
                      ></div>
                      <div
                        className={`w-6 h-0.5 ${elementBgSecondary} rounded mb-1`}
                      ></div>
                      <div className="flex items-center gap-0.5">
                        <Calendar className="w-1 h-1 text-muted-foreground" />
                        <div
                          className={`w-3 h-0.5 ${elementBgSecondary} rounded`}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "Contact Form":
      case "Contact":
        return (
          <div className={baseClasses}>
            <div className={contentPadding}>
              <div className={`w-6 h-1.5 ${accentBg} rounded mb-3`}></div>

              {/* Form fields */}
              <div className="space-y-1.5">
                <div
                  className={`w-full h-2 ${elementBgSecondary} rounded`}
                ></div>
                <div
                  className={`w-full h-2 ${elementBgSecondary} rounded`}
                ></div>
                <div
                  className={`w-full h-4 ${elementBgSecondary} rounded`}
                ></div>

                {/* Submit button */}
                <div className="flex justify-end mt-2">
                  <div
                    className={`w-6 h-2 ${accentBg} rounded flex items-center justify-center`}
                  >
                    <Mail className="w-1.5 h-1.5 text-primary" />
                  </div>
                </div>
              </div>

              {/* Contact info */}
              <div className="mt-2 space-y-1">
                <div className="flex items-center gap-1">
                  <Phone className="w-1 h-1 text-primary" />
                  <div
                    className={`w-4 h-0.5 ${elementBgSecondary} rounded`}
                  ></div>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-1 h-1 text-primary" />
                  <div
                    className={`w-6 h-0.5 ${elementBgSecondary} rounded`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        );

      case "Footer":
        return (
          <div className={baseClasses}>
            <div className={contentPadding}>
              {/* Footer content */}
              <div className="grid grid-cols-3 gap-2 h-full">
                {/* Logo & Links */}
                <div>
                  <div className={`w-4 h-1 ${accentBg} rounded mb-1`}></div>
                  <div className="space-y-0.5">
                    <div className={`w-6 h-0.5 ${elementBg} rounded`}></div>
                    <div className={`w-4 h-0.5 ${elementBg} rounded`}></div>
                    <div className={`w-5 h-0.5 ${elementBg} rounded`}></div>
                  </div>
                </div>

                {/* Social Links */}
                <div>
                  <div className={`w-6 h-1 ${elementBg} rounded mb-1`}></div>
                  <div className="flex gap-0.5">
                    <div className={`w-1.5 h-1.5 ${accentBg} rounded`}></div>
                    <div className={`w-1.5 h-1.5 ${accentBg} rounded`}></div>
                    <div className={`w-1.5 h-1.5 ${accentBg} rounded`}></div>
                  </div>
                </div>

                {/* Newsletter */}
                <div>
                  <div className={`w-4 h-1 ${elementBg} rounded mb-1`}></div>
                  <div
                    className={`w-full h-1.5 ${elementBgSecondary} rounded`}
                  ></div>
                </div>
              </div>

              {/* Bottom bar */}
              <div
                className={`absolute bottom-1 left-1 right-1 h-0.5 ${elementBgSecondary} rounded`}
              ></div>
            </div>
          </div>
        );

      // All other sections use the same minimal template
      case "Homepage":
      case "Product Catalog":
      case "Product Details":
      case "Shopping Cart":
      case "Checkout":
      case "Categories":
      case "Menu Categories":
      case "Search Results":
      case "Newsletter":
      case "Archive":
      case "Reservations":
      case "Location & Hours":
      case "Features":
      case "Pricing":
      case "FAQ":
      case "Demo":
      case "Signup":
      case "User Account":
      case "Order History":
      case "Admin Panel":
        return (
          <div className={baseClasses}>
            <div className={contentPadding}>
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className={`w-6 h-1.5 ${accentBg} rounded`}></div>
                {sectionType.includes("Shopping") ||
                sectionType.includes("Product") ? (
                  <ShoppingCart className="w-2 h-2 text-primary" />
                ) : sectionType.includes("Search") ? (
                  <Search className="w-2 h-2 text-primary" />
                ) : sectionType.includes("Demo") ? (
                  <Play className="w-2 h-2 text-primary" />
                ) : sectionType.includes("Admin") ||
                  sectionType.includes("Settings") ? (
                  <Settings className="w-2 h-2 text-primary" />
                ) : (
                  <Globe className="w-2 h-2 text-primary" />
                )}
              </div>

              {/* Content area */}
              <div className="space-y-2">
                <div
                  className={`w-full h-4 ${elementBgSecondary} rounded`}
                ></div>
                <div className="grid grid-cols-2 gap-1">
                  <div className={`h-3 ${elementBg} rounded`}></div>
                  <div className={`h-3 ${elementBg} rounded`}></div>
                </div>
                <div
                  className={`w-3/4 h-1 ${elementBgSecondary} rounded`}
                ></div>
              </div>

              {/* Action area */}
              <div className="flex justify-between items-center mt-3">
                <div className={`w-4 h-1 ${elementBgSecondary} rounded`}></div>
                <div className={`w-6 h-1.5 ${accentBg} rounded`}></div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className={baseClasses}>
            <div
              className={`${contentPadding} flex items-center justify-center`}
            >
              <Globe className="w-6 h-6 text-muted-foreground" />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="relative group">
      {/* Subtle glow effect for active state */}
      {isActive && (
        <div className="absolute inset-0 bg-primary/10 rounded-lg blur-sm scale-110"></div>
      )}

      {/* Wireframe content */}
      <div className="relative z-10">{getWireframeContent()}</div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg"></div>

      {/* Section label */}
      <div className="absolute bottom-1 left-1 right-1">
        <div className="bg-background/90 backdrop-blur-sm text-foreground text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-border/50">
          {sectionType}
        </div>
      </div>
    </div>
  );
}
