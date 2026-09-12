import Link from "next/link";
import { notFound } from "next/navigation";
import { places } from "@/data/places";
import Reviews from "@/components/Reviews";
import AddToTrip from "@/components/AddToTrip";
import DirectionsButton from "@/components/DirectionsButton";
import SpotImage from "@/components/SpotImage";
export function generateStaticParams(){return places.map(p=>({slug:p.slug}))}
export default async function PlacePage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params; const p=places.find(x=>x.slug===slug); if(!p)notFound();
 return <main className="place-page"><div className="container"><Link className="muted" href="/places">← Back to places</Link><div className="detail" style={{marginTop:20}}><SpotImage className="detail-img" src={p.image} alt={p.name}/><div className="detail-panel"><span className="tag">{p.category}</span><h1>{p.name}</h1><p className="muted">{p.description}</p><div className="meta-grid"><div className="meta-box"><small>📍 Location</small>{p.location}</div><div className="meta-box"><small>☀️ Best season</small>{p.bestSeason}</div><div className="meta-box"><small>🕐 Timings</small>{p.openingTime} – {p.closingTime}</div><div className="meta-box"><small>💰 Entry</small>{p.entryFee}</div><div className="meta-box"><small>⏱ Visit</small>{p.visitDuration}</div><div className="meta-box"><small>✨ Specialty</small>{p.specialty}</div></div><div className="actions"><Link className="primary" href={`/map?place=${p.id}`}>View on map</Link><DirectionsButton lat={p.latitude} lon={p.longitude} name={p.name}/><AddToTrip id={p.id}/></div><p className="muted" style={{fontSize:11,marginTop:20}}>Coordinates: {p.latitude}, {p.longitude} · Image source: {p.source}</p></div></div><Reviews placeId={p.id}/></div></main>
}