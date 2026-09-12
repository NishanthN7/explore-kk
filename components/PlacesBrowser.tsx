"use client";
import { useEffect,useMemo,useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { places } from "@/data/places";
import PlaceCard from "./PlaceCard";
import { useLanguage } from "@/lib/i18n";
export default function PlacesBrowser(){
 const {t,categoryName}=useLanguage();
 const sp=useSearchParams();
 const requested=sp.get("category");
 const cats=["All",...Array.from(new Set(places.map(p=>p.category)))];
 const initial=cats.includes(requested||"")?requested!:"All";
 const [q,setQ]=useState("");
 const [cat,setCat]=useState(initial);
 useEffect(()=>{if(cats.includes(requested||""))setCat(requested!); else if(!requested)setCat("All")},[requested]);
 const filtered=useMemo(()=>places.filter(p=>(cat==="All"||p.category===cat)&&(p.name+" "+p.location+" "+p.category).toLowerCase().includes(q.toLowerCase())),[q,cat]);
 return <div className="places-browser">
   <div className="searchbar places-search" style={{maxWidth:900}}><Search/><input value={q} onChange={e=>setQ(e.target.value)} placeholder={t("search")}/></div>
   <div className="chips category-filter">{cats.map(c=><button key={c} className={`chip ${cat===c?"active": ""}`} onClick={()=>setCat(c)}>{c==="All"?t("categoryAll"):categoryName(c)}</button>)}</div>
   <div className="results-row"><p className="muted">{filtered.length} {t("placesFound")}</p>{cat!=="All"&&<button className="clear-filter" onClick={()=>setCat("All")}>{t("showAll")}</button>}</div>
   <div className="grid">{filtered.map(p=><PlaceCard key={p.id} place={p}/>)}</div>
 </div>
}
