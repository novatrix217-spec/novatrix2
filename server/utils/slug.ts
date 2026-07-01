export function slugifyFr(value:string){
  return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,90)||`contenu-${Date.now()}`
}
export function readingTime(value:string){return Math.max(1,Math.ceil(value.replace(/<[^>]+>/g,' ').split(/\s+/).filter(Boolean).length/220))}
