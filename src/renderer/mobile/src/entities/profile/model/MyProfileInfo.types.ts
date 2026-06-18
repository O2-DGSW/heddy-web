export interface MyProfileInfoResponse {
  userId: string;
  name: string;
  shopMembers: { shopId: number; shopName: string; memberRole: string }[];
}
