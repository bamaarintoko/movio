'use client'
import { poppins } from "@/lib/fonts";
import { useEffect, useRef, useState } from "react";

interface BiographyProps {
    biography: string;
}

export default function Biography({ biography }: BiographyProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isOverflowing, setIsOverflowing] = useState(false);

    const textRef = useRef<HTMLParagraphElement | null>(null);

    useEffect(() => {
        if (textRef.current) {
            console.log('textRef.current.scrollHeight : ',textRef.current.scrollHeight)
            console.log('textRef.current.clientHeight : ',textRef.current.clientHeight)
            // Check if the content overflows
            setIsOverflowing(textRef.current.scrollHeight > textRef.current.clientHeight);
        }
    }, [biography]);

    return (
        <div>
            <p ref={textRef} className={`${poppins.className} text-sm ${isExpanded ? "" : "line-clamp-6"} transition-all duration-300`}>
                {biography}
            </p>
            {isOverflowing && (

                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mt-2 text-blue-500 hover:underline"
                >
                    {isExpanded ? "Show Less" : "Show More"}
                </button>
            )}
        </div>
    )
}