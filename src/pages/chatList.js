import React, { useState, useEffect } from 'react';
import '../index.css'
import {useSelector} from 'react-redux'
import ListOfChat from '../ChatList/chatlist'
import stringify from 'qs-stringify'
import axios from 'axios'

function ChatList(){

    const theme  =  useSelector(state => state.theme);

    const token  =  useSelector(state => state.login.stateUserToken);
    
    const id  =  useSelector(state => state.login.stateUserId);

    const [chats, setChats] = useState([]);

    async function getAllChats() {
  
        await axios({
            method: 'post',
            url: "https://chat.vallsoft.com/api/chats/get-available-chats" ,
            data: stringify({
                user_id: id
            }),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
              'Authorization': token,
            }
        }).then(function (response) {
            if (response.data !== '' && response.data.constructor === Object) {  
                let event = response.data
  
                if(event.status){
                  
                  
                  setChats(event.data);
  
                }
                else{
                  
  
                }
            }
        }).catch(function (error) {
            console.log(error)
        });
  
    }

    useEffect(()=>{
        getAllChats()
    },[]);

    return (
        <div className={'chatlist-' + theme.siteTheme}>
            <ListOfChat chats={chats}/>
        </div>
    )
}

export default ChatList;