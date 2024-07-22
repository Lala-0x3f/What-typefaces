import { Font } from "@/lib/fonts";

const weightMap: { [key: string]: number } = {
  Thin: 100,
  ExtraLight: 200,
  Light: 300,
  Regular: 400,
  Normal: 400,
  Medium: 500,
  SemiBold: 600,

  ExtraBold: 800,
  Bold: 700,
  Black: 900,
  Heavy: 1000,
};

// 获取样式的权重
function getWeightForStyle(style: string): number {
  let maxWeight = 0;
  for (const key in weightMap) {
    if (new RegExp(key, "i").test(style) && !maxWeight) {
      // 不区分大小写
      maxWeight = Math.max(maxWeight, weightMap[key]);
    }
  }
  return maxWeight;
}

// 一键处理排序
function sortFontsByStyle(fonts: Font[]): Font[] {
  return fonts.sort(
    (a, b) => getWeightForStyle(a.style) - getWeightForStyle(b.style)
  );
}

const name2weight = (style: string): number => {
  for (const key in weightMap) {
    // if (key=="Bold")
    if (new RegExp(key, "i").test(style)) {
      return weightMap[key];
    }
  }
  return 500;
};

export { sortFontsByStyle, name2weight };
