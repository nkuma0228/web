import { corporateAction } from "../../actionTypes";
import { url } from "../../../config/config";
import axios from "axios";
import {isCorporateLoggedIn, multiPartData} from "../../../utils";

//-------------------- DEALERGARAGE -------------------------

export const garageViewInitiate = () => ({
    type: corporateAction.GARAGE_VIEW_INITIATE
})
export const garageViewSuccess = (data) => ({
    type: corporateAction.GARAGE_VIEW_SUCCESS,
    payload:data
})
export const garageViewFailure = (data) => ({
    type: corporateAction.GARAGE_VIEW_FAILURE
})

export const dealerViewInitiate = () => ({
    type: corporateAction.DEALER_VIEW_INITIATE
})
export const dealerViewSuccess = (data) => ({
    type: corporateAction.DEALER_VIEW_SUCCESS,
    payload:data
})
export const dealerViewFailure = (data) => ({
    type: corporateAction.DEALER_VIEW_FAILURE
})

export const salesViewInitiate = () => ({
    type: corporateAction.SALES_VIEW_INITIATE
})
export const salesViewSuccess = (data) => ({
    type: corporateAction.SALES_VIEW_SUCCESS,
    payload:data
})
export const salesViewFailure = (data) => ({
    type: corporateAction.SALES_VIEW_FAILURE
})

export const requestCreateInitiate = () => ({
    type: corporateAction.REQUEST_CREATE_INITIATE
})
export const requestCreateSuccess = (data) => ({
    type: corporateAction.REQUEST_CREATE_SUCCESS,
    payload:data
})
export const requestCreateFailure = (data) => ({
    type: corporateAction.REQUEST_CREATE_FAILURE
})

export const requestGarageListInitiate = () => ({
    type: corporateAction.REQUEST_GARAGE_LIST_INITIATE
})
export const requestGarageListSuccess = (data) => ({
    type: corporateAction.REQUEST_GARAGE_LIST_SUCCESS,
    payload:data
})
export const requestGarageListFailure = (data) => ({
    type: corporateAction.REQUEST_GARAGE_LIST_FAILURE
})

export const requestScheduleInitiate = () => ({
    type: corporateAction.REQUEST_SCHEDULE_INITIATE
})
export const requestScheduleSuccess = (data) => ({
    type: corporateAction.REQUEST_SCHEDULE_SUCCESS,
    payload:data
})
export const requestScheduleFailure = (data) => ({
    type: corporateAction.REQUEST_SCHEDULE_FAILURE
})

export const requestReScheduleInitiate = () => ({
    type: corporateAction.REQUEST_RESCHEDULE_INITIATE
})
export const requestReScheduleSuccess = (data) => ({
    type: corporateAction.REQUEST_RESCHEDULE_SUCCESS,
    payload:data
})
export const requestReScheduleFailure = (data) => ({
    type: corporateAction.REQUEST_RESCHEDULE_FAILURE
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

export const requestGarageUpcomingInitiate = () => ({
    type: corporateAction.REQUEST_GARAGE_UPCOMING_INITIATE
})
export const requestGarageUpcomingSuccess = (data) => ({
    type: corporateAction.REQUEST_GARAGE_UPCOMING_SUCCESS,
    payload:data
})
export const requestGarageUpcomingFailure = (data) => ({
    type: corporateAction.REQUEST_GARAGE_UPCOMING_FAILURE
})

export const requestGarageOngoingInitiate = () => ({
    type: corporateAction.REQUEST_GARAGE_ONGOING_INITIATE
})
export const requestGarageOngoingSuccess = (data) => ({
    type: corporateAction.REQUEST_GARAGE_ONGOING_SUCCESS,
    payload:data
})
export const requestGarageOngoingFailure = (data) => ({
    type: corporateAction.REQUEST_GARAGE_ONGOING_FAILURE
})

export const requestGarageCompletedInitiate = () => ({
    type: corporateAction.REQUEST_GARAGE_COMPLETED_INITIATE
})
export const requestGarageCompletedSuccess = (data) => ({
    type: corporateAction.REQUEST_GARAGE_COMPLETED_SUCCESS,
    payload:data
})
export const requestGarageCompletedFailure = (data) => ({
    type: corporateAction.REQUEST_GARAGE_COMPLETED_FAILURE
})

export const requestPartsUpcomingInitiate = () => ({
    type: corporateAction.REQUEST_PARTS_UPCOMING_INITIATE
})
export const requestPartsUpcomingSuccess = (data) => ({
    type: corporateAction.REQUEST_PARTS_UPCOMING_SUCCESS,
    payload:data
})
export const requestPartsUpcomingFailure = (data) => ({
    type: corporateAction.REQUEST_PARTS_UPCOMING_FAILURE
})
export const requestPartsOngoingInitiate = () => ({
    type: corporateAction.REQUEST_PARTS_ONGOING_INITIATE
})
export const requestPartsOngoingSuccess = (data) => ({
    type: corporateAction.REQUEST_PARTS_ONGOING_SUCCESS,
    payload:data
})
export const requestPartsOngoingFailure = (data) => ({
    type: corporateAction.REQUEST_PARTS_ONGOING_FAILURE
})

export const requestPartsCompletedInitiate = () => ({
    type: corporateAction.REQUEST_PARTS_COMPLETED_INITIATE
})
export const requestPartsCompletedSuccess = (data) => ({
    type: corporateAction.REQUEST_PARTS_COMPLETED_SUCCESS,
    payload:data
})
export const requestPartsCompletedFailure = (data) => ({
    type: corporateAction.REQUEST_PARTS_COMPLETED_FAILURE
})

export const acceptBookingInitiate = () => ({
    type: corporateAction.ACCEPT_BOOKING_INITIATE
})
export const acceptBookingSuccess = (data) => ({
    type: corporateAction.ACCEPT_BOOKING_SUCCESS,
    payload:data
})
export const acceptBookingFailure = (data) => ({
    type: corporateAction.ACCEPT_BOOKING_FAILURE
})

export const ratingCreateInitiate = () => ({
    type: corporateAction.RATING_CREATE_INITIATE
})
export const ratingCreateSuccess = (data) => ({
    type: corporateAction.RATING_CREATE_SUCCESS,
    payload:data
})
export const ratingCreateFailure = (data) => ({
    type: corporateAction.RATING_CREATE_FAILURE
})

export const requestPartsListInitiate = () => ({
    type: corporateAction.REQUEST_PARTS_LIST_INITIATE
})
export const requestPartsListSuccess = (data) => ({
    type: corporateAction.REQUEST_PARTS_LIST_SUCCESS,
    payload:data
})
export const requestPartsListFailure = (data) => ({
    type: corporateAction.REQUEST_PARTS_LIST_FAILURE
})

export const garageReviewsInitiate = () => ({
    type: corporateAction.GARAGE_REVIEWS_INITIATE
})
export const garageReviewsSuccess = (data) => ({
    type: corporateAction.GARAGE_REVIEWS_SUCCESS,
    payload:data
})
export const garageReviewsFailure = (data) => ({
    type: corporateAction.GARAGE_REVIEWS_FAILURE,
})

export const dealerReviewsInitiate = () => ({
    type: corporateAction.DEALER_REVIEWS_INITIATE
})
export const dealerReviewsSuccess = (data) => ({
    type: corporateAction.DEALER_REVIEWS_SUCCESS,
    payload:data
})
export const dealerReviewsFailure = (data) => ({
    type: corporateAction.DEALER_REVIEWS_FAILURE,
})

export const salesReviewsInitiate = () => ({
    type: corporateAction.SALES_REVIEWS_INITIATE
})
export const salesReviewsSuccess = (data) => ({
    type: corporateAction.SALES_REVIEWS_SUCCESS,
    payload:data
})
export const salesReviewsFailure = (data) => ({
    type: corporateAction.SALES_REVIEWS_FAILURE,
})

export const requestSalesListInitiate = () => ({
    type: corporateAction.REQUEST_SALES_LIST_INITIATE
})
export const requestSalesListSuccess = (data) => ({
    type: corporateAction.REQUEST_SALES_LIST_SUCCESS,
    payload:data
})
export const requestSalesListFailure = (data) => ({
    type: corporateAction.REQUEST_SALES_LIST_FAILURE
})

export const requestSalesUpcomingInitiate = () => ({
    type: corporateAction.REQUEST_SALES_UPCOMING_INITIATE
})
export const requestSalesUpcomingSuccess = (data) => ({
    type: corporateAction.REQUEST_SALES_UPCOMING_SUCCESS,
    payload:data
})
export const requestSalesUpcomingFailure = (data) => ({
    type: corporateAction.REQUEST_SALES_UPCOMING_FAILURE
})
export const requestSalesOngoingInitiate = () => ({
    type: corporateAction.REQUEST_SALES_ONGOING_INITIATE
})
export const requestSalesOngoingSuccess = (data) => ({
    type: corporateAction.REQUEST_SALES_ONGOING_SUCCESS,
    payload:data
})
export const requestSalesOngoingFailure = (data) => ({
    type: corporateAction.REQUEST_SALES_ONGOING_FAILURE
})

export const requestSalesCompletedInitiate = () => ({
    type: corporateAction.REQUEST_SALES_COMPLETED_INITIATE
})
export const requestSalesCompletedSuccess = (data) => ({
    type: corporateAction.REQUEST_SALES_COMPLETED_SUCCESS,
    payload:data
})
export const requestSalesCompletedFailure = (data) => ({
    type: corporateAction.REQUEST_SALES_COMPLETED_FAILURE
})

export function garageView(payload,type) {
    const token = isCorporateLoggedIn('corporateLogin')
    return dispatch => {
       dispatch(garageViewInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}corporate/provider_detail`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(garageViewSuccess(data))
                }
                else {
                    dispatch(garageViewFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(garageViewFailure(err))
                reject(err);
            })
        );
    }
}

export function dealerView(payload,type) {
    const token = isCorporateLoggedIn('corporateLogin')
    return dispatch => {
       dispatch(dealerViewInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}corporate/provider_detail`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(dealerViewSuccess(data))
                }
                else {
                    dispatch(dealerViewFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(dealerViewFailure(err))
                reject(err);
            })
        );
    }
}

export function salesView(payload,type) {
    const token = isCorporateLoggedIn('corporateLogin')

    //console.log("payload", payload)

    return dispatch => {
       dispatch(salesViewInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}corporate/provider_detail`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                //console.log("response", data)
                if (data.code && data.code == 200) {
                    dispatch(salesViewSuccess(data))
                }
                else {
                    dispatch(salesViewFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(salesViewFailure(err))
                reject(err);
            })
        );
    }
}

export function requestCreate(payload,type) {
    const token = isCorporateLoggedIn('corporateLogin')
    const formData = multiPartData(payload);
    return dispatch => {
       dispatch(requestCreateInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}corporate/garage_request`, formData, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
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

export function requestDealerCreate(payload,type) {
    const token = isCorporateLoggedIn('corporateLogin')
    //console.log(payload)
    return dispatch => {
       dispatch(requestCreateInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}corporate/dealer_request`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
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

export function requestSalesCreate(payload,type) {
    const token = isCorporateLoggedIn('corporateLogin')
    
    return dispatch => {
       dispatch(requestCreateInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}corporate/sales_request`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
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

export function requestGarages(payload,type) {
    const token = isCorporateLoggedIn('corporateLogin')
    //console.log(token)
    return dispatch => {
       dispatch(requestGarageListInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}corporate/garage_request_list`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(requestGarageListSuccess(data))
                }
                else {
                    dispatch(requestGarageListFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(requestGarageListFailure(err))
                reject(err);
            })
        );
    }
}

export function submitSchedule(payload,type) {
    
    const token = isCorporateLoggedIn('corporateLogin')
    return dispatch => {
       dispatch(requestScheduleInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}corporate/garage_schedule_request`, payload, {
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

export function submitReSchedule(payload,type) {
    
    const token = isCorporateLoggedIn('corporateLogin')
    return dispatch => {
       dispatch(requestReScheduleInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}corporate/garage_reschedule_request`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(requestReScheduleSuccess(data))
                }
                else {
                    dispatch(requestReScheduleFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(requestReScheduleFailure(err))
                reject(err);
            })
        );
    }
}

export function submitReject(payload,type) {
    
    const token = isCorporateLoggedIn('corporateLogin')
    return dispatch => {
       dispatch(requestRejectInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}corporate/garage_reject_request`, payload, {
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

export function upcomingBookings(payload,type) {
    const token = isCorporateLoggedIn('corporateLogin')
    return dispatch => {
       dispatch(requestGarageUpcomingInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}corporate/mybooking/upcoming`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(requestGarageUpcomingSuccess(data))
                }
                else {
                    dispatch(requestGarageUpcomingFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(requestGarageUpcomingFailure(err))
                reject(err);
            })
        );
    }
}
export function ongoingBookings(payload,type) {
    const token = isCorporateLoggedIn('corporateLogin')
    return dispatch => {
       dispatch(requestGarageOngoingInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}corporate/mybooking/ongoing`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(requestGarageOngoingSuccess(data))
                }
                else {
                    dispatch(requestGarageOngoingFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(requestGarageOngoingFailure(err))
                reject(err);
            })
        );
    }
}
export function completedBookings(payload,type) {
    const token = isCorporateLoggedIn('corporateLogin')
    return dispatch => {
       dispatch(requestGarageCompletedInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}corporate/mybooking/completed`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(requestGarageCompletedSuccess(data))
                }
                else {
                    dispatch(requestGarageCompletedFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(requestGarageCompletedFailure(err))
                reject(err);
            })
        );
    }
}

export function AcceptBooking(payload,type) {
    const token = isCorporateLoggedIn('corporateLogin')
    return dispatch => {
       dispatch(acceptBookingInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}corporate/mybooking/accept`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(acceptBookingSuccess(data))
                }
                else {
                    dispatch(acceptBookingFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(acceptBookingFailure(err))
                reject(err);
            })
        );
    }
}
export function ratingCreate(payload,type) {
    const token = isCorporateLoggedIn('corporateLogin')
    return dispatch => {
       dispatch(ratingCreateInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}corporate/mybooking/rating`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(ratingCreateSuccess(data))
                }
                else {
                    dispatch(ratingCreateFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(ratingCreateFailure(err))
                reject(err);
            })
        );
    }
}

export function requestPartsQuotes(payload,type) {
    const token = isCorporateLoggedIn('corporateLogin')
    return dispatch => {
       dispatch(requestPartsListInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}corporate/dealer_request_list`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
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
    
    const token = isCorporateLoggedIn('corporateLogin')
    return dispatch => {
       dispatch(requestRejectInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}corporate/dealer_reject_request`, payload, {
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
    
    const token = isCorporateLoggedIn('corporateLogin')
    return dispatch => {
       dispatch(requestScheduleInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}corporate/dealer_accept_request`, payload, {
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

export function upcomingPartsBookings(payload,type) {
    const token = isCorporateLoggedIn('corporateLogin')
    return dispatch => {
       dispatch(requestPartsUpcomingInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}corporate/dealer/mybooking/upcoming`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(requestPartsUpcomingSuccess(data))
                }
                else {
                    dispatch(requestPartsUpcomingFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(requestPartsUpcomingFailure(err))
                reject(err);
            })
        );
    }
}
export function ongoingPartsBookings(payload,type) {
    const token = isCorporateLoggedIn('corporateLogin')
    return dispatch => {
       dispatch(requestPartsOngoingInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}corporate/dealer/mybooking/ongoing`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(requestPartsOngoingSuccess(data))
                }
                else {
                    dispatch(requestPartsOngoingFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(requestPartsOngoingFailure(err))
                reject(err);
            })
        );
    }
}
export function completedPartsBookings(payload,type) {
    const token = isCorporateLoggedIn('corporateLogin')
    return dispatch => {
       dispatch(requestPartsCompletedInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}corporate/dealer/mybooking/completed`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(requestPartsCompletedSuccess(data))
                }
                else {
                    dispatch(requestPartsCompletedFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(requestPartsCompletedFailure(err))
                reject(err);
            })
        );
    }
}

export function garageReviews(payload,type) {
    const token = isCorporateLoggedIn('corporateLogin')
    return dispatch => {
       dispatch(garageReviewsInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.get(`${url}corporate/provider/reviews`, {
                headers: { Authorization: `${token}` }
            })
                .then(response => {
                  const data = response.data
                  
                    if (data.code && data.code == 200) {
                        dispatch(garageReviewsSuccess(data))
                    }
                    else{
                      dispatch(garageReviewsFailure(data))
                    }
                    resolve(data);
                })
                .catch(err => {
                    dispatch(garageReviewsFailure(err))
                    reject(err);
                })
        );
    }
}

export function dealerReviews(payload,type) {
    const token = isCorporateLoggedIn('corporateLogin')
    return dispatch => {
       dispatch(dealerReviewsInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}corporate/provider/reviews`, payload, {
                headers: { Authorization: `${token}` }
            })
                .then(response => {
                  const data = response.data
                    if (data.status && data.status == 200) {
                        dispatch(dealerReviewsSuccess(data))
                    }
                    else{
                      dispatch(dealerReviewsFailure(data))
                    }
                    resolve(data);
                })
                .catch(err => {
                    dispatch(dealerReviewsFailure(err))
                    reject(err);
                })
        );
    }
}

export function salesReviews(payload,type) {
    const token = isCorporateLoggedIn('corporateLogin')
    return dispatch => {
       dispatch(salesReviewsInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}corporate/provider/reviews`, payload, {
                headers: { Authorization: `${token}` }
            })
                .then(response => {
                  const data = response.data
                    if (data.status && data.status == 200) {
                        dispatch(salesReviewsSuccess(data))
                    }
                    else{
                      dispatch(salesReviewsFailure(data))
                    }
                    resolve(data);
                })
                .catch(err => {
                    dispatch(salesReviewsFailure(err))
                    reject(err);
                })
        );
    }
}

export function requestSalesQuotes(payload,type) {
    const token = isCorporateLoggedIn('corporateLogin')
    return dispatch => {
       dispatch(requestSalesListInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}corporate/sales_request_list`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(requestSalesListSuccess(data))
                }
                else {
                    dispatch(requestSalesListFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(requestSalesListFailure(err))
                reject(err);
            })
        );
    }
}
export function submitSalesReject(payload,type) {
    
    const token = isCorporateLoggedIn('corporateLogin')
    return dispatch => {
       dispatch(requestRejectInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}corporate/sales_reject_request`, payload, {
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
export function salesQuoteAccept(payload,type) {
    
    const token = isCorporateLoggedIn('corporateLogin')
    return dispatch => {
       dispatch(requestScheduleInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}corporate/sales_accept_request`, payload, {
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

export function upcomingSalesBookings(payload,type) {
    const token = isCorporateLoggedIn('corporateLogin')
    return dispatch => {
       dispatch(requestSalesUpcomingInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}corporate/sales/mybooking/upcoming`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(requestSalesUpcomingSuccess(data))
                }
                else {
                    dispatch(requestSalesUpcomingFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(requestSalesUpcomingFailure(err))
                reject(err);
            })
        );
    }
}
export function ongoingSalesBookings(payload,type) {
    const token = isCorporateLoggedIn('corporateLogin')
    return dispatch => {
       dispatch(requestSalesOngoingInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}corporate/sales/mybooking/ongoing`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(requestSalesOngoingSuccess(data))
                }
                else {
                    dispatch(requestSalesOngoingFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(requestSalesOngoingFailure(err))
                reject(err);
            })
        );
    }
}
export function completedSalesBookings(payload,type) {
    const token = isCorporateLoggedIn('corporateLogin')
    return dispatch => {
       dispatch(requestSalesCompletedInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}corporate/sales/mybooking/completed`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(requestSalesCompletedSuccess(data))
                }
                else {
                    dispatch(requestSalesCompletedFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(requestSalesCompletedFailure(err))
                reject(err);
            })
        );
    }
}

export function ratingSalesCreate(payload,type) {
    const token = isCorporateLoggedIn('corporateLogin')
    return dispatch => {
       dispatch(ratingCreateInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}corporate/mySalesBooking/rating`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(ratingCreateSuccess(data))
                }
                else {
                    dispatch(ratingCreateFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(ratingCreateFailure(err))
                reject(err);
            })
        );
    }
}