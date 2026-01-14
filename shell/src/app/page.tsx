"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PageHeader from "../components/PageHeader";
import SearchBar from "../components/SearchBar";
import ServiceCard from "../components/ServiceCard";
import EmptyState from "../components/EmptyState";
import { services, filterServices } from "../data/services";
import Breadcrumb from "@/components/Breadcrumb";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const featuredServices = useMemo(() => {
    return filterServices(searchQuery, "active").slice(0, 6);
  }, [searchQuery]);

  return (
    <div className=" min-h-full">
      <div className="max-w-[1920px] min-h-fit mx-auto  py-6">
        {/* Page Header */}
        <div className="mb-8">
          <PageHeader
            title="الخدمات المميزة"
            subtitle="الخدمات الأكثر استخداماً"
          />
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>

        {/* Featured Services Grid */}
        <div className="mb-8">
          {featuredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredServices.map((service) => (
                <Link key={service.id} href={service.ctaLink}>
                  <ServiceCard
                    title={service.title}
                    description={service.description}
                    ctaLink={service.ctaLink}
                  />
                </Link>
              ))}
            </div>
          ) : (
            <EmptyState
              title="لم يتم العثور على خدمات مطابقة"
              message="جرب تغيير البحث"
              action={{
                label: "مسح البحث",
                onClick: () => setSearchQuery(""),
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
