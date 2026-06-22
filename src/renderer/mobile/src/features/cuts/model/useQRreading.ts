import { useCallback, useEffect, useRef } from "react";
import { useNavigationType } from "react-router-dom";
import { verifyQr } from "@/entities/qr/api/qrApi";
import { useQrResultStore } from "@/features/cuts/model/useQrResultStore";

type DetectedCode = {
  rawValue: string;
};

export const useQRreading = () => {
  const { result, error, setResult, setError, reset } = useQrResultStore();
  const navigationType = useNavigationType();
  const isVerifying = useRef(false);

  // 탭 클릭 등으로 새로 진입(PUSH)한 경우만 초기화 - 상세 페이지에서 뒤로가기(POP)로 돌아온 경우는 기존 결과 유지
  useEffect(() => {
    if (navigationType !== "POP") {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScan = useCallback((detectedCodes: DetectedCode[]) => {
    if (detectedCodes.length === 0 || isVerifying.current) return;
    isVerifying.current = true;
    verifyQr(detectedCodes[0].rawValue)
      .then((data) => setResult(data))
      .catch((err: Error) => setError(err.message))
      .finally(() => {
        isVerifying.current = false;
      });
  }, [setResult, setError]);

  const handleError = useCallback((err: unknown) => {
    if (err instanceof Error) {
      setError(err.message);
      return;
    }
    setError("카메라 접근에 실패했습니다.");
  }, [setError]);

  return {
    result,
    error,
    handleScan,
    handleError,
    reset,
  };
};
