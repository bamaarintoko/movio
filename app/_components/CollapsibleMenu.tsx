import { poppins } from "@/lib/fonts";


interface CollapsibleMenuProps {
    id: string;
    title: string;
    isOpen: boolean;
    onClick: (id: string) => void;
    children: React.ReactNode;
}

export default function CollapsibleMenu({ id, title, isOpen, onClick, children }: CollapsibleMenuProps) {
    return (
        <div className="w-full max-w-md mx-auto">
            <div onClick={() => onClick(id)} className="cursor-pointer">
                <p className={`${poppins.className} flex text-white gap-8 font-bold text-lg flex-col`}>{title}</p>
            </div>

            <div
                className={` pl-4 overflow-hidden transition-all duration-300 ${isOpen ? "max-h-40" : "max-h-0"
                    }`}
            >
                {children}
            </div>
        </div>
    )
}