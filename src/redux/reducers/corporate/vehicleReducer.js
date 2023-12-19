import { corporateAction } from "../../actionTypes"
const initialState = {
  manufacturerData:[],
  modelData:[],
  corporateVehicleData: [],
  corporateEditVehicleData: {},
  vehicleHistoryGarageData: {},
  vehicleHistoryDealerData: {},
  loader: false,
}

export default function corporateVehicle(state = initialState, {type, payload}) {
  switch(type) {
    
    case corporateAction.MANUFACTURER_LIST_INITIATE: {
      return {
        ...state, loader: true, manufacturerData: []
      }
    }
    case corporateAction.MANUFACTURER_LIST_SUCCESS: {
      return {
        ...state, loader: false, manufacturerData: payload.data
      }
    }
    case corporateAction.MANUFACTURER_LIST_FAILURE: {
      return {
        ...state, loader: false
      }
    }

    case corporateAction.MODEL_LIST_INITIATE: {
      return {
        ...state, loader: true, modelData: []
      }
    }
    case corporateAction.MODEL_LIST_SUCCESS: {
      return {
        ...state, loader: false, modelData: payload.data
      }
    }
    case corporateAction.MODEL_LIST_FAILURE: {
      return {
        ...state, loader: false
      }
    }
    
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

    case corporateAction.VEHICLE_CREATE_INITIATE: {
      return {
        ...state, loader: true, corporateVehicleData: {}
      }
    }
    case corporateAction.VEHICLE_CREATE_SUCCESS: {

      return {
        ...state, loader: false, corporateVehicleData: payload.data
      }
    }
    case corporateAction.VEHICLE_CREATE_FAILURE: {
      return {
        ...state, loader: false
      }
    }

    case corporateAction.VEHICLE_VIEW_INITIATE: {
        return {
            ...state, loader: true, corporateEditVehicleData: {}
        }
    }
    case corporateAction.VEHICLE_VIEW_SUCCESS: {
        return {
            ...state, loader: false, corporateEditVehicleData: payload.data
        }
    }
    case corporateAction.VEHICLE_VIEW_FAILURE: {
        return {
            ...state, loader: false
        }
    }

    case corporateAction.VEHICLE_UPDATE_INITIATE: {
      return {
        ...state, loader: true, corporateVehicleData: {}        
      }
    }
    case corporateAction.VEHICLE_UPDATE_SUCCESS: {
      return {
        ...state, loader: false
      }
    }
    case corporateAction.VEHICLE_UPDATE_FAILURE: {
      return {
        ...state, loader: false
      }
    }

    case corporateAction.VEHICLE_DELETE_INITIATE: {
      return {
        ...state, loader: true, corporateVehicleData: {}        
      }
    }
    case corporateAction.VEHICLE_DELETE_SUCCESS: {
      return {
        ...state, loader: false
      }
    }
    case corporateAction.VEHICLE_DELETE_FAILURE: {
      return {
        ...state, loader: false
      }
    }

    case corporateAction.VEHICLE_HISTORY_GARAGE_INITIATE: {
      return {
        ...state, loader: true, vehicleHistoryGarageData: []
      }
    }
    case corporateAction.VEHICLE_HISTORY_GARAGE_SUCCESS: {
      return {
        ...state, loader: false, vehicleHistoryGarageData: payload.data
      }
    }
    case corporateAction.VEHICLE_HISTORY_GARAGE_FAILURE: {
      return {
        ...state, loader: false
      }
    }

    case corporateAction.VEHICLE_HISTORY_DEALER_INITIATE: {
      return {
        ...state, loader: true, vehicleHistoryDealerData: []
      }
    }
    case corporateAction.VEHICLE_HISTORY_DEALER_SUCCESS: {
      return {
        ...state, loader: false, vehicleHistoryDealerData: payload.data
      }
    }
    case corporateAction.VEHICLE_HISTORY_DEALER_FAILURE: {
      return {
        ...state, loader: false
      }
    }

    default: 
      return state
  }
}