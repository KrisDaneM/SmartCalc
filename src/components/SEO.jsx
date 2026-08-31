import { useEffect } from 'react'

export default function SEO({ title, description, path = '/' }) {
  useEffect(() => {
    document.title = title
    const set = (selector, attr, value) => { let el=document.head.querySelector(selector); if(!el){el=document.createElement('meta'); const [key,val]=selector.match(/\[(.+?)="(.+?)"\]/).slice(1);el.setAttribute(key,val);document.head.appendChild(el)} el.setAttribute(attr,value) }
    set('meta[name="description"]','content',description)
    set('meta[property="og:title"]','content',title)
    set('meta[property="og:description"]','content',description)
    set('meta[property="og:type"]','content','website')
    let canonical=document.head.querySelector('link[rel="canonical"]');if(!canonical){canonical=document.createElement('link');canonical.rel='canonical';document.head.appendChild(canonical)}
    canonical.href=new URL(path,window.location.origin).href
  }, [title, description, path])
  return null
}
