import { FontNameTable } from "@/lib/parse font";
import React from "react";
import { Button } from "./ui/button";

interface AboutProp {
  fontNameTable?: FontNameTable;
}
const About: React.FC<AboutProp> = ({ fontNameTable }) => {
  if (fontNameTable) {
    const license = fontNameTable.license?.en;
    const licenseURL = fontNameTable.licenseURL?.en;
    const trademark = fontNameTable.trademark?.en;
    const copyright = fontNameTable.copyright?.en;
    const designer = fontNameTable.designer?.en;
    const designerURL = fontNameTable.designerURL?.en;
    const manufacturer = fontNameTable.manufacturer?.en;
    const manufacturerURL = fontNameTable.manufacturerURL?.en;
    const description = fontNameTable.description?.en;
    const version = fontNameTable.version?.en
    return (
      <div className="grid gap-4 my-4 md:grid-cols-2 xl:grid-cols-3 *:*:py-2 *:*:text-pretty text-stone-900">
        {designer ? (
          <div>
            <h3 className="text-2xl font-semibold">Design by</h3>
            <p className="text-2xl font-light">{designer}</p>
            <a href={designerURL} target="_blank">
              <Button variant="outline">Designer Site</Button>
            </a>
          </div>
        ) : null}
        {license ? (
          <div className="col-span-2">
            <h3 className="text-2xl font-semibold whitespace-pre-line">License</h3>
            <p>{license}</p>
            <a href={licenseURL} target="_blank">
              <Button variant="outline">About License</Button>
            </a>
          </div>
        ) : null}
        {description ? (
          <div>
            <h3 className="text-2xl font-semibold">Description</h3>
            <p className="font-semibold text-stone-800">{description}</p>
          </div>
        ) : null}
        {trademark ? (
          <div>
            <h3 className="text-2xl font-semibold">Trademark</h3>
            <p>{trademark}</p>
          </div>
        ) : null}
        {manufacturer ? (
          <div>
            <h3 className="text-2xl font-semibold">Manufacturer</h3>
            <p>{manufacturer}</p>
            <a href={manufacturerURL} target="_blank">
              <Button variant="outline">Manufacturer Site</Button>
            </a>
          </div>
        ) : null}
        {version ? (
          <div>
            <h3 className="text-2xl font-semibold">Version</h3>
            <p>{version}</p>
          </div>
        ):null}
        {copyright ? (
          <p className="font-medium text-stone-500 col-start-1 col-span-full">{copyright}</p>
        ) : null}
      </div>
    );
  }
};

export default About;
