import React from 'react'
import '../index.css'
import {useSelector} from 'react-redux'

function Home(){

    const theme  =  useSelector(state => state.theme);

    return (
        <div className={'home-' + theme.siteTheme}>
            <h1 className='h'>Welcome</h1>
        </div>
    )
}

export default Home;