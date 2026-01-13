"use client";
import Breadcrumb from "@/components/Breadcrumb";
import PageHeader from "@/components/PageHeader";
import SearchBar from "@/components/SearchBar";
import ServiceCard from "@/components/ServiceCard";
import SideFilter from "@/components/SideFilter";
import { useState } from "react";

export default function ServicesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    return <>
        <div className="px-[5%] lg:px-[7.4%]">
            <Breadcrumb customBreadcrumbs={[{ name: "شركاتي", href: "/my-companies" }, { name: "المصرف المتحد", href: "/united-banks" }, { name: "ادارة الخدمات ", href: "/services" }]} />
            <div className="flex justify-between items-center">
                <PageHeader title="ادارة الخدمات" subtitle="الهلال للأستثمار والتنمية العمرانية " />
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </div>



        </div>
        <div className="flex flex-row gap-[3rem] px-[5%] lg:px-[7.4%] py-[3rem] mt-[2rem] bg-[#F6F6F6]">
            <SideFilter />
            <div className=" pt-[3rem] flex-4 flex flex-col gap-[1.75rem]">
                <div className="flex flex-col gap-[0.25rem]">
                    <p className="text-[2.5rem] text-black ">
                        خدمات الجمعيات العمومية
                    </p>
                    <p className="text-[1.125rem] text-[#00000080]">
                        استفد بجميع خدمات الجمعيات العمومية من مكانك!
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[1.75rem]">
                    <ServiceCard title="إرسال أسئلة لاجتماع جميعة عامة" description="خدمات هندسية منطقة حرة" ctaLink="/services/service-a" />
                    <ServiceCard title="التصديق على محاضر الجمعيات العامة ومجالس الإدارة" description="خدمات هندسية منطقة حرة" ctaLink="/services/service-a" />
                </div>
            </div>
        </div>
    </>;
}