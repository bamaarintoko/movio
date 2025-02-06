import HomeHeader from "@/app/_components/HomeHeader";

type MovieDetailProps = {
    // id: number; // Define the prop as an array of strings
    params: Promise<{ id: string }>;
};
export default async function MovieDetail({ params }: MovieDetailProps) {
    const { id } = await params
    const result = id.split("-")
    if (result) {

        const response = await fetch(`${process.env.NEXT_PUBLIC_TMDB_HOST}movie/${parseInt(result[0])}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);
        const data = await response.json();
        console.log('result : ', data)
    }
    return (
        <div>
            <HomeHeader />
            haloo
        </div>
    )
}