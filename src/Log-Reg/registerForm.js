import React, {useState} from 'react'
import '../index.css'
import stringify from 'qs-stringify'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {setLogin} from "../redux/actions/index";
import {useSelector} from 'react-redux'
import { Redirect } from 'react-router-dom'

function RegisterForm(){
    
    const dispatch = useDispatch();

    const [userName, setStateUserName] = useState('');

    const [name, setStateName] = useState('');

    const [password, setStatePasswod] = useState('');

    const [errbool, setErrorBool] = useState(false);
    
    const [errName, setErrorName] = useState('');

    const id  =  useSelector(state => state.login.stateUserId);

    function setUserName(event){
        setStateUserName(event.target.value);
    }

    function setName(event){
        setStateName(event.target.value);
    }

    function setPassword(event){
        setStatePasswod(event.target.value);
    }

    
    function setBool() {
        setErrorBool(false)
    }

    function RegisterValidation(){
        let username = userName;
        let passWord = password;
        let regname = name;

        let err = '';
        let errboll = false;

        if(!username){
            errboll = true;
            err = err + ' Login is empty;';
        }
        if(!passWord){
            errboll = true;
            err = err + ' Password is empty;';
        }
        if(!regname){
            errboll = true;
            err = err + ' Name is empty;';
        }
        if(errboll){
            setErrorBool(true);
            setErrorName(err);
        }else register(userName, name, password)
    }

    async function register(reguserName, regname, regpassword) {
  
        await axios({
            method: 'post',
            url: "https://chat.vallsoft.com/api/users/register" ,
            data: stringify({
             username: reguserName, 
             name: regname,
             password: regpassword
            }),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
              'Authorization': '',
            }
        }).then(function (response) {
            if (response.data !== '' && response.data.constructor === Object) {  
                let event = response.data
  
                if(event.status){
                  
                    dispatch(setLogin({name: reguserName, id: event.data.id, token: event.data.token}));
                    console.log(localStorage.getItem('user_name'));
                    console.log(localStorage.getItem('user_id'));
                    console.log(localStorage.getItem('user_token'));
  
                }
                else{
                  
                  console.log(event.message)
  
                }
            }
        }).catch(function (error) {
            console.log(error)
        });
  
      } 

      if(id){
        console.log(id);
        return <Redirect to={'/home'}/>
    }else

    return (
        <>
        <div className='registerForm'>
            <div className='logregLabel'>

                <label className='labelReg'>User name:</label>
                <input type="text" value={userName} onChange={setUserName} placeholder='User name'/>

            </div>

            <div className='logregLabel'>

                <label className='labelReg'>Name:</label>
                <input type="text" value={name} onChange={setName} placeholder='Name'/>

            </div>

            <div className='logregLabel'>

                <label className='labelReg'>Password:</label>
                <input type="text" value={password} onChange={setPassword} placeholder='Password' type='password'/>

            </div>

            <div className='logregLabelButton'>

                <button onClick={RegisterValidation}>Register</button>

            </div>
        </div>

        <div className={errbool ? 'errorform active' : 'errorform'}>

            <div className='createChatFormH'><h>{errName}</h></div>

            <div className='createChatFormButton'><button onClick={setBool}>Close</button></div>

        </div>
        </>
    )
}

export default RegisterForm;