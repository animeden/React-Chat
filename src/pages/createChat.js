import React from 'react'
import '../index.css'
import ChatForm from '../ChatForms/chatForm'


class CreateChat extends React.Component {

    render(){
    return (
        <div className='createchat'>
            <ChatForm></ChatForm>
        </div>
    )
    }
}

export default CreateChat;