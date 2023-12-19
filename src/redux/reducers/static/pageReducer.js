import { pageContentAction } from "../../actionTypes"
const initialState = {
  staticData: {},
  loader: false,
}

export default function staticPage(state = initialState, {type, payload}) {
  switch(type) {
    case pageContentAction.GET_PAGE_DETAILS_INITIATE: {
      return {
        ...state, loader: true, staticData: {}        
      }
    }
    case pageContentAction.GET_PAGE_DETAILS_SUCCESS: {
      return {
        ...state, loader: false, staticData: payload.data
      }
    }
    case pageContentAction.GET_PAGE_DETAILS_FAILURE: {
      return {
        ...state, loader: false
      }
    }
    default: 
      return state
  }
}