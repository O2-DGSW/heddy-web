import { useState } from "react";
import { Scanner, type TrackFunction } from "@yudiel/react-qr-scanner";
import { font, lightTheme, palette } from "@design-tokens";
import PeekkomAgua from "@/features/cuts/assets/qr-reading/peekkom-agua.png";
import { QRresult } from "./QRresult";

type QrSuccessData = {
  name: string;
  phone: string;
  cutsCount: number;
};

export const QrReading = () => {
  // API res
  const responseData = {
    name: "오용준",
    phone: "010-9563-5423",
    cutsCount: 12,
  };

  // QR 스캔 결과 저장 state
  const [result, setResult] = useState<QrSuccessData | null>(null);

  // 카메라/스캔 에러 메시지 저장 state
  const [error, setError] = useState<string | null>(null);

  // QR 코드 스캔 성공 시 실행되는 함수
  const handleScan = (detectedCodes: { rawValue: string }[]) => {
    if (detectedCodes.length > 0) {
      // QR 인식 성공
      console.log("QR:", detectedCodes[0].rawValue);

      // 서버 조회 결과라고 가정
      setResult(responseData);
    }
  };

  // 카메라 접근 실패 또는 스캔 에러 처리 함수
  const handleError = (err: unknown) => {
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError("카메라 접근에 실패했습니다.");
    }
  };

  const tracker: TrackFunction = (detectedCodes, ctx) => {
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
  };

  return result ? (
    <QRresult result={result} />
  ) : (
    <div className="flex flex-col items-center p-6">
      <h2 className="mb-6 text-2xl">
        <p className={font.headline2.bold} style={{ color: lightTheme.label.normal }}>
          QR 코드 스캐너
        </p>
      </h2>

      <div className="relative w-full max-w-[400px] overflow-hidden rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
        <Scanner
          onScan={handleScan}
          onError={handleError}
          constraints={{ facingMode: "environment" }}
          components={{
            tracker,
            finder: false,
          }}
        />

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="relative w-[60%]">
            <img
              src={PeekkomAgua}
              alt="빼꼼! 아거"
              className="absolute w-[5rem] top-[-2.25rem] left-[30%]"
            />
            <div
              className="aspect-square rounded-lg border-solid border-3 shadow-[0_0_0_9999px_rgba(0,0,0,0.3)]"
              style={{ borderColor: palette.main[70] }}
            />
          </div>
        </div>
      </div>

      {error && (
        <p className="mt-4 text-sm" style={{ color: lightTheme.status.error }}>
          {error}
        </p>
      )}
    </div>
  );
};
