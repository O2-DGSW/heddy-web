import { font, lightTheme } from "@design-tokens";
import agerSadSvg from "@/features/cuts/assets/procedute-note/agerSad.svg";

export const NotfoundCutsList = () => {
  return (
    <div
      className="h-full flex flex-col items-center justify-center"
      style={{ backgroundColor: lightTheme.fill.normal }}
    >
      <div className="flex flex-col items-center gap-3">
        <img src={agerSadSvg} alt="시술기록 없음" className="w-32 h-32" />
        <p
          className={`text-center ${font.body.regular}`}
          style={{ color: lightTheme.label.assistive }}
        >
          시술기록이
          <br />
          존재하지 않아요..
        </p>
      </div>
    </div>
  );
};
