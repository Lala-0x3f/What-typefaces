import { Glyph } from "@/lib/parse font";
import { cn } from "@/lib/utils";
import { Table } from "opentype.js";
import React, { useState } from "react";
import { toast } from "sonner";

const u = (codePoint: number) => {
  return String.fromCodePoint(codePoint);
};

interface GlyphsProps {
  glyphs: Glyph[];
  fontName: string;
  color: string;
  t: Table;
}

const Glyphs: React.FC<GlyphsProps> = ({ glyphs, fontName, color, t }) => {
  const [inspectorGlyph, setInspectorGlyph] = useState("x");

  // const ex: number = t.os2.sxHeight;
  // const em: number = (t.os2.usWinAscent + t.os2.usWinDescent)*(t.os2.sxHeight/t.os2.sCapHeight)
  // const em: number = t.hhea.ascender
  // const em: number = t.os2.sCapHeight - t.os2.sTypoDescender;
  // const m = glyphs.find((v) =>
  //   ["U+006D", "m", "uni006D", "0x6D", "u006D"].includes(v.name || "")
  // );
  const m = glyphs.find((v) => (v.unicode === "M".charCodeAt(0)));
  const len = glyphs.length

  glyphs = glyphs.slice(0, 1200);
  // console.log("t.os2.usWinAscent",m, t.os2.usWinAscent);
  let em: number;

  if (m&&m.advanceWidth >= 1500) {
    em = t.hhea.ascender;
    // em = t.os2.usWinAscent + t.os2.usWinDescent
  } else if (m&&m.advanceWidth >= 1000) {
    em = 2048;
  } else if (m&&m.advanceWidth >= 500) {
    em = 1024;
  } else {
    em = 256;
  }

  if(em<t.os2.sCapHeight){
    em = t.os2.usWinAscent
  }
  console.log(em,m)

  return (
    <div className="grid md:grid-cols-2" style={{ fontFamily: fontName }}>
      <div className="h-full w-full hidden md:block">
        <div
          className="sticky top-[10rem] text-[37vh] rounded-3xl shadow overflow-hidden mr-4 z-0 flex items-center justify-center h-[70vh] text-center"
          style={{ backgroundColor: color }}
        >
          <span className="leading-none w-full absolute z-10">
            {inspectorGlyph}
          </span>

          <div
            className={cn(
              "absolute text-[37vh] leading-none h-[37vh] *:w-full  w-full px-2  *:relative *:text-left *:leading-none *:*:font-mono",
              "*:absolute",
              "text-white"
            )}
          >
            <div>
              <div className="inline-block bg-pink-50 z-0">
                <div className="absolute *:border-t *:border-dashed *:border-white *:absolute *:text-left *:leading-none *:*:font-mono *:w-full w-full">
                  <div className="text-xs">BASELINE</div>
                  {t.os2.sTypoDescender ? (
                    <div style={{ top: `${-t.os2.sTypoDescender / em}em` }}>
                      <p className="text-xs">
                        DESCENDER {t.os2.sTypoDescender}
                      </p>
                    </div>
                  ) : null}
                  {t.os2.usWinAscent && (
                    <div style={{ top: `${-t.os2.usWinAscent / em}em` }}>
                      <p className="text-xs">ASCENT {t.os2.usWinAscent}</p>
                    </div>
                  )}
                  {t.os2.sxHeight && (
                    <div style={{ top: `${-t.os2.sxHeight / em}em` }}>
                      <p className="text-xs">X Height {t.os2.sxHeight}</p>
                    </div>
                  )}
                  {t.os2.sCapHeight && (
                    <div style={{ top: `${-t.os2.sCapHeight / em}em` }}>
                      <p className="text-xs">Cap Height {t.os2.sCapHeight}</p>
                    </div>
                  )}
                </div>
              </div>
              {!t.os2.sxHeight ? (
                <div className="inline-block bg-pink-50 w-0 h-[1ex]">
                  <div className="absolute *:border-t *:border-dashed *:border-white *:absolute *:text-left *:leading-none *:*:font-mono *:w-full w-full">
                    <div style={{ top: `0ex` }}>
                      <p className="text-xs">X Height (System guess)</p>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div className="absolute text-base bottom-2 w-[90%] font-mono text-white flex gap-6 flex-nowrap overflow-x-clip *:text-nowrap  justify-between">
            <p>
              Unicode:U+
              {inspectorGlyph.charCodeAt(0).toString(16).toUpperCase()}
            </p>
            <p>
              left Side Bearing:
              {
                glyphs.find((v) => {
                  return v.unicode == inspectorGlyph.charCodeAt(0);
                })?.leftSideBearing
              }
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-6 md:grid-cols-10 lg:grid-cols-12 xl:grid-cols-[20] cursor-crosshair select-none">
        {glyphs.map((g) => {
          return (
            <div
              className={cn(
                "ring-1 ring-offset-[-0.9px] hover:text-white flex flex-1 aspect-square justify-center items-center ",
                "transition-all *:transition-all text-center duration-100 ease-linear ",
                `hover:text-white hover:bg-stone-900 dark:hover:bg-black hover:scale-[200%] md:hover:scale-125 hover:rounded-xl  hover:shadow-xl`,
                "flex flex-1 group flex-col"
              )}
              key={g.index}
              onMouseEnter={() => setInspectorGlyph(u(g.unicode))}
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(u(g.unicode));
                  toast.success(`Character ${u(g.unicode)} has Copied`);
                } catch (error) {
                  toast.error("Error! Can not Copy");
                }
              }}
            >
              <p className="duration-700 row-span-3 group-hover:scale-[200%] md:group-hover:scale-100 transition-all ">{u(g.unicode)}</p>
              <p className="md:text-[0.1rem] opacity-0 group-hover:opacity-100 text-[0.5rem] group-hover:pt-2 md:group-hover:pt-0 font-mono md:group-hover:text-[0.4rem] font-bold">
                {g.unicode}
              </p>
            </div>
          );
        })}
      <div className="col-start-1 col-span-full p-2 font-mono">
        Total {len} characters
        {(len>=1200)?<>, Maximum preview of 1200 characters</>:null}
      </div>
      </div>
    </div>
  );
};

export default Glyphs;
