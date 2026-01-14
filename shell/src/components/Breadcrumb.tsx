"use client";

import { GoChevronLeft } from "react-icons/go";

type BreadcrumbItem = {
    name: string;
    href: string;
};

type BreadcrumbProps = {
    customBreadcrumbs: BreadcrumbItem[];
    showInResponsive?: boolean;
};

export default function Breadcrumb({ customBreadcrumbs, showInResponsive }: BreadcrumbProps) {
    if (!customBreadcrumbs || customBreadcrumbs.length === 0) {
        return null;
    }

    return (
        <nav className={` ${showInResponsive ? "flex" : "hidden"} md:flex items-center justify-start pt-[2rem] pb-[2rem] `}>
            <ol className="flex flex-wrap items-center space-x-reverse space-x-2">
                {customBreadcrumbs.map((item, index) => {
                    const isLast = index === customBreadcrumbs.length - 1;
                    return (
                        <li key={index} className="flex items-center">
                            {index > 0 && <GoChevronLeft className="mx-2 w-[1.5rem] h-[1.5rem] text-gray-400" />}
                            {!isLast ? (
                                <a
                                    href={item.href}
                                    className="font-normal no-underline text-[#949494] text-[1.5rem] md:text-[1.125rem] leading-[123%] tracking-[0%] text-right"
                                >
                                    {item.name}
                                </a>
                            ) : (
                                <span className="text-[#056FB6] text-[1.5rem] md:text-[1.25rem] leading-[123%] tracking-[0%] text-right">
                                    {item.name}
                                </span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
