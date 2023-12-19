import { clientAction } from "../../actionTypes"
const initialState = {
    garageData: {},
    dealerData: {},
    salesData: {},
    corporateData: {},
    requestGarageListingData: {},
    requestGarageUpcomingData: {},
    requestGarageOngoingData: {},
    requestGarageCompletedData: {},
    requestPartListingData: {},
    requestPartsUpcomingData: {},
    requestPartsOngoingData: {},
    requestPartsCompletedData: {},
    requestSalesListingData: {},
    requestCorporateListingData: {},
    providerGarageReviewData: {},
    providerDealerReviewData: {},
    providerSalesReviewData: {},
    requestSalesUpcomingData: {},
    requestSalesOngoingData: {},
    requestSalesCompletedData: {},
    loader: false,
}

export default function clientProviderData(state = initialState, { type, payload }) {
    switch (type) {
        case clientAction.GARAGE_VIEW_INITIATE: {
            return {
                ...state, loader: true, garageData: {}
            }
        }
        case clientAction.GARAGE_VIEW_SUCCESS: {
            return {
                ...state, loader: false, garageData: payload.data
            }
        }
        case clientAction.GARAGE_VIEW_FAILURE: {
            return {
                ...state, loader: false
            }
        }
        case clientAction.DEALER_VIEW_INITIATE: {
            return {
                ...state, loader: true, dealerData: {}
            }
        }
        case clientAction.DEALER_VIEW_SUCCESS: {
            return {
                ...state, loader: false, dealerData: payload.data
            }
        }
        case clientAction.DEALER_VIEW_FAILURE: {
            return {
                ...state, loader: false
            }
        }
        case clientAction.SALES_VIEW_INITIATE: {
            return {
                ...state, loader: true, salesData: {}
            }
        }
        case clientAction.SALES_VIEW_SUCCESS: {
            return {
                ...state, loader: false, salesData: payload.data
            }
        }
        case clientAction.SALES_VIEW_FAILURE: {
            return {
                ...state, loader: false
            }
        }
        case clientAction.CORPORATE_VIEW_INITIATE: {
            return {
                ...state, loader: true, corporateData: {}
            }
        }
        case clientAction.CORPORATE_VIEW_SUCCESS: {
            return {
                ...state, loader: false, corporateData: payload.data
            }
        }
        case clientAction.CORPORATE_VIEW_FAILURE: {
            return {
                ...state, loader: false
            }
        }
        case clientAction.REQUEST_GARAGE_LIST_INITIATE: {
            return {
                ...state, loader: true, requestGarageListingData: {}
            }
        }
        case clientAction.REQUEST_GARAGE_LIST_SUCCESS: {
            return {
                ...state, loader: false, requestGarageListingData: payload.data
            }
        }
        case clientAction.REQUEST_GARAGE_LIST_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case clientAction.REQUEST_GARAGE_UPCOMING_INITIATE: {
            return {
                ...state, loader: true, requestGarageListingData: {}
            }
        }
        case clientAction.REQUEST_GARAGE_UPCOMING_SUCCESS: {
            return {
                ...state, loader: false, requestGarageUpcomingData: payload.data
            }
        }
        case clientAction.REQUEST_GARAGE_UPCOMING_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case clientAction.REQUEST_GARAGE_ONGOING_INITIATE: {
            return {
                ...state, loader: true, requestGarageOngoingData: {}
            }
        }
        case clientAction.REQUEST_GARAGE_ONGOING_SUCCESS: {
            return {
                ...state, loader: false, requestGarageOngoingData: payload.data
            }
        }
        case clientAction.REQUEST_GARAGE_ONGOING_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case clientAction.REQUEST_GARAGE_COMPLETED_INITIATE: {
            return {
                ...state, loader: true, requestGarageCompletedData: {}
            }
        }
        case clientAction.REQUEST_GARAGE_COMPLETED_SUCCESS: {
            return {
                ...state, loader: false, requestGarageCompletedData: payload.data
            }
        }
        case clientAction.REQUEST_GARAGE_COMPLETED_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case clientAction.REQUEST_PARTS_UPCOMING_INITIATE: {
            return {
                ...state, loader: true, requestPartsListingData: {}
            }
        }
        case clientAction.REQUEST_PARTS_UPCOMING_SUCCESS: {
            return {
                ...state, loader: false, requestPartsUpcomingData: payload.data
            }
        }
        case clientAction.REQUEST_PARTS_UPCOMING_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case clientAction.REQUEST_PARTS_ONGOING_INITIATE: {
            return {
                ...state, loader: true, requestPartsOngoingData: {}
            }
        }
        case clientAction.REQUEST_PARTS_ONGOING_SUCCESS: {
            return {
                ...state, loader: false, requestPartsOngoingData: payload.data
            }
        }
        case clientAction.REQUEST_PARTS_ONGOING_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case clientAction.REQUEST_PARTS_COMPLETED_INITIATE: {
            return {
                ...state, loader: true, requestPartsCompletedData: {}
            }
        }
        case clientAction.REQUEST_PARTS_COMPLETED_SUCCESS: {
            return {
                ...state, loader: false, requestPartsCompletedData: payload.data
            }
        }
        case clientAction.REQUEST_PARTS_COMPLETED_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case clientAction.RATING_CREATE_INITIATE: {
            return {
                ...state, loader: true
            }
        }
        case clientAction.RATING_CREATE_SUCCESS: {
            return {
                ...state, loader: false
            }
        }
        case clientAction.RATING_CREATE_FAILURE: {
            return {
                ...state, loader: false
            }
        }
        case clientAction.REQUEST_PARTS_LIST_INITIATE: {
            return {
                ...state, loader: true, requestPartListingData: {}
            }
        }
        case clientAction.REQUEST_PARTS_LIST_SUCCESS: {
            return {
                ...state, loader: false, requestPartListingData: payload.data
            }
        }
        case clientAction.REQUEST_PARTS_LIST_FAILURE: {
            return {
                ...state, loader: false
            }
        }
        case clientAction.REQUEST_SALES_LIST_INITIATE: {
            return {
                ...state, loader: true, requestSalesListingData: {}
            }
        }
        case clientAction.REQUEST_SALES_LIST_SUCCESS: {
            return {
                ...state, loader: false, requestSalesListingData: payload.data
            }
        }
        case clientAction.REQUEST_SALES_LIST_FAILURE: {
            return {
                ...state, loader: false
            }
        }
        case clientAction.REQUEST_CORPORATE_LIST_INITIATE: {
            return {
                ...state, loader: true, requestCorporateListingData: {}
            }
        }
        case clientAction.REQUEST_CORPORATE_LIST_SUCCESS: {
            return {
                ...state, loader: false, requestCorporateListingData: payload.data
            }
        }
        case clientAction.REQUEST_CORPORATE_LIST_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case clientAction.GARAGE_REVIEWS_INITIATE: {
            return {
                ...state, loader: true, providerGarageReviewData: {}
            }
        }
        case clientAction.GARAGE_REVIEWS_SUCCESS: {

            return {
                ...state, loader: false, providerGarageReviewData: payload.data
            }
        }
        case clientAction.GARAGE_REVIEWS_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case clientAction.DEALER_REVIEWS_INITIATE: {
            return {
                ...state, loader: true, providerDealerReviewData: {}
            }
        }
        case clientAction.DEALER_REVIEWS_SUCCESS: {
            return {
                ...state, loader: false, providerDealerReviewData: payload.data
            }
        }
        case clientAction.DEALER_REVIEWS_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case clientAction.SALES_REVIEWS_INITIATE: {
            return {
                ...state, loader: true, providerSalesReviewData: {}
            }
        }
        case clientAction.SALES_REVIEWS_SUCCESS: {
            return {
                ...state, loader: false, providerSalesReviewData: payload.data
            }
        }
        case clientAction.SALES_REVIEWS_FAILURE: {
            return {
                ...state, loader: false
            }
        }

        case clientAction.REQUEST_SALES_UPCOMING_INITIATE: {
            return {
                ...state, loader: true, requestSalesListingData: {}
            }
        }
        case clientAction.REQUEST_SALES_UPCOMING_SUCCESS: {
            return {
                ...state, loader: false, requestSalesUpcomingData: payload.data
            }
        }
        case clientAction.REQUEST_SALES_UPCOMING_FAILURE: {
            return {
                ...state, loader: false
            }
        }
        case clientAction.REQUEST_SALES_ONGOING_INITIATE: {
            return {
                ...state, loader: true, requestSalesOngoingData: {}
            }
        }
        case clientAction.REQUEST_SALES_ONGOING_SUCCESS: {
            return {
                ...state, loader: false, requestSalesOngoingData: payload.data
            }
        }
        case clientAction.REQUEST_SALES_ONGOING_FAILURE: {
            return {
                ...state, loader: false
            }
        }
        case clientAction.REQUEST_SALES_COMPLETED_INITIATE: {
            return {
                ...state, loader: true, requestSalesCompletedData: {}
            }
        }
        case clientAction.REQUEST_SALES_COMPLETED_SUCCESS: {
            return {
                ...state, loader: false, requestSalesCompletedData: payload.data
            }
        }
        case clientAction.REQUEST_SALES_COMPLETED_FAILURE: {
            return {
                ...state, loader: false
            }
        }
        default:
            return state
    }
}