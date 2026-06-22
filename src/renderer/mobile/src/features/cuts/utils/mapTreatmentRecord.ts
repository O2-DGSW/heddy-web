import type { TreatmentRecord } from "@/entities/qr/model/qr.types";
import type { ProcedureNote } from "@/features/cuts/model/types/AddProcedureNoteModal.types";

export const mapTreatmentRecordToProcedureNote = (
  record: TreatmentRecord,
  customerName: string
): ProcedureNote => ({
  id: String(record.record_id),
  customerName,
  title: record.service_tags.join(", "),
  description: record.memo,
  date: new Date(record.created_at),
  tags: record.service_tags.join(", "),
  imageUrl: record.before_image_url,
  afterImageUrl: record.after_image_url,
  isPublic: record.is_public,
});
