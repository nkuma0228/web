import { salesAction } from "../../actionTypes"
const initialState = {
    requestDataPending: {},
    requestDataAvailable: {},
    requestDataReject: {},
    requestDataCalendar: {},
    requestDataCalendarDetail: {},
    salesAgentListing: {},
    schedulingListing: {},
    requestGaragePartListingData: {},
    requestGaragePartBookingListingData: {},
    loader: false,
}

export default function salesRequestData(state = initialState, {type, payload}) {
    
    switch(type) {
        case salesAction.REQUEST_PENDING_INITIATE: {
            return {
                ...state, loader: true, requestDataPending: {}
            }
        }
        case salesAction.REQUEST_PENDING_SUCCESS: {
            return {
                ...state, loader: false, requestDataPending: payload.data
            }
        }
        case salesAction.REQUEST_PENDING_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case salesAction.REQUEST_AVAILABLE_INITIATE: {
            return {
                ...state, loader: true, requestDataAvailable: {}
            }
        }
        case salesAction.REQUEST_AVAILABLE_SUCCESS: {
            return {
                ...state, loader: false, requestDataAvailable: payload.data
            }
        }
        case salesAction.REQUEST_AVAILABLE_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case salesAction.REQUEST_REJECT_INITIATE: {
            return {
                ...state, loader: true, requestDataReject: {}
            }
        }
        case salesAction.REQUEST_REJECT_SUCCESS: {
            return {
                ...state, loader: false, requestDataReject: payload.data
            }
        }
        case salesAction.REQUEST_REJECT_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case salesAction.REQUEST_STATUS_INITIATE: {
            return {
                ...state, loader: true
            }
        }
        case salesAction.REQUEST_STATUS_SUCCESS: {
            return {
                ...state, loader: false
            }
        }
        case salesAction.REQUEST_STATUS_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case salesAction.CALENDAR_LIST_INITIATE: {
            return {
                ...state, loader: true, requestDataCalendar: {}
            }
        }
        case salesAction.CALENDAR_LIST_SUCCESS: {
            return {
                ...state, loader: false, requestDataCalendar: payload.data
            }
        }
        case salesAction.CALENDAR_LIST_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case salesAction.CALENDAR_DETAIL_INITIATE: {
            return {
                ...state, loader: true, requestDataCalendarDetail: {}
            }
        }
        case salesAction.CALENDAR_DETAIL_SUCCESS: {
            return {
                ...state, loader: false, requestDataCalendarDetail: payload.data
            }
        }
        case salesAction.CALENDAR_DETAIL_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case salesAction.DIAGNOSTIC_QUOTE_INITIATE: {
            return {
                ...state, loader: true,
            }
        }
        case salesAction.DIAGNOSTIC_QUOTE_SUCCESS: {
            return {
                ...state, loader: false,
            }
        }
        case salesAction.DIAGNOSTIC_QUOTE_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case salesAction.MECHANIC_ASSIGN_INITIATE: {
            return {
                ...state, loader: true,
            }
        }
        case salesAction.MECHANIC_ASSIGN_SUCCESS: {
            return {
                ...state, loader: false,
            }
        }
        case salesAction.MECHANIC_ASSIGN_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case salesAction.AGENT_CREATE_INITIATE: {
            return {
                ...state, loader: true
            }
        }
        case salesAction.AGENT_CREATE_SUCCESS: {
            return {
                ...state, loader: false
            }
        }
        case salesAction.AGENT_CREATE_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case salesAction.AGENT_DELETE_INITIATE: {
            return {
                ...state, loader: true
            }
        }
        case salesAction.AGENT_DELETE_SUCCESS: {
            return {
                ...state, loader: false
            }
        }
        case salesAction.AGENT_DELETE_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case salesAction.AGENT_EDIT_INITIATE: {
            return {
                ...state, loader: true
            }
        }
        case salesAction.AGENT_EDIT_SUCCESS: {
            return {
                ...state, loader: false
            }
        }
        case salesAction.AGENT_EDIT_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case salesAction.AGENT_LIST_INITIATE: {
            return {
                ...state, loader: true, salesAgentListing: {}
            }
        }
        case salesAction.AGENT_LIST_SUCCESS: {
            return {
                ...state, loader: false, salesAgentListing: payload.data
            }
        }
        case salesAction.AGENT_LIST_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case salesAction.SCHEDULING_LIST_INITIATE: {
            return {
                ...state, loader: true, schedulingListing: {}
            }
        }
        case salesAction.SCHEDULING_LIST_SUCCESS: {
            return {
                ...state, loader: false, schedulingListing: payload.data
            }
        }
        case salesAction.SCHEDULING_LIST_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case salesAction.REQUEST_PARTS_LIST_INITIATE: {
            return {
                ...state, loader: true, requestGaragePartListingData: {}
            }
        }
        case salesAction.REQUEST_PARTS_LIST_SUCCESS: {
            return {
                ...state, loader: false, requestGaragePartListingData: payload.data
            }
        }
        case salesAction.REQUEST_PARTS_LIST_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case salesAction.REQUEST_PARTS_BOOKING_INITIATE: {
            return {
                ...state, loader: true, requestGaragePartBookingListingData: {}
            }
        }
        case salesAction.REQUEST_PARTS_BOOKING_SUCCESS: {
            return {
                ...state, loader: false, requestGaragePartBookingListingData: payload.data
            }
        }
        case salesAction.REQUEST_PARTS_BOOKING_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        default: 
            return state
    }
}