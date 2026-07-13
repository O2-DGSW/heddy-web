import { lightTheme } from "@design-tokens";

import type { CustomerGrade } from "@/pages/home/model/homeDashboardData";
import { DashboardCard, MoreButton } from "@/pages/home/ui/components/DashboardPrimitives";

const formatCount = (value: number) => new Intl.NumberFormat("ko-KR").format(value);

const CustomerGradeCard = ({
  grades = [],
  totalCustomerCount = 0,
}: {
  grades?: CustomerGrade[];
  totalCustomerCount?: number;
}) => (
  <DashboardCard className="relative h-[407px] w-full overflow-hidden">
    <div className="absolute left-[-1px] top-[31px] flex w-[574px] flex-col items-center gap-10">
      <div className="flex h-[26px] w-[511px] items-center justify-between">
        <h2
          className="flex w-[112px] flex-col justify-center font-['Pretendard'] text-[20px] font-bold leading-[1.3] tracking-[-0.4px]"
          style={{ color: lightTheme.label.neutral }}
        >
          고객 등급 현황
        </h2>
        <MoreButton />
      </div>

      <div className="flex w-[514px] flex-col gap-[19px]">
        {grades.map(grade => (
          <div key={grade.label} className="flex h-[27px] w-full items-center gap-5">
            <span
              className="flex w-12 shrink-0 flex-col justify-center font-['Pretendard'] text-[20px] font-semibold leading-[1.3] tracking-[-0.4px]"
              style={{ color: lightTheme.label.neutral }}
            >
              {grade.label}
            </span>
            <div
              className="relative h-[27px] w-[392px] shrink-0 overflow-hidden rounded-[20px]"
              style={{ backgroundColor: lightTheme.label.buttonText }}
            >
              <div
                className="absolute left-0 top-0 h-[27px] rounded-[20px]"
                style={{
                  width: `${grade.barWidth}px`,
                  backgroundColor: grade.color,
                }}
              />
              <span
                className="absolute top-[3px] font-['Pretendard'] text-[16px] font-medium leading-[1.3] tracking-[-0.32px] whitespace-nowrap"
                style={{
                  left: `${grade.valueLeft}px`,
                  color:
                    grade.valueColor ??
                    (grade.barWidth < 32
                      ? lightTheme.label.assistive
                      : lightTheme.label.buttonText),
                }}
              >
                {grade.value}
              </span>
            </div>
            <span
              className="w-[34px] shrink-0 font-['Pretendard'] text-[16px] font-medium leading-[1.3] tracking-[-0.32px] whitespace-nowrap"
              style={{ color: lightTheme.label.alternative }}
            >
              {grade.percent}
            </span>
          </div>
        ))}
      </div>

      <div
        className="relative h-[59px] w-[544px] shrink-0 overflow-hidden border-t"
        style={{ borderColor: lightTheme.background.neutral }}
      >
        <div className="absolute left-1/2 top-1/2 flex w-[510px] -translate-x-1/2 -translate-y-1/2 items-start justify-between font-['Pretendard'] leading-[1.3]">
          <span
            className="text-[16px] font-medium tracking-[-0.32px] whitespace-nowrap"
            style={{ color: lightTheme.label.alternative }}
          >
            전체 고객
          </span>
          <strong
            className="flex min-w-[51px] flex-col items-end justify-center text-[20px] font-semibold leading-[1.3] tracking-[-0.4px] whitespace-nowrap"
            style={{ color: lightTheme.label.neutral }}
          >
            {formatCount(totalCustomerCount)}명
          </strong>
        </div>
      </div>
    </div>
  </DashboardCard>
);

export { CustomerGradeCard };
