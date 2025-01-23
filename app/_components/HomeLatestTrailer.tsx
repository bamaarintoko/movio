import { oswald, poppins } from "@/lib/fonts";
import Image from "next/image";
import Selector from "./Selector";

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
interface Video {
    type: string;
    site: string;
}

interface Trailers {
    title: string;
    trailer_url: string;
    backdrop_path: string;
}
export default async function HomeLatestTrailer() {
    const moviesResponse = await fetch(`${process.env.NEXT_PUBLIC_TMDB_HOST}movie/now_playing?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);
    const moviesData: ApiResponse = await moviesResponse.json()
    const movies = moviesData.results || [];
    // console.log('moviesResponse : ', movies)

    const trailers: Trailers[] = (await Promise.all(
        movies.map(async (movie) => {
            const videoResponse = await fetch(`${process.env.NEXT_PUBLIC_TMDB_HOST}movie/${movie.id}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);
            const videoData = await videoResponse.json();
            // console.log('videoData : ',videoData)
            const trailer = videoData.results.find(
                (video: Video) => video.type === "Trailer" && video.site === "YouTube"
            );
            if (trailer) {
                return {
                    title: movie.title,
                    trailer_url: `https://www.youtube.com/watch?v=${trailer.key}`,
                    backdrop_path: movie.backdrop_path
                };
            }

            return null; // No trailer available
        })
    )).filter((trailer): trailer is Trailers => trailer !== null);

    console.log('trailers : ', trailers)

    return (
        <div className="w-full">
            <div className="2xl:max-w-[1280px] mx-auto h-auto lg:flex justify-center-center flex-col" >
                <div className="flex gap-4 px-10 py-6">
                    <p className={`${oswald.className} text-2xl`}>

                        Latest Trailer
                    </p>


                    <Selector data={["Popular", "Streaming", "On TV", "For Rent", "In Theaters"]} selected="Popular" />
                </div>
                <div>
                    <div className="w-full flex overflow-x-auto flex-nowrap space-x-5 px-10">
                        {
                            trailers.map((data, y) => (
                                <div key={y} className="w-72 flex-shrink-0">
                                    <div className="relative">
                                        <Image
                                            priority
                                            src={`https://image.tmdb.org/t/p/w355_and_h200_smart${data.backdrop_path}`} // Replace with your dynamic poster path
                                            alt="Movie Poster"
                                            width={300} // TMDB size
                                            height={168.54} // Maintain aspect ratio (300:450)
                                            className="object-cover rounded-lg"
                                        />
                                    </div>
                                    <div>
                                        <p className={`${poppins} font-semibold`}>

                                            {data.title}
                                        </p>
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