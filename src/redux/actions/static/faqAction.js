import { pageContentAction } from "../../actionTypes";
import { url } from "../../../config/config";
import axios from "axios";

// const token = isLoggedIn("clientData");

//--------------------Static-Content-------------------------

export const getFaqInitiate = () => ({
    type: pageContentAction.GET_FAQ_INITIATE
})
export const getFaqSuccess = (data) => ({
    type: pageContentAction.GET_FAQ_SUCCESS,
    payload:data
})
export const getFaqFailure = (data) => ({
    type: pageContentAction.GET_FAQ_FAILURE,
})

export function getFaq(payload,type) {
    
    return dispatch => {
        dispatch(getFaqInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.get(`${url}admin/faq/list`)
            .then(response => {
                const data = response.data
                
                if (data.code && data.code == 200) {
                    dispatch(getFaqSuccess(data))
                }
                else{
                    dispatch(getFaqFailure())
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(getFaqFailure(err))
                reject(err);
            })
        );
    }
}
