import { useEffect, useState } from "react";
import { issueQr } from "@/entities/qr/api/qrApi";

export const useQrIssue = () => {
  const [qrToken, setQrToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    issueQr()
      .then(({ qr_token }) => setQrToken(qr_token))
      .catch((err: Error) => setError(err.message));
  }, []);

  return { qrToken, error };
};
