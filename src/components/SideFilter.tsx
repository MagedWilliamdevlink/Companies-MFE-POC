"use client";
import { useSearchParams, useRouter } from "next/navigation";

export default function SideFilter() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const activeFilter = searchParams.get("f") || "all";

    const filterOptions = [
        { id: "all", label: "الكل" },
        { id: "active", label: "نشط" },
        { id: "inactive", label: "غير نشط" },
        { id: "pending", label: "قيد الانتظار" },
        { id: "completed", label: "مكتمل" },
        { id: "cancelled", label: "ملغي" },
    ];

    const handleFilterChange = (filterId: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (filterId === "all") {
            params.delete("f");
        } else {
            params.set("f", filterId);
        }
        router.push(`?${params.toString()}`);
    };

    return (
        <div className="flex flex-col min-h-[40rem] gap-[0.5rem] flex-1 bg-white py-[3rem] rounded-[24px]">
            {filterOptions.map((option) => {
                const isActive = activeFilter === option.id;
                return (
                    <button
                        key={option.id}
                        onClick={() => handleFilterChange(option.id)}
                        className={`
                            text-right py-[0.5rem] text-[1.25rem] px-[0.75rem] transition-all duration-200 cursor-pointer
                            ${isActive
                                ? "bg-[#E7F0FF] text-[#2A71F0] border-l-[7px] border-[#2667DA]"
                                : "text-[#464646] bg-transparent border-l-[7px] border-transparent"
                            }
                        `}
                    >
                        {option.label}
                    </button>
                );
            })}
        </div>
    );
}