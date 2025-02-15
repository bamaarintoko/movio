import HomeHeader from "@/app/_components/HomeHeader";
import { oswald, poppins } from "@/lib/fonts";
import LoadingImage from "./_components/LoadingImage";
import LoadingImageMobile from "./_components/LoadingImageMobile";
import { slugformatter } from "@/lib/functions";
import Image from "next/image";
import LoadingImageKnownFor from "./_components/LoadingImageKnownFor";
import Biography from "./_components/Biography";

interface Crew {
    adult: boolean;
    backdrop_path: string;
    credit_id: string;
    department: string;
    genre_ids: number[];
    id: number;
    job: string;
    media_type: "movie";
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
interface Cast {
    adult: boolean;
    backdrop_path: string;
    character: string;
    credit_id: string;
    genre_ids: number[];
    id: number;
    media_type: "movie";
    order: number;
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
interface PersonDetails {
    adult: boolean;
    also_known_as: string[];
    biography: string;
    birthday: string;
    deathday: string | null;
    gender: number;
    homepage: string | null;
    id: number;
    imdb_id: string;
    known_for_department: string;
    name: string;
    place_of_birth: string;
    popularity: number;
    profile_path: string | null;
}

type PersonDetailProps = {
    params: Promise<{ id: string }>
}

interface Credits {
    cast: Cast[];
    crew: Crew[];
    id: number
}

export async function generateMetadata({ params }: PersonDetailProps) {
    const { id } = await params
    const result = id.split("-")
    const response = await fetch(`${process.env.NEXT_PUBLIC_TMDB_HOST}person/${result[0]}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`)
    const data: PersonDetails = await response.json()


    // console.log('generateMetadata : ',data)
    const metadata = {
        title: `${data.name} - Movies, Bio, and Filmography | Moovioo`,
        description: `Explore ${data.name}'s biography, filmography, and latest movies on Moovioo.`,
        keywords: [`${data.name}`, "biography", "movies", "filmography"],
        openGraph: {
            title: `${data.name} - Movies, Bio, and Filmography | Moovioo`,
            description: `Explore ${data.name}'s biography, filmography, and latest movies on Moovioo.`,
            url: `https://moovioo.vercel.app/people/category/person/${data.id}-${slugformatter(data.name)}`,
            type: "profile",
            site_name: "Moovioo",
            images: [
                {
                    url: `https://image.tmdb.org/t/p/w235_and_h235_smart${data.profile_path}`,
                    width: 165,
                    height: 165,
                    alt: data.name,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: `${data.name} - Movies, Bio, and Filmography | Moovioo`,
            description: `Explore ${data.name}'s biography, filmography, and latest movies on Moovioo.`,
            images: [`https://image.tmdb.org/t/p/w235_and_h235_smart${data.profile_path}`],
        },
    };

    //   console.log("Generated metadata:", metadata); // Debug metadata output

    return metadata;

}

export default async function PagePersonDetail({ params }: PersonDetailProps) {
    // await new Promise((resolve) => setTimeout(resolve, 6000));
    const { id } = await params
    const result = id.split("-")
    const response = await fetch(`${process.env.NEXT_PUBLIC_TMDB_HOST}person/${result[0]}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`)
    const data: PersonDetails = await response.json()

    const resonpeMovieCredit = await fetch(`${process.env.NEXT_PUBLIC_TMDB_HOST}person/${result[0]}/combined_credits?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&sort_by=vote_count.desc`)
    const movieCredit: Credits = await resonpeMovieCredit.json()

    console.log('movieCredit : ', movieCredit)
    return (
        <div>
            <div className=" sticky top-0 z-20">

                <HomeHeader />
            </div>
            <div className="grid grid-rows-auto xl:grid-cols-[300px_1fr] gap-4 lg:p-10 xl:p-10">
                {
                    response.ok
                    &&
                    <div className=" h-auto">
                        <div className="xl:hidden lg:hidden md:hidden flex flex-col items-center justify-center pt-10">

                            <div className="h-[165px] w-[165px]  ">
                                <LoadingImageMobile profile_path={data.profile_path} />
                            </div>
                            <div>
                                {
                                    response.ok
                                    &&
                                    <p className={`${poppins.className} text-xl font-bold`}>
                                        {data.name}
                                    </p>
                                }
                            </div>
                        </div>
                        <div className="h-[450px] w-[300px] hidden lg:flex xl:flex relative ">
                            <LoadingImage profile_path={data.profile_path} />
                        </div>
                        <div className="p-4 xl:p-0 lg:p-0 xl:pt-4 lg:pt-4 xl:space-y-4 lg:space-y-4 space-y-2">
                            <div>
                                <p className={`${oswald.className} text-xl font-bold`}>Personal Info</p>
                            </div>
                            <div>
                                <PersonalInfo label="Known For" value={data.known_for_department} />
                            </div>
                            <div>
                                <PersonalInfo label="Gender" value={data.gender === 1 ? 'Female' : 'Male'} />

                            </div>
                            <div>
                                <PersonalInfo label="Birthday" value={data.birthday} />
                            </div>
                            <div>
                                <PersonalInfo label="Place of Birth" value={data.place_of_birth} />
                            </div>
                        </div>
                    </div>
                }
                <div className="space-y-2 p-4 overflow-x-hidden">
                    <div className="hidden lg:flex xl:flex">
                        {
                            response.ok
                            &&
                            <p className={`${poppins.className} font-bold text-2xl`}>
                                {data.name}
                            </p>
                        }
                    </div>
                    {/* biography */}
                    <h3 className={`${oswald.className} text-xl font-bold`}>Biography</h3>
                    <Biography biography={data.biography}/>
                    {/* known for */}
                    <h3 className={`${oswald.className} text-xl font-bold`}>Known For</h3>
                    <div className="h-[250px]  overflow-x-auto flex flex-nowrap space-x-3">
                        {
                            movieCredit.cast.map((x, y) => (
                                <div key={y}>
                                    <LoadingImageKnownFor poster_path={x.poster_path}/>
                                    <div className="flex items-center justify-center pt-1">
                                        <p className={`${poppins.className} text-sm line-clamp-2`}>{x.title}</p>
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
type PersonalInfoProps = {
    label: string;
    value: string;
}
const PersonalInfo = ({ label, value }: PersonalInfoProps) => {
    return (
        <>
            <p className={`${poppins.className} font-bold`}>{label}</p>
            <p className={`${poppins.className}`}>{value}</p>
        </>
    )
}