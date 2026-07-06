import { font, lightTheme } from "@design-tokens";
import ArrowIcon from "@/features/profile/assets/default/setting-field/Arrow.svg";
import { SETTING_ITEMS } from "@/features/profile/constrants/setting-items.ts";
import type { SettingItemProps } from "@/features/profile";
import { useDefaultSetting } from "@/features/profile/model/default/useDefaultSetting.ts";

const SettingItem = ({ icon, alt, title, onClick }: SettingItemProps) => {
  return (
    <button className="w-full" onClick={onClick}>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row gap-[0.5rem]">
          <img className="size-[1.125rem]" src={icon} alt={alt} />
          <p className={font.body.medium} style={{ color: lightTheme.label.alternative }}>
            {title}
          </p>
        </div>
        <img className="size-[1.125rem]" src={ArrowIcon} alt="arrow" />
      </div>
    </button>
  );
};

const LogoutConfirmDialog = ({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center px-8" style={{ backgroundColor: "rgba(0,0,0,0.4)" }}>
    <div className="w-full rounded-2xl overflow-hidden" style={{ backgroundColor: lightTheme.background.normal }}>
      <div className="px-6 py-7 flex flex-col items-center gap-2">
        <p className={font.headline1.semiBold} style={{ color: lightTheme.label.neutral }}>
          로그아웃
        </p>
        <p className={font.body.medium} style={{ color: lightTheme.label.assistive }}>
          정말 로그아웃하겠습니까?
        </p>
      </div>
      <div className="flex" style={{ borderTop: `1px solid ${lightTheme.line.alternative}` }}>
        <button
          className={`flex-1 py-4 ${font.body.medium}`}
          style={{ color: lightTheme.label.assistive }}
          onClick={onCancel}
        >
          취소
        </button>
        <div style={{ width: 1, backgroundColor: lightTheme.line.alternative }} />
        <button
          className={`flex-1 py-4 ${font.body.bold}`}
          style={{ color: lightTheme.status.error }}
          onClick={onConfirm}
        >
          로그아웃
        </button>
      </div>
    </div>
  </div>
);

export const DefaultSetting = () => {
  const { handleNavigate, handleLogoutConfirm, showLogoutConfirm, handleLogoutCancel, handleLogout } = useDefaultSetting();

  return (
    <>
      {showLogoutConfirm && (
        <LogoutConfirmDialog onConfirm={handleLogout} onCancel={handleLogoutCancel} />
      )}

      <div className="size-full px-[1.4rem] py-[2.25rem]">
        <div className="w-full rounded-[1rem]" style={{ backgroundColor: lightTheme.background.normal }}>
          <div className="flex flex-col p-[1.275rem] gap-[1.725rem]">
            <p className={font.headline1.semiBold} style={{ color: lightTheme.label.assistive }}>
              설정
            </p>

            <div className="flex flex-col gap-[1.5rem]">
              {SETTING_ITEMS.map((item) => (
                <SettingItem
                  key={item.title}
                  icon={item.icon}
                  alt={item.alt}
                  title={item.title}
                  onClick={() => handleNavigate(item.alt)}
                />
              ))}

              <button className="w-full text-left" onClick={handleLogoutConfirm}>
                <p className={font.body.medium} style={{ color: lightTheme.status.error }}>
                  로그아웃
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
