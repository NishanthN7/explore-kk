"use client";
import Link from "next/link";
import { ArrowRight, CalendarDays, Compass, Map, Navigation, Sparkles, Utensils } from "lucide-react";
import { places } from "@/data/places";
import PlaceCard from "@/components/PlaceCard";
import KanyakumariMap from "@/components/KanyakumariMap";
import { useLanguage } from "@/lib/i18n";

export default function Home(){
 const {t,categoryName}=useLanguage();
 const cats=["Beaches","Temples","Waterfalls","Dams","Historical","Nature"];
 return <main>
  <section className="hero">
   <div className="container hero-content">
    <span className="kicker">{t("heroKicker")}</span>
    <h1>{t("discover")}</h1>
    <p>{t("heroSubtitle")}</p>
    <div className="hero-actions"><Link className="primary" href="/places">{t("startExploring")} <ArrowRight size={17}/></Link><Link className="hero-ghost" href="/map"><Map size={17}/>{t("viewMap")}</Link></div>
    <div className="hero-trust"><span><Compass size={15}/>{t("districtOnly")}</span><span><Navigation size={15}/>{t("liveDirections")}</span><span><HeartIcon/>{t("savePlaces")}</span></div>
   </div>
  </section>

  <section className="section intro-section"><div className="container intro-grid"><div><span className="kicker">{t("whyKicker")}</span><h2>{t("whyTitle")}</h2></div><p className="intro-copy">{t("whyText")}</p></div></section>

  <section className="section category-section"><div className="container"><div className="section-head"><div><span className="kicker">{t("startHere")}</span><h2>{t("whatLooking")}</h2><p className="muted">{t("categorySubtitle")}</p></div><Link className="muted" href="/places">{t("viewAll")}</Link></div><div className="category-grid">{cats.map((c,i)=><Link className="category-card" href={`/places?category=${encodeURIComponent(c)}`} key={c}><span className="category-number">0{i+1}</span><div><h3>{categoryName(c)}</h3><p>{t("categoryExplore")} {categoryName(c).toLowerCase()}.</p></div><ArrowRight size={18}/></Link>)}</div></div></section>

  <section className="section featured-section"><div className="container"><div className="section-head"><div><span className="kicker">{t("featuredKicker")}</span><h2>{t("placesJourney")}</h2><p className="muted">{t("featuredSubtitle")}</p></div><Link className="primary small-primary" href="/places">{t("browsePlaces")}</Link></div><div className="grid">{places.slice(0,6).map(p=><PlaceCard key={p.id} place={p}/>)}</div></div></section>

  <section className="section map-section" id="map"><div className="container"><div className="section-head"><div><span className="kicker">{t("phaseMap")}</span><h2>{t("mapTitle")}</h2><p className="muted">{t("mapSubtitle")}</p></div><Link className="primary small-primary" href="/map">{t("openMap")}</Link></div><div className="map-shell"><div className="home-map"><KanyakumariMap heightClass="home-map"/></div></div></div></section>

  <section className="section plan-section"><div className="container"><div className="plan-banner"><div><span className="kicker">{t("planKicker")}</span><h2>{t("planTitle")}</h2><p>{t("planText")}</p></div><div className="plan-actions"><Link className="primary" href="/trip"><CalendarDays size={17}/>{t("buildTrip")}</Link><Link className="secondary" href="/restaurants"><Utensils size={17}/>{t("findFood")}</Link></div></div></div></section>

  <section className="section values-section"><div className="container"><div className="value-grid"><div className="value-item"><Sparkles/><h3>{t("curatedTitle")}</h3><p>{t("curatedText")}</p></div><div className="value-item"><Navigation/><h3>{t("directionTitle")}</h3><p>{t("directionText")}</p></div><div className="value-item"><Map/><h3>{t("mapTitleShort")}</h3><p>{t("mapText")}</p></div></div></div></section>
 </main>
}
function HeartIcon(){return <span style={{fontSize:14}}>♡</span>}
