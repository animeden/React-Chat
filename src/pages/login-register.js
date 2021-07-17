import React, {useState} from 'react'
import '../index.css'
import {useSelector} from 'react-redux'
import Login from '../Log-Reg/loginForm'
import Register from '../Log-Reg/registerForm'

function Logreg(){

    const [logReg, setstate] = useState(false);

    const [text, setState] = useState('Register');

    const [message, setStat] = useState('You didnt have account?');

    function lgrg(){

        setstate(!logReg);

        if(logReg){
            setState('Register');
            setStat('You didnt have account?');
        }
        if(!logReg){
            setState('Log in');
            setStat('You alredy have account?');
        }
    }

    const theme  =  useSelector(state => state.theme);

    return (
        <div className={'logreg-' + theme.siteTheme}>
            <div>
                <div className={logReg ? 'login-disable' : 'login-able'}><Login/></div>
                <div className={logReg ? 'register-able' : 'register-disable'}><Register/></div>
                <div className='logregButton'><h>{message}</h><button onClick={lgrg}>{text}</button></div>
            </div>
        </div>
    )
}

export default Logreg;