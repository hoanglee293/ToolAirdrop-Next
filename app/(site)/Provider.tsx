"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Lines from "@/components/Lines";
import ScrollToTop from "@/components/ScrollToTop";
import { ThemeProvider } from "next-themes";
import ToasterContext from "../context/ToastContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [queryClient] = useState(() => new QueryClient());
    const router = useRouter();
    useEffect(() => {
        router.push("/news");
    }, []);
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider
                enableSystem={false}
                attribute="class"
                defaultTheme="light"
            >
                <Lines />
                <Suspense fallback={null}>
                    <Header />
                </Suspense>
                <ToasterContext />
                {children}
                <Footer />
                <ScrollToTop />
            </ThemeProvider>
        </QueryClientProvider>
    );
}
