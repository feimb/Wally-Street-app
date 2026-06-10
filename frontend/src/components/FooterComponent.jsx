import React from 'react'

export const FooterComponent = () => {
    const elements = ["2026", "Fei Mosqueda", "Leonardo Fernandez"];
  return (
        <ul className='flex gap-8'>
            {elements.map((item)=>{
                return <li className='list-disc'>{item}</li>
            })}
        </ul>
  )
}
