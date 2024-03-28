
import { Loader2Icon } from "lucide-react";

export default function loading(){
    return <div className='flex justify-center items-center w-full h-screen'>
    <Loader2Icon size={48} className='animate-spin' />
</div>
}