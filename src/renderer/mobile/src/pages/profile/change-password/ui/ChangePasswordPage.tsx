import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { font, lightTheme } from '@design-tokens';
import arrowSvg from '@/private/shared/ui/dialog/assets/Arrow.svg';
import { PasswordInput } from '@/private/shared/ui/password-input/PasswordInput';
import { myProfileInfoApi } from '@/entities/profile/api/myProfileInfoApi';

export const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit =
    currentPassword.length > 0 &&
    newPassword.length > 0 &&
    newPassword === passwordConfirm &&
    !isSubmitting;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setIsSubmitting(true);
    setError(null);
    try {
      await myProfileInfoApi.updatePassword(currentPassword, newPassword);
      navigate(-1);
    } catch (e) {
      setError(e instanceof Error ? e.message : '비밀번호 변경에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex flex-col overflow-hidden pt-safe"
      style={{ backgroundColor: lightTheme.background.normal }}
    >
      <div className="relative flex items-center px-4 py-3 pt-5 shrink-0">
        <button type="button" onClick={() => navigate(-1)} className="absolute left-4 p-1">
          <img src={arrowSvg} alt="뒤로가기" className="w-4 h-4" />
        </button>
        <h2
          className={`flex-1 text-center ${font.headline1.semiBold}`}
          style={{ color: lightTheme.label.neutral }}
        >
          비밀번호 변경
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto flex flex-col px-6 pt-8 gap-4">
        <div className="flex flex-col gap-1">
          <p className={`${font.label.medium} pl-2`} style={{ color: lightTheme.label.assistive }}>
            현재 비밀번호
          </p>
          <PasswordInput
            placeholder="현재 비밀번호"
            value={currentPassword}
            onChange={setCurrentPassword}

          />
        </div>

        <div className="flex flex-col gap-1">
          <p className={`${font.label.medium} pl-2`} style={{ color: lightTheme.label.assistive }}>
            새 비밀번호
          </p>
          <PasswordInput
            placeholder="새 비밀번호"
            value={newPassword}
            onChange={setNewPassword}

          />
          <PasswordInput
            placeholder="새 비밀번호 확인"
            value={passwordConfirm}
            onChange={setPasswordConfirm}

          />
        </div>

        {error && (
          <p className={`${font.caption.regular} pl-2`} style={{ color: lightTheme.status.error }}>
            {error}
          </p>
        )}
      </div>

      <div className="px-6 pb-8 shrink-0">
        <button
          className={`w-full py-4 rounded-2xl ${font.headline2.semiBold}`}
          style={{
            backgroundColor: canSubmit ? lightTheme.primary.normal : lightTheme.line.alternative,
            color: canSubmit ? lightTheme.fill.normal : lightTheme.line.normal,
          }}
          disabled={!canSubmit}
          onClick={handleSubmit}
        >
          {isSubmitting ? '변경 중...' : '비밀번호 변경'}
        </button>
      </div>
    </div>
  );
};
