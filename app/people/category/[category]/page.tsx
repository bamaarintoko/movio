'use client'
import HomeHeader from "@/app/_components/HomeHeader";
import { poppins } from "@/lib/fonts";
import { replaceHyphens, slugformatter } from "@/lib/functions";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface KnownFor {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    media_type: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

interface Person {
    adult: boolean;
    gender: number;
    id: number;
    known_for: KnownFor[];
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
}

interface ApiResponse {
    page: number;
    results: Person[];
    total_pages: number;
    total_results: number;
}
export default function PagePeople() {
    // await new Promise((resolve) => setTimeout(resolve, 6000));
    const [people, setPeople] = useState<Person[]>([])
    const params = useParams()

    // const {category} = router.query
    const objCat = {
        person: 'Popular People'
    } as const
    const category = params?.category as string
    const result = replaceHyphens(category) as keyof typeof objCat
    console.log('params : ', params)

    useEffect(() => {
        fetchMovie()
    }, [])

    const fetchMovie = async () => {
        try {
            const peopleResponse = await fetch(`${process.env.NEXT_PUBLIC_TMDB_HOST}person/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`)
            const peopleData: ApiResponse = await peopleResponse.json()
            if (peopleResponse.ok) {
                setPeople(peopleData.results)
            }
            console.log('peopleData : ', peopleData)
        } catch (error) {
            console.log('error : ', error)
        }
    }
    return (
        <div>
            <div className=" sticky top-0 z-20">

                <HomeHeader />
            </div>
            <div className="2xl:max-w-[1280px] mx-auto lg:px-10 xl:px-10 px-4" >
                <div className="py-6">
                    <p className={`${poppins.className} font-semibold`}>
                        {objCat[result]}

                    </p>
                </div>
                <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
                    {
                        people.map((x, y) => (
                            <div key={y} className="bg-white shadow-md rounded-md">
                                <Link href={`person/${x.id}-${slugformatter(x.name)}`}>
                                    <div className="xl:h-[285px] h-[177px]  relative">
                                        <Image
                                            priority
                                            src={`https://image.tmdb.org/t/p/w470_and_h470_smart${x.profile_path}`} // Replace with your dynamic poster path
                                            alt="Movie Poster"
                                            fill
                                            style={{ objectFit: "cover" }}
                                            className="object-cover rounded-t-md"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    </div>
                                    <div className="h-auto p-2">
                                        <div>
                                            <p className="font-bold">{x.name}</p>
                                        </div>
                                        <div className="flex flex-wrap">
                                            {
                                                x.known_for.map((i, j) => (
                                                    <p key={j} className="text-sm">{i.title}</p>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))
                    }

                </div>
                {/* <nav aria-label="Page navigation example">
                    <ul className="inline-flex -space-x-px text-sm">
                        <li>
                            <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                        </li>
                        <li>
                            <a href="#" aria-current="page" className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                        </li>
                    </ul>
                </nav> */}
            </div>
        </div>
    )
}