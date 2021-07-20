import React, { useState, useEffect } from 'react';
import '../index.css'
import {useSelector} from 'react-redux'
import ChatListItem from './chatlistItem'
import Yii2WebSockets from '../yiisockets-core'
import stringify from 'qs-stringify'
import axios from 'axios'

function ChatList(props){
    
    const token  =  useSelector(state => state.login.stateUserToken);

    const theme  =  useSelector(state => state.theme);

    const id  =  useSelector(state => state.login.stateUserId);

    const [ws, setWs] = useState({});

    const [messages, setMessages] = useState([]);

    const [newMessage, setNewMessage] = useState('');

    const [isFormVisible, setIsFormVisible] = useState(false);

    const [chatId, setChatId] = useState('');

    function sockets() {
        //Подключение
        let login_tokens = {'login-token': token, 'connection-type': 'user'};
        let _ws = new Yii2WebSockets(login_tokens);

        _ws.connect('chat.vallsoft.com', '443', 'wss', 'wss');
       
        //action, которые вы будете слушать
        _ws.addAction('new-message', function (data) {
             getAllMessages(data.chat_id);
             console.log(data);
        });
        _ws.addAction('status', function (data) {
            //тут описываете, что делать с данными, которые пришли
            console.log(data)
        });
      
       //сохраняете в state
        setWs(_ws)
    }

    function changeNewMessage(event) {
        setNewMessage(event.target.value)
    }

    function sendMessage() {
      ws.socketSend('chat/send', {'text': newMessage , 'user_id' : id, 'chat_id' : chatId });
      getAllMessages(chatId);
      setNewMessage('');
    }

    async function getAllMessages(chat_id) {
  
      await axios({
          method: 'post',
          url: "https://chat.vallsoft.com/api/chats/get-chat-data" ,
          data: stringify({
            chat_id: chat_id,
            messages_limit: '50',
            offset: '0'
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': token,
          }
      }).then(function (response) {
          if (response.data !== '' && response.data.constructor === Object) {  
              let event = response.data

              if(event.status){
                
                  setMessages(event.data);
                  console.log(event.data);
                  setScrolltoDown();

              }
              else{
                console.log(event);
                  
              }
          }
      }).catch(function (error) {
          console.log(error)
      });

  }

  function setScrolltoDown() {
    var wrapp = document.getElementById("wrapp");
    wrapp.scrollTop = wrapp.scrollHeight;
  }

    function message(messages){
        let messageArr = [];
        let obj
        for(let key in messages){
            obj = messages[key]
            messageArr.push(
                <div className={id == obj.sender_id ? 'myMessage' : 'otherMessage'}>
                    <div className={(id == obj.sender_id ? 'myMessageBox-' : 'otherMessageBox-') + theme.siteTheme}>
                        <h>{obj.sender_name}</h>
                        <div className='messageText'><h>{obj.message}</h></div>
                    </div>
                </div>
            )
        }

        return messageArr
    }
    
    useEffect(()=>{
      sockets()
    },[]);

    return (
        <>
            <div className={'chatlistlist-'  + theme.siteTheme}>
                <div className='chatlistlistblock'>
                    { props.chats.map(chat =>{
                        return <ChatListItem 
                        setIsFormVisible={setIsFormVisible}
                        setMessages={setMessages}
                        setChatId={setChatId}
                        setScrolltoDown={setScrolltoDown}
                        ws={ws}
                        chat={chat}/>
                    }) }
                </div>
            </div>
            {isFormVisible ? (

            <div className='messageForm'>

                <div className='messages' id='wrapp'>
                    {message(messages)}
                </div>
                

                <div className='messageWrite'>

                    <input  type="text" onChange={changeNewMessage} value={newMessage} placeholder='Write your message here'/>
                    <button onClick={sendMessage}>Send</button>

                </div>

            </div>

            ) : (<div></div>)
            }
        </>
    )
}

export default ChatList;