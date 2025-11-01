import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

interface TopSlotAdProps {
  ads: any[];
}

export default function TopSlotAdCarousel({ ads }: TopSlotAdProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (ads && ads.length > 0) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % ads.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [ads]);

  if (!ads || ads.length === 0) {
    return null;
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + ads.length) % ads.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % ads.length);
  };

  const currentAd = ads[currentIndex];

  return (
    <div className="relative w-full h-[400px] bg-gradient-to-r from-gray-900 to-gray-800 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-500"
        style={{
          backgroundImage: `url(${currentAd.imageUrl})`,
          filter: "brightness(0.4)",
        }}
      />
      
      <div className="relative h-full container flex items-center">
        <div className="max-w-2xl text-white z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{currentAd.text}</h2>
          <p className="text-xl mb-6">Plan your perfect Korean adventure with official travel guides and tips</p>
          <div className="flex gap-4 items-center">
            <Button size="lg" variant="default" asChild>
              <a href={currentAd.linkUrl} target="_blank" rel="noopener noreferrer">Explore Korea</a>
            </Button>
            <div className="flex gap-2">
              {ads.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? "bg-white w-8" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 rounded-full backdrop-blur-sm transition-all"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 rounded-full backdrop-blur-sm transition-all"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}
