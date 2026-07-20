import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title:
    "Evgeny Kvest · Fullstack Developer | Python, JS, Computer Vision & Applied AI",
  description:
    "Portfolio von Evgeny Kvest – FIAE aus Berlin. Fullstack mit Python & JavaScript, OpenCV/Computer Vision, RAG und Cloud. Offen für Festanstellung und Freelance.",
  openGraph: {
    title: "Evgeny Kvest · Fullstack · CV & Applied AI",
    description:
      "Web, Media-Pipelines, OpenCV und RAG-Prototypen – interaktives Portfolio mit Live-Globe und produktiven Projekten.",
    locale: "de_DE",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
