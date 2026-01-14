import { GoSearch } from "react-icons/go";
type SearchBarProps = {
    searchQuery: string;
    setSearchQuery: (value: string) => void;
}
export default function SearchBar({ searchQuery, setSearchQuery }: SearchBarProps) {
    return (
        <div className="relative max-w-md mr-auto min-w-[25rem]">
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن خدمة"
                className="w-full text-[1.25rem] px-4 py-3 pr-12 border-2 border-[#E1EAF3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2667da] text-right"
            />
            <GoSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
    );
}