export interface ShopInfoResponse {
  shopId: number;
  shop_name: string;
  address: string;
  phone_number: string;
  description: string;
  open_hours: string;
  tags: string[];
  designers: { designerId: number; name: string; profile_image_url: string }[];
  created_at: string;
}

export interface ShopInfoRequest {
  shopId: number;
}
