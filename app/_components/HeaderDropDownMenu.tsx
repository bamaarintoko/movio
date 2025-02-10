'use client'
import { poppins } from "@/lib/fonts";
import Link from "next/link";
import { useState } from "react";

type Menu = {
    name: string,
    url: string
}

type HeaderDropDownProps = {
    label: string,
    data?: Menu[]
};
export default function HeaderDropDownMenu({ label = "label", data = [] }: HeaderDropDownProps) {
    const [hide, setHide] = useState<boolean>(true)

    const handleEnterAndLeave = () => {
        setHide(!hide)
    }

    return (
        <div className="relative" onMouseEnter={handleEnterAndLeave} onMouseLeave={handleEnterAndLeave}>
            <div>

                <p className={`${poppins.className} font-bold text-white`}>{label}</p>
            </div>
            {
                !hide
                &&
                <div className="absolute bg-white w-32 py-2 rounded-md border">
                    {
                        data.map((x, y: number) => (
                            <div key={y} className=" p-1 px-2 hover:bg-slate-200">
                                <Link href={x.url}>

                                    <p className={`${poppins.className} text-sm`}>{x.name}</p>
                                </Link>
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    )
}