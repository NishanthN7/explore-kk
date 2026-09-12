export type OpenState = "open" | "closed" | "unknown";
function parseTime(value:string){
 const m=value.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)$/i);
 if(!m)return null;
 let h=Number(m[1]); const min=Number(m[2]||0); const ap=m[3].toUpperCase();
 if(h===12)h=0; if(ap==="PM")h+=12; return h*60+min;
}
export function getOpenState(opening:string,closing:string,now=new Date()):OpenState{
 const start=parseTime(opening),end=parseTime(closing); if(start===null||end===null)return "unknown";
 const minutes=now.getHours()*60+now.getMinutes();
 if(end>=start)return minutes>=start&&minutes<=end?"open":"closed";
 return minutes>=start||minutes<=end?"open":"closed";
}
