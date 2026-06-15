import { lightTheme, palette } from "@design-tokens";

import { customerGrades } from "@/pages/home/model/homeDashboardData";
import { DashboardCard, MoreButton } from "@/pages/home/ui/components/DashboardPrimitives";

const CustomerGradeCard = () => (
  <DashboardCard className="flex h-[407px] w-full flex-col overflow-hidden px-[31px] pt-[31px]">
    <div className="flex h-[26px] items-center justify-between">
      <h2
        className="font-['Pretendard'] text-[20px] font-bold leading-[1.3] tracking-normal"
        style={{ color: lightTheme.label.neutral }}
      >
        고객 등급 현황
      </h2>
      <MoreButton />
    </div>

    <div className="mt-10 flex flex-col gap-[19px]">
      {customerGrades.map(grade => (
        <div
          key={grade.label}
          className="grid h-[27px] grid-cols-[48px_minmax(0,1fr)_34px] items-center gap-5"
        >
          <span
            className="font-['Pretendard'] text-[20px] font-semibold leading-[1.3] tracking-normal"
            style={{ color: lightTheme.label.neutral }}
          >
            {grade.label}
          </span>
          <div
            className="h-[27px] overflow-hidden rounded-full"
            style={{ backgroundColor: palette.neutral[95] }}
          >
            <div
              className="flex h-full items-center justify-end rounded-full pr-2.5 font-['Pretendard'] text-[16px] font-medium leading-[1.3] tracking-normal"
              style={{
                width: `${(grade.barWidth / 392) * 100}%`,
                backgroundColor: grade.color,
                color: grade.valueColor ?? lightTheme.label.buttonText,
              }}
            >
              {grade.value}
            </div>
          </div>
          <span
            className="text-right font-['Pretendard'] text-[16px] font-medium leading-[1.3] tracking-normal"
            style={{ color: lightTheme.label.alternative }}
          >
            {grade.percent}
          </span>
        </div>
      ))}
    </div>

    <div
      className="mt-auto flex h-[59px] items-center justify-between border-t px-[17px] font-['Pretendard'] leading-[1.3] tracking-normal"
      style={{ borderColor: lightTheme.background.neutral }}
    >
      <span className="text-[16px] font-medium" style={{ color: lightTheme.label.alternative }}>
        전체 고객
      </span>
      <strong className="text-[20px] font-semibold" style={{ color: lightTheme.label.neutral }}>
        127명
      </strong>
    </div>
  </DashboardCard>
);

export { CustomerGradeCard };
