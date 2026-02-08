"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import GetNewsById from "@/app/service/newById";
import { ClockIcon, EyeIcon, FlameIcon } from "lucide-react";

export default function BlogDetailPage() {
    const params = useParams();
    const id = params.id as string;

    const { data: news, isLoading, error } = useQuery({
        queryKey: ['newsDetail', id],
        queryFn: () => GetNewsById.get(id),
        enabled: !!id,
    });
    console.log("news", news);

    const shareToSocial = (platform: string) => {
        if (!news) return;

        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(news.title);
        let shareUrl = '';

        switch (platform) {
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
                break;
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                break;
        }

        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }
    };

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
        );
    }

    if (error || !news) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-4">
                <h1 className="text-2xl font-bold text-black dark:text-white">Không tìm thấy bài viết</h1>
                <Link href="/news" className="text-primary hover:underline">
                    Quay lại trang chủ
                </Link>
            </div>
        );
    }

    return (
        <main className="pb-10 pt-25 lg:pb-25 lg:pt-30 xl:pb-30">
            <div className="mx-auto max-w-c-1016 px-4 md:px-8 2xl:px-0">
                {/* Back button */}
                <Link
                    href="/news"
                    className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-body-color hover:text-primary dark:text-body-color-dark"
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Quay lại
                </Link>

                {news.isTrending && (
                    <div className="mb-6 flex flex-wrap items-center gap-4">
                        <span className="rounded-xl bg-red-500/10 px-5 py-1.5 text-base font-medium text-yellow-500 uppercase">
                            <FlameIcon className="inline-block h-4 md:h-5 w-4 md:w-5 mr-1" /> Trending
                        </span>
                    </div>
                )}

                {/* Category & Date */}
                <div className="mb-6 flex flex-wrap items-center gap-4">
                    {news.category && (
                        <span className="rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
                            {news.category}
                        </span>
                    )}
                    {news.date && (
                        <span className="text-sm text-body-color dark:text-body-color-dark">
                            {news.date}
                        </span>
                    )}
                    {news.readTime && (
                        <span className="text-sm text-body-color dark:text-body-color-dark">
                            <ClockIcon className="inline-block h-4 w-4 mr-1" /> {news.readTime}
                        </span>
                    )}
                    {news.views !== undefined && (
                        <span className="text-sm text-body-color dark:text-body-color-dark">
                            <EyeIcon className="inline-block h-4 w-4 mr-1" /> {news.views}
                        </span>
                    )}
                </div>

                {/* Title */}
                <h1 className="mb-8 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl md:text-[45px]">
                    {news.title}
                </h1>

                {/* Excerpt */}
                {news.excerpt && (
                    <p className="mb-4 md:mb-8 text-lg leading-relaxed text-body-color dark:text-body-color-dark">
                        {news.excerpt}
                    </p>
                )}

                {/* Author */}
                <div className="mb-10 flex items-center gap-4 border-b border-stroke pb-8 dark:border-strokedark">
                    {news.authorImage && news.authorImage !== "ABC" && (
                        <div className="relative h-12 w-12 overflow-hidden rounded-full">
                            <Image
                                src={news.authorImage}
                                alt={news.author}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}
                </div>

                {/* Featured Image */}
                {news.image && (
                    <div className="relative mb-10 aspect-[16/9] w-full overflow-hidden rounded-lg">
                        <Image
                            src={news.image}
                            alt={news.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                {/* Content */}
                <div
                    className="blog-content prose prose-lg max-w-none dark:prose-invert prose-headings:text-black dark:prose-headings:text-white prose-p:text-body-color dark:prose-p:text-body-color-dark prose-a:text-primary"
                    dangerouslySetInnerHTML={{ __html: news.content }}
                />

                <div className="mt-10 flex items-center justify-end gap-4 pt-8 dark:border-strokedark">
                    <h4 className="text-base font-medium text-black dark:text-white">
                        {news.author}
                    </h4>
                </div>

                {/* Tags */}
                {news.tags && news.tags.length > 0 && (
                    <div className="mt-10 border-t border-stroke pt-4 dark:border-strokedark">
                        <h4 className="mb-4 text-sm font-medium uppercase text-black dark:text-white">
                            Tags
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {news.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="rounded-full bg-stroke px-4 py-1.5 text-sm text-body-color transition hover:bg-primary hover:text-white dark:bg-strokedark dark:text-body-color-dark"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Share buttons */}
                <div className="mt-10 flex items-center gap-4">
                    <span className="text-sm font-medium text-black dark:text-white">Share:</span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => shareToSocial('twitter')}
                            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-stroke text-body-color transition hover:bg-primary hover:text-white dark:bg-strokedark"
                        >
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                            </svg>
                        </button>
                        <button
                            onClick={() => shareToSocial('facebook')}
                            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-stroke text-body-color transition hover:bg-primary hover:text-white dark:bg-strokedark"
                        >
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                            </svg>
                        </button>
                        <button
                            onClick={() => shareToSocial('linkedin')}
                            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-stroke text-body-color transition hover:bg-primary hover:text-white dark:bg-strokedark"
                        >
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                            </svg>
                        </button>
                    </div>
                </div>            </div>
        </main>
    );
}
