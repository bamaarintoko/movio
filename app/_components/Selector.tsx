'use client'
import { poppins } from "@/lib/fonts";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useEffect, useRef, useState } from "react";

interface Selectors {
    label: string;
    value: string;
}

type SelectorProps = {
    data: Selectors[]; // Define the prop as an array of strings
    onChange?: (value: Selectors) => void
};
export default function Selector({ data, onChange = () => { } }: SelectorProps) {
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState<Selectors>({ label: 'Today', value: 'day' })
    const isFirstRender = useRef(true); // Track the first render
    const handleOpen = () => {
        setOpen(!open)
    }

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false; // Set it to false after the first render
            return;
        }
        onChange(selected);
        // }
    }, [selected]);

    // console.log("open : ", 0.1+0.2)
    return (
        <div className=" h-7 z-10 ">
            <div className="lg:flex xl:flex 2xl:flex border border-[#001F3F] rounded-full gap-2 hidden h-full">
                {
                    data.map((menu, y: number) => (
                        <div onClick={() => setSelected(menu)} key={y} className={`${menu.label === selected.label ? "bg-[#001F3F] border-[#001F3F] border" : ""} flex items-center px-4 rounded-full cursor-pointer`}>

                            <p className={`${poppins.className} ${menu.label === selected.label ? "text-white" : "text-[#001F3F]"}`}>{menu.label}</p>
                        </div>
                    ))
                }
            </div>
            {/* lg:hidden xl:hidden 2xl:hidden h-full */}
            <div className=" bg-[#001F3F] border-[#001F3F]border h-full rounded-2xl relative lg:hidden xl:hidden 2xl:hidden">
                <div onClick={handleOpen} className={`${open === true ? "rounded-t-2xl" : "rounded-2xl"} bg-[#001F3F] border-[#001F3F] gap-4 items-center flex h-full px-4 z-30`}>

                    <div>

                        <p className={`${poppins.className} text-white`}>{selected.label}</p>
                    </div>
                    <div>
                        <ChevronDownIcon className="size-6 text-white" />
                    </div>
                </div>
                {
                    open
                    &&
                    <div className="absolute bg-blue-900 left-0 right-0 z-20 rounded-b-2xl">
                        {
                            data.map((menu, y: number) => (
                                <div onClick={() => {
                                    setSelected(menu)
                                    setOpen(!open)
                                }} key={y} className="px-4  h-7 flex items-center overflow-hidden">
                                    <p className={`${poppins.className} text-white`}>{menu.label}</p>
                                </div>

                            ))
                        }
                    </div>
                }
            </div>
        </div>
    )
}