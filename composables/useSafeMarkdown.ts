export function useSafeMarkdown(source:string){
  const escaped=source.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
  return escaped.split('\n').map(line=>{
    if(line.startsWith('### '))return `<h3>${line.slice(4)}</h3>`
    if(line.startsWith('## '))return `<h2>${line.slice(3)}</h2>`
    if(line.startsWith('# '))return `<h2>${line.slice(2)}</h2>`
    if(line.startsWith('- '))return `<li>${line.slice(2)}</li>`
    return line.trim()?`<p>${line.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')}</p>`:''
  }).join('')
}
