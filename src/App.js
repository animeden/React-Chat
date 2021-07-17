import './index.css'
import React from 'react'
import SideBar from './SideBar/sideBar'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as AiIcons from 'react-icons/ai'
import * as MdIcons from 'react-icons/md'
import * as FaIcons from 'react-icons/fa'
import * as RiIcons from 'react-icons/ri'
import ChatList from './pages/chatList'
import CreateChat from './pages/createChat'
import Home from './pages/home'
import Logreg from './pages/login-register'
import Settings from './pages/settings'
import {useSelector} from 'react-redux'

let styles = {
  div:{
      margin: 0,
      padding: 0
  }
}

function App() {

  
    const id  =  useSelector(state => state.login.stateUserId);
    let items = []
  
 if(id){
    items = [
      {id: 1, title: 'Home', path: '/home', icon:<FaIcons.FaHome className='icon' onClick={clik}/>},
      {id: 2, title: 'Chat list', path: '/chatlist', icon:<FaIcons.FaThList className='icon'/>},
      {id: 3, title: 'Create Chat', path: '/createchat', icon:<MdIcons.MdCreate className='icon'/>},
      {id: 4, title: 'Settings', path: '/settings', icon:<AiIcons.AiFillSetting className='icon'/>}
    ]}
    else{
      items = [
        {id: 1, title: 'Home', path: '/home', icon:<FaIcons.FaHome className='icon'/>},
        {id: 2, title: 'Chat list', path: '/chatlist', icon:<FaIcons.FaThList className='icon'/>},
        {id: 3, title: 'Create Chat', path: '/createchat', icon:<MdIcons.MdCreate className='icon'/>},
        {id: 4, title: 'Settings', path: '/settings', icon:<AiIcons.AiFillSetting className='icon'/>},
        {id: 5, title: 'Log in / Registration', path: '/', icon:<RiIcons.RiAccountPinBoxFill className='icon'/>}
      ]
    }
 
    function clik() {
      console.log('click');
    }
    

  return (
      <div style={styles.div}>
        <Router>
          <SideBar items={items} />
          <Switch>
            <Route path='/' exact component={Logreg}></Route>
            <Route path='/home' component={Home}></Route>
            <Route path='/chatlist' component={ChatList}></Route>
            <Route path='/createchat' component={CreateChat}></Route>
            <Route path='/settings' component={Settings}></Route>
          </Switch>
        </Router>
      </div>
  );
}

export default App;
