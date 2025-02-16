import { oswald } from "@/lib/fonts";

export default function HomeLatestTrailerPending() {
    return (
        <div className="w-full">
            <div className="2xl:max-w-[1280px] mx-auto h-auto lg:flex justify-center-center flex-col" >
                <div className="flex gap-4 lg:px-10 xl:px-10 2xl:px-10 px-4 py-6">
                    <p className={`${oswald.className} text-2xl`}>

                        Latest Trailer
                    </p>
                </div>
                <div className="h-[13.5rem] ">

                    <div className="w-full flex overflow-x-auto flex-nowrap space-x-5 lg:px-10 xl:px-10 2xl:px-10 px-4">
                        {
                            Array.from({ length: 20 }).map((data, y) => (
                                <div key={y} className="w-72 flex-shrink-0 space-y-2">
                                    <div className="relative h-40 animate-pulse bg-slate-200 rounded-md">

                                    </div>
                                    <div className="h-14">
                                        <div className="h-2 animate-pulse bg-slate-200 rounded-md" />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}