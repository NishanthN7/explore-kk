import type { Metadata } from "next";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import Navbar from "@/components/Navbar";
import { LanguageProvider } from "@/lib/i18n";
export const metadata:Metadata={title:"Explore KK | Kanyakumari Tourism",description:"Discover Kanyakumari tourist places, map, restaurants and trip planning."};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body><LanguageProvider><Navbar/>{children}<footer className="footer"><div className="container">Explore KK · Discover the Southern Edge of India</div></footer></LanguageProvider></body></html>}
