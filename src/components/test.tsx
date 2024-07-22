import { useEffect, useState } from "react";
import { parseFont } from "@/lib/test";
import { fontNameTable } from "@/lib/parse font";

const ShowInfoTest = ({f}: {f:Blob}) => {
  const [testInfo, setTestInfo] = useState<any>({
    charSet: undefined,
    author: undefined,
    license: undefined,
  });
  useEffect(() => {
    // parseFont(f).then((r) => {
    //   console.table(r);
    //   setTestInfo(r)
    // });
    fontNameTable(f).then(p => console.log('wc',p))
  },[f]);
  return (
    <div className="bg-green-100 rounded-3xl p-4">
      <p>ShowInfoTest</p>
      <ul>
        {/* <li>charSet {testInfo.charSet}</li>
        <li>author {testInfo.author}</li>
        <li>license {testInfo.license}</li> */}
      </ul>
    </div>
  );
};

export default ShowInfoTest;
