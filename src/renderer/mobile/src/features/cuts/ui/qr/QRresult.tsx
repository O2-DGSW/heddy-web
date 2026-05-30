import { font, lightTheme } from "@design-tokens";

interface QrSuccessData {
  name: string;
  phone: string;
  cutsCount: number;
}

interface QRresultProps {
  result: QrSuccessData | null;
}

export const QRresult = ({ result }: QRresultProps) => {
  if (!result) return null;

  return (
    <div className="w-full h-full flex flex-col items-center">
      {/* 고객 정보 */}
      <div
        className="w-full h-[9rem] px-[3rem] flex items-center"
        style={{ backgroundColor: lightTheme.fill.normal }}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-[3.5rem] h-[3.5rem] rounded-full flex items-center justify-center"
            style={{ backgroundColor: lightTheme.primary.normal }}
          >
            <img src="" alt="아거" className="w-[3.5rem] h-[3.5rem]" />
          </div>

          <div className="flex flex-col justify-between h-[3.5rem]">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <p className={font.headline2.bold} style={{ color: lightTheme.label.normal }}>
                  {result.name}
                </p>
                <p className={font.headline2.semiBold} style={{ color: lightTheme.label.normal }}>
                  님
                </p>
              </div>

              <p className={font.body.medium} style={{ color: lightTheme.label.assistive }}>
                ·
              </p>

              <p className={font.body.regular} style={{ color: lightTheme.label.assistive }}>
                {result.phone}
              </p>
            </div>

            <div className="flex items-center">
              <p className={font.headline2.semiBold} style={{ color: lightTheme.primary.normal }}>
                {result.cutsCount}
              </p>

              <p className={font.body.regular} style={{ color: lightTheme.label.assistive }}>
                회 시술
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 고객 시술 리스트 */}
      <div></div>
    </div>
  );
};
