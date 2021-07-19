import React, {useState} from 'react'
import Item from './barItem'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import {Link} from 'react-router-dom'
import '../index.css'
import {useSelector} from 'react-redux'

let styles = {

    div:{
        margin: 0,
        padding: 0,
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'start',
        top: '100',
        position: 'fixed'
    }
}

export default function Side(props){

    const theme  =  useSelector(state => state.theme);

    const [open, setstate] = useState(false);

    const showMenu = () => setstate(!open);

    return(
        <>
        <div style={styles.div}>
        
            <Link to="#">

                <FaIcons.FaBars onClick={showMenu}  className={'img-' + theme.siteTheme}/>

            </Link>
        
        </div>

        <nav className={open ? 'nav-active-' + theme.siteTheme : 'nav-menu'} >
            
            <ul className='ul'>
                <li>
                    <Link to="#">

                        <AiIcons.AiOutlineClose onClick={showMenu} className={'img-' + theme.siteTheme}/>

                    </Link>
                </li>

                { props.items.map(item =>{
                    return <div onClick={showMenu}><Item item={item}/></div>
                }) }

            </ul>
                
        </nav>
        </>
    );
}
