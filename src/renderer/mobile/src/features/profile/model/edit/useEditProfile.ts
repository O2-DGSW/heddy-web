import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { myProfileInfoApi } from "@/entities/profile/api/myProfileInfoApi";
import { useSmsVerification } from "@/features/auth/signup/model/useSmsVerification";
import { formatPhone } from "@/private/shared/utils/formatPhone";

export type EditSection = "phone" | null;

export const useEditProfile = () => {
  const queryClient = useQueryClient();
  const [openSection, setOpenSection] = useState<EditSection>(null);

  const [newPhone, setNewPhone] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const sms = useSmsVerification("PHONE_CHANGE", newPhone);

  const [isLoading, setIsLoading] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [phoneSuccess, setPhoneSuccess] = useState(false);

  const toggleSection = (section: EditSection) => {
    setOpenSection(prev => (prev === section ? null : section));
    setPhoneError(null);
    setPhoneSuccess(false);
  };

  const handlePhoneChange = (value: string) => setNewPhone(formatPhone(value));

  const savePhone = async () => {
    if (!sms.isVerified) return;
    setIsLoading(true);
    setPhoneError(null);
    try {
      await myProfileInfoApi.updatePhone(newPhone.replace(/\D/g, ""));
      await queryClient.invalidateQueries({ queryKey: ["myProfile"] });
      setPhoneSuccess(true);
      setNewPhone("");
      setVerificationCode("");
      setOpenSection(null);
    } catch {
      setPhoneError("전화번호 변경에 실패했어요.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    openSection, toggleSection,
    newPhone, handlePhoneChange,
    verificationCode, setVerificationCode,
    sms,
    savePhone,
    phoneError, phoneSuccess,
    isLoading,
  };
};
