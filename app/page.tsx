
// import UpcomingMovies from "./_components/UpcomingMovies";
import HomeBanner from "./_components/HomeBanner";
import HomeLatestTrailer from './_components/HomeLatestTrailer';
import HomePopular from './_components/HomePopular';
import HomeFreeToWatch from './_components/HomeFreeToWatch';
import HomeHeader from './_components/HomeHeader';
import InstallPrompt from "@/components/InstallPrompt";
import HomeTrending from "./_components/HomeTrending";

export default async function Home() {
    // await new Promise((resolve) => setTimeout(resolve, 10000));

    return (
        <div className="flex flex-col h-full" >
            <div className=" sticky top-0 z-20">
                <HomeHeader />
            </div>
            {/* <div className="overflow-y-auto"> */}

            <HomeBanner />
            <HomeTrending />
            <HomeLatestTrailer />
            <HomePopular />
            <HomeFreeToWatch />
            <InstallPrompt />
            {/* </div> */}

        </div >
    )
}