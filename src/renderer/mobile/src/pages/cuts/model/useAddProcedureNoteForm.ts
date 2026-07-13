import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { customerApi } from "@/entities/customer/api/customerApi";
import { useGetMyProfileQuery } from "@/entities/profile/api/query/useGetMyProfile.query";
import { useAddProcedureNoteStore } from "@/features/cuts/model/add-procedure/useAddProcedureNoteStore.ts";
import { formatPhone } from "@/private/shared/utils/formatPhone";

const toInputDateValue = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const useAddProcedureNoteForm = () => {
  const navigate = useNavigate();
  const { data: profile } = useGetMyProfileQuery();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    title, setTitle,
    memo, setMemo,
    date, setDate,
    phoneNumber, setPhoneNumber,
    price, setPrice,
    selectedTags, toggleTag,
    beforeImageFile, setBeforeImageFile,
    afterImageFile, setAfterImageFile,
    reset,
  } = useAddProcedureNoteStore();

  const handlePhoneChange = (value: string) => setPhoneNumber(formatPhone(value));

  const handleSubmit = async () => {
    const shopId = profile?.shopMembers?.[0]?.shopId;
    if (!shopId) {
      setSubmitError("소속 미용실 정보를 찾을 수 없어요.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await customerApi.registerTreatmentRecord({
        shopId,
        phoneNumber: phoneNumber.replace(/\D/g, ""),
        title: title || undefined,
        treatmentDate: toInputDateValue(date),
        serviceTags: selectedTags.length > 0 ? selectedTags : undefined,
        memo: memo || undefined,
        price: Number(price),
        beforeImage: beforeImageFile,
        afterImage: afterImageFile,
      });
      reset();
      navigate("/cuts");
    } catch {
      setSubmitError("시술기록 등록에 실패했어요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    title, setTitle,
    memo, setMemo,
    dateValue: toInputDateValue(date),
    setDate,
    phoneNumber, handlePhoneChange,
    price, setPrice,
    selectedTags, toggleTag,
    beforeImageFile, setBeforeImageFile,
    afterImageFile, setAfterImageFile,
    isSubmitting,
    submitError,
    handleSubmit,
  };
};
