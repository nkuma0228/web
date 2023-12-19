import { providerAction } from "../../actionTypes"
const initialState = {
    garageVehicleData: [],
    SearchServiceDealersData: [],
    manufacturerData:[],
    modelData:[],
    partsMarkerData:[],
    loader: false,
}

export default function garageSearching(state = initialState, {type, payload}) {
  switch(type) {
    case providerAction.VEHICLE_LIST_INITIATE: {
      return {
        ...state, loader: true, garageVehicleData: []
      }
    }
    case providerAction.VEHICLE_LIST_SUCCESS: {
      return {
        ...state, loader: false, garageVehicleData: payload.data
      }
    }
    case providerAction.VEHICLE_LIST_FAILURE: {
      return {
        ...state, loader: false
      }
    }

    case providerAction.DEALER_SEARCH_INITIATE: {
        return {
          ...state, loader: true, SearchServiceDealersData: []
        }
    }
    case providerAction.DEALER_SEARCH_SUCCESS: {
        return {
          ...state, loader: false, SearchServiceDealersData: payload.data
        }
    }
    case providerAction.DEALER_SEARCH_FAILURE: {
        return {
          ...state, loader: false
        }
    }

    case providerAction.SEARCH_DEALER_DETAIL_INITIATE: {
        return {
          ...state, loader: true, SearchDealerDetailData: []
        }
    }
    case providerAction.SEARCH_DEALER_DETAIL_SUCCESS: {
        return {
          ...state, loader: false, SearchDealerDetailData: payload.data
        }
    }
    case providerAction.SEARCH_DEALER_DETAIL_FAILURE: {
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

    case providerAction.MODEL_LIST_INITIATE: {
      return {
        ...state, loader: true, modelData: []
      }
    }
    case providerAction.MODEL_LIST_SUCCESS: {
      return {
        ...state, loader: false, modelData: payload.data
      }
    }
    case providerAction.MODEL_LIST_FAILURE: {
      return {
        ...state, loader: false
      }
    }

    case providerAction.PARTS_MARKER_LIST_INITIATE: {
      return {
        ...state, loader: true, partsMarkerData: []
      }
    }
    case providerAction.PARTS_MARKER_LIST_SUCCESS: {
      return {
        ...state, loader: false, partsMarkerData: payload.data
      }
    }
    case providerAction.PARTS_MARKER_LIST_FAILURE: {
      return {
        ...state, loader: false
      }
    }

    default: 
      return state
  }
}