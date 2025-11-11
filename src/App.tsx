import { useState, Suspense, lazy } from "react";
import { ErrorBoundary } from "./components/ErrorBoundary";

// Optimized lazy loading - load only when needed
const HomePage = lazy(() =>
  import("./components/pages/HomePage").then((m) => ({ default: m.HomePage }))
);
const CaseStudyPage = lazy(() =>
  import("./components/pages/CaseStudyPage").then((m) => ({
    default: m.CaseStudyPage,
  }))
);

// Load critical components immediately to avoid layout shift
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ScrollProgress } from "./components/ScrollProgress";
import { GumroadIntegration } from "./components/GumroadIntegration";
import { BackToTop } from "./components/BackToTop";

// Minimal loading fallback
const LoadingFallback = () => (
  <div className="fixed inset-0 bg-[#212121] flex items-center justify-center z-50">
    <div className="w-6 h-6 border-2 border-[#0CE421] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

type Page =
  | "home"
  | "about"
  | "services"
  | "work"
  | "contact"
  | "thank-you"
  | "case-study";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<any>(null);

  const handleNavigation = (page: Page, caseStudy?: any) => {
    if (page === "thank-you" || page === "case-study") {
      // Navigate to separate pages
      setCurrentPage(page);
      if (page === "case-study" && caseStudy) {
        setSelectedCaseStudy(caseStudy);
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // For all other navigation, stay on home page and scroll to sections
      setCurrentPage("home");
      setSelectedCaseStudy(null);

      // Scroll to the appropriate section
      if (page === "home") {
        document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
      } else if (page === "services") {
        document
          .getElementById("services")
          ?.scrollIntoView({ behavior: "smooth" });
      } else if (page === "work") {
        document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
      } else if (page === "about") {
        document
          .getElementById("about")
          ?.scrollIntoView({ behavior: "smooth" });
      } else if (page === "contact") {
        document
          .getElementById("contact")
          ?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case "case-study":
        return (
          <CaseStudyPage
            caseStudy={selectedCaseStudy}
            onNavigate={handleNavigation}
          />
        );
      default:
        return <HomePage onNavigate={handleNavigation} />;
    }
  };

  return (
    <ErrorBoundary>
      <div className="dark min-h-screen bg-[#212121] flex flex-col relative">
        {/* Gumroad Integration - Loads the script globally */}
        <GumroadIntegration />

        {/* Scroll Progress Indicator */}
        <ScrollProgress />

        {/* STICKY HEADER - Main navigation that sticks at top when scrolling */}
        <Navbar currentPage={currentPage} onNavigate={handleNavigation} />

        {/* Main Content - Proper spacing for sticky header */}
        <main className="flex-1 relative z-10">
          <Suspense fallback={<LoadingFallback />}>{renderPage()}</Suspense>
        </main>

        {/* Footer - Only show on home page */}
        {currentPage === "home" && <Footer onNavigate={handleNavigation} />}

        {/* Back to Top Button - Shows on all pages */}
        <BackToTop />
      </div>
    </ErrorBoundary>
  );
}
