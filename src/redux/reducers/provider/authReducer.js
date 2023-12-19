import { authProviderAction } from "../../actionTypes"
const initialState = {
  providerData: {},
  providerGarageReviewData: {},
  providerDealerReviewData: {},
  providerSalesReviewData: {},
  providerCorporateReviewData: {},
  manufacturerData: {},
  countryData: "USA",
  loader: false,
}

export default function provider(state = initialState, {type, payload}) {
  //console.log("payload", payload)
  switch(type) {
    case authProviderAction.SET_COUNTRY_INITIATE: {
      return {
        ...state, countryData: payload
      }
    }
    
    case authProviderAction.MANUFACTURER_LIST_INITIATE: {
      return {
        ...state, loader: true, manufacturerData: {}
      }
    }
    case authProviderAction.MANUFACTURER_LIST_SUCCESS: {
      return {
        ...state, loader: false, manufacturerData:payload.data
      }
    }
    case authProviderAction.MANUFACTURER_LIST_FAILURE: {
      return {
        ...state, loader: false
      }
    }

    case authProviderAction.PROVIDER_EMAIL_CHECK_INITIATE: {
      return {
        ...state, loader: true, providerData: {}
      }
    }
    case authProviderAction.PROVIDER_EMAIL_CHECK_SUCCESS: {

      return {
        ...state, loader: false
      }
    }
    case authProviderAction.PROVIDER_EMAIL_CHECK_FAILURE: {
      return {
        ...state, loader: false
      }
    }
    case authProviderAction.PROVIDER_SIGNUP_INITIATE: {
      return {
        ...state, loader: true, providerData: {}
      }
    }
    case authProviderAction.PROVIDER_SIGNUP_SUCCESS: {
      return {
        ...state, loader: false
      }
    }
    case authProviderAction.PROVIDER_SIGNUP_FAILURE: {
      return {
        ...state, loader: false
      }
    }

    case authProviderAction.PROVIDER_LOGIN_INITIATE: {
      return {
        ...state, loader: true, providerData: {}        
      }
    }
    case authProviderAction.PROVIDER_LOGIN_SUCCESS: {
      window.localStorage.setItem("providerLogin", JSON.stringify(payload.data))
      return {
        ...state, loader: false, loginStatus: true, providerData: payload.data
      }
    }
    case authProviderAction.PROVIDER_LOGIN_FAILURE: {
      return {
        ...state, loader: false
      }
    }

    case authProviderAction.GET_PROVIDER_DETAILS_INITIATE: {
      return {
        ...state, loader: true, providerData: {}        
      }
    }
    case authProviderAction.GET_PROVIDER_DETAILS_SUCCESS: {
      return {
        ...state, loader: false, providerData: payload.data
      }
    }
    case authProviderAction.GET_PROVIDER_DETAILS_FAILURE: {
      return {
        ...state, loader: false
      }
    }

    case authProviderAction.PROVIDER_UPDATE_INITIATE: {
      return {
        ...state, loader: true, providerData: {}        
      }
    }
    case authProviderAction.PROVIDER_UPDATE_SUCCESS: {
      return {
        ...state, loader: false, providerData: payload.data
      }
    }
    case authProviderAction.PROVIDER_UPDATE_FAILURE: {
      return {
        ...state, loader: false
      }
    }

    case authProviderAction.PROVIDER_PASSWORD_UPDATE_INITIATE: {
      return {
        ...state, loader: true, providerData: {}        
      }
    }
    case authProviderAction.PROVIDER_PASSWORD_UPDATE_SUCCESS: {
      return {
        ...state, loader: false, providerData: payload.data
      }
    }
    case authProviderAction.PROVIDER_PASSWORD_UPDATE_FAILURE: {
      return {
        ...state, loader: false
      }
    }

    case authProviderAction.GARAGE_REVIEWS_INITIATE: {
      return {
        ...state, loader: true, providerGarageReviewData: {}        
      }
    }
    case authProviderAction.GARAGE_REVIEWS_SUCCESS: {

      return {  
        ...state, loader: false, providerGarageReviewData: payload.data
      }
    }
    case authProviderAction.GARAGE_REVIEWS_FAILURE: {
      return {
        ...state, loader: false
      }
    }

    case authProviderAction.DEALER_REVIEWS_INITIATE: {
      return {
        ...state, loader: true, providerDealerReviewData: {}        
      }
    }
    case authProviderAction.DEALER_REVIEWS_SUCCESS: {
      return {
        ...state, loader: false, providerDealerReviewData: payload.data
      }
    }
    case authProviderAction.DEALER_REVIEWS_FAILURE: {
      return {
        ...state, loader: false
      }
    }

    case authProviderAction.SALES_REVIEWS_INITIATE: {
      return {
        ...state, loader: true, providerSalesReviewData: {}        
      }
    }
    case authProviderAction.SALES_REVIEWS_SUCCESS: {
      return {
        ...state, loader: false, providerSalesReviewData: payload.data
      }
    }
    case authProviderAction.SALES_REVIEWS_FAILURE: {
      return {
        ...state, loader: false
      }
    }
    default: 
      return state
  }
}