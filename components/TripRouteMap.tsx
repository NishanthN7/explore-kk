"use client";
import { useEffect,useRef } from "react";
import { places } from "@/data/places";

export default function TripRouteMap({route,location}:{route:any;location:{lat:number;lon:number}}){
 const ref=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  let map:any;let alive=true;
  (async()=>{
   const L=await import("leaflet"); if(!ref.current||!alive)return;
   map=L.map(ref.current,{zoomControl:true,scrollWheelZoom:true});
   L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"© OpenStreetMap contributors"}).addTo(map);
   const bounds:any[]=[];
   const start=L.marker([location.lat,location.lon],{icon:L.divIcon({className:"trip-start-pin",html:"<span>⌖</span>",iconSize:[34,34],iconAnchor:[17,17]})}).addTo(map).bindTooltip("Your live location");
   bounds.push([location.lat,location.lon]);
   route.orderedPlaces.forEach((p:any,i:number)=>{
     L.marker([p.latitude,p.longitude],{icon:L.divIcon({className:"trip-order-pin",html:`<span>${i+1}</span>`,iconSize:[28,28],iconAnchor:[14,14]})}).addTo(map).bindTooltip(`${i+1}. ${p.name}`);
     bounds.push([p.latitude,p.longitude]);
   });
   if(route.geometry?.coordinates?.length){
     const line=L.geoJSON({type:"Feature",properties:{},geometry:route.geometry} as any,{style:{color:"#35cfc0",weight:5,opacity:.9}}).addTo(map);
     map.fitBounds(line.getBounds(),{padding:[25,25]});
   }else map.fitBounds(bounds,{padding:[25,25]});
  })().catch(console.error);
  return()=>{alive=false;if(map)map.remove()};
 },[route,location.lat,location.lon]);
 return <div className="trip-route-map" ref={ref}/>;
}
