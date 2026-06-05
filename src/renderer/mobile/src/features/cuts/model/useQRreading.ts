import { useCallback, useEffect, useState } from "react";
import { Camera } from "@capacitor/camera";
import { Capacitor } from "@capacitor/core";
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
  const [cameraReady, setCameraReady] = useState(!Capacitor.isNativePlatform());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    let isMounted = true;

    const requestCameraPermission = async () => {
      try {
        const currentPermission = await Camera.checkPermissions();
        const permission =
          currentPermission.camera === "granted"
            ? currentPermission
            : await Camera.requestPermissions({ permissions: ["camera"] });

        if (!isMounted) return;

        if (permission.camera === "granted") {
          setCameraReady(true);
          setError(null);
          return;
        }

        setCameraReady(false);
        setError("카메라 권한을 허용해야 QR 코드를 스캔할 수 있습니다.");
      } catch {
        if (!isMounted) return;

        setCameraReady(false);
        setError("카메라 권한 요청에 실패했습니다.");
      }
    };

    void requestCameraPermission();

    return () => {
      isMounted = false;
    };
  }, []);

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
    cameraReady,
    error,
    handleScan,
    handleError,
    tracker,
  };
};
