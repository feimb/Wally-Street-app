import React from 'react'
import { HeaderComponent } from '../components/HeaderComponent'

export const MainLayout = ({child}) => {
  return (
    <header className='p-5 bg-neutral'>
        <HeaderComponent /> 

    </header>
  )
}
