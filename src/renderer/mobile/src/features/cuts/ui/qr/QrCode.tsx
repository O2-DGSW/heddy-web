import { QRCodeSVG } from "qrcode.react";
import { font, lightTheme } from "@design-tokens";
import { MY_QR_CODE_VALUE } from "@/features/cuts/constrants/qrCode.ts";

interface QrCodeProps {
  value?: string;
  size?: number;
}

export const QrCode = ({ value: valueProp, size = 200 }: QrCodeProps) => {
  const value = valueProp ?? MY_QR_CODE_VALUE;

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
          <QRCodeSVG value={value} size={size} level="M" marginSize={1} />
        </div>
        <p
          className={`${font.body.regular} max-w-[240px] break-all text-center`}
          style={{ color: lightTheme.label.assistive }}
        >
          내 QR코드
        </p>
      </div>
    </div>
  );
};
