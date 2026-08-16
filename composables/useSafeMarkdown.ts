export function useSafeMarkdown(source:string){
  const escaped=source.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
  const inline=(text:string)=>text.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/\*(.+?)\*/g,'<em>$1</em>')
  const lines=escaped.split('\n')
  const out:string[]=[]
  let inList=false
  const closeList=()=>{if(inList){out.push('</ul>');inList=false}}
  for(const line of lines){
    if(line.startsWith('- ')){if(!inList){out.push('<ul>');inList=true}out.push(`<li>${inline(line.slice(2))}</li>`);continue}
    closeList()
    if(line.startsWith('### ')){out.push(`<h3>${inline(line.slice(4))}</h3>`);continue}
    if(line.startsWith('## ')){out.push(`<h2>${inline(line.slice(3))}</h2>`);continue}
    if(line.startsWith('# ')){out.push(`<h2>${inline(line.slice(2))}</h2>`);continue}
    out.push(line.trim()?`<p>${inline(line)}</p>`:'')
  }
  closeList()
  return out.join('')
}
