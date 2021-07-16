import {
    SET_SITE_THEME,
    SET_LOGIN
} from "./actionTypes";

export const setSiteTheme = (data) => ({
    type: SET_SITE_THEME,
    data: data
})

export const setLogin = (name, id, token) => ({
    type: SET_LOGIN,
    name: name,
    id: id,
    token: token
})


