import { useEffect, useState } from "react";
import { issueQr } from "@/entities/qr/api/qrApi";

export const useQrIssue = () => {
  const [qrToken, setQrToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    issueQr()
      .then(({ qr_token }) => {
        if (!ignore) {
          setQrToken(qr_token);
        }
      })
      .catch((err: Error) => {
        if (!ignore) {
          setError(err.message);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  return { qrToken, error };
};
