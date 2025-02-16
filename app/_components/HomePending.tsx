import { oswald } from "@/lib/fonts";
interface HomePendingProps {
    label: string
}
export default function HomePending({ label }: HomePendingProps) {
    return <div className="w-full">
        <div className="2xl:max-w-[1280px] mx-auto h-auto lg:flex justify-center-center flex-col" >
            <div className="flex gap-4 lg:px-10 xl:px-10 2xl:px-10 px-4 py-3">
                <p className={`${oswald.className} text-2xl`}>

                    {label}

                </p>
            </div>
            <div className="relative h-[calc(14rem+4rem)]">

                <div className="w-full flex overflow-x-auto flex-nowrap lg:space-x-5 xl:space-x-5 2xl:space-x-5 space-x-4 lg:px-10 xl:px-10 2xl:px-10 px-4 h-[calc(14rem+4rem)] overflow-y-hidden">
                    {Array.from({ length: 20 }).map((x, y) => (
                        <div key={y} className="w-36 flex-shrink-0 mt-3 space-y-1">
                            <div className="relative h-56 bg-slate-200 animate-pulse">
                            </div>
                            <div className=" h-14">
                                <div className="h-2 bg-slate-200 animate-pulse" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
}