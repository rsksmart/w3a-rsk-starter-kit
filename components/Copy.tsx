import { useClipboard } from "@/lib/hooks";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";

export default function Copy({ text }: { text: string }) {
  const { copied, copyToClipboard } = useClipboard();

  return (
    <button onClick={() => copyToClipboard(text)}>
      {copied ? <CheckIcon /> : <CopyIcon />}
    </button>
  );
}
