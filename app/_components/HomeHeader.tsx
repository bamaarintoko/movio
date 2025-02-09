'use client'
import { oswald, poppins } from "@/lib/fonts";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import HeaderDropDownMenu from "./HeaderDropDownMenu";
const movies = [
    {
        name:'Popular',
        url:''
    },
    {
        name:'Now Playing',
        url:''
    },
    {
        name:'Upcoming',
        url:''
    },
    {
        name:'Top Rated',
        url:''
    }
]
const tvShows = [
    {
        name:'Popular',
        url:''
    },
    {
        name:'Airing Today',
        url:''
    },
    {
        name:'On TV',
        url:''
    },
    {
        name:'Top Rated',
        url:''
    }
]
const peoples = [
    {
        name:'Popular People',
        url:''
    },
]
export default function HomeHeader() {
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
                        <p className="text-xl font-bold text-white">MOVIO</p>
                    </div>
                    <div className={`flex  gap-8 text-sm cursor-pointer`}>
                        {/* <div onMouseEnter={() => console.log('enter')} onMouseLeave={() => console.log('leave')}>
                            <p>Movie</p>
                        </div> */}
                        <HeaderDropDownMenu label="Movie" data={movies}/>
                        <HeaderDropDownMenu label="TV Shows" data={tvShows}/>
                        <HeaderDropDownMenu label="People" data={peoples}/>
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
                        <p className="text-xl font-bold text-white">MOVIO</p>
                    </div>
                </div>
            </motion.div>

            <div className="relative z-20" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
                <h2 id="slide-over-title" className="sr-only">Navigation Panel</h2>
                {/* <!--
                Background backdrop, show/hide based on slide-over state.

                Entering: "ease-in-out duration-500"
                From: "opacity-0"
                To: "opacity-100"
                Leaving: "ease-in-out duration-500"
                From: "opacity-100"
                To: "opacity-0"
  --> */}
                <div className={`fixed inset-0 bg-gray-500/75 transition-opacity ease-in-out duration-500 ${open ? "opacity-100 pointer-events-none" : "opacity-0 pointer-events-none"
                    }`} aria-hidden="true"></div>

                <div className="fixed overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 flex max-w-full pr-10">
                            {/* <!--
                            Slide-over panel, show/hide based on slide-over state.

                            Entering: "transform transition ease-in-out duration-500 sm:duration-700"
                            From: "translate-x-full"
                            To: "translate-x-0"
                            Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
                            From: "translate-x-0"
                            To: "translate-x-full"
        --> */}
                            <div className={` pointer-events-auto relative w-screen max-w-md transform transition ease-in-out duration-500 sm:duration-700 ${open ? "translate-x-0" : "-translate-x-full"
                                }`}>
                                {/* <!--
                                Close button, show/hide based on slide-over state.

                                Entering: "ease-in-out duration-500"
                                From: "opacity-0"
                                To: "opacity-100"
                                Leaving: "ease-in-out duration-500"
                                From: "opacity-100"
                                To: "opacity-0"
          --> */}
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
                                        <div className={`${poppins.className} flex text-white gap-8 font-bold text-lg flex-col`}>
                                            <div onClick={() => console.log('movie')}>
                                                <p>Movie</p>
                                            </div>
                                            <div onClick={() => console.log('tv shows')}>
                                                <p>TV Shows</p>
                                            </div>
                                            <div onClick={() => console.log('people')}>
                                                <p>People</p>
                                            </div>
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