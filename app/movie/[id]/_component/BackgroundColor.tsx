'use client'
import { useEffect, useState } from "react";
import { FastAverageColor } from "fast-average-color";
interface BackgroundColorProps {
    backdrop_path: string;
    children?: React.ReactNode;
}
export default function BackgroundColor({ children, backdrop_path = '/ywe9S1cOyIhR5yWzK7511NuQ2YX.jpg' }: BackgroundColorProps) {
    const [color, setColor] = useState<string>('')
    const [isLoading, setLoading] = useState(true)
    // const [hex, setHex] = useState<string>('')

    useEffect(() => {
        // console.log('adadasd')
        const fac = new FastAverageColor();
        fac.getColorAsync(`https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/${backdrop_path}`)
            .then((color) => {
                // setHex(color.hex)
                const resultValue = color.value
                const x = resultValue.pop()
                setColor(resultValue.join())
                console.log('resultValue : ', resultValue.join())
                // setDominantColor(color.hex);
            })
            .catch((err) => console.error("Error fetching color:", err))
            .finally(()=>setLoading(false));
    }, []);

    if (isLoading)
        return <div className=" h-[calc(100vh-3.5rem)] flex justify-center items-center">
            <p>please wait ...</p>
        </div>

    return (
        <div className="relative h-[186px] md:h-[570px] lg:h-[628px] xl:h-[calc(100vh-3.5rem)] 2xl:h-[570px]">
            <div className={`relative md:z-0 bg-cover bg-no-repeat h-[186px] md:h-[570px] lg:h-[628px] xl:h-[calc(100vh-3.5rem)] 2xl:h-[570px] bg-[position:calc((((100vw/2.222222)-20px)/1.5)/2)_0] md:bg-[left_calc((50vw-170px)-340px)_top] duration-500`}
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/${window.innerWidth >= 1280 ? 'w1920_and_h800_multi_faces' : 'w1000_and_h450_multi_faces'
                        }${backdrop_path})`,
                }}>

            </div>
            {/* <div style={{
                background: `linear-gradient(
                    to right, 
                    rgba(${color}, 1) 20%, 
                    rgba(${color}, 0.1) 50%, 
                    rgba(${color}, 0.2) 60%)`
            }}
                className={`absolute inset-0 z-0 block md:hidden`}></div> */}
            <div style={{
                background: `linear-gradient(
                    to right, 
                    rgba(${color}, 1) 20%, 
                    rgba(${color}, 0.84) 80%, 
                    rgba(${color}, 0.84) 100%)`
            }}
                className={`absolute inset-0 z-0 hidden md:block`}></div>

        </div>
    )
}