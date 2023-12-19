import { corporateAction } from "../../actionTypes"
const initialState = {
    garageData: {},
    dealerData: {},
    salesData: {},
    requestGarageListingData: {},
    requestGarageUpcomingData: {},
    requestGarageOngoingData: {},
    requestGarageCompletedData: {},
    requestPartListingData: {},
    requestSalesListingData: {},
    requestPartsUpcomingData: {},
    requestPartsOngoingData: {},
    requestPartsCompletedData: {},
    providerGarageReviewData: {},
    providerDealerReviewData: {},
    providerSalesReviewData: {},
    requestSalesUpcomingData: {},
    requestSalesOngoingData: {},
    requestSalesCompletedData: {},
    loader: false,
}

export default function corporateProviderData(state = initialState, { type, payload }) {
    switch (type) {
        case corporateAction.GARAGE_VIEW_INITIATE: {
            return {
                ...state, loader: true, garageData: {}
            }
        }
        case corporateAction.GARAGE_VIEW_SUCCESS: {
            return {
                ...state, loader: false, garageData: payload.data
            }
        }
        case corporateAction.GARAGE_VIEW_FAILURE: {
            return {
                ...state, loader: false
            }
        }
        case corporateAction.DEALER_VIEW_INITIATE: {
            return {
                ...state, loader: true, dealerData: {}
            }
        }
        case corporateAction.DEALER_VIEW_SUCCESS: {
            return {
                ...state, loader: false, dealerData: payload.data
            }
        }
        case corporateAction.DEALER_VIEW_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case corporateAction.SALES_VIEW_INITIATE: {
            return {
                ...state, loader: true, salesData: {}
            }
        }
        case corporateAction.SALES_VIEW_SUCCESS: {
            return {
                ...state, loader: false, salesData: payload.data
            }
        }
        case corporateAction.SALES_VIEW_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case corporateAction.REQUEST_GARAGE_LIST_INITIATE: {
            return {
                ...state, loader: true, requestGarageListingData: {}
            }
        }
        case corporateAction.REQUEST_GARAGE_LIST_SUCCESS: {
            return {
                ...state, loader: false, requestGarageListingData: payload.data
            }
        }
        case corporateAction.REQUEST_GARAGE_LIST_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case corporateAction.REQUEST_GARAGE_UPCOMING_INITIATE: {
            return {
                ...state, loader: true, requestGarageListingData: {}
            }
        }
        case corporateAction.REQUEST_GARAGE_UPCOMING_SUCCESS: {
            return {
                ...state, loader: false, requestGarageUpcomingData: payload.data
            }
        }
        case corporateAction.REQUEST_GARAGE_UPCOMING_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case corporateAction.REQUEST_GARAGE_ONGOING_INITIATE: {
            return {
                ...state, loader: true, requestGarageOngoingData: {}
            }
        }
        case corporateAction.REQUEST_GARAGE_ONGOING_SUCCESS: {
            return {
                ...state, loader: false, requestGarageOngoingData: payload.data
            }
        }
        case corporateAction.REQUEST_GARAGE_ONGOING_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case corporateAction.REQUEST_GARAGE_COMPLETED_INITIATE: {
            return {
                ...state, loader: true, requestGarageCompletedData: {}
            }
        }
        case corporateAction.REQUEST_GARAGE_COMPLETED_SUCCESS: {
            return {
                ...state, loader: false, requestGarageCompletedData: payload.data
            }
        }
        case corporateAction.REQUEST_GARAGE_COMPLETED_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case corporateAction.REQUEST_PARTS_UPCOMING_INITIATE: {
            return {
                ...state, loader: true, requestPartsListingData: {}
            }
        }
        case corporateAction.REQUEST_PARTS_UPCOMING_SUCCESS: {
            return {
                ...state, loader: false, requestPartsUpcomingData: payload.data
            }
        }
        case corporateAction.REQUEST_PARTS_UPCOMING_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case corporateAction.REQUEST_PARTS_ONGOING_INITIATE: {
            return {
                ...state, loader: true, requestPartsOngoingData: {}
            }
        }
        case corporateAction.REQUEST_PARTS_ONGOING_SUCCESS: {
            return {
                ...state, loader: false, requestPartsOngoingData: payload.data
            }
        }
        case corporateAction.REQUEST_PARTS_ONGOING_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case corporateAction.REQUEST_PARTS_COMPLETED_INITIATE: {
            return {
                ...state, loader: true, requestPartsCompletedData: {}
            }
        }
        case corporateAction.REQUEST_PARTS_COMPLETED_SUCCESS: {
            return {
                ...state, loader: false, requestPartsCompletedData: payload.data
            }
        }
        case corporateAction.REQUEST_PARTS_COMPLETED_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case corporateAction.RATING_CREATE_INITIATE: {
            return {
                ...state, loader: true
            }
        }
        case corporateAction.RATING_CREATE_SUCCESS: {
            return {
                ...state, loader: false
            }
        }
        case corporateAction.RATING_CREATE_FAILURE: {
            return {
                ...state, loader: false
            }
        }
        case corporateAction.REQUEST_PARTS_LIST_INITIATE: {
            return {
                ...state, loader: true, requestPartListingData: {}
            }
        }
        case corporateAction.REQUEST_PARTS_LIST_SUCCESS: {
            return {
                ...state, loader: false, requestPartListingData: payload.data
            }
        }
        case corporateAction.REQUEST_PARTS_LIST_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case corporateAction.REQUEST_SALES_LIST_INITIATE: {
            return {
                ...state, loader: true, requestSalesListingData: {}
            }
        }
        case corporateAction.REQUEST_SALES_LIST_SUCCESS: {
            return {
                ...state, loader: false, requestSalesListingData: payload.data
            }
        }
        case corporateAction.REQUEST_SALES_LIST_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case corporateAction.GARAGE_REVIEWS_INITIATE: {
            return {
                ...state, loader: true, providerGarageReviewData: {}
            }
        }
        case corporateAction.GARAGE_REVIEWS_SUCCESS: {

            return {
                ...state, loader: false, providerGarageReviewData: payload.data
            }
        }
        case corporateAction.GARAGE_REVIEWS_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case corporateAction.DEALER_REVIEWS_INITIATE: {
            return {
                ...state, loader: true, providerDealerReviewData: {}
            }
        }
        case corporateAction.DEALER_REVIEWS_SUCCESS: {
            return {
                ...state, loader: false, providerDealerReviewData: payload.data
            }
        }
        case corporateAction.DEALER_REVIEWS_FAILURE: {
            return {
                ...state, loader: false
            }
        }
        case corporateAction.SALES_REVIEWS_INITIATE: {
            return {
                ...state, loader: true, providerSalesReviewData: {}
            }
        }
        case corporateAction.SALES_REVIEWS_SUCCESS: {
            return {
                ...state, loader: false, providerSalesReviewData: payload.data
            }
        }
        case corporateAction.SALES_REVIEWS_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case corporateAction.REQUEST_SALES_UPCOMING_INITIATE: {
            return {
                ...state, loader: true, requestSalesUpcomingData: {}
            }
        }
        case corporateAction.REQUEST_SALES_UPCOMING_SUCCESS: {
            return {
                ...state, loader: false, requestSalesUpcomingData: payload.data
            }
        }
        case corporateAction.REQUEST_SALES_UPCOMING_FAILURE: {
            return {
                ...state, loader: false
            }
        }
        case corporateAction.REQUEST_SALES_ONGOING_INITIATE: {
            return {
                ...state, loader: true, requestSalesOngoingData: {}
            }
        }
        case corporateAction.REQUEST_SALES_ONGOING_SUCCESS: {
            return {
                ...state, loader: false, requestSalesOngoingData: payload.data
            }
        }
        case corporateAction.REQUEST_SALES_ONGOING_FAILURE: {
            return {
                ...state, loader: false
            }
        }
        case corporateAction.REQUEST_SALES_COMPLETED_INITIATE: {
            return {
                ...state, loader: true, requestSalesCompletedData: {}
            }
        }
        case corporateAction.REQUEST_SALES_COMPLETED_SUCCESS: {
            return {
                ...state, loader: false, requestSalesCompletedData: payload.data
            }
        }
        case corporateAction.REQUEST_SALES_COMPLETED_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        default:
            return state
    }
}