export interface MyProfileInfoResponse {
  userId: number;
  name: string;
  userType: "DESIGNER" | "CUSTOMER" | "OWNER";
  reservationCount: number;
  treatmentRecordCount: number;
  savedStyleCount: number;
  shopMembers: { shopId: number; shopName: string; memberRole: string }[];
}
