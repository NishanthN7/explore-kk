"use client";
import Link from "next/link";
import { Heart } from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "@/lib/i18n";
export default function Navbar(){const {t}=useLanguage();return <header className="nav"><div className="container navin"><Link className="brand" href="/"><span className="brandmark">KK</span><span>Explore KK<small>Kanyakumari, Tamil Nadu</small></span></Link><nav className="links"><Link href="/">{t("home")}</Link><Link href="/places">{t("places")}</Link><Link href="/#map">{t("map")}</Link><Link href="/trip">{t("planTrip")}</Link><Link href="/restaurants">{t("restaurants")}</Link></nav><div className="nav-actions"><LanguageSelector/><Link className="pill" href="/trip"><Heart size={15}/>{t("trip")}</Link></div></div></header>}
