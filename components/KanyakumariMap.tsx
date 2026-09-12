"use client";
import { useEffect, useRef } from "react";
import { places } from "@/data/places";
import boundary from "@/data/kanyakumari-boundary.json";
import { getOpenState } from "@/lib/hours";
import type { Language } from "@/lib/i18n";

const tr:Record<Language,Record<string,string>>={
 en:{open:"Open now",closed:"Closed now",unknown:"Hours unavailable",location:"Location",direction:"Directions",details:"Details",add:"Add to My Trip",saved:"Saved",category:"Category"},
 ta:{open:"இப்போது திறந்துள்ளது",closed:"இப்போது மூடப்பட்டுள்ளது",unknown:"நேரம் கிடைக்கவில்லை",location:"இடம்",direction:"வழிகாட்டி",details:"விவரங்கள்",add:"என் பயணத்தில் சேர்",saved:"சேமிக்கப்பட்டது",category:"வகை"},
 hi:{open:"अभी खुला है",closed:"अभी बंद है",unknown:"समय उपलब्ध नहीं",location:"स्थान",direction:"दिशा",details:"विवरण",add:"मेरी यात्रा में जोड़ें",saved:"सहेजा गया",category:"श्रेणी"}
};
const names:Record<string,Record<Language,string>>={
 "vivekananda-rock":{en:"Vivekananda Rock Memorial",ta:"விவேகானந்தர் பாறை நினைவகம்",hi:"विवेकानंद रॉक मेमोरियल"},"thiruvalluvar-statue":{en:"Thiruvalluvar Statue",ta:"திருவள்ளுவர் சிலை",hi:"तिरुवल्लुवर प्रतिमा"},"thirparappu-waterfalls":{en:"Thirparappu Waterfalls",ta:"திற்பரப்பு அருவி",hi:"थिरपरप्पु जलप्रपात"},"padmanabhapuram-palace":{en:"Padmanabhapuram Palace",ta:"பத்மநாபபுரம் அரண்மனை",hi:"पद्मनाभपुरम महल"},"mathoor-aqueduct":{en:"Mathoor Aqueduct",ta:"மாத்தூர் தொட்டிப்பாலம்",hi:"माथूर एक्वाडक्ट"},"vattakottai-fort":{en:"Vattakottai Fort",ta:"வட்டக்கோட்டை கோட்டை",hi:"वट्टकोट्टई किला"},"suchindram-temple":{en:"Thanumalayan Swamy Temple",ta:"தாணுமாலய சுவாமி கோவில்",hi:"थानुमालयन स्वामी मंदिर"},"pechiparai-dam":{en:"Pechiparai Dam",ta:"பேச்சிப்பாறை அணை",hi:"पेचिपाराई बांध"},"kumari-amman-temple":{en:"Kumari Amman Temple",ta:"குமரி அம்மன் கோவில்",hi:"कुमारी अम्मन मंदिर"},"muttom-beach":{en:"Muttom Beach",ta:"முட்டம் கடற்கரை",hi:"मुट्टम बीच"},"sunrise-point":{en:"Sunrise Point",ta:"சூரிய உதயப் புள்ளி",hi:"सूर्योदय स्थल"},"glass-bridge":{en:"Kanyakumari Glass Bridge",ta:"கன்னியாகுமரி கண்ணாடிப் பாலம்",hi:"कन्याकुमारी ग्लास ब्रिज"},"gandhi-mandapam":{en:"Gandhi Mandapam",ta:"காந்தி மண்டபம்",hi:"गांधी मंडपम"},"kamaraj-memorial":{en:"Kamaraj Memorial",ta:"காமராஜர் நினைவகம்",hi:"कामराज स्मारक"},"kovalam-beach-kanyakumari":{en:"Kovalam Beach, Kanniyakumari",ta:"கோவளம் கடற்கரை, கன்னியாகுமரி",hi:"कोवलम बीच, कन्याकुमारी"},"sri-nagaraja-temple":{en:"Sri Nagaraja Temple",ta:"ஸ்ரீ நாகராஜா கோவில்",hi:"श्री नागराजा मंदिर"},"chittar-dam":{en:"Chittar Dam",ta:"சித்தாறு அணை",hi:"चित्तर बांध"},"kalikesam":{en:"Kalikesam",ta:"காளிகேசம்",hi:"कालिकेसम"},"kodayar-twin-falls":{en:"Kodayar Twin Falls",ta:"கோதையாறு இரட்டை அருவி",hi:"कोडैयार ट्विन फॉल्स"}
};
const cats:Record<string,Record<Language,string>>={Beaches:{en:"Beaches",ta:"கடற்கரைகள்",hi:"समुद्र तट"},Temples:{en:"Temples",ta:"கோவில்கள்",hi:"मंदिर"},Waterfalls:{en:"Waterfalls",ta:"அருவிகள்",hi:"झरने"},Dams:{en:"Dams",ta:"அணைகள்",hi:"बांध"},Historical:{en:"Historical",ta:"வரலாறு",hi:"ऐतिहासिक"},Nature:{en:"Nature",ta:"இயற்கை",hi:"प्रकृति"}};

export default function KanyakumariMap({heightClass="leaflet-map"}:{heightClass?:string}){
 const ref=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  let map:any; let alive=true; let lang:Language=(localStorage.getItem("explore-kk-language") as Language)||"en";
  const refresh=()=>{lang=((localStorage.getItem("explore-kk-language") as Language)||"en"); if(map){map.remove();init()}};
  const init=async()=>{
   const L=await import("leaflet"); if(!ref.current||!alive)return;
   map=L.map(ref.current,{zoomControl:true,scrollWheelZoom:true,attributionControl:true});
   L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"© OpenStreetMap contributors",maxZoom:19}).addTo(map);
   const district=L.geoJSON(boundary as any,{style:{color:"#0b7168",weight:2.2,fillColor:"#31b9ad",fillOpacity:.08}}).addTo(map);
   const bounds=district.getBounds(); map.fitBounds(bounds,{padding:[30,30]}); map.setMaxBounds(bounds.pad(.14));
   const text=tr[lang];
   places.forEach(p=>{
    const state=getOpenState(p.openingTime,p.closingTime); const status=state==="open"?text.open:state==="closed"?text.closed:text.unknown;
    const icon=L.divIcon({className:"kk-photo-marker-wrap",html:`<div class="kk-photo-marker"><span class="kk-photo-marker-image"><img src="${p.image}" alt="" onerror="this.onerror=null;this.src='https://commons.wikimedia.org/wiki/Special:Redirect/file/Beautiful%20Sunrise%20view.jpg';"/></span><span class="kk-photo-marker-stem"></span></div>`,iconSize:[44,54],iconAnchor:[22,52],popupAnchor:[0,-48]});
    const title=names[p.id]?.[lang]||p.name; const category=cats[p.category]?.[lang]||p.category;
    const popupHtml=`<div class="map-mini-card"><div class="map-mini-media"><img src="${p.image}" alt="${title}" onerror="this.onerror=null;this.src='https://commons.wikimedia.org/wiki/Special:Redirect/file/Beautiful%20Sunrise%20view.jpg';"/><span class="map-mini-status ${state}">${status}</span><button class="map-mini-heart" data-fav="${p.id}" aria-label="${text.add}">♡</button></div><div class="map-mini-body"><span class="map-mini-category">${category}</span><h3>${title}</h3><p>${p.shortDescription}</p><div class="map-mini-location">📍 ${p.location}</div><div class="map-mini-actions"><a class="map-direction-btn" href="/directions?to=${p.latitude},${p.longitude}&name=${encodeURIComponent(title)}">↗ ${text.direction}</a><a class="map-details-link" href="/places/${p.slug}">${text.details} →</a></div></div></div>`;
    const marker=L.marker([p.latitude,p.longitude],{icon}).addTo(map);
    marker.bindPopup(popupHtml,{maxWidth:292,minWidth:270,closeButton:true,autoPan:true,className:"kk-place-popup",offset:[0,-3]});
   });
   const locate=L.control({position:"topright"});
   locate.onAdd=()=>{const el=L.DomUtil.create("button","leaflet-locate-btn") as HTMLButtonElement;el.type="button";el.title=text.location;el.innerHTML="⌖";L.DomEvent.disableClickPropagation(el);el.onclick=()=>{if(!navigator.geolocation)return;navigator.geolocation.getCurrentPosition(pos=>{const ll:[number,number]=[pos.coords.latitude,pos.coords.longitude];L.circleMarker(ll,{radius:7,color:"#fff",weight:3,fillColor:"#14a99d",fillOpacity:1}).addTo(map).bindTooltip(text.location).openTooltip();map.setView(ll,13)},()=>{},{enableHighAccuracy:true,timeout:10000,maximumAge:30000})};return el};
   locate.addTo(map);
   map.on("popupopen",(e:any)=>{
    const root=e.popup.getElement(); if(!root)return;
    const heart=root.querySelector(".map-mini-heart") as HTMLButtonElement|null;
    if(heart){
      let ids:string[]=[];try{ids=JSON.parse(localStorage.getItem("explore-kk-favorites")||"[]")}catch{}
      const id=heart.dataset.fav||"";
      const sync=()=>{let a:string[]=[];try{a=JSON.parse(localStorage.getItem("explore-kk-favorites")||"[]")}catch{};const saved=a.includes(id);heart.textContent=saved?"♥":"♡";heart.classList.toggle("saved",saved)};
      sync(); heart.onclick=()=>{let a:string[]=[];try{a=JSON.parse(localStorage.getItem("explore-kk-favorites")||"[]")}catch{};a=a.includes(id)?a.filter(x=>x!==id):[...a,id];localStorage.setItem("explore-kk-favorites",JSON.stringify(a));window.dispatchEvent(new CustomEvent("explore-kk-favorites-change"));sync()};
    }
   });
  };
  init(); window.addEventListener("explore-kk-language-change",refresh); return()=>{alive=false;window.removeEventListener("explore-kk-language-change",refresh);if(map)map.remove()};
 },[]);
 return <div ref={ref} className={heightClass}/>;
}
