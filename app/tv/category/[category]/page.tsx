'use client'
import HomeHeader from "@/app/_components/HomeHeader";
import { poppins } from "@/lib/fonts";
import { replaceHyphens } from "@/lib/functions";
import { useParams } from "next/navigation";

export default function PageTv() {
    const params = useParams()
    // const {category} = router.query
    const objCat = {
        popular: 'Popular Tv Shows',
        airing_today: 'TV Shows Airing Today',
        on_the_air: 'Currently Airing TV Shows',
        top_rated: 'Top Rated TV Shows'
    } as const

    const category = params?.category as string
    const result = replaceHyphens(category) as keyof typeof objCat
    return (
        <div>
            <HomeHeader />
            <div className="2xl:max-w-[1280px] h-14 mx-auto lg:flex items-center px-10 hidden" >
                <div>
                    <p className={`${poppins.className} font-semibold`}>
                        {objCat[result]}

                    </p>
                </div>
            </div>
        </div>
    )
}