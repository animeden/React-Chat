import React, {useState} from 'react'
import Item from './barItem'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import {Link} from 'react-router-dom'
import '../index.css'

let styles = {
    ul: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
        width:'100%',
        height: '100vh'
    },

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

    const [open, setstate] = useState(false);

    const showMenu = () => setstate(!open);

    return(
        <>
        <div style={styles.div}>
        
            <Link to="#">

                <FaIcons.FaBars onClick={showMenu}  className='img'/>

            </Link>
        
        </div>

        <nav className={open ? 'nav-menu active' : 'nav-menu'} >
            
            <ul style={styles.ul}>
                <li>
                    <Link to="#">

                        <AiIcons.AiOutlineClose onClick={showMenu} className='img'/>

                    </Link>
                </li>

                { props.items.map(item =>{
                    return <Item item={item}/>
                }) }

            </ul>
                
        </nav>
        </>
    );
}
