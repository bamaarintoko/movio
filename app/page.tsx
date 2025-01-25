// import UpcomingMovies from "./_components/UpcomingMovies";

import { Poppins, Oswald } from 'next/font/google';
import {  Bars3Icon } from "@heroicons/react/20/solid";
import HomeBanner from "./_components/HomeBanner";
import HomeLatestTrailer from './_components/HomeLatestTrailer';
import HomePopular from './_components/HomePopular';
import HomeFreeToWatch from './_components/HomeFreeToWatch';
import { ServerHomeTrending } from './_components/ServerHomeTrending';

const oswald = Oswald({
    weight: ['400', '500', '700'], // Specify font weights
    subsets: ['latin'], // Specify subsets (e.g., 'latin', 'latin-ext')
    display: 'swap', // Control font-display
});
const poppins = Poppins({
    weight: ['400', '500', '700'], // Specify font weights
    subsets: ['latin'], // Specify subsets (e.g., 'latin', 'latin-ext')
    display: 'swap', // Control font-display
});

export default function Home() {
    return (
        <div className="flex flex-col overflow-y-auto h-full" >
            <div className="h-14 bg-[#001F3F] ">
                <div className="2xl:max-w-[1280px] h-14 mx-auto lg:flex items-center px-10 hidden" >
                    <div className={`${oswald.className} mr-10`}>
                        <p className="text-xl font-bold text-white">MOVIO</p>
                    </div>
                    <div className={`${poppins.className} flex text-white gap-8 font-bold text-sm`}>
                        <p>Movie</p>
                        <p>TV Shows</p>
                        <p>People</p>
                    </div>
                </div>
                <div className="flex flex-row items-center lg:hidden  h-full px-4">
                    <div>
                        <Bars3Icon className="size-6 text-white" />
                    </div>
                    <div className={`${oswald.className} ml-auto items-end`}>
                        <p className="text-xl font-bold text-white">MOVIO</p>
                    </div>
                </div>
                {/* <div className="sm:max-w-[375px] 2xl:max-w-[1280px] xl:max-w-full md:max-w-full bg-red-500">
                    a
                </div> */}
            </div>
            <HomeBanner/>
            <ServerHomeTrending/>
            <HomeLatestTrailer/>
            <HomePopular/>
            <HomeFreeToWatch/>

        </div >
    )
}