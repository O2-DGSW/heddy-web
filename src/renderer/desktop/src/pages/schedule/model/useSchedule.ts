import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";

import {
  DEFAULT_SCHEDULE_DATE,
  MIN_SCHEDULE_SCALE,
  SCHEDULE_CONTENT_HEIGHT_REM,
  SCHEDULE_CONTENT_WIDTH_REM,
  SCHEDULE_EVENTS,
  SCHEDULE_PAGE_PADDING_REM,
  SCHEDULE_SUMMARY_BY_DATE,
} from "./Schedule.constant";
import type { ScheduleColorKey } from "./Schedule.types";

interface ScheduleContainerSize {
  height: number;
  width: number;
}

interface ScheduleContainerPadding {
  bottom: number;
  left: number;
  right: number;
  top: number;
}

const getRootFontSize = () => {
  if (typeof window === "undefined") {
    return 16;
  }

  const rootFontSize = window.getComputedStyle(document.documentElement)?.fontSize;

  return Number.parseFloat(rootFontSize ?? "") || 16;
};

const getFallbackContainerSize = (): ScheduleContainerSize => {
  if (typeof window === "undefined") {
    return {
      width: SCHEDULE_CONTENT_WIDTH_REM + SCHEDULE_PAGE_PADDING_REM * 2,
      height: SCHEDULE_CONTENT_HEIGHT_REM + SCHEDULE_PAGE_PADDING_REM * 2,
    };
  }

  const rootFontSize = getRootFontSize();

  return {
    width: window.innerWidth / rootFontSize,
    height: window.innerHeight / rootFontSize,
  };
};

const getFallbackPadding = (): ScheduleContainerPadding => ({
  bottom: SCHEDULE_PAGE_PADDING_REM,
  left: SCHEDULE_PAGE_PADDING_REM,
  right: SCHEDULE_PAGE_PADDING_REM,
  top: SCHEDULE_PAGE_PADDING_REM,
});

const getElementPadding = (
  element: HTMLElement | null,
  rootFontSize: number
): ScheduleContainerPadding => {
  if (!element || typeof window === "undefined") {
    return getFallbackPadding();
  }

  const style = window.getComputedStyle(element);

  return {
    bottom: (Number.parseFloat(style.paddingBottom) || 0) / rootFontSize,
    left: (Number.parseFloat(style.paddingLeft) || 0) / rootFontSize,
    right: (Number.parseFloat(style.paddingRight) || 0) / rootFontSize,
    top: (Number.parseFloat(style.paddingTop) || 0) / rootFontSize,
  };
};

const getAvailableContentWidth = (
  containerSize = getFallbackContainerSize(),
  padding = getFallbackPadding()
) => {
  return Math.max(0, containerSize.width - padding.left - padding.right);
};

const getAvailableContentHeight = (
  containerSize = getFallbackContainerSize(),
  padding = getFallbackPadding()
) => {
  return Math.max(0, containerSize.height - padding.top - padding.bottom);
};

const getScheduleScale = (
  containerSize = getFallbackContainerSize(),
  padding = getFallbackPadding()
) => {
  const availableWidthRatio =
    getAvailableContentWidth(containerSize, padding) / SCHEDULE_CONTENT_WIDTH_REM;
  const availableHeightRatio =
    getAvailableContentHeight(containerSize, padding) / SCHEDULE_CONTENT_HEIGHT_REM;

  return Math.min(
    1,
    Math.max(MIN_SCHEDULE_SCALE, Math.min(availableWidthRatio, availableHeightRatio))
  );
};

export const useSchedule = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(getScheduleScale);
  const [selectedDate, setSelectedDate] = useState(DEFAULT_SCHEDULE_DATE);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<ScheduleColorKey>("blue");

  useLayoutEffect(() => {
    const updateLayout = () => {
      const pageElement = pageRef.current;
      const rootFontSize = getRootFontSize();
      const containerSize = pageElement
        ? {
            width: pageElement.getBoundingClientRect().width / rootFontSize,
            height: pageElement.getBoundingClientRect().height / rootFontSize,
          }
        : getFallbackContainerSize();
      const padding = getElementPadding(pageElement, rootFontSize);
      const nextScale = getScheduleScale(containerSize, padding);

      setScale(currentScale =>
        Math.abs(currentScale - nextScale) > 0.001 ? nextScale : currentScale
      );
    };

    updateLayout();

    const resizeObserver = new ResizeObserver(updateLayout);

    if (pageRef.current) {
      resizeObserver.observe(pageRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const summaryItems = useMemo(() => SCHEDULE_SUMMARY_BY_DATE[selectedDate] ?? [], [selectedDate]);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return {
    pageRef,
    scale,
    layoutWidthRem: SCHEDULE_CONTENT_WIDTH_REM,
    layoutHeightRem: SCHEDULE_CONTENT_HEIGHT_REM,
    selectedDate,
    selectedColor,
    summaryItems,
    events: SCHEDULE_EVENTS,
    isModalOpen,
    setSelectedDate,
    setSelectedColor,
    openModal,
    closeModal,
  };
};
