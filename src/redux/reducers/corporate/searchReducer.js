import { corporateAction } from "../../actionTypes"
const initialState = {
    corporateVehicleData: [],
    garageMarkerData: [],
    partsMarkerData: [],
    salesMarkerData: [],
    garageSearchData: [],
    dealerSearchData: [],
    salesSearchData: [],
    loader: false,
}

export default function corporatesearching(state = initialState, {type, payload}) {
  switch(type) {
    case corporateAction.VEHICLE_LIST_INITIATE: {
      return {
        ...state, loader: true, corporateVehicleData: []
      }
    }
    case corporateAction.VEHICLE_LIST_SUCCESS: {
      return {
        ...state, loader: false, corporateVehicleData: payload.data
      }
    }
    case corporateAction.VEHICLE_LIST_FAILURE: {
      return {
        ...state, loader: false
      }
    }
    case corporateAction.GARAGE_MARKER_LIST_INITIATE: {
      return {
        ...state, loader: true, garageMarkerData: []
      }
    }
    case corporateAction.GARAGE_MARKER_LIST_SUCCESS: {
      return {
        ...state, loader: false, garageMarkerData: payload.data
      }
    }
    case corporateAction.GARAGE_MARKER_LIST_FAILURE: {
      return {
        ...state, loader: false
      }
    }
    case corporateAction.PARTS_MARKER_LIST_INITIATE: {
      return {
        ...state, loader: true, partsMarkerData: []
      }
    }
    case corporateAction.PARTS_MARKER_LIST_SUCCESS: {
      return {
        ...state, loader: false, partsMarkerData: payload.data
      }
    }
    case corporateAction.PARTS_MARKER_LIST_FAILURE: {
      return {
        ...state, loader: false
      }
    }

    case corporateAction.SALES_MARKER_LIST_INITIATE: {
      return {
        ...state, loader: true, salesMarkerData: []
      }
    }
    case corporateAction.SALES_MARKER_LIST_SUCCESS: {
      return {
        ...state, loader: false, salesMarkerData: payload.data
      }
    }
    case corporateAction.SALES_MARKER_LIST_FAILURE: {
      return {
        ...state, loader: false
      }
    }

    case corporateAction.GARAGE_SEARCH_INITIATE: {
        return {
          ...state, loader: true, garageSearchData: []
        }
    }
    case corporateAction.GARAGE_SEARCH_SUCCESS: {
        return {
          ...state, loader: false, garageSearchData: payload.data
        }
    }
    case corporateAction.GARAGE_SEARCH_FAILURE: {
        return {
          ...state, loader: false
        }
    }

    case corporateAction.DEALER_SEARCH_INITIATE: {
        return {
          ...state, loader: true, dealerSearchData: []
        }
    }
    case corporateAction.DEALER_SEARCH_SUCCESS: {
        return {
          ...state, loader: false, dealerSearchData: payload.data
        }
    }
    case corporateAction.DEALER_SEARCH_FAILURE: {
        return {
          ...state, loader: false
        }
    }

    case corporateAction.SALES_SEARCH_INITIATE: {
      return {
        ...state, loader: true, salesSearchData: []
      }
  }
  case corporateAction.SALES_SEARCH_SUCCESS: {
      return {
        ...state, loader: false, salesSearchData: payload.data
      }
  }
  case corporateAction.SALES_SEARCH_FAILURE: {
      return {
        ...state, loader: false
      }
  }

    default: 
      return state
  }
}