import React from 'react'
import '../index.css'
import Logout from '../Settings/logout'
import ThemeChange from '../Settings/themechange'
import {useSelector} from 'react-redux'

function Settings(){
    
    const theme  =  useSelector(state => state.theme);

    return (
        <div className={'settings-' + theme.siteTheme}>

            <div>
                <ThemeChange/>
                <Logout/>
            </div>
            
        </div>
    )
}

export default Settings;