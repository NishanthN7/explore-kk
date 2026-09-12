"use client";
import { useEffect,useState } from "react";
const key=(id:string)=>`kk-reviews-${id}`;
type Review={rating:number,text:string,date:string};
export default function Reviews({placeId}:{placeId:string}){
 const [reviews,setReviews]=useState<Review[]>([]); const [rating,setRating]=useState(5); const [text,setText]=useState("");
 useEffect(()=>{try{setReviews(JSON.parse(localStorage.getItem(key(placeId))||"[]"))}catch{}},[placeId]);
 const add=()=>{if(!text.trim())return;const n=[{rating,text:text.trim(),date:new Date().toLocaleDateString()},...reviews];setReviews(n);localStorage.setItem(key(placeId),JSON.stringify(n));setText("")};
 const avg=reviews.length?reviews.reduce((a,r)=>a+r.rating,0)/reviews.length:null;
 return <section className="section" style={{paddingBottom:0}}><div className="section-head"><div><span className="kicker">PHASE 10</span><h2>Ratings & reviews</h2></div>{avg&&<div><span className="stars">★★★★★</span> {avg.toFixed(1)}</div>}</div><div className="form-card"><div className="field"><label>Your rating</label><select value={rating} onChange={e=>setRating(+e.target.value)}>{[5,4,3,2,1].map(x=><option key={x} value={x}>{x} / 5</option>)}</select></div><div className="field"><label>Your review</label><textarea rows={4} value={text} onChange={e=>setText(e.target.value)} placeholder="What did you like about this place?"/></div><button className="primary" onClick={add}>Submit review</button></div>{reviews.map((r,i)=><div className="review" key={i}><span className="stars">{"★".repeat(r.rating)}{"☆".repeat(5-r.rating)}</span><p>{r.text}</p><small className="muted">{r.date}</small></div>)}</section>
}