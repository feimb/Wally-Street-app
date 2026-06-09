import React from 'react'
import { HeaderComponent } from '../components/HeaderComponent'

export const MainLayout = ({child}) => {
  return (
    <header className='py-6 px-12 bg-neutral grid-cols-6 '>
        <HeaderComponent />
        

    </header>
  )
}
