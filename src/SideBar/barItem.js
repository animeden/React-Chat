import React from 'react'
import { Link } from 'react-router-dom'
import '../index.css'

export default function Item({item}){
    return(
            <li className='list'><Link to={item.path}>{item.icon}  <span >{item.title}</span></Link></li>
    );
}
