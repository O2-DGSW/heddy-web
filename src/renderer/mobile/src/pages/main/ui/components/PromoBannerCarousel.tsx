import { useRef, useState } from "react";
import { font } from "@design-tokens";

import type { PromoBannerSlide } from "@/pages/main/model/promoBanner.types";

interface PromoBannerCarouselProps {
  slides: PromoBannerSlide[];
}

export const PromoBannerCarousel = ({ slides }: PromoBannerCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  if (slides.length === 0) {
    return null;
  }

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container || container.clientWidth === 0) return;

    const index = Math.round(container.scrollLeft / container.clientWidth);
    setActiveIndex(index);
  };

  return (
    <div className="relative w-full">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex w-full overflow-x-auto snap-x snap-mandatory scrollbar-hidden rounded-2xl"
      >
        {slides.map((slide) => (
          <div key={slide.id} className="w-full shrink-0 snap-center">
            <img src={slide.image} alt={slide.alt} className="w-full h-auto" />
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <div
          className={`absolute bottom-3 right-3 px-2 py-0.5 rounded-full bg-black/40 text-white ${font.caption.medium}`}
        >
          {activeIndex + 1} / {slides.length}
        </div>
      )}
    </div>
  );
};
