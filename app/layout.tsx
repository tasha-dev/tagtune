import { RootLayoutProps } from "@/type/component";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "@/app/global.css";

export const metadata: Metadata = {
   title: {
      default: "TagTune",
      template: "%s | TagTune",
   },
   description:
      "TagTune is a modern web application for editing MP3 metadata, updating album artwork, organizing your music library, and downloading updated audio files—all locally in your browser.",
   keywords: [
      "TagTune",
      "MP3 Editor",
      "ID3 Tag Editor",
      "Music Metadata",
      "Album Artwork",
      "Cover Art",
      "MP3 Tags",
      "Music Library",
      "Audio Metadata",
      "Next.js",
      "React",
      "TypeScript",
   ],
   authors: [
      {
         name: "Mahdi Tasha",
         url: "https://github.com/tasha-dev",
      },
   ],
   creator: "Mahdi Tasha",
   publisher: "Mahdi Tasha",
   applicationName: "TagTune",
   // metadataBase: new URL("https://tagtune.vercel.app"),
   alternates: {
      canonical: "/",
   },
   openGraph: {
      type: "website",
      locale: "en_US",
      // url: "https://tagtune.vercel.app",
      title: "TagTune",
      description:
         "Edit MP3 metadata, update album artwork, organize your music library, and download updated files—all locally in your browser.",
      siteName: "TagTune",
      images: [
         {
            url: "/og-image.png",
            width: 1200,
            height: 630,
            alt: "TagTune",
         },
      ],
   },
   twitter: {
      card: "summary_large_image",
      title: "TagTune",
      description:
         "A modern MP3 metadata editor built with Next.js and TypeScript.",
      images: ["/og-image.png"],
   },
   robots: {
      index: true,
      follow: true,
   },
   category: "Music",
};

const interFont = Inter({
   display: "block",
   style: "normal",
   weight: ["300", "400", "500", "600", "700"],
   subsets: ["latin"],
});

export default function RootLayout({ children }: RootLayoutProps) {
   return (
      // Suprres hydration warning to remove errors caused by shadcn components
      <html lang="en" suppressHydrationWarning>
         <body>{children}</body>
      </html>
   );
}
