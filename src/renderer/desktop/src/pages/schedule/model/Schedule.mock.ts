import { addDaysToDateKey, getTodayDateKey } from "@/shared/ui/calendar/model/date";

import {
  DEFAULT_SCHEDULE_DESIGNER_ID,
  SCHEDULE_DESIGNERS,
  SCHEDULE_TIME_STEP_MINUTES,
} from "./Schedule.constant";
import type { ScheduleColorKey, ScheduleEvent } from "./Schedule.types";

interface ScheduleMockSpec {
  color: ScheduleColorKey;
  customerName: string;
  dayOffset: number;
  designerId: string;
  durationMinutes: number;
  startTime: string;
  tags: string[];
}

const SCHEDULE_MOCK_VISIBLE_DAY_COUNT = 7;
const SCHEDULE_MOCK_START_DATE = getTodayDateKey();
const SCHEDULE_MOCK_DATE_KEYS = Array.from({ length: SCHEDULE_MOCK_VISIBLE_DAY_COUNT }, (_, day) =>
  addDaysToDateKey(SCHEDULE_MOCK_START_DATE, day)
);

const toHour = (time: string) => {
  const [hour = "0", minute = "0"] = time.split(":");

  return Number(hour) + Number(minute) / 60;
};

const snapHourToScheduleStep = (hour: number) => {
  const totalMinutes =
    Math.round(Math.round(hour * 60) / SCHEDULE_TIME_STEP_MINUTES) * SCHEDULE_TIME_STEP_MINUTES;

  return totalMinutes / 60;
};

const getDesigner = (designerId: string) =>
  SCHEDULE_DESIGNERS.find(designer => designer.id === designerId) ?? SCHEDULE_DESIGNERS[0];

const createScheduleMockEvent = (id: number, spec: ScheduleMockSpec): ScheduleEvent => {
  const designer = getDesigner(spec.designerId);
  const startHour = snapHourToScheduleStep(toHour(spec.startTime));
  const endHour = Math.min(
    24,
    snapHourToScheduleStep(startHour + spec.durationMinutes / 60)
  );
  const date = SCHEDULE_MOCK_DATE_KEYS[spec.dayOffset] ?? SCHEDULE_MOCK_START_DATE;

  return {
    id,
    customerName: spec.customerName,
    designerId: designer?.id ?? DEFAULT_SCHEDULE_DESIGNER_ID,
    designerName: designer?.name ?? "오용준",
    tags: spec.tags,
    color: spec.color,
    date,
    dayIndex: spec.dayOffset,
    startHour,
    endHour: Math.max(endHour, startHour + SCHEDULE_TIME_STEP_MINUTES / 60),
  };
};

const SCHEDULE_MOCK_SPECS: ScheduleMockSpec[] = [
  {
    dayOffset: 0,
    startTime: "07:00",
    durationMinutes: 20,
    customerName: "오용준",
    designerId: "oh-yong-jun",
    tags: ["# 남자", "# 다운펌"],
    color: "green",
  },
  {
    dayOffset: 0,
    startTime: "08:20",
    durationMinutes: 40,
    customerName: "김민지",
    designerId: "kim-heddy",
    tags: ["# 여성", "# 컷트"],
    color: "blue",
  },
  {
    dayOffset: 0,
    startTime: "09:40",
    durationMinutes: 70,
    customerName: "박서연",
    designerId: "lee-designer",
    tags: ["# 염색", "# 클리닉"],
    color: "yellow",
  },
  {
    dayOffset: 0,
    startTime: "13:20",
    durationMinutes: 50,
    customerName: "이준호",
    designerId: "oh-yong-jun",
    tags: ["# 펌", "# 상담"],
    color: "red",
  },
  {
    dayOffset: 0,
    startTime: "17:30",
    durationMinutes: 80,
    customerName: "최유진",
    designerId: "kim-heddy",
    tags: ["# 뿌리염색", "# 케어"],
    color: "green",
  },
  {
    dayOffset: 0,
    startTime: "21:10",
    durationMinutes: 30,
    customerName: "정하린",
    designerId: "lee-designer",
    tags: ["# 앞머리", "# 드라이"],
    color: "blue",
  },
  {
    dayOffset: 1,
    startTime: "08:10",
    durationMinutes: 50,
    customerName: "윤도현",
    designerId: "oh-yong-jun",
    tags: ["# 남자컷", "# 스타일링"],
    color: "yellow",
  },
  {
    dayOffset: 1,
    startTime: "10:30",
    durationMinutes: 90,
    customerName: "한지우",
    designerId: "kim-heddy",
    tags: ["# 매직", "# 클리닉"],
    color: "green",
  },
  {
    dayOffset: 1,
    startTime: "14:50",
    durationMinutes: 30,
    customerName: "강다은",
    designerId: "lee-designer",
    tags: ["# 두피", "# 케어"],
    color: "blue",
  },
  {
    dayOffset: 1,
    startTime: "18:20",
    durationMinutes: 60,
    customerName: "송지훈",
    designerId: "oh-yong-jun",
    tags: ["# 다운펌", "# 컷트"],
    color: "red",
  },
  {
    dayOffset: 2,
    startTime: "07:40",
    durationMinutes: 40,
    customerName: "문서아",
    designerId: "kim-heddy",
    tags: ["# 첫방문", "# 상담"],
    color: "green",
  },
  {
    dayOffset: 2,
    startTime: "11:10",
    durationMinutes: 80,
    customerName: "임채원",
    designerId: "lee-designer",
    tags: ["# 레이어드", "# 컷"],
    color: "yellow",
  },
  {
    dayOffset: 2,
    startTime: "15:30",
    durationMinutes: 50,
    customerName: "배현우",
    designerId: "oh-yong-jun",
    tags: ["# 남자", "# 볼륨펌"],
    color: "blue",
  },
  {
    dayOffset: 2,
    startTime: "20:00",
    durationMinutes: 70,
    customerName: "노수아",
    designerId: "kim-heddy",
    tags: ["# 염색", "# 톤다운"],
    color: "red",
  },
  {
    dayOffset: 3,
    startTime: "09:00",
    durationMinutes: 60,
    customerName: "서지안",
    designerId: "lee-designer",
    tags: ["# 셋팅펌", "# 케어"],
    color: "green",
  },
  {
    dayOffset: 3,
    startTime: "12:20",
    durationMinutes: 20,
    customerName: "홍예린",
    designerId: "oh-yong-jun",
    tags: ["# 앞머리", "# 컷"],
    color: "blue",
  },
  {
    dayOffset: 3,
    startTime: "16:40",
    durationMinutes: 90,
    customerName: "장민성",
    designerId: "kim-heddy",
    tags: ["# 탈색", "# 염색"],
    color: "yellow",
  },
  {
    dayOffset: 3,
    startTime: "22:00",
    durationMinutes: 40,
    customerName: "유나연",
    designerId: "lee-designer",
    tags: ["# 드라이", "# 예약"],
    color: "red",
  },
  {
    dayOffset: 4,
    startTime: "08:30",
    durationMinutes: 60,
    customerName: "신태오",
    designerId: "oh-yong-jun",
    tags: ["# 남자컷", "# 다운펌"],
    color: "green",
  },
  {
    dayOffset: 4,
    startTime: "13:00",
    durationMinutes: 70,
    customerName: "권하은",
    designerId: "kim-heddy",
    tags: ["# 볼륨매직", "# 케어"],
    color: "blue",
  },
  {
    dayOffset: 4,
    startTime: "17:10",
    durationMinutes: 30,
    customerName: "차은서",
    designerId: "lee-designer",
    tags: ["# 컷트", "# 드라이"],
    color: "yellow",
  },
  {
    dayOffset: 4,
    startTime: "19:50",
    durationMinutes: 80,
    customerName: "민준서",
    designerId: "oh-yong-jun",
    tags: ["# 펌", "# 남자"],
    color: "red",
  },
  {
    dayOffset: 5,
    startTime: "10:00",
    durationMinutes: 50,
    customerName: "오세린",
    designerId: "kim-heddy",
    tags: ["# 뿌리염색", "# 클리닉"],
    color: "green",
  },
  {
    dayOffset: 5,
    startTime: "14:10",
    durationMinutes: 90,
    customerName: "류지후",
    designerId: "lee-designer",
    tags: ["# 애즈펌", "# 상담"],
    color: "blue",
  },
  {
    dayOffset: 5,
    startTime: "18:40",
    durationMinutes: 40,
    customerName: "백소윤",
    designerId: "oh-yong-jun",
    tags: ["# 두피케어", "# 스파"],
    color: "yellow",
  },
  {
    dayOffset: 5,
    startTime: "21:30",
    durationMinutes: 60,
    customerName: "남도윤",
    designerId: "kim-heddy",
    tags: ["# 컷", "# 다운펌"],
    color: "red",
  },
  {
    dayOffset: 6,
    startTime: "07:20",
    durationMinutes: 30,
    customerName: "고예준",
    designerId: "lee-designer",
    tags: ["# 남자", "# 스타일링"],
    color: "green",
  },
  {
    dayOffset: 6,
    startTime: "11:50",
    durationMinutes: 70,
    customerName: "주아린",
    designerId: "oh-yong-jun",
    tags: ["# 레이어드", "# 드라이"],
    color: "blue",
  },
  {
    dayOffset: 6,
    startTime: "15:00",
    durationMinutes: 50,
    customerName: "하민재",
    designerId: "kim-heddy",
    tags: ["# 아이롱펌", "# 컷트"],
    color: "yellow",
  },
  {
    dayOffset: 6,
    startTime: "20:40",
    durationMinutes: 80,
    customerName: "표서윤",
    designerId: "lee-designer",
    tags: ["# 염색", "# 복구"],
    color: "red",
  },
];

export const SCHEDULE_EVENTS = SCHEDULE_MOCK_SPECS.map((spec, index) =>
  createScheduleMockEvent(index + 1, spec)
);
