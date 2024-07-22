import { DownloadIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

const DownloadButton = () => {
    return ( 
        <Button variant="outline" className="bg-transparent hover:bg-slate-500/5 transition-all rounded-full p-0 size-8 border-slate-800/5 border-2">
            <DownloadIcon className="size-4"/>
        </Button>
     );
}
 
export default DownloadButton;