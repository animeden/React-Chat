import React from 'react'
import '../index.css'
import {useSelector} from 'react-redux'

function ChatList(){

    const theme  =  useSelector(state => state.theme);

    return (
        <div className={'chatlist-' + theme.siteTheme}>
        </div>
    )
}

export default ChatList;