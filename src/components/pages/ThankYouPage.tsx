import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import {
  Download,
  CheckCircle,
  Star,
  Gift,
  Trophy,
  FileText,
  ArrowRight,
  Sparkles,
  Rocket,
  Heart,
  Mail,
  Shield,
} from "lucide-react";

type Page =
  | "home"
  | "templates"
  | "template-detail"
  | "how-to-launch"
  | "custom-web"
  | "thank-you"
  | "checkout"
  | "order-success";

interface ThankYouPageProps {
  onNavigate: (page: Page) => void;
}

interface SparkleEffect {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
  type: "sparkle" | "star" | "heart" | "trophy";
}

// Simple demo mode check - always returns true for this demo
const isDemoMode = () => true;

// Simple server URL - not used in demo mode
const getServerUrl = () => "https://demo.readytolaunch.com/api";

export function ThankYouPage({ onNavigate }: ThankYouPageProps) {
  const [orderData, setOrderData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [sparkleEffects, setSparkleEffects] = useState<SparkleEffect[]>([]);
  const [celebrationActive, setCelebrationActive] = useState(false);

  // Create dynamic sparkle bursts
  const createSparkleWave = (
    centerX: number = 50,
    centerY: number = 40,
    count: number = 15
  ) => {
    const newSparkles: SparkleEffect[] = [];
    const colors = [
      "#0CDA20",
      "#FFD700",
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1",
      "#96CEB4",
      "#FFA726",
    ];
    const types: ("sparkle" | "star" | "heart" | "trophy")[] = [
      "sparkle",
      "star",
      "heart",
      "trophy",
    ];

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const radius = 100 + Math.random() * 100;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      newSparkles.push({
        id: Date.now() + i,
        x: Math.max(5, Math.min(95, x)),
        y: Math.max(10, Math.min(90, y)),
        size: 6 + Math.random() * 12,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: 2000 + Math.random() * 1000,
        delay: i * 50,
        type: types[Math.floor(Math.random() * types.length)],
      });
    }

    return newSparkles;
  };

  // Trigger celebration sequence
  const startCelebration = () => {
    setCelebrationActive(true);

    // Initial burst
    setTimeout(() => {
      const initialSparkles = createSparkleWave(50, 30, 20);
      setSparkleEffects(initialSparkles);

      // Clear after animation
      setTimeout(() => {
        setSparkleEffects([]);
      }, 3500);
    }, 800);

    // Second wave
    setTimeout(() => {
      const secondWave = createSparkleWave(30, 60, 12);
      setSparkleEffects((prev) => [...prev, ...secondWave]);

      setTimeout(() => {
        setSparkleEffects((prev) =>
          prev.filter((s) => !secondWave.includes(s))
        );
      }, 3000);
    }, 2000);

    // Final burst
    setTimeout(() => {
      const finalBurst = createSparkleWave(70, 50, 8);
      setSparkleEffects((prev) => [...prev, ...finalBurst]);

      setTimeout(() => {
        setSparkleEffects([]);
        setCelebrationActive(false);
      }, 2500);
    }, 3500);
  };

  // Trigger sparkles on successful actions
  const triggerActionSparkles = (centerX: number, centerY: number) => {
    const actionSparkles = createSparkleWave(centerX, centerY, 8);
    setSparkleEffects((prev) => [...prev, ...actionSparkles]);

    setTimeout(() => {
      setSparkleEffects((prev) =>
        prev.filter((s) => !actionSparkles.includes(s))
      );
    }, 2000);
  };

  useEffect(() => {
    const loadOrderData = async () => {
      try {
        const orderId = localStorage.getItem("lastOrderId");
        if (orderId) {
          if (isDemoMode()) {
            // Create demo order data
            const demoOrder = {
              id: orderId,
              template: {
                name: "Premium Portfolio Template",
                category: "Portfolio",
                rating: 4.9,
              },
              customer: {
                firstName: "Demo",
                lastName: "User",
                email: "demo@example.com",
              },
              downloadToken: "demo-token-" + Date.now(),
            };
            setOrderData(demoOrder);

            // Start celebration after loading
            setTimeout(() => {
              startCelebration();
            }, 500);
          } else {
            // In a real app, this would make an API call
            const response = await fetch(
              `${getServerUrl()}/orders/${orderId}`,
              {
                headers: { "Content-Type": "application/json" },
              }
            );

            if (response.ok) {
              const data = await response.json();
              setOrderData(data.order);

              setTimeout(() => {
                startCelebration();
              }, 500);
            }
          }
        } else {
          // No order ID, create fallback demo data
          const demoOrder = {
            id: "demo-order-" + Date.now(),
            template: {
              name: "Modern Business Template",
              category: "Business",
              rating: 4.8,
            },
            customer: {
              firstName: "Welcome",
              lastName: "User",
              email: "user@readytolaunch.com",
            },
            downloadToken: "demo-token-fallback",
          };
          setOrderData(demoOrder);

          setTimeout(() => {
            startCelebration();
          }, 500);
        }
      } catch (error) {
        console.error("Failed to load order data:", error);
        // Create fallback demo data on error
        const fallbackOrder = {
          id: "fallback-order",
          template: {
            name: "Premium Template",
            category: "Template",
            rating: 4.7,
          },
          customer: {
            firstName: "Valued",
            lastName: "Customer",
            email: "customer@readytolaunch.com",
          },
          downloadToken: "demo-fallback-token",
        };
        setOrderData(fallbackOrder);

        setTimeout(() => {
          startCelebration();
        }, 500);
      } finally {
        setIsLoading(false);
      }
    };

    loadOrderData();
  }, []);

  const handleDownload = async () => {
    if (!orderData?.downloadToken) return;

    setDownloadStarted(true);
    triggerActionSparkles(50, 70); // Sparkles around download button

    try {
      if (isDemoMode()) {
        console.log(
          "Demo download started for token:",
          orderData.downloadToken
        );

        setTimeout(() => {
          setDownloadStarted(false);
          // Instead of alert, show a nice success message
          triggerActionSparkles(50, 50); // Success sparkles

          // Create a temporary success message
          const successElement = document.createElement("div");
          successElement.innerHTML = `
            <div style="
              position: fixed; 
              top: 50%; 
              left: 50%; 
              transform: translate(-50%, -50%); 
              background: linear-gradient(135deg, #0CDA20, #0CB520); 
              color: white; 
              padding: 20px 40px; 
              border-radius: 12px; 
              font-size: 18px; 
              font-weight: 600; 
              box-shadow: 0 8px 32px rgba(12, 218, 32, 0.3); 
              z-index: 10000;
              animation: fadeInScale 0.3s ease-out;
            ">
              🎉 Demo Download Complete! 🎉
            </div>
            <style>
              @keyframes fadeInScale {
                from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
              }
            </style>
          `;
          document.body.appendChild(successElement);

          setTimeout(() => {
            document.body.removeChild(successElement);
          }, 3000);
        }, 2000);
      } else {
        const response = await fetch(
          `${getServerUrl()}/download/${orderData.downloadToken}`,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Download URL:", data.downloadUrl);
          triggerActionSparkles(50, 50); // Success sparkles

          setTimeout(() => {
            setDownloadStarted(false);
          }, 2000);
        }
      }
    } catch (error) {
      console.error("Download failed:", error);
      setDownloadStarted(false);
    }
  };

  const renderSparkleIcon = (type: string, size: number) => {
    const iconSize = Math.max(16, Math.min(32, size));
    switch (type) {
      case "star":
        return <Star size={iconSize} className="fill-current" />;
      case "heart":
        return <Heart size={iconSize} className="fill-current" />;
      case "trophy":
        return <Trophy size={iconSize} />;
      default:
        return <Sparkles size={iconSize} />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your celebration...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Dynamic Sparkle Effects */}
      {sparkleEffects.map((sparkle) => (
        <div
          key={sparkle.id}
          className="fixed pointer-events-none z-50 animate-bounce opacity-0"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            color: sparkle.color,
            filter: `drop-shadow(0 0 ${sparkle.size}px ${sparkle.color})`,
            animation: `gamificationSparkle ${sparkle.duration}ms ease-out ${sparkle.delay}ms forwards`,
          }}
        >
          {renderSparkleIcon(sparkle.type, sparkle.size)}
        </div>
      ))}

      {/* Celebration Background Strips - Only during active celebration */}
      {celebrationActive && (
        <div className="fixed inset-0 pointer-events-none z-20">
          <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-yellow-400 via-red-500 via-pink-500 via-purple-500 via-blue-500 to-green-400 opacity-90 animate-pulse"></div>
          <div
            className="absolute bottom-0 left-0 w-full h-3 bg-gradient-to-r from-orange-400 via-yellow-500 via-lime-500 via-green-500 to-teal-400 opacity-90 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>
      )}

      <div className="relative z-10 py-12">
        <div className="max-w-4xl mx-auto px-6">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="relative inline-block mb-8">
              <div
                className={`w-28 h-28 bg-gradient-to-br from-primary/30 via-primary/20 to-primary/10 rounded-full flex items-center justify-center mx-auto transition-all duration-1000 ${
                  celebrationActive ? "animate-bounce scale-110" : "scale-100"
                }`}
              >
                <CheckCircle className="w-14 h-14 text-primary drop-shadow-2xl" />
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
              🎉 SUCCESS! 🎉
            </h1>
            <p className="text-2xl text-muted-foreground max-w-2xl mx-auto">
              Your premium template adventure begins now!{" "}
              {isDemoMode() && "(Demo)"}
            </p>
          </div>

          {/* Achievement Banner */}
          <Card className="p-6 mb-8 bg-gradient-to-r from-primary/15 via-primary/10 to-primary/15 border-primary/30 relative overflow-hidden">
            <div className="flex items-center justify-center gap-4 text-center relative">
              <Trophy className="w-8 h-8 text-primary animate-pulse" />
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  🎊 Welcome to Ready To Launch! 🎊
                </h3>
                <p className="text-muted-foreground">
                  You've successfully joined our premium template family
                </p>
              </div>
              <Trophy className="w-8 h-8 text-primary animate-pulse" />
            </div>
          </Card>

          {/* Demo Mode Notice */}
          {isDemoMode() && (
            <Card className="p-4 mb-8 bg-blue-500/10 border-blue-500/20 text-center">
              <Badge variant="outline" className="mb-2">
                Demo Mode
              </Badge>
              <p className="text-sm text-muted-foreground">
                This is a demonstration. No real charges were made.
              </p>
            </Card>
          )}

          {/* Order Details */}
          {orderData && (
            <Card className="p-8 mb-8 bg-gradient-to-br from-background via-muted/10 to-background border-2 border-primary/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
                  <Gift className="w-6 h-6 text-white drop-shadow-lg" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Your Order Details
                </h2>
                <Badge className="bg-gradient-to-r from-primary/20 to-primary/10 text-primary border-primary/30">
                  #{orderData.id.slice(-8)}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Template Info */}
                <div>
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Your Premium Template
                  </h3>
                  <div className="bg-gradient-to-br from-muted/40 to-muted/20 rounded-xl p-6 border border-primary/10">
                    <h4 className="font-bold text-xl mb-2">
                      {orderData.template?.name || "Premium Template"}
                    </h4>
                    <p className="text-muted-foreground mb-3">
                      {orderData.template?.category}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 text-yellow-500 fill-current"
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium">
                        {orderData.template?.rating || "4.9"}
                      </span>
                      <Badge variant="secondary" className="ml-2">
                        Premium
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Customer Info */}
                <div>
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-primary" />
                    Delivery Details
                  </h3>
                  <div className="bg-gradient-to-br from-muted/40 to-muted/20 rounded-xl p-6 border border-primary/10">
                    <p className="font-bold text-lg">
                      {orderData.customer?.firstName}{" "}
                      {orderData.customer?.lastName}
                    </p>
                    <p className="text-muted-foreground mb-3">
                      {orderData.customer?.email}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-primary">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                      <span>Instant delivery activated!</span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="my-8 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

              {/* Download Section */}
              <div className="text-center">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                    Ready for Download!
                  </h3>
                  <p className="text-muted-foreground">
                    Your template files are waiting to create something amazing
                  </p>
                </div>

                <Button
                  onClick={handleDownload}
                  size="lg"
                  className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-primary/25 transform hover:scale-105 transition-all duration-300 relative overflow-hidden"
                  disabled={downloadStarted}
                >
                  {downloadStarted ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      {isDemoMode()
                        ? "Demo Processing..."
                        : "Preparing Download..."}
                    </>
                  ) : (
                    <>
                      <Download className="w-6 h-6 mr-3" />
                      {isDemoMode() ? "Demo Download" : "Download Files"}
                    </>
                  )}
                </Button>

                <p className="text-sm text-muted-foreground mt-6">
                  Includes all source files, documentation, and assets
                </p>
              </div>
            </Card>
          )}

          {/* What's Next */}
          <Card className="p-6 mb-8 bg-gradient-to-br from-background to-muted/10">
            <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Your Next Adventure Awaits!
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: FileText,
                  title: "Master the Docs",
                  description: "Setup and customization guide",
                  color: "text-blue-500",
                },
                {
                  icon: Rocket,
                  title: "Launch Your Site",
                  description: "Deploy your creation",
                  color: "text-primary",
                },
                {
                  icon: Heart,
                  title: "Join Community",
                  description: "Connect with creators",
                  color: "text-red-500",
                },
              ].map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={index}
                    className="text-center p-6 hover:bg-primary/5 rounded-xl transition-all duration-300 cursor-pointer group hover:scale-105"
                    onClick={() => triggerActionSparkles(33 + index * 33, 85)}
                  >
                    <IconComponent
                      className={`w-12 h-12 ${item.color} mx-auto mb-4 drop-shadow-lg group-hover:scale-110 transition-transform`}
                    />
                    <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Security Badge */}
          <Card className="p-4 mb-8 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20 text-center">
            <div className="flex items-center justify-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">
                Secure transaction • SSL encrypted • 30-day guarantee
              </span>
              <Shield className="w-5 h-5 text-primary" />
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              onClick={() => {
                onNavigate("templates");
                triggerActionSparkles(30, 95);
              }}
              variant="outline"
              size="lg"
              className="border-primary/40 hover:border-primary text-primary hover:bg-primary/10 font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105"
            >
              <Star className="w-5 h-5 mr-2" />
              Explore More Templates
            </Button>
            <Button
              onClick={() => {
                onNavigate("how-to-launch");
                triggerActionSparkles(70, 95);
              }}
              size="lg"
              className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-105"
            >
              <Rocket className="w-5 h-5 mr-2" />
              Launch Guide
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Add custom CSS for gamification sparkles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes gamificationSparkle {
            0% {
              opacity: 0;
              transform: translateY(20px) scale(0.3) rotate(0deg);
            }
            20% {
              opacity: 1;
              transform: translateY(-10px) scale(1.2) rotate(90deg);
            }
            80% {
              opacity: 1;
              transform: translateY(-30px) scale(1) rotate(270deg);
            }
            100% {
              opacity: 0;
              transform: translateY(-50px) scale(0.3) rotate(360deg);
            }
          }
        `,
        }}
      />
    </div>
  );
}
