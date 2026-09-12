"use client";
import KanyakumariMap from "@/components/KanyakumariMap";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
export default function MapPage(){const {t}=useLanguage();return <main className="map-page"><div className="container"><div className="map-head"><div><span className="kicker">{t("phaseMap")}</span><h1>{t("mapTitle")}</h1><p className="muted">{t("mapSubtitle")}</p></div><Link className="secondary" href="/places">{t("browsePlaces")}</Link></div><div className="map-shell"><KanyakumariMap/></div></div></main>}
