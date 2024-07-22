interface Font {
  family?: string;
  fullName: string;
  postscriptName: string;
  style: string;
}

interface FontFamily {
  FamilyName: string;
  stylesNumber?: number;
  styles: {
    style: string;
    fullName: string;
    postscriptName: string;
  }[];
}

const searchFont = (input: string, fontList: FontFamily[]): FontFamily[] => {
  return fontList.filter((font) =>
    font.FamilyName.toLowerCase().includes(input.toLowerCase())
  );
};

const groupFontsByFamily = (fonts: Font[]): FontFamily[] => {
  const fontFamilyMap: Record<string, FontFamily> = {};

  for (const font of fonts) {
    if (!fontFamilyMap[font.family]) {
      fontFamilyMap[font.family] = {
        FamilyName: font.family,
        styles: [],
      };
    }
    fontFamilyMap[font.family].styles.push({
      style: font.style,
      fullName: font.fullName,
      postscriptName: font.postscriptName,
    });
  }

  // 将映射转换为数组
  const fontFamilies: FontFamily[] = Object.values(fontFamilyMap);
  return fontFamilies;
};

const getFonts = async (input?: string): Promise<Font[]> => {
  try {
    if ("queryLocalFonts" in window) {
      const availableFonts = await window.queryLocalFonts(
        input ? { postscriptNames: [input] } : null
      );
      return availableFonts;
    } else {
      console.error("queryLocalFonts API is not supported in this browser.");
      return [];
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.name, err.message);
    } else {
      console.error("An unknown error occurred.");
    }
    return [];
  }
};

const FontInfo = async (name: string): Promise<FontFamily> => {
  const k = await getFonts();
  const l = groupFontsByFamily(k);
  return l.filter((font) => font.FamilyName === name)[0];
};

const BlobList = async (postscriptNames: string[]): Promise<Blob[]> => {
  const l: Blob[] = []; 
  const fonts = await window.queryLocalFonts({
    postscriptNames: postscriptNames,
  });
  for (const f of fonts) {
    l.push(await f.blob());
  }
  return l;
};

export { groupFontsByFamily, getFonts, searchFont, FontInfo, BlobList };

export type { Font, FontFamily };
