'use client'

import { poppins } from "@/lib/fonts"
import { useState } from "react";

export default function DrawerMenu() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>

            <div onClick={() => setIsOpen(!isOpen)}>
                <p className={`${poppins.className} flex text-white gap-8 font-bold text-lg flex-col`}>Movie</p>
            </div>
            {/* ------ */}
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-40" : "max-h-0"
                }`}>
                <p>aaa</p>
                <p>aaa</p>
                <p>aaa</p>
                <p>aaa</p>
            </div>
            {/* ------ */}
        </div>
    )
}