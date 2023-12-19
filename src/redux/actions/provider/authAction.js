import { authProviderAction } from "../../actionTypes";
import { url } from "../../../config/config";
import axios from "axios";
import { isProviderLoggedIn, multiPartData } from "../../../utils";

//--------------------CLIENT-SIGNUP-------------------------

export const setCountryInitiate = (data) => ({
    type: authProviderAction.SET_COUNTRY_INITIATE,
    payload:data
})

export const providerEmailCheckInitiate = () => ({
    type: authProviderAction.PROVIDER_EMAIL_CHECK_INITIATE
})
export const providerEmailCheckSuccess = () => ({
    type: authProviderAction.PROVIDER_EMAIL_CHECK_SUCCESS
})
export const providerEmailCheckFailure = (data) => ({
    type: authProviderAction.PROVIDER_EMAIL_CHECK_FAILURE
})

export const providerSignupInitiate = () => ({
    type: authProviderAction.PROVIDER_SIGNUP_INITIATE
})
export const providerSignupSuccess = () => ({
    type: authProviderAction.PROVIDER_SIGNUP_DETAIL_SUCCESS
})
export const providerSignupFailure = (data) => ({
    type: authProviderAction.PROVIDER_SIGNUP_DETAIL_FAILURE,
})

export const providerLoginInitiate = () => ({
    type: authProviderAction.PROVIDER_LOGIN_INITIATE
})
export const providerLoginSuccess = (data) => ({
    type: authProviderAction.PROVIDER_LOGIN_SUCCESS,
    payload:data
})
export const providerLoginFailure = (data) => ({
    type: authProviderAction.PROVIDER_LOGIN_FAILURE,
})

export const providerForgotInitiate = () => ({
    type: authProviderAction.PROVIDER_FORGOT_INITIATE
})
export const providerForgotSuccess = () => ({
    type: authProviderAction.PROVIDER_FORGOT_SUCCESS
})
export const providerForgotFailure = (data) => ({
    type: authProviderAction.PROVIDER_FORGOT_FAILURE
})

export const providerResetInitiate = () => ({
    type: authProviderAction.PROVIDER_RESET_INITIATE
})
export const providerResetSuccess = (data) => ({
    type: authProviderAction.PROVIDER_RESET_SUCCESS,
    payload:data
})
export const providerResetFailure = (data) => ({
    type: authProviderAction.PROVIDER_RESET_FAILURE
})

export const providerLogoutInitiate = () => ({
    type: authProviderAction.PROVIDER_LOGOUT_INITIATE
})
export const providerLogoutSuccess = (data) => ({
    type: authProviderAction.PROVIDER_LOGOUT_SUCCESS,
    payload:data
})
export const providerLogoutFailure = (data) => ({
    type: authProviderAction.PROVIDER_LOGOUT_FAILURE,
})

export const getProviderDetailsInitiate = () => ({
    type: authProviderAction.GET_PROVIDER_DETAILS_INITIATE
})
export const getProviderDetailsSuccess = (data) => ({
    type: authProviderAction.GET_PROVIDER_DETAILS_SUCCESS,
    payload:data
})
export const getProviderDetailsFailure = (data) => ({
    type: authProviderAction.GET_PROVIDER_DETAILS_FAILURE,
})

export const providerUpdateInitiate = () => ({
    type: authProviderAction.PROVIDER_UPDATE_INITIATE
})
export const providerUpdateSuccess = (data) => ({
    type: authProviderAction.PROVIDER_UPDATE_SUCCESS,
    payload:data
})
export const providerUpdateFailure = (data) => ({
    type: authProviderAction.PROVIDER_UPDATE_FAILURE,
})

export const providerPasswordUpdateInitiate = () => ({
    type: authProviderAction.PROVIDER_PASSWORD_UPDATE_INITIATE
})
export const providerPasswordUpdateSuccess = (data) => ({
    type: authProviderAction.PROVIDER_PASSWORD_UPDATE_SUCCESS,
    payload:data
})
export const providerPasswordUpdateFailure = (data) => ({
    type: authProviderAction.PROVIDER_PASSWORD_UPDATE_FAILURE,
})

export const garageReviewsInitiate = () => ({
    type: authProviderAction.GARAGE_REVIEWS_INITIATE
})
export const garageReviewsSuccess = (data) => ({
    type: authProviderAction.GARAGE_REVIEWS_SUCCESS,
    payload:data
})
export const garageReviewsFailure = (data) => ({
    type: authProviderAction.GARAGE_REVIEWS_FAILURE,
})

export const dealerReviewsInitiate = () => ({
    type: authProviderAction.DEALER_REVIEWS_INITIATE
})
export const dealerReviewsSuccess = (data) => ({
    type: authProviderAction.DEALER_REVIEWS_SUCCESS,
    payload:data
})
export const dealerReviewsFailure = (data) => ({
    type: authProviderAction.DEALER_REVIEWS_FAILURE,
})

export const salesReviewsInitiate = () => ({
    type: authProviderAction.SALES_REVIEWS_INITIATE
})
export const salesReviewsSuccess = (data) => ({
    type: authProviderAction.SALES_REVIEWS_SUCCESS,
    payload:data
})
export const salesReviewsFailure = (data) => ({
    type: authProviderAction.SALES_REVIEWS_FAILURE,
})

export const corporateReviewsInitiate = () => ({
    type: authProviderAction.CORPORATE_REVIEWS_INITIATE
})
export const corporateReviewsSuccess = (data) => ({
    type: authProviderAction.CORPORATE_REVIEWS_SUCCESS,
    payload:data
})
export const corporateReviewsFailure = (data) => ({
    type: authProviderAction.CORPORATE_REVIEWS_FAILURE,
})

export const replyInitiate = () => ({
    type: authProviderAction.REPLY_INITIATE
})
export const replySuccess = (data) => ({
    type: authProviderAction.REPLY_SUCCESS,
})
export const replyFailure = (data) => ({
    type: authProviderAction.REPLY_FAILURE,
})

export const manufacturerListInitiate = () => ({
    type: authProviderAction.MANUFACTURER_LIST_INITIATE
})
export const manufacturerListSuccess = (data) => ({
    type: authProviderAction.MANUFACTURER_LIST_SUCCESS,
    payload:data
})
export const manufacturerListFailure = (data) => ({
    type: authProviderAction.MANUFACTURER_LIST_FAILURE,
})

export function providerEmailCheck(payload,type) {
    return dispatch => {
       dispatch(providerEmailCheckInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/email_check`, payload)
            .then(response => {
                const data = response.data
                if (data.status && data.status == 200) {
                    dispatch(providerEmailCheckSuccess())
                }
                else{
                    dispatch(providerEmailCheckFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(providerEmailCheckFailure(err))
                reject(err);
            })
        );
    }
}

export function providerSignup(payload,type) {
    //console.log("payload", payload)
    const formData = multiPartData(payload);
    // formData.append(payload);
    //console.log("formData", formData)
    return dispatch => {
       dispatch(providerSignupInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/signup`, formData)
                .then(response => {
                  const data = response.data
                    if (data.status && data.status == 200) {
                        dispatch(providerSignupSuccess())
                    }
                    else{
                      dispatch(providerSignupFailure(data))
                    }
                    resolve(data);
                })
                .catch(err => {
                    dispatch(providerSignupFailure(err))
                    reject(err);
                })
        );
    }
}

export function providerLogin(payload,type) {
    let user=''
    return dispatch => {
       dispatch(providerLoginInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/login`, payload)
                .then(response => {
                  const data = response.data
                    if (data.code && data.code == 200) {
                        dispatch(providerLoginSuccess(data))
                    }
                    else{
                      dispatch(providerLoginFailure(data))
                    }
                    resolve(data);
                })
                .catch(err => {
                    dispatch(providerLoginFailure(err))
                    reject(err);
                })
        );
    }
}

export function providerForgot(payload,type) {
    return dispatch => {
       dispatch(providerForgotInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/forgot`, payload)
            .then(response => {
                const data = response.data
                if (data.status && data.status == 200) {
                    dispatch(providerForgotSuccess())
                }
                else{
                    dispatch(providerForgotFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(providerForgotFailure(err))
                reject(err);
            })
        );
    }
}

export function providerResetPassword(payload,type) {
    
    return dispatch => {
       dispatch(providerResetInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/reset`, payload)
                .then(response => {
                  const data = response.data
                    if (data.code && data.code == 200) {
                        dispatch(providerResetSuccess(data))
                    }
                    else{
                      dispatch(providerResetFailure(data))
                    }
                    resolve(data);
                })
                .catch(err => {
                    dispatch(providerResetFailure(err))
                    reject(err);
                })
        );
    }
}

export function providerLogout(payload,type) {
    const token = isProviderLoggedIn('providerLogin')
    return dispatch => {
       dispatch(providerLogoutInitiate())
        return new Promise((resolve, reject) =>
            axios.get(`${url}provider/logout`, {
                headers: { Authorization: `${token}` }
            })
                .then(response => {
                    const data = response.data
                    
                    if (data.code && data.code == 200) {
                        window.localStorage.removeItem("providerLogin")
                        dispatch(providerLogoutSuccess(data))
                    }
                    else{
                        window.localStorage.clear();
                        //dispatch(providerLogoutFailure(data))
                        dispatch(providerLogoutSuccess(data))
                    }
                    resolve(data);
                })
                .catch(err => {
                    dispatch(providerLogoutFailure(err))
                    reject(err);
                })
        );
    }
}

export function providerDetails(payload,type) {
    const token = isProviderLoggedIn('providerLogin')
    return dispatch => {
       dispatch(getProviderDetailsInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.get(`${url}provider/profile`, {
                headers: { Authorization: `${token}` }
            })
                .then(response => {
                    const data = response.data
                    if (data.code && data.code == 200) {

                        dispatch(getProviderDetailsSuccess(data))
                    }
                    else{
                      dispatch(getProviderDetailsFailure())
                    }
                    resolve(data);
                })
                .catch(err => {
                    dispatch(getProviderDetailsFailure(err))
                    reject(err);
                })
        );
    }
}

export function providerUpdate(payload,type) {
    const token = isProviderLoggedIn('providerLogin')
    return dispatch => {
       dispatch(providerUpdateInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/profile_update`, payload, {
                headers: { Authorization: `${token}` }
            })
                .then(response => {
                  const data = response.data
                    if (data.status && data.status == 200) {
                        dispatch(providerUpdateSuccess(data))
                    }
                    else{
                      dispatch(providerUpdateFailure(data))
                    }
                    resolve(data);
                })
                .catch(err => {
                    dispatch(providerUpdateFailure(err))
                    reject(err);
                })
        );
    }
}

export function providerPaymentUpdate(payload,type) {
    const token = isProviderLoggedIn('providerLogin')
    return dispatch => {
       dispatch(providerUpdateInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/profile_payment_update`, payload, {
                headers: { Authorization: `${token}` }
            })
                .then(response => {
                  const data = response.data
                    if (data.status && data.status == 200) {
                        dispatch(providerUpdateSuccess(data))
                    }
                    else{
                      dispatch(providerUpdateFailure(data))
                    }
                    resolve(data);
                })
                .catch(err => {
                    dispatch(providerUpdateFailure(err))
                    reject(err);
                })
        );
    }
}

export function providerDetailsUpdate(payload,type) {
    const token = isProviderLoggedIn('providerLogin')
    console.log("tokentoken", token)

    return dispatch => {
       dispatch(providerUpdateInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/profile_details_update`, payload, {
                headers: { Authorization: `${token}` }
            })
                .then(response => {
                  const data = response.data
                    if (data.status && data.status == 200) {
                        dispatch(providerUpdateSuccess(data))
                    }
                    else{
                      dispatch(providerUpdateFailure(data))
                    }
                    resolve(data);
                })
                .catch(err => {
                    dispatch(providerUpdateFailure(err))
                    reject(err);
                })
        );
    }
}

export function providerGalleryUpdate(payload,type) {
    const token = isProviderLoggedIn('providerLogin')
    const formData = multiPartData(payload);

    return dispatch => {
       dispatch(providerUpdateInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/profile_gallery_update`, formData, {
                headers: { Authorization: `${token}` }
            })
                .then(response => {
                  const data = response.data
                    if (data.status && data.status == 200) {
                        dispatch(providerUpdateSuccess(data))
                    } else {
                      dispatch(providerUpdateFailure(data))
                    }
                    resolve(data);
                })
                .catch(err => {
                    dispatch(providerUpdateFailure(err))
                    reject(err);
                })
        );
    }
}

export function providerGalleryRemoveUpdate(payload,type) {
    const token = isProviderLoggedIn('providerLogin')

    return dispatch => {
       dispatch(providerUpdateInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/profile_gallery_remove_update`, payload, {
                headers: { Authorization: `${token}` }
            })
                .then(response => {
                  const data = response.data
                    if (data.status && data.status == 200) {
                        dispatch(providerUpdateSuccess(data))
                    } else {
                      dispatch(providerUpdateFailure(data))
                    }
                    resolve(data);
                })
                .catch(err => {
                    dispatch(providerUpdateFailure(err))
                    reject(err);
                })
        );
    }
}

export function providerPasswordUpdate(payload,type) {
    const token = isProviderLoggedIn('providerLogin')
    return dispatch => {
       dispatch(providerPasswordUpdateInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/password_update`, payload, {
                headers: { Authorization: `${token}` }
            })
                .then(response => {
                  const data = response.data
                    if (data.status && data.status == 200) {
                        dispatch(providerPasswordUpdateSuccess(data))
                    }
                    else{
                      dispatch(providerPasswordUpdateFailure(data))
                    }
                    resolve(data);
                })
                .catch(err => {
                    dispatch(providerPasswordUpdateFailure(err))
                    reject(err);
                })
        );
    }
}

export function garageReviews(payload,type) {
    const token = isProviderLoggedIn('providerLogin')
    return dispatch => {
       dispatch(garageReviewsInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.get(`${url}provider/reviews`, {
                headers: { Authorization: `${token}` }
            })
                .then(response => {
                  const data = response.data
                  
                    if (data.code && data.code == 200) {
                        dispatch(garageReviewsSuccess(data))
                    }
                    else{
                      dispatch(garageReviewsFailure(data))
                    }
                    resolve(data);
                })
                .catch(err => {
                    dispatch(garageReviewsFailure(err))
                    reject(err);
                })
        );
    }
}

export function dealerReviews(payload,type) {
    const token = isProviderLoggedIn('providerLogin')
    return dispatch => {
       dispatch(dealerReviewsInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/reviews`, payload, {
                headers: { Authorization: `${token}` }
            })
                .then(response => {
                  const data = response.data
                    if (data.status && data.status == 200) {
                        dispatch(dealerReviewsSuccess(data))
                    }
                    else{
                      dispatch(dealerReviewsFailure(data))
                    }
                    resolve(data);
                })
                .catch(err => {
                    dispatch(dealerReviewsFailure(err))
                    reject(err);
                })
        );
    }
}

export function salesReviews(payload,type) {
    const token = isProviderLoggedIn('providerLogin')
    return dispatch => {
       dispatch(salesReviewsInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/reviews`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.status && data.status == 200) {
                    dispatch(salesReviewsSuccess(data))
                }
                else{
                    dispatch(salesReviewsFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(salesReviewsFailure(err))
                reject(err);
            })
        );
    }
}

export function corporateReviews(payload,type) {
    const token = isProviderLoggedIn('providerLogin')
    return dispatch => {
       dispatch(corporateReviewsInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/reviews`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.status && data.status == 200) {
                    dispatch(corporateReviewsSuccess(data))
                }
                else{
                    dispatch(corporateReviewsFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(corporateReviewsFailure(err))
                reject(err);
            })
        );
    }
}


export function garageReplyCreate(payload,type) {
    const token = isProviderLoggedIn('providerLogin')
    return dispatch => {
       dispatch(replyInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/reviews/reply`, payload, {
                headers: { Authorization: `${token}` }
            }).then(response => {
                const data = response.data
                
                if (data.code && data.code == 200) {
                    dispatch(replySuccess(data))
                }
                else{
                    dispatch(replyFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(replyFailure(err))
                reject(err);
            })
        );
    }
}

export function dealerReplyCreate(payload,type) {
    const token = isProviderLoggedIn('providerLogin')
    return dispatch => {
       dispatch(replyInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/reviews/reply`, payload, {
                headers: { Authorization: `${token}` }
            }).then(response => {
                const data = response.data
                
                if (data.code && data.code == 200) {
                    dispatch(replySuccess(data))
                }
                else{
                    dispatch(replyFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(replyFailure(err))
                reject(err);
            })
        );
    }
}

export function salesReplyCreate(payload,type) {
    const token = isProviderLoggedIn('providerLogin')
    return dispatch => {
       dispatch(replyInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/reviews/reply`, payload, {
                headers: { Authorization: `${token}` }
            }).then(response => {
                const data = response.data
                
                if (data.code && data.code == 200) {
                    dispatch(replySuccess(data))
                }
                else{
                    dispatch(replyFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(replyFailure(err))
                reject(err);
            })
        );
    }
}

export function corporateReplyCreate(payload,type) {
    const token = isProviderLoggedIn('providerLogin')
    return dispatch => {
       dispatch(replyInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/reviews/reply`, payload, {
                headers: { Authorization: `${token}` }
            }).then(response => {
                const data = response.data
                
                if (data.code && data.code == 200) {
                    dispatch(replySuccess(data))
                }
                else{
                    dispatch(replyFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(replyFailure(err))
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