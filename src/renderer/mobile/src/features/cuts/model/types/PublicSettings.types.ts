export interface PublicSettingsCutsResponse {
  id: string;
  customerName: string;
  title: string;
  description: string;
  tags: string;
  imageUrl: string | null;
  publicSettings: boolean;
}
