import { salesAction } from "../../actionTypes";
import { url } from "../../../config/config";
import axios from "axios";
import {isLoggedIn} from "../../../utils";

//-------------------- DEALERGARAGE -------------------------

export const requestPendingInitiate = () => ({
    type: salesAction.REQUEST_PENDING_INITIATE
})
export const requestPendingSuccess = (data) => ({
    type: salesAction.REQUEST_PENDING_SUCCESS,
    payload:data
})
export const requestPendingFailure = (data) => ({
    type: salesAction.REQUEST_PENDING_FAILURE
})

export const requestCorporatePendingInitiate = () => ({
    type: salesAction.REQUEST_CORPORATE_PENDING_INITIATE
})
export const requestCorporatePendingSuccess = (data) => ({
    type: salesAction.REQUEST_CORPORATE_PENDING_SUCCESS,
    payload:data
})
export const requestCorporatePendingFailure = (data) => ({
    type: salesAction.REQUEST_CORPORATE_PENDING_FAILURE
})

export const requestAvailableInitiate = () => ({
    type: salesAction.REQUEST_AVAILABLE_INITIATE
})
export const requestAvailableSuccess = (data) => ({
    type: salesAction.REQUEST_AVAILABLE_SUCCESS,
    payload:data
})
export const requestAvailableFailure = (data) => ({
    type: salesAction.REQUEST_AVAILABLE_FAILURE
})

export const requestCorporateAvailableInitiate = () => ({
    type: salesAction.REQUEST_CORPORATE_AVAILABLE_INITIATE
})
export const requestCorporateAvailableSuccess = (data) => ({
    type: salesAction.REQUEST_CORPORATE_AVAILABLE_SUCCESS,
    payload:data
})
export const requestCorporateAvailableFailure = (data) => ({
    type: salesAction.REQUEST_CORPORATE_AVAILABLE_FAILURE
})

export const requestRejectInitiate = () => ({
    type: salesAction.REQUEST_REJECT_INITIATE
})
export const requestRejectSuccess = (data) => ({
    type: salesAction.REQUEST_REJECT_SUCCESS,
    payload:data
})
export const requestRejectFailure = (data) => ({
    type: salesAction.REQUEST_REJECT_FAILURE
})

export const requestCorporateRejectInitiate = () => ({
    type: salesAction.REQUEST_CORPORATE_REJECT_INITIATE
})
export const requestCorporateRejectSuccess = (data) => ({
    type: salesAction.REQUEST_CORPORATE_REJECT_SUCCESS,
    payload:data
})
export const requestCorporateRejectFailure = (data) => ({
    type: salesAction.REQUEST_CORPORATE_REJECT_FAILURE
})

export const requestStatusInitiate = () => ({
    type: salesAction.REQUEST_STATUS_INITIATE
})
export const requestStatusSuccess = (data) => ({
    type: salesAction.REQUEST_STATUS_SUCCESS,
    payload:data
})
export const requestStatusFailure = (data) => ({
    type: salesAction.REQUEST_STATUS_FAILURE
})

export const requestCorporateStatusInitiate = () => ({
    type: salesAction.REQUEST_CORPORATE_STATUS_INITIATE
})
export const requestCorporateStatusSuccess = (data) => ({
    type: salesAction.REQUEST_CORPORATE_STATUS_SUCCESS,
    payload:data
})
export const requestCorporateStatusFailure = (data) => ({
    type: salesAction.REQUEST_CORPORATE_STATUS_FAILURE
})

export const calendarListInitiate = () => ({
    type: salesAction.CALENDAR_LIST_INITIATE
})
export const calendarListSuccess = (data) => ({
    type: salesAction.CALENDAR_LIST_SUCCESS,
    payload:data
})
export const calendarListFailure = (data) => ({
    type: salesAction.CALENDAR_LIST_FAILURE
})

export const calendarDetailInitiate = () => ({
    type: salesAction.CALENDAR_DETAIL_INITIATE
})
export const calendarDetailSuccess = (data) => ({
    type: salesAction.CALENDAR_DETAIL_SUCCESS,
    payload:data
})
export const calendarDetailFailure = (data) => ({
    type: salesAction.CALENDAR_DETAIL_FAILURE
})

export const diagnosticQuoteInitiate = () => ({
    type: salesAction.DIAGNOSTIC_QUOTE_INITIATE
})
export const diagnosticQuoteSuccess = (data) => ({
    type: salesAction.DIAGNOSTIC_QUOTE_SUCCESS,
    payload:data
})
export const diagnosticQuoteFailure = (data) => ({
    type: salesAction.DIAGNOSTIC_QUOTE_FAILURE
})

export const mechanicAssignInitiate = () => ({
    type: salesAction.MECHANIC_ASSIGN_INITIATE
})
export const mechanicAssignSuccess = (data) => ({
    type: salesAction.MECHANIC_ASSIGN_SUCCESS,
    payload:data
})
export const mechanicAssignFailure = (data) => ({
    type: salesAction.MECHANIC_ASSIGN_FAILURE
})

export const agentCreateInitiate = () => ({
    type: salesAction.AGENT_CREATE_INITIATE
})
export const agentCreateSuccess = (data) => ({
    type: salesAction.AGENT_CREATE_SUCCESS,
    payload:data
})
export const agentCreateFailure = (data) => ({
    type: salesAction.AGENT_CREATE_FAILURE
})

export const agentDeleteInitiate = () => ({
    type: salesAction.AGENT_DELETE_INITIATE
})
export const agentDeleteSuccess = (data) => ({
    type: salesAction.AGENT_DELETE_SUCCESS,
    payload:data
})
export const agentDeleteFailure = (data) => ({
    type: salesAction.AGENT_DELETE_FAILURE
})

export const agentEditInitiate = () => ({
    type: salesAction.AGENT_EDIT_INITIATE
})
export const agentEditSuccess = (data) => ({
    type: salesAction.AGENT_EDIT_SUCCESS,
    payload:data
})
export const agentEditFailure = (data) => ({
    type: salesAction.AGENT_EDIT_FAILURE
})

export const agentListInitiate = () => ({
    type: salesAction.AGENT_LIST_INITIATE
})
export const agentListSuccess = (data) => ({
    type: salesAction.AGENT_LIST_SUCCESS,
    payload:data
})
export const agentListFailure = (data) => ({
    type: salesAction.AGENT_LIST_FAILURE
})

export const requestFutureInitiate = () => ({
    type: salesAction.REQUEST_FUTURE_INITIATE
})
export const requestFutureSuccess = (data) => ({
    type: salesAction.REQUEST_FUTURE_SUCCESS,
    payload:data
})
export const requestFutureFailure = (data) => ({
    type: salesAction.REQUEST_FUTURE_FAILURE
})

export const schedulingListInitiate = () => ({
    type: salesAction.SCHEDULING_LIST_INITIATE
})
export const schedulingListSuccess = (data) => ({
    type: salesAction.SCHEDULING_LIST_SUCCESS,
    payload:data
})
export const schedulingListFailure = (data) => ({
    type: salesAction.SCHEDULING_LIST_FAILURE
})

export const requestScheduleInitiate = () => ({
    type: salesAction.REQUEST_SCHEDULE_INITIATE
})
export const requestScheduleSuccess = (data) => ({
    type: salesAction.REQUEST_SCHEDULE_SUCCESS,
    payload:data
})
export const requestScheduleFailure = (data) => ({
    type: salesAction.REQUEST_SCHEDULE_FAILURE
})

export const requestPartsListInitiate = () => ({
    type: salesAction.REQUEST_PARTS_LIST_INITIATE
})
export const requestPartsListSuccess = (data) => ({
    type: salesAction.REQUEST_PARTS_LIST_SUCCESS,
    payload:data
})
export const requestPartsListFailure = (data) => ({
    type: salesAction.REQUEST_PARTS_LIST_FAILURE
})

export const requestPartsBookingInitiate = () => ({
    type: salesAction.REQUEST_PARTS_BOOKING_INITIATE
})
export const requestPartsBookingSuccess = (data) => ({
    type: salesAction.REQUEST_PARTS_BOOKING_SUCCESS,
    payload:data
})
export const requestPartsBookingFailure = (data) => ({
    type: salesAction.REQUEST_PARTS_BOOKING_FAILURE
})

export function requestPending(payload,type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(requestPendingInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/sales/requested_list`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                //console.log(data)
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

export function requestCorporatePending(payload,type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(requestPendingInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/sales/requested_corporate_list`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                //console.log(data)
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
            axios.post(`${url}provider/sales/requested_list`, payload, {
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

export function requestCorporateAvailable(payload,type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(requestAvailableInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/sales/requested_corporate_list`, payload, {
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
            axios.post(`${url}provider/sales/requested_list`, payload, {
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
            axios.post(`${url}provider/sales/requested_corporate_list`, payload, {
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
            axios.post(`${url}provider/sales/status/available`, payload, {
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

export function requestCorporateAvailableStatus(payload,type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(requestStatusInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/sales/status/availableCorporate`, payload, {
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

export function requestAccepted(payload,type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(requestStatusInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/sales/status/accepted`, payload, {
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

export function requestCorporateAccepted(payload,type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(requestStatusInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/sales/status/acceptedCorporate`, payload, {
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

export function requestRejectedSataus(payload,type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(requestStatusInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/sales/status/rejected`, payload, {
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

export function requestCorporateRejectedSataus(payload,type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(requestStatusInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/sales/status/rejectedCorporate`, payload, {
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

export function requestCalendar(payload,type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(calendarListInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.get(`${url}provider/sales/mycalendar`, {
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

export function requestCalendarDetail(payload,type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(calendarDetailInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/sales/mycalendar/detail`, payload, {
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

export function requestAppointmentCalendarDetail(payload,type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(calendarDetailInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/sales/mycalendar/appointment/detail`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                console.log(data)
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
            axios.post(`${url}provider/sales/status`, payload, {
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

export function schedulingList(payload,type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(schedulingListInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/sales/scheduling`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code && data.code == 200) {
                    console.log(data)
                    dispatch(schedulingListSuccess(data))
                }
                else {
                    dispatch(schedulingListFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(schedulingListFailure(err))
                reject(err);
            })
        );
    }
}

export function requestPartsQuotes(payload,type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(requestPartsListInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/garage/dealer_request_list`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                console.log(response)
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(requestPartsListSuccess(data))
                }
                else {
                    dispatch(requestPartsListFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(requestPartsListFailure(err))
                reject(err);
            })
        );
    }
}

export function submitPartsReject(payload,type) {
    
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(requestRejectInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/garage/dealer_reject_request`, payload, {
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

export function partsQuoteAccept(payload,type) {
    
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(requestScheduleInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/garage/dealer_accept_request`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(requestScheduleSuccess(data))
                }
                else {
                    dispatch(requestScheduleFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(requestScheduleFailure(err))
                reject(err);
            })
        );
    }
}

export function requestPartsBookings(payload,type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(requestPartsBookingInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/garage/dealer_request_booking_list`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(requestPartsBookingSuccess(data))
                }
                else {
                    dispatch(requestPartsBookingFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(requestPartsBookingFailure(err))
                reject(err);
            })
        );
    }
}

export function salesAgentCreate(payload,type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(agentCreateInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/sales/agent/add`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(agentCreateSuccess(data))
                }
                else {
                    dispatch(agentCreateFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(agentCreateFailure(err))
                reject(err);
            })
        );
    }
}

export function salesAgentRemove(payload,type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(agentDeleteInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/sales/agent/delete`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(agentDeleteSuccess(data))
                }
                else {
                    dispatch(agentDeleteFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(agentDeleteFailure(err))
                reject(err);
            })
        );
    }
}

export function salesAgentUpdate(payload,type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(agentEditInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/sales/agent/edit`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(agentEditSuccess(data))
                }
                else {
                    dispatch(agentEditFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(agentEditFailure(err))
                reject(err);
            })
        );
    }
}

export function salesAgentList(payload,type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(agentListInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.get(`${url}provider/sales/agent`, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(agentListSuccess(data))
                }
                else {
                    dispatch(agentListFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(agentListFailure(err))
                reject(err);
            })
        );
    }
}

export function appointmentCreate(payload, type) {
    
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(requestFutureInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/sales/appointment_request`, payload, {
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