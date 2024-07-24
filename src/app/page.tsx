import { ArrowRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Button = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <button className="flex text-black text-3xl bg-yellow-200 size-[5rem] relative   justify-center items-center rounded-full">
      {children}
    </button>
  );
};

export default function Home() {
  return (
    <main className="w-full h-full text-white bg-black flex px-16 relative flex-col-reverse">
      <div className="absolute flex h-full items-center">
        <div className="text-4xl md:text-6xl lg:text-[7rem] leading-none">
          <h2 className="font-extralight">你说得对</h2>
          <h1 className="font-black">但是</h1>
          <h2 className="font-extralight">这个网站可以</h2>
          <h2 className="font-medium">看看你有什么字体</h2>
        </div>
      </div>
      <div className="w-full">
        <div className="bottom-0 flex w-full items-center justify-between my-14">
          <span className="text-3xl">What fonts you have</span>
          <Link href="/font">
            <Button>
              <ArrowRightIcon className="size-[3rem] left-0 hover:left-0.5 relative transition-all" />
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
