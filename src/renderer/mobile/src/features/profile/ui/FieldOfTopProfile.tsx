import { font, lightTheme, palette } from "@design-tokens";

import { useFieldOfTopProfile } from "@/features/profile/model/useFieldOfTopProfile";

import ProfileImg from "@/features/profile/assets/top-field/ANAG.png";

import CustomerIcon from "@/features/profile/assets/top-field/customer.svg";
import DocumentIcon from "@/features/profile/assets/top-field/document.svg";
import DateIcon from "@/features/profile/assets/top-field/cate.svg";

interface StatItemProps {
  icon: string;
  alt: string;
  value: number;
  unit: string;
}

const StatItem = ({ icon, alt, value, unit }: StatItemProps) => {
  return (
    <div className="flex flex-col items-center gap-[0.25rem]">
      <img className="size-[2.25rem]" src={icon} alt={alt} />

      <div className="flex flex-row gap-[0.175rem]">
        <p
          className={font.label.medium}
          style={{
            color: lightTheme.primary.normal,
          }}
        >
          {value}
        </p>

        <p
          className={font.label.medium}
          style={{
            color: lightTheme.label.assistive,
          }}
        >
          {unit}
        </p>
      </div>
    </div>
  );
};

export const FieldOfTopProfile = () => {
  const { data } = useFieldOfTopProfile();

  const stats = [
    {
      icon: CustomerIcon,
      alt: "customer",
      value: data.customer,
      unit: "명",
    },
    {
      icon: DateIcon,
      alt: "date",
      value: data.cutCnt,
      unit: "건",
    },
    {
      icon: DocumentIcon,
      alt: "document",
      value: data.cutData,
      unit: "데이터",
    },
  ];

  return (
    <div className="h-full px-[1.25rem] py-[1.75rem]">
      <div
        className="flex flex-col justify-between size-full"
        style={{
          backgroundColor: lightTheme.background.normal,
        }}
      >
        <div className="flex flex-row w-full gap-[1.5rem] px-[1.75rem]">
          <img className="size-[4rem]" src={ProfileImg} alt="프로필 이미지" />

          <div className="flex flex-row items-center gap-[0.5rem]">
            <div className="flex flex-row items-center gap-[0.325rem]">
              <p className={font.headline1.bold}>{data.name}</p>

              <p className={font.headline1.bold}>님</p>
            </div>

            <p
              className={font.headline2.regular}
              style={{
                color: lightTheme.label.assistive,
              }}
            >
              ·
            </p>

            <p
              className={font.headline2.regular}
              style={{
                color: lightTheme.label.assistive,
              }}
            >
              {data.role}
            </p>
          </div>
        </div>

        <div
          className="
            flex flex-row justify-around
            w-full rounded-[1rem]
            px-[1rem] py-[0.5rem]
          "
          style={{
            backgroundColor: palette.main[97],
          }}
        >
          {stats.map(item => (
            <StatItem
              key={item.alt}
              icon={item.icon}
              alt={item.alt}
              value={item.value}
              unit={item.unit}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
