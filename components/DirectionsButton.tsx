"use client";
import { useRouter } from "next/navigation";
import { Navigation } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export default function DirectionsButton({lat,lon,name,compact=false}:{lat:number;lon:number;name?:string;compact?:boolean}){
 const router=useRouter();
 const {t}=useLanguage();
 return <button type="button" className={`direction-card-btn ${compact?"compact":""}`} onClick={e=>{e.preventDefault();e.stopPropagation();router.push(`/directions?to=${lat},${lon}&name=${encodeURIComponent(name||"")}`)}}>
   <Navigation size={compact?14:15}/>{t("directions")}
 </button>;
}
