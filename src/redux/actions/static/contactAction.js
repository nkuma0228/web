import { pageContentAction } from "../../actionTypes";
import { url } from "../../../config/config";
import axios from "axios";

// const token = isLoggedIn("clientData");

//--------------------Static-Content-------------------------

export const saveContactInitiate = () => ({
    type: pageContentAction.SAVE_CONTACT_INITIATE
})
export const saveContactSuccess = (data) => ({
    type: pageContentAction.SAVE_CONTACT_SUCCESS,
    payload:data
})
export const saveContactFailure = (data) => ({
    type: pageContentAction.SAVE_CONTACT_FAILURE,
})

export function contactSave(payload,type) {
    
    return dispatch => {
        dispatch(saveContactInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}admin/contact/save`, payload)
            .then(response => {
                const data = response.data
                
                if (data.code && data.code == 200) {
                    dispatch(saveContactSuccess(data))
                }
                else{
                    dispatch(saveContactFailure())
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(saveContactFailure(err))
                reject(err);
            })
        );
    }
}
