import { clientAction } from "../../actionTypes"
const initialState = {
    clientVehicleData: [],
    garageMarkerData: [],
    partsMarkerData: [],
    salesMarkerData: [],
    corporateMarkerData: [],
    garageSearchData: [],
    dealerSearchData: [],
    salesSearchData: [],
    corporateSearchData: [],
    loader: false,
}

export default function searching(state = initialState, {type, payload}) {
  switch(type) {
    case clientAction.VEHICLE_LIST_INITIATE: {
      return {
        ...state, loader: true, clientVehicleData: []
      }
    }
    case clientAction.VEHICLE_LIST_SUCCESS: {
      return {
        ...state, loader: false, clientVehicleData: payload.data
      }
    }
    case clientAction.VEHICLE_LIST_FAILURE: {
      return {
        ...state, loader: false
      }
    }
    case clientAction.GARAGE_MARKER_LIST_INITIATE: {
      return {
        ...state, loader: true, garageMarkerData: []
      }
    }
    case clientAction.GARAGE_MARKER_LIST_SUCCESS: {
      return {
        ...state, loader: false, garageMarkerData: payload.data
      }
    }
    case clientAction.GARAGE_MARKER_LIST_FAILURE: {
      return {
        ...state, loader: false
      }
    }
    case clientAction.PARTS_MARKER_LIST_INITIATE: {
      return {
        ...state, loader: true, partsMarkerData: []
      }
    }
    case clientAction.PARTS_MARKER_LIST_SUCCESS: {
      return {
        ...state, loader: false, partsMarkerData: payload.data
      }
    }
    case clientAction.PARTS_MARKER_LIST_FAILURE: {
      return {
        ...state, loader: false
      }
    }

    case clientAction.SALES_MARKER_LIST_INITIATE: {
      return {
        ...state, loader: true, salesMarkerData: []
      }
    }
    case clientAction.SALES_MARKER_LIST_SUCCESS: {
      return {
        ...state, loader: false, salesMarkerData: payload.data
      }
    }
    case clientAction.SALES_MARKER_LIST_FAILURE: {
      return {
        ...state, loader: false
      }
    }

    case clientAction.CORPORATE_MARKER_LIST_INITIATE: {
      return {
        ...state, loader: true, corporateMarkerData: []
      }
    }
    case clientAction.CORPORATE_MARKER_LIST_SUCCESS: {
      return {
        ...state, loader: false, corporateMarkerData: payload.data
      }
    }
    case clientAction.CORPORATE_MARKER_LIST_FAILURE: {
      return {
        ...state, loader: false
      }
    }

    case clientAction.GARAGE_SEARCH_INITIATE: {
        return {
          ...state, loader: true, garageSearchData: []
        }
    }
    case clientAction.GARAGE_SEARCH_SUCCESS: {
        return {
          ...state, loader: false, garageSearchData: payload.data
        }
    }
    case clientAction.GARAGE_SEARCH_FAILURE: {
        return {
          ...state, loader: false
        }
    }

    case clientAction.DEALER_SEARCH_INITIATE: {
        return {
          ...state, loader: true, dealerSearchData: []
        }
    }
    case clientAction.DEALER_SEARCH_SUCCESS: {
        return {
          ...state, loader: false, dealerSearchData: payload.data
        }
    }
    case clientAction.DEALER_SEARCH_FAILURE: {
        return {
          ...state, loader: false
        }
    }

    case clientAction.SALES_SEARCH_INITIATE: {
        return {
          ...state, loader: true, salesSearchData: []
        }
    }
    case clientAction.SALES_SEARCH_SUCCESS: {
        return {
          ...state, loader: false, salesSearchData: payload.data
        }
    }
    case clientAction.SALES_SEARCH_FAILURE: {
        return {
          ...state, loader: false
        }
    }

    case clientAction.CORPORATE_SEARCH_INITIATE: {
      return {
        ...state, loader: true, corporateSearchData: []
      }
    }
    case clientAction.CORPORATE_SEARCH_SUCCESS: {
        return {
          ...state, loader: false, corporateSearchData: payload.data
        }
    }
    case clientAction.CORPORATE_SEARCH_FAILURE: {
        return {
          ...state, loader: false
        }
    }

    default: 
      return state
  }
}