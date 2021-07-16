import React, {useState} from 'react'
import '../index.css'
import stringify from 'qs-stringify'
import axios from 'axios'

function RegisterForm(){

    const [userName, setState] = useState('');

    const [name, setStat] = useState('');

    const [password, setstate] = useState('');

    function setUserName(event){
        setState(event.target.value);
    }

    function setName(event){
        setStat(event.target.value);
    }

    function setPassword(event){
        setstate(event.target.value);
    }

    function RegisterValidation(){
        register(userName, name, password)
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
                  
                  console.log(event)
  
                }
                else{
                  
                  console.log('error')
  
                }
            }
        }).catch(function (error) {
            console.log(error)
        });
  
      } 

    return (
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
                <input type="text" value={password} onChange={setPassword} placeholder='Password'/>

            </div>

            <div className='logregLabelButton'>

                <button onClick={RegisterValidation}>Register</button>

            </div>
        </div>
    )
}

export default RegisterForm;