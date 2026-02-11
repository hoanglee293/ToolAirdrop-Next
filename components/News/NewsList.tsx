"use client";

import NewsService from "@/app/service/news";
import CategoryService from "@/app/service/category";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Eye, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { NewsQuery } from "@/types/news";
import CustomSelect from "@/components/CustomSelect";
import Skeleton from "@/components/Common/Skeleton";

const timeOptions = [
    { value: "all", label: "All Time" },
    { value: "today", label: "Today" },
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
];

const sortOptions = [
    { value: "latest", label: "Latest" },
    { value: "popular", label: "Most Popular" },
    { value: "oldest", label: "Oldest" },
];

export default function NewsList() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const tag = searchParams.get('tag');

    // State for filters
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [timeRange, setTimeRange] = useState<"all" | "today" | "week" | "month">("all");
    const [sortBy, setSortBy] = useState<"latest" | "popular" | "oldest">("latest");
    const [page, setPage] = useState(1);

    // Reset page when filters change
    useEffect(() => {
        setPage(1);
    }, [searchQuery, selectedCategory, timeRange, sortBy, tag]);

    // Construct query object
    const query: NewsQuery = {
        limit: 12,
        page,
        sort: sortBy,
        search: searchQuery,
        category: selectedCategory,
        timeRange,
        tag: tag || undefined,
    };

    const { data: featuredNews = [], isLoading: isFeaturedLoading } = useQuery({
        queryKey: ['featuredNews'],
        queryFn: () => NewsService.getAll({ isTrending: true, limit: 2 }),
        enabled: !tag && !searchQuery && !selectedCategory // Hide featured when filtering
    });

    const { data: newsList = [], isLoading } = useQuery({
        queryKey: ['newsList', query],
        queryFn: () => NewsService.getAll(query),
        staleTime: 5000
    });
    console.log("newsList", newsList);

    const { data: categories = [] } = useQuery({
        queryKey: ['categories'],
        queryFn: () => CategoryService.getAll({ type: 'news' })
    });

    // Pagination handlers
    const handleNextPage = () => setPage(p => p + 1);
    const handlePrevPage = () => setPage(p => Math.max(1, p - 1));

    const clearFilters = () => {
        setTimeRange("all");
        setSortBy("latest");
    };

    const hasActiveFilters = searchQuery || selectedCategory || timeRange !== "all" || sortBy !== "latest" || tag;

    return (
        <main className="flex-1">
            {/* Hero / Featured Section - Only show when no specific filters active (except maybe sort) */}
            {!tag && !searchQuery && !selectedCategory && (
                <section className="pt-24">
                    <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0 h-full">
                        <div className="mb-10">
                            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
                                <span className="text-black dark:text-white">Crypto</span>
                                <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent"> News</span>
                            </h2>
                            <p className="text-base text-body-color dark:text-body-color-dark">
                                Stay updated with the latest news on cryptocurrency, market analysis, and blockchain technology.
                            </p>
                        </div>

                        {(featuredNews.length > 0 || isFeaturedLoading) && (
                            <div className="flex flex-col lg:flex-row gap-8">
                                <div className="w-full">
                                    <h1 className="mb-8 text-2xl md:text-3xl font-bold text-black dark:text-white">
                                        Featured News
                                    </h1>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {isFeaturedLoading ? (
                                            Array.from({ length: 2 }).map((_, index) => (
                                                <div key={index} className="rounded-lg bg-white shadow-solid-4 dark:bg-blacksection overflow-hidden">
                                                    <Skeleton className="h-[220px] w-full rounded-none" />
                                                    <div className="p-6">
                                                        <Skeleton className="h-4 w-1/4 mb-3" />
                                                        <Skeleton className="h-6 w-3/4 mb-4" />
                                                        <Skeleton className="h-4 w-full mb-2" />
                                                        <Skeleton className="h-4 w-5/6 mb-4" />
                                                        <div className="flex items-center gap-3">
                                                            <Skeleton className="h-3 w-16" />
                                                            <Skeleton className="h-3 w-12" />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            featuredNews.map((news) => (
                                                <div key={news._id || news.id} className="group relative overflow-hidden rounded-lg bg-white shadow-solid-4 dark:bg-blacksection">
                                                    <Link href={`/blog/${news._id || news.id}`} className="block relative aspect-[370/220] w-full overflow-hidden">
                                                        <img
                                                            src={news.image || '/images/blog/blog-01.png'}
                                                            alt={news.title}
                                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                        />
                                                    </Link>
                                                    <div className="p-6">
                                                        <span className="mb-3 block text-sm font-medium text-primary">
                                                            {news.category}
                                                        </span>
                                                        <h3 className="mb-4 text-xl font-bold text-black hover:text-primary dark:text-white dark:hover:text-primary">
                                                            <Link href={`/blog/${news._id || news.id}`}>
                                                                {news.title}
                                                            </Link>
                                                        </h3>
                                                        {news.excerpt && (
                                                            <p className="mb-4 text-sm text-body-color dark:text-body-color-dark line-clamp-2">
                                                                {news.excerpt}
                                                            </p>
                                                        )}
                                                        <div className="flex items-center gap-3 text-xs text-body-color">
                                                            <span>{news.date}</span>
                                                            {/* <div className="flex items-center gap-1"><Eye className="w-4 h-4" /> {news.views}</div> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* Filter & List Section */}
            <section className={`${!tag && !searchQuery && !selectedCategory ? 'pt-10' : 'pt-24'} h-full`}>
                <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0 h-full">
                    {tag && (
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight mt-8">
                            <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent uppercase">{tag}</span>
                        </h2>
                    )}
                    {/* Filters Toolbar */}
                    <div className="my-5 md:my-10 flex flex-col gap-6 rounded-lg bg-transparent">
                        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                            {/* Search */}
                            <div className="relative w-full md:w-3/5 dark:bg-gray-900 rounded-xl bg-white z-10">
                                <input
                                    type="text"
                                    placeholder="Search news..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full rounded-xl shadow-md border border-stroke bg-transparent py-2.5 pl-10 pr-4 outline-none focus:border-primary focus-visible:shadow-none dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary"
                                />
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-body-color" />
                            </div>

                            {/* Filters Group */}
                            <div className="flex flex-wrap flex-1 items-center gap-4 w-full md:w-auto">
                                <div className="min-w-[150px]">
                                    <CustomSelect
                                        value={timeOptions.find(opt => opt.value === timeRange)}
                                        onChange={(option) => setTimeRange((option as any)?.value)}
                                        options={timeOptions}
                                        placeholder="Time Range"
                                        isSearchable={false}
                                    />
                                </div>

                                <div className="min-w-[150px]">
                                    <CustomSelect
                                        value={sortOptions.find(opt => opt.value === sortBy)}
                                        onChange={(option) => setSortBy((option as any)?.value)}
                                        options={sortOptions}
                                        placeholder="Sort By"
                                        isSearchable={false}
                                    />
                                </div>

                                {hasActiveFilters && (
                                    <button
                                        onClick={clearFilters}
                                        className="text-sm text-red-500 hover:underline"
                                    >
                                        Clear Filters
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Categories */}
                        <div className="flex flex-wrap gap-3">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.slug)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === cat.slug
                                        ? "bg-primary text-white"
                                        : "bg-gray-100 text-body-color hover:bg-gray-200 dark:bg-strokedark dark:text-white dark:hover:bg-gray-700"
                                        }`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* News Grid */}
                    <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
                        {isLoading ? (
                            // Skeleton Loading
                            Array.from({ length: 6 }).map((_, index) => (
                                <div key={index} className="rounded-lg bg-white shadow-solid-4 dark:bg-blacksection overflow-hidden">
                                    {/* Image Skeleton */}
                                    <Skeleton className="h-[220px] w-full rounded-none" />
                                    <div className="p-6">
                                        {/* Title Skeleton */}
                                        <Skeleton className="h-6 w-3/4 mb-3" />
                                        <Skeleton className="h-6 w-1/2 mb-4" />

                                        {/* Excerpt Skeleton */}
                                        <Skeleton className="h-4 w-full mb-2" />
                                        <Skeleton className="h-4 w-5/6 mb-4" />

                                        {/* Meta Skeleton */}
                                        <div className="flex items-center justify-between">
                                            <Skeleton className="h-3 w-20" />
                                            <Skeleton className="h-3 w-20" />
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : newsList.length > 0 ? (
                            newsList.map((news) => (
                                <div key={news._id || news.id} className="group relative overflow-hidden rounded-lg bg-white shadow-solid-4 dark:bg-blacksection transition hover:shadow-1">
                                    <Link href={`/blog/${news._id || news.id}`} className="block relative aspect-[370/220] w-full overflow-hidden">
                                        <img
                                            src={news.image || '/images/blog/blog-01.png'}
                                            alt={news.title}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                        />
                                    </Link>
                                    <div className="p-6">
                                        <h3 className="mb-3 text-xl font-bold text-black hover:text-primary dark:text-white dark:hover:text-primary">
                                            <Link href={`/blog/${news._id || news.id}`}>
                                                {news.title}
                                            </Link>
                                        </h3>
                                        <p className="mb-4 line-clamp-2 text-base text-body-color dark:text-body-color-dark">
                                            {news.excerpt}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-body-color">{news.date}</span>
                                            <span className="text-sm font-medium text-primary">{news.category}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-20 text-lg text-body-color">
                                No news found matching your criteria.
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    <div className="mt-10 flex justify-center items-center gap-4">
                        <button
                            onClick={handlePrevPage}
                            disabled={page === 1}
                            className="p-2 rounded-full bg-white dark:bg-blacksection shadow-solid-4 disabled:opacity-50 disabled:cursor-not-allowed hover:text-primary transition-colors"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <span className="text-black dark:text-white font-medium">Page {page}</span>
                        <button
                            onClick={handleNextPage}
                            disabled={newsList.length < 12} // Disable if fetched less than limit
                            className="p-2 rounded-full bg-white dark:bg-blacksection shadow-solid-4 disabled:opacity-50 disabled:cursor-not-allowed hover:text-primary transition-colors"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}
