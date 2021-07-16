import React, {useState} from 'react'
import '../index.css'
import {useSelector} from 'react-redux'
import Login from '../Log-Reg/loginForm'
import Register from '../Log-Reg/registerForm'

function Logreg(){

    const [logReg, setstate] = useState(false);

    const [text, setState] = useState('Log in');

    const [message, setStat] = useState('You alredy have account?');

    function lgrg(){

        setstate(!logReg);

        if(!logReg){
            setState('Register');
            setStat('You didnt have account?');
        }
        if(logReg){
            setState('Log in');
            setStat('You alredy have account?');
        }
    }

    const theme  =  useSelector(state => state.theme);

    return (
        <div className={'logreg-' + theme.siteTheme}>
            <div>
                <div className={logReg ? 'login-able' : 'login-disable'}><Login/></div>
                <div className={logReg ? 'register-disable' : 'register-able'}><Register/></div>
                <div className='logregButton'><h>{message}</h><button onClick={lgrg}>{text}</button></div>
            </div>
        </div>
    )
}

export default Logreg;