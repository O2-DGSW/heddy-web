// 공개 설정 UI
import { font, lightTheme } from "@design-tokens";
import { usePublicSettings } from "@/features/cuts/model/usePublicSettings.ts";
import { PublicSettingsCutsItem } from "@/features/cuts/ui/item/PublicSettigsCutsItem.tsx";
import { NotfoundCutsList } from "@/features/cuts/ui/NotfoundCutsList.tsx";

export const PublicSettings = () => {
  const { notes, handleTogglePublicSettings, handleSave, isDirty } = usePublicSettings();

  if (notes.length === 0) {
    return <NotfoundCutsList />;
  }

  return (
    <div
      className="h-full flex flex-col justify-between"
      style={{ backgroundColor: lightTheme.fill.normal }}
    >
      {/* 목록 */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-3 px-4 pt-4">
        {notes.map(note => (
          <PublicSettingsCutsItem
            key={note.id}
            note={note}
            toggleFunc={newValue => handleTogglePublicSettings(note.id, newValue)}
          />
        ))}
      </div>

      {/* 저장 버튼 */}
      <div
        className="px-4 py-3 shrink-0"
        style={{
          paddingBottom: "calc(env(safe-area-inset-bottom) + 6.25rem)",
        }}
      >
        <button
          type="button"
          disabled={!isDirty}
          className={`w-full py-3 rounded-xl ${font.body.bold}`}
          style={{
            backgroundColor: isDirty ? lightTheme.primary.normal : lightTheme.fill.neutral,
            color: isDirty ? lightTheme.label.buttonText : lightTheme.label.assistive,
          }}
          onClick={handleSave}
        >
          완료
        </button>
      </div>
    </div>
  );
};
