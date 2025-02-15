// import Loading from "./people/category/[category]/loading";
import { PhotoIcon } from "@heroicons/react/20/solid";
import { oswald, poppins } from "@/lib/fonts";

export default function Loading() {
    return (
        <div>
            <div className=" h-14 bg-[#001F3F]">
                <div className="2xl:max-w-[1280px] h-14 mx-auto lg:flex items-center px-10 hidden" >
                    <div className={`${oswald.className} mr-10 cursor-pointer`}>
                        <p className="text-xl font-bold text-white">MOVIO</p>
                    </div>
                    <div className={`flex  gap-8 text-sm cursor-pointer`}>
                        <div>

                            <p className={`${poppins.className} font-bold text-white`}>Movie</p>

                        </div>
                        <div>

                            <p className={`${poppins.className} font-bold text-white`}>TV Shows</p>

                        </div>
                        <div>

                            <p className={`${poppins.className} font-bold text-white`}>People</p>

                        </div>
                    </div>
                </div>
                <div className="2xl:max-w-[1280px] mx-auto h-[450px] lg:flex justify-center-center relative" >
                    <div className="xl:grid 2xl:grid lg:grid grid-cols-5 w-full hidden  h-[450px]">

                        <div className="absolute inset-0 backdrop-brightness-50 bg-black/30 flex items-center px-10">

                            <h2 className={`${oswald.className} text-4xl font-bold bg-gradient-to-r from-[#9dcba4] from-1% via-[#1E90FF] via-50% to-[#87CEFA] to-100% bg-clip-text text-transparent`}>MOVIO <br />Discover Movies, Anytime, Anywhere.</h2>
                        </div>
                    </div>
                </div>
                <div className="2xl:max-w-[1280px] mx-auto lg:flex justify-center-center flex-col" >
                    <div className="flex gap-4 lg:px-10 xl:px-10 2xl:px-10 px-4 py-3">
                        <p className={`${oswald.className} text-2xl`}>

                            Trending
                        </p>
                    </div>
                    <div className="relative h-[calc(14rem+4rem)]">
                        <div className="absolute w-full flex overflow-x-auto flex-nowrap lg:space-x-5 xl:space-x-5 2xl:space-x-5 space-x-4 lg:px-10 xl:px-10 2xl:px-10 px-4 h-[calc(14rem+4rem)] ">
                            {Array.from({ length: 20 }).map((x, y: number) => (
                                <div key={y} className="w-36 flex-shrink-0 space-y-2">
                                    <div key={y} className="relative h-56 bg-slate-100 rounded-md animate-pulse flex items-center justify-center">
                                        <PhotoIcon className="size-6" />
                                    </div>
                                    <div className=" h-10 bg-slate-100 rounded-md animate-pulse">
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="2xl:max-w-[1280px] mx-auto h-auto lg:flex justify-center-center flex-col" >
                    <div className="flex gap-4 lg:px-10 xl:px-10 2xl:px-10 px-4 py-6">
                        <p className={`${oswald.className} text-2xl`}>

                            Latest Trailer
                        </p>
                    </div>
                    <div className="h-[13.5rem] ">
                        <div className="w-full flex overflow-x-auto flex-nowrap space-x-5 lg:px-10 xl:px-10 2xl:px-10 px-4">
                            {
                                Array.from({ length: 20 }).map((_, y: number) => (
                                    <div key={y} className="w-72 flex-shrink-0 space-y-2">
                                        <div className="relative h-40 bg-slate-100 rounded-md animate-pulse flex items-center justify-center">
                                            <PhotoIcon className="size-6" />
                                        </div>
                                        <div className="h-14 space-y-2">
                                            <div className="h-2 bg-slate-100 rounded-md animate-pulse" />
                                            <div className="h-2 bg-slate-100 rounded-md animate-pulse" />
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}