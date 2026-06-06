// 공개 설정 UI
import { font, lightTheme } from "@design-tokens";
import agerSadSvg from "@/features/cuts/assets/procedute-note/agerSad.svg";
import { usePublicSettings } from "@/features/cuts/model/usePublicSettings.ts";
import { PublicSettingsCutsItem } from "@/features/cuts/ui/item/PublicSettigsCutsItem.tsx";

export const PublicSettings = () => {
  const { notes, handleTogglePublicSettings } = usePublicSettings();

  return (
    <div
      className="h-full flex flex-col overflow-hidden pb-20"
      style={{ backgroundColor: lightTheme.fill.normal }}
    >
      {notes.length === 0 ? (
        <div className="flex-1 overflow-y-auto flex flex-col items-center justify-center">
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
      ) : (
        <div className="flex-1 overflow-y-auto flex flex-col gap-3 px-4 pt-4">
          {notes.map(note => (
            <PublicSettingsCutsItem
              key={note.id}
              note={note}
              toggleFunc={newValue => handleTogglePublicSettings(note.id, newValue)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
