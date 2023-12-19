import { pageContentAction } from "../../actionTypes";
import { url } from "../../../config/config";
import axios from "axios";

// const token = isLoggedIn("clientData");

//--------------------Static-Content-------------------------

export const getCareerInitiate = () => ({
    type: pageContentAction.GET_CAREER_INITIATE
})
export const getCareerSuccess = (data) => ({
    type: pageContentAction.GET_CAREER_SUCCESS,
    payload:data
})
export const getCareerFailure = (data) => ({
    type: pageContentAction.GET_CAREER_FAILURE,
})

export function getCareer(payload,type) {
    
    return dispatch => {
        dispatch(getCareerInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.get(`${url}admin/career/list`)
            .then(response => {
                const data = response.data
                
                if (data.code && data.code == 200) {
                    dispatch(getCareerSuccess(data))
                }
                else{
                    dispatch(getCareerFailure())
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(getCareerFailure(err))
                reject(err);
            })
        );
    }
}
