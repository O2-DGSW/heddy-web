import { Scanner } from "@yudiel/react-qr-scanner";
import { font, lightTheme, palette } from "@design-tokens";
import PeekkomAgua from "@/features/cuts/assets/qr-reading/peekkom-agua.png";
import { QRresult } from "./QRresult";
import { useQRreading } from "@/features/cuts/model/useQRreading";

export const QrReading = () => {
  const { result, cameraReady, error, handleScan, handleError, tracker } = useQRreading();

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
        {cameraReady && (
          <Scanner
            onScan={handleScan}
            onError={handleError}
            constraints={{ facingMode: "environment" }}
            components={{
              tracker,
              finder: false,
            }}
          />
        )}

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="relative w-[60%]">
            <img
              src={PeekkomAgua}
              alt="빼꼼! 아거"
              className="absolute w-[5rem] top-[-2.25rem] left-[30%]"
            />
            <div
              className="aspect-square rounded-lg border-solid border-[3px] shadow-[0_0_0_9999px_rgba(0,0,0,0.3)]"
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
