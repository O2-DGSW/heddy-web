import { lightTheme } from "@design-tokens";

interface QRresultProps {
  result: string | null;
  onReset: () => void;
}

export const QRresult = ({ result, onReset }: QRresultProps) => {
  if (!result) return null;

  return (
    <div
      className="mt-6 w-full max-w-[400px] rounded-xl p-5 text-center"
      style={{ backgroundColor: lightTheme.fill.normal }}
    >
      {/* 결과 라벨 */}
      <p className="m-0 text-sm text-[#666]">스캔 결과:</p>

      {/* 실제 QR 데이터 출력 */}
      <p
        className="mt-2 break-all text-base font-medium"
        style={{ color: lightTheme.label.normal }}
      >
        {result}
      </p>

      {/* 다시 스캔 버튼 */}
      <button
        className="mt-4 cursor-pointer rounded-lg border-none px-5 py-2.5 text-sm font-medium"
        style={{ backgroundColor: lightTheme.status.info, color: lightTheme.fill.normal }}
        onClick={onReset}
      >
        다시 스캔
      </button>
    </div>
  );
};
