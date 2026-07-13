import { useRef, useState, useEffect } from "react";

import { font, lightTheme } from "@design-tokens";
import pictureSvg from "@/features/cuts/assets/procedute-note/Picture.svg";

interface ImageUploadAreaProps {
  label: string;
  initialFile?: File | null;
  onFileChange: (file: File | null) => void;
}

export const ImageUploadArea = ({ label, initialFile, onFileChange }: ImageUploadAreaProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    if (!initialFile) {
      void Promise.resolve().then(() => {
        if (isMounted) {
          setPreviewUrl(null);
        }
      });

      return () => {
        isMounted = false;
      };
    }

    const url = URL.createObjectURL(initialFile);
    void Promise.resolve().then(() => {
      if (isMounted) {
        setPreviewUrl(url);
      }
    });

    return () => {
      isMounted = false;
      URL.revokeObjectURL(url);
    };
  }, [initialFile]);

  const handleClick = () => inputRef.current?.click();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    onFileChange(selected);
  };

  return (
    <button
      type="button"
      className="flex-1 h-28 rounded-xl flex flex-col items-center justify-center gap-1 overflow-hidden border"
      style={{ borderColor: lightTheme.line.alternative }}
      onClick={handleClick}
    >
      {previewUrl ? (
        <img src={previewUrl} alt={label} className="w-full h-full object-cover" />
      ) : (
        <>
          <img src={pictureSvg} alt="사진 등록" className="w-7 h-7" />
          <span className={font.label.medium} style={{ color: lightTheme.label.assistive }}>
            {label}
          </span>
          <span className={font.caption.regular} style={{ color: lightTheme.line.normal }}>
            이미지를 업로드하세요
          </span>
        </>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
    </button>
  );
};
