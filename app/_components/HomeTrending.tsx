import { oswald, poppins } from "@/lib/fonts";
import Image from "next/image";

export default async function HomeTrending() {
    let res = await fetch(`${process.env.NEXT_PUBLIC_TMDB_HOST}trending/movie/week?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`)
    const data = await res.json();
    console.log('data : ', data.results)
    return (
        <div className="w-full">
            <div className="2xl:max-w-[1280px] mx-auto h-auto lg:flex justify-center-center flex-col" >
                <div className="flex gap-4 px-10 py-6">
                    <p className={`${oswald.className} text-2xl`}>

                        Trending
                    </p>

                    <div className="flex border border-[#001F3F] rounded-full gap-2">
                        <div className="bg-[#001F3F] border-[#001F3F] flex items-center px-4 border rounded-full">

                            <p className={`${poppins.className} text-white`}>Today</p>
                        </div>
                        <div className="flex items-center px-4">

                            <p className={`${poppins.className} text-[#001F3F]`}>This Week</p>
                        </div>
                    </div>
                </div>
                <div>

                    <div className="w-full flex overflow-x-auto flex-nowrap space-x-5 px-10">
                        {data.results.map((x, y) => (
                            <div key={y} className="w-36 flex-shrink-0">
                                <div key={y} className="relative">
                                    <Image
                                        priority
                                        src={`https://image.tmdb.org/t/p/w220_and_h330_smart${x.poster_path}`} // Replace with your dynamic poster path
                                        alt="Movie Poster"
                                        width={150} // TMDB size
                                        height={225} // Maintain aspect ratio (300:450)
                                    className="object-cover"
                                    />
                                </div>
                                <div>
                                    <p className={`${poppins.className} font-bold text-[16px]`}>

                                    {x.title}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}