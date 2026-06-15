import { useLayoutEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

const DASHBOARD_BASE_WIDTH = 1361;
const DASHBOARD_BASE_HEIGHT = 830;

const DashboardCanvas = ({ children }: { children: ReactNode }) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState(DASHBOARD_BASE_WIDTH);

  useLayoutEffect(() => {
    const viewportElement = viewportRef.current;

    if (!viewportElement) {
      return undefined;
    }

    const updateWidth = (width: number) => {
      setViewportWidth(previousWidth => {
        if (Math.abs(previousWidth - width) < 0.5) {
          return previousWidth;
        }

        return width;
      });
    };

    updateWidth(viewportElement.clientWidth);

    const resizeObserver = new ResizeObserver(entries => {
      const [entry] = entries;

      if (entry) {
        updateWidth(entry.contentRect.width);
      }
    });

    resizeObserver.observe(viewportElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const scale = Math.min(1, viewportWidth / DASHBOARD_BASE_WIDTH);
  const canvasWidth = scale < 1 ? DASHBOARD_BASE_WIDTH : viewportWidth;

  return (
    <div ref={viewportRef} className="w-full">
      <div style={{ height: `${DASHBOARD_BASE_HEIGHT * scale}px` }}>
        <div
          className="origin-top-left"
          style={{
            width: `${canvasWidth}px`,
            height: `${DASHBOARD_BASE_HEIGHT}px`,
            transform: `scale(${scale})`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export { DashboardCanvas };
