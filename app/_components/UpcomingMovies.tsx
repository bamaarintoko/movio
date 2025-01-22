import Image from "next/image";
import { Poppins, Oswald } from 'next/font/google';

const oswald = Oswald({
    weight: ['400', '500', '700'], // Specify font weights
    subsets: ['latin'], // Specify subsets (e.g., 'latin', 'latin-ext')
    display: 'swap', // Control font-display
});
const poppins = Poppins({
    weight: ['400', '500', '700'], // Specify font weights
    subsets: ['latin'], // Specify subsets (e.g., 'latin', 'latin-ext')
    display: 'swap', // Control font-display
});
export default async function UpcomingMovies() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_TMDB_HOST}trending/movie/week?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`)
    const data = await res.json();
    console.log('data : ', data.results)
    console.log('res : ', res)
    return (
        <div className="flex-1 xl:h-48  flex flex-col">
            <div className={`${oswald.className} py-2 `}>

                <h2 >Upcoming Movies</h2>
            </div>
            <div className="overflow-y-auto h-full space-y-2">
                {
                    res.ok &&
                    data.results.map((x, y) => (
                        <div key={y} className={`${poppins.className} relative`}>
                            <div className="rounded-b-xl absolute z-10 bottom-0 left-0 right-0 h-12 backdrop-blur-md bg-black/30 p-2">
                                <p className="text-white text-sm font-bold"> {x.title}</p>
                                <p className="text-white text-xs"> {x.release_date}</p>
                            </div>
                            <Image
                                className="rounded-xl"
                                alt="Movie Backdrop"
                                layout="responsive"
                                // fill={true}
                                width={16} // Aspect ratio width
                                height={9} // Aspect ratio height
                                src={`https://image.tmdb.org/t/p/w780${x.backdrop_path}`}
                            />
                        </div>
                    ))
                }
                {/* {Array.from({ length: 10 }).map((x, y) => (
                    <div key={y} className="p-2 border rounded shadow-sm">

                        aaa
                    </div>
                ))} */}
            </div>
            {/* <UpcomingMovies /> */}
        </div>
    )
}