import { lightTheme } from "@design-tokens";

import emptyCharacterImage from "@/pages/schedule/assets/images/schedule-empty-character.png";

const ScheduleEmptyState = () => {
  return (
    <div className="flex h-[17.25rem] w-full flex-col items-center justify-center gap-[0.875rem]">
      <img
        src={emptyCharacterImage}
        alt=""
        className="h-[5rem] w-[5.0625rem] object-contain"
        aria-hidden="true"
      />
      <p
        className="whitespace-pre-line text-center font-['Pretendard'] text-[0.875rem] font-medium leading-[1.3]"
        style={{ color: lightTheme.label.alternative, letterSpacing: 0 }}
      >
        {"스케줄 현황이\n존재하지 않아요."}
      </p>
    </div>
  );
};

export { ScheduleEmptyState };

