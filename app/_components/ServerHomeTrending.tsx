import HomeTrending from "./HomeTrending";


interface Movie {
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

interface Dates {
    maximum: string;
    minimum: string;
}

interface ApiResponse {
    dates: Dates;
    page: number;
    results: Movie[];
}

// Server Component
async function fetchData() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_TMDB_HOST}trending/movie/day?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);
    const data: ApiResponse = await response.json();

    return data.results
}

export async function ServerHomeTrending() {
    const data = await fetchData();
    // console.log('data : ',data)
    return <HomeTrending data={data}/>;
}