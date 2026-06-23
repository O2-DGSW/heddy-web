export interface MyProfileInfoResponse {
  userId: number;
  name: string;
  shopMembers: { shopId: number; shopName: string; memberRole: string }[];
}
