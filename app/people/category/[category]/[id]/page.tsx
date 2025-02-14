import HomeHeader from "@/app/_components/HomeHeader";
import { oswald, poppins } from "@/lib/fonts";
import Image from "next/image";
import LoadingImage from "./_components/LoadingImage";

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
export default async function PagePersonDetail({ params }: PersonDetailProps) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const { id } = await params
    const result = id.split("-")
    const response = await fetch(`${process.env.NEXT_PUBLIC_TMDB_HOST}person/${result[0]}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`)
    const data: PersonDetails = await response.json()
    return (
        <div>
            <div className=" sticky top-0 z-20">

                <HomeHeader />
            </div>
            {/* grid grid-cols-4 gap-6 px-10 py-10 */}
            <div className="grid grid-rows-auto xl:grid-cols-[300px_1fr] gap-4 lg:p-10 xl:p-10">
                {
                    response.ok
                    &&
                    <div className=" h-auto">
                        <div className="xl:hidden lg:hidden md:hidden flex flex-col items-center justify-center pt-10">

                            <div className="h-[165px] w-[165px]  ">
                                <Image
                                    priority
                                    src={`https://image.tmdb.org/t/p/w235_and_h235_smart${data.profile_path}`} // Replace with your dynamic poster path
                                    alt="Movie Poster"
                                    width={165}
                                    height={165}
                                    className="rounded-md "
                                    // placeholder="blur"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
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
                            {/* <Image
                                priority
                                src={`https://image.tmdb.org/t/p/w300_and_h450_smart${data.profile_path}`} // Replace with your dynamic poster path
                                alt="Movie Poster"
                                width={300}
                                height={450}
                                className="rounded-md absolute inset-0 transition-opacity opacity-0 duration-500"
                                onLoad={(e) => e.currentTarget.classList.remove("opacity-0")}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            /> */}
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
                <div className="space-y-2 p-4">
                    <div className="hidden lg:flex xl:flex">
                        {
                            response.ok
                            &&
                            <p className={`${poppins.className} font-bold text-2xl`}>
                                {data.name}
                            </p>
                        }
                    </div>
                    <h3 className={`${oswald.className} text-xl font-bold`}>Biography</h3>
                    {
                        response.ok
                        &&
                        <p className={`${poppins.className} text-sm`}>
                            {data.biography}
                        </p>
                    }
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