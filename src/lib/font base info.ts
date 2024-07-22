import {Font} from 'fonteditor-core';
import fs from 'fs';



const computeOutlineFormat = async (fontData: Blob) => {
  try {
    const sfnt = fontData;
    // 仅裁剪出我们需要的字节部分：前 4 个字节是 SFNT 版本信息。
    // 规范：https://learn.microsoft.com/zh-cn/typography/opentype/spec/otff#organization-of-an-opentype-font
    const sfntVersion = await sfnt.slice(0, 4).text();

    let outlineFormat = "";
    switch (sfntVersion) {
      case "\x00\x01\x00\x00":
      case "true":
      case "typ1":
        outlineFormat = "truetype";
        break;
      case "OTTO":
        outlineFormat = "cff";
        break;
    }
    outlineFormat = outlineFormat || sfntVersion;
    console.log(sfnt);
    console.log("矢量字体格式：", outlineFormat);
    return outlineFormat;
  } catch (err: any) {
    console.error(err.name, err.message);
  }
};

const computeOutlineInfo = async (fontData: Blob) => {
  const sfnt = fontData;
  const buffer = await sfnt.arrayBuffer()
  const font = Font.create()
  
};

const test = async (fontData: Blob) => {

}

export { computeOutlineFormat };
