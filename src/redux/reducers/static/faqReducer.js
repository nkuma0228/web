import { pageContentAction } from "../../actionTypes"
const initialState = {
  faqData: {},
  loader: false,
}

export default function faq(state = initialState, {type, payload}) {
  switch(type) {
    case pageContentAction.GET_FAQ_INITIATE: {
      return {
        ...state, loader: true, faqData: {}        
      }
    }
    case pageContentAction.GET_FAQ_SUCCESS: {
      return {
        ...state, loader: false, faqData: payload.data
      }
    }
    case pageContentAction.GET_FAQ_FAILURE: {
      return {
        ...state, loader: false
      }
    }
    default: 
      return state
  }
}