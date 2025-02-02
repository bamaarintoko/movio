// import UpcomingMovies from "./_components/UpcomingMovies";
import HomeBanner from "./_components/HomeBanner";
import HomeLatestTrailer from './_components/HomeLatestTrailer';
import HomePopular from './_components/HomePopular';
import HomeFreeToWatch from './_components/HomeFreeToWatch';
import { ServerHomeTrending } from './_components/ServerHomeTrending';
import HomeHeader from './_components/HomeHeader';

export default function Home() {
    return (
        <div className="flex flex-col h-full" >
            <div className=" sticky top-0 z-20">
                <HomeHeader />
            </div>
            {/* <div className="overflow-y-auto"> */}

            <HomeBanner />
            <ServerHomeTrending />
            <HomeLatestTrailer />
            <HomePopular />
            <HomeFreeToWatch />
            {/* </div> */}

        </div >
    )
}