import { lightTheme } from "@design-tokens";

interface QRresultProps {
  result: string | null;
  onReset: () => void;
}

export const QRresult = ({ result, onReset }: QRresultProps) => {
  if (!result) return null;

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-full h-[7rem]" style={{ backgroundColor: lightTheme.fill.normal }}></div>
    </div>
  );
};
