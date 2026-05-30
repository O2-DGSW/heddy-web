import { useNavigate, useParams } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { font, lightTheme } from "@design-tokens";

interface QrCodeProps {
  value?: string;
  size?: number;
}

export const QrCode = ({ value: valueProp, size = 200 }: QrCodeProps) => {
  const navigate = useNavigate();
  const { description } = useParams<{ description: string }>();
  const value = valueProp ?? decodeURIComponent(description ?? "");

  if (!value) return null;

  return (
    <div className="h-full flex flex-col" style={{ backgroundColor: lightTheme.fill.normal }}>
      {/* 상단 헤더 */}
      <div className="flex items-center px-4 py-3">
        <button className="flex items-center gap-1" onClick={() => navigate("/cuts")}>
          <span className={font.body.regular} style={{ color: lightTheme.primary.normal }}>
            ← 이전으로 가기
          </span>
        </button>
      </div>

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
          {value}
        </p>
      </div>
    </div>
  );
};
