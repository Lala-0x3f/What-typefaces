"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ComponentBooleanIcon,
  MagnifyingGlassIcon,
  MixIcon,
  Pencil1Icon,
  SliderIcon,
  TextIcon,
} from "@radix-ui/react-icons";
import { SelectGroup } from "@radix-ui/react-select";
import LangsCombobox from "@/components/lang";
import FontList from "@/components/font-list";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import type { NextPage } from "next";
import Footer from "@/components/footer";

const AllFont: NextPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const route = useRouter();
  const [search, setSearch] = useState(useSearchParams().get("q") || "");
  const [preview_text, setPreviewText] = useState("");
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const s = e.target.value;
    route.replace(`/font${s ? `?q=${s}` : ""}`);
    setSearch(s);
  };
  const previewTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPreviewText(e.target.value);
  };
  useEffect(() => {
    if (search && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <main className=" w-full min-h-full ">
      <nav className="w-full my-4 p-4 dark:bg-slate-900/30  bg-white/30 backdrop-blur-lg items-center grid md:grid-cols-2 border-t border-b border-stone-300  sticky top-0 z-50">
        <div className="flex items-center gap-4 h-[2rem]">
          <MagnifyingGlassIcon className="size-[2rem]" />
          <input
            ref={inputRef}
            value={search}
            onChange={handleSearch}
            type="text"
            className="font-normal text-2xl outline-none grow bg-transparent"
            placeholder="Search fonts..."
          />
        </div>
        <div className="flex items-center gap-4 h-[2rem] mt-4 md:mt-0">
          <Pencil1Icon className="size-[2rem]" />
          <input
            value={preview_text}
            onChange={previewTextChange}
            type="text"
            className="font-normal text-2xl outline-none grow bg-transparent"
            placeholder="Your preview text"
          />
        </div>
      </nav>
      {/* <div className="flex justify-between w-full items-baseline">
        <div>
          <span className="text-[7rem] font-bold">12</span>
          <span>Fonts</span>
        </div>
        <div className="flex  items-center gap-4">
          <Select>
            <SelectTrigger className="w-48  outline-none">
              <SelectValue
                placeholder=<p className="flex items-center gap-2">
                  <ComponentBooleanIcon />
                  Decorative stroke
                </p>
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="serif">Serif</SelectItem>
                <SelectItem value="slab-serif">Slab Serif</SelectItem>
                <SelectItem value="sans-serif">Sans Serif</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-48  outline-none">
              <SelectValue
                placeholder=<p className="flex items-center gap-2">
                  <MixIcon />
                  Classification
                </p>
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="display">Display</SelectItem>
                <SelectItem value="hand-writing">Handwriting</SelectItem>
                <SelectItem value="sans-serif">Monospace</SelectItem>
                <SelectItem value="not-text">Not text</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                <SliderIcon />
                Technology
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-32 :">
              <div className="flex items-center space-x-2">
                <Checkbox id="variable" />
                <Label
                  htmlFor="variable "
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70s"
                >
                  Variable
                </Label>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <Checkbox id="color" />
                <Label
                  htmlFor="color "
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70s"
                >
                  Color
                </Label>
              </div>
            </PopoverContent>
          </Popover>
          <LangsCombobox />
        </div>
      </div> */}
      <div className="px-4">
        <FontList search={search} preview_text={preview_text} />
      </div>
      <Footer />
    </main>
  );
};

export default AllFont;
