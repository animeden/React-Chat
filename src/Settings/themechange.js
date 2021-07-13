import React from 'react'
import '../index.css'
import {useSelector, useDispatch} from 'react-redux'
import {setSiteTheme} from "../redux/actions/index";

function Themechange(){

    const theme  =  useSelector(state => state.theme);

    const dispatch = useDispatch();

    function ChangetoDark(){
        dispatch(setSiteTheme('dark'));
        Log();
    }

    function ChangetoLight(){
        dispatch(setSiteTheme('light'));
        Log();
    }

    function Log(){
        let ls = localStorage.getItem('site_theme');
        console.log(ls);
    }

    return (
        <div className='themechange'>
            <div className={'darktheme-' + theme.siteTheme}><button onClick={ChangetoDark}>Change to<br/>Dark Them</button></div>
            <div className={'lighttheme-' + theme.siteTheme}><button onClick={ChangetoLight}>Change to<br/>Light Them</button></div>
        </div>
    )

}

export default Themechange;