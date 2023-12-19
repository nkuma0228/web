import { authAction } from "../../actionTypes"
const initialState = {
  clientData: {},
  manufacturerData: {},
  modelData: {},
  loader: false,
  loginStatus: false
}

export default function client(state = initialState, {type, payload}) {
  switch(type) {
    case authAction.CLIENT_EMAIL_CHECK_INITIATE: {
      return {
        ...state, loader: true, clientData: {}
      }
    }
    case authAction.CLIENT_EMAIL_CHECK_SUCCESS: {

      return {
        ...state, loader: false
      }
    }
    case authAction.CLIENT_EMAIL_CHECK_FAILURE: {
      return {
        ...state, loader: false
      }
    }

    case authAction.MANUFACTURER_LIST_INITIATE: {
      return {
        ...state, loader: true, manufacturerData: {}
      }
    }
    case authAction.MANUFACTURER_LIST_SUCCESS: {

      return {
        ...state, loader: false, manufacturerData: payload.data
      }
    }
    case authAction.MANUFACTURER_LIST_FAILURE: {
      return {
        ...state, loader: false
      }
    }

    case authAction.MODEL_LIST_INITIATE: {
      return {
        ...state, loader: true, modelData: {}
      }
    }
    case authAction.MODEL_LIST_SUCCESS: {

      return {
        ...state, loader: false, modelData: payload.data
      }
    }
    case authAction.MODEL_LIST_FAILURE: {
      return {
        ...state, loader: false
      }
    }

    case authAction.CLIENT_SIGNUP_INITIATE: {
      return {
        ...state, loader: true, clientData: {}
      }
    }
    case authAction.CLIENT_SIGNUP_SUCCESS: {
      window.localStorage.setItem("clientLogin", JSON.stringify(payload.data))
      return {
        ...state, loader: false, loginStatus: true, clientData: payload.data
      }
    }
    case authAction.CLIENT_SIGNUP_FAILURE: {
      return {
        ...state, loader: false
      }
    }
    case authAction.CLIENT_LOGIN_INITIATE: {
      return {
        ...state, loader: true, clientData: {}        
      }
    }
    case authAction.CLIENT_LOGIN_SUCCESS: {
      window.localStorage.setItem("clientLogin", JSON.stringify(payload.data))
      return {
        ...state, loader: false, loginStatus: true, clientData: payload.data
      }
    }
    case authAction.CLIENT_LOGIN_FAILURE: {
      return {
        ...state, loader: false
      }
    }

    case authAction.GET_CLIENT_DETAILS_INITIATE: {
      return {
        ...state, loader: true, clientData: {}        
      }
    }
    case authAction.GET_CLIENT_DETAILS_SUCCESS: {
      return {
        ...state, loader: false, clientData: payload.data
      }
    }
    case authAction.GET_CLIENT_DETAILS_FAILURE: {
      return {
        ...state, loader: false
      }
    }

    case authAction.CLIENT_UPDATE_INITIATE: {
      return {
        ...state, loader: true, clientData: {}        
      }
    }
    case authAction.CLIENT_UPDATE_SUCCESS: {
      return {
        ...state, loader: false, clientData: payload.data
      }
    }
    case authAction.CLIENT_UPDATE_FAILURE: {
      return {
        ...state, loader: false
      }
    }

    case authAction.CLIENT_PASSWORD_UPDATE_INITIATE: {
      return {
        ...state, loader: true, clientData: {}        
      }
    }
    case authAction.CLIENT_PASSWORD_UPDATE_SUCCESS: {
      return {
        ...state, loader: false, clientData: payload.data
      }
    }
    case authAction.CLIENT_PASSWORD_UPDATE_FAILURE: {
      return {
        ...state, loader: false
      }
    }
    default: 
      return state
  }
}