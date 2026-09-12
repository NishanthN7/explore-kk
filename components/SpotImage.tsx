"use client";
import {useState} from "react";
const FALLBACK="https://upload.wikimedia.org/wikipedia/commons/4/44/Beautiful_Sunrise_view.jpg";
export default function SpotImage({src,alt,className}:{src:string;alt:string;className?:string}){
 const [current,setCurrent]=useState(src);
 return <img className={className} src={current} alt={alt} loading="lazy" decoding="async" onError={()=>{if(current!==FALLBACK)setCurrent(FALLBACK)}}/>;
}
