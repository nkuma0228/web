import { authCorporateAction } from "../../actionTypes"
const initialState = {
  corporateData: {},
  manufacturerData: {},
  modelData: {},
  loader: false,
  loginStatus: false
}

export default function corporate(state = initialState, {type, payload}) {
  switch(type) {
    case authCorporateAction.CORPORATE_EMAIL_CHECK_INITIATE: {
      return {
        ...state, loader: true, corporateData: {}
      }
    }
    case authCorporateAction.CORPORATE_EMAIL_CHECK_SUCCESS: {

      return {
        ...state, loader: false
      }
    }
    case authCorporateAction.CORPORATE_EMAIL_CHECK_FAILURE: {
      return {
        ...state, loader: false
      }
    }

    case authCorporateAction.MANUFACTURER_LIST_INITIATE: {
      return {
        ...state, loader: true, manufacturerData: {}
      }
    }
    case authCorporateAction.MANUFACTURER_LIST_SUCCESS: {

      return {
        ...state, loader: false, manufacturerData: payload.data
      }
    }
    case authCorporateAction.MANUFACTURER_LIST_FAILURE: {
      return {
        ...state, loader: false
      }
    }

    case authCorporateAction.MODEL_LIST_INITIATE: {
      return {
        ...state, loader: true, modelData: {}
      }
    }
    case authCorporateAction.MODEL_LIST_SUCCESS: {

      return {
        ...state, loader: false, modelData: payload.data
      }
    }
    case authCorporateAction.MODEL_LIST_FAILURE: {
      return {
        ...state, loader: false
      }
    }

    case authCorporateAction.CORPORATE_SIGNUP_INITIATE: {
      return {
        ...state, loader: true, corporateData: {}
      }
    }
    case authCorporateAction.CORPORATE_SIGNUP_SUCCESS: {
      window.localStorage.setItem("corporateLogin", JSON.stringify(payload.data))
      return {
        ...state, loader: false, loginStatus: true, corporateData: payload.data
      }
    }
    case authCorporateAction.CORPORATE_SIGNUP_FAILURE: {
      return {
        ...state, loader: false
      }
    }
    case authCorporateAction.CORPORATE_LOGIN_INITIATE: {
      return {
        ...state, loader: true, corporateData: {}        
      }
    }
    case authCorporateAction.CORPORATE_LOGIN_SUCCESS: {
      //console.log(payload.data)
      window.localStorage.setItem("corporateLogin", JSON.stringify(payload.data))
      return {
        ...state, loader: false, loginStatus: true, corporateData: payload.data
      }
    }
    case authCorporateAction.CORPORATE_LOGIN_FAILURE: {
      return {
        ...state, loader: false
      }
    }

    case authCorporateAction.GET_CORPORATE_DETAILS_INITIATE: {
      return {
        ...state, loader: true, corporateData: {}        
      }
    }
    case authCorporateAction.GET_CORPORATE_DETAILS_SUCCESS: {
      return {
        ...state, loader: false, corporateData: payload.data
      }
    }
    case authCorporateAction.GET_CORPORATE_DETAILS_FAILURE: {
      return {
        ...state, loader: false
      }
    }

    case authCorporateAction.CORPORATE_UPDATE_INITIATE: {
      return {
        ...state, loader: true, corporateData: {}        
      }
    }
    case authCorporateAction.CORPORATE_UPDATE_SUCCESS: {
      return {
        ...state, loader: false, corporateData: payload.data
      }
    }
    case authCorporateAction.CORPORATE_UPDATE_FAILURE: {
      return {
        ...state, loader: false
      }
    }

    case authCorporateAction.CORPORATE_PASSWORD_UPDATE_INITIATE: {
      return {
        ...state, loader: true, corporateData: {}        
      }
    }
    case authCorporateAction.CORPORATE_PASSWORD_UPDATE_SUCCESS: {
      return {
        ...state, loader: false, corporateData: payload.data
      }
    }
    case authCorporateAction.CORPORATE_PASSWORD_UPDATE_FAILURE: {
      return {
        ...state, loader: false
      }
    }
    default: 
      return state
  }
}