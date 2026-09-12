"use client";
import { useEffect,useMemo,useState } from "react";
import { places } from "@/data/places";
import TripRouteMap from "@/components/TripRouteMap";
import Link from "next/link";
import SpotImage from "@/components/SpotImage";
import { useLanguage } from "@/lib/i18n";
const KEY="explore-kk-favorites";
export function getFavs(){if(typeof window==="undefined")return [];try{return JSON.parse(localStorage.getItem(KEY)||"[]")}catch{return[]}}

type Location={lat:number;lon:number};
type RouteResult={orderedPlaces:any[];legs:any[];totalDistanceKm:number;totalDurationMin:number;geometry:any};

export default function TripClient(){
 const [ids,setIds]=useState<string[]>([]);
 const [days,setDays]=useState(2);
 const [budget,setBudget]=useState(1500);
 const [location,setLocation]=useState<Location|null>(null);
 const [locating,setLocating]=useState(false);
 const [route,setRoute]=useState<RouteResult|null>(null);
 const [routing,setRouting]=useState(false);
 const [error,setError]=useState("");
 const {t,placeName,categoryName}=useLanguage();
 useEffect(()=>{setIds(getFavs());const sync=()=>setIds(getFavs());window.addEventListener("explore-kk-favorites-change",sync);return()=>window.removeEventListener("explore-kk-favorites-change",sync)},[]);
 const selected=useMemo(()=>places.filter(p=>ids.includes(p.id)),[ids]);
 const remove=(id:string)=>{const n=ids.filter(x=>x!==id);setIds(n);localStorage.setItem(KEY,JSON.stringify(n));setRoute(null)};
 const estimated=selected.length?budget+selected.length*100:budget;
 const getLocation=()=>{
  setError("");
  if(!navigator.geolocation){setError("Your browser does not support live location.");return;}
  setLocating(true);
  navigator.geolocation.getCurrentPosition(p=>{setLocation({lat:p.coords.latitude,lon:p.coords.longitude});setLocating(false)},()=>{setError("Location permission was denied. Allow location access and try again.");setLocating(false)},{enableHighAccuracy:true,timeout:15000,maximumAge:30000});
 };
 const buildRoute=async()=>{
  if(!selected.length)return;
  setError("");
  if(!location){getLocation();return;}
  setRouting(true);
  try{
   const res=await fetch("/api/optimize",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({start:[location.lon,location.lat],destinations:selected})});
   const data=await res.json();
   if(!res.ok)throw new Error(data.error||"Could not calculate route");
   setRoute(data);
  }catch(e:any){setError(e.message||"Could not calculate route.")}finally{setRouting(false)}
 };
 const openFullRoute=()=>{document.getElementById("trip-route-map")?.scrollIntoView({behavior:"smooth",block:"center"})};
 return <div className="trip-layout">
  <section>
   <div className="section-head"><div><span className="kicker">{t("savedToTrip")}</span><h2>{t("trip")}</h2></div><span className="muted">{selected.length} {t("saved")}</span></div>
   {selected.length?<div className="trip-list">{selected.map(p=><div className="trip-item" key={p.id}><SpotImage src={p.image} alt={placeName(p.id,p.name)}/><div style={{flex:1}}><b>{placeName(p.id,p.name)}</b><div className="muted">{categoryName(p.category)} · {p.location}</div><Link className="trip-leg-link" href={`/directions?to=${p.latitude},${p.longitude}&name=${encodeURIComponent(placeName(p.id,p.name))}`}>↗ {t("directionsLive")}</Link></div><button className="secondary" onClick={()=>remove(p.id)}>{t("remove")}</button></div>)}</div>:<div className="empty">{t("noSaved")}</div>}
   {route&&<div className="route-panel">
    <div className="route-header"><div><span className="kicker">{t("routeTitle")}</span><h3>{t("routeTitle")}</h3></div><button className="primary" onClick={openFullRoute}>{t("viewRoute")||"View route here"}</button></div>
    <div id="trip-route-map"><TripRouteMap route={route} location={location}/></div><div className="route-summary"><div><b>{route.totalDistanceKm.toFixed(1)} km</b><span>{t("totalDistance")}</span></div><div><b>{Math.round(route.totalDurationMin)} min</b><span>{t("drivingTime")}</span></div><div><b>{route.orderedPlaces.length}</b><span>{t("stops")}</span></div></div>
    <div className="route-legs">{route.legs.map((leg,i)=><div className="route-leg" key={leg.to.id}><div className="route-number">{i+1}</div><div><b>{placeName(leg.to.id,leg.to.name)}</b><span>{i===0?t("liveLocation"):t("places")} · {leg.distanceKm.toFixed(1)} km · {Math.round(leg.durationMin)} min</span></div></div>)}</div>
   </div>}
  </section>
  <aside className="form-card"><h3>{t("planTrip")}</h3><p className="muted">{t("routeTitle")}. {t("directionsLive")}.</p><button className="location-btn" onClick={getLocation}>{locating?t("findingLocation"):location?`✓ ${t("liveLocation")}: ${location.lat.toFixed(4)}, ${location.lon.toFixed(4)}`:`⌖ ${t("useLive")}`}</button>{error&&<p className="error-text">{error}</p>}<button className="primary full-btn" onClick={buildRoute} disabled={!selected.length||routing}>{routing?t("optimizing"):location?t("calculateRoute"):t("calculateRoute")}</button><div className="field"><label>{t("days")}</label><select value={days} onChange={e=>setDays(+e.target.value)}>{[1,2,3,4,5,6,7].map(x=><option key={x}>{x}</option>)}</select></div><div className="field"><label>{t("budget")}</label><input type="number" value={budget} onChange={e=>setBudget(+e.target.value)}/></div><div className="notice"><div className="stat">₹{estimated.toLocaleString()}</div>{t("estimatedSpend")}</div><hr style={{borderColor:"var(--line)",borderWidth:0,borderTopWidth:1,margin:"20px 0"}}/><b>{t("suggested")}</b>{selected.length?selected.slice(0,days*3).map((p,i)=><p key={p.id} className="muted">{t("day")} {Math.floor(i/3)+1} · {placeName(p.id,p.name)}</p>):<p className="muted">{t("noSaved")}</p>}</aside>
 </div>
}