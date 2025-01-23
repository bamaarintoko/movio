import { oswald } from "@/lib/fonts";
import Selector from "./Selector";

export default function HomeFreeToWatch() {
    return (
        <div className="w-full">
            <div className="2xl:max-w-[1280px] mx-auto h-auto lg:flex justify-center-center flex-col" >
                <div className="flex gap-4 px-10 py-6">
                    <p className={`${oswald.className} text-2xl`}>

                    Free To Watch

                    </p>
                    <Selector data={['Movies', 'TV']} selected="Movies" />
                </div>
                {/* <div>
        
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
                                                className="object-cover"
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
                        </div> */}
            </div>
        </div>
    )
}