import { oswald, poppins } from "@/lib/fonts";
import Selector from "./Selector";
import Image from "next/image";

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

export default async function HomePopular() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_TMDB_HOST}movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`)
    const data: ApiResponse = await res.json();
    return (
        <div className="w-full">
            <div className="2xl:max-w-[1280px] mx-auto h-auto lg:flex justify-center-center flex-col" >
                <div className="flex gap-4 px-10 py-6">
                    <p className={`${oswald.className} text-2xl`}>

                        What's Popular
                    </p>
                    <Selector data={["Streaming", "On TV","For Rent","In Theaters"]} selected="Streaming" />
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
                                                className="object-cover rounded-md"
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