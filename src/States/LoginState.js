import { atom } from "recoil"

export const LoginState = atom({
    key : 'LoginState',
    default : {
        id : "",
        nickname : "",
        introduce : "",
        isOwner : false,
        shop : {
            name : ""
        }
    },
})