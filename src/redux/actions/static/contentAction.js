import { pageContentAction } from "../../actionTypes";
import { url } from "../../../config/config";
import axios from "axios";

// const token = isLoggedIn("clientData");

//--------------------Static-Content-------------------------

export const getPageDetailsInitiate = () => ({
    type: pageContentAction.GET_PAGE_DETAILS_INITIATE
})
export const getPageDetailsSuccess = (data) => ({
    type: pageContentAction.GET_PAGE_DETAILS_SUCCESS,
    payload:data
})
export const getPageDetailsFailure = (data) => ({
    type: pageContentAction.GET_PAGE_DETAILS_FAILURE,
})

export const newsletterSaveInitiate = () => ({
    type: pageContentAction.NEWSLETTER_SAVE_INITIATE
})
export const newsletterSaveSuccess = (data) => ({
    type: pageContentAction.NEWSLETTER_SAVE_SUCCESS,
    payload:data
})
export const newsletterSaveFailure = (data) => ({
    type: pageContentAction.NEWSLETTER_SAVE_FAILURE,
})

export function pageContent(payload,type) {
    
    return dispatch => {
        dispatch(getPageDetailsInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}admin/static/content`, payload)
            .then(response => {
                const data = response.data
                
                if (data.code && data.code == 200) {
                    dispatch(getPageDetailsSuccess(data))
                }
                else{
                    dispatch(getPageDetailsFailure())
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(getPageDetailsFailure(err))
                reject(err);
            })
        );
    }
}

export function newsletterSave(payload,type) {
    
    return dispatch => {
        dispatch(newsletterSaveInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}admin/newsletter/save`, payload)
            .then(response => {
                const data = response.data
                
                if (data.code && data.code == 200) {
                    dispatch(newsletterSaveSuccess(data))
                }
                else{
                    dispatch(newsletterSaveFailure())
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(newsletterSaveFailure(err))
                reject(err);
            })
        );
    }
}
