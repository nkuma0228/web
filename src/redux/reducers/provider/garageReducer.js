import { providerAction } from "../../actionTypes"
const initialState = {
    requestDataPending: {},
    requestDataAvailable: {},
    requestDataReject: {},
    requestDataCalendar: {},
    requestDataCalendarDetail: {},
    requestDataFutureCalendarDetail: {},
    mechanicListing: {},
    schedulingListing: {},
    requestGaragePartListingData: {},
    requestGaragePartBookingListingData: {},

    requestGarageCorporateListingData: {},
    requestGarageCorporateBookingListingData: {},

    requestDataHistory: {},
    territoryData:{},
    manufacturerData:[],
    futureAppointmentData:[],
    loader: false,
}

export default function garageRequestData(state = initialState, {type, payload}) {
    
    switch(type) {
        case providerAction.REQUEST_PENDING_INITIATE: {
            return {
                ...state, loader: true, requestDataPending: {}
            }
        }
        case providerAction.REQUEST_PENDING_SUCCESS: {
            return {
                ...state, loader: false, requestDataPending: payload.data
            }
        }
        case providerAction.REQUEST_PENDING_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case providerAction.REQUEST_CORPORATE_PENDING_INITIATE: {
            return {
                ...state, loader: true, requestDataPending: {}
            }
        }
        case providerAction.REQUEST_CORPORATE_PENDING_SUCCESS: {
            return {
                ...state, loader: false, requestDataPending: payload.data
            }
        }
        case providerAction.REQUEST_CORPORATE_PENDING_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case providerAction.REQUEST_AVAILABLE_INITIATE: {
            return {
                ...state, loader: true, requestDataAvailable: {}
            }
        }
        case providerAction.REQUEST_AVAILABLE_SUCCESS: {
            return {
                ...state, loader: false, requestDataAvailable: payload.data
            }
        }
        case providerAction.REQUEST_AVAILABLE_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case providerAction.REQUEST_CORPORATE_AVAILABLE_INITIATE: {
            return {
                ...state, loader: true, requestDataAvailable: {}
            }
        }
        case providerAction.REQUEST_CORPORATE_AVAILABLE_SUCCESS: {
            return {
                ...state, loader: false, requestDataAvailable: payload.data
            }
        }
        case providerAction.REQUEST_CORPORATE_AVAILABLE_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case providerAction.REQUEST_REJECT_INITIATE: {
            return {
                ...state, loader: true, requestDataReject: {}
            }
        }
        case providerAction.REQUEST_REJECT_SUCCESS: {
            return {
                ...state, loader: false, requestDataReject: payload.data
            }
        }
        case providerAction.REQUEST_REJECT_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case providerAction.REQUEST_CORPORATE_REJECT_INITIATE: {
            return {
                ...state, loader: true, requestDataReject: {}
            }
        }
        case providerAction.REQUEST_CORPORATE_REJECT_SUCCESS: {
            return {
                ...state, loader: false, requestDataReject: payload.data
            }
        }
        case providerAction.REQUEST_CORPORATE_REJECT_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case providerAction.REQUEST_STATUS_INITIATE: {
            return {
                ...state, loader: true
            }
        }
        case providerAction.REQUEST_STATUS_SUCCESS: {
            return {
                ...state, loader: false
            }
        }
        case providerAction.REQUEST_STATUS_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case providerAction.CALENDAR_LIST_INITIATE: {
            return {
                ...state, loader: true, requestDataCalendar: {}
            }
        }
        case providerAction.CALENDAR_LIST_SUCCESS: {
            return {
                ...state, loader: false, requestDataCalendar: payload.data
            }
        }
        case providerAction.CALENDAR_LIST_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case providerAction.CALENDAR_DETAIL_INITIATE: {
            return {
                ...state, loader: true, requestDataCalendarDetail: {}
            }
        }
        case providerAction.CALENDAR_DETAIL_SUCCESS: {
            return {
                ...state, loader: false, requestDataCalendarDetail: payload.data
            }
        }
        case providerAction.CALENDAR_DETAIL_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case providerAction.CALENDAR_FUTURE_DETAIL_INITIATE: {
            return {
                ...state, loader: true, requestDataFutureCalendarDetail: {}
            }
        }
        case providerAction.CALENDAR_FUTURE_DETAIL_SUCCESS: {
            return {
                ...state, loader: false, requestDataFutureCalendarDetail: payload.data
            }
        }
        case providerAction.CALENDAR_FUTURE_DETAIL_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case providerAction.DIAGNOSTIC_QUOTE_INITIATE: {
            return {
                ...state, loader: true,
            }
        }
        case providerAction.DIAGNOSTIC_QUOTE_SUCCESS: {
            return {
                ...state, loader: false,
            }
        }
        case providerAction.DIAGNOSTIC_QUOTE_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case providerAction.MECHANIC_ASSIGN_INITIATE: {
            return {
                ...state, loader: true,
            }
        }
        case providerAction.MECHANIC_ASSIGN_SUCCESS: {
            return {
                ...state, loader: false,
            }
        }
        case providerAction.MECHANIC_ASSIGN_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case providerAction.MECHANIC_CREATE_INITIATE: {
            return {
                ...state, loader: true
            }
        }
        case providerAction.MECHANIC_CREATE_SUCCESS: {
            return {
                ...state, loader: false
            }
        }
        case providerAction.MECHANIC_CREATE_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case providerAction.MECHANIC_DELETE_INITIATE: {
            return {
                ...state, loader: true
            }
        }
        case providerAction.MECHANIC_DELETE_SUCCESS: {
            return {
                ...state, loader: false
            }
        }
        case providerAction.MECHANIC_DELETE_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case providerAction.MECHANIC_EDIT_INITIATE: {
            return {
                ...state, loader: true
            }
        }
        case providerAction.MECHANIC_EDIT_SUCCESS: {
            return {
                ...state, loader: false
            }
        }
        case providerAction.MECHANIC_EDIT_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case providerAction.MECHANIC_LIST_INITIATE: {
            return {
                ...state, loader: true, mechanicListing: {}
            }
        }
        case providerAction.MECHANIC_LIST_SUCCESS: {
            return {
                ...state, loader: false, mechanicListing: payload.data
            }
        }
        case providerAction.MECHANIC_LIST_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case providerAction.SCHEDULING_LIST_INITIATE: {
            return {
                ...state, loader: true, schedulingListing: {}
            }
        }
        case providerAction.SCHEDULING_LIST_SUCCESS: {
            return {
                ...state, loader: false, schedulingListing: payload.data
            }
        }
        case providerAction.SCHEDULING_LIST_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case providerAction.REQUEST_PARTS_LIST_INITIATE: {
            return {
                ...state, loader: true, requestGaragePartListingData: {}
            }
        }
        case providerAction.REQUEST_PARTS_LIST_SUCCESS: {
            return {
                ...state, loader: false, requestGaragePartListingData: payload.data
            }
        }
        case providerAction.REQUEST_PARTS_LIST_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case providerAction.REQUEST_PARTS_BOOKING_INITIATE: {
            return {
                ...state, loader: true, requestGaragePartBookingListingData: {}
            }
        }
        case providerAction.REQUEST_PARTS_BOOKING_SUCCESS: {
            return {
                ...state, loader: false, requestGaragePartBookingListingData: payload.data
            }
        }
        case providerAction.REQUEST_PARTS_BOOKING_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case providerAction.CLIENT_HISTORY_INITIATE: {
            return {
                ...state, loader: true, requestDataHistory: {}
            }
        }
        case providerAction.CLIENT_HISTORY_SUCCESS: {
            return {
                ...state, loader: false, requestDataHistory: payload.data
            }
        }
        case providerAction.CLIENT_HISTORY_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case providerAction.TERRITORY_INITIATE: {
            return {
                ...state, loader: true, territoryData: {}
            }
        }
        case providerAction.TERRITORY_SUCCESS: {
            return {
                ...state, loader: false, territoryData: payload.data
            }
        }
        case providerAction.TERRITORY_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case providerAction.MANUFACTURER_LIST_INITIATE: {
            return {
              ...state, loader: true, manufacturerData: []
            }
        }
        case providerAction.MANUFACTURER_LIST_SUCCESS: {
            return {
              ...state, loader: false, manufacturerData: payload.data
            }
        }
        case providerAction.MANUFACTURER_LIST_FAILURE: {
            return {
              ...state, loader: false
            }
        }

        case providerAction.FUTURE_APPOINTMENT_LIST_INITIATE: {
            return {
              ...state, loader: true, futureAppointmentData: []
            }
        }
        case providerAction.FUTURE_APPOINTMENT_LIST_SUCCESS: {
            return {
              ...state, loader: false, futureAppointmentData: payload.data
            }
        }
        case providerAction.FUTURE_APPOINTMENT_LIST_FAILURE: {
            return {
              ...state, loader: false
            }
        }

        case providerAction.REQUEST_CORPORATE_LIST_INITIATE: {
            return {
                ...state, loader: true, requestGarageCorporateListingData: {}
            }
        }
        case providerAction.REQUEST_CORPORATE_LIST_SUCCESS: {
            return {
                ...state, loader: false, requestGarageCorporateListingData: payload.data
            }
        }
        case providerAction.REQUEST_CORPORATE_LIST_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case providerAction.REQUEST_CORPORATE_BOOKING_INITIATE: {
            return {
                ...state, loader: true, requestGarageCorporateBookingListingData: {}
            }
        }
        case providerAction.REQUEST_CORPORATE_BOOKING_SUCCESS: {
            return {
                ...state, loader: false, requestGarageCorporateBookingListingData: payload.data
            }
        }
        case providerAction.REQUEST_CORPORATE_BOOKING_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        default: 
            return state
    }
}