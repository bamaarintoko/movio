'use client'
import { oswald, poppins } from "@/lib/fonts";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { useState } from "react";

export default function HomeHeader() {
    const [open, setOpen] = useState<any>(false)

    const handleDrawer = () => {
        // console.log('qweqeqwe')
        setOpen(!open)
    }
    return (
        <div>

            <div className="h-14 bg-[#001F3F] ">
                <div className="2xl:max-w-[1280px] h-14 mx-auto lg:flex items-center px-10 hidden" >
                    <div className={`${oswald.className} mr-10`}>
                        <p className="text-xl font-bold text-white">MOVIO</p>
                    </div>
                    <div className={`${poppins.className} flex text-white gap-8 font-bold text-sm`}>
                        <p>Movie</p>
                        <p>TV Shows</p>
                        <p>People</p>
                    </div>
                </div>
                <div className="flex flex-row items-center lg:hidden  h-full px-4">
                    {
                        !open
                        &&
                        <div className="pointer z-30" onClick={handleDrawer}>
                            <Bars3Icon className="size-6 text-white" />
                        </div>
                    }
                    <div className={`${oswald.className} ml-auto items-end`}>
                        <p className="text-xl font-bold text-white">MOVIO</p>
                    </div>
                </div>
            </div>

            <div className="relative z-20" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
                {/* <!--
                Background backdrop, show/hide based on slide-over state.

                Entering: "ease-in-out duration-500"
                From: "opacity-0"
                To: "opacity-100"
                Leaving: "ease-in-out duration-500"
                From: "opacity-100"
                To: "opacity-0"
  --> */}
                <div className={`fixed inset-0 bg-gray-500/75 transition-opacity ease-in-out duration-500 ${open ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`} aria-hidden="true"></div>

                <div className="fixed inset-0 overflow-hidden">
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

                                <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                    <div className="px-4 sm:px-6">
                                        <h2 className="text-base font-semibold text-gray-900" id="slide-over-title">Panel title</h2>
                                    </div>
                                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                        {/* <!-- Your content --> */}
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