"use client";
import { Copy } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

const buildCssFontName = (fontName: string): string => {
  const escaped = fontName.replaceAll("\"", "\\\"");
  if (/[\\s"'()]/.test(fontName)) {
    return `"${escaped}"`;
  }
  return escaped;
};

const CopyFontNameButton = ({ fontName }: { fontName: string }) => {
  const cssName = buildCssFontName(fontName);

  return (
    <Button
      variant="outline"
      className="bg-transparent hover:bg-slate-500/5 transition-all rounded-full px-2 h-8 border-slate-800/5 border-2"
      title={`复制 ${cssName}`}
      aria-label={`复制 ${cssName}`}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(cssName);
          toast.success(`已复制 ${cssName}`);
        } catch (error) {
          toast.error("复制失败");
        }
      }}
    >
      <Copy className="size-4" />
    </Button>
  );
};

export default CopyFontNameButton;
