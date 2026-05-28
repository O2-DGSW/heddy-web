import { QRCodeSVG } from "qrcode.react";
import { font, lightTheme } from "@design-tokens";

interface QrCodeProps {
  value: string;
  size?: number;
}

export const QrCode = ({ value, size = 200 }: QrCodeProps) => {
  if (!value) return null;

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <div
        className="rounded-2xl p-5"
        style={{
          background: lightTheme.background.normal,
          border: `0.5px solid ${lightTheme.line.normal}`,
        }}
      >
        <QRCodeSVG value={value} size={size} level="M" marginSize={1} />
      </div>
      <p
        className={`${font.body.regular} max-w-[240px] break-all text-center`}
        style={{ color: lightTheme.label.assistive }}
      >
        {value}
      </p>
    </div>
  );
};
