import { dealerAction } from "../../actionTypes"
const initialState = {
    requestDealerDataPending: {},
    requestDealerGarageDataPending: {},
    requestDealerCorporateDataPending: {},

    requestDealerDataAvailable: {},
    requestDealerDataReject: {},
    requestDealerUserData: {},
    requestDealerGarageData: {},
    requestDealerCorporateData: {},

    requestGarageDataAvailable:{},
    requestCorproateDataAvailable:{},

    requestDealerDataCalendar: {},
    requestDealerDataGarageCalendar: {},
    requestDealerDataCorporateCalendar: {},

    requestDealerDataCalendarDetail: {},
    mechanicListing: {},
    manufacturerData:[],
    requestDataHistory: {},
    territoryData:{},
    futureAppointmentData:{},
    requestDataFutureCalendarDetail:{},
    modelData:[],
    loader: false,
}

export default function dealerRequestData(state = initialState, {type, payload}) {
    switch(type) {
        case dealerAction.REQUEST_PENDING_INITIATE: {
            return {
                ...state, loader: true, requestDealerDataPending: {}
            }
        }
        case dealerAction.REQUEST_PENDING_SUCCESS: {
            return {
                ...state, loader: false, requestDealerDataPending: payload.data
            }
        }
        case dealerAction.REQUEST_PENDING_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case dealerAction.REQUEST_GARAGE_PENDING_INITIATE: {
            return {
                ...state, loader: true, requestDealerGarageDataPending: {}
            }
        }
        case dealerAction.REQUEST_GARAGE_PENDING_SUCCESS: {
            return {
                ...state, loader: false, requestDealerGarageDataPending: payload.data
            }
        }
        case dealerAction.REQUEST_GARAGE_PENDING_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case dealerAction.REQUEST_CORPORATE_PENDING_INITIATE: {
            return {
                ...state, loader: true, requestDealerCorporateDataPending: {}
            }
        }
        case dealerAction.REQUEST_CORPORATE_PENDING_SUCCESS: {
            return {
                ...state, loader: false, requestDealerCorporateDataPending: payload.data
            }
        }
        case dealerAction.REQUEST_CORPORATE_PENDING_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case dealerAction.REQUEST_AVAILABLE_INITIATE: {
            return {
                ...state, loader: true, requestDealerDataAvailable: {}
            }
        }
        case dealerAction.REQUEST_AVAILABLE_SUCCESS: {
            return {
                ...state, loader: false, requestDealerDataAvailable: payload.data
            }
        }
        case dealerAction.REQUEST_AVAILABLE_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case dealerAction.REQUEST_GARAGE_AVAILABLE_INITIATE: {
            return {
                ...state, loader: true, requestGarageDataAvailable: {}
            }
        }
        case dealerAction.REQUEST_GARAGE_AVAILABLE_SUCCESS: {
            return {
                ...state, loader: false, requestGarageDataAvailable: payload.data
            }
        }
        case dealerAction.REQUEST_GARAGE_AVAILABLE_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case dealerAction.REQUEST_CORPORATE_AVAILABLE_INITIATE: {
            return {
                ...state, loader: true, requestCorporateDataAvailable: {}
            }
        }
        case dealerAction.REQUEST_CORPORATE_AVAILABLE_SUCCESS: {
            return {
                ...state, loader: false, requestCorporateDataAvailable: payload.data
            }
        }
        case dealerAction.REQUEST_CORPORATE_AVAILABLE_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case dealerAction.REQUEST_REJECT_INITIATE: {
            return {
                ...state, loader: true, requestDealerDataReject: {}
            }
        }
        case dealerAction.REQUEST_REJECT_SUCCESS: {
            return {
                ...state, loader: false, requestDealerDataReject: payload.data
            }
        }
        case dealerAction.REQUEST_REJECT_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case dealerAction.REQUEST_USER_INITIATE: {
            return {
                ...state, loader: true, requestDealerUserData: {}
            }
        }
        case dealerAction.REQUEST_USER_SUCCESS: {
            return {
                ...state, loader: false, requestDealerUserData: payload.data
            }
        }
        case dealerAction.REQUEST_USER_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case dealerAction.REQUEST_GARAGE_INITIATE: {
            return {
                ...state, loader: true, requestDealerGarageData: {}
            }
        }
        case dealerAction.REQUEST_GARAGE_SUCCESS: {
            return {
                ...state, loader: false, requestDealerGarageData: payload.data
            }
        }
        case dealerAction.REQUEST_GARAGE_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case dealerAction.REQUEST_CORPORATE_INITIATE: {
            return {
                ...state, loader: true, requestDealerCorporateData: {}
            }
        }
        case dealerAction.REQUEST_CORPORATE_SUCCESS: {
            return {
                ...state, loader: false, requestDealerCorporateData: payload.data
            }
        }
        case dealerAction.REQUEST_CORPORATE_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case dealerAction.REQUEST_STATUS_INITIATE: {
            return {
                ...state, loader: true
            }
        }
        case dealerAction.REQUEST_STATUS_SUCCESS: {
            return {
                ...state, loader: false
            }
        }
        case dealerAction.REQUEST_STATUS_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case dealerAction.CALENDAR_LIST_INITIATE: {
            return {
                ...state, loader: true, requestDealerDataCalendar: {}
            }
        }
        case dealerAction.CALENDAR_LIST_SUCCESS: {
            return {
                ...state, loader: false, requestDealerDataCalendar: payload.data
            }
        }
        case dealerAction.CALENDAR_LIST_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case dealerAction.CALENDAR_GARAGE_LIST_INITIATE: {
            return {
                ...state, loader: true, requestDealerDataGarageCalendar: {}
            }
        }
        case dealerAction.CALENDAR_GARAGE_LIST_SUCCESS: {
            return {
                ...state, loader: false, requestDealerDataGarageCalendar: payload.data
            }
        }
        case dealerAction.CALENDAR_GARAGE_LIST_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case dealerAction.CALENDAR_CORPORATE_LIST_INITIATE: {
            return {
                ...state, loader: true, requestDealerDataCorporateCalendar: {}
            }
        }
        case dealerAction.CALENDAR_CORPORATE_LIST_SUCCESS: {
            return {
                ...state, loader: false, requestDealerDataCorporateCalendar: payload.data
            }
        }
        case dealerAction.CALENDAR_CORPORATE_LIST_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case dealerAction.CALENDAR_DETAIL_INITIATE: {
            return {
                ...state, loader: true, requestDealerDataCalendarDetail: {}
            }
        }
        case dealerAction.CALENDAR_DETAIL_SUCCESS: {
            return {
                ...state, loader: false, requestDealerDataCalendarDetail: payload.data
            }
        }
        case dealerAction.CALENDAR_DETAIL_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case dealerAction.CLIENT_HISTORY_INITIATE: {
            return {
                ...state, loader: true, requestDataHistory: {}
            }
        }
        case dealerAction.CLIENT_HISTORY_SUCCESS: {
            return {
                ...state, loader: false, requestDataHistory: payload.data
            }
        }
        case dealerAction.CLIENT_HISTORY_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case dealerAction.TERRITORY_INITIATE: {
            return {
                ...state, loader: true, territoryData: {}
            }
        }
        case dealerAction.TERRITORY_SUCCESS: {
            return {
                ...state, loader: false, territoryData: payload.data
            }
        }
        case dealerAction.TERRITORY_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case dealerAction.MANUFACTURER_LIST_INITIATE: {
            return {
              ...state, loader: true, manufacturerData: []
            }
          }
          case dealerAction.MANUFACTURER_LIST_SUCCESS: {
            return {
              ...state, loader: false, manufacturerData: payload.data
            }
          }
          case dealerAction.MANUFACTURER_LIST_FAILURE: {
            return {
              ...state, loader: false
            }
          }
      
          case dealerAction.MODEL_LIST_INITIATE: {
            return {
              ...state, loader: true, modelData: []
            }
          }
          case dealerAction.MODEL_LIST_SUCCESS: {
            return {
              ...state, loader: false, modelData: payload.data
            }
          }
          case dealerAction.MODEL_LIST_FAILURE: {
            return {
              ...state, loader: false
            }
        }

        case dealerAction.FUTURE_APPOINTMENT_LIST_INITIATE: {
            return {
              ...state, loader: true, futureAppointmentData: []
            }
        }
        case dealerAction.FUTURE_APPOINTMENT_LIST_SUCCESS: {
            return {
              ...state, loader: false, futureAppointmentData: payload.data
            }
        }
        case dealerAction.FUTURE_APPOINTMENT_LIST_FAILURE: {
            return {
              ...state, loader: false
            }
        }

        case dealerAction.CALENDAR_FUTURE_DETAIL_INITIATE: {
            return {
                ...state, loader: true, requestDataFutureCalendarDetail: {}
            }
        }
        case dealerAction.CALENDAR_FUTURE_DETAIL_SUCCESS: {
            return {
                ...state, loader: false, requestDataFutureCalendarDetail: payload.data
            }
        }
        case dealerAction.CALENDAR_FUTURE_DETAIL_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        default: 
            return state
    }
}