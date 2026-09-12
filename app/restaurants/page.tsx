import Link from "next/link";
import DirectionsButton from "@/components/DirectionsButton";
import SpotImage from "@/components/SpotImage";
import {restaurants} from "@/data/restaurants";
export default function Restaurants(){return <main className="section"><div className="container"><span className="kicker">FOOD & STAYS</span><h1 style={{fontSize:52,margin:"10px 0"}}>Eat around Kanyakumari.</h1><p className="muted">Explore nearby restaurants and see directions directly inside Explore KK.</p><div className="grid" style={{marginTop:28}}>{restaurants.map(r=><article className="card" key={r.id}><SpotImage src={r.image} alt={r.name}/><div className="cardbody"><span className="tag">{r.cuisine}</span><h3>{r.name}</h3><p>{r.location} · {r.price} · ⭐ {r.rating}</p><div className="actions"><DirectionsButton lat={r.lat} lon={r.lng} name={r.name} compact/><Link className="secondary" href="/map">Map</Link></div></div></article>)}</div></div></main>}
