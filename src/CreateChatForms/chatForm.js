import React from 'react'
import axios from 'axios'
import '../index.css'

class ChatForm extends React.Component{

    constructor(props) {
      super(props);

      this.state ={chatName: '', userName:'', errbool: false, errName: '', succbool: false, showUser:'', showChate:''};

      this.chatNameChange = this.chatNameChange.bind(this);
      this.userNameChange = this.userNameChange.bind(this);
      this.func = this.func.bind(this);
      this.cler = this.cler.bind(this);
      this.clsc = this.clsc.bind(this);
      this.valid = this.valid.bind(this);
    }
  
  
    chatNameChange(event) {

      this.setState({chatName: event.target.value});

    }

    userNameChange(event) {

      this.setState({userName: event.target.value});

    }

    async func(client_id, name) {

      await axios({
          method: 'post',
          url: "http://localhost:3000/createchat/api/chats/create-chat" ,
          data: JSON.stringify({
           client_id: client_id, 
           name: name
          }),
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
              'Authorization': '',
          }
      }).then(function (response) {
          if (response.data !== '' && response.data.constructor === Object) {
              console.log(response.data)     
          }
      }).catch(function (error) {
          console.log(error)
      });

    } 
    

    valid(){

      let userName = this.state.userName;
      let chatName = this.state.chatName;


      let error = '';
      let errbool = false;

      if(!userName){
        error = error + ' User name cant be empty;';
        errbool = true;
      }
      if(!chatName){
        error = error + ' Chat name cant be empty;';
        errbool = true;
      }
      if(chatName.length < 7){
        error = error + ' Chat name cant be less that 7 characters;';
        errbool = true;
      }
      if(errbool){
        this.setState({errbool: true});
        this.setState({errName: error});
        this.setState({succbool: false});
      }
      if(!errbool){
        this.func(this.state.userName, this.state.chatName);
        this.setState({succbool: true});
        this.setState({errbool: false});
        this.setState({showUser: this.state.userName});
        this.setState({showChate: this.state.chatName});
      }
    }

    cler(){
      this.setState({errbool: false});
    }

    clsc(){
      this.setState({succbool: false});
    }
  
    render(){
      return (
        <div>

          <div className='createChatForm'>

            <div className='createChatLabel'>

              <label className='labelChat'>Chat name:</label>
              <input type="text" value={this.state.chatName} onChange={this.chatNameChange} placeholder='Chat'/>

            </div>

            <div className='createChatLabel'>

              <label className='labelUser'>User name:</label>
              <input type="text" value={this.state.userName} onChange={this.userNameChange} placeholder='User'/>

            </div>

            <div className='createChatButton'>

              <button onClick={this.valid}>Submit</button>

            </div>

          </div>

          <nav className={this.state.errbool ? 'errorform active' : 'errorform'}>

            <div className='createChatFormH'><h>{this.state.errName}</h></div>

            <div className='createChatFormButton'><button onClick={this.cler}>Close</button></div>

          </nav>

          <nav className={this.state.succbool ? 'successfulform active' : 'successfulform'}>

          <div className='createChatFormH'>

            <h>Chat with name <em>{this.state.showChate}</em> successfully created <br/> by user <em>{this.state.showUser}</em></h>

          </div>

          <div className='createChatFormButton'><button onClick={this.clsc}>Close</button></div>

          </nav>

        </div>

        
      );
    }
}

export default ChatForm;