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
        console.log(fontName, r);
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
                  {fontTable?.designer?.en}
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
          <div
            contentEditable
            translate="no"
            className={cn(
              "my-4 p-6 grid  gap-4 *:overflow-hidden rounded-3xl md:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3  focus-visible:outline-none *:whitespace-normal *:leading-none transition-all",
              "shadow text-gray-500 text-opacity-50 focus-visible:text-opacity-100 "
            )}
            style={{
              backgroundColor: card_color,
              backgroundBlendMode: "soft-light",
              backgroundPosition: "center center",
              backgroundSize: "auto 100%",
              backgroundImage: `
								url("../utils/noise2.png"),
								linear-gradient(
									to top right,
									black,
									white
								)
							`,
              fontFamily: fontName,
            }}
          >
            {fontTable?.sampleText?.en ? (
              <p className="text-[4em] col-span-full text-balance">
                {fontTable.sampleText.en}
              </p>
            ) : null}
            <p className="text-[2em]">
              A font is a typesetting—text that is a particular size, weight,
              and style. In this context, we’re talking physical words. This
              harks back to those days when analogue printing was all the rage.
              Since the digital revolution, the word ‘font’ has been
              interchangeable with the word ‘typeface’ but if we’re being
              pedantic, that term more accurately means ‘font family’—a series
              of fonts with a similar design. The word ‘font’ comes from the
              Middle French word ‘fondre’—to melt, from the Latin
              ‘fundere’—melt, cast, pour out.
            </p>
            <div className="text-[1em] *:pb-[1rem] *:leading-none">
              <h4 className="font-bold">You can edit this textarea</h4>
              <p className="text-[0.5em]">A Brief History of Fonts</p>
              <p>
                Typography is the arrangement of words and letters (type) into
                something that’s readable. Not only readable type, but type
                that’s pleasing to the eye. A typographer would select a
                typeface (font family) along with size, line length, spacing and
                letter spacing.So everything we’re going to cover here comes
                under the banner of typography. With that being said, let’s
                strap ourselves into the time machine…
              </p>
              <p>
                It all started way back in the 11th century—the burgeoning days
                of printing. Typography began in China during the Song Dynasty.
                It was invented by a guy called Bi Sheng (990-1051). His
                lightbulb moment came between 1039 and 1048 when he created his
                movable type using porcelain. It was later discovered that wood
                was easier to replace—all you needed to do was quickly carve a
                new letter or character. Metal movable type was invented around
                1230 in Korea during the Goryeo Dynasty. Metal proved to be much
                more hardwearing than previous materials.
              </p>
              <div className="grid grid-cols-2 gap-4 md:gap-8 text-[0.5em]">
                <p>
                  A German goldsmith named Johannes Gutenberg (c.1393-1406-1468)
                  invented the printing press around 1440 (other sources state
                  1436). His invention was a movable type printing press which
                  kicked off the printing revolution. With this new-fangled
                  press, he could print up to 3,600 pages per day—a shedload
                  more than hand printing, which could only manage a measly
                  forty pages per day. Pretty impressive and although Gutenberg
                  automated and mechanized the process of printing, in Asia,
                  they were using movable type for almost a century prior.
                </p>
                <p>
                  Not satisfied with inventing the first printing press, he had
                  to go develop the first font as well. It was a blackletter
                  variety resembling calligraphy. The French engineer, Nicholas
                  Jenson (c.1420-1480) developed one of the earliest Roman
                  typefaces in 1470. Jenson spent most of his time in Italy and,
                  like Johannes, was a printing pioneer. He helped to establish
                  Venice as one of the great centers of printing.
                </p>
              </div>
            </div>
            <p className="text-[6em] leading-[0.5em] ">
              A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
            </p>
          </div>
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
            <h2 className="text-5xl mb-4">Glyphs</h2>
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
