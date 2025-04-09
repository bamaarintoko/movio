
import HomeHeader from "@/app/_components/HomeHeader";
import BackgroundColor from "./_component/BackgroundColor";
type MovieDetailProps = {
    // id: number; // Define the prop as an array of strings
    params: Promise<{ id: string }>;
};
interface Movie {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: null | object;
    budget: number;
    genres: { id: number; name: string }[];
    homepage: string;
    id: number;
    imdb_id: string;
    origin_country: string[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: { id: number; name: string; logo_path?: string; origin_country: string }[];
    production_countries: { iso_3166_1: string; name: string }[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: { iso_639_1: string; name: string }[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}
export default async function MovieDetail({ params }: MovieDetailProps) {
    const { id } = await params
    const result = id.split("-")
    // if (result) {

    const response = await fetch(`${process.env.NEXT_PUBLIC_TMDB_HOST}movie/${parseInt(result[0])}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);
    const data: Movie = await response.json();
    console.log('result : ', data)

    return (
        <div>
            <HomeHeader />
            <BackgroundColor backdrop_path={data.backdrop_path}>

            </BackgroundColor>
        </div>
    )
}