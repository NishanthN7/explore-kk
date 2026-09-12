import { NextRequest, NextResponse } from "next/server";

function distance(a:number[],b:number[],matrix:number[][]){return matrix[a[0]][b[0]]}

export async function POST(req:NextRequest){
 try{
  const body=await req.json();
  const start=body?.start;
  const destinations=Array.isArray(body?.destinations)?body.destinations:[];
  if(!Array.isArray(start)||start.length!==2||destinations.length===0) return NextResponse.json({error:"Live location and at least one destination are required."},{status:400});
  if(destinations.length>19) return NextResponse.json({error:"Too many destinations."},{status:400});
  const points=[start,...destinations.map((p:any)=>[Number(p.longitude),Number(p.latitude)])];
  const coordString=points.map((p:number[])=>`${p[0]},${p[1]}`).join(";");
  const tableRes=await fetch(`https://router.project-osrm.org/table/v1/driving/${coordString}?annotations=distance,duration`,{cache:"no-store"});
  if(!tableRes.ok) return NextResponse.json({error:"Routing service unavailable."},{status:502});
  const table=await tableRes.json();
  const matrix:number[][]=table.distances;
  const durations:number[][]=table.durations;
  const n=points.length;
  const unvisited=new Set<number>();
  for(let i=1;i<n;i++)unvisited.add(i);
  const order=[0];
  while(unvisited.size){
   const current=order[order.length-1];
   let best=-1,bestDist=Infinity;
   for(const j of unvisited){ if(matrix[current][j]<bestDist){bestDist=matrix[current][j];best=j;} }
   order.push(best); unvisited.delete(best);
  }
  const routeCost=(o:number[])=>o.slice(0,-1).reduce((s,v,i)=>s+(matrix[v][o[i+1]]||Infinity),0);
  let improved=true;
  while(improved){
   improved=false;
   for(let i=1;i<order.length-2;i++){
    for(let j=i+1;j<order.length-1;j++){
      const next=[...order.slice(0,i),...order.slice(i,j+1).reverse(),...order.slice(j+1)];
      if(routeCost(next)+1 < routeCost(order)){order.splice(0,order.length,...next);improved=true;}
    }
   }
  }
  const legs=order.slice(0,-1).map((fromIndex,i)=>{
    const toIndex=order[i+1];
    return {
      from:i===0?{name:"Live location",latitude:start[1],longitude:start[0]}:destinations[fromIndex-1],
      to:destinations[toIndex-1],
      distanceKm:(matrix[fromIndex][toIndex]||0)/1000,
      durationMin:(durations[fromIndex][toIndex]||0)/60
    };
  });
  const orderedPlaces=order.slice(1).map(i=>destinations[i-1]);
  const routeRes=await fetch(`https://router.project-osrm.org/route/v1/driving/${order.map(i=>`${points[i][0]},${points[i][1]}`).join(";")}?overview=full&geometries=geojson&steps=false`,{cache:"no-store"});
  let geometry=null;
  if(routeRes.ok){const data=await routeRes.json();geometry=data.routes?.[0]?.geometry||null;}
  return NextResponse.json({orderedPlaces,legs,totalDistanceKm:legs.reduce((s,l)=>s+l.distanceKm,0),totalDurationMin:legs.reduce((s,l)=>s+l.durationMin,0),geometry});
 }catch{return NextResponse.json({error:"Could not calculate the trip route."},{status:500});}
}
