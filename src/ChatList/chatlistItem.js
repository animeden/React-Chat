import React, { useState, useEffect } from 'react';
import '../index.css'
import {useSelector} from 'react-redux'
import * as BSIcons from 'react-icons/bs'
import * as MDIcons from 'react-icons/im'
import * as AIIcons from 'react-icons/ai'
import stringify from 'qs-stringify'
import axios from 'axios'

function ChatListItem({chat}){

    const [addUsersId, setAddUsersId] = useState('');

    const [addUsersIdMassive, setAddUsersIdMassive] = useState([]);

    const theme  =  useSelector(state => state.theme);

    const [add, setAdd] = useState('');
    
    const [addActive, setAddActive] = useState(false);
    
    const token  =  useSelector(state => state.login.stateUserToken);

    function setUserIdString(event){
        setAddUsersId(event.target.value);
    }

    function activeAdd() {
        if(!addActive){
            setAdd('-active');
            setAddActive(true);
        }
        if(addActive){
            setAdd('');
            setAddActive(false);
            setAddUsersId('');
        }
    }

    function addUserValidation() {
        
        setAddUsersIdMassive(addUsersId.split(','));
        addUsers();

    }

    async function deleteChat() {
  
        await axios({
            method: 'post',
            url: "https://chat.vallsoft.com/api/chats/delete-chat" ,
            data: stringify({
                chat_id : chat.id
            }),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
              'Authorization': token,
            }
        }).then(function (response) {
            if (response.data !== '' && response.data.constructor === Object) {  
                let event = response.data
  
                if(event.status){
                  
                  console.log(event)
  
                }
                else{
                  
                  console.log(event.message)
  
                }
            }
        }).catch(function (error) {
            console.log(error)
        });
  
      } 

      async function addUsers() {
    
        await axios({
            method: 'post',
            url: "https://chat.vallsoft.com/api/chats/add-users-to-chat" ,
            data: stringify({
                members_list: addUsersIdMassive,
                chat_id : chat.id
            }),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
              'Authorization': token,
            }
        }).then(function (response) {
            if (response.data !== '' && response.data.constructor === Object) {  
                let event = response.data
  
                if(event.status){
                  
                  console.log(addUsersIdMassive);
  
                }
                else{
                  
                  console.log(addUsersIdMassive)
  
                }
            }
        }).catch(function (error) {
            console.log(error)
        });
  
      } 

      async function leaveChat() {
  
        await axios({
            method: 'post',
            url: "https://chat.vallsoft.com/api/chats/delete-chat" ,
            data: stringify({
                chat_id : chat.id
            }),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
              'Authorization': token,
            }
        }).then(function (response) {
            if (response.data !== '' && response.data.constructor === Object) {  
                let event = response.data
  
                if(event.status){
                  
                  console.log(event)
  
                }
                else{
                  
                  console.log(event.message)
  
                }
            }
        }).catch(function (error) {
            console.log(error)
        });
  
      } 

    return (
        <div>
            <button className='chatlistItem'>

                <h>{chat.name}</h>

                <div className='actionsBlock'>

                    <button className="actionButton" onClick={activeAdd}><AIIcons.AiOutlineUsergroupAdd className='action'/></button>
                    <button className="actionButton"><MDIcons.ImExit className='action'/></button>
                    <button className="actionButton" onClick={deleteChat}><BSIcons.BsFillTrashFill className='action'/></button>

                </div>

            </button>

            <div>

                <div>

                    <div className={'addusers' + add}>

                        <input  type="text" onChange={setUserIdString} value={addUsersId} placeholder='To add two or more users write(2,3,4,...,9)'/>

                        <button onClick={addUserValidation}>Add</button>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default ChatListItem;