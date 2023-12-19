import { clientAction } from "../../actionTypes"
const initialState = {
  manufacturerData:[],
  modelData:[],
  clientVehicleData: [],
  clientEditVehicleData: {},
  vehicleHistoryGarageData: {},
  vehicleHistoryDealerData: {},
  loader: false,
}

export default function clientVehicle(state = initialState, {type, payload}) {
  switch(type) {
    
    case clientAction.MANUFACTURER_LIST_INITIATE: {
      return {
        ...state, loader: true, manufacturerData: []
      }
    }
    case clientAction.MANUFACTURER_LIST_SUCCESS: {
      return {
        ...state, loader: false, manufacturerData: payload.data
      }
    }
    case clientAction.MANUFACTURER_LIST_FAILURE: {
      return {
        ...state, loader: false
      }
    }

    case clientAction.MODEL_LIST_INITIATE: {
      return {
        ...state, loader: true, modelData: []
      }
    }
    case clientAction.MODEL_LIST_SUCCESS: {
      return {
        ...state, loader: false, modelData: payload.data
      }
    }
    case clientAction.MODEL_LIST_FAILURE: {
      return {
        ...state, loader: false
      }
    }
    
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

    case clientAction.VEHICLE_CREATE_INITIATE: {
      return {
        ...state, loader: true, clientVehicleData: {}
      }
    }
    case clientAction.VEHICLE_CREATE_SUCCESS: {

      return {
        ...state, loader: false, clientVehicleData: payload.data
      }
    }
    case clientAction.VEHICLE_CREATE_FAILURE: {
      return {
        ...state, loader: false
      }
    }

    case clientAction.VEHICLE_VIEW_INITIATE: {
        return {
            ...state, loader: true, clientEditVehicleData: {}
        }
    }
    case clientAction.VEHICLE_VIEW_SUCCESS: {
        return {
            ...state, loader: false, clientEditVehicleData: payload.data
        }
    }
    case clientAction.VEHICLE_VIEW_FAILURE: {
        return {
            ...state, loader: false
        }
    }

    case clientAction.VEHICLE_UPDATE_INITIATE: {
      return {
        ...state, loader: true, clientVehicleData: {}        
      }
    }
    case clientAction.VEHICLE_UPDATE_SUCCESS: {
      return {
        ...state, loader: false
      }
    }
    case clientAction.VEHICLE_UPDATE_FAILURE: {
      return {
        ...state, loader: false
      }
    }

    case clientAction.VEHICLE_DELETE_INITIATE: {
      return {
        ...state, loader: true, clientVehicleData: {}        
      }
    }
    case clientAction.VEHICLE_DELETE_SUCCESS: {
      return {
        ...state, loader: false
      }
    }
    case clientAction.VEHICLE_DELETE_FAILURE: {
      return {
        ...state, loader: false
      }
    }

    case clientAction.VEHICLE_HISTORY_GARAGE_INITIATE: {
      return {
        ...state, loader: true, vehicleHistoryGarageData: []
      }
    }
    case clientAction.VEHICLE_HISTORY_GARAGE_SUCCESS: {
      return {
        ...state, loader: false, vehicleHistoryGarageData: payload.data
      }
    }
    case clientAction.VEHICLE_HISTORY_GARAGE_FAILURE: {
      return {
        ...state, loader: false
      }
    }

    case clientAction.VEHICLE_HISTORY_DEALER_INITIATE: {
      return {
        ...state, loader: true, vehicleHistoryDealerData: []
      }
    }
    case clientAction.VEHICLE_HISTORY_DEALER_SUCCESS: {
      return {
        ...state, loader: false, vehicleHistoryDealerData: payload.data
      }
    }
    case clientAction.VEHICLE_HISTORY_DEALER_FAILURE: {
      return {
        ...state, loader: false
      }
    }

    default: 
      return state
  }
}