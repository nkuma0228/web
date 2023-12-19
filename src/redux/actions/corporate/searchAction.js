import { corporateAction } from "../../actionTypes";
import { url } from "../../../config/config";
import axios from "axios";
import {isCorporateLoggedIn} from "../../../utils";

//--------------------CLIENT-VEHICLE-------------------------

export const vehicleListInitiate = () => ({
    type: corporateAction.VEHICLE_LIST_INITIATE
})
export const vehicleListSuccess = (data) => ({
    type: corporateAction.VEHICLE_LIST_SUCCESS,
    payload:data
})
export const vehicleListFailure = (data) => ({
    type: corporateAction.VEHICLE_LIST_FAILURE
})

export const garageMarkerListInitiate = () => ({
    type: corporateAction.GARAGE_MARKER_LIST_INITIATE
})
export const garageMarkerListSuccess = (data) => ({
    type: corporateAction.GARAGE_MARKER_LIST_SUCCESS,
    payload:data
})
export const garageMarkerListFailure = (data) => ({
    type: corporateAction.GARAGE_MARKER_LIST_FAILURE
})

export const partsMarkerListInitiate = () => ({
    type: corporateAction.PARTS_MARKER_LIST_INITIATE
})
export const partsMarkerListSuccess = (data) => ({
    type: corporateAction.PARTS_MARKER_LIST_SUCCESS,
    payload:data
})
export const partsMarkerListFailure = (data) => ({
    type: corporateAction.PARTS_MARKER_LIST_FAILURE
})

export const salesMarkerListInitiate = () => ({
    type: corporateAction.SALES_MARKER_LIST_INITIATE
})
export const salesMarkerListSuccess = (data) => ({
    type: corporateAction.SALES_MARKER_LIST_SUCCESS,
    payload:data
})
export const salesMarkerListFailure = (data) => ({
    type: corporateAction.SALES_MARKER_LIST_FAILURE
})

export const garageSearchInitiate = () => ({
    type: corporateAction.GARAGE_SEARCH_INITIATE
})
export const garageSearchSuccess = (data) => ({
    type: corporateAction.GARAGE_SEARCH_SUCCESS,
    payload:data
})
export const garageSearchFailure = (data) => ({
    type: corporateAction.GARAGE_SEARCH_FAILURE
})

export const dealerSearchInitiate = () => ({
    type: corporateAction.DEALER_SEARCH_INITIATE
})
export const dealerSearchSuccess = (data) => ({
    type: corporateAction.DEALER_SEARCH_SUCCESS,
    payload:data
})
export const dealerSearchFailure = (data) => ({
    type: corporateAction.DEALER_SEARCH_FAILURE
})

export const salesSearchInitiate = () => ({
    type: corporateAction.SALES_SEARCH_INITIATE
})
export const salesSearchSuccess = (data) => ({
    type: corporateAction.SALES_SEARCH_SUCCESS,
    payload:data
})
export const salesSearchFailure = (data) => ({
    type: corporateAction.SALES_SEARCH_FAILURE
})

export function vehicleList(payload, type) {
    const token = isCorporateLoggedIn('corporateLogin')
    return dispatch => {
       dispatch(vehicleListInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}corporate/vehicle`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                
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

export function garageMarkerList(payload, type) {
    const token = isCorporateLoggedIn('corporateLogin')
    return dispatch => {
       dispatch(garageMarkerListInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}corporate/garage_marker`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code == 200) {
                    dispatch(garageMarkerListSuccess(data))
                }
                else {
                    dispatch(garageMarkerListFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(garageMarkerListFailure(err))
                reject(err);
            })
        );
    }
}

export function partsMarkerList(payload, type) {
    const token = isCorporateLoggedIn('corporateLogin')
    return dispatch => {
       dispatch(partsMarkerListInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}corporate/dealer_marker`, payload, {
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

export function salesMarkerList(payload, type) {
    const token = isCorporateLoggedIn('corporateLogin')
    return dispatch => {
       dispatch(salesMarkerListInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}corporate/sales_marker`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                console.log(data)
                if (data.code == 200) {
                    dispatch(salesMarkerListSuccess(data))
                }
                else {
                    dispatch(salesMarkerListFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(salesMarkerListFailure(err))
                reject(err);
            })
        );
    }
}

export function garageSearch(payload, type) {
    const token = isCorporateLoggedIn('corporateLogin')
    return dispatch => {
       dispatch(garageSearchInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}corporate/garage_search`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                //console.log("search api===>",data);
                if (data.code == 200) {
                    dispatch(garageSearchSuccess(data))
                }
                else {
                    dispatch(garageSearchFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(garageSearchFailure(err))
                reject(err);
            })
        );
    }
}

export function dealerSearch(payload, type) {
    const token = isCorporateLoggedIn('corporateLogin')
    return dispatch => {
       dispatch(dealerSearchInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}corporate/dealer_search`, payload, {
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

export function salesSearch(payload, type) {
    const token = isCorporateLoggedIn('corporateLogin')
    return dispatch => {
       dispatch(salesSearchInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}corporate/sales_search`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                //console.log("search api===>",data);
                if (data.code == 200) {
                    dispatch(salesSearchSuccess(data))
                }
                else {
                    dispatch(salesSearchFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(salesSearchFailure(err))
                reject(err);
            })
        );
    }
}