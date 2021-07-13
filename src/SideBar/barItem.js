import React from 'react'
import { Link } from 'react-router-dom'
import '../index.css'
import {useSelector} from 'react-redux'

export default function Item({item}){
    const theme  =  useSelector(state => state.theme);
    
    return(
            <li className={'list-' + theme.siteTheme}><Link to={item.path}>{item.icon}  <span>{item.title}</span></Link></li>
    );
}
