import type { Metadata } from "next";
import { Syne, Manrope } from "next/font/google";
import "./globals.css";

const syne = Syne({
    variable: "--font-syne",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
});

const manrope = Manrope({
    variable: "--font-manrope",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
    title: "GustaSoares | UX/UI Designer",
    description: "Criando experiências que conectam seu público. Desenvolvendo interfaces intuitivas e envolventes.",
    icons: {
        icon: "/favicon.png",
        shortcut: "/favicon.png",
        apple: "/favicon.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR" suppressHydrationWarning>
            <head>
                {/* Preconnect para Supabase - reduz latência */}
                <link rel="preconnect" href="https://rlhhdfsiirlfweehpdro.supabase.co" />
                <link rel="dns-prefetch" href="https://rlhhdfsiirlfweehpdro.supabase.co" />
            </head>
            <body
                suppressHydrationWarning
                className={`${syne.variable} ${manrope.variable} antialiased min-h-screen bg-background text-textPrimary selection:bg-inverse selection:text-inverseSurface`}
            >
                {children}
            </body>
        </html>
    );
}
