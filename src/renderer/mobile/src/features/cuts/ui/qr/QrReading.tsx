import { useState } from "react";
import { Scanner, type TrackFunction } from "@yudiel/react-qr-scanner";
import { font, lightTheme, palette } from "@design-tokens";
import PeekkomAgua from "@/features/cuts/assets/qr-reading/peekkom-agua.png";
import { QRresult } from "./QRresult";

export const QrReading = () => {
  // QR 스캔 결과 저장 state
  const [result, setResult] = useState<string | null>(null);

  // 카메라/스캔 에러 메시지 저장 state
  const [error, setError] = useState<string | null>(null);

  // QR 코드 스캔 성공 시 실행되는 함수
  const handleScan = (detectedCodes: { rawValue: string }[]) => {
    if (detectedCodes.length > 0) {
      setResult(detectedCodes[0].rawValue);
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

  return (
    // 전체 화면 컨테이너
    <div className="flex flex-col items-center p-6">
      {/* 페이지 제목 영역 */}
      <h2 className="mb-6 text-2xl">
        <p className={font.headline2.bold} style={{ color: lightTheme.label.normal }}>
          QR 코드 스캐너
        </p>
      </h2>

      {/* QR 스캐너 전체 영역 */}
      <div className="relative w-full max-w-[400px] overflow-hidden rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
        {/* 실제 카메라 및 QR 인식 컴포넌트 */}
        <Scanner
          onScan={handleScan}
          onError={handleError}
          constraints={{ facingMode: "environment" }}
          components={{
            tracker,
            finder: false,
          }}
        />

        {/* 스캔 가이드 오버레이 */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          {/* QR을 맞추는 중앙 가이드 박스 */}
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

      <QRresult result={result} onReset={() => setResult(null)} />

      {/* 에러 메시지 출력 영역 */}
      {error && (
        <p className="mt-4 text-sm" style={{ color: lightTheme.status.error }}>
          {error}
        </p>
      )}
    </div>
  );
};
