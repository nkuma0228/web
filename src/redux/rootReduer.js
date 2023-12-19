import { combineReducers } from "redux";
import client from "./reducers/client/authReducer";
import clientVehicle from "./reducers/client/vehicleReducer";
import searching from "./reducers/client/searchReducer";
import clientProviderData from "./reducers/client/providerReducer";

import provider from "./reducers/provider/authReducer";
import garageRequestData from "./reducers/provider/garageReducer";
import garageSearching from "./reducers/provider/searchReducer";
import dealerRequestData from "./reducers/provider/dealerReducer";
import salesRequestData from "./reducers/provider/salesReducer";
import salesVehicle from "./reducers/provider/vehicleReducer";

import corporate from "./reducers/corporate/authReducer";
import corporateVehicle from "./reducers/corporate/vehicleReducer";
import corporatesearching from "./reducers/corporate/searchReducer";
import corporateProviderData from "./reducers/corporate/providerReducer";

import staticPage from "./reducers/static/pageReducer";
import faq from "./reducers/static/faqReducer";
import career from "./reducers/static/careerReducer";

const rootReducer = combineReducers({
    client,
    provider,
    staticPage,
    faq,
    career,
    clientVehicle,
    searching,
    clientProviderData,
    dealerRequestData,
    salesVehicle,
    garageRequestData,
    garageSearching,
    salesRequestData,
    corporate,
    corporateVehicle,
    corporatesearching,
    corporateProviderData
});
export default rootReducer