"use client";
import {useEffect,useRef,useState} from "react";
import {Navigation, MapPin, LocateFixed, Clock3, Route as RouteIcon} from "lucide-react";
import {useSearchParams} from "next/navigation";
import {useLanguage} from "@/lib/i18n";

export default function LiveDirections(){
 const params=useSearchParams();
 const toParam=params.get("to")||"";
 const name=params.get("name")||"Selected destination";
 const [loading,setLoading]=useState(false); const [locating,setLocating]=useState(false);
 const [error,setError]=useState(""); const [route,setRoute]=useState<any>(null); const [location,setLocation]=useState<{lat:number;lon:number}|null>(null);
 const mapRef=useRef<HTMLDivElement>(null); const mapObj=useRef<any>(null);
 const {t}=useLanguage();
 const [lat,lon]=toParam.split(",").map(Number);
 const valid=Number.isFinite(lat)&&Number.isFinite(lon);
 const calculateForLocation=async(loc:{lat:number;lon:number})=>{
   if(!valid)return;
   setLoading(true);setError("");
   try{
     const r=await fetch(`/api/route?from=${loc.lon},${loc.lat}&to=${lon},${lat}&steps=true`);
     const data=await r.json(); if(!r.ok)throw new Error(data.error||"Could not find a road route."); setRoute(data);
   }catch(e:any){setError(e.message||"Could not find a route.")}finally{setLoading(false)}
 };
 const getLocation=()=>{
   setError("");
   if(!navigator.geolocation){setError("Live location is not supported by this browser.");return;}
   setLocating(true);
   navigator.geolocation.getCurrentPosition(p=>{const loc={lat:p.coords.latitude,lon:p.coords.longitude};setLocation(loc);setLocating(false);calculateForLocation(loc)},()=>{setError("Location permission was denied. Please allow location access and try again.");setLocating(false)},{enableHighAccuracy:true,timeout:15000,maximumAge:30000});
 };
 const calculate=async()=>{if(location)await calculateForLocation(location)};
 useEffect(()=>{if(valid)getLocation()},[valid]);
 useEffect(()=>{
   let alive=true;
   (async()=>{
    if(!mapRef.current||!route?.geometry||!location||!valid)return;
    const L=await import("leaflet"); if(!alive)return;
    if(mapObj.current){mapObj.current.remove();mapObj.current=null}
    const map=L.map(mapRef.current,{zoomControl:true,scrollWheelZoom:true});
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"© OpenStreetMap contributors",maxZoom:19}).addTo(map);
    const start=L.circleMarker([location.lat,location.lon],{radius:9,color:"#fff",weight:3,fillColor:"#188d83",fillOpacity:1}).addTo(map).bindTooltip("Your live location").openTooltip();
    const end=L.circleMarker([lat,lon],{radius:9,color:"#fff",weight:3,fillColor:"#d85b52",fillOpacity:1}).addTo(map).bindTooltip(name);
    const line=L.geoJSON({type:"Feature",properties:{},geometry:route.geometry} as any,{style:{color:"#0f8f84",weight:6,opacity:.9}}).addTo(map);
    map.fitBounds(line.getBounds(),{padding:[35,35]}); mapObj.current=map;
   })();
   return()=>{alive=false;if(mapObj.current){mapObj.current.remove();mapObj.current=null}};
 },[route,location,valid,lat,lon,name]);
 if(!valid)return <div className="form-card"><h3>Choose a destination</h3><p className="muted">Open Directions from a tourist spot card or map marker.</p></div>;
 return <div className="directions-page-grid">
   <section>
    <div className="direction-destination"><div className="direction-icon"><Navigation size={20}/></div><div><span className="kicker">LIVE ROUTE</span><h2>{name}</h2><p className="muted">Your current location → {name}</p></div></div>
    <div className="route-map-wrap"><div ref={mapRef} className="directions-map"/>{!route&&<div className="route-map-overlay"><LocateFixed size={28}/><b>Get your live location to see the route</b><span>Allow location access, then calculate the road route.</span></div>}</div>
    {route&&<div className="route-result-grid"><div><RouteIcon size={18}/><b>{route.distanceKm.toFixed(1)} km</b><span>Road distance</span></div><div><Clock3 size={18}/><b>{Math.round(route.durationMin)} min</b><span>Estimated driving time</span></div></div>}
    {route?.steps?.length>0&&<div className="steps-card"><div className="section-head"><div><span className="kicker">TURN BY TURN</span><h3>Directions</h3></div></div>{route.steps.map((s:any,i:number)=><div className="direction-step" key={i}><div className="step-number">{i+1}</div><div><b>{s.instruction}</b><span>{s.distanceM>=1000?(s.distanceM/1000).toFixed(1)+" km":Math.round(s.distanceM)+" m"}</span></div></div>)}</div>}
   </section>
   <aside className="form-card direction-side"><h3>Route to this spot</h3><div className="direction-end"><MapPin size={17}/><span>{name}</span></div><button className="location-btn" onClick={getLocation}>{locating?t("findingLocation"):location?`✓ ${t("liveLocation")}`:`⌖ ${t("useLive")}`}</button>{error&&<p className="error-text">{error}</p>}<button className="primary full-btn" onClick={calculate} disabled={!location||loading}>{loading?"Finding road route…":"Show route here"}</button><p className="muted direction-note">No Google Maps is opened. The route, distance, travel time and turn-by-turn directions are shown inside Explore KK.</p></aside>
 </div>
}
