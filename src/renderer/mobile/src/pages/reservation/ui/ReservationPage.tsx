import { font, lightTheme } from "@design-tokens";
import { Calendar } from "@/shared/ui/calendar";
import { useEffect, useState } from "react";
import {
  DEFAULT_SHOP_SCHEDULE_DATE,
  SHOP_SCHEDULE_WEEK_DAYS,
} from "@/features/reservation/constants/schedule-calander.ts";
import { useGetMyProfileQuery } from "@/entities/profile/api/query/useGetMyProfile.query.ts";
import { useShopInfoQuery } from "@/entities/shop/api/query/useShopInfo.query.ts";

enum HairTag {
  MALE = "남자",
  FEMALE = "여성",
  FIRST_VISIT = "첫방문",
  CUT = "컷트",
  BANGS_CUT = "앞머리",
  LAYERED_CUT = "레이어드",
  MALE_CUT = "남자컷",
  PERM = "펌",
  DOWN_PERM = "다운펌",
  VOLUME_PERM = "볼륨펌",
  SETTING_PERM = "셋팅펌",
  AS_PERM = "애즈펌",
  IRON_PERM = "아이롱펌",
  STRAIGHT_PERM = "매직",
  VOLUME_STRAIGHT = "볼륨매직",
  COLORING = "염색",
  ROOT_COLORING = "뿌리염색",
  TONE_DOWN = "톤다운",
  BLEACH = "탈색",
  CLINIC = "클리닉",
  CARE = "케어",
  SCALP = "두피",
  SCALP_CARE = "두피케어",
  SPA = "스파",
  RECOVERY = "복구",
  STYLING = "스타일링",
  DRY = "드라이",
  CONSULTATION = "상담",
  RESERVATION = "예약",
}

const HAIR_TAG_ENTRIES = Object.entries(HairTag) as [keyof typeof HairTag, HairTag][];

export const ReservationPage = () => {
  const [selectedDate, setSelectedDate] = useState(DEFAULT_SHOP_SCHEDULE_DATE);
  // 변경 1: 여러 개를 담을 수 있도록 string[] 배열 상태로 변경합니다.
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [designer, setDesigner] = useState("");

  const myInfo = useGetMyProfileQuery();
  const myShopId = myInfo?.data?.shopMembers[0].shopId;
  const shopData = useShopInfoQuery({ shopId: myShopId });
  const DESIGNER_LIST = shopData?.data?.designers;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [storeInfo, setStoreInfo] = useState<{
    selectedDate: string;
    selectedTags: string[];
    designer: string;
  } | null>(null);

  const handleSave = () => {
    const newStoreInfo = {
      selectedDate,
      selectedTags, // 변경 2: 저장할 데이터 구조 업데이트
      designer,
    };

    setStoreInfo(newStoreInfo);
    console.log(newStoreInfo);
  };

  useEffect(() => {
    if (storeInfo) {
      console.log("저장값 변경:", storeInfo);
    }
  }, [storeInfo]);

  const handleCancel = () => {
    setSelectedTags([]); // 변경 3: 취소 시 빈 배열로 초기화
    setDesigner("");
    setStoreInfo(null);
    setIsDropdownOpen(false);
  };

  // 변경 4: 다중 선택 토글 핸들러 (클릭한 value가 있으면 빼고, 없으면 넣기)
  const handleTagClick = (tagValue: string) => {
    setSelectedTags(prevTags =>
      prevTags.includes(tagValue) ? prevTags.filter(t => t !== tagValue) : [...prevTags, tagValue]
    );
  };

  const handleSelectDesigner = (name: string) => {
    setDesigner(name);
    setIsDropdownOpen(false);
  };

  return (
    <>
      {/* 헤더 */}
      <p
        className={`${font.headline1.bold} text-center py-[1rem]`}
        style={{ color: lightTheme.label.neutral }}
      >
        예약하기
      </p>

      {/* 날짜 선택 */}
      <div className={"flex flex-col items-center gap-[1rem] w-full px-[1rem]"}>
        <div className={"flex flex-row items-center justify-between w-full"}>
          <p className={font.headline2.bold} style={{ color: lightTheme.label.neutral }}>
            날짜 선택
          </p>
          <div />
        </div>
        <div className="w-full h-[1.5px]" style={{ backgroundColor: lightTheme.fill.neutral }} />
        <Calendar
          initialMonthDate={DEFAULT_SHOP_SCHEDULE_DATE}
          selectedDate={selectedDate}
          variant="mobile"
          viewMode="month"
          weekDays={SHOP_SCHEDULE_WEEK_DAYS}
          className="mx-auto max-w-[393px]"
          onSelectDate={setSelectedDate}
        />
      </div>

      <div
        className="w-full h-[0.75rem] my-[1rem]"
        style={{ backgroundColor: lightTheme.fill.normal }}
      />

      {/* 예약 정보 */}
      <div className={"flex flex-col items-center gap-[1rem] w-full px-[1rem] mt-[2rem]"}>
        <div className={"flex flex-row items-center justify-between w-full"}>
          <p className={font.headline2.bold} style={{ color: lightTheme.label.neutral }}>
            예약 정보
          </p>
          <div className={`flex flex-row items-center justify-between gap-[0.5rem]`}>
            <button
              onClick={handleCancel}
              className={`${font.label.semiBold} px-[1rem] py-[0.4rem] rounded-lg`}
              style={{
                backgroundColor: lightTheme.background.neutral,
                color: lightTheme.line.normal,
              }}
            >
              취소
            </button>

            <button
              onClick={handleSave}
              className={`${font.label.semiBold} px-[1rem] py-[0.4rem] rounded-lg`}
              style={{
                backgroundColor: lightTheme.primary.normal,
                color: lightTheme.fill.normal,
              }}
            >
              저장
            </button>
          </div>
        </div>
        <div className="w-full h-[1.5px]" style={{ backgroundColor: lightTheme.fill.neutral }} />

        <p className={`w-full ${font.label.medium}`} style={{ color: lightTheme.label.assistive }}>
          디자이너 찾기
        </p>

        {/* 디자이너 드롭다운 */}
        <div className="relative w-[100%]">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(prev => !prev)}
            className="w-full p-[0.75rem] rounded-lg text-left"
            style={{
              backgroundColor: lightTheme.background.neutral,
              color: designer ? lightTheme.label.normal : lightTheme.line.normal,
            }}
          >
            {designer || "디자이너 찾기"}
          </button>

          {isDropdownOpen && (
            <div
              className="absolute left-0 top-[110%] w-full rounded-lg shadow-lg z-50 p-2 border max-h-[200px] overflow-y-auto"
              style={{
                backgroundColor: lightTheme.background.neutral,
                borderColor: lightTheme.fill.neutral,
              }}
            >
              <ul className="flex flex-col gap-1">
                {DESIGNER_LIST?.map(member => (
                  <li key={member.designer_id}>
                    <button
                      type="button"
                      onClick={() => handleSelectDesigner(member.name)}
                      className="w-full text-left p-[0.75rem] rounded-lg transition-colors hover:bg-[var(--hover-bg)] hover:text-[var(--hover-text)]"
                      style={
                        {
                          backgroundColor: "transparent",
                          color: lightTheme.label.normal,
                          "--hover-bg": lightTheme.primary.normal,
                          "--hover-text": lightTheme.fill.normal,
                        } as React.CSSProperties
                      }
                    >
                      {member.name}
                    </button>
                  </li>
                ))}

                {(!DESIGNER_LIST || DESIGNER_LIST.length === 0) && (
                  <li className="text-center p-4 text-xs" style={{ color: lightTheme.line.normal }}>
                    소속된 디자이너가 없습니다.
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        <p className={`w-full ${font.label.medium}`} style={{ color: lightTheme.label.assistive }}>
          시술 태그
        </p>

        <div className="w-full">
          <div className="flex flex-wrap w-full gap-2 px-1">
            {HAIR_TAG_ENTRIES.map(([key, value]) => {
              const isSelected = selectedTags.includes(value);

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleTagClick(value)}
                  className="flex-shrink-0 px-4 py-2 rounded-lg transition-colors"
                  style={{
                    backgroundColor: isSelected
                      ? lightTheme.primary.normal
                      : lightTheme.background.neutral,
                    color: isSelected ? lightTheme.fill.normal : lightTheme.label.normal,
                  }}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
