import { useCallback, useState } from "react";
import type { TrackFunction } from "@yudiel/react-qr-scanner";
import { lightTheme } from "@design-tokens";

export type QrSuccessData = {
  name: string;
  phone: string;
  cutsCount: number;
};

type DetectedCode = {
  rawValue: string;
};

const MOCK_QR_RESULT: QrSuccessData = {
  name: "오용준",
  phone: "010-9563-5423",
  cutsCount: 12,
};

export const useQRreading = () => {
  const [result, setResult] = useState<QrSuccessData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleScan = useCallback((detectedCodes: DetectedCode[]) => {
    if (detectedCodes.length === 0) return;
    console.log("QR:", detectedCodes[0].rawValue);
    setResult(MOCK_QR_RESULT);
  }, []);

  const handleError = useCallback((err: unknown) => {
    if (err instanceof Error) {
      setError(err.message);
      return;
    }
    setError("카메라 접근에 실패했습니다.");
  }, []);

  const tracker: TrackFunction = useCallback((detectedCodes, ctx) => {
    detectedCodes.forEach(({ boundingBox, cornerPoints }) => {
      ctx.strokeStyle = "#00FF00";
      ctx.lineWidth = 4;
      ctx.strokeRect(boundingBox.x, boundingBox.y, boundingBox.width, boundingBox.height);
      ctx.fillStyle = lightTheme.primary.normal;

      cornerPoints.forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fill();
      });
    });
  }, []);

  return {
    result,
    error,
    handleScan,
    handleError,
    tracker,
  };
};
