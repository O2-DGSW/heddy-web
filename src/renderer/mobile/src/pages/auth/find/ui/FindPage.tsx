import { useNavigate, useParams } from 'react-router-dom';
import { font, lightTheme } from '@design-tokens';
import { FindIdForm, FindPasswordForm } from '@/features/auth/find';
import arrowSvg from '@/private/shared/ui/dialog/assets/Arrow.svg';

export const FindPage = () => {
  const navigate = useNavigate();
  const { type } = useParams<{ type: string }>();
  const isPassword = type === 'password';
  const title = isPassword ? '비밀번호 찾기' : '아이디 찾기';

  return (
    <div
      className="relative h-full overflow-y-auto flex flex-col items-center px-6 pt-8"
      style={{ backgroundColor: lightTheme.background.normal }}
    >
      <button type="button" onClick={() => navigate(-1)} className="absolute left-4 top-5 p-1">
        <img src={arrowSvg} alt="뒤로가기" className="w-4 h-4" />
      </button>
      <div className="flex flex-col items-center gap-2 mb-10">
        <img src="/heddyIcon.svg" alt="heddy" className="w-50" />
        <p className={font.body.medium} style={{ color: lightTheme.label.assistive }}>
          {title}
        </p>
      </div>
      {isPassword ? <FindPasswordForm /> : <FindIdForm />}
    </div>
  );
};
