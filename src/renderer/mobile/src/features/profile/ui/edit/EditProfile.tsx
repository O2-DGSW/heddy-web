import { font, lightTheme } from "@design-tokens";

import { useDefaultProfile } from "@/features/profile/model/default/useDefaultProfile.ts";

import ProfileImg from "@/features/profile/assets/edit/ANAG.png";
import ArrowIcon from "@/features/profile/assets/edit/Arrow.svg";

export const EditProfile = () => {
  const { data } = useDefaultProfile();

  return (
    <div className="h-full px-[1.25rem] py-[1.75rem]">
      <div
        className="flex flex-col justify-between size-full"
        style={{
          backgroundColor: lightTheme.background.normal,
        }}
      >
        <div className="flex flex-row justify-between items-center">
          <button className="size-[1.25rem]">
            <img className="rotate-180 size-full" src={ArrowIcon} alt="arrow" />
          </button>
          <p className={font.headline1.semiBold} style={{ color: lightTheme.label.neutral }}>
            회원 정보 수정
          </p>
          <div className="size-[1.25rem]" />
        </div>
        <div className="flex flex-col items-center w-full gap-[1.5rem] px-[1.75rem]">
          <img className="size-[6rem]" src={ProfileImg} alt="프로필 이미지" />
          <p className={font.headline1.bold}>{data.name}</p>
        </div>
      </div>
    </div>
  );
};
