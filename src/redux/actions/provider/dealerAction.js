import { dealerAction } from "../../actionTypes";
import { url } from "../../../config/config";
import axios from "axios";
import {isLoggedIn} from "../../../utils";

//-------------------- DEALERGARAGE -------------------------

export const requestPendingInitiate = () => ({
    type: dealerAction.REQUEST_PENDING_INITIATE
})
export const requestPendingSuccess = (data) => ({
    type: dealerAction.REQUEST_PENDING_SUCCESS,
    payload:data
})
export const requestPendingFailure = (data) => ({
    type: dealerAction.REQUEST_PENDING_FAILURE
})

export const requestGaragePendingInitiate = () => ({
    type: dealerAction.REQUEST_GARAGE_PENDING_INITIATE
})
export const requestGaragePendingSuccess = (data) => ({
    type: dealerAction.REQUEST_GARAGE_PENDING_SUCCESS,
    payload:data
})
export const requestGaragePendingFailure = (data) => ({
    type: dealerAction.REQUEST_GARAGE_PENDING_FAILURE
})

export const requestCorporatePendingInitiate = () => ({
    type: dealerAction.REQUEST_CORPORATE_PENDING_INITIATE
})
export const requestCorporatePendingSuccess = (data) => ({
    type: dealerAction.REQUEST_CORPORATE_PENDING_SUCCESS,
    payload:data
})
export const requestCorporatePendingFailure = (data) => ({
    type: dealerAction.REQUEST_CORPORATE_PENDING_FAILURE
})

export const requestAvailableInitiate = () => ({
    type: dealerAction.REQUEST_AVAILABLE_INITIATE
})
export const requestAvailableSuccess = (data) => ({
    type: dealerAction.REQUEST_AVAILABLE_SUCCESS,
    payload:data
})
export const requestAvailableFailure = (data) => ({
    type: dealerAction.REQUEST_AVAILABLE_FAILURE
})

export const requestGarageAvailableInitiate = () => ({
    type: dealerAction.REQUEST_GARAGE_AVAILABLE_INITIATE
})
export const requestGarageAvailableSuccess = (data) => ({
    type: dealerAction.REQUEST_GARAGE_AVAILABLE_SUCCESS,
    payload:data
})
export const requestGarageAvailableFailure = (data) => ({
    type: dealerAction.REQUEST_GARAGE_AVAILABLE_FAILURE
})

export const requestCorporateAvailableInitiate = () => ({
    type: dealerAction.REQUEST_CORPORATE_AVAILABLE_INITIATE
})
export const requestCorporateAvailableSuccess = (data) => ({
    type: dealerAction.REQUEST_CORPORATE_AVAILABLE_SUCCESS,
    payload:data
})
export const requestCorporateAvailableFailure = (data) => ({
    type: dealerAction.REQUEST_CORPORATE_AVAILABLE_FAILURE
})

export const requestRejectInitiate = () => ({
    type: dealerAction.REQUEST_REJECT_INITIATE
})
export const requestRejectSuccess = (data) => ({
    type: dealerAction.REQUEST_REJECT_SUCCESS,
    payload:data
})
export const requestRejectFailure = (data) => ({
    type: dealerAction.REQUEST_REJECT_FAILURE
})

export const requestUserInitiate = () => ({
    type: dealerAction.REQUEST_USER_INITIATE
})
export const requestUserSuccess = (data) => ({
    type: dealerAction.REQUEST_USER_SUCCESS,
    payload:data
})
export const requestUserFailure = (data) => ({
    type: dealerAction.REQUEST_USER_FAILURE
})

export const requestGarageInitiate = () => ({
    type: dealerAction.REQUEST_GARAGE_INITIATE
})
export const requestGarageSuccess = (data) => ({
    type: dealerAction.REQUEST_GARAGE_SUCCESS,
    payload:data
})
export const requestGarageFailure = (data) => ({
    type: dealerAction.REQUEST_GARAGE_FAILURE
})

export const requestCorporateInitiate = () => ({
    type: dealerAction.REQUEST_CORPORATE_INITIATE
})
export const requestCorporateSuccess = (data) => ({
    type: dealerAction.REQUEST_CORPORATE_SUCCESS,
    payload:data
})
export const requestCorporateFailure = (data) => ({
    type: dealerAction.REQUEST_CORPORATE_FAILURE
})

export const requestStatusInitiate = () => ({
    type: dealerAction.REQUEST_STATUS_INITIATE
})
export const requestStatusSuccess = (data) => ({
    type: dealerAction.REQUEST_STATUS_SUCCESS,
    payload:data
})
export const requestStatusFailure = (data) => ({
    type: dealerAction.REQUEST_STATUS_FAILURE
})

export const calendarListInitiate = () => ({
    type: dealerAction.CALENDAR_LIST_INITIATE
})
export const calendarListSuccess = (data) => ({
    type: dealerAction.CALENDAR_LIST_SUCCESS,
    payload:data
})
export const calendarListFailure = (data) => ({
    type: dealerAction.CALENDAR_LIST_FAILURE
})

export const calendarGarageListInitiate = () => ({
    type: dealerAction.CALENDAR_GARAGE_LIST_INITIATE
})
export const calendarGarageListSuccess = (data) => ({
    type: dealerAction.CALENDAR_GARAGE_LIST_SUCCESS,
    payload:data
})
export const calendarGarageListFailure = (data) => ({
    type: dealerAction.CALENDAR_GARAGE_LIST_FAILURE
})

export const calendarCorporateListInitiate = () => ({
    type: dealerAction.CALENDAR_CORPORATE_LIST_INITIATE
})
export const calendarCorporateListSuccess = (data) => ({
    type: dealerAction.CALENDAR_CORPORATE_LIST_SUCCESS,
    payload:data
})
export const calendarCorporateListFailure = (data) => ({
    type: dealerAction.CALENDAR_CORPORATE_LIST_FAILURE
})

export const calendarDetailInitiate = () => ({
    type: dealerAction.CALENDAR_DETAIL_INITIATE
})
export const calendarDetailSuccess = (data) => ({
    type: dealerAction.CALENDAR_DETAIL_SUCCESS,
    payload:data
})
export const calendarDetailFailure = (data) => ({
    type: dealerAction.CALENDAR_DETAIL_FAILURE
})

export const diagnosticQuoteInitiate = () => ({
    type: dealerAction.DIAGNOSTIC_QUOTE_INITIATE
})
export const diagnosticQuoteSuccess = (data) => ({
    type: dealerAction.DIAGNOSTIC_QUOTE_SUCCESS,
    payload:data
})
export const diagnosticQuoteFailure = (data) => ({
    type: dealerAction.DIAGNOSTIC_QUOTE_FAILURE
})

export const manufacturerListInitiate = () => ({
    type: dealerAction.MANUFACTURER_LIST_INITIATE
})
export const manufacturerListSuccess = (data) => ({
    type: dealerAction.MANUFACTURER_LIST_SUCCESS,
    payload:data
})
export const manufacturerListFailure = (data) => ({
    type: dealerAction.MANUFACTURER_LIST_FAILURE
})

export const modelListInitiate = () => ({
    type: dealerAction.MODEL_LIST_INITIATE
})
export const modelListSuccess = (data) => ({
    type: dealerAction.MODEL_LIST_SUCCESS,
    payload:data
})
export const modelListFailure = (data) => ({
    type: dealerAction.MODEL_LIST_FAILURE
})

export const clientHistoryInitiate = () => ({
    type: dealerAction.CLIENT_HISTORY_INITIATE
})
export const clientHistorySuccess = (data) => ({
    type: dealerAction.CLIENT_HISTORY_SUCCESS,
    payload:data
})
export const clientHistoryFailure = (data) => ({
    type: dealerAction.CLIENT_HISTORY_FAILURE
})

export const territoryInitiate = () => ({
    type: dealerAction.TERRITORY_INITIATE
})
export const territorySuccess = (data) => ({
    type: dealerAction.TERRITORY_SUCCESS,
    payload:data
})
export const territoryFailure = (data) => ({
    type: dealerAction.TERRITORY_FAILURE
})

export const requestFutureInitiate = () => ({
    type: dealerAction.REQUEST_FUTURE_INITIATE
})
export const requestFutureSuccess = (data) => ({
    type: dealerAction.REQUEST_FUTURE_SUCCESS,
    payload:data
})
export const requestFutureFailure = (data) => ({
    type: dealerAction.REQUEST_FUTURE_FAILURE
})

export const futureAppointmentListInitiate = () => ({
    type: dealerAction.FUTURE_APPOINTMENT_LIST_INITIATE
})
export const futureAppointmentListSuccess = (data) => ({
    type: dealerAction.FUTURE_APPOINTMENT_LIST_SUCCESS,
    payload:data
})
export const futureAppointmentListFailure = (data) => ({
    type: dealerAction.FUTURE_APPOINTMENT_LIST_FAILURE
})

export const calendarFutureDetailInitiate = () => ({
    type: dealerAction.CALENDAR_FUTURE_DETAIL_INITIATE
})
export const calendarFutureDetailSuccess = (data) => ({
    type: dealerAction.CALENDAR_FUTURE_DETAIL_SUCCESS,
    payload:data
})
export const calendarFutureDetailFailure = (data) => ({
    type: dealerAction.CALENDAR_FUTURE_DETAIL_FAILURE
})

export function requestPending(payload,type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(requestPendingInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/dealer/requested_list`, payload, {
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
       dispatch(requestGaragePendingInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/dealer/garage_requested_list`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(requestGaragePendingSuccess(data))
                }
                else {
                    dispatch(requestGaragePendingFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(requestGaragePendingFailure(err))
                reject(err);
            })
        );
    }
}

export function requestCorporatePending(payload,type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(requestCorporatePendingInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/dealer/corporate_requested_list`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(requestCorporatePendingSuccess(data))
                }
                else {
                    dispatch(requestCorporatePendingFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(requestCorporatePendingFailure(err))
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
            axios.post(`${url}provider/dealer/requested_list`, payload, {
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

export function requestGarageAvailable(payload,type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(requestGarageAvailableInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/dealer/garage_requested_list`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(requestGarageAvailableSuccess(data))
                }
                else {
                    dispatch(requestGarageAvailableFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(requestGarageAvailableFailure(err))
                reject(err);
            })
        );
    }
}

export function requestCorporateAvailable(payload,type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(requestCorporateAvailableInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/dealer/corporate_requested_list`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(requestCorporateAvailableSuccess(data))
                }
                else {
                    dispatch(requestCorporateAvailableFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(requestCorporateAvailableFailure(err))
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
            axios.post(`${url}provider/dealer/requested_list`, payload, {
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

export function requestGarageRejected(payload,type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(requestRejectInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/dealer/garage_requested_list`, payload, {
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

export function requestCorporateRejected(payload,type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(requestRejectInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/dealer/corporate_requested_list`, payload, {
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
            axios.post(`${url}provider/dealer/status/available`, payload, {
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

export function requestRejectedStatus(payload,type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(requestStatusInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/dealer/status/rejected`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                console.log(data)
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

export function fetchUser(payload,type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(requestUserInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/dealer/user`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(requestUserSuccess(data))
                }
                else {
                    dispatch(requestUserFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(requestUserFailure(err))
                reject(err);
            })
        );
    }
}

export function fetchGarage(payload,type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(requestGarageInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/dealer/garage`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(requestGarageSuccess(data))
                }
                else {
                    dispatch(requestGarageFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(requestGarageFailure(err))
                reject(err);
            })
        );
    }
}

export function fetchCorporate(payload,type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(requestCorporateInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/dealer/corporate`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(requestCorporateSuccess(data))
                }
                else {
                    dispatch(requestCorporateFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(requestCorporateFailure(err))
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
            axios.get(`${url}provider/dealer/mycalendar`, {
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
       dispatch(calendarGarageListInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.get(`${url}provider/dealer/garage/mycalendar`, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                console.log(data)
                if (data.code && data.code == 200) {
                    dispatch(calendarGarageListSuccess(data))
                }
                else {
                    dispatch(calendarGarageListFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(calendarGarageListFailure(err))
                reject(err);
            })
        );
    }
}

export function requestCorporateCalendar(payload,type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(calendarCorporateListInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.get(`${url}provider/dealer/corporate/mycalendar`, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                console.log(data)
                if (data.code && data.code == 200) {
                    dispatch(calendarCorporateListSuccess(data))
                }
                else {
                    dispatch(calendarCorporateListFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(calendarCorporateListFailure(err))
                reject(err);
            })
        );
    }
}

export function requestAccepted(payload,type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(requestStatusInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/dealer/status/available`, payload, {
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

export function requestCalendarDetail(payload,type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(calendarDetailInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/garage/mycalendar/detail`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(calendarDetailSuccess(data))
                }
                else {
                    dispatch(calendarDetailFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(calendarDetailFailure(err))
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
            axios.post(`${url}provider/dealer/status`, payload, {
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

export function requestDiagnotic(payload,type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(requestStatusInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/garage/status/diagnotic`, payload, {
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

export function requestHistory(payload,type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(clientHistoryInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/dealer/history`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(clientHistorySuccess(data))
                }
                else {
                    dispatch(clientHistoryFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(clientHistoryFailure(err))
                reject(err);
            })
        );
    }
}

export function territoryListing(payload,type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(territoryInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/dealer/territory`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(territorySuccess(data))
                }
                else {
                    dispatch(territoryFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(territoryFailure(err))
                reject(err);
            })
        );
    }
}

export function requestFutureAppointment(payload, type) {
    
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(requestFutureInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/sales/future_request`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(requestFutureSuccess(data))
                }
                else {
                    dispatch(requestFutureFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(requestFutureFailure(err))
                reject(err);
            })
        );
    }
}

export function futureAppointmentList(payload,type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(futureAppointmentListInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/dealer/future_scheduling`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(futureAppointmentListSuccess(data))
                }
                else {
                    dispatch(futureAppointmentListFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(futureAppointmentListFailure(err))
                reject(err);
            })
        );
    }
}

export function requestFutureCalendarDetail(payload,type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(calendarFutureDetailInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/dealer/future_scheduling/detail`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                
                if (data.code && data.code == 200) {
                    dispatch(calendarFutureDetailSuccess(data))
                }
                else {
                    dispatch(calendarFutureDetailFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(calendarFutureDetailFailure(err))
                reject(err);
            })
        );
    }
}