"use client";
import { useSearchParams } from "next/navigation";
import { useEffect,useState } from "react";
import PlacesBrowser from "@/components/PlacesBrowser";
export default function PlacesPage(){const sp=useSearchParams(); const [key,setKey]=useState(0); useEffect(()=>setKey(Date.now()),[sp]); return <main className="section"><div className="container"><span className="kicker">EXPLORE KANYAKUMARI</span><h1 style={{fontSize:52,margin:"10px 0"}}>Places worth discovering.</h1><p className="muted">Explore attractions across Kanyakumari district.</p><PlacesBrowser key={key}/></div></main>}
