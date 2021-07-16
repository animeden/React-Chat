import React from 'react'
import '../index.css'

function LoginForm(){

    return (
        <div className='loginForm'>
            <div className='logregLabel'>

                <label className='labelReg'>User name:</label>
                <input type="text" /*value={this.state.chatName} onChange={this.chatNameChange}*/ placeholder='User name'/>

            </div>

            <div className='logregLabel'>

                <label className='labelReg'>Password:</label>
                <input type="text" /*value={this.state.userName} onChange={this.userNameChange}*/ placeholder='Password'/>

            </div>

            <div className='logregLabelButton'>

                <button>Log in</button>

            </div>
        </div>
    )
}

export default LoginForm;