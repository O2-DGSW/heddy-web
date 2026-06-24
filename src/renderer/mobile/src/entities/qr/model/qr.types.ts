export type IssueQrResponse = {
  qr_token: string;
};

export type TreatmentRecord = {
  record_id: number;
  service_tags: string[];
  before_image_url: string | null;
  after_image_url: string | null;
  memo: string;
  is_public: boolean;
  next_visit_date: string | null;
  created_at: string;
  designer_name: string;
  shop_name: string;
};

export type VerifyQrResponse = {
  customer_id: number;
  customer_name: string;
  profile_image_url: string | null;
  last_visit_date: string | null;
  treatment_records: TreatmentRecord[];
};
