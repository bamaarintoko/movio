'use client'
import HomeHeader from "@/app/_components/HomeHeader";
import { poppins } from "@/lib/fonts";
import { replaceHyphens } from "@/lib/functions";
import { useParams } from "next/navigation";

export default function PagePeople() {
    const params = useParams()

    // const {category} = router.query
    const objCat = {
        person: 'Popular Person'
    } as const
    const category = params?.category as string
    const result = replaceHyphens(category) as keyof typeof objCat
    console.log('params : ', params)
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