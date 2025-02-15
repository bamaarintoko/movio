'use client'
import { poppins } from "@/lib/fonts"
import { replaceHyphens } from "@/lib/functions"
import { useParams } from "next/navigation"

export default function Loading() {
    const params = useParams()
    const objCat = {
        person: 'Popular People'
    } as const
    const category = params?.category as string
    const result = replaceHyphens(category) as keyof typeof objCat
    console.log('params : ', params)
    return (
        <div>
            <div className=" h-14 bg-slate-400">
            </div>
            <div className="2xl:max-w-[1280px] mx-auto lg:px-10 xl:px-10 px-4" >
                <div className="py-6">
                    <p className={`${poppins.className} font-semibold`}>
                        {objCat[result]}

                    </p>
                </div>
                <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
                    {
                        Array.from({ length: 20 }).map((_, y) => (
                            <div key={y} className="bg-white shadow-md rounded-md">
                                <div className="bg-slate-200 animate-pulse xl:h-[285px] h-[177px]  relative rounded-md">
                                </div>
                                <div className="h-auto p-2 space-y-2">
                                    <div className="h-4 bg-slate-200 animate-pulse rounded-md"/>
                                    <div className="h-4 bg-slate-200 animate-pulse rounded-md"/>
                                    <div className="h-4 bg-slate-200 animate-pulse rounded-md"/>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}