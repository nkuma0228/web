import { clientAction } from "../../actionTypes";
import { url } from "../../../config/config";
import axios from "axios";
import {isLoggedIn} from "../../../utils";

//--------------------CLIENT-VEHICLE-------------------------

export const vehicleListInitiate = () => ({
    type: clientAction.VEHICLE_LIST_INITIATE
})
export const vehicleListSuccess = (data) => ({
    type: clientAction.VEHICLE_LIST_SUCCESS,
    payload:data
})
export const vehicleListFailure = (data) => ({
    type: clientAction.VEHICLE_LIST_FAILURE
})

export const garageMarkerListInitiate = () => ({
    type: clientAction.GARAGE_MARKER_LIST_INITIATE
})
export const garageMarkerListSuccess = (data) => ({
    type: clientAction.GARAGE_MARKER_LIST_SUCCESS,
    payload:data
})
export const garageMarkerListFailure = (data) => ({
    type: clientAction.GARAGE_MARKER_LIST_FAILURE
})

export const partsMarkerListInitiate = () => ({
    type: clientAction.PARTS_MARKER_LIST_INITIATE
})
export const partsMarkerListSuccess = (data) => ({
    type: clientAction.PARTS_MARKER_LIST_SUCCESS,
    payload:data
})
export const partsMarkerListFailure = (data) => ({
    type: clientAction.PARTS_MARKER_LIST_FAILURE
})

export const salesMarkerListInitiate = () => ({
    type: clientAction.SALES_MARKER_LIST_INITIATE
})
export const salesMarkerListSuccess = (data) => ({
    type: clientAction.SALES_MARKER_LIST_SUCCESS,
    payload:data
})
export const salesMarkerListFailure = (data) => ({
    type: clientAction.SALES_MARKER_LIST_FAILURE
})

export const corporateMarkerListInitiate = () => ({
    type: clientAction.CORPORATE_MARKER_LIST_INITIATE
})
export const corporateMarkerListSuccess = (data) => ({
    type: clientAction.CORPORATE_MARKER_LIST_SUCCESS,
    payload:data
})
export const corporateMarkerListFailure = (data) => ({
    type: clientAction.CORPORATE_MARKER_LIST_FAILURE
})

export const garageSearchInitiate = () => ({
    type: clientAction.GARAGE_SEARCH_INITIATE
})
export const garageSearchSuccess = (data) => ({
    type: clientAction.GARAGE_SEARCH_SUCCESS,
    payload:data
})
export const garageSearchFailure = (data) => ({
    type: clientAction.GARAGE_SEARCH_FAILURE
})

export const dealerSearchInitiate = () => ({
    type: clientAction.DEALER_SEARCH_INITIATE
})
export const dealerSearchSuccess = (data) => ({
    type: clientAction.DEALER_SEARCH_SUCCESS,
    payload:data
})
export const dealerSearchFailure = (data) => ({
    type: clientAction.DEALER_SEARCH_FAILURE
})

export const salesSearchInitiate = () => ({
    type: clientAction.SALES_SEARCH_INITIATE
})
export const salesSearchSuccess = (data) => ({
    type: clientAction.SALES_SEARCH_SUCCESS,
    payload:data
})
export const salesSearchFailure = (data) => ({
    type: clientAction.SALES_SEARCH_FAILURE
})

export const corporateSearchInitiate = () => ({
    type: clientAction.CORPORATE_SEARCH_INITIATE
})
export const corporateSearchSuccess = (data) => ({
    type: clientAction.CORPORATE_SEARCH_SUCCESS,
    payload:data
})
export const corporateSearchFailure = (data) => ({
    type: clientAction.CORPORATE_SEARCH_FAILURE
})

export function vehicleList(payload, type) {
    const token = isLoggedIn('clientLogin')
    return dispatch => {
       dispatch(vehicleListInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}client/vehicle`, payload, {
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
    const token = isLoggedIn('clientLogin')
    return dispatch => {
       dispatch(garageMarkerListInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}client/garage_marker`, payload, {
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
    const token = isLoggedIn('clientLogin')
    return dispatch => {
       dispatch(partsMarkerListInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}client/dealer_marker`, payload, {
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
    const token = isLoggedIn('clientLogin')
    return dispatch => {
       dispatch(salesMarkerListInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}client/sales_marker`, payload, {
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

export function corporateMarkerList(payload, type) {
    const token = isLoggedIn('clientLogin')
    return dispatch => {
       dispatch(corporateMarkerListInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}client/corporate_marker`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code == 200) {
                    dispatch(corporateMarkerListSuccess(data))
                }
                else {
                    dispatch(corporateMarkerListFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(corporateMarkerListFailure(err))
                reject(err);
            })
        );
    }
}

export function garageSearch(payload, type) {
    const token = isLoggedIn('clientLogin')
    return dispatch => {
       dispatch(garageSearchInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}client/garage_search`, payload, {
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
    const token = isLoggedIn('clientLogin')
    return dispatch => {
       dispatch(dealerSearchInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}client/dealer_search`, payload, {
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
    const token = isLoggedIn('clientLogin')
    return dispatch => {
       dispatch(salesSearchInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}client/sales_search`, payload, {
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

export function corporateSearch(payload, type) {
    const token = isLoggedIn('clientLogin')
    return dispatch => {
       dispatch(corporateSearchInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}client/corporate_search`, payload, {
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