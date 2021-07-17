import React from 'react'
import '../index.css'
import {useSelector} from 'react-redux'
import ChatListItem from './chatlistItem'

function ChatList(props){

    const theme  =  useSelector(state => state.theme);

    return (
        <div className={'chatlistlist-'  + theme.siteTheme}>
            <div className='chatlistlistblock'>
                { props.chats.map(chat =>{
                    return <ChatListItem chat={chat}/>
                }) }
            </div>
        </div>
    )
}

export default ChatList;