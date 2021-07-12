import React from 'react'
import axios from 'axios'
import '../index.css'
import stringify from 'qs-stringify'

class ChatForm extends React.Component{

    constructor(props) {
      super(props);

      this.state ={chatName: '', userName:'', errbool: false, errName: '', succbool: false, showUser:'', showChate:''};

      this.chatNameChange = this.chatNameChange.bind(this);
      this.userNameChange = this.userNameChange.bind(this);
      this.createChate = this.createChate.bind(this);
      this.setError = this.setError.bind(this);
      this.setSuccsses = this.setSuccsses.bind(this);
      this.validateFrom = this.validateFrom.bind(this);
    }
  
  
    chatNameChange(event) {

      this.setState({chatName: event.target.value});

    }

    userNameChange(event) {

      this.setState({userName: event.target.value});

    }

    async createChate(user_id, name) {

      let current = this

      await axios({
          method: 'post',
          url: "https://chat.vallsoft.com/api/chats/create-chat" ,
          data: stringify({
           user_id: user_id, 
           name: name
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': 'BpvgI5T7EynnaDjDOqa7AT-gfjQNDhgM',
          }
      }).then(function (response) {
          if (response.data !== '' && response.data.constructor === Object) {  
              let event = response.data

              if(event.status){
                
                current.setState({errbool: false});
                current.setState({succbool: true});

              }
              else{
                
                current.setState({succbool: false});
                current.setState({errName: 'Error'});
                current.setState({errbool: true});

              }
          }
      }).catch(function (error) {
          console.log(error)
      });

    } 
    

    validateFrom(){

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
        this.createChate(this.state.userName, this.state.chatName);
        this.setState({showUser: this.state.userName});
        this.setState({showChate: this.state.chatName});
      }
    }

    setError(){
      this.setState({errbool: false});
    }

    setSuccsses(){
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

              <button onClick={this.validateFrom}>Submit</button>

            </div>

          </div>

          <nav className={this.state.errbool ? 'errorform active' : 'errorform'}>

            <div className='createChatFormH'><h>{this.state.errName}</h></div>

            <div className='createChatFormButton'><button onClick={this.setError}>Close</button></div>

          </nav>

          <nav className={this.state.succbool ? 'successfulform active' : 'successfulform'}>

            <div className='createChatFormH'>

              <h>Chat with name <em>{this.state.showChate}</em> successfully created <br/> by user <em>{this.state.showUser}</em></h>

            </div>

            <div className='createChatFormButton'><button onClick={this.setSuccsses}>Close</button></div>

          </nav>

        </div>

        
      );
    }
}

export default ChatForm;