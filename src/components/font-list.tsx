"use cilent";
import React, { useCallback, useEffect, useState } from "react";
import FontCard from "./font-card";
import {
  FontFamily,
  getFonts,
  groupFontsByFamily,
  searchFont,
} from "@/lib/fonts";

interface FontListProp {
  search: string;
  preview_text: string;
}

const reflushFontsList = async (f:Function) => {
  const a = await getFonts()
  f(groupFontsByFamily(a))
  console.log('reflush fonts list!')
}

const FontList: React.FC<FontListProp> = ({ search, preview_text }) => {
  // const [allFontList, setAllFontList] = useState<FontFamily[]>([]);
  // const [fontList, setFontList] = useState<FontFamily[]>([]);
  // useEffect(() => {
  //   getFonts().then((fonts) => {
  //     // setFontList(groupFontsByFamily(fonts).splice(0, 34));
  //     setAllFontList(groupFontsByFamily(fonts));
  //     setFontList(allFontList);
  //   });
  // }, []);
  // useEffect(() => {
  //   setFontList(searchFont(search, allFontList));
  //   // console.log(searchFont(search,allFontList))
  // }, [search, allFontList]);
  const [allFontList, setAllFontList] = useState<FontFamily[]>([]);
  const [preFontList, setPreFontList] = useState<FontFamily[]>([]);
  const [fontList, setFontList] = useState<FontFamily[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    getFonts().then((fonts) => {
      const groupedFonts = groupFontsByFamily(fonts);
      setAllFontList(groupedFonts);
      setCount(groupedFonts.length);
      setPreFontList(groupedFonts); // 初始化时加载34个字体
      setFontList(groupedFonts.slice(0, 34));
    });
  }, []);

  useEffect(() => {
    const result = searchFont(search, allFontList);
    setCount(result.length);
    setPreFontList(result);
    setFontList(result.slice(0, 34));
  }, [search, allFontList]);

  const loadMoreFonts = useCallback(() => {
    if (isFetching) return;
    // console.log("Loading more fonts");

    setIsFetching(true);
    setTimeout(() => {
      const newFonts = preFontList.slice(0, fontList.length + 34);
      setFontList(newFonts);
      setIsFetching(false);
    }, 500); // 模拟异步加载
  }, [isFetching, fontList, allFontList]);

  const handleScroll = useCallback(() => {
    // console.log("Scroll event triggered");
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.scrollHeight - 2000
    ) {
      // console.log("Bottom reached");
      loadMoreFonts();
    }
  }, [loadMoreFonts]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (fontList.length > 0) {
    return (
      <>
        <div className="py-2 flex items-baseline gap-2">
          <h2 className="text-7xl font-semibold">{count}</h2>
          <p className="font-bold text-stone-400" onClick={()=>reflushFontsList(setAllFontList)}>
            font
            {fontList.length == 1 ? null : "s"}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {fontList.map((f) => {
            return (
              <FontCard
                font={f}
                key={f.FamilyName}
                name={f.FamilyName}
                preview_text={preview_text}
              />
            );
          })}
        </div>
      </>
    );
  } else if (search) {
    return (
      <div className="py-2 text-center text-6xl h-0 w-full flex justify-center">
        <div className="relative top-64 ">
          <p className="hover:font-extralight transition-all duration-1000">{`Can't find any fonts. :(`}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="py-2 text-center text-6xl h-0 w-full flex justify-center">
        <div className="relative top-64 ">
          <p className="hover:font-extralight transition-all duration-1000 animate-pulse text-stone-400/50">{`Searching...`}</p>
        </div>
      </div>
    );
  }
};

export default FontList;
