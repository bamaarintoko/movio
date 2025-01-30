// import UpcomingMovies from "./_components/UpcomingMovies";

import { Poppins, Oswald } from 'next/font/google';
import {  Bars3Icon } from "@heroicons/react/20/solid";
import HomeBanner from "./_components/HomeBanner";
import HomeLatestTrailer from './_components/HomeLatestTrailer';
import HomePopular from './_components/HomePopular';
import HomeFreeToWatch from './_components/HomeFreeToWatch';
import { ServerHomeTrending } from './_components/ServerHomeTrending';
import HomeHeader from './_components/HomeHeader';

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
            <HomeHeader/>
            <HomeBanner/>
            <ServerHomeTrending/>
            <HomeLatestTrailer/>
            <HomePopular/>
            <HomeFreeToWatch/>

        </div >
    )
}