"use client";
import { useEffect,useState } from "react";
import { Heart } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
export default function AddToTrip({id,compact=false}:{id:string;compact?:boolean}){
 const [saved,setSaved]=useState(false); const {t}=useLanguage();
 useEffect(()=>{try{setSaved(JSON.parse(localStorage.getItem("explore-kk-favorites")||"[]").includes(id))}catch{}},[id]);
 useEffect(()=>{const sync=()=>{try{setSaved(JSON.parse(localStorage.getItem("explore-kk-favorites")||"[]").includes(id))}catch{}};window.addEventListener("explore-kk-favorites-change",sync);return()=>window.removeEventListener("explore-kk-favorites-change",sync)},[id]);
 const toggle=(e:React.MouseEvent)=>{e.preventDefault();e.stopPropagation();let ids:string[]=[];try{ids=JSON.parse(localStorage.getItem("explore-kk-favorites")||"[]")}catch{};const n=ids.includes(id)?ids.filter(x=>x!==id):[...ids,id];localStorage.setItem("explore-kk-favorites",JSON.stringify(n));setSaved(n.includes(id));window.dispatchEvent(new CustomEvent("explore-kk-favorites-change"));};
 if(compact)return <button aria-label={saved?t("savedToTrip"):t("addToTrip")} title={saved?t("savedToTrip"):t("addToTrip")} className={`heart-btn ${saved?"saved":""}`} onClick={toggle}><Heart size={19} fill={saved?"currentColor":"none"}/></button>;
 return <button className="secondary trip-add-btn" onClick={toggle}><Heart size={17} fill={saved?"currentColor":"none"}/>{saved?t("savedToTrip"):t("addToTrip")}</button>
}
