"use client";
import { Suspense } from "react";
import NewsList from "@/components/News/NewsList";
import Skeleton from "@/components/Common/Skeleton";

export default function NewsPage() {
    return (
        <Suspense fallback={
            <div className="pt-24 pb-20">
                <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
                    <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div key={index} className="rounded-lg bg-white shadow-solid-4 dark:bg-blacksection overflow-hidden">
                                <Skeleton className="h-[220px] w-full rounded-none" />
                                <div className="p-6">
                                    <Skeleton className="h-6 w-3/4 mb-3" />
                                    <Skeleton className="h-6 w-1/2 mb-4" />
                                    <Skeleton className="h-4 w-full mb-2" />
                                    <Skeleton className="h-4 w-5/6 mb-4" />
                                    <div className="flex items-center justify-between">
                                        <Skeleton className="h-3 w-20" />
                                        <Skeleton className="h-3 w-20" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        }>
            <NewsList />
        </Suspense>
    );
}
