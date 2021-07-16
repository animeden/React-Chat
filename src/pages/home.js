import React from 'react'
import '../index.css'
import {useSelector} from 'react-redux'

function Home(){

    const theme  =  useSelector(state => state.theme);

    const userName  =  useSelector(state => state.login.stateUserName);

    return (
        <div className={'home-' + theme.siteTheme}>
            <div className='homeText'>
                <h1 className='h'>Welcome</h1>
                <h1 className='h2'>{userName}</h1>
            </div>
        </div>
    )
}

export default Home;