'use client'
import { oswald, poppins } from "@/lib/fonts";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import HeaderDropDownMenu from "./HeaderDropDownMenu";
import Link from "next/link";
import CollapsibleMenu from "./CollapsibleMenu";
const movies = [
    {
        name: 'Popular',
        url: '/movie/category/popular'
    },
    {
        name: 'Now Playing',
        url: '/movie/category/now-playing'
    },
    {
        name: 'Upcoming',
        url: '/movie/category/upcoming'
    },
    {
        name: 'Top Rated',
        url: '/movie/category/top-rated'
    }
]
const tvShows = [
    {
        name: 'Popular',
        url: '/tv/category/popular'
    },
    {
        name: 'Airing Today',
        url: '/tv/category/airing-today'
    },
    {
        name: 'On TV',
        url: '/tv/category/on-the-air'
    },
    {
        name: 'Top Rated',
        url: '/tv/category/top-rated'
    }
]
const peoples = [
    {
        name: 'Popular People',
        url: '/people/category/person'
    },
]

type moviesProps = {
    name: string,
    url: string
}
type tvShowsPorps = {
    name: string,
    url: string
}
type peoplesProps = {
    name: string,
    url: string
}
export default function HomeHeader() {
    const [openId, setOpenId] = useState<string | null>(null);
    const [open, setOpen] = useState<boolean>(false)

    const [hidden, setHidden] = useState(false);
    // const [lastScrollY, setLastScrollY] = useState(0);
    // const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);
    const lastScrollY = useRef(0);
    const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY.current) {
                // console.log("scrolling down");
                if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

                scrollTimeout.current = setTimeout(() => {
                    setHidden(true)
                    console.log("No scroll down activity for 2000ms after scrolling");
                }, 500);
            } else {
                setHidden(false)
                // console.log("scrolling up");
                if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

                scrollTimeout.current = setTimeout(() => {
                    console.log("No scroll up activity for 2000ms after scrolling");
                }, 500);
            }


            lastScrollY.current = currentScrollY
            // setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        };
    }, [lastScrollY]);


    // useEffect(() => {
    //     console.log('hidden : ', hidden)
    //     console.log('hideTimeout : ', hideTimeout)
    // }, [hidden, hideTimeout])

    useEffect(() => {
        if (open) {
            // Disable scrolling when the panel is open
            document.body.style.overflow = "hidden";
        } else {
            // Enable scrolling when the panel is closed
            document.body.style.overflow = "auto";
        }

        // Clean up the effect when the component unmounts
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [open]);

    const handleDrawer = () => {
        // console.log('qweqeqwe')
        setOpen(!open)
    }

    const handleToggle = (id: string) => {
        setOpenId((prev) => (prev === id ? null : id));
    };
    return (
        <div>

            <motion.div
                className="h-14 bg-[#001F3F]"
                // animate={{ scale: 1.2 }}
                initial={{ y: 0 }}
                animate={{ y: hidden ? "-100%" : "0%" }}
                transition={{ duration: 1, type: 'spring' }}
            >
                <div className="2xl:max-w-[1280px] h-14 mx-auto lg:flex items-center px-10 hidden" >
                    <div className={`${oswald.className} mr-10 cursor-pointer`}>
                        <Link href="/">
                            <p className="text-xl font-bold text-white">MOVIO</p>
                        </Link>
                    </div>
                    <div className={`flex  gap-8 text-sm cursor-pointer`}>
                        {/* <div onMouseEnter={() => console.log('enter')} onMouseLeave={() => console.log('leave')}>
                            <p>Movie</p>
                        </div> */}
                        <HeaderDropDownMenu label="Movie" data={movies} />
                        <HeaderDropDownMenu label="TV Shows" data={tvShows} />
                        <HeaderDropDownMenu label="People" data={peoples} />
                        {/* <div>
                            <p>TV Shows</p>
                        </div>
                        <div>
                            <p>People</p>
                        </div> */}
                    </div>
                </div>
                <div className="flex flex-row items-center lg:hidden  h-full px-4">
                    {
                        !open
                        &&
                        <div className="pointer z-10" onClick={handleDrawer}>
                            <Bars3Icon className="size-6 text-white" />
                        </div>
                    }
                    <div className={`${oswald.className} ml-auto items-end`}>
                        <Link href="/">
                            <p className="text-xl font-bold text-white">MOVIO</p>
                        </Link>
                    </div>
                </div>
            </motion.div>

            {/* drawer mobile */}
            <div className="relative z-20" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
                <h2 id="slide-over-title" className="sr-only">Navigation Panel</h2>
                <div className={`fixed inset-0 bg-gray-500/75 transition-opacity ease-in-out duration-500 ${open ? "opacity-100 pointer-events-none" : "opacity-0 pointer-events-none"
                    }`} aria-hidden="true"></div>

                <div className="fixed overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 flex max-w-full pr-10">
                            <div className={` pointer-events-auto relative w-screen max-w-md transform transition ease-in-out duration-500 sm:duration-700 ${open ? "translate-x-0" : "-translate-x-full"
                                }`}>
                                <div className="absolute top-0 right-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                                    <button onClick={handleDrawer} type="button" className="relative rounded-md text-gray-300 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden">
                                        <span className="absolute -inset-2.5"></span>
                                        <span className="sr-only">Close panel</span>
                                        <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="flex h-full flex-col overflow-y-auto bg-[#001F3F] py-6 shadow-xl">
                                    <div className="relative mt-6 flex-1 px-4 sm:px-6 ">
                                        {/* <!-- Your content --> */}
                                        <div className={` space-y-4 flex-col`}>
                                            <CollapsibleMenu
                                                id="movie"
                                                title="Movie"
                                                isOpen={openId === "movie"}
                                                onClick={handleToggle}
                                            >
                                                {
                                                    movies.map((x: moviesProps, y: number) => (
                                                        <div key={y} className=" py-1">
                                                            <Link href={x.url}>
                                                                <p className={`${poppins.className} text-white`}>{x.name}</p>
                                                            </Link>
                                                        </div>
                                                    ))
                                                }
                                            </CollapsibleMenu>
                                            <CollapsibleMenu
                                                id="tvShows"
                                                title="Tv Shows"
                                                isOpen={openId === "tvShows"}
                                                onClick={handleToggle}
                                            >
                                                {
                                                    tvShows.map((x: tvShowsPorps, y: number) => (
                                                        <div key={y} className=" py-1">
                                                            <Link href={x.url}>
                                                                <p className={`${poppins.className} text-white`}>{x.name}</p>
                                                            </Link>
                                                        </div>
                                                    ))
                                                }
                                            </CollapsibleMenu>
                                            <CollapsibleMenu
                                                id="people"
                                                title="People"
                                                isOpen={openId === "people"}
                                                onClick={handleToggle}
                                            >
                                                {
                                                    peoples.map((x: peoplesProps, y: number) => (
                                                        <div key={y} className=" py-1">
                                                            <Link href={x.url}>
                                                                <p className={`${poppins.className} text-white`}>{x.name}</p>
                                                            </Link>
                                                        </div>
                                                    ))
                                                }
                                            </CollapsibleMenu>
                                            {/* <DrawerMenu />
                                            <div onClick={() => console.log('tv shows')}>
                                                <p>TV Shows</p>
                                            </div>
                                            <div onClick={() => console.log('people')}>
                                                <p>People</p>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}