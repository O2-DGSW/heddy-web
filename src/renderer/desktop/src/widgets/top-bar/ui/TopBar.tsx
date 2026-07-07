import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { lightTheme, palette } from "@design-tokens";

import { clearAccessToken } from "@/entities/auth/model/token";
import { getMe, type MeResponse } from "@/entities/user/api/userApi";
import { showErrorToastFromError } from "@/lib/toast";
import designerDinosaurImage from "@/pages/employee/assets/png/designer-dinosaur.png";
import alarmIcon from "@/widgets/top-bar/assets/svg/alarm.svg";
import checkIcon from "@/widgets/top-bar/assets/svg/check.svg";
import dashboardLogo from "@/widgets/top-bar/assets/svg/logo.svg";
import heddyLogo from "@/widgets/top-bar/assets/svg/heddy-logo.svg";
import profileIcon from "@/widgets/top-bar/assets/svg/profile.svg";

const TOP_BAR_SHADOW = `0 1px 4px color-mix(in srgb, ${lightTheme.label.strong} 9%, transparent)`;
const MENU_SHADOW = `0 0 8px color-mix(in srgb, ${lightTheme.label.strong} 10%, transparent)`;

type ProfileDialog = "edit" | "logout" | null;

interface ProfileFormValues {
  shopName: string;
  ownerName: string;
  password: string;
  phone: string;
}

const dashboardTopBarStyle = {
  "--top-bar-focus-ring": `color-mix(in srgb, ${lightTheme.primary.normal} 35%, transparent)`,
  "--profile-menu-bg": palette.main[97],
  "--profile-menu-bg-hover": palette.main[90],
  "--profile-menu-border": palette.main[90],
  "--profile-menu-text": palette.main[70],
  "--modal-divider": lightTheme.line.alternative,
  backgroundColor: lightTheme.background.normal,
  boxShadow: TOP_BAR_SHADOW,
} as CSSProperties;

const createProfileFormValues = (profile: MeResponse | null): ProfileFormValues => ({
  shopName: profile?.shopMembers[0]?.shopName ?? "",
  ownerName: profile?.name ?? "",
  password: "",
  phone: "",
});

const getProfileAccountName = (profile: MeResponse | null) => {
  if (!profile?.name) return "현재 계정";

  return profile.name;
};

interface ProfileFieldProps {
  label: string;
  placeholder: string;
  value: string;
  type?: "password" | "text" | "tel";
  onChange: (value: string) => void;
}

const ProfileField = ({
  label,
  placeholder,
  value,
  type = "text",
  onChange,
}: ProfileFieldProps) => {
  return (
    <label className="flex w-full flex-col items-end gap-3">
      <span
        className="h-[19px] w-[372px] text-[16px] font-medium leading-[1.3] tracking-[-0.32px]"
        style={{ color: lightTheme.label.assistive }}
      >
        {label}
      </span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={event => onChange(event.target.value)}
        className="h-[42px] w-full rounded-[10px] border-0 px-[15px] text-[14px] font-normal leading-[1.3] tracking-[-0.28px] outline-none transition-shadow placeholder:text-[color:var(--profile-placeholder)] focus-visible:ring-2 focus-visible:ring-[color:var(--top-bar-focus-ring)]"
        style={
          {
            "--profile-placeholder": lightTheme.label.assistive,
            backgroundColor: lightTheme.background.neutral,
            color: lightTheme.label.assistive,
          } as CSSProperties
        }
      />
    </label>
  );
};

interface ProfileEditDialogProps {
  values: ProfileFormValues;
  onChange: (values: ProfileFormValues) => void;
  onClose: () => void;
  onSave: () => void;
}

const ProfileEditDialog = ({ values, onChange, onClose, onSave }: ProfileEditDialogProps) => {
  const updateField = (field: keyof ProfileFormValues) => (value: string) => {
    onChange({ ...values, [field]: value });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={onClose}
    >
      <form
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-edit-title"
        className="relative h-[661px] max-h-[calc(100vh-32px)] w-[440px] max-w-[calc(100vw-32px)] overflow-hidden rounded-[20px] bg-white"
        onClick={event => event.stopPropagation()}
        onSubmit={event => {
          event.preventDefault();
          onSave();
        }}
      >
        <div className="absolute left-1/2 top-1/2 flex w-[383px] max-w-[calc(100%-56px)] -translate-x-1/2 -translate-y-1/2 flex-col items-end gap-[35px]">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-[9px]">
              <div className="flex items-center justify-between">
                <h2
                  id="profile-edit-title"
                  className="text-[20px] font-semibold leading-[1.3] tracking-[-0.4px]"
                  style={{ color: lightTheme.label.neutral }}
                >
                  정보 수정
                </h2>
                <button
                  type="button"
                  aria-label="정보 수정 닫기"
                  className="relative size-7 rounded-full transition-colors hover:bg-[color:var(--profile-menu-bg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--top-bar-focus-ring)]"
                  onClick={onClose}
                  style={{ color: lightTheme.label.neutral }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 top-1/2 h-[1.6px] w-[13px] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full"
                    style={{ backgroundColor: lightTheme.label.neutral }}
                  />
                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 top-1/2 h-[1.6px] w-[13px] -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full"
                    style={{ backgroundColor: lightTheme.label.neutral }}
                  />
                </button>
              </div>
              <div className="h-px w-full bg-[color:var(--modal-divider)]" />
            </div>

            <div className="flex flex-col items-center gap-6">
              <div
                className="flex size-[100px] items-center justify-center overflow-hidden rounded-full"
                style={{ backgroundColor: lightTheme.fill.normal }}
              >
                <img
                  src={designerDinosaurImage}
                  alt=""
                  aria-hidden="true"
                  className="h-[65.5px] w-[68.9px] max-w-none object-contain"
                />
              </div>

              <div className="flex w-full flex-col gap-5">
                <ProfileField
                  label="미용실 이름"
                  placeholder="대소고 헤어샵"
                  value={values.shopName}
                  onChange={updateField("shopName")}
                />
                <ProfileField
                  label="원장 이름"
                  placeholder="오용준"
                  value={values.ownerName}
                  onChange={updateField("ownerName")}
                />
                <ProfileField
                  label="비밀번호"
                  placeholder="******************"
                  value={values.password}
                  type="password"
                  onChange={updateField("password")}
                />
                <ProfileField
                  label="전화번호"
                  placeholder="010-1234-5678"
                  value={values.phone}
                  type="tel"
                  onChange={updateField("phone")}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-[6px]">
            <button
              type="button"
              className="flex h-8 w-[60px] items-center justify-center rounded-md px-[10px] py-1 text-[16px] font-semibold leading-[1.3] tracking-[-0.32px] transition-colors hover:bg-[#eeeeef] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--top-bar-focus-ring)]"
              onClick={onClose}
              style={{
                backgroundColor: lightTheme.background.neutral,
                color: lightTheme.line.normal,
              }}
            >
              취소
            </button>
            <button
              type="submit"
              className="flex h-8 w-[60px] items-center justify-center rounded-md px-[10px] py-1 text-[16px] font-semibold leading-[1.3] tracking-[-0.32px] transition-colors hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--top-bar-focus-ring)]"
              style={{ backgroundColor: lightTheme.primary.normal, color: lightTheme.fill.normal }}
            >
              저장
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

interface LogoutConfirmDialogProps {
  accountName: string;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutConfirmDialog = ({ accountName, onClose, onConfirm }: LogoutConfirmDialogProps) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={onClose}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-dialog-title"
        className="w-full max-w-[290px] rounded-[20px] bg-white px-[23px] py-[17px]"
        onClick={event => event.stopPropagation()}
      >
        <div className="flex flex-col items-end gap-[26px]">
          <div className="flex w-full flex-col gap-3">
            <h2
              id="logout-dialog-title"
              className="text-[18px] font-bold leading-[1.3] tracking-[-0.36px]"
              style={{ color: lightTheme.label.neutral }}
            >
              로그아웃
            </h2>
            <p
              className="text-[12px] font-medium leading-[1.3] tracking-[-0.24px]"
              style={{ color: lightTheme.label.assistive }}
            >
              정말{" "}
              <strong
                className="text-[14px] font-semibold tracking-[-0.28px]"
                style={{ color: lightTheme.label.alternative }}
              >
                {accountName}
              </strong>
              의 계정에서 로그아웃하시겠습니까?
            </p>
          </div>

          <div className="flex gap-[6px]">
            <button
              type="button"
              className="rounded-md px-[10px] py-1 text-[12px] font-semibold leading-[1.3] tracking-[-0.24px] transition-colors hover:bg-[#eeeeef] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--top-bar-focus-ring)]"
              onClick={onClose}
              style={{
                backgroundColor: lightTheme.background.neutral,
                color: lightTheme.line.normal,
              }}
            >
              취소
            </button>
            <button
              type="button"
              className="rounded-md px-[10px] py-1 text-[12px] font-semibold leading-[1.3] tracking-[-0.24px] text-white transition-colors hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--top-bar-focus-ring)]"
              onClick={onConfirm}
              style={{ backgroundColor: lightTheme.status.error }}
            >
              로그아웃
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

const AuthTopBar = () => {
  return (
    <header className="flex h-[clamp(48px,8vh,72px)] items-start px-5 pt-[clamp(10px,2.2vh,20px)] sm:px-10 lg:px-20">
      <Link to="/" aria-label="Heddy home">
        <img src={heddyLogo} alt="heddy" className="h-[clamp(22px,3.8vh,32px)] w-auto" />
      </Link>
    </header>
  );
};

const DashboardTopBar = () => {
  const navigate = useNavigate();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [activeDialog, setActiveDialog] = useState<ProfileDialog>(null);
  const [profile, setProfile] = useState<MeResponse | null>(null);
  const [profileFormValues, setProfileFormValues] = useState<ProfileFormValues>(() =>
    createProfileFormValues(null)
  );
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const hasRequestedProfileRef = useRef(false);

  useEffect(() => {
    if (!isProfileMenuOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (profileMenuRef.current?.contains(event.target as Node)) return;
      setIsProfileMenuOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isProfileMenuOpen]);

  useEffect(() => {
    if (!isProfileMenuOpen && activeDialog === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      setIsProfileMenuOpen(false);
      setActiveDialog(null);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeDialog, isProfileMenuOpen]);

  useEffect(() => {
    if ((!isProfileMenuOpen && activeDialog === null) || hasRequestedProfileRef.current) return;

    let isCancelled = false;
    hasRequestedProfileRef.current = true;

    void getMe()
      .then(me => {
        if (isCancelled) return;
        setProfile(me);
        setProfileFormValues(createProfileFormValues(me));
      })
      .catch(error => {
        if (isCancelled) return;
        setProfile(null);
        showErrorToastFromError(error, "프로필 정보를 불러오지 못했습니다.");
      });

    return () => {
      isCancelled = true;
    };
  }, [activeDialog, isProfileMenuOpen]);

  const openProfileDialog = (dialog: Exclude<ProfileDialog, null>) => {
    setIsProfileMenuOpen(false);
    setActiveDialog(dialog);
  };

  const closeProfileDialog = () => {
    setActiveDialog(null);
  };

  const handleProfileSave = () => {
    setActiveDialog(null);
  };

  const handleLogout = () => {
    clearAccessToken();
    setActiveDialog(null);
    setIsProfileMenuOpen(false);
    navigate("/login", { replace: true });
  };

  return (
    <header
      className="relative z-40 flex h-[68px] min-h-[68px] w-full shrink-0 items-center px-[clamp(16px,1.49vw,23px)]"
      style={dashboardTopBarStyle}
    >
      <div className="mx-auto flex h-full w-full max-w-[1467px] min-w-0 items-center justify-between gap-6">
        <Link to="/" aria-label="Heddy dashboard" className="shrink-0">
          <img src={dashboardLogo} alt="heddy" className="h-[26px] w-[78px]" />
        </Link>

        <div className="flex shrink-0 items-center gap-4">
          <button
            type="button"
            aria-label="알림"
            className="flex size-[34px] items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--top-bar-focus-ring)]"
          >
            <img src={alarmIcon} alt="" className="size-[30px]" aria-hidden="true" />
          </button>

          <div ref={profileMenuRef} className="relative">
            <button
              type="button"
              aria-label="프로필 메뉴"
              aria-haspopup="menu"
              aria-expanded={isProfileMenuOpen}
              className="flex size-10 items-center justify-center overflow-visible rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--top-bar-focus-ring)]"
              onClick={() => setIsProfileMenuOpen(current => !current)}
            >
              <img src={profileIcon} alt="" className="size-[46px] max-w-none" aria-hidden="true" />
            </button>

            {isProfileMenuOpen && (
              <div
                role="menu"
                aria-label="프로필 메뉴"
                className="absolute right-0 top-[calc(100%+8px)] z-50 w-[104px] overflow-hidden rounded-lg border text-[14px] font-medium leading-[1.3] tracking-[-0.28px]"
                style={{
                  backgroundColor: palette.main[97],
                  borderColor: palette.main[90],
                  boxShadow: MENU_SHADOW,
                  color: palette.main[70],
                }}
              >
                <button
                  type="button"
                  role="menuitem"
                  className="flex h-9 w-full items-center justify-center gap-[9px] border-b transition-colors hover:bg-[color:var(--profile-menu-bg-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[color:var(--top-bar-focus-ring)]"
                  onClick={() => openProfileDialog("edit")}
                  style={{ borderColor: palette.main[90] }}
                >
                  <img src={checkIcon} alt="" aria-hidden="true" className="size-[15px]" />
                  <span>정보수정</span>
                </button>
                <button
                  type="button"
                  role="menuitem"
                  className="flex h-9 w-full items-center justify-center transition-colors hover:bg-[color:var(--profile-menu-bg-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[color:var(--top-bar-focus-ring)]"
                  onClick={() => openProfileDialog("logout")}
                >
                  로그아웃
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {activeDialog === "edit" && (
        <ProfileEditDialog
          values={profileFormValues}
          onChange={setProfileFormValues}
          onClose={closeProfileDialog}
          onSave={handleProfileSave}
        />
      )}

      {activeDialog === "logout" && (
        <LogoutConfirmDialog
          accountName={getProfileAccountName(profile)}
          onClose={closeProfileDialog}
          onConfirm={handleLogout}
        />
      )}
    </header>
  );
};

const TopBar = () => {
  const { pathname } = useLocation();
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  return isAuthPage ? <AuthTopBar /> : <DashboardTopBar />;
};

export { TopBar };
