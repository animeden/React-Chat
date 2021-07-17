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

    const [leaveUsersId, setLeaveUsersId] = useState('');

    const [add, setAdd] = useState('');
    
    const [addActive, setAddActive] = useState(false);

    const [leave, setLeave] = useState('');
    
    const [leaveActive, setLeaveActive] = useState(false);
    
    const token  =  useSelector(state => state.login.stateUserToken);
    
    const id  =  useSelector(state => state.login.stateUserId);

    function setUserIdStringAdd(event){
        setAddUsersId(event.target.value);
    }

    function setUserIdStringLeave(event){
        setLeaveUsersId(event.target.value);
    }

    function activeAdd() {
        if(!addActive){
            setAdd('-active');
            setAddActive(true);
            setLeave('');
            setLeaveActive(false);
            setLeaveUsersId('');
        }
        if(addActive){
            setAdd('');
            setAddActive(false);
            setAddUsersId('');
        }
    }

    function activeLeave() {
        setAddActive(false);
        if(!leaveActive){
            setLeave('-active');
            setLeaveActive(true);
            setAdd('');
            setAddActive(false);
            setAddUsersId('');
        }
        if(leaveActive){
            setLeave('');
            setLeaveActive(false);
            setLeaveUsersId('');
        }
    }

    function addUserValidation() {
        activeAdd();
        const massive = addUsersId.split(',');
        addUsers(massive);

    }

    function  leaveUserValidator() {
        activeLeave();
        const massive = leaveUsersId.split(',');
        leaveChat(massive);
    }

    function outUserValidator() {
        activeLeave();
        leaveChat([id]);
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

      async function addUsers(members_list) {
    
        await axios({
            method: 'post',
            url: "https://chat.vallsoft.com/api/chats/add-users-to-chat" ,
            data: stringify({
                members_list: members_list,
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
                  
                  console.log(members_list);
  
                }
                else{
                  
                  console.log(event.message);
  
                }
            }
        }).catch(function (error) {
            console.log(error)
        });
  
      } 

      async function leaveChat(members_list) {
  
        await axios({
            method: 'post',
            url: "https://chat.vallsoft.com/api/chats/remove-users-from-chat" ,
            data: stringify({
                members_list: members_list,
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
                    <button className="actionButton" onClick={activeLeave}><MDIcons.ImExit className='action'/></button>
                    <button className="actionButton" onClick={deleteChat}><BSIcons.BsFillTrashFill className='action'/></button>

                </div>

            </button>

            <div className={'addusers' + add}>

                <input  type="text" onChange={setUserIdStringAdd} value={addUsersId} placeholder='To add two or more users write(2,3,4,...,9)'/>

                <button onClick={addUserValidation}>Add</button>

            </div>

            <div>

                <div className={'leaveusers' + leave}>

                    <input  type="text" onChange={setUserIdStringLeave} value={leaveUsersId} placeholder='To remove 2 or more users write(2,3,4,...,9)'/>

                    <button onClick={leaveUserValidator}>Kick</button>

                </div>


                <div className={'leaveButton' + leave}><button onClick={outUserValidator}>Leave from Chat</button></div>

            </div>

        </div>
    )
}

export default ChatListItem;