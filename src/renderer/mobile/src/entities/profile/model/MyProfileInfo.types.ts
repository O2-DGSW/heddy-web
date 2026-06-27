export interface MyProfileInfoResponse {
  userId: number;
  name: string;
  userType: string;
  reservationCount: number;
  treatmentRecordCount: number;
  savedStyleCount: number;
  shopMembers: { shopId: number; shopName: string; memberRole: string }[];
}
