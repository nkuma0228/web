import { pageContentAction } from "../../actionTypes"
const initialState = {
  careerData: {},
  loader: false,
}

export default function career(state = initialState, {type, payload}) {
  switch(type) {
    case pageContentAction.GET_CAREER_INITIATE: {
      return {
        ...state, loader: true, careerData: {}        
      }
    }
    case pageContentAction.GET_CAREER_SUCCESS: {
      return {
        ...state, loader: false, careerData: payload.data
      }
    }
    case pageContentAction.GET_CAREER_FAILURE: {
      return {
        ...state, loader: false
      }
    }
    default: 
      return state
  }
}