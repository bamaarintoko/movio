import { PhotoIcon } from "@heroicons/react/20/solid";
import { Oswald } from "next/font/google";
import Image from "next/image";
const oswald = Oswald({
    weight: ['400', '500', '700'], // Specify font weights
    subsets: ['latin'], // Specify subsets (e.g., 'latin', 'latin-ext')
    display: 'swap', // Control font-display
});

interface Movie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[]; // You can further define this if you have specific genres
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

interface Dates {
    maximum: string;
    minimum: string;
}

interface ApiResponse {
    dates: Dates;
    page: number;
    results: Movie[];
}

export default async function HomeBanner() {
    const res = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`)
    const data: ApiResponse = await res.json();
    if (data) {
        console.log('wewe')
    } else {
        console.log('qwe')
    }
    console.log('res : ', data)
    return (
        <div className="w-full">
            <div className="2xl:max-w-[1280px] mx-auto h-[450px] lg:flex justify-center-center" >
                <div className="lg:grid grid-cols-5 w-full hidden absolute  h-[450px]">
                    {
                        Array.from({ length: 5 }).map((_, x: number) => (
                            <div key={x} className={`flex items-center justify-center`}>
                                <PhotoIcon className="size-10" />
                            </div>
                        ))
                    }
                    <div className="absolute inset-0 backdrop-brightness-50 bg-black/30 flex items-center px-10">

                        <h2 className={`${oswald.className} text-4xl font-bold bg-gradient-to-r from-[#9dcba4] from-1% via-[#1E90FF] via-50% to-[#87CEFA] to-100% bg-clip-text text-transparent`}>MOVIO <br />Discover Movies, Anytime, Anywhere.</h2>
                    </div>
                </div>
                <div className="lg:grid grid-cols-5 w-full hidden relative">


                    {
                        res.ok &&
                        data.results.slice(0, 5).map((x, y) => (

                            <div key={y} className="relative h-[450px]">
                                <Image
                                    src={`https://image.tmdb.org/t/p/w260_and_h450_smart${x.poster_path}`} // Replace with your dynamic poster path
                                    alt="Movie Poster"
                                    fill
                                    style={{ objectFit: "cover" }}
                                // width={300} // TMDB size
                                // height={450} // Maintain aspect ratio (300:450)
                                // className="object-cover"
                                />
                            </div>
                        ))
                    }
                    <div className="absolute inset-0 backdrop-brightness-50 bg-black/30 flex items-center px-10">

                        <h2 className={`${oswald.className} text-4xl font-bold bg-gradient-to-r from-[#9dcba4] from-1% via-[#1E90FF] via-50% to-[#87CEFA] to-100% bg-clip-text text-transparent`}>MOVIO <br />Discover Movies, Anytime, Anywhere.</h2>
                    </div>
                </div>
                {
                    res.ok
                    &&
                    <div className="grid grid-cols-2  lg:hidden xl:hidden 2xl:hidden overflow-hidden relative">
                        {
                            data.results.slice(0, 6).map((x, y) => (

                                <div key={y} className="relative bg-red-500 h-36">

                                    <Image
                                        src={`https://image.tmdb.org/t/p/w300_and_h300_smart${x.poster_path}`}// Replace with your dynamic poster path
                                        alt="Movie Poster"
                                        width={300} // TMDB size
                                        height={300} // Maintain aspect ratio (300:450)
                                    // className="object-cover"
                                    />
                                    {/* <div className="absolute inset-0 backdrop-brightness-50 bg-black/30">
        
        </div> */}
                                </div>
                            ))
                        }
                        <div className="absolute inset-0 backdrop-brightness-50 bg-black/30 flex items-center px-4">

                            <h2 className={`${oswald.className} text-4xl font-bold bg-gradient-to-r from-[#9dcba4] from-1% via-[#1E90FF] via-50% to-[#87CEFA] to-100% bg-clip-text text-transparent`}>MOVIO <br />Discover Movies, Anytime, Anywhere.</h2>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}