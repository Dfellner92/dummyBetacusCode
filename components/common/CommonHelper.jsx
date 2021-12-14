import { PUBLIC_IMAGES_URL  } from "../../constants/commonconstants";
import * as actions from "../../actions/actionTypes";
import store from '../../store';

export function checkUserLogin(){
    try {
        if (localStorage.getItem('userInfo')) {
            return true;
        }
        return false;
    } catch (err){
        return false;
    }
}

export function getUserInfo(){
    try {
        if (localStorage.getItem('userInfo')) {
            return JSON.parse(localStorage.getItem('userInfo'));
        }
        return '';
    } catch (err){
        return '';
    }
}

export function setUserSession(usrLocalStorage){
    store.dispatch({
        type: actions.SESSIONINFO,
        payload:{
            userInfo:(usrLocalStorage.userInfo != '' && usrLocalStorage.userInfo != null)?usrLocalStorage.userInfo:''            
        }
    });
}

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}