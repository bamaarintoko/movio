'use client'
import { oswald, poppins } from "@/lib/fonts";
import Image from "next/image";
import Selector from "./Selector";
import { useEffect, useState } from "react";

type Movie = {
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

interface HomeTrendingProps {
    data: Movie[]; // Accept only the array of movies
}
interface Selectors {
    label: string;
    value: string;
}

interface ApiResponse {
    page: number;
    results: Movie[];
}

const arrSelector = [
    {
        label: 'Today',
        value: 'day'
    },
    {
        label: 'This Week',
        value: 'week'
    }
]

export default function HomeTrending({ data }: HomeTrendingProps) {
    const [popularMovies, setPopularMovies] = useState<Movie[]>([]);

    useEffect(()=>{
        setPopularMovies(data)
        console.log('data : ',data)
    },[data])

    const syncPopular = async (params: Selectors) => {
        try {

            const response = await fetch(`${process.env.NEXT_PUBLIC_TMDB_HOST}trending/movie/${params.value}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);
            const data: ApiResponse = await response.json();
            setPopularMovies(data.results)
            console.log('response : ', data)
            console.log('params : ', params)
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = () => (value: string) => {
        console.log(value)
        // setInputValue(value); // Update the input value state
        syncPopular(value); // Call syncPopular with the value
    };
    // const data : ApiResponse = datas
    // console.log('dataaaaa : ',data)
    return (
        <div className="w-full">
            <div className="2xl:max-w-[1280px] mx-auto h-auto lg:flex justify-center-center flex-col" >
                <div className="flex gap-4 px-10 py-6">
                    <p className={`${oswald.className} text-2xl`}>

                        Trending
                    </p>
                    <Selector data={arrSelector} onChange={handleChange()} />
                </div>
                <div>

                    <div className="w-full flex overflow-x-auto flex-nowrap space-x-5 px-10">
                        {popularMovies.map((x, y) => (
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