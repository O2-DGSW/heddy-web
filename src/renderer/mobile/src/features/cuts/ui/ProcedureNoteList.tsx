// 시술기록 목록 UI
import { font, lightTheme } from "@design-tokens";

import { useAddProcedureNote } from "@/features/cuts/model/useAddProcedureNote";
import agerSadSvg from "@/features/cuts/assets/procedute-note/agerSad.svg";
import icRoundPlus from "@/features/cuts/assets/procedute-note/ic_round-plus.svg";
import { AddProcedureNoteModal } from "@/private/shared/ui/dialog";

/** 시술기록 목록 컴포넌트 - 기록이 없을 때 빈 상태 화면 표시 */
export const ProcedureNoteList = () => {
  const { isOpen, onOpen, onClose, form, onChangeTitle, onChangeDescription, onChangeDate, onChangeTags, onChangeImage, onSubmit } =
    useAddProcedureNote();

  return (
    <div
      className="h-full flex flex-col overflow-hidden pb-20"
      style={{ backgroundColor: lightTheme.fill.normal }}
    >
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

      {/* 시술기록 추가 FAB 버튼 */}
      <button
        className="fixed right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
        style={{
          bottom: "calc(env(safe-area-inset-bottom) + 5.75rem)",
          backgroundColor: lightTheme.primary.normal,
        }}
        onClick={onOpen}
      >
        <img src={icRoundPlus} alt="추가" className="w-8 h-8" />
      </button>

      <AddProcedureNoteModal
        isOpen={isOpen}
        onClose={onClose}
        form={form}
        onChangeTitle={onChangeTitle}
        onChangeDescription={onChangeDescription}
        onChangeDate={onChangeDate}
        onChangeTags={onChangeTags}
        onChangeImage={onChangeImage}
        onSubmit={onSubmit}
      />
    </div>
  );
};