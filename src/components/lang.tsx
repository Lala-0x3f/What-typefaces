"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { CaretSortIcon, CheckIcon, GlobeIcon } from "@radix-ui/react-icons";

const languages = [
  {
    value: "English",
    label: "English",
  },
  {
    value: "Spanish",
    label: "Español",
  },
  {
    value: "French",
    label: "Français",
  },
  {
    value: "German",
    label: "Deutsch",
  },
  {
    value: "Chinese",
    label: "中文",
  },
  {
    value: "Japanese",
    label: "日本語",
  },
  {
    value: "Korean",
    label: "한국어",
  },
  {
    value: "Russian",
    label: "Русский",
  },
  {
    value: "Portuguese",
    label: "Português",
  },
  {
    value: "Italian",
    label: "Italiano",
  },
  {
    value: "Arabic",
    label: "العربية",
  },
  {
    value: "Hindi",
    label: "हिन्दी",
  },
  {
    value: "Bengali",
    label: "বাংলা",
  },
  {
    value: "Urdu",
    label: "اردو",
  },
  {
    value: "Punjabi",
    label: "ਪੰਜਾਬੀ",
  },
];

const LangsCombobox = () => {
  return (
    <Select>
      <SelectTrigger className="w-52">
        <SelectValue
          placeholder=<p className="flex items-center gap-2">
            <GlobeIcon />
            Select a Language
          </p>
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {
            languages.map((language,index)=>{
              return (
                <SelectItem key={index} value={language.value}>
                  {language.label}
                </SelectItem>
              )
            })
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default LangsCombobox;
