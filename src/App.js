import './index.css'
import React from 'react'
import SideBar from './SideBar/sideBar'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as AiIcons from 'react-icons/ai'
import * as MdIcons from 'react-icons/md'
import * as FaIcons from 'react-icons/fa'
import ChatList from './pages/chatList'
import CreateChat from './pages/createChat'
import Home from './pages/home'
import Settings from './pages/settings'
import {Provider} from "react-redux";
import store from "./redux/store";

let styles = {
  div:{
      margin: 0,
      padding: 0
  }
}

function App() {
  const items = [
    {id: 1, title: 'Home', path: '/', icon:<FaIcons.FaHome className='icon'/>},
    {id: 2, title: 'Chat list', path: '/chatlist', icon:<FaIcons.FaThList className='icon'/>},
    {id: 3, title: 'Create Chat', path: '/createchat', icon:<MdIcons.MdCreate className='icon'/>},
    {id: 4, title: 'Settings', path: '/settings', icon:<AiIcons.AiFillSetting className='icon'/>}
  ]

  return (
    <Provider store={store}>
      <div style={styles.div}>
        <Router>
          <SideBar items={items} />
          <Switch>
            <Route path='/' exact component={Home}></Route>
            <Route path='/chatlist' component={ChatList}></Route>
            <Route path='/createchat' component={CreateChat}></Route>
            <Route path='/settings' component={Settings}></Route>
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
