
import { oswald, poppins } from "@/lib/fonts";

export default function Loading() {
    return (
        <div>
            <div className=" h-14 bg-slate-400">
            </div>
            <div className="grid grid-rows-auto xl:grid-cols-[300px_1fr] gap-4 lg:p-10 xl:p-10">
                <div className=" h-auto">
                    <div className="xl:hidden lg:hidden md:hidden flex flex-col items-center justify-center pt-10">
                        <div className="h-[165px] w-[165px] bg-slate-200 animate-pulse rounded-md">

                        </div>
                        <div className="h-2 bg-slate-300 animate-pulse">

                        </div>
                    </div>

                    <div className=" bg-slate-300 h-[450px] w-[300px] hidden lg:flex xl:flex animate-pulse rounded-md">

                    </div>
                    {/* ------ */}
                    <div className="p-4 xl:p-0 lg:p-0 xl:pt-4 lg:pt-4 xl:space-y-4 lg:space-y-4 space-y-2">
                        <div>
                            <p className={`${oswald.className} text-xl font-bold`}>Personal Info</p>
                        </div>
                        <PersonalInfo label="Known For" />
                        <PersonalInfo label="Gender" />
                        <PersonalInfo label="Birthday" />
                        <PersonalInfo label="Place of Birth" />
                    </div>
                    {/* ------ */}
                </div>
                <div className="space-y-2 p-4 overflow-x-hidden">
                    <div className="hidden lg:flex xl:flex">
                        <div className="h-4 bg-slate-300 animate-pulse w-56 rounded-md">

                        </div>
                    </div>
                    <h3 className={`${oswald.className} text-xl font-bold`}>Biography</h3>
                    <div className="space-y-2">
                        {
                            Array.from({ length: 10 }).map((_, y) => (

                                <div key={y} className="h-2 bg-slate-100 animate-pulse w-full rounded-md" />
                            ))
                        }
                    </div>
                    <h3 className={`${oswald.className} text-xl font-bold`}>Known For</h3>
                    <div className="h-[250px]  overflow-x-auto flex flex-nowrap space-x-3">
                        {
                            Array.from({ length: 10 }).map((_, y) => (
                                <div key={y} >
                                    <div className="h-[195px] w-[130px] bg-slate-200 animate-pulse rounded-md">

                                    </div>
                                    {/* <LoadingImageKnownFor poster_path={x.poster_path} /> */}
                                    <div className="flex items-center justify-center pt-1">
                                        <div className="h-4 bg-slate-200 animate-pulse w-full rounded-md"/>
                                        {/* <p className={`${poppins.className} text-sm line-clamp-2`}>{x.title}</p> */}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>

                {/* ----------- */}
            </div>
        </div>
    )
}
type PersonalInfoProps = {
    label: string;
}
const PersonalInfo = ({ label, }: PersonalInfoProps) => {
    return (
        <>
            <p className={`${poppins.className} font-bold`}>{label}</p>
            <div className="h-2 w-full bg-slate-200 animate-pulse">

            </div>
        </>
    )
}