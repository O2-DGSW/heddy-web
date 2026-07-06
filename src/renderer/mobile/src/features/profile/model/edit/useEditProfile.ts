import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { myProfileInfoApi } from "@/entities/profile/api/myProfileInfoApi";
import { useSmsVerification } from "@/features/auth/signup/model/useSmsVerification";
import { formatPhone } from "@/private/shared/utils/formatPhone";

export type EditSection = "phone" | "password" | null;

export const useEditProfile = () => {
  const queryClient = useQueryClient();
  const [openSection, setOpenSection] = useState<EditSection>(null);

  // 전화번호 변경
  const [newPhone, setNewPhone] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const sms = useSmsVerification("PHONE_CHANGE", newPhone);

  // 비밀번호 변경
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [phoneSuccess, setPhoneSuccess] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const toggleSection = (section: EditSection) => {
    setOpenSection(prev => (prev === section ? null : section));
    setPhoneError(null);
    setPasswordError(null);
    setPhoneSuccess(false);
    setPasswordSuccess(false);
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

  const savePassword = async () => {
    if (newPassword !== newPasswordConfirm) {
      setPasswordError("새 비밀번호가 일치하지 않아요.");
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError("비밀번호는 8자 이상이어야 해요.");
      return;
    }
    setIsLoading(true);
    setPasswordError(null);
    try {
      await myProfileInfoApi.updatePassword(currentPassword, newPassword);
      setPasswordSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setNewPasswordConfirm("");
      setOpenSection(null);
    } catch {
      setPasswordError("비밀번호 변경에 실패했어요. 현재 비밀번호를 확인해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    openSection, toggleSection,
    // 전화번호
    newPhone, handlePhoneChange,
    verificationCode, setVerificationCode,
    sms,
    savePhone,
    phoneError, phoneSuccess,
    // 비밀번호
    currentPassword, setCurrentPassword,
    newPassword, setNewPassword,
    newPasswordConfirm, setNewPasswordConfirm,
    savePassword,
    passwordError, passwordSuccess,
    isLoading,
  };
};
