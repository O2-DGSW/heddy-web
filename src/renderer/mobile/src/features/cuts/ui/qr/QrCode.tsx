import { QRCodeSVG } from "qrcode.react";
import { font, lightTheme } from "@design-tokens";
import { useQrIssue } from "@/features/cuts/model/useQrIssue";

interface QrCodeProps {
  size?: number;
}

export const QrCode = ({ size = 200 }: QrCodeProps) => {
  const { qrToken, error } = useQrIssue();

  return (
    <div className="h-full flex flex-col" style={{ backgroundColor: lightTheme.fill.normal }}>
      {/* QR 코드 */}
      <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6">
        <div
          className="rounded-2xl p-5"
          style={{
            background: lightTheme.background.normal,
            border: `0.5px solid ${lightTheme.line.normal}`,
          }}
        >
          {qrToken && <QRCodeSVG value={qrToken} size={size} level="M" marginSize={1} />}
        </div>
        <p
          className={`${font.body.regular} max-w-[240px] break-all text-center`}
          style={{ color: error ? lightTheme.status.error : lightTheme.label.assistive }}
        >
          {error ?? "내 QR코드"}
        </p>
      </div>
    </div>
  );
};
