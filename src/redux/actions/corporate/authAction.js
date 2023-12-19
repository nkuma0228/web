import { authCorporateAction } from "../../actionTypes";
import { url } from "../../../config/config";
import axios from "axios";
import {isCorporateLoggedIn, multiPartData} from "../../../utils";

// const token = isCorporateLoggedIn("corporateData");

//--------------------corporate-SIGNUP-------------------------

export const manufacturerListInitiate = () => ({
    type: authCorporateAction.MANUFACTURER_LIST_INITIATE
})
export const manufacturerListSuccess = (data) => ({
    type: authCorporateAction.MANUFACTURER_LIST_SUCCESS,
    payload:data
})
export const manufacturerListFailure = (data) => ({
    type: authCorporateAction.MANUFACTURER_LIST_FAILURE
})

export const modelListInitiate = () => ({
    type: authCorporateAction.MODEL_LIST_INITIATE
})
export const modelListSuccess = (data) => ({
    type: authCorporateAction.MODEL_LIST_SUCCESS,
    payload:data
})
export const modelListFailure = (data) => ({
    type: authCorporateAction.MODEL_LIST_FAILURE
})

export const corporateEmailCheckInitiate = () => ({
    type: authCorporateAction.CORPORATE_EMAIL_CHECK_INITIATE
})
export const corporateEmailCheckSuccess = () => ({
    type: authCorporateAction.CORPORATE_EMAIL_CHECK_SUCCESS
})
export const corporateEmailCheckFailure = (data) => ({
    type: authCorporateAction.CORPORATE_EMAIL_CHECK_FAILURE
})

export const corporateAddressCheckInitiate = () => ({
    type: authCorporateAction.CORPORATE_ADDRESS_CHECK_INITIATE
})
export const corporateAddressCheckSuccess = () => ({
    type: authCorporateAction.CORPORATE_ADDRESS_CHECK_SUCCESS
})
export const corporateAddressCheckFailure = (data) => ({
    type: authCorporateAction.CORPORATE_ADDRESS_CHECK_FAILURE
})

export const corporateSignupInitiate = () => ({
    type: authCorporateAction.CORPORATE_SIGNUP_INITIATE
})
export const corporateSignupSuccess = (data) => ({
    type: authCorporateAction.CORPORATE_SIGNUP_SUCCESS,
    payload:data
})
export const corporateSignupFailure = (data) => ({
    type: authCorporateAction.CORPORATE_SIGNUP_FAILURE
})

export const corporateLoginInitiate = () => ({
    type: authCorporateAction.CORPORATE_LOGIN_INITIATE
})
export const corporateLoginSuccess = (data) => ({
    type: authCorporateAction.CORPORATE_LOGIN_SUCCESS,
    payload:data
})
export const corporateLoginFailure = (data) => ({
    type: authCorporateAction.CORPORATE_LOGIN_FAILURE
})

export const corporateForgotInitiate = () => ({
    type: authCorporateAction.CORPORATE_FORGOT_INITIATE
})
export const corporateForgotSuccess = () => ({
    type: authCorporateAction.CORPORATE_FORGOT_SUCCESS
})
export const corporateForgotFailure = (data) => ({
    type: authCorporateAction.CORPORATE_FORGOT_FAILURE
})

export const corporateResetInitiate = () => ({
    type: authCorporateAction.CORPORATE_RESET_INITIATE
})
export const corporateResetSuccess = (data) => ({
    type: authCorporateAction.CORPORATE_RESET_SUCCESS,
    payload:data
})
export const corporateResetFailure = (data) => ({
    type: authCorporateAction.CORPORATE_RESET_FAILURE
})

export const corporateLogoutInitiate = () => ({
    type: authCorporateAction.CORPORATE_LOGOUT_INITIATE
})
export const corporateLogoutSuccess = (data) => ({
    type: authCorporateAction.CORPORATE_LOGOUT_SUCCESS,
})
export const corporateLogoutFailure = (data) => ({
    type: authCorporateAction.CORPORATE_LOGOUT_FAILURE
})

export const getCorporateDetailsInitiate = () => ({
    type: authCorporateAction.GET_CORPORATE_DETAILS_INITIATE
})
export const getCorporateDetailsSuccess = (data) => ({
    type: authCorporateAction.GET_CORPORATE_DETAILS_SUCCESS,
    payload:data
})
export const getCorporateDetailsFailure = (data) => ({
    type: authCorporateAction.GET_CORPORATE_DETAILS_FAILURE,
})

export const corporateUpdateInitiate = () => ({
    type: authCorporateAction.CORPORATE_UPDATE_INITIATE
})
export const corporateUpdateSuccess = (data) => ({
    type: authCorporateAction.CORPORATE_UPDATE_SUCCESS,
    payload:data
})
export const corporateUpdateFailure = (data) => ({
    type: authCorporateAction.CORPORATE_UPDATE_FAILURE,
})

export const corporatePasswordUpdateInitiate = () => ({
    type: authCorporateAction.CORPORATE_PASSWORD_UPDATE_INITIATE
})
export const corporatePasswordUpdateSuccess = (data) => ({
    type: authCorporateAction.CORPORATE_PASSWORD_UPDATE_SUCCESS,
    payload:data
})
export const corporatePasswordUpdateFailure = (data) => ({
    type: authCorporateAction.CORPORATE_PASSWORD_UPDATE_FAILURE,
})

export const providerCorporateUpdateInitiate = () => ({
    type: authCorporateAction.PROVIDER_CORPORATE_UPDATE_INITIATE
})
export const providerCorporateUpdateSuccess = (data) => ({
    type: authCorporateAction.PROVIDER_CORPORATE_UPDATE_SUCCESS,
    payload:data
})
export const providerCorporateUpdateFailure = (data) => ({
    type: authCorporateAction.PROVIDER_CORPORATE_UPDATE_FAILURE,
})

export function corporateEmailCheck(payload,type) {
    return dispatch => {
       dispatch(corporateEmailCheckInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}corporate/email_check`, payload)
            .then(response => {
                const data = response.data
                if (data.status && data.status == 200) {
                    dispatch(corporateEmailCheckSuccess())
                }
                else{
                    dispatch(corporateEmailCheckFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(corporateEmailCheckFailure(err))
                reject(err);
            })
        );
    }
}

export function corporateAddressCheck(payload,type) {
    return dispatch => {
       dispatch(corporateAddressCheckInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}corporate/address_check`, payload)
            .then(response => {
                const data = response.data
                if (data.status && data.status == 200) {
                    dispatch(corporateAddressCheckSuccess())
                }
                else{
                    dispatch(corporateAddressCheckFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(corporateAddressCheckFailure(err))
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
            axios.get(`${url}corporate/manufacturer/list`)
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
            axios.post(`${url}corporate/model/list`, payload)
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

export function corporateSignup(payload,type) {
    let user=''
    return dispatch => {
       dispatch(corporateSignupInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}corporate/signup`, payload)
                .then(response => {
                    const data = response.data

                    if (data.code && data.code == 201) {
                        dispatch(corporateSignupSuccess(data))
                    }
                    else{
                      dispatch(corporateSignupFailure(data))
                    }
                    resolve(data);
                })
                .catch(err => {
                    dispatch(corporateSignupFailure(err))
                    reject(err);
                })
        );
    }
}

export function corporateLogin(payload,type) {
    let user=''
    return dispatch => {
       dispatch(corporateLoginInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}corporate/login`, payload)
                .then(response => {
                  const data = response.data
                    if (data.code && data.code == 200) {
                        dispatch(corporateLoginSuccess(data))
                    }
                    else{
                      dispatch(corporateLoginFailure(data))
                    }
                    resolve(data);
                })
                .catch(err => {
                    dispatch(corporateLoginFailure(err))
                    reject(err);
                })
        );
    }
}

export function corporateForgot(payload,type) {
    return dispatch => {
       dispatch(corporateForgotInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}corporate/forgot`, payload)
            .then(response => {
                const data = response.data
                if (data.status && data.status == 200) {
                    dispatch(corporateForgotSuccess())
                }
                else{
                    dispatch(corporateForgotFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(corporateForgotFailure(err))
                reject(err);
            })
        );
    }
}

export function corporateResetPassword(payload,type) {
    
    return dispatch => {
       dispatch(corporateResetInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}corporate/reset`, payload)
                .then(response => {
                  const data = response.data
                    if (data.code && data.code == 200) {
                        dispatch(corporateResetSuccess(data))
                    }
                    else{
                      dispatch(corporateResetFailure(data))
                    }
                    resolve(data);
                })
                .catch(err => {
                    dispatch(corporateResetFailure(err))
                    reject(err);
                })
        );
    }
}

export function corporateLogout(payload,type) {
    const token = isCorporateLoggedIn('corporateLogin')
    return dispatch => {
       dispatch(corporateLogoutInitiate())
        return new Promise((resolve, reject) =>
            axios.get(`${url}corporate/logout`, {
                headers: { Authorization: `${token}` }
            })
                .then(response => {
                    const data = response.data
                    if (data.code && data.code == 200) {
                        window.localStorage.removeItem("corporateLogin")
                        dispatch(corporateLogoutSuccess(data))
                    }
                    else{
                        window.localStorage.clear();
                        //dispatch(corporateLogoutFailure(data))
                        dispatch(corporateLogoutSuccess(data))
                    }
                    resolve(data);
                })
                .catch(err => {
                    dispatch(corporateLogoutFailure(err))
                    reject(err);
                })
        );
    }
}

export function corporateDetails(payload,type) {
    const token = isCorporateLoggedIn('corporateLogin')
    //console.log("tokentokentoken",token)
    return dispatch => {
       dispatch(getCorporateDetailsInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.get(`${url}corporate/profile`, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                
                const data = response.data
                //console.log("c details", data)
                if (data.code && data.code == 200) {
                    
                    dispatch(getCorporateDetailsSuccess(data))

                } else if(data.code && data.code == 401 && data.message == "Invalid token") {
                    window.localStorage.removeItem("corporateLogin");
                    dispatch(getCorporateDetailsFailure(data))

                } else {
                    dispatch(getCorporateDetailsFailure())
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(getCorporateDetailsFailure(err))
                reject(err);
            })
        );
    }
}

export function langUpdate(payload,type) {
    const token = isCorporateLoggedIn('corporateLogin')
    return dispatch => {
       dispatch(corporateUpdateInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}corporate/profile_lang_update`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.status && data.status == 200) {
                    dispatch(corporateUpdateSuccess(data))
                }
                else{
                    dispatch(corporateUpdateFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(corporateUpdateFailure(err))
                reject(err);
            })
        );
    }
}

export function corporateUpdate(payload,type) {
    const token = isCorporateLoggedIn('corporateLogin')
    return dispatch => {
       dispatch(corporateUpdateInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}corporate/profile_update`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.status && data.status == 200) {
                    dispatch(corporateUpdateSuccess(data))
                }
                else{
                    dispatch(corporateUpdateFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(corporateUpdateFailure(err))
                reject(err);
            })
        );
    }
}

export function corporatePasswordUpdate(payload,type) {
    const token = isCorporateLoggedIn('corporateLogin')
    //console.log(token)
    return dispatch => {
       dispatch(corporatePasswordUpdateInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}corporate/password_update`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                //console.log(response.data)
                const data = response.data
                if (data.status && data.status == 200) {
                    dispatch(corporatePasswordUpdateSuccess(data))
                }
                else{
                    dispatch(corporatePasswordUpdateFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(corporatePasswordUpdateFailure(err))
                reject(err);
            })
        );
    }
}

export function providerGalleryUpdate(payload,type) {
    const token = isCorporateLoggedIn('corporateLogin')
    const formData = multiPartData(payload);

    return dispatch => {
       dispatch(providerCorporateUpdateInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}corporate/profile_gallery_update`, formData, {
                headers: { Authorization: `${token}` }
            })
                .then(response => {
                  const data = response.data
                    if (data.status && data.status == 200) {
                        dispatch(providerCorporateUpdateSuccess(data))
                    } else {
                      dispatch(providerCorporateUpdateFailure(data))
                    }
                    resolve(data);
                })
                .catch(err => {
                    dispatch(providerCorporateUpdateFailure(err))
                    reject(err);
                })
        );
    }
}

export function providerGalleryRemoveUpdate(payload,type) {
    const token = isCorporateLoggedIn('corporateLogin')

    return dispatch => {
       dispatch(providerCorporateUpdateInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}corporate/profile_gallery_remove_update`, payload, {
                headers: { Authorization: `${token}` }
            })
                .then(response => {
                  const data = response.data
                    if (data.status && data.status == 200) {
                        dispatch(providerCorporateUpdateSuccess(data))
                    } else {
                      dispatch(providerCorporateUpdateFailure(data))
                    }
                    resolve(data);
                })
                .catch(err => {
                    dispatch(providerCorporateUpdateFailure(err))
                    reject(err);
                })
        );
    }
}