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

    return (
        <div className={'chatlist-' + theme.siteTheme}>
            <ListOfChat/>
        </div>
    )
}

export default ChatList;