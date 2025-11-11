import React, { useState, useRef, useCallback } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  Upload,
  Image as ImageIcon,
  Check,
  AlertCircle,
  Camera,
  Link,
  Trash2,
  CheckCircle,
} from "lucide-react";

interface ImageUploadProps {
  onImageChange: (imageUrl: string) => void;
  currentImage?: string;
  className?: string;
}

export function ImageUpload({
  onImageChange,
  currentImage,
  className = "",
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>(currentImage || "");
  const [urlInput, setUrlInput] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragCounter = useRef(0);

  const validateImage = (file: File): string | null => {
    // Check file type
    if (!file.type.startsWith("image/")) {
      return "Please select a valid image file (PNG, JPG, GIF, WebP)";
    }

    // Check file size (max 10MB - increased for better quality)
    if (file.size > 10 * 1024 * 1024) {
      return "Image file size must be less than 10MB";
    }

    return null;
  };

  const handleFileUpload = useCallback(
    async (file: File) => {
      const error = validateImage(file);
      if (error) {
        setUploadError(error);
        setUploadSuccess(false);
        return;
      }

      setIsUploading(true);
      setUploadError(null);
      setUploadSuccess(false);

      try {
        // Create a data URL from the uploaded file
        const reader = new FileReader();

        reader.onload = (e) => {
          const result = e.target?.result as string;
          if (result) {
            // Use the actual uploaded image data
            setImagePreview(result);
            onImageChange(result);
            setUploadSuccess(true);

            // Clear success message after 3 seconds
            setTimeout(() => setUploadSuccess(false), 3000);
          }
          setIsUploading(false);
        };

        reader.onerror = () => {
          setUploadError("Failed to read the image file. Please try again.");
          setUploadSuccess(false);
          setIsUploading(false);
        };

        // Read the file as data URL (base64)
        reader.readAsDataURL(file);
      } catch (error) {
        setUploadError("Failed to process image. Please try again.");
        setUploadSuccess(false);
        setIsUploading(false);
        console.error("Upload error:", error);
      }
    },
    [onImageChange]
  );

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      dragCounter.current = 0;

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFileUpload(e.dataTransfer.files[0]);
      }
    },
    [handleFileUpload]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        handleFileUpload(e.target.files[0]);
      }
    },
    [handleFileUpload]
  );

  const handleUrlSubmit = () => {
    if (!urlInput) return;

    try {
      new URL(urlInput); // Validate URL

      // Test if the URL is actually an image by trying to load it
      const img = new Image();
      img.onload = () => {
        setImagePreview(urlInput);
        onImageChange(urlInput);
        setUrlInput("");
        setShowUrlInput(false);
        setUploadError(null);
        setUploadSuccess(true);

        // Clear success message after 3 seconds
        setTimeout(() => setUploadSuccess(false), 3000);
      };

      img.onerror = () => {
        setUploadError(
          "Unable to load image from the provided URL. Please check the URL and try again."
        );
        setUploadSuccess(false);
      };

      img.src = urlInput;
    } catch {
      setUploadError("Please enter a valid image URL");
      setUploadSuccess(false);
    }
  };

  const clearImage = () => {
    setImagePreview("");
    onImageChange("");
    setUploadError(null);
    setUploadSuccess(false);
    setUrlInput("");
    setShowUrlInput(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Update preview when currentImage prop changes
  React.useEffect(() => {
    if (currentImage && currentImage !== imagePreview) {
      setImagePreview(currentImage);
    }
  }, [currentImage]);

  return (
    <div className={`space-y-4 ${className}`}>
      <label className="text-sm font-medium text-foreground flex items-center gap-2">
        <ImageIcon className="w-4 h-4" />
        Template Thumbnail
        <span className="text-xs text-muted-foreground">(Required)</span>
      </label>

      {/* Main Upload Area */}
      <Card
        className={`
        bg-[#1a1a1a] border-white/20 transition-all duration-300
        ${isDragging ? "border-primary bg-primary/5" : ""}
        ${uploadError ? "border-red-500/50" : ""}
        ${uploadSuccess ? "border-primary bg-primary/5" : ""}
      `}
      >
        <CardContent className="p-6">
          {/* Success Message */}
          {uploadSuccess && (
            <div className="mb-4 p-3 bg-primary/10 border border-primary/20 rounded-lg">
              <div className="flex items-center gap-2 text-primary text-sm">
                <CheckCircle className="w-4 h-4" />
                Image uploaded successfully!
              </div>
            </div>
          )}

          {/* Image Preview */}
          {imagePreview && (
            <div className="mb-4 relative group">
              <div className="relative overflow-hidden rounded-lg border border-white/10">
                <img
                  src={imagePreview}
                  alt="Template thumbnail preview"
                  className="w-full h-48 object-cover"
                  onError={() => {
                    setUploadError(
                      "Failed to load image. Please try another one."
                    );
                    setImagePreview("");
                    setUploadSuccess(false);
                  }}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={clearImage}
                    className="border-white/20 text-white hover:bg-red-500/20 hover:border-red-500/50"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remove
                  </Button>
                </div>
              </div>

              {/* Image Info */}
              <div className="mt-2 text-xs text-muted-foreground">
                <p>✓ Image loaded successfully - Click to replace or remove</p>
              </div>
            </div>
          )}

          {/* Upload Area */}
          <div
            className={`
              border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300
              ${
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-white/20 hover:border-white/40"
              }
              ${
                isUploading
                  ? "pointer-events-none opacity-70"
                  : "cursor-pointer"
              }
              ${uploadSuccess ? "border-primary/50 bg-primary/5" : ""}
            `}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => !isUploading && fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />

            <div className="space-y-4">
              {isUploading ? (
                <>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Upload className="w-6 h-6 text-primary animate-pulse" />
                  </div>
                  <div>
                    <p className="text-foreground font-medium">
                      Processing image...
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Please wait while we prepare your image
                    </p>
                  </div>
                </>
              ) : uploadSuccess && imagePreview ? (
                <>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-primary font-medium">
                      Upload successful!
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Click to upload a different image
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <ImageIcon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-foreground font-medium">
                      {isDragging
                        ? "Drop image here"
                        : "Click to upload or drag & drop"}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      PNG, JPG, GIF, WebP up to 10MB
                    </p>
                    <p className="text-muted-foreground text-xs mt-1">
                      Your actual uploaded image will be used
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Alternative Options */}
          <div className="flex gap-2 mt-4">
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => setShowUrlInput(!showUrlInput)}
              className="flex-1 border-white/20 hover:bg-white/5"
              disabled={isUploading}
            >
              <Link className="w-4 h-4 mr-2" />
              Use Image URL
            </Button>

            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 border-white/20 hover:bg-white/5"
              disabled={isUploading}
            >
              <Camera className="w-4 h-4 mr-2" />
              Browse Files
            </Button>
          </div>

          {/* URL Input */}
          {showUrlInput && (
            <div className="mt-4 space-y-3">
              <div className="flex gap-2">
                <input
                  type="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="flex-1 px-3 py-2 bg-[#2d2d2d] border border-white/20 rounded-lg text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
                  disabled={isUploading}
                  onKeyPress={(e) => e.key === "Enter" && handleUrlSubmit()}
                />
                <Button
                  type="button"
                  size="sm"
                  onClick={handleUrlSubmit}
                  className="btn-premium"
                  disabled={!urlInput || isUploading}
                >
                  <Check className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Enter a direct link to an image file (jpg, png, gif, webp)
              </p>
            </div>
          )}

          {/* Error Message */}
          {uploadError && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{uploadError}</span>
              </div>
            </div>
          )}

          {/* Help Text */}
          {!imagePreview && !uploadError && (
            <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="text-blue-400 text-sm">
                <p className="font-medium mb-1">💡 Tips for best results:</p>
                <ul className="text-xs space-y-1 ml-4">
                  <li>• Use high-quality images (1200x800px or larger)</li>
                  <li>• Ensure good contrast and readability</li>
                  <li>• Avoid heavily compressed or blurry images</li>
                  <li>
                    • Landscape orientation works best for template previews
                  </li>
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
