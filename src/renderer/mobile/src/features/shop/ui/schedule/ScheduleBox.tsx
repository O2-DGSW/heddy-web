import { lightTheme } from "@design-tokens";

interface ScheduleBox {
  startTime: string;
  endTime: string;
}

export const ScheduleBox = ({ startTime, endTime }: ScheduleBox) => {
  return (
    <div className="flex flex-row w-full items-center">
      <div
        className="flex items-center justify-center w-[1rem] h-[1rem] rounded-full mr-[0.5rem]"
        style={{ backgroundColor: lightTheme.primary.normal }}
      >
        <div
          className="w-[0.5rem] h-[0.5rem] rounded-full"
          style={{ backgroundColor: lightTheme.background.normal }}
        />
      </div>

      <div>
        용준이 머리깎이기!
        <div className="w-full">
          <span>{startTime.slice(0, 5)}</span> ~ <span>{endTime.slice(0, 5)}</span>
        </div>
      </div>
    </div>
  );
};
