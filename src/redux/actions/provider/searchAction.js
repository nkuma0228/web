import { providerAction } from "../../actionTypes";
import { url } from "../../../config/config";
import axios from "axios";
import {isLoggedIn} from "../../../utils";

//--------------------CLIENT-VEHICLE-------------------------

export const vehicleListInitiate = () => ({
    type: providerAction.VEHICLE_LIST_INITIATE
})
export const vehicleListSuccess = (data) => ({
    type: providerAction.VEHICLE_LIST_SUCCESS,
    payload:data
})
export const vehicleListFailure = (data) => ({
    type: providerAction.VEHICLE_LIST_FAILURE
})

export const dealerSearchInitiate = () => ({
    type: providerAction.DEALER_SEARCH_INITIATE
})
export const dealerSearchSuccess = (data) => ({
    type: providerAction.DEALER_SEARCH_SUCCESS,
    payload:data
})
export const dealerSearchFailure = (data) => ({
    type: providerAction.DEALER_SEARCH_FAILURE
})

export const searchDealerDetailInitiate = () => ({
    type: providerAction.SEARCH_DEALER_DETAIL_INITIATE
})
export const searchDealerDetailSuccess = (data) => ({
    type: providerAction.SEARCH_DEALER_DETAIL_SUCCESS,
    payload:data
})
export const searchDealerDetailFailure = (data) => ({
    type: providerAction.SEARCH_DEALER_DETAIL_FAILURE
})

export const requestCreateInitiate = () => ({
    type: providerAction.REQUEST_DEALER_CREATE_INITIATE
})
export const requestCreateSuccess = (data) => ({
    type: providerAction.REQUEST_DEALER_CREATE_SUCCESS,
    payload:data
})
export const requestCreateFailure = (data) => ({
    type: providerAction.REQUEST_DEALER_CREATE_FAILURE
})

export const manufacturerListInitiate = () => ({
    type: providerAction.MANUFACTURER_LIST_INITIATE
})
export const manufacturerListSuccess = (data) => ({
    type: providerAction.MANUFACTURER_LIST_SUCCESS,
    payload:data
})
export const manufacturerListFailure = (data) => ({
    type: providerAction.MANUFACTURER_LIST_FAILURE
})

export const modelListInitiate = () => ({
    type: providerAction.MODEL_LIST_INITIATE
})
export const modelListSuccess = (data) => ({
    type: providerAction.MODEL_LIST_SUCCESS,
    payload:data
})
export const modelListFailure = (data) => ({
    type: providerAction.MODEL_LIST_FAILURE
})

export const partsMarkerListInitiate = () => ({
    type: providerAction.PARTS_MARKER_LIST_INITIATE
})
export const partsMarkerListSuccess = (data) => ({
    type: providerAction.PARTS_MARKER_LIST_SUCCESS,
    payload:data
})
export const partsMarkerListFailure = (data) => ({
    type: providerAction.PARTS_MARKER_LIST_FAILURE
})

export const corporateSearchInitiate = () => ({
    type: providerAction.CORPORATE_SEARCH_INITIATE
})
export const corporateSearchSuccess = (data) => ({
    type: providerAction.CORPORATE_SEARCH_SUCCESS,
    payload:data
})
export const corporateSearchFailure = (data) => ({
    type: providerAction.CORPORATE_SEARCH_FAILURE
})

export function vehicleList(payload, type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(vehicleListInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/garage/vehicle`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                console.log(data)
                if (data.code == 200) {
                    dispatch(vehicleListSuccess(data))
                }
                else {
                    dispatch(vehicleListFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(vehicleListFailure(err))
                reject(err);
            })
        );
    }
}

export function partsMarkerList(payload, type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(partsMarkerListInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/garage/dealer_marker`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code == 200) {
                    dispatch(partsMarkerListSuccess(data))
                }
                else {
                    dispatch(partsMarkerListFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(partsMarkerListFailure(err))
                reject(err);
            })
        );
    }
}

export function dealerSearch(payload, type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(dealerSearchInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/garage/dealer_search`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                //console.log("search api===>",data);
                if (data.code == 200) {
                    dispatch(dealerSearchSuccess(data))
                }
                else {
                    dispatch(dealerSearchFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(dealerSearchFailure(err))
                reject(err);
            })
        );
    }
}

export function providerDetails(payload, type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(searchDealerDetailInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/garage/dealer/detail`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code == 200) {
                    dispatch(searchDealerDetailSuccess(data))
                }
                else {
                    dispatch(searchDealerDetailFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(searchDealerDetailFailure(err))
                reject(err);
            })
        );
    }
}

export function requestDealerCreate(payload,type) {
    const token = isLoggedIn('providerLogin')
    
    return dispatch => {
       dispatch(requestCreateInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/garage/dealer_request`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                console.log("request resposne", response.data)
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(requestCreateSuccess(data))
                }
                else {
                    dispatch(requestCreateFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(requestCreateFailure(err))
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
            axios.get(`${url}provider/garage/manufacturer/list`)
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
            axios.post(`${url}provider/garage/model/list`, payload)
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

export function corporateSearch(payload, type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(corporateSearchInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/garage/corporate_search`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                //console.log("search api===>",data);
                if (data.code == 200) {
                    dispatch(corporateSearchSuccess(data))
                }
                else {
                    dispatch(corporateSearchFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(corporateSearchFailure(err))
                reject(err);
            })
        );
    }
}

export function requestCorporateCreate(payload,type) {
    const token = isLoggedIn('providerLogin')
    
    return dispatch => {
       dispatch(requestCreateInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/garage/corporate_request`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                console.log("request resposne", response.data)
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(requestCreateSuccess(data))
                }
                else {
                    dispatch(requestCreateFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(requestCreateFailure(err))
                reject(err);
            })
        );
    }
}