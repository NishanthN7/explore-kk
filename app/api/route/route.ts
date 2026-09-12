import { NextRequest, NextResponse } from "next/server";

function instruction(step:any){
 const m=step?.maneuver||{}; const type=m.type||"continue"; const mod=m.modifier||"";
 if(type==="depart") return "Start your journey";
 if(type==="arrive") return "You have arrived at your destination";
 const words:Record<string,string>={left:"Turn left",right:"Turn right",slight_left:"Keep slightly left",slight_right:"Keep slightly right",straight:"Continue straight",uturn:"Make a U-turn"};
 return words[mod]||({roundabout:"Enter the roundabout",merge:"Merge onto the road",fork:"Take the fork"}[type]||"Continue on the road");
}

export async function GET(req:NextRequest){
 const a=req.nextUrl.searchParams.get("from"), b=req.nextUrl.searchParams.get("to"), wantSteps=req.nextUrl.searchParams.get("steps")==="true";
 if(!a||!b)return NextResponse.json({error:"from and to are required"},{status:400});
 const url=`https://router.project-osrm.org/route/v1/driving/${a};${b}?overview=full&geometries=geojson&steps=${wantSteps?"true":"false"}`;
 const res=await fetch(url,{cache:"no-store"}); if(!res.ok)return NextResponse.json({error:"Routing service unavailable"},{status:502});
 const data=await res.json(); const r=data.routes?.[0]; if(!r)return NextResponse.json({error:"No road route found"},{status:404});
 const steps=(r.legs||[]).flatMap((leg:any)=>leg.steps||[]).map((s:any)=>({instruction:instruction(s),distanceM:s.distance||0})).filter((s:any)=>s.distanceM>0);
 return NextResponse.json({distanceKm:r.distance/1000,durationMin:r.duration/60,geometry:r.geometry,steps});
}
