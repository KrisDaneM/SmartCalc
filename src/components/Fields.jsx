export function Field({ field, value, onChange, error }) {
  const id=`field-${field.name}`
  const common={id,name:field.name,value:value??'',onChange:e=>onChange(field.name,e.target.value),'aria-invalid':!!error,'aria-describedby':error?`${id}-error`:undefined,className:'field-control'}
  return <div className="field-wrap">
    <label htmlFor={id}>{field.label}</label>
    {field.type==='select'?<select {...common}>{field.options.map(([v,l])=><option key={v} value={v}>{l}</option>)}</select>:<input {...common} type={field.type} min={field.min} max={field.max} step={field.step} maxLength={field.maxLength} placeholder={field.placeholder} inputMode={field.type==='number'?'decimal':undefined}/>} 
    {error&&<p id={`${id}-error`} className="field-error">{error}</p>}
  </div>
}
