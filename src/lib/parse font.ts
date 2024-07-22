import opentype from "opentype.js";

type NestedString = {
  en: string;
};

export interface FontNameTable {
  copyright: NestedString;
  fontFamily: NestedString;
  fontSubfamily: NestedString;
  uniqueID: NestedString;
  fullName: NestedString;
  version: NestedString;
  postScriptName: NestedString;
  trademark: NestedString;
  manufacturer: NestedString;
  designer: NestedString;
  manufacturerURL: NestedString;
  designerURL: NestedString;
  license: NestedString;
  licenseURL: NestedString;
  description?: NestedString;
  sampleText?: NestedString;
}

export interface Glyph {
  advanceWidth: number;
  index: number;
  leftSideBearing: number;
  name?: string;
  unicode: number;
  xMax: number;
  xMin: number;
  yMax: number;
  yMin: number;
  path: {
    commands: {
      type: string;
      x?: number;
      x1?: number;
      y?: number;
      y1?: number;
    }[];
    fill: string;
    stroke?: any;
    strokeWidth: number;
    unitsPerEm: number;
  };
}
export interface OS2 {
  achVendID: string;
  fsSelection: number;
  fsType: number;
  panose: number[];
  sCapHeight: number;
  sFamilyClass: number;
  sTypoAscender: number;
  sTypoDescender: number;
  sTypoLineGap: number;
  sxHeight: number;
  ulCodePageRange1: number;
  ulCodePageRange2: number;
  ulUnicodeRange1: number;
  ulUnicodeRange2: number;
  ulUnicodeRange3: number;
  ulUnicodeRange4: number;
  usBreakChar: number;
  usDefaultChar: number;
  usFirstCharIndex: number;
  usLastCharIndex: number;
  usMaxContent: number;
  usWeightClass: number;
  usWidthClass: number;
  usWinAscent: number;
  usWinDescent: number;
  version: number;
  xAvgCharWidth: number;
  yStrikeoutPosition: number;
  yStrikeoutSize: number;
  ySubscriptXOffset: number;
  ySubscriptXSize: number;
  ySubscriptYOffset: number;
  ySubscriptYSize: number;
  ySuperscriptXOffset: number;
  ySuperscriptXSize: number;
  ySuperscriptYOffset: number;
  ySuperscriptYSize: number;
}


const getFontTable = async (blob: Blob) => {
  const arrayBuffer = await blob.arrayBuffer();
  const font = opentype.parse(arrayBuffer);
  console.log(font.tables);
  // console.table(font.tables.os2)
  const tables = font.tables;
  return tables 
};

const getFontRange = async (blob: Blob) => {
  console.log("Table");
  const arrayBuffer = await blob.arrayBuffer();
  const font = opentype.parse(arrayBuffer);
  const s = Object.values((font.glyphs as any).glyphs);
  const m: Glyph[] = (s as Glyph[])
    .filter((g: any) => g.unicode)
    // .map((v: any) => v.name)
    .sort((a: any, b: any) => a.unicode - b.unicode);
  // console.log("Font Range slice(0, 50)", m.slice(0, 50));
  return m;
};

export { getFontTable, getFontRange,  };
