import React, { useState} from 'react';
import '../index.css'
import {useSelector} from 'react-redux'
import ChatListItem from './chatlistItem'
import Yii2WebSockets from '../yiisockets-core'

function ChatList(props){
    
    const token  =  useSelector(state => state.login.stateUserToken);

    const theme  =  useSelector(state => state.theme);

    const id  =  useSelector(state => state.login.stateUserId);

    const [ws, setWs] = useState({});

    const testMassive = [
        {
          "sender_id": "1",
          "sender_name": "Robert",
          "message": "1) Hello, Bobert"
        },
        {
          "sender_id": "6",
          "sender_name": "Bobert",
          "message": "2) Hello, Robert"
        },
        {
          "sender_id": "1",
          "sender_name": "Robert",
          "message": "3) Whats up?"
        },
        {
          "sender_id": "1",
          "sender_name": "Robert",
          "message": "3) all ok?"
        },
        {
          "sender_id": "6",
          "sender_name": "Bobert",
          "message": "4) Everything same"
        },
        {
            "sender_id": "1",
            "sender_name": "Robert",
            "message": "1) Hello, Bobert"
          },
          {
            "sender_id": "6",
            "sender_name": "Bobert",
            "message": "2) Hello, Robert"
          },
          {
            "sender_id": "1",
            "sender_name": "Robert",
            "message": "3) Whats up?"
          },
          {
            "sender_id": "1",
            "sender_name": "Robert",
            "message": "3) all ok?"
          },
          {
            "sender_id": "6",
            "sender_name": "Bobert",
            "message": "4) Everything same"
          },
          {
            "sender_id": "1",
            "sender_name": "Robert",
            "message": "1) Hello, Bobert"
          },
          {
            "sender_id": "6",
            "sender_name": "Bobert",
            "message": "2) Hello, Robert"
          },
          {
            "sender_id": "1",
            "sender_name": "Robert",
            "message": "3) Whats up?"
          },
          {
            "sender_id": "1",
            "sender_name": "Robert",
            "message": "3) all ok?"
          },
          {
            "sender_id": "6",
            "sender_name": "Bobert",
            "message": "4) Everything same"
          },
      ]

    const [newMessage, setNewMessage] = useState('');

    const [isFormVisible, setIsFormVisible] = useState(false);

    function sockets() {
        //Подключение
        let login_tokens = {'login-token': token, 'connection-type': 'user'};
        let _ws = new Yii2WebSockets(login_tokens);

        _ws.connect('chat.vallsoft.com', '443', 'wss', 'wss');
       
        //action, которые вы будете слушать
        _ws.addAction('new-message', function (data) {
            //тут описываете, что делать с данными, которые пришли
             console.log(data)
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

    return (
        <>
            <div className={'chatlistlist-'  + theme.siteTheme}>
                <div className='chatlistlistblock'>
                    { props.chats.map(chat =>{
                        return <ChatListItem 
                        setIsFormVisible={setIsFormVisible}
                        ws={ws}
                        chat={chat}/>
                    }) }
                </div>
            </div>
            {isFormVisible ? (

            <div className='messageForm'>

                <div className='messages'>
                    {message(testMassive)}
                </div>

                <div className='messageWrite'>

                    <input  type="text" onChange={changeNewMessage} value={newMessage} placeholder='Write your message here'/>
                    <button>Send</button>

                </div>

            </div>

            ) : (<div></div>)
            }
        </>
    )
}

export default ChatList;