import { TabBar } from "@/private/shared/ui/tab-bar";

import { SHOP_TABS } from "@/features/shop/constrants/tabs";

/**
 * 미용실 페이지 탭바
 * - 공통 TabBar 컴포넌트에 shop 전용 탭 목록을 전달
 */
export const ShopTabBar = () => {
  return <TabBar tabs={SHOP_TABS} />;
};