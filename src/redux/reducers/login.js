import {SET_LOGIN} from "../actions/actionTypes";

const login = (state, action) => {
    switch (action.type) {
        case SET_LOGIN:{
            //here can be additional code
            localStorage.setItem("user_name", action.name);
            localStorage.setItem("user_id", action.id);
            localStorage.setItem("user_token", action.token);
            return {
                ...state,
                siteTheme: action.data
            };
        }
        default:
            return state;
    }
}

export default login;