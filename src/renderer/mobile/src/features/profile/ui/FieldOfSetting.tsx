import { font, lightTheme } from "@design-tokens";
import ArrowIcon from "@/features/profile/assets/setting-field/Arrow.svg";
import { SETTING_ITEMS } from "@/features/profile/constrants/setting-items.ts";
import type { SettingItemProps } from "@/features/profile";
import { useFieldOfSetting } from "@/features/profile/model/useFieldOfSetting";

const SettingItem = ({ icon, alt, title, onClick }: SettingItemProps) => {
  return (
    <button className="w-full" onClick={onClick}>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row gap-[0.5rem]">
          <img className="size-[1.125rem]" src={icon} alt={alt} />

          <p
            className={font.body.medium}
            style={{
              color: lightTheme.label.alternative,
            }}
          >
            {title}
          </p>
        </div>

        <img className="size-[1.125rem]" src={ArrowIcon} alt="arrow" />
      </div>
    </button>
  );
};

export const FieldOfSetting = () => {
  const { handleNavigation } = useFieldOfSetting();

  return (
    <div className="size-full px-[1.4rem] py-[2.25rem]">
      <div
        className="w-full rounded-[1rem]"
        style={{
          backgroundColor: lightTheme.background.normal,
        }}
      >
        <div className="flex flex-col p-[1.275rem] gap-[1.725rem]">
          <p
            className={font.headline1.semiBold}
            style={{
              color: lightTheme.label.assistive,
            }}
          >
            설정
          </p>

          <div className="flex flex-col gap-[1.5rem]">
            {SETTING_ITEMS.map((item, index) => (
              <SettingItem
                key={item.title}
                icon={item.icon}
                alt={item.alt}
                title={item.title}
                onClick={handleNavigation[index]}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
