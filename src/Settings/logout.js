import React from 'react'
import '../index.css'
import {useDispatch} from 'react-redux'
import {setLogin} from "../redux/actions/index";

function Logout(){

    
    const dispatch = useDispatch();

    function accountExit(){
        dispatch(setLogin({name: '', id: '', token: ''}));
    }

    return (
        <div className='logoutbox'>
            <div className='logout'>
                <button onClick={accountExit}>Log out</button>
            </div>
        </div>
    )
}

export default Logout;