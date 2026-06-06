import { useEffect, useRef, useState } from "react";

import {
  EMPLOYEE_CONTENT_BOTTOM_OFFSET_REM,
  EMPLOYEE_CONTENT_HEIGHT_REM,
  EMPLOYEE_CONTENT_TOP_OFFSET_REM,
  EMPLOYEE_CONTENT_WIDTH_REM,
  EMPLOYEE_PAGE_LEFT_PADDING_REM,
  EMPLOYEE_PAGE_RIGHT_PADDING_REM,
  EMPLOYEE_ROWS,
  MIN_EMPLOYEE_SCALE,
  PERMISSION_OPTIONS,
} from "./Employee.constant";

interface EmployeeContainerSize {
  width: number;
  height: number;
}

const getRootFontSize = () => {
  if (typeof window === "undefined") {
    return 16;
  }

  return Number.parseFloat(window.getComputedStyle(document.documentElement).fontSize) || 16;
};

const getFallbackContainerSize = (): EmployeeContainerSize => {
  if (typeof window === "undefined") {
    return {
      width:
        EMPLOYEE_PAGE_LEFT_PADDING_REM +
        EMPLOYEE_CONTENT_WIDTH_REM +
        EMPLOYEE_PAGE_RIGHT_PADDING_REM,
      height:
        EMPLOYEE_CONTENT_TOP_OFFSET_REM +
        EMPLOYEE_CONTENT_HEIGHT_REM +
        EMPLOYEE_CONTENT_BOTTOM_OFFSET_REM,
    };
  }

  const rootFontSize = getRootFontSize();

  return {
    width: window.innerWidth / rootFontSize,
    height: window.innerHeight / rootFontSize,
  };
};

const getAvailableContentWidth = (containerSize = getFallbackContainerSize()) => {
  return Math.max(
    0,
    containerSize.width - EMPLOYEE_PAGE_LEFT_PADDING_REM - EMPLOYEE_PAGE_RIGHT_PADDING_REM
  );
};

const getEmployeeScale = (containerSize = getFallbackContainerSize()) => {
  const availableWidth = getAvailableContentWidth(containerSize);
  const availableWidthRatio = availableWidth / EMPLOYEE_CONTENT_WIDTH_REM;
  const availableHeightRatio =
    containerSize.height /
    (EMPLOYEE_CONTENT_TOP_OFFSET_REM +
      EMPLOYEE_CONTENT_HEIGHT_REM +
      EMPLOYEE_CONTENT_BOTTOM_OFFSET_REM);
  const viewportScale = Math.min(availableWidthRatio, availableHeightRatio);

  return Math.min(1, Math.max(MIN_EMPLOYEE_SCALE, viewportScale));
};

export const useEmployee = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(getEmployeeScale);
  const [availableContentWidthRem, setAvailableContentWidthRem] =
    useState(getAvailableContentWidth);
  const layoutHeightRem =
    EMPLOYEE_CONTENT_TOP_OFFSET_REM +
    EMPLOYEE_CONTENT_HEIGHT_REM +
    EMPLOYEE_CONTENT_BOTTOM_OFFSET_REM;

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
      setScale(getEmployeeScale(containerSize));
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

  const layoutWidthRem = Math.max(EMPLOYEE_CONTENT_WIDTH_REM, availableContentWidthRem / scale);

  return {
    pageRef,
    scale,
    layoutWidthRem,
    layoutHeightRem,
    scaledLayoutWidthRem: layoutWidthRem * scale,
    scaledLayoutHeightRem: layoutHeightRem * scale,
    employees: EMPLOYEE_ROWS,
    permissionOptions: PERMISSION_OPTIONS,
  };
};
