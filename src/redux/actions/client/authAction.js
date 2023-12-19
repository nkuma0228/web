import { authAction } from "../../actionTypes";
import { url } from "../../../config/config";
import axios from "axios";
import {isLoggedIn} from "../../../utils";

// const token = isLoggedIn("clientData");

//--------------------CLIENT-SIGNUP-------------------------

export const manufacturerListInitiate = () => ({
    type: authAction.MANUFACTURER_LIST_INITIATE
})
export const manufacturerListSuccess = (data) => ({
    type: authAction.MANUFACTURER_LIST_SUCCESS,
    payload:data
})
export const manufacturerListFailure = (data) => ({
    type: authAction.MANUFACTURER_LIST_FAILURE
})

export const modelListInitiate = () => ({
    type: authAction.MODEL_LIST_INITIATE
})
export const modelListSuccess = (data) => ({
    type: authAction.MODEL_LIST_SUCCESS,
    payload:data
})
export const modelListFailure = (data) => ({
    type: authAction.MODEL_LIST_FAILURE
})

export const clientEmailCheckInitiate = () => ({
    type: authAction.CLIENT_EMAIL_CHECK_INITIATE
})
export const clientEmailCheckSuccess = () => ({
    type: authAction.CLIENT_EMAIL_CHECK_SUCCESS
})
export const clientEmailCheckFailure = (data) => ({
    type: authAction.CLIENT_EMAIL_CHECK_FAILURE
})

export const clientAddressCheckInitiate = () => ({
    type: authAction.CLIENT_ADDRESS_CHECK_INITIATE
})
export const clientAddressCheckSuccess = () => ({
    type: authAction.CLIENT_ADDRESS_CHECK_SUCCESS
})
export const clientAddressCheckFailure = (data) => ({
    type: authAction.CLIENT_ADDRESS_CHECK_FAILURE
})

export const clientSignupInitiate = () => ({
    type: authAction.CLIENT_SIGNUP_INITIATE
})
export const clientSignupSuccess = (data) => ({
    type: authAction.CLIENT_SIGNUP_SUCCESS,
    payload:data
})
export const clientSignupFailure = (data) => ({
    type: authAction.CLIENT_SIGNUP_FAILURE
})

export const clientLoginInitiate = () => ({
    type: authAction.CLIENT_LOGIN_INITIATE
})
export const clientLoginSuccess = (data) => ({
    type: authAction.CLIENT_LOGIN_SUCCESS,
    payload:data
})
export const clientLoginFailure = (data) => ({
    type: authAction.CLIENT_LOGIN_FAILURE
})

export const clientForgotInitiate = () => ({
    type: authAction.CLIENT_FORGOT_INITIATE
})
export const clientForgotSuccess = () => ({
    type: authAction.CLIENT_FORGOT_SUCCESS
})
export const clientForgotFailure = (data) => ({
    type: authAction.CLIENT_FORGOT_FAILURE
})

export const clientResetInitiate = () => ({
    type: authAction.CLIENT_RESET_INITIATE
})
export const clientResetSuccess = (data) => ({
    type: authAction.CLIENT_RESET_SUCCESS,
    payload:data
})
export const clientResetFailure = (data) => ({
    type: authAction.CLIENT_RESET_FAILURE
})

export const clientLogoutInitiate = () => ({
    type: authAction.CLIENT_LOGOUT_INITIATE
})
export const clientLogoutSuccess = (data) => ({
    type: authAction.CLIENT_LOGOUT_SUCCESS,
})
export const clientLogoutFailure = (data) => ({
    type: authAction.CLIENT_LOGOUT_FAILURE
})

export const getClientDetailsInitiate = () => ({
    type: authAction.GET_CLIENT_DETAILS_INITIATE
})
export const getClientDetailsSuccess = (data) => ({
    type: authAction.GET_CLIENT_DETAILS_SUCCESS,
    payload:data
})
export const getClientDetailsFailure = (data) => ({
    type: authAction.GET_CLIENT_DETAILS_FAILURE,
})

export const clientUpdateInitiate = () => ({
    type: authAction.CLIENT_UPDATE_INITIATE
})
export const clientUpdateSuccess = (data) => ({
    type: authAction.CLIENT_UPDATE_SUCCESS,
    payload:data
})
export const clientUpdateFailure = (data) => ({
    type: authAction.CLIENT_UPDATE_FAILURE,
})

export const clientPasswordUpdateInitiate = () => ({
    type: authAction.CLIENT_PASSWORD_UPDATE_INITIATE
})
export const clientPasswordUpdateSuccess = (data) => ({
    type: authAction.CLIENT_PASSWORD_UPDATE_SUCCESS,
    payload:data
})
export const clientPasswordUpdateFailure = (data) => ({
    type: authAction.CLIENT_PASSWORD_UPDATE_FAILURE,
})

export function clientEmailCheck(payload,type) {
    return dispatch => {
       dispatch(clientEmailCheckInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}client/email_check`, payload)
            .then(response => {
                const data = response.data
                if (data.status && data.status == 200) {
                    dispatch(clientEmailCheckSuccess())
                }
                else{
                    dispatch(clientEmailCheckFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(clientEmailCheckFailure(err))
                reject(err);
            })
        );
    }
}

export function clientAddressCheck(payload,type) {
    return dispatch => {
       dispatch(clientAddressCheckInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}client/address_check`, payload)
            .then(response => {
                const data = response.data
                if (data.status && data.status == 200) {
                    dispatch(clientAddressCheckSuccess())
                }
                else{
                    dispatch(clientAddressCheckFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(clientAddressCheckFailure(err))
                reject(err);
            })
        );
    }
}

export function manufacturerList(payload,type) {
    let user=''

    return dispatch => {
       dispatch(manufacturerListInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.get(`${url}client/manufacturer/list`)
                .then(response => {

                    const data = response.data
                    if (data.code && data.code == 200) {
                        dispatch(manufacturerListSuccess(data))
                    }
                    else{
                      dispatch(manufacturerListFailure(data))
                    }
                    resolve(data);
                })
                .catch(err => {
                    dispatch(manufacturerListFailure(err))
                    reject(err);
                })
        );
    }
}

export function modelList(payload,type) {
    let user=''
    return dispatch => {
       dispatch(modelListInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}client/model/list`, payload)
                .then(response => {
                  const data = response.data
                    if (data.code && data.code == 200) {
                        dispatch(modelListSuccess(data))
                    }
                    else{
                      dispatch(modelListFailure(data))
                    }
                    resolve(data);
                })
                .catch(err => {
                    dispatch(modelListFailure(err))
                    reject(err);
                })
        );
    }
}

export function clientSignup(payload,type) {
    let user=''
    return dispatch => {
       dispatch(clientSignupInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}client/signup`, payload)
                .then(response => {
                    const data = response.data

                    if (data.code && data.code == 201) {
                        dispatch(clientSignupSuccess(data))
                    }
                    else{
                      dispatch(clientSignupFailure(data))
                    }
                    resolve(data);
                })
                .catch(err => {
                    dispatch(clientSignupFailure(err))
                    reject(err);
                })
        );
    }
}

export function clientLogin(payload,type) {
    let user=''
    return dispatch => {
       dispatch(clientLoginInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}client/login`, payload)
                .then(response => {
                  const data = response.data
                    if (data.code && data.code == 200) {
                        dispatch(clientLoginSuccess(data))
                    }
                    else{
                      dispatch(clientLoginFailure(data))
                    }
                    resolve(data);
                })
                .catch(err => {
                    dispatch(clientLoginFailure(err))
                    reject(err);
                })
        );
    }
}

export function clientForgot(payload,type) {
    return dispatch => {
       dispatch(clientForgotInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}client/forgot`, payload)
            .then(response => {
                const data = response.data
                if (data.status && data.status == 200) {
                    dispatch(clientForgotSuccess())
                }
                else{
                    dispatch(clientForgotFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(clientForgotFailure(err))
                reject(err);
            })
        );
    }
}

export function clientResetPassword(payload,type) {
    
    return dispatch => {
       dispatch(clientResetInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}client/reset`, payload)
                .then(response => {
                  const data = response.data
                    if (data.code && data.code == 200) {
                        dispatch(clientResetSuccess(data))
                    }
                    else{
                      dispatch(clientResetFailure(data))
                    }
                    resolve(data);
                })
                .catch(err => {
                    dispatch(clientResetFailure(err))
                    reject(err);
                })
        );
    }
}

export function clientLogout(payload,type) {
    const token = isLoggedIn('clientLogin')
    return dispatch => {
       dispatch(clientLogoutInitiate())
        return new Promise((resolve, reject) =>
            axios.get(`${url}client/logout`, {
                headers: { Authorization: `${token}` }
            })
                .then(response => {
                    const data = response.data
                    if (data.code && data.code == 200) {
                        window.localStorage.removeItem("clientLogin")
                        dispatch(clientLogoutSuccess(data))
                    }
                    else{
                        window.localStorage.clear();
                        //dispatch(clientLogoutFailure(data))
                        dispatch(clientLogoutSuccess(data))
                    }
                    resolve(data);
                })
                .catch(err => {
                    dispatch(clientLogoutFailure(err))
                    reject(err);
                })
        );
    }
}

export function clientDetails(payload,type) {
    const token = isLoggedIn('clientLogin')
    //console.log("tokentokentoken",token)
    return dispatch => {
       dispatch(getClientDetailsInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.get(`${url}client/profile`, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                
                const data = response.data
                if (data.code && data.code == 200) {

                    dispatch(getClientDetailsSuccess(data))

                } else if(data.code && data.code == 401 && data.message == "Invalid token") {
                    window.localStorage.removeItem("clientLogin");
                    dispatch(getClientDetailsFailure(data))

                } else {
                    dispatch(getClientDetailsFailure())
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(getClientDetailsFailure(err))
                reject(err);
            })
        );
    }
}

export function clientLangUpdate(payload,type) {
    const token = isLoggedIn('clientLogin')
    return dispatch => {
       dispatch(clientUpdateInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}client/profile_lang_update`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.status && data.status == 200) {
                    dispatch(clientUpdateSuccess(data))
                }
                else{
                    dispatch(clientUpdateFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(clientUpdateFailure(err))
                reject(err);
            })
        );
    }
}

export function clientUpdate(payload,type) {
    const token = isLoggedIn('clientLogin')
    return dispatch => {
       dispatch(clientUpdateInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}client/profile_update`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.status && data.status == 200) {
                    dispatch(clientUpdateSuccess(data))
                }
                else{
                    dispatch(clientUpdateFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(clientUpdateFailure(err))
                reject(err);
            })
        );
    }
}

export function clientPasswordUpdate(payload,type) {
    const token = isLoggedIn('clientLogin')
    //console.log(token)
    return dispatch => {
       dispatch(clientPasswordUpdateInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}client/password_update`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                //console.log(response.data)
                const data = response.data
                if (data.status && data.status == 200) {
                    dispatch(clientPasswordUpdateSuccess(data))
                }
                else{
                    dispatch(clientPasswordUpdateFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(clientPasswordUpdateFailure(err))
                reject(err);
            })
        );
    }
}