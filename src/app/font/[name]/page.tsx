"use client";

import { BlobList, FontFamily, FontInfo } from "@/lib/fonts";
import { stringToHSL } from "@/components/font-card";
import {
  ArrowLeftIcon,
  FontFamilyIcon,
  MixerHorizontalIcon,
  ReaderIcon,
  TransformIcon,
} from "@radix-ui/react-icons";

import { Slider } from "@/components/ui/slider";

import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { styleText } from "util";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { name2weight, sortFontsByStyle } from "./rank";
// import { extractFontMetadata } from "@/lib/font info";
// import { computeOutlineFormat } from "@/lib/font base info";
// import ShowInfoTest from "@/components/test";
import {
  FontNameTable,
  getFontTable,
  getFontRange,
  Glyph,
} from "@/lib/parse font";
import About from "@/components/about";
import Glyphs from "@/components/glyphs";
import { Table } from "opentype.js";
import TypeTest from "@/components/type test";
import Footer from "@/components/footer";

import type { Metadata } from 'next'
import ExampleCard from "@/components/example card";


const FontPage = ({ params }: { params: { name: string } }) => {
  const [fontTable, setFontTable] = useState<FontNameTable>();
  const [ASM, q_ASM] = useState<any>();
  const [previewText, setPreviewText] = useState("");
  const [glyphs, setGlyphs] = useState<Glyph[]>();
  const [previewTextSize, setPreviewTextSize] = useState(48);

  const route = useRouter();
  const [font, initFont] = useState<FontFamily>();
  const [blobs, initBlobs] = useState<Blob[]>();
  const fontName = decodeURIComponent(params.name);
  const card_color = stringToHSL(fontName);
  
  useEffect(() => {
    resetPreviewText();
    FontInfo(fontName).then((q) => {
      const p = q;
      p.styles = sortFontsByStyle(q.styles as any);
      // console.log(p);
      initFont(p);
      BlobList(p.styles.map((f) => f.postscriptName)).then((b) => {
        initBlobs(b);
      });
    });
  }, [fontName]);
  useEffect(() => {
    if (blobs) {
      getFontRange(blobs[0]).then((g) => {
        setGlyphs(g);
      });
      // computeOutlineFormat(blobs[0]);
      getFontTable(blobs[0]).then((r) => {
        // console.log(fontName, r);
        q_ASM(r);
        setFontTable(r.name as any as FontNameTable);
      });
    }
  }, [blobs]);
  useEffect(() => {
    if (previewText.replaceAll(" ", "") == "") {
      resetPreviewText();
    }
  }, [previewText]);
  const resetPreviewText = () => {
    setPreviewText(
      "Typography is not an art. Typography is not a science. Typography is craft. Not a craft in the sense of blindly following some poorly understood rules, but rather in the sanse of the precise application of tried & tested experience."
    );
  };
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const s = e.target.value;
    route.push(`/font?q=${s}`);
  };
  const previewTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const s = e.target.value;

    setPreviewText(s);
  };

  return (
    <main className=" w-full min-h-full ">
      <title>{fontName}</title>
      <div className="z-10 w-full sticky left-0 top-0 bg-white/30 p-4 pt-0 backdrop-blur-md">
        <nav className="w-full h-[4rem] my-4 items-center px-4 flex gap-8 sticky font-normal text-2xl justify-between border-b border-t border-stone-300">
          <Link
            href="/font/"
            className="font-semibold flex gap-2 items-center "
          >
            <ArrowLeftIcon />
            Home
          </Link>
          <input
            onChange={handleSearch}
            type="text"
            className="font-normal text-2xl outline-none grow md:text-center bg-transparent"
            placeholder="Search other fonts..."
          />
          <h2 className="hidden md:block" translate="no">
            {fontName}
          </h2>
        </nav>
        <ul className="flex gap-4 justify-between w-full px-4 text-stone-500 *:flex *:items-center *:gap-2 hover:*:text-stone-700 *:transition-all">
          <a href="#styles">
            <FontFamilyIcon />
            Styles
          </a>
          <a href="#glyphs">
            <TransformIcon />
            Glyphs
          </a>
          <a href="#test">
            <MixerHorizontalIcon />
            Type test
          </a>
          <a href="#about">
            <ReaderIcon />
            About
          </a>
        </ul>
      </div>
      <div className="*:pt-8 p-4">
        <div>
          <div className="grid grid-cols-4">
            <h1
              className="leading-none text-[3em] md:text-[6em] col-span-3 lg:text-[8em] font-bold text-balance"
              style={{ fontFamily: fontName }}
            >
              {fontName}
            </h1>
            <ul className="*:py-3 flex flex-col justify-end text-lg  text-stone-800">
              <p>
                by{" "}
                <a
                  href={fontTable?.designerURL?.en}
                  target="_blank"
                  className={cn(
                    fontTable?.designerURL?.en
                      ? "hover:font-semibold transition-all"
                      : null
                  )}
                >
                  {fontTable?.designer?.en || fontTable?.designerURL?.en.replace("https://","")}
                  &nbsp;
                  {fontTable?.designerURL?.en ? "↗" : null}
                </a>
              </p>
              <p>
                {font?.styles.length}
                &nbsp;Style
                {font?.styles.length == 1 ? null : "s"}
              </p>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-5xl scroll-my-32"  id="styles">Styles</h2>
          {/* {blobs ? <ShowInfoTest f={blobs[0]} /> : <></>} */}
          {/* 展示卡片 */}
          <ExampleCard fontName={fontName} sampleText={fontTable?.sampleText?.en} cardColor={card_color}  />
          
          <div className="grid md:grid-cols-3 mx-4 my-8 gap-10 items-center">
            <div className="md:col-span-2">
              <Input
                className="w-full"
                placeholder="Type here to preview"
                onInput={(e) => {
                  const target = e.target as HTMLInputElement;
                  setPreviewText(target.value);
                }}
              />
            </div>
            <div className="flex justify-around auto-cols-auto  items-center w-full gap-5">
              <p className="w-10 font-mono">
                {previewTextSize}
                px
              </p>
              <Slider
                defaultValue={[previewTextSize]}
                min={8}
                max={300}
                onValueChange={(e) => {
                  setPreviewTextSize(e[0]);
                }}
                step={1}
                className="flex-1"
              />
            </div>
          </div>
          <div>
            {font?.styles.map((f) => {
              return (
                <div
                  key={f.style}
                  className=" border-t border-b"
                  style={{ fontFamily: font.FamilyName }}
                >
                  <h6 className="mx-2 my-4 text-xs leading-tight font-medium text-stone-400">
                    {f.style}
                  </h6>
                  <textarea
                    value={previewText}
                    contentEditable
                    // onInput={previewTextChange}
                    // onChange={(e)=>{console.log(e.target)}}
                    onChange={previewTextChange}
                    spellCheck={false}
                    translate="no"
                    style={{
                      fontFamily: `
											${font.FamilyName} ${f.style},
											${f.fullName.replace("Italic", "")}, 
											${font.FamilyName}
											`,
                      fontStyle: f.style.includes("Italic") ? "Italic" : "",
                      fontSize: `${previewTextSize}px`,
                      // fontWeight: f.fullName
                      //   .replace(font.FamilyName, "")
                      //   .split(" ")[1],
                      fontWeight: name2weight(f.style),
                    }}
                    className={cn(
                      "w-full h-fit p-2 text-nowrap overflow-hidden focus-visible:outline-none leading-[0.6em] pt-[0.4em]",
                      `font-[${f.fullName}]`
                    )}
                  >
                    {previewText}
                  </textarea>
                </div>
              );
            })}
          </div>
        </div>
        
        <div id="glyphs" className="scroll-my-32">      
        {glyphs ? (
          <>
            <h2 className="text-5xl">Glyphs</h2>
            <Glyphs
              glyphs={glyphs}
              fontName={fontName}
              color={card_color}
              t={ASM}
            />
          </>
        ) : null}
        {ASM ? (
          <div>
            <div className="font-sans border-t border-b flex items-center p-4  gap-8 justify-between">
              <p className="font-bold">Glyphs info</p>
              <p>OS2 version {ASM.os2.version}</p>
              <p>Strikeout position {ASM.os2.yStrikeoutPosition}</p>
              <p>ascender {ASM.hhea.ascender}</p>
              <p>descender {ASM.hhea.descender}</p>
            </div>
          </div>
        ) : null}
        </div>
        <div >
          <h2 className="text-5xl scroll-my-32" id="test">Type Tester</h2>
          <TypeTest
            t={ASM}
            color={card_color}
            font={font}
            fontName={fontName}
          />
        </div>
        <div >
          <h2 className="text-5xl scroll-my-32" id="about">About</h2>
          <About fontNameTable={fontTable} />
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default FontPage;
