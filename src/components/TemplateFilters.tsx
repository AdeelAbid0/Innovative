import { Search, X } from "lucide-react";
import { categories, getAllTemplates } from "./data/TemplateData";

interface TemplateFiltersProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredCount: number;
}

export function TemplateFilters({
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  filteredCount,
}: TemplateFiltersProps) {
  const allTemplates = getAllTemplates();

  // Get count for each category
  const getCategoryCount = (category: string) => {
    if (category === "All") {
      return allTemplates.length;
    }
    return allTemplates.filter((template) => template.category === category)
      .length;
  };

  return (
    <div className="space-y-6">
      {/* Category Filters - Simple horizontal scroll */}
      <div className="w-full">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 pb-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`
                  flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                  whitespace-nowrap min-w-fit
                  ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-card text-muted-foreground hover:text-foreground hover:bg-card/80"
                  }
                `}
              >
                {category}
                <span
                  className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                    selectedCategory === category
                      ? "bg-primary-foreground/20"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  {getCategoryCount(category)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Simplified Controls Row - Only show results count and clear filters */}
      <div className="flex items-center justify-center gap-4">
        {/* Results count */}
        <div className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{filteredCount}</span>{" "}
          templates
          {searchQuery && (
            <span className="ml-2 inline-flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
              "{searchQuery}"
              <button
                onClick={() => setSearchQuery("")}
                className="hover:bg-primary/20 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>

        {/* Clear all filters */}
        {(searchQuery || selectedCategory !== "All") && (
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="text-xs text-primary hover:text-primary/80 font-medium"
          >
            Clear all
          </button>
        )}
      </div>
    </div>
  );
}

export function TemplateSearch({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="search-container relative bg-[#3a3a3a] rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex items-center px-6 py-4">
          {/* Search Icon - Gray color on left */}
          <Search className="w-5 h-5 text-[#888888] mr-4 flex-shrink-0" />

          {/* Search Input - Full width with proper styling */}
          <input
            type="text"
            placeholder="Search projects or technologies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input flex-1 bg-transparent border-0 text-white text-base placeholder:text-[#888888] focus:ring-0 focus:outline-none w-full"
          />
        </div>
      </div>
    </div>
  );
}
