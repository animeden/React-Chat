import React from 'react'
import axios from 'axios'

class ChatForm extends React.Component{

    constructor(props) {
      super(props);

      this.state ={chatName: '', userName:''};

      this.chatNameChange = this.chatNameChange.bind(this);
      this.userNameChange = this.userNameChange.bind(this);
      this.func = this.func.bind(this);
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
        alert(error);
      }
      if(!errbool){
        this.func(this.state.userName, this.state.chatName);
        alert('Chat name: ' + this.state.chatName + '; User name: ' + this.state.userName);
      }
    }
  
    render(){
      return (
        <div>

          <label className='labelChat'>Chat name:</label>
          <input type="text" value={this.state.chatName} onChange={this.chatNameChange} placeholder='Chat'/>
            

          <label className='labelUser'>User name:</label>
          <input type="text" value={this.state.userName} onChange={this.userNameChange} placeholder='User'/>


          <button onClick={this.valid}>Submit</button>

        </div>
      );
    }
}

export default ChatForm;
