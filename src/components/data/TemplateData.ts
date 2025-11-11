export interface Template {
  id: string;
  title: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  thumbnail: string;
  preview?: string;
  tags: string[];
  description: string;
  features: string[];
  demoUrl?: string;
  downloadSize?: string;
  lastUpdated?: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
  // New Gumroad integration fields
  gumroadUrl?: string;
  gumroadProductId?: string;
  // Optional fields used across pages
  downloads?: number;
  downloadUrl?: string;
  livePreview?: string;
  sourceCode?: string;
  documentation?: string;
  support?: boolean;
  estimatedTime?: string;
  technologies?: string[];
  isFeatured?: boolean;
  isPopular?: boolean;
  sales?: number;
}

export const templateCategories = [
  "All Templates",
  "Business",
  "Portfolio",
  "E-commerce",
  "Blog",
  "Landing Page",
  "Agency",
  "Restaurant",
  "Photography",
  "Real Estate",
  "Education",
  "Healthcare",
  "Technology",
  "Creative",
  "Non-profit",
];

// Export as 'categories' for compatibility with existing imports
export const categories = templateCategories;

export const templates: Template[] = [
  {
    id: "freelancer-portfolio",
    title: "Freelancer Portfolio Pro",
    category: "Portfolio",
    price: 49,
    originalPrice: 79,
    rating: 4.9,
    reviews: 234,
    thumbnail:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop",
    preview:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
    tags: ["Portfolio", "Freelancer", "Personal", "Creative"],
    description:
      "A stunning portfolio template designed for freelancers, creatives, and professionals who want to showcase their work beautifully.",
    features: [
      "Responsive design for all devices",
      "Dark/Light mode toggle",
      "Project gallery with filtering",
      "Contact form integration",
      "SEO optimized",
      "Fast loading animations",
      "Social media integration",
      "Blog section included",
    ],
    demoUrl: "https://demo.readytolaunch.com/freelancer-portfolio",
    downloadSize: "2.4 MB",
    lastUpdated: "2024-01-15",
    isNew: true,
    isBestSeller: true,
    difficulty: "Beginner",
    gumroadUrl: "https://readytolaunch.gumroad.com/l/obzmhr",
    gumroadProductId: "obzmhr",
  },
  {
    id: "tech-startup",
    title: "Tech Startup Landing",
    category: "Landing Page",
    price: 59,
    originalPrice: 89,
    rating: 4.8,
    reviews: 187,
    thumbnail:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop",
    preview:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
    tags: ["Tech", "Startup", "SaaS", "Landing Page"],
    description:
      "Perfect landing page template for tech startups, SaaS products, and digital agencies looking to convert visitors into customers.",
    features: [
      "Conversion-optimized layout",
      "Interactive pricing tables",
      "Feature showcase sections",
      "Testimonial carousel",
      "Newsletter signup",
      "Analytics integration ready",
      "A/B testing friendly",
      "Mobile-first approach",
    ],
    demoUrl: "https://demo.readytolaunch.com/tech-startup",
    downloadSize: "3.1 MB",
    lastUpdated: "2024-01-12",
    isBestSeller: true,
    difficulty: "Intermediate",
    gumroadUrl: "https://readytolaunch.gumroad.com/l/tech-startup",
    gumroadProductId: "tech-startup",
  },
  {
    id: "ecommerce-store",
    title: "E-commerce Powerhouse",
    category: "E-commerce",
    price: 79,
    originalPrice: 119,
    rating: 4.9,
    reviews: 156,
    thumbnail:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
    preview:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    tags: ["E-commerce", "Store", "Shopping", "Product"],
    description:
      "Complete e-commerce solution with shopping cart, product pages, checkout flow, and admin dashboard.",
    features: [
      "Shopping cart functionality",
      "Product catalog with search",
      "User account system",
      "Order management",
      "Payment integration ready",
      "Inventory tracking",
      "Admin dashboard",
      "Multi-currency support",
    ],
    demoUrl: "https://demo.readytolaunch.com/ecommerce-store",
    downloadSize: "5.2 MB",
    lastUpdated: "2024-01-10",
    difficulty: "Advanced",
    gumroadUrl: "https://readytolaunch.gumroad.com/l/ecommerce-pro",
    gumroadProductId: "ecommerce-pro",
  },
  {
    id: "business-corporate",
    title: "Corporate Business Suite",
    category: "Business",
    price: 69,
    originalPrice: 99,
    rating: 4.7,
    reviews: 203,
    thumbnail:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
    preview:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
    tags: ["Business", "Corporate", "Professional", "Company"],
    description:
      "Professional corporate website template perfect for businesses, consulting firms, and enterprise companies.",
    features: [
      "Multi-page structure",
      "Team member profiles",
      "Service showcase",
      "Case studies section",
      "Contact forms",
      "Newsletter integration",
      "Corporate blog",
      "Client testimonials",
    ],
    demoUrl: "https://demo.readytolaunch.com/business-corporate",
    downloadSize: "4.1 MB",
    lastUpdated: "2024-01-08",
    difficulty: "Intermediate",
    gumroadUrl: "https://readytolaunch.gumroad.com/l/corporate-suite",
    gumroadProductId: "corporate-suite",
  },
  {
    id: "photography-studio",
    title: "Photography Studio Pro",
    category: "Photography",
    price: 55,
    originalPrice: 85,
    rating: 4.8,
    reviews: 174,
    thumbnail:
      "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop",
    preview:
      "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&h=600&fit=crop",
    tags: ["Photography", "Studio", "Gallery", "Creative"],
    description:
      "Stunning photography portfolio template with gallery, booking system, and client portal.",
    features: [
      "Image gallery with lightbox",
      "Online booking system",
      "Client portal access",
      "Package pricing display",
      "Contact form with file upload",
      "Social media integration",
      "SEO optimized for images",
      "Fast image loading",
    ],
    demoUrl: "https://demo.readytolaunch.com/photography-studio",
    downloadSize: "3.8 MB",
    lastUpdated: "2024-01-06",
    isNew: true,
    difficulty: "Beginner",
    gumroadUrl: "https://readytolaunch.gumroad.com/l/photo-studio-pro",
    gumroadProductId: "photo-studio-pro",
  },
  {
    id: "restaurant-bistro",
    title: "Restaurant & Bistro",
    category: "Restaurant",
    price: 45,
    originalPrice: 75,
    rating: 4.6,
    reviews: 142,
    thumbnail:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
    preview:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
    tags: ["Restaurant", "Food", "Bistro", "Menu"],
    description:
      "Beautiful restaurant website with online menu, reservations, and food ordering system.",
    features: [
      "Digital menu with categories",
      "Online reservation system",
      "Table booking calendar",
      "Food delivery integration",
      "Chef and staff profiles",
      "Customer reviews section",
      "Location and hours",
      "Special events showcase",
    ],
    demoUrl: "https://demo.readytolaunch.com/restaurant-bistro",
    downloadSize: "3.5 MB",
    lastUpdated: "2024-01-04",
    difficulty: "Beginner",
    gumroadUrl: "https://readytolaunch.gumroad.com/l/restaurant-bistro",
    gumroadProductId: "restaurant-bistro",
  },
  {
    id: "creative-agency",
    title: "Creative Agency Hub",
    category: "Agency",
    price: 75,
    originalPrice: 105,
    rating: 4.9,
    reviews: 198,
    thumbnail:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    preview:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    tags: ["Agency", "Creative", "Design", "Marketing"],
    description:
      "Premium agency template showcasing services, portfolio, and team with stunning animations.",
    features: [
      "Service portfolio showcase",
      "Team member bios",
      "Project case studies",
      "Client testimonials",
      "Process workflow display",
      "Contact and quote forms",
      "Blog and insights section",
      "Award and recognition display",
    ],
    demoUrl: "https://demo.readytolaunch.com/creative-agency",
    downloadSize: "4.7 MB",
    lastUpdated: "2024-01-02",
    isBestSeller: true,
    difficulty: "Advanced",
    gumroadUrl: "https://readytolaunch.gumroad.com/l/creative-agency-hub",
    gumroadProductId: "creative-agency-hub",
  },
  {
    id: "blog-magazine",
    title: "Blog & Magazine Pro",
    category: "Blog",
    price: 39,
    originalPrice: 69,
    rating: 4.5,
    reviews: 267,
    thumbnail:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop",
    preview:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop",
    tags: ["Blog", "Magazine", "News", "Content"],
    description:
      "Feature-rich blog and magazine template with multiple layouts and content management.",
    features: [
      "Multiple post layouts",
      "Category and tag system",
      "Author profiles",
      "Comment system",
      "Newsletter signup",
      "Social sharing buttons",
      "Search functionality",
      "Related posts display",
    ],
    demoUrl: "https://demo.readytolaunch.com/blog-magazine",
    downloadSize: "2.9 MB",
    lastUpdated: "2023-12-28",
    difficulty: "Beginner",
    gumroadUrl: "https://readytolaunch.gumroad.com/l/blog-magazine-pro",
    gumroadProductId: "blog-magazine-pro",
  },
];

// Store templates in localStorage for persistence
let storedTemplates: Template[] = [];

// Initialize templates from localStorage or use default
const initializeTemplates = () => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("customTemplates");
    if (stored) {
      try {
        const customTemplates = JSON.parse(stored);
        storedTemplates = [...templates, ...customTemplates];
      } catch (error) {
        console.error("Error parsing stored templates:", error);
        storedTemplates = templates;
      }
    } else {
      storedTemplates = templates;
    }
  } else {
    storedTemplates = templates;
  }
};

// Call initialization
initializeTemplates();

// Core template management functions
export function getTemplateById(id: string): Template | null {
  return getAllTemplates().find((template) => template.id === id) || null;
}

export function getTemplatesByCategory(category: string): Template[] {
  const allTemplates = getAllTemplates();
  if (category === "All Templates") {
    return allTemplates;
  }
  return allTemplates.filter((template) => template.category === category);
}

export function getAllTemplates(): Template[] {
  // Re-initialize to get latest data
  initializeTemplates();
  return storedTemplates;
}

export function getFeaturedTemplates(): Template[] {
  return getAllTemplates()
    .filter((template) => template.isBestSeller || template.isNew)
    .slice(0, 6);
}

export function getNewTemplates(): Template[] {
  return getAllTemplates().filter((template) => template.isNew);
}

export function getBestSellerTemplates(): Template[] {
  return getAllTemplates().filter((template) => template.isBestSeller);
}

// Admin functions for template management
export function addTemplate(template: Template): boolean {
  try {
    if (typeof window === "undefined") return false;

    // Get current custom templates
    const stored = localStorage.getItem("customTemplates");
    let customTemplates: Template[] = [];

    if (stored) {
      customTemplates = JSON.parse(stored);
    }

    // Add new template
    customTemplates.push(template);

    // Save to localStorage
    localStorage.setItem("customTemplates", JSON.stringify(customTemplates));

    // Update in-memory storage
    storedTemplates = [...templates, ...customTemplates];

    return true;
  } catch (error) {
    console.error("Error adding template:", error);
    return false;
  }
}

export function deleteTemplate(templateId: string): boolean {
  try {
    if (typeof window === "undefined") return false;

    // Check if it's a default template (cannot be deleted)
    const isDefaultTemplate = templates.some((t) => t.id === templateId);
    if (isDefaultTemplate) {
      console.warn("Cannot delete default template");
      return false;
    }

    // Get current custom templates
    const stored = localStorage.getItem("customTemplates");
    if (!stored) return false;

    let customTemplates: Template[] = JSON.parse(stored);

    // Remove template
    customTemplates = customTemplates.filter((t) => t.id !== templateId);

    // Save to localStorage
    localStorage.setItem("customTemplates", JSON.stringify(customTemplates));

    // Update in-memory storage
    storedTemplates = [...templates, ...customTemplates];

    return true;
  } catch (error) {
    console.error("Error deleting template:", error);
    return false;
  }
}

export function updateTemplate(
  templateId: string,
  updatedTemplate: Partial<Template>
): boolean {
  try {
    if (typeof window === "undefined") return false;

    // Get current custom templates
    const stored = localStorage.getItem("customTemplates");
    if (!stored) return false;

    let customTemplates: Template[] = JSON.parse(stored);

    // Find and update template
    const templateIndex = customTemplates.findIndex((t) => t.id === templateId);
    if (templateIndex === -1) return false;

    customTemplates[templateIndex] = {
      ...customTemplates[templateIndex],
      ...updatedTemplate,
    };

    // Save to localStorage
    localStorage.setItem("customTemplates", JSON.stringify(customTemplates));

    // Update in-memory storage
    storedTemplates = [...templates, ...customTemplates];

    return true;
  } catch (error) {
    console.error("Error updating template:", error);
    return false;
  }
}

// Utility functions
export function getTemplateGumroadUrl(templateId: string): string | null {
  const template = getTemplateById(templateId);
  return template?.gumroadUrl || null;
}

export function formatPrice(price: number): string {
  return `$${price}`;
}

export function searchTemplates(query: string): Template[] {
  if (!query.trim()) return getAllTemplates();

  const searchTerm = query.toLowerCase();
  return getAllTemplates().filter(
    (template) =>
      template.title.toLowerCase().includes(searchTerm) ||
      template.description.toLowerCase().includes(searchTerm) ||
      template.category.toLowerCase().includes(searchTerm) ||
      template.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
  );
}

export function getTemplateStats() {
  const allTemplates = getAllTemplates();
  return {
    total: allTemplates.length,
    categories: Array.from(new Set(allTemplates.map((t) => t.category))).length,
    averagePrice: Math.round(
      allTemplates.reduce((sum, t) => sum + t.price, 0) / allTemplates.length
    ),
    averageRating:
      Math.round(
        (allTemplates.reduce((sum, t) => sum + t.rating, 0) /
          allTemplates.length) *
          10
      ) / 10,
  };
}

// Generate unique ID for new templates
export function generateTemplateId(): string {
  return `template-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Validate template data
export function validateTemplate(template: Partial<Template>): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!template.title?.trim()) errors.push("Title is required");
  if (!template.category?.trim()) errors.push("Category is required");
  if (!template.description?.trim()) errors.push("Description is required");
  if (!template.price || template.price <= 0)
    errors.push("Valid price is required");
  if (!template.thumbnail?.trim()) errors.push("Thumbnail image is required");
  if (!template.features?.length)
    errors.push("At least one feature is required");
  if (!template.tags?.length) errors.push("At least one tag is required");

  return {
    valid: errors.length === 0,
    errors,
  };
}

// Clear all custom templates (admin function)
export function clearCustomTemplates(): boolean {
  try {
    if (typeof window === "undefined") return false;

    localStorage.removeItem("customTemplates");
    storedTemplates = templates;

    return true;
  } catch (error) {
    console.error("Error clearing custom templates:", error);
    return false;
  }
}

// Export default data for backup
export function exportTemplateData(): string {
  return JSON.stringify(
    {
      defaultTemplates: templates,
      customTemplates: JSON.parse(
        localStorage.getItem("customTemplates") || "[]"
      ),
      exportDate: new Date().toISOString(),
    },
    null,
    2
  );
}

// Import template data (admin function)
export function importTemplateData(data: string): boolean {
  try {
    if (typeof window === "undefined") return false;

    const parsed = JSON.parse(data);
    if (parsed.customTemplates && Array.isArray(parsed.customTemplates)) {
      localStorage.setItem(
        "customTemplates",
        JSON.stringify(parsed.customTemplates)
      );
      storedTemplates = [...templates, ...parsed.customTemplates];
      return true;
    }

    return false;
  } catch (error) {
    console.error("Error importing template data:", error);
    return false;
  }
}

// Filter templates function for TemplatesPage compatibility
export function filterTemplates(
  templateList: Template[],
  filters: {
    category?: string;
    search?: string;
    priceRange?: [number, number];
    rating?: number;
    tags?: string[];
    difficulty?: string;
  }
): Template[] {
  let filtered = [...templateList];

  // Filter by category
  if (filters.category && filters.category !== "All Templates") {
    filtered = filtered.filter(
      (template) => template.category === filters.category
    );
  }

  // Filter by search term
  if (filters.search && filters.search.trim()) {
    const searchTerm = filters.search.toLowerCase();
    filtered = filtered.filter(
      (template) =>
        template.title.toLowerCase().includes(searchTerm) ||
        template.description.toLowerCase().includes(searchTerm) ||
        template.category.toLowerCase().includes(searchTerm) ||
        template.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
    );
  }

  // Filter by price range
  if (filters.priceRange) {
    const [minPrice, maxPrice] = filters.priceRange;
    filtered = filtered.filter(
      (template) => template.price >= minPrice && template.price <= maxPrice
    );
  }

  // Filter by tags
  if (filters.tags && filters.tags.length > 0) {
    filtered = filtered.filter((template) =>
      filters.tags!.some((filterTag) =>
        template.tags.some((templateTag) =>
          templateTag.toLowerCase().includes(filterTag.toLowerCase())
        )
      )
    );
  }

  // Filter by difficulty
  if (filters.difficulty && filters.difficulty !== "All") {
    filtered = filtered.filter(
      (template) => template.difficulty === filters.difficulty
    );
  }

  return filtered;
}
