import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

import {
  DEFAULT_PROCEDURE_DATE,
  MIN_PROCEDURE_SCALE,
  PROCEDURE_CONTENT_HEIGHT_REM,
  PROCEDURE_CONTENT_WIDTH_REM,
  PROCEDURE_CUSTOMERS,
  PROCEDURE_DESIGNERS,
  PROCEDURE_MEMO_MAX_LENGTH,
  PROCEDURE_PAGE_PADDING_REM,
  PROCEDURE_TAGS,
} from "./Procedure.constant";
import type { ProcedureUploadSlot } from "./Procedure.types";

interface ProcedureContainerSize {
  width: number;
  height: number;
}

interface ProcedureContainerPadding {
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

const getFallbackContainerSize = (): ProcedureContainerSize => {
  if (typeof window === "undefined") {
    return {
      width: PROCEDURE_PAGE_PADDING_REM * 2 + PROCEDURE_CONTENT_WIDTH_REM,
      height: PROCEDURE_PAGE_PADDING_REM * 2 + PROCEDURE_CONTENT_HEIGHT_REM,
    };
  }

  const rootFontSize = getRootFontSize();

  return {
    width: window.innerWidth / rootFontSize,
    height: window.innerHeight / rootFontSize,
  };
};

const getFallbackPadding = (): ProcedureContainerPadding => ({
  bottom: PROCEDURE_PAGE_PADDING_REM,
  left: PROCEDURE_PAGE_PADDING_REM,
  right: PROCEDURE_PAGE_PADDING_REM,
  top: PROCEDURE_PAGE_PADDING_REM,
});

const getElementPadding = (
  element: HTMLElement | null,
  rootFontSize: number
): ProcedureContainerPadding => {
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

const getProcedureScale = (
  containerSize = getFallbackContainerSize(),
  padding = getFallbackPadding()
) => {
  const availableWidth = getAvailableContentWidth(containerSize, padding);
  const availableHeight = getAvailableContentHeight(containerSize, padding);
  const availableWidthRatio = availableWidth / PROCEDURE_CONTENT_WIDTH_REM;
  const availableHeightRatio = availableHeight / PROCEDURE_CONTENT_HEIGHT_REM;
  const viewportScale = Math.min(availableWidthRatio, availableHeightRatio);

  return Math.min(1, Math.max(MIN_PROCEDURE_SCALE, viewportScale));
};

export const useProcedure = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const uploadUrlsRef = useRef<Set<string>>(new Set());
  const [scale, setScale] = useState(getProcedureScale);
  const [availableContentWidthRem, setAvailableContentWidthRem] =
    useState(getAvailableContentWidth);
  const [query, setQuery] = useState("");
  const [selectedCustomerId, setSelectedCustomerId] = useState(PROCEDURE_CUSTOMERS[0].id);
  const [procedureDate, setProcedureDate] = useState(DEFAULT_PROCEDURE_DATE);
  const [selectedDesignerId, setSelectedDesignerId] = useState(PROCEDURE_DESIGNERS[0].id);
  const [memo, setMemo] = useState("");
  const [selectedTagIds, setSelectedTagIds] = useState(
    () => new Set(PROCEDURE_TAGS.filter(tag => tag.selected).map(tag => tag.id))
  );
  const [imagePreviews, setImagePreviews] = useState<Record<ProcedureUploadSlot, string | null>>({
    before: null,
    after: null,
  });
  const imagePreviewsRef = useRef(imagePreviews);
  const layoutHeightRem = PROCEDURE_CONTENT_HEIGHT_REM;

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
      const nextAvailableContentWidthRem = getAvailableContentWidth(containerSize, padding);
      const nextScale = getProcedureScale(containerSize, padding);

      setAvailableContentWidthRem(currentWidth =>
        Math.abs(currentWidth - nextAvailableContentWidthRem) > 0.001
          ? nextAvailableContentWidthRem
          : currentWidth
      );
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

  useEffect(() => {
    return () => {
      uploadUrlsRef.current.forEach(url => URL.revokeObjectURL(url));
      uploadUrlsRef.current.clear();
    };
  }, []);

  useEffect(() => {
    imagePreviewsRef.current = imagePreviews;
  }, [imagePreviews]);

  const filteredCustomers = useMemo(() => {
    const normalizedQuery = query.trim();

    if (!normalizedQuery) {
      return PROCEDURE_CUSTOMERS;
    }

    return PROCEDURE_CUSTOMERS.filter(customer => customer.name.includes(normalizedQuery));
  }, [query]);

  const tags = useMemo(
    () =>
      PROCEDURE_TAGS.map(tag => ({
        ...tag,
        selected: selectedTagIds.has(tag.id),
      })),
    [selectedTagIds]
  );

  const handleToggleTag = useCallback((tagId: string) => {
    setSelectedTagIds(prevTagIds => {
      const nextTagIds = new Set(prevTagIds);

      if (nextTagIds.has(tagId)) {
        nextTagIds.delete(tagId);
      } else {
        nextTagIds.add(tagId);
      }

      return nextTagIds;
    });
  }, []);

  const handleMemoChange = useCallback((nextMemo: string) => {
    setMemo(nextMemo.slice(0, PROCEDURE_MEMO_MAX_LENGTH));
  }, []);

  const handleImageChange = useCallback((slot: ProcedureUploadSlot, file: File | null) => {
    const previousPreview = imagePreviewsRef.current[slot];

    if (!file) {
      if (previousPreview) {
        URL.revokeObjectURL(previousPreview);
        uploadUrlsRef.current.delete(previousPreview);
      }

      const nextPreviews = {
        ...imagePreviewsRef.current,
        [slot]: null,
      };

      setImagePreviews(nextPreviews);
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    uploadUrlsRef.current.add(previewUrl);

    if (previousPreview) {
      URL.revokeObjectURL(previousPreview);
      uploadUrlsRef.current.delete(previousPreview);
    }

    const nextPreviews = {
      ...imagePreviewsRef.current,
      [slot]: previewUrl,
    };

    setImagePreviews(nextPreviews);
  }, []);

  const handleCancel = useCallback(() => {
    setQuery("");
    setSelectedCustomerId(PROCEDURE_CUSTOMERS[0].id);
    setProcedureDate(DEFAULT_PROCEDURE_DATE);
    setSelectedDesignerId(PROCEDURE_DESIGNERS[0].id);
    setMemo("");
    setSelectedTagIds(new Set(PROCEDURE_TAGS.filter(tag => tag.selected).map(tag => tag.id)));
    Object.values(imagePreviewsRef.current).forEach(previewUrl => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        uploadUrlsRef.current.delete(previewUrl);
      }
    });

    const nextPreviews = {
      before: null,
      after: null,
    };

    setImagePreviews(nextPreviews);
  }, []);

  const layoutWidthRem = Math.max(PROCEDURE_CONTENT_WIDTH_REM, availableContentWidthRem / scale);

  return {
    pageRef,
    scale,
    layoutWidthRem,
    layoutHeightRem,
    scaledLayoutWidthRem: layoutWidthRem * scale,
    scaledLayoutHeightRem: layoutHeightRem * scale,
    customers: filteredCustomers,
    query,
    selectedCustomerId,
    procedureDate,
    designers: PROCEDURE_DESIGNERS,
    selectedDesignerId,
    tags,
    memo,
    imagePreviews,
    setQuery,
    setSelectedCustomerId,
    setProcedureDate,
    setSelectedDesignerId,
    handleToggleTag,
    handleMemoChange,
    handleImageChange,
    handleCancel,
  };
};
