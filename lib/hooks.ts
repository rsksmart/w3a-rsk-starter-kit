import { useCallback, useState } from "react";

export const useClipboard = () => {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);

  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        setError(null);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  return { copied, error, copyToClipboard };
};
