'use client'
import { oswald, poppins } from "@/lib/fonts";
import Image from "next/image";
import Selector from "./Selector";
import { useEffect, useState } from "react";
import { PhotoIcon } from "@heroicons/react/20/solid";
import { motion } from "motion/react";
import { useRouter } from 'next/navigation'
import { slugformatter } from "@/lib/functions";

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
    const router = useRouter()
    useEffect(() => {
        setPopularMovies(data)
        console.log('data : ', data)
    }, [data])

    const syncPopular = async (params: Selectors) => {
        try {

            const response = await fetch(`${process.env.NEXT_PUBLIC_TMDB_HOST}trending/movie/${params.value}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);
            const data: ApiResponse = await response.json();
            setPopularMovies(data.results)
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = () => (value: Selectors) => {
        // console.log(value)
        // setInputValue(value); // Update the input value state
        syncPopular(value); // Call syncPopular with the value
    };

    const handleDetail = (id: number,title:string) => {
        const newId = id+"-"+slugformatter(title)
        console.log('id : ', newId)
        router.push(`movie/${newId}`)
    }
    // const data : ApiResponse = datas
    // console.log('dataaaaa : ',data)
    return (
        <div className="w-full">
            <div className="2xl:max-w-[1280px] mx-auto lg:flex justify-center-center flex-col" >
                <div className="flex gap-4 lg:px-10 xl:px-10 2xl:px-10 px-4 py-3">
                    <p className={`${oswald.className} text-2xl`}>

                        Trending
                    </p>
                    <Selector data={arrSelector} onChange={handleChange()} />
                </div>
                <div className="relative h-[calc(14rem+4rem)]">
                    {
                        popularMovies.length < 1
                        &&
                        <div className="absolute w-full flex overflow-x-auto flex-nowrap lg:space-x-5 xl:space-x-5 2xl:space-x-5 space-x-4 lg:px-10 xl:px-10 2xl:px-10 px-4 h-[calc(14rem+4rem)] ">
                            {Array.from({ length: 20 }).map((x, y: number) => (
                                <div key={y} className="w-36 flex-shrink-0 space-y-2">
                                    <div key={y} className="relative h-56 bg-slate-100 rounded-md animate-pulse flex items-center justify-center">
                                        <PhotoIcon className="size-6" />
                                    </div>
                                    <div className=" h-10 bg-slate-100 rounded-md animate-pulse">
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                    {
                        popularMovies.length > 0
                        &&
                        <div className="w-full flex overflow-x-auto flex-nowrap lg:space-x-5 xl:space-x-5 2xl:space-x-5 space-x-4 lg:px-10 xl:px-10 2xl:px-10 px-4 h-[calc(14rem+4rem)] overflow-y-hidden">
                            {popularMovies.map((x, y) => (
                                <div onClick={() => handleDetail(x.id,x.title)} key={y} className="w-36 flex-shrink-0 mt-3 space-y-1 cursor-pointer">
                                    <motion.div whileHover={{ scale: 1.05 }} key={y} className="relative h-56">
                                        <Image
                                            priority
                                            src={`https://image.tmdb.org/t/p/w220_and_h330_smart${x.poster_path}`} // Replace with your dynamic poster path
                                            alt="Movie Poster"
                                            fill
                                            style={{ objectFit: "cover" }}
                                            className="object-cover rounded-md"
                                        />
                                    </motion.div>
                                    <div className=" h-14">
                                        <p className={`${poppins.className} font-bold text-sm line-clamp-2`}>

                                            {x.title}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}