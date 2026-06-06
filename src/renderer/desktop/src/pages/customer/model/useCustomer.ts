import { useEffect, useRef, useState } from "react";

import {
  CUSTOMER_CONTENT_BOTTOM_OFFSET_REM,
  CUSTOMER_CONTENT_HEIGHT_REM,
  CUSTOMER_CONTENT_TOP_OFFSET_REM,
  CUSTOMER_CONTENT_WIDTH_REM,
  CUSTOMER_FILTERS,
  CUSTOMER_PAGE_LEFT_PADDING_REM,
  CUSTOMER_PAGE_RIGHT_PADDING_REM,
  CUSTOMER_ROWS,
  CUSTOMER_SUMMARIES,
  MIN_CUSTOMER_SCALE,
} from "./Customer.constant";

interface CustomerContainerSize {
  width: number;
  height: number;
}

const getRootFontSize = () => {
  if (typeof window === "undefined") {
    return 16;
  }

  const rootFontSize = window.getComputedStyle(document.documentElement)?.fontSize;

  return Number.parseFloat(rootFontSize ?? "") || 16;
};

const getFallbackContainerSize = (): CustomerContainerSize => {
  if (typeof window === "undefined") {
    return {
      width:
        CUSTOMER_PAGE_LEFT_PADDING_REM +
        CUSTOMER_CONTENT_WIDTH_REM +
        CUSTOMER_PAGE_RIGHT_PADDING_REM,
      height:
        CUSTOMER_CONTENT_TOP_OFFSET_REM +
        CUSTOMER_CONTENT_HEIGHT_REM +
        CUSTOMER_CONTENT_BOTTOM_OFFSET_REM,
    };
  }

  const rootFontSize = getRootFontSize();

  return {
    width: window.innerWidth / rootFontSize,
    height: window.innerHeight / rootFontSize,
  };
};

const getCustomerScale = (containerSize = getFallbackContainerSize()) => {
  const availableWidth = getAvailableContentWidth(containerSize);
  const availableWidthRatio = availableWidth / CUSTOMER_CONTENT_WIDTH_REM;
  const availableHeightRatio =
    containerSize.height /
    (CUSTOMER_CONTENT_TOP_OFFSET_REM +
      CUSTOMER_CONTENT_HEIGHT_REM +
      CUSTOMER_CONTENT_BOTTOM_OFFSET_REM);
  const viewportScale = Math.min(availableWidthRatio, availableHeightRatio);

  return Math.min(1, Math.max(MIN_CUSTOMER_SCALE, viewportScale));
};

const getAvailableContentWidth = (containerSize = getFallbackContainerSize()) => {
  return Math.max(
    0,
    containerSize.width - CUSTOMER_PAGE_LEFT_PADDING_REM - CUSTOMER_PAGE_RIGHT_PADDING_REM
  );
};

export const useCustomer = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(getCustomerScale);
  const [availableContentWidthRem, setAvailableContentWidthRem] =
    useState(getAvailableContentWidth);
  const layoutHeightRem =
    CUSTOMER_CONTENT_TOP_OFFSET_REM +
    CUSTOMER_CONTENT_HEIGHT_REM +
    CUSTOMER_CONTENT_BOTTOM_OFFSET_REM;

  useEffect(() => {
    const updateLayout = () => {
      const pageElement = pageRef.current;
      const rootFontSize = getRootFontSize();
      const containerSize = pageElement
        ? {
            width: pageElement.getBoundingClientRect().width / rootFontSize,
            height: pageElement.getBoundingClientRect().height / rootFontSize,
          }
        : getFallbackContainerSize();

      setAvailableContentWidthRem(getAvailableContentWidth(containerSize));
      setScale(getCustomerScale(containerSize));
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

  const layoutWidthRem = Math.max(CUSTOMER_CONTENT_WIDTH_REM, availableContentWidthRem / scale);

  return {
    pageRef,
    scale,
    layoutWidthRem,
    layoutHeightRem,
    scaledLayoutWidthRem: layoutWidthRem * scale,
    scaledLayoutHeightRem: layoutHeightRem * scale,
    summaries: CUSTOMER_SUMMARIES,
    filters: CUSTOMER_FILTERS,
    rows: CUSTOMER_ROWS,
  };
};
