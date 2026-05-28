export type StatItem = {
  label: string;
  value: number;
};

export type ShopInfoData = {
  name: string;
  reviewCount: number;
  tags: string[];
  stats: StatItem[];
  address: string;
  phone: string;
  hours: string;
};