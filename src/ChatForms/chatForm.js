import React from 'react'

class ChatForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: 'chat', value2:'user'};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value, value2: event.target.value2});
    }
  
    handleSubmit(event) {
      alert('Chat name: ' + this.state.value + '; User name: ' + this.state.value2);
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Chat name:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <label>
            User name:
            <input type="text" value={this.state.value2} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Send" />
        </form>
      );
    }
  }

export default ChatForm;