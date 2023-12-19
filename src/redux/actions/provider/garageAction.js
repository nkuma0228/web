import { providerAction } from "../../actionTypes";
import { url } from "../../../config/config";
import axios from "axios";
import {isLoggedIn} from "../../../utils";

//-------------------- DEALERGARAGE -------------------------

export const requestPendingInitiate = () => ({
    type: providerAction.REQUEST_PENDING_INITIATE
})
export const requestPendingSuccess = (data) => ({
    type: providerAction.REQUEST_PENDING_SUCCESS,
    payload:data
})
export const requestPendingFailure = (data) => ({
    type: providerAction.REQUEST_PENDING_FAILURE
})

export const requestCorporatePendingInitiate = () => ({
    type: providerAction.REQUEST_CORPORATE_PENDING_INITIATE
})
export const requestCorporatePendingSuccess = (data) => ({
    type: providerAction.REQUEST_CORPORATE_PENDING_SUCCESS,
    payload:data
})
export const requestCorporatePendingFailure = (data) => ({
    type: providerAction.REQUEST_CORPORATE_PENDING_FAILURE
})

export const requestAvailableInitiate = () => ({
    type: providerAction.REQUEST_AVAILABLE_INITIATE
})
export const requestAvailableSuccess = (data) => ({
    type: providerAction.REQUEST_AVAILABLE_SUCCESS,
    payload:data
})
export const requestAvailableFailure = (data) => ({
    type: providerAction.REQUEST_AVAILABLE_FAILURE
})

export const requestCorporateAvailableInitiate = () => ({
    type: providerAction.REQUEST_CORPORATE_AVAILABLE_INITIATE
})
export const requestCorporateAvailableSuccess = (data) => ({
    type: providerAction.REQUEST_CORPORATE_AVAILABLE_SUCCESS,
    payload:data
})
export const requestCorporateAvailableFailure = (data) => ({
    type: providerAction.REQUEST_CORPORATE_AVAILABLE_FAILURE
})

export const requestRejectInitiate = () => ({
    type: providerAction.REQUEST_REJECT_INITIATE
})
export const requestRejectSuccess = (data) => ({
    type: providerAction.REQUEST_REJECT_SUCCESS,
    payload:data
})
export const requestRejectFailure = (data) => ({
    type: providerAction.REQUEST_REJECT_FAILURE
})

export const requestCorporateRejectInitiate = () => ({
    type: providerAction.REQUEST_CORPORATE_REJECT_INITIATE
})
export const requestCorporateRejectSuccess = (data) => ({
    type: providerAction.REQUEST_CORPORATE_REJECT_SUCCESS,
    payload:data
})
export const requestCorporateRejectFailure = (data) => ({
    type: providerAction.REQUEST_CORPORATE_REJECT_FAILURE
})

export const requestStatusInitiate = () => ({
    type: providerAction.REQUEST_STATUS_INITIATE
})
export const requestStatusSuccess = (data) => ({
    type: providerAction.REQUEST_STATUS_SUCCESS,
    payload:data
})
export const requestStatusFailure = (data) => ({
    type: providerAction.REQUEST_STATUS_FAILURE
})

export const calendarListInitiate = () => ({
    type: providerAction.CALENDAR_LIST_INITIATE
})
export const calendarListSuccess = (data) => ({
    type: providerAction.CALENDAR_LIST_SUCCESS,
    payload:data
})
export const calendarListFailure = (data) => ({
    type: providerAction.CALENDAR_LIST_FAILURE
})

export const calendarDetailInitiate = () => ({
    type: providerAction.CALENDAR_DETAIL_INITIATE
})
export const calendarDetailSuccess = (data) => ({
    type: providerAction.CALENDAR_DETAIL_SUCCESS,
    payload:data
})
export const calendarDetailFailure = (data) => ({
    type: providerAction.CALENDAR_DETAIL_FAILURE
})

export const calendarFutureDetailInitiate = () => ({
    type: providerAction.CALENDAR_FUTURE_DETAIL_INITIATE
})
export const calendarFutureDetailSuccess = (data) => ({
    type: providerAction.CALENDAR_FUTURE_DETAIL_SUCCESS,
    payload:data
})
export const calendarFutureDetailFailure = (data) => ({
    type: providerAction.CALENDAR_FUTURE_DETAIL_FAILURE
})

export const diagnosticQuoteInitiate = () => ({
    type: providerAction.DIAGNOSTIC_QUOTE_INITIATE
})
export const diagnosticQuoteSuccess = (data) => ({
    type: providerAction.DIAGNOSTIC_QUOTE_SUCCESS,
    payload:data
})
export const diagnosticQuoteFailure = (data) => ({
    type: providerAction.DIAGNOSTIC_QUOTE_FAILURE
})

export const mechanicAssignInitiate = () => ({
    type: providerAction.MECHANIC_ASSIGN_INITIATE
})
export const mechanicAssignSuccess = (data) => ({
    type: providerAction.MECHANIC_ASSIGN_SUCCESS,
    payload:data
})
export const mechanicAssignFailure = (data) => ({
    type: providerAction.MECHANIC_ASSIGN_FAILURE
})

export const mechanicCreateInitiate = () => ({
    type: providerAction.MECHANIC_CREATE_INITIATE
})
export const mechanicCreateSuccess = (data) => ({
    type: providerAction.MECHANIC_CREATE_SUCCESS,
    payload:data
})
export const mechanicCreateFailure = (data) => ({
    type: providerAction.MECHANIC_CREATE_FAILURE
})

export const mechanicDeleteInitiate = () => ({
    type: providerAction.MECHANIC_DELETE_INITIATE
})
export const mechanicDeleteSuccess = (data) => ({
    type: providerAction.MECHANIC_DELETE_SUCCESS,
    payload:data
})
export const mechanicDeleteFailure = (data) => ({
    type: providerAction.MECHANIC_DELETE_FAILURE
})

export const mechanicEditInitiate = () => ({
    type: providerAction.MECHANIC_EDIT_INITIATE
})
export const mechanicEditSuccess = (data) => ({
    type: providerAction.MECHANIC_EDIT_SUCCESS,
    payload:data
})
export const mechanicEditFailure = (data) => ({
    type: providerAction.MECHANIC_EDIT_FAILURE
})

export const mechanicListInitiate = () => ({
    type: providerAction.MECHANIC_LIST_INITIATE
})
export const mechanicListSuccess = (data) => ({
    type: providerAction.MECHANIC_LIST_SUCCESS,
    payload:data
})
export const mechanicListFailure = (data) => ({
    type: providerAction.MECHANIC_LIST_FAILURE
})

export const schedulingListInitiate = () => ({
    type: providerAction.SCHEDULING_LIST_INITIATE
})
export const schedulingListSuccess = (data) => ({
    type: providerAction.SCHEDULING_LIST_SUCCESS,
    payload:data
})
export const schedulingListFailure = (data) => ({
    type: providerAction.SCHEDULING_LIST_FAILURE
})

export const requestScheduleInitiate = () => ({
    type: providerAction.REQUEST_SCHEDULE_INITIATE
})
export const requestScheduleSuccess = (data) => ({
    type: providerAction.REQUEST_SCHEDULE_SUCCESS,
    payload:data
})
export const requestScheduleFailure = (data) => ({
    type: providerAction.REQUEST_SCHEDULE_FAILURE
})

export const requestPartsListInitiate = () => ({
    type: providerAction.REQUEST_PARTS_LIST_INITIATE
})
export const requestPartsListSuccess = (data) => ({
    type: providerAction.REQUEST_PARTS_LIST_SUCCESS,
    payload:data
})
export const requestPartsListFailure = (data) => ({
    type: providerAction.REQUEST_PARTS_LIST_FAILURE
})

export const requestPartsBookingInitiate = () => ({
    type: providerAction.REQUEST_PARTS_BOOKING_INITIATE
})
export const requestPartsBookingSuccess = (data) => ({
    type: providerAction.REQUEST_PARTS_BOOKING_SUCCESS,
    payload:data
})
export const requestPartsBookingFailure = (data) => ({
    type: providerAction.REQUEST_PARTS_BOOKING_FAILURE
})

export const clientHistoryInitiate = () => ({
    type: providerAction.CLIENT_HISTORY_INITIATE
})
export const clientHistorySuccess = (data) => ({
    type: providerAction.CLIENT_HISTORY_SUCCESS,
    payload:data
})
export const clientHistoryFailure = (data) => ({
    type: providerAction.CLIENT_HISTORY_FAILURE
})

export const territoryInitiate = () => ({
    type: providerAction.TERRITORY_INITIATE
})
export const territorySuccess = (data) => ({
    type: providerAction.TERRITORY_SUCCESS,
    payload:data
})
export const territoryFailure = (data) => ({
    type: providerAction.TERRITORY_FAILURE
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

export const requestFutureInitiate = () => ({
    type: providerAction.REQUEST_FUTURE_INITIATE
})
export const requestFutureSuccess = (data) => ({
    type: providerAction.REQUEST_FUTURE_SUCCESS,
    payload:data
})
export const requestFutureFailure = (data) => ({
    type: providerAction.REQUEST_FUTURE_FAILURE
})

export const futureAppointmentListInitiate = () => ({
    type: providerAction.FUTURE_APPOINTMENT_LIST_INITIATE
})
export const futureAppointmentListSuccess = (data) => ({
    type: providerAction.FUTURE_APPOINTMENT_LIST_SUCCESS,
    payload:data
})
export const futureAppointmentListFailure = (data) => ({
    type: providerAction.FUTURE_APPOINTMENT_LIST_FAILURE
})


export const requestCorporateListInitiate = () => ({
    type: providerAction.REQUEST_CORPORATE_LIST_INITIATE
})
export const requestCorporateListSuccess = (data) => ({
    type: providerAction.REQUEST_CORPORATE_LIST_SUCCESS,
    payload:data
})
export const requestCorporateListFailure = (data) => ({
    type: providerAction.REQUEST_CORPORATE_LIST_FAILURE
})

export const requestCorporateBookingInitiate = () => ({
    type: providerAction.REQUEST_CORPORATE_BOOKING_INITIATE
})
export const requestCorporateBookingSuccess = (data) => ({
    type: providerAction.REQUEST_CORPORATE_BOOKING_SUCCESS,
    payload:data
})
export const requestCorporateBookingFailure = (data) => ({
    type: providerAction.REQUEST_CORPORATE_BOOKING_FAILURE
})

export function requestPending(payload,type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(requestPendingInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/garage/requested_list`, payload, {
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

export function requestCorporatePending(payload,type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(requestCorporatePendingInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/garage/corporate/requested_list`, payload, {
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
            axios.post(`${url}provider/garage/requested_list`, payload, {
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
       dispatch(requestCorporateAvailableInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/garage/corporate/requested_list`, payload, {
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
            axios.post(`${url}provider/garage/requested_list`, payload, {
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
       dispatch(requestCorporateRejectInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/garage/corporate/requested_list`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(requestCorporateRejectSuccess(data))
                }
                else {
                    dispatch(requestCorporateRejectFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(requestCorporateRejectFailure(err))
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
            axios.post(`${url}provider/garage/status/available`, payload, {
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
            axios.post(`${url}provider/garage/corporate/status/available`, payload, {
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
            axios.post(`${url}provider/garage/status/accepted`, payload, {
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
            axios.post(`${url}provider/garage/status/rejected`, payload, {
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
            axios.get(`${url}provider/garage/mycalendar`, {
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

export function requestCorporateCalendar(payload,type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(calendarListInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.get(`${url}provider/garage/corporate/mycalendar`, {
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

export function requestCalendarCorporateDetail(payload,type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(calendarDetailInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/garage/corporate/mycalendar/detail`, payload, {
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
            axios.post(`${url}provider/garage/mycalendar/appointment/detail`, payload, {
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
            axios.post(`${url}provider/garage/status`, payload, {
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

export function requestCorporateStatusChange(payload, type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(requestStatusInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/garage/corprate/status`, payload, {
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

export function requestMechanicAssign(payload,type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(mechanicAssignInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/garage/mechanic/assign`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(mechanicAssignSuccess(data))
                }
                else {
                    dispatch(mechanicAssignFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(mechanicAssignFailure(err))
                reject(err);
            })
        );
    }
}

export function diagnosticQuote(payload,type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(diagnosticQuoteInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/garage/diagnotic/quote`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(diagnosticQuoteSuccess(data))
                }
                else {
                    dispatch(diagnosticQuoteFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(diagnosticQuoteFailure(err))
                reject(err);
            })
        );
    }
}

export function diagnosticCorporateQuote(payload,type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(diagnosticQuoteInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/garage/corporate/diagnotic/quote`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(diagnosticQuoteSuccess(data))
                }
                else {
                    dispatch(diagnosticQuoteFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(diagnosticQuoteFailure(err))
                reject(err);
            })
        );
    }
}

export function mechanicCreate(payload,type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(mechanicCreateInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/garage/mechanic/add`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(mechanicCreateSuccess(data))
                }
                else {
                    dispatch(mechanicCreateFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(mechanicCreateFailure(err))
                reject(err);
            })
        );
    }
}

export function mechanicRemove(payload,type) {
    const token = isLoggedIn('providerLogin')
    console.log(payload)
    return dispatch => {
       dispatch(mechanicDeleteInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/garage/mechanic/delete`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(mechanicDeleteSuccess(data))
                }
                else {
                    dispatch(mechanicDeleteFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(mechanicDeleteFailure(err))
                reject(err);
            })
        );
    }
}

export function mechanicUpdate(payload,type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(mechanicEditInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/garage/mechanic/edit`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(mechanicEditSuccess(data))
                }
                else {
                    dispatch(mechanicEditFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(mechanicEditFailure(err))
                reject(err);
            })
        );
    }
}

export function mechanicList(payload,type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(mechanicListInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.get(`${url}provider/garage/mechanic`, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(mechanicListSuccess(data))
                }
                else {
                    dispatch(mechanicListFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(mechanicListFailure(err))
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
            axios.post(`${url}provider/garage/scheduling`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code && data.code == 200) {
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

export function requestHistory(payload,type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(clientHistoryInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/garage/history`, payload, {
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
            axios.post(`${url}provider/garage/territory`, payload, {
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
export function manufacturerList(payload,type) {
    let user=''
    return dispatch => {
       dispatch(manufacturerListInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.get(`${url}client/manufacturer/list`)
                .then(response => {
                  const data = response.data
                  console.log("data", data)
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

export function requestFutureAppointment(payload, type) {
    
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(requestFutureInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/garage/future_request`, payload, {
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

export function appointmentCreate(payload, type) {
    
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(requestFutureInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/garage/appointment_request`, payload, {
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
            axios.post(`${url}provider/garage/future_scheduling`, payload, {
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
            axios.post(`${url}provider/garage/future_scheduling/detail`, payload, {
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


export function requestCorporateQuotes(payload,type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(requestCorporateListInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/garage/corporate_request_list`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                console.log(response)
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(requestCorporateListSuccess(data))
                }
                else {
                    dispatch(requestCorporateListFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(requestCorporateListFailure(err))
                reject(err);
            })
        );
    }
}

export function submitCorporateReject(payload,type) {
    
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(requestRejectInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/garage/corporate_reject_request`, payload, {
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
export function corporateQuoteAccept(payload,type) {
    
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(requestScheduleInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/garage/corporate_accept_request`, payload, {
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

export function requestCorporateBookings(payload,type) {
    const token = isLoggedIn('providerLogin')
    return dispatch => {
       dispatch(requestCorporateBookingInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/garage/corporate_request_booking_list`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(requestCorporateBookingSuccess(data))
                }
                else {
                    dispatch(requestCorporateBookingFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(requestCorporateBookingFailure(err))
                reject(err);
            })
        );
    }
}