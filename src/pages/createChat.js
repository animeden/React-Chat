import React from 'react'
import '../index.css'
import ChatForm from '../CreateChatForms/chatForm'


class CreateChat extends React.Component {

    render(){
    return (
        <div className='createchat'>
            <ChatForm/>
        </div>
    )
    }
}

export default CreateChat;