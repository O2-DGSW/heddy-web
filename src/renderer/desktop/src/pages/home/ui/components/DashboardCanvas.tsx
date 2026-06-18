import { useLayoutEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

const DASHBOARD_BASE_WIDTH = 1361;
const DASHBOARD_BASE_HEIGHT = 830;

const DashboardCanvas = ({ children }: { children: ReactNode }) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [viewportSize, setViewportSize] = useState({
    width: DASHBOARD_BASE_WIDTH,
    height: DASHBOARD_BASE_HEIGHT,
  });

  useLayoutEffect(() => {
    const viewportElement = viewportRef.current;

    if (!viewportElement) {
      return undefined;
    }

    const updateSize = (width: number, height: number) => {
      setViewportSize(previousSize => {
        if (
          Math.abs(previousSize.width - width) < 0.5 &&
          Math.abs(previousSize.height - height) < 0.5
        ) {
          return previousSize;
        }

        return { width, height };
      });
    };

    updateSize(viewportElement.clientWidth, viewportElement.clientHeight);

    const resizeObserver = new ResizeObserver(entries => {
      const [entry] = entries;

      if (entry) {
        updateSize(entry.contentRect.width, entry.contentRect.height);
      }
    });

    resizeObserver.observe(viewportElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const widthScale = viewportSize.width / DASHBOARD_BASE_WIDTH;
  const heightScale = viewportSize.height / DASHBOARD_BASE_HEIGHT;
  const scale = Math.min(1, widthScale, heightScale);
  const layoutWidth =
    scale > 0
      ? Math.max(DASHBOARD_BASE_WIDTH, viewportSize.width / scale)
      : DASHBOARD_BASE_WIDTH;
  const scaledWidth = layoutWidth * scale;
  const scaledHeight = DASHBOARD_BASE_HEIGHT * scale;

  return (
    <div ref={viewportRef} className="h-full w-full" data-dashboard-canvas-viewport>
      <div
        className="relative shrink-0 overflow-visible"
        data-dashboard-canvas-frame
        style={{
          width: `${scaledWidth}px`,
          height: `${scaledHeight}px`,
        }}
      >
        <div
          className="absolute left-0 top-0 origin-top-left"
          data-dashboard-canvas
          style={{
            width: `${layoutWidth}px`,
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
