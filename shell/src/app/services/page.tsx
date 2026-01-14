"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "../../components/Breadcrumb";
import PageHeader from "../../components/PageHeader";
import SearchBar from "../../components/SearchBar";
import ServiceCard from "../../components/ServiceCard";
import SideFilter from "../../components/SideFilter";
import EmptyState from "../../components/EmptyState";
import { filterServices } from "../../data/services";

function ServicesContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const searchParams = useSearchParams();
  const activeFilter = searchParams.get("f") || "all";

  const filteredServices = useMemo(() => {
    return filterServices(searchQuery, activeFilter);
  }, [searchQuery, activeFilter]);

  return (
    <>
      {/* Search Bar */}
      <div className="mb-8">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

      {/* Main Content */}
      <div className="flex gap-6 items-start">
        {/* Side Filter */}
        <div className="w-64 shrink-0">
          <SideFilter />
        </div>

        {/* Services Grid */}
        <div className="flex-1">
          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredServices.map((service) => (
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
              message="جرب تغيير البحث أو الفلتر"
              action={{
                label: "مسح البحث",
                onClick: () => setSearchQuery(""),
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default function ServicesPage() {
  const breadcrumbs = [
    { name: "الرئيسية", href: "/" },
    { name: "الخدمات", href: "/services" },
  ];

  return (
    <div className="bg-[#f5f6f9] ">
      <Breadcrumb customBreadcrumbs={breadcrumbs} />

      <div className=" px-52 ">
        {/* Page Header */}
        <div className="mb-8">
          <PageHeader
            title="الخدمات الإلكترونية"
            subtitle="اختر الخدمة المناسبة لك"
          />
        </div>

        {/* Wrap content that uses useSearchParams in Suspense */}
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-12">
              <p className="text-gray-500">جاري التحميل...</p>
            </div>
          }
        >
          <ServicesContent />
        </Suspense>
      </div>
    </div>
  );
}
