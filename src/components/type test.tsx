import { FontFamily } from "@/lib/fonts";
import { Glyph } from "@/lib/parse font";
import { Table } from "opentype.js";
import React, { useState } from "react";
import { Slider } from "./ui/slider";
import { cn } from "@/lib/utils";
import {
  TextAlignCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
} from "@radix-ui/react-icons";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

interface TypeTestProps {
  t: Table;
  fontName: string;
  color: string;
  font?: FontFamily;
}

const TypeTest: React.FC<TypeTestProps> = ({ t, fontName, color, font }) => {
  const [textSize, setSize] = useState(70);
  const [textWeight, setWeight] = useState(400);
  const [textColor, setTextColor] = useState("#000000");
  const [textAlign, setTextAlign] = useState("center");
  if (font) {
    return (
      <div>
        <div
          className={cn(
            "m-8 md:mx-12 py-4 px-8  lg:mx-16 rounded-3xl bg-opacity-10 grid md:grid-cols-2 gap-8 font-semibold *:flex *:items-center *:gap-2 *:flex-wrap",
            `bg-stone-50 ring-2 ring-stone-900`
          )}
        >
          <div>
            <p>Size {textSize}</p>
            <Slider
              defaultValue={[textSize]}
              max={150}
              min={5}
              step={1}
              onValueChange={(e) => {
                setSize(e[0]);
              }}
            />
          </div>
          <div>
            <p>Weight {textWeight}</p>
            <Slider
              defaultValue={[textWeight]}
              max={900}
              min={100}
              onValueChange={(e) => {
                setWeight(e[0]);
              }}
            />
          </div>
          <div className="flex justify-between *:flex *:items-center *:gap-2">
            <div>
              <p>Align</p>
              <ToggleGroup
                variant="outline"
                type="single"
                defaultValue="center"
                className="justify-self-end"
                size={"sm"}
                onValueChange={(v) => {
                  if (v) {
                    setTextAlign(v);
                  }
                }}
              >
                <ToggleGroupItem value="left">
                  <TextAlignLeftIcon />
                </ToggleGroupItem>
                <ToggleGroupItem value="center">
                  <TextAlignCenterIcon />
                </ToggleGroupItem>
                <ToggleGroupItem value="right">
                  <TextAlignRightIcon />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div>
              <p>Color</p>
              <div
                className="size-6 rounded-full p-0 border-2"
                style={{ backgroundColor: textColor }}
              >
                <input
                  type="color"
                  className="size-6 p-0 m-0 border-0 absolute opacity-0"
                  onChange={(e) => {
                    setTextColor(e.target.value);
                  }}
                />
              </div>
              <p>{textColor}</p>
            </div>
          </div>
        </div>
        <p
          contentEditable
          className="w-full p-8 text-center focus-visible:outline-0 h-fit underline decoration-dashed	decoration-stone-400 decoration-1	  whitespace-break-spaces text-pretty"
          style={{
            fontSize: textSize,
            fontWeight: textWeight,
            fontFamily: fontName,
            color: textColor,
            textAlign: textAlign as any,
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
    );
  } else {
    return <div className="text-center text-lg">TypeTest Loading...</div>;
  }
};

export default TypeTest;
