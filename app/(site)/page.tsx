"use client";

import NewsService from "@/app/service/news";
import CategoryService from "@/app/service/category";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Eye } from "lucide-react";

export default function Home() {
  const { data: featuredNews = [] } = useQuery({
    queryKey: ['featuredNews'],
    queryFn: () => NewsService.getAll({ isTrending: true, limit: 2 })
  });
  console.log("featuredNews", featuredNews);

  const { data: newsList = [] } = useQuery({
    queryKey: ['newsList'],
    queryFn: () => NewsService.getAll({ limit: 6 })
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: () => CategoryService.getAll({ type: 'news' })
  });

  return (
    <main>
      {/* Hero / Featured Section */}
      <section className="pt-15 pb-20 lg:py-28">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="mb-10">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight"><span className="text-white">Crypto</span><span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent"> News</span></h2>
            <p className="text-base text-body-color dark:text-body-color-dark">Cập nhật tin tức mới nhất về tiền điện tử, phân tích thị trường và công nghệ blockchain.</p>
          </div>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full">
              <h1 className="mb-8 text-4xl font-bold text-black dark:text-white xl:text-hero">
                Featured News
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {featuredNews?.map((news) => (
                  <div key={news.id} className="group relative overflow-hidden rounded-lg bg-white shadow-solid-4 dark:bg-blacksection">
                    <Link href={`/blog/${news.id}`} className="block relative aspect-[370/220] w-full overflow-hidden">
                      <Image
                        src={news.image || '/images/blog/blog-01.png'}
                        alt={news.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </Link>
                    <div className="p-6">
                      <span className="mb-3 block text-sm font-medium text-primary">
                        {news.category}
                      </span>
                      <h3 className="mb-4 text-xl font-bold text-black hover:text-primary dark:text-white dark:hover:text-primary">
                        <Link href={`/blog/${news.id}`}>
                          {news.title}
                        </Link>
                      </h3>
                      {news.excerpt && (
                        <p className="mb-4 text-base text-body-color dark:text-body-color-dark">
                          {news.excerpt}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col items-start gap-1">
                          <h5 className="text-sm font-medium text-black dark:text-white">
                            {news?.author}
                          </h5>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-body-color">{news.readTime}</span>
                            <span className="text-xs text-body-color">{news.date}</span>
                            <div className="flex items-center gap-1 text-xs text-body-color"><Eye className="w-4 h-4" /> {news.views}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>


          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section>
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-3xl font-bold text-black dark:text-white xl:text-sectiontitle3">
              Latest News
            </h2>
            <Link href="/news" className="flex items-center gap-2 text-base font-medium text-primary hover:text-primary/80">
              View All News
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {newsList?.map((news) => (
              <div key={news.id} className="group relative overflow-hidden rounded-lg bg-white shadow-solid-4 dark:bg-blacksection transition hover:shadow-1">
                <Link href={`/blog/${news.id}`} className="block relative aspect-[370/220] w-full overflow-hidden">
                  <Image
                    src={news.image || '/images/blog/blog-01.png'}
                    alt={news.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </Link>
                <div className="p-6">
                  <h3 className="mb-3 text-xl font-bold text-black hover:text-primary dark:text-white dark:hover:text-primary">
                    <Link href={`/blog/${news.id}`}>
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
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
