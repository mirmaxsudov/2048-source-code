import React from 'react'
import Nav from '../components/nav/Nav'
import Header from '../components/header/Header'

const HomePage = ({ handleChangeLanguage }) => {
    return (
        <div className='bg-[#fff4eb] h-screen'>
            <Nav handleChangeLanguage={handleChangeLanguage} />
            <Header />
        </div>
    )
}

export default HomePage