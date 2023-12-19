import { corporateAction } from "../../actionTypes";
import { url } from "../../../config/config";
import axios from "axios";
import {isLoggedIn} from "../../../utils";

//-------------------- Corporate -------------------------

export const requestPendingInitiate = () => ({
    type: corporateAction.REQUEST_PENDING_INITIATE
})
export const requestPendingSuccess = (data) => ({
    type: corporateAction.REQUEST_PENDING_SUCCESS,
    payload:data
})
export const requestPendingFailure = (data) => ({
    type: corporateAction.REQUEST_PENDING_FAILURE
})

export const requestAvailableInitiate = () => ({
    type: corporateAction.REQUEST_AVAILABLE_INITIATE
})
export const requestAvailableSuccess = (data) => ({
    type: corporateAction.REQUEST_AVAILABLE_SUCCESS,
    payload:data
})
export const requestAvailableFailure = (data) => ({
    type: corporateAction.REQUEST_AVAILABLE_FAILURE
})

export const requestRejectInitiate = () => ({
    type: corporateAction.REQUEST_REJECT_INITIATE
})
export const requestRejectSuccess = (data) => ({
    type: corporateAction.REQUEST_REJECT_SUCCESS,
    payload:data
})
export const requestRejectFailure = (data) => ({
    type: corporateAction.REQUEST_REJECT_FAILURE
})

export const requestStatusInitiate = () => ({
    type: corporateAction.REQUEST_STATUS_INITIATE
})
export const requestStatusSuccess = (data) => ({
    type: corporateAction.REQUEST_STATUS_SUCCESS,
    payload:data
})
export const requestStatusFailure = (data) => ({
    type: corporateAction.REQUEST_STATUS_FAILURE
})

export const calendarListInitiate = () => ({
    type: corporateAction.CALENDAR_LIST_INITIATE
})
export const calendarListSuccess = (data) => ({
    type: corporateAction.CALENDAR_LIST_SUCCESS,
    payload:data
})
export const calendarListFailure = (data) => ({
    type: corporateAction.CALENDAR_LIST_FAILURE
})


export function requestPending(payload,type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(requestPendingInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/corporate/requested_list`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(requestPendingSuccess(data))
                }
                else {
                    dispatch(requestPendingFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(requestPendingFailure(err))
                reject(err);
            })
        );
    }
}

export function requestGaragePending(payload,type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(requestPendingInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/corporate/garage_requested_list`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(requestPendingSuccess(data))
                }
                else {
                    dispatch(requestPendingFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(requestPendingFailure(err))
                reject(err);
            })
        );
    }
}

export function requestDealerPending(payload,type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(requestPendingInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/corporate/dealer_requested_list`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(requestPendingSuccess(data))
                }
                else {
                    dispatch(requestPendingFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(requestPendingFailure(err))
                reject(err);
            })
        );
    }
}

export function requestAvailable(payload,type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(requestAvailableInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/corporate/requested_list`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(requestAvailableSuccess(data))
                }
                else {
                    dispatch(requestAvailableFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(requestAvailableFailure(err))
                reject(err);
            })
        );
    }
}

export function requestRejected(payload,type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(requestRejectInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/corporate/requested_list`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(requestRejectSuccess(data))
                }
                else {
                    dispatch(requestRejectFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(requestRejectFailure(err))
                reject(err);
            })
        );
    }
}

export function requestAvailableStatus(payload,type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(requestStatusInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/corporate/status/available`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(requestStatusSuccess(data))
                }
                else {
                    dispatch(requestStatusFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(requestStatusFailure(err))
                reject(err);
            })
        );
    }
}

export function requestRejectedSataus(payload,type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(requestStatusInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/corporate/status/rejected`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(requestStatusSuccess(data))
                }
                else {
                    dispatch(requestStatusFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(requestStatusFailure(err))
                reject(err);
            })
        );
    }
}

export function requestCalendar(payload,type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(calendarListInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.get(`${url}provider/corporate/mycalendar`, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(calendarListSuccess(data))
                }
                else {
                    dispatch(calendarListFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(calendarListFailure(err))
                reject(err);
            })
        );
    }
}

export function requestGarageCalendar(payload,type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(calendarListInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.get(`${url}provider/corporate/mycalendar/garage`, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(calendarListSuccess(data))
                }
                else {
                    dispatch(calendarListFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(calendarListFailure(err))
                reject(err);
            })
        );
    }
}

export function requestDealerCalendar(payload,type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(calendarListInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.get(`${url}provider/corporate/mycalendar/dealer`, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(calendarListSuccess(data))
                }
                else {
                    dispatch(calendarListFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(calendarListFailure(err))
                reject(err);
            })
        );
    }
}

export function requestStatusChange(payload, type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(requestStatusInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/corporate/status`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(requestStatusSuccess(data))
                }
                else {
                    dispatch(requestStatusFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(requestStatusFailure(err))
                reject(err);
            })
        );
    }
}