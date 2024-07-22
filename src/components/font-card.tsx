"use client";
import React from "react";
import * as crypto from "crypto";
import { cn } from "@/lib/utils";
import FavouriteButton from "./favourite";
import DownloadButton from "./download";
import { FontFamily } from "@/lib/fonts";
import Link from "next/link";

interface FontCardProp {
  name: string;
  className?: string;
  font: FontFamily;
  preview_text: string;
}

const stringToHSL = (inputString: string): string => {
  // 生成字符串的哈希值
  const hash = crypto.createHash("md5").update(inputString).digest("hex");

  // 取哈希值的前8个字符，并将其转换为整数
  const hashInt = parseInt(hash.substring(0, 8), 16);
  const hashInt2 = parseInt(hash.substring(8, 16), 16);
  const hashInt3 = parseInt(hash.substring(9, 17), 16);

  // 将整数归一化到 ? 到 ? 之间，用于HSL中的Hue
  const hue = (hashInt % 240) + 110;

  // 根据字符串生成Saturation和Lightness的具体值
  const saturation = 60 + (hashInt2 % 10); // 生成60到69之间的值
  const lightness = 81 + (hashInt3 % 4); // 生成? 到? 之间的值

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

const FontCard: React.FC<FontCardProp> = ({
  name,
  className,
  font,
  preview_text,
}) => {
  // console.log(font)
  const l = font.styles.length
  // const display_Name = name.replaceAll(" ", "\n");
  const display_Name = name;
  const card_color = stringToHSL(name);
  // return(
  //   <div>
  //     <li>
  //       {name}
  //     </li>
  //     <li>
  //       {l}
  //     </li>
  //   </div>
  // )
  return (
    <div
      className={cn(
        "rounded-3xl py-8 px-4 h-64 overflow-hidden relative shadow ",
        className
      )}
      style={{ 
        backgroundColor: card_color,
      }}
    >
      <div className="flex flex-1 items-start justify-between opacity-90">
        <Link href={`/font/${name}`}>
          <h3
            className="text-balance text-4xl font-bold leading-tight underline decoration-transparent underline-offset-8 hover:underline-offset-4 transition-all hover:decoration-slate-50/50"
            style={{
              fontFamily: `${name}, sans-serif`,
              fontSize: `${(1 / name.length) * 1800 + 100}%`,
            }}
          >
            {display_Name}
          </h3>
        </Link>
        <div className="flex gap-2">
          <FavouriteButton />
          <DownloadButton />
        </div>
      </div>
      <div className="flex flex-1 items-start justify-between text-sm font-medium pt-2 opacity-60">
        <p>
          {l}
          &nbsp;Style
          {(l == 1) ? null : "s"}
        </p>
        <p>{font.FamilyName}</p>
      </div>
      {!preview_text.replaceAll(" ", "") ? (
        <div
          className={cn(
            "grid grid-cols-3 pt-4 gap-2 leading-none text-wrap whitespace-break-spaces",
            " opacity-80 text-white"
          )}
          style={{ fontFamily: `${name}` }}
        >
          <span className=" bottom-0 text-opacity-50 text-[1.5rem] overflow-hidden">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat ea
            suscipit quo nesciunt tempora error dolor non. Cupiditate, placeat?
            Perspiciatis et perferendis eum. Esse dicta quam tempora facere quis
            distinctio.
          </span>
          <span className="text-[1rem] overflow-hidden">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,
            qui dolorem ipsum quia dolor sit amet, consectetur
            <p className="pt-4"></p>
          </span>
          <span className="text-[0.5rem] overflow-hidden">
            adipisci velit, sed quia non numquam eius modi tempora incidunt ut
            labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad
            minima veniam, quis nostrum exercitationem ullam corporis suscipit
            laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem
            vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil
            molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas
            nulla pariatur?
          </span>
        </div>
      ) : (
        <p
          className={cn(
            "whitespace-normal w-full h-full",
            preview_text.length < 30 ? "text-[2rem]" : "text-[1rem]"
          )}
          style={{ fontFamily: `${name}` }}
        >
          {preview_text}
        </p>
      )}

      <div
        className="absolute w-full h-16 bg-slate-50 bottom-0 -left-0 bg-gradient-to-t from-transparent to-transparent z-10 bg-transparent"
        style={
          {
            "--tw-gradient-from": card_color,
            // '--tw-gradient-to': card_color
          } as React.CSSProperties
        }
      ></div>
    </div>
  );
};

export {stringToHSL}
export default FontCard;
