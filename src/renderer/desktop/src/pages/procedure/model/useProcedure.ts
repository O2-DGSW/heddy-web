import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

import { getShopDetail } from "@/entities/employee/api/employeeApi";
import {
  getReservations,
  type ReservationResponse,
} from "@/entities/reservation/api/reservationApi";
import { registerTreatmentRecord } from "@/entities/treatment-record/api/treatmentRecordApi";
import { getMe } from "@/entities/user/api/userApi";
import { showErrorToastFromError } from "@/lib/toast";
import customerAvatar from "@/pages/procedure/assets/images/customer-avatar.png";
import {
  MIN_PROCEDURE_SCALE,
  PROCEDURE_CONTENT_BOTTOM_OFFSET_REM,
  PROCEDURE_CONTENT_HEIGHT_REM,
  PROCEDURE_CONTENT_TOP_OFFSET_REM,
  PROCEDURE_CONTENT_WIDTH_REM,
  PROCEDURE_MEMO_MAX_LENGTH,
  PROCEDURE_PAGE_LEFT_PADDING_REM,
  PROCEDURE_PAGE_RIGHT_PADDING_REM,
  PROCEDURE_TAGS,
} from "./Procedure.constant";
import type { ProcedureCustomer, ProcedureDesigner, ProcedureUploadSlot } from "./Procedure.types";

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

const getTodayDateKey = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const date = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${date}`;
};

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
      width:
        PROCEDURE_PAGE_LEFT_PADDING_REM +
        PROCEDURE_CONTENT_WIDTH_REM +
        PROCEDURE_PAGE_RIGHT_PADDING_REM,
      height:
        PROCEDURE_CONTENT_TOP_OFFSET_REM +
        PROCEDURE_CONTENT_HEIGHT_REM +
        PROCEDURE_CONTENT_BOTTOM_OFFSET_REM,
    };
  }

  const rootFontSize = getRootFontSize();

  return {
    width: window.innerWidth / rootFontSize,
    height: window.innerHeight / rootFontSize,
  };
};

const getFallbackPadding = (): ProcedureContainerPadding => ({
  bottom: PROCEDURE_CONTENT_BOTTOM_OFFSET_REM,
  left: PROCEDURE_PAGE_LEFT_PADDING_REM,
  right: PROCEDURE_PAGE_RIGHT_PADDING_REM,
  top: PROCEDURE_CONTENT_TOP_OFFSET_REM,
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

const normalizeDateInput = (date: string) => {
  const normalizedDate = date.trim().replaceAll("/", "-");
  const match = normalizedDate.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);

  if (!match) {
    return "";
  }

  const [, year, month, day] = match;

  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};

const getTimeFromDateTime = (dateTime?: string | null) => {
  if (!dateTime) {
    return "-";
  }

  const timeMatch = dateTime.match(/(?:T|\s)(\d{2}:\d{2})/);

  return timeMatch?.[1] ?? "-";
};

const getDisplayDateFromDateTime = (dateTime?: string | null) => {
  const date = dateTime?.slice(0, 10);

  if (!date) {
    return "-";
  }

  const [, month = "1", day = "1"] = date.split("-");

  return `${Number(month)}/${Number(day)}`;
};

const formatTag = (tag: string) => {
  const trimmedTag = tag.trim();

  if (!trimmedTag) {
    return "";
  }

  return trimmedTag.startsWith("#") ? trimmedTag : `# ${trimmedTag}`;
};

const mapReservationsToCustomers = (reservations: ReservationResponse[]): ProcedureCustomer[] => {
  const customerMap = new Map<number, ProcedureCustomer>();

  reservations.forEach(reservation => {
    if (customerMap.has(reservation.customer_id)) {
      return;
    }

    customerMap.set(reservation.customer_id, {
      id: reservation.customer_id,
      name:
        reservation.customer_name?.trim() ||
        reservation.customer_phone_number ||
        `고객 ${reservation.customer_id}`,
      phoneNumber: reservation.customer_phone_number ?? "",
      avatar: customerAvatar,
      tags: (reservation.service_tags ?? []).map(formatTag).filter(Boolean).slice(0, 2),
      date: getDisplayDateFromDateTime(reservation.reserved_at),
      time: getTimeFromDateTime(reservation.reserved_at),
    });
  });

  return Array.from(customerMap.values());
};

export const useProcedure = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const uploadUrlsRef = useRef<Set<string>>(new Set());
  const [scale, setScale] = useState(getProcedureScale);
  const [availableContentWidthRem, setAvailableContentWidthRem] =
    useState(getAvailableContentWidth);
  const [shopId, setShopId] = useState<number | null>(null);
  const [customers, setCustomers] = useState<ProcedureCustomer[]>([]);
  const [designers, setDesigners] = useState<ProcedureDesigner[]>([]);
  const [query, setQuery] = useState("");
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);
  const [procedureDate, setProcedureDate] = useState(getTodayDateKey);
  const [selectedDesignerId, setSelectedDesignerId] = useState<number | null>(null);
  const [memo, setMemo] = useState("");
  const [price, setPrice] = useState("");
  const [selectedTagIds, setSelectedTagIds] = useState<Set<string>>(() => new Set());
  const [imageFiles, setImageFiles] = useState<Record<ProcedureUploadSlot, File | null>>({
    before: null,
    after: null,
  });
  const [imagePreviews, setImagePreviews] = useState<Record<ProcedureUploadSlot, string | null>>({
    before: null,
    after: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [loadMessage, setLoadMessage] = useState("예약 고객 정보가 없습니다");
  const [saveMessage, setSaveMessage] = useState("");
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
    const uploadUrls = uploadUrlsRef.current;

    return () => {
      uploadUrls.forEach(url => URL.revokeObjectURL(url));
      uploadUrls.clear();
    };
  }, []);

  useEffect(() => {
    imagePreviewsRef.current = imagePreviews;
  }, [imagePreviews]);

  useEffect(() => {
    let ignore = false;

    const loadShopContext = async () => {
      setIsLoading(true);
      setSaveMessage("");

      try {
        const me = await getMe();
        const firstShopId = me.shopMembers[0]?.shopId;

        if (!firstShopId) {
          throw new Error("연결된 매장이 없습니다.");
        }

        const shop = await getShopDetail(firstShopId);
        const nextDesigners = shop.designers.map(designer => ({
          id: designer.designer_id,
          name: designer.name || `디자이너 ${designer.designer_id}`,
        }));

        if (!ignore) {
          setShopId(firstShopId);
          setDesigners(nextDesigners);
          setSelectedDesignerId(currentDesignerId =>
            currentDesignerId && nextDesigners.some(designer => designer.id === currentDesignerId)
              ? currentDesignerId
              : (nextDesigners[0]?.id ?? null)
          );
          setLoadMessage(
            nextDesigners.length === 0
              ? "매장에 등록된 디자이너가 없습니다"
              : "예약 고객 정보가 없습니다"
          );
        }
      } catch (error) {
        if (!ignore) {
          setShopId(null);
          setCustomers([]);
          setDesigners([]);
          setSelectedCustomerId(null);
          setSelectedDesignerId(null);
          setLoadMessage("예약 고객 정보가 없습니다");
          showErrorToastFromError(error, "시술 정보를 불러오지 못했습니다.");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    loadShopContext();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (shopId === null) {
      return;
    }

    const normalizedProcedureDate = normalizeDateInput(procedureDate);
    let ignore = false;

    if (!normalizedProcedureDate) {
      void Promise.resolve().then(() => {
        if (!ignore) {
          setCustomers([]);
          setSelectedCustomerId(null);
          setLoadMessage("예약 고객 정보가 없습니다");
          showErrorToastFromError(
            new Error("시술 날짜를 YYYY-MM-DD 형식으로 입력해주세요."),
            "시술 날짜를 YYYY-MM-DD 형식으로 입력해주세요."
          );
        }
      });

      return () => {
        ignore = true;
      };
    }

    const loadReservationCustomers = async () => {
      setIsLoading(true);

      try {
        const reservationResponses = await getReservations({
          shopId,
          date: normalizedProcedureDate,
        });
        const nextCustomers = mapReservationsToCustomers(reservationResponses);

        if (!ignore) {
          setCustomers(nextCustomers);
          setSelectedCustomerId(currentCustomerId =>
            currentCustomerId && nextCustomers.some(customer => customer.id === currentCustomerId)
              ? currentCustomerId
              : (nextCustomers[0]?.id ?? null)
          );
          setLoadMessage("예약 고객 정보가 없습니다");
        }
      } catch (error) {
        if (!ignore) {
          setCustomers([]);
          setSelectedCustomerId(null);
          setLoadMessage("예약 고객 정보가 없습니다");
          showErrorToastFromError(error, "예약 고객 정보를 불러오지 못했습니다.");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    loadReservationCustomers();

    return () => {
      ignore = true;
    };
  }, [procedureDate, shopId]);

  const filteredCustomers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return customers;
    }

    return customers.filter(customer =>
      [customer.name, customer.phoneNumber, customer.date, customer.time, ...customer.tags]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery)
    );
  }, [customers, query]);

  const selectedCustomer = useMemo(
    () => customers.find(customer => customer.id === selectedCustomerId) ?? null,
    [customers, selectedCustomerId]
  );

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

  const handlePriceChange = useCallback((nextPrice: string) => {
    setPrice(nextPrice.replace(/[^\d]/g, "").slice(0, 9));
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

      setImageFiles(currentFiles => ({
        ...currentFiles,
        [slot]: null,
      }));
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

    setImageFiles(currentFiles => ({
      ...currentFiles,
      [slot]: file,
    }));
    setImagePreviews(nextPreviews);
  }, []);

  const resetImageState = useCallback(() => {
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

    setImageFiles(nextPreviews);
    setImagePreviews(nextPreviews);
  }, []);

  const handleCancel = useCallback(() => {
    setQuery("");
    setSelectedCustomerId(customers[0]?.id ?? null);
    setProcedureDate(getTodayDateKey());
    setSelectedDesignerId(designers[0]?.id ?? null);
    setMemo("");
    setPrice("");
    setSelectedTagIds(new Set());
    setSaveMessage("");
    resetImageState();
  }, [customers, designers, resetImageState]);

  const handleSave = useCallback(async () => {
    const normalizedProcedureDate = normalizeDateInput(procedureDate);
    const selectedTags = tags
      .filter(tag => tag.selected)
      .map(tag => tag.label.replace(/^#\s*/, ""));
    const priceValue = Number(price);

    if (shopId === null) {
      showErrorToastFromError(new Error("연결된 매장이 없습니다."), "연결된 매장이 없습니다.");
      return;
    }

    if (!normalizedProcedureDate) {
      showErrorToastFromError(
        new Error("시술 날짜를 YYYY-MM-DD 형식으로 입력해주세요."),
        "시술 날짜를 YYYY-MM-DD 형식으로 입력해주세요."
      );
      return;
    }

    if (!selectedCustomer) {
      showErrorToastFromError(
        new Error("시술 기록을 등록할 예약 고객을 선택해주세요."),
        "시술 기록을 등록할 예약 고객을 선택해주세요."
      );
      return;
    }

    if (!selectedCustomer.phoneNumber) {
      showErrorToastFromError(
        new Error("선택한 고객의 전화번호가 응답에 없어 시술 기록을 등록할 수 없습니다."),
        "선택한 고객의 전화번호가 응답에 없어 시술 기록을 등록할 수 없습니다."
      );
      return;
    }

    if (selectedDesignerId === null) {
      showErrorToastFromError(new Error("디자이너를 선택해주세요."), "디자이너를 선택해주세요.");
      return;
    }

    if (!Number.isFinite(priceValue) || priceValue <= 0) {
      showErrorToastFromError(new Error("시술 금액을 입력해주세요."), "시술 금액을 입력해주세요.");
      return;
    }

    setIsSaving(true);
    setSaveMessage("");

    try {
      const response = await registerTreatmentRecord({
        shopId,
        phoneNumber: selectedCustomer.phoneNumber,
        treatmentDate: normalizedProcedureDate,
        price: priceValue,
        title: selectedTags[0] ?? "시술 기록",
        serviceTags: selectedTags,
        memo: memo.trim() || undefined,
        beforeImage: imageFiles.before,
        afterImage: imageFiles.after,
      });

      setSaveMessage(`시술 기록 #${response.record_id}번을 등록했습니다.`);
      setMemo("");
      setPrice("");
      setSelectedTagIds(new Set());
      resetImageState();
    } catch (error) {
      showErrorToastFromError(error, "시술 기록을 등록하지 못했습니다.");
    } finally {
      setIsSaving(false);
    }
  }, [
    imageFiles.after,
    imageFiles.before,
    memo,
    price,
    procedureDate,
    resetImageState,
    selectedCustomer,
    selectedDesignerId,
    shopId,
    tags,
  ]);

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
    designers,
    selectedDesignerId,
    tags,
    memo,
    price,
    isLoading,
    isSaving,
    emptyMessage: query.trim() ? "검색 결과가 없습니다" : loadMessage,
    saveMessage,
    imagePreviews,
    setQuery,
    setSelectedCustomerId,
    setProcedureDate,
    setSelectedDesignerId,
    handleToggleTag,
    handleMemoChange,
    handlePriceChange,
    handleImageChange,
    handleCancel,
    handleSave,
  };
};
