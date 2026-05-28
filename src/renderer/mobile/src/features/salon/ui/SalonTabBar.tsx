import { TabBar } from "@/private/shared/ui/tab-bar";

import { SALON_TABS } from "@/features/salon/constrants/tabs";

/**
 * 미용실 페이지 탭바
 * - 공통 TabBar 컴포넌트에 salon 전용 탭 목록을 전달
 */
export const SalonTabBar = () => {
  return <TabBar tabs={SALON_TABS} />;
};