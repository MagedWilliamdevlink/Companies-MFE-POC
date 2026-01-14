import { CiBookmark } from "react-icons/ci";

interface ServiceCardProps {
    title: string;
    description: string;
    ctaLink: string;
}

export default function ServiceCard({ title, description, ctaLink }: ServiceCardProps) {
    return (
        <div className="p-[1rem] h-auto rounded-[1rem] bg-white flex justify-between items-start min-h-[6.625rem] cursor-pointer border-2 border-transparent hover:border-[#1E50AA] transition-all duration-200">
            <div className="flex flex-col flex-[2] gap-[0.675rem]">
                <p className="text-[1.25rem] text-[#343434]">
                    {title}
                </p>
                <p className="text-[1=rem] text-[#464646]">
                    {description}
                </p>
            </div>
            <div className="flex-1 flex justify-end items-start">
                <CiBookmark className="text-[2rem] text-[#1E50AA]" />

            </div>
        </div>
    );
}