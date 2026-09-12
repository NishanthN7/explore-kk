"use client";
import Link from "next/link";
import type { Place } from "@/data/places";
import AddToTrip from "./AddToTrip";
import DirectionsButton from "./DirectionsButton";
import { getOpenState } from "@/lib/hours";
import { useLanguage } from "@/lib/i18n";
import SpotImage from "./SpotImage";

export default function PlaceCard({place}:{place:Place}){
 const {t,placeName,categoryName}=useLanguage();
 const state=getOpenState(place.openingTime,place.closingTime);
 const status=state==="open"?t("openNow"):state==="closed"?t("closedNow"):t("hoursUnavailable");
 return <article className="place-card">
   <div className="place-card-media">
     <Link href={`/places/${place.slug}`} className="place-card-image-link"><SpotImage src={place.image} alt={placeName(place.id,place.name)}/></Link>
     <span className={`hours-badge ${state}`}>{status}</span>
     <AddToTrip id={place.id} compact/>
   </div>
   <div className="place-card-body">
     <div className="place-card-title-row"><Link href={`/places/${place.slug}`}><h3>{placeName(place.id,place.name)}</h3></Link><span className="rating-placeholder">★ {t("ratingUnavailable")}</span></div>
     <span className="tag">{categoryName(place.category)}</span>
     <p>{place.shortDescription}</p>
     <span className="place-location">📍 {place.location}</span>
     <div className="place-card-actions">
       <DirectionsButton lat={place.latitude} lon={place.longitude} name={placeName(place.id,place.name)} compact/>
       <Link className="card-details-btn" href={`/places/${place.slug}`}>{t("details")}</Link>
     </div>
   </div>
 </article>
}
