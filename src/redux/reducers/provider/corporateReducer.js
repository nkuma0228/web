import { corporateAction } from "../../actionTypes"
const initialState = {
    requestDataPending: {},
    requestDataAvailable: {},
    requestDataReject: {},
    requestCorporateDataCalendar: {},
    loader: false,
}

export default function corporateRequestData(state = initialState, {type, payload}) {
    
    switch(type) {
        case corporateAction.REQUEST_PENDING_INITIATE: {
            return {
                ...state, loader: true, requestDataPending: {}
            }
        }
        case corporateAction.REQUEST_PENDING_SUCCESS: {
            return {
                ...state, loader: false, requestDataPending: payload.data
            }
        }
        case corporateAction.REQUEST_PENDING_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case corporateAction.REQUEST_AVAILABLE_INITIATE: {
            return {
                ...state, loader: true, requestDataAvailable: {}
            }
        }
        case corporateAction.REQUEST_AVAILABLE_SUCCESS: {
            return {
                ...state, loader: false, requestDataAvailable: payload.data
            }
        }
        case corporateAction.REQUEST_AVAILABLE_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case corporateAction.REQUEST_REJECT_INITIATE: {
            return {
                ...state, loader: true, requestDataReject: {}
            }
        }
        case corporateAction.REQUEST_REJECT_SUCCESS: {
            return {
                ...state, loader: false, requestDataReject: payload.data
            }
        }
        case corporateAction.REQUEST_REJECT_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case corporateAction.REQUEST_STATUS_INITIATE: {
            return {
                ...state, loader: true
            }
        }
        case corporateAction.REQUEST_STATUS_SUCCESS: {
            return {
                ...state, loader: false
            }
        }
        case corporateAction.REQUEST_STATUS_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case corporateAction.CALENDAR_LIST_INITIATE: {
            return {
                ...state, loader: true, requestCorporateDataCalendar: {}
            }
        }
        case corporateAction.CALENDAR_LIST_SUCCESS: {
            return {
                ...state, loader: false, requestCorporateDataCalendar: payload.data
            }
        }
        case corporateAction.CALENDAR_LIST_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        default: 
            return state
    }
}