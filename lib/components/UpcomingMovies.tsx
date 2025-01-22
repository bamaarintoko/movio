// import Image from "next/image";

export default async function UpcomingMovies() {
    const res = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`)
    const data = await res.json();
    console.log('data : ', data.results)
    return (
        <div className=" bg-blue-800 xl:h-[calc(50vh)] flex flex-col">
            <h1 className="text-red-500">Upcoming Movies</h1>
            {/* <div className="overflow-y-auto h-full flex flex-col bg-red-500">
                {data.results.map((x, y) => (
                    <div key={y} className="p-2 border rounded shadow-sm">

                        {x.title}
                    </div>
                ))}
            </div> */}
        </div>
    )
}
{/* <Image
    alt="Movie Backdrop"
    // layout="responsive"
    width={16} // Aspect ratio width
    height={9} // Aspect ratio height
    src={`https://image.tmdb.org/t/p/w300${x.backdrop_path}`}
/> */}