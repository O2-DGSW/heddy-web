import { font, lightTheme } from "@design-tokens";
import agerSadSvg from "@/features/cuts/assets/procedute-note/agerSad.svg";
import { ProcedureNoteItem } from "@/features/cuts/ui/ProcedureNoteItem.tsx";
import icRoundPlus from "@/features/cuts/assets/procedute-note/ic_round-plus.svg";
import { AddProcedureNoteModal } from "@/private/shared/ui/dialog";
import { useQRresultProcedure } from "@/features/cuts/model/useQRresultProcedure.ts";

type QrSuccessData = {
  name: string;
  phone: string;
  cutsCount: number;
};

interface QRresultProps {
  result: QrSuccessData | null;
}

export const QRresult = ({ result }: QRresultProps) => {
  if (!result) return null;

  const {
    notes,
    isOpen,
    onOpen,
    onClose,
    form,
    onChangeTitle,
    onChangeDescription,
    onChangeDate,
    onChangeTags,
    onChangeImage,
    onSubmit,
  } = useQRresultProcedure(result.name);

  return (
    <div className="w-full h-full flex flex-col items-center">
      {/* 고객 정보 */}
      <div
        className="w-full h-[9rem] px-[3rem] flex items-center"
        style={{ backgroundColor: lightTheme.fill.normal }}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-[full] h-[full] rounded-full flex items-center justify-center"
            style={{ backgroundColor: lightTheme.primary.normal }}
          >
            <img src="" alt="아거" className="w-[3.5rem] h-[3.5rem]" />
          </div>

          <div className="flex flex-col justify-between h-[3.5rem]">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <p className={font.headline2.bold} style={{ color: lightTheme.label.normal }}>
                  {result.name}
                </p>
                <p className={font.headline2.semiBold} style={{ color: lightTheme.label.normal }}>
                  님
                </p>
              </div>

              <p className={font.body.medium} style={{ color: lightTheme.label.assistive }}>
                ·
              </p>

              <p className={font.body.regular} style={{ color: lightTheme.label.assistive }}>
                {result.phone}
              </p>
            </div>

            <div className="flex items-center">
              <p className={font.headline2.semiBold} style={{ color: lightTheme.primary.normal }}>
                {result.cutsCount}
              </p>

              <p className={font.body.regular} style={{ color: lightTheme.label.assistive }}>
                회 시술
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 고객 시술 리스트 */}
      <div className="h-full flex flex-col overflow-hidden pb-20">
        <p
          className={`${font.headline2.semiBold} py-4`}
          style={{ color: lightTheme.label.alternative }}
        >
          {result.name}님의 시술기록
        </p>
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
          <div className="flex-1 overflow-y-auto flex flex-col gap-3">
            {notes.map(note => (
              <ProcedureNoteItem key={note.id} note={note} bgColorGreen />
            ))}
          </div>
        )}
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
    </div>
  );
};
