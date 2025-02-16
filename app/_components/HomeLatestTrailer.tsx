'use client'
import { oswald, poppins } from "@/lib/fonts";
import Selector from "./Selector";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import HomeLatestTrailerPending from "./HomeLatestTrailerPending";
import LoadingImageHomeLatestTrailer from "./LoadingImageHomeLatestTrailer";

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
    video: boolean;
    title: string;
    name: string;
    vote_average: number;
    vote_count: number;
}

// interface Show {
//     adult: boolean;
//     backdrop_path: string;
//     first_air_date: string;
//     genre_ids: number[];
//     id: number;
//     name: string;
//     origin_country: string[];
//     original_language: string;
//     original_name: string;
//     overview: string;
//     popularity: number;
//     poster_path: string;
//     vote_average: number;
//     vote_count: number;
// }

interface Dates {
    maximum: string;
    minimum: string;
}
// interface ApiShowResponse {
//     page: number;
//     results: Show[];
//     total_pages: number;
//     total_results: number;
// }
interface ApiResponse {
    dates: Dates;
    page: number;
    results: Movie[];
}
// interface Video {
//     type: string;
//     site: string;
// }

// interface Trailers {
//     title: string;
//     trailer_url: string;
//     backdrop_path: string;
// }

interface Selectors {
    label: string;
    value: string;
}
const POPULAR = 'popular'
const STREAMING = 'streaming'
const ONTV = 'on_tv'
const FORRENT = "for_rent"
const INTHEATERS = 'in_theaters'
const selectorArr = [
    {
        label: "Popular",
        value: POPULAR
    },
    {
        label: "Streaming",
        value: STREAMING
    },
    {
        label: "On TV",
        value: ONTV
    },
    {
        label: "For Rent",
        value: FORRENT
    },
    {
        label: "In Theaters",
        value: INTHEATERS
    }
]

const fetchHomeLatestTrailer = async (endpoint: string): Promise<ApiResponse> => {
    const url = `${endpoint}`

    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
};

export default function HomeLatestTrailer() {
    const [endpoint, setEndpoint] = useState<string>(`${process.env.NEXT_PUBLIC_TMDB_HOST}movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`)
    // console.log('moviesResponse : ', movies)

    const { data, isPending, error, isError } = useQuery<ApiResponse>({
        queryKey: ["endpoint", endpoint], // ✅ React Query refetches when category changes
        queryFn: () => fetchHomeLatestTrailer(endpoint),
        staleTime: 5000, // ✅ Prevents frequent refetching if data is fresh
    });

    // useEffect(() => {
    //     syncPopular()
    // }, [])

    const handleChange = () => (value: Selectors) => {
        switch (value.value) {
            case POPULAR:
                setEndpoint(`${process.env.NEXT_PUBLIC_TMDB_HOST}movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`)
                // syncPopular()
                break;
            case STREAMING:
                setEndpoint(`${process.env.NEXT_PUBLIC_TMDB_HOST}discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&with_watch_providers=8&watch_region=US`)
                // syncStreaming()
                break;
            case ONTV:
                setEndpoint(`${process.env.NEXT_PUBLIC_TMDB_HOST}discover/tv?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&with_watch_providers=8&watch_region=US`)
                // syncOnTv()
                break;
            case FORRENT:
                setEndpoint(`${process.env.NEXT_PUBLIC_TMDB_HOST}discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&with_watch_providers=8&watch_region=US`)
                // syncForRent()
                break;
            case INTHEATERS:
                setEndpoint(`${process.env.NEXT_PUBLIC_TMDB_HOST}movie/now_playing?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&region=US`)
                // syncInTheaters()
                break;
            default:
                setEndpoint(`${process.env.NEXT_PUBLIC_TMDB_HOST}movie/now_playing?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&region=US`)
                break;
        }
        console.log('value : ', value.value)
    }

    // const syncTrailersForTv = async (shows: Show[]) => {
    //     console.log('show : ', shows)
    //     try {
    //         const trailers: Trailers[] = (await Promise.all(
    //             shows.map(async (show) => {
    //                 try {
    //                     const videoResponse = await fetch(`${process.env.NEXT_PUBLIC_TMDB_HOST}movie/${show.id}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);
    //                     const videoData = await videoResponse.json();
    //                     if (videoResponse.ok) {

    //                         // console.log('videoData : ', videoData)
    //                         if (videoData.results.length > 0) {

    //                             const trailer = videoData.results.find(
    //                                 (video: Video) => video.type === "Trailer" && video.site === "YouTube"
    //                             );
    //                             if (trailer) {
    //                                 return {
    //                                     title: show.name,
    //                                     trailer_url: `https://www.youtube.com/watch?v=${trailer.key}`,
    //                                     backdrop_path: show.backdrop_path
    //                                 };
    //                             }
    //                             // console.log('trailer : ', trailer)
    //                         }
    //                     }
    //                 } catch (error) {
    //                     console.log('error : ', error)
    //                 }
    //             })
    //         )).filter((item) => item !== undefined)
    //         console.log('trailers : ', trailers)
    //         setTrailers(trailers)
    //     } catch (error) {
    //         console.log('error : ', error)
    //     }
    // }

    // const syncTrailers = async (movies: Movie[]) => {
    //     try {
    //         // console.log('data : ',data)
    //         const trailers: Trailers[] = (await Promise.all(
    //             movies.map(async (movie) => {
    //                 try {

    //                     const videoResponse = await fetch(`${process.env.NEXT_PUBLIC_TMDB_HOST}movie/${movie.id}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);
    //                     const videoData = await videoResponse.json();
    //                     // console.log('videoData : ',videoData)
    //                     const trailer = videoData.results.find(
    //                         (video: Video) => video.type === "Trailer" && video.site === "YouTube"
    //                     );
    //                     // console.log('titleeeeeee : ', movie.name)
    //                     // console.log('trailer : ', videoData.results)
    //                     if (trailer) {
    //                         return {
    //                             title: movie.title || movie.name,
    //                             trailer_url: `https://www.youtube.com/watch?v=${trailer.key}`,
    //                             backdrop_path: movie.backdrop_path
    //                         };
    //                     } else {
    //                         return {
    //                             title: movie.title || movie.name,
    //                             trailer_url: "",
    //                             backdrop_path: movie.backdrop_path
    //                         };
    //                         // console.log('aaa')
    //                     }
    //                 } catch (error) {
    //                     console.log('error : ', error)
    //                     return { title: movie.title, trailer_url: "", backdrop_path: movie.backdrop_path };
    //                 }

    //                 // return null; // No trailer available
    //             })
    //         )).filter((trailer): trailer is Trailers => trailer !== null);
    //         setTrailers(trailers)
    //         // console.log('trailers : ', trailers)
    //     } catch (error) {
    //         console.log('err : ', error)
    //     }
    // }



    // console.log('trailers : ', trailers)
    if (isPending) {
        return <HomeLatestTrailerPending />
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }
    return (
        <div className="w-full">
            <div className="2xl:max-w-[1280px] mx-auto h-auto lg:flex justify-center-center flex-col" >
                <div className="flex gap-4 lg:px-10 xl:px-10 2xl:px-10 px-4 py-6">
                    <p className={`${oswald.className} text-2xl`}>

                        Latest Trailer
                    </p>


                    <Selector data={selectorArr} onChange={handleChange()} />
                </div>
                <div className="h-[13.5rem] ">

                    <div className="w-full flex overflow-x-auto flex-nowrap space-x-5 lg:px-10 xl:px-10 2xl:px-10 px-4">
                        {
                            data.results.map((data, y) => (
                                <div key={y} className="w-72 flex-shrink-0">
                                    <LoadingImageHomeLatestTrailer backdrop_path={data.backdrop_path} />
                                    <div className="h-14">
                                        <p className={`${poppins} font-semibold line-clamp-2`}>

                                            {data.title || data.name}
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