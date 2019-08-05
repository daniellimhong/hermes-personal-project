// import axios from "axios";

const initialState = {
    user: null
};

const SET_USER = "SET_USER";

export default function reducer (state = initialState, action){
    switch(action.type){
        case SET_USER:
            return { user: action.payload }
        default:
            return state;
    }
};

export  function setUser(user){
    // let user = axios.get("/api/login").then(res => res.data)
    return {
        payload: user,
        type: SET_USER
    }
};