import React from 'react';
import './App.css';
import { Route, HashRouter, Routes, Navigate  } from 'react-router-dom'

import PrivateRoute from "../src/PrivateRoute";
import PrivateProviderRoute from "../src/PrivateProviderRoute";
import PrivateCorporateRoute from "../src/PrivateCorporateRoute";

import Home from '../src/app/website/home';
import Signup from '../src/app/website/signup';
import SignupServiceProvider from '../src/app/website/signup-service-provider';
import SignupServiceProviderGarage from '../src/app/website/signup-service-provider-garage';
import SignupServiceProviderDealer from '../src/app/website/signup-service-provider-dealer';
import SignupServiceProviderSales from '../src/app/website/signup-service-provider-sales';
import SignupCorporate from '../src/app/website/signup-corporate';

import ClientResetPassword from '../src/app/website/clientResetPassword';
import ProviderResetPassword from '../src/app/website/providerResetPassword';

import AutoRepair from '../src/app/website/auto-repair';
import ServiceAutoRepair from '../src/app/website/service-auto-repair';
import AutoParts from '../src/app/website/auto-parts';
import ServiceAutoParts from '../src/app/website/service-auto-parts';
import AutoSales from '../src/app/website/auto-sales';
import ServiceAutoSales from '../src/app/website/service-auto-sales';
import AboutUs from '../src/app/website/about-us';
import TermsCondition from '../src/app/website/terms-condition';
import PrivacyPolicy from '../src/app/website/privacy-policy';
import Careers from '../src/app/website/careers';
import ContactUs from '../src/app/website/contact-us';
import Faq from '../src/app/website/faq';
import ExoticsAntiques from '../src/app/website/exoticsAntiques';
import PartsDeal from '../src/app/website/partsDeal';

import ClientDashboard from '../src/app/client/dashboard';
import ClientAccount from '../src/app/client/account';
import MyVehicle from '../src/app/client/my-vehicle';
import MyVehicleHistory from '../src/app/client/my-vehicle-history';
import ServiceGarage from '../src/app/client/service-garage';
import ServiceGarageList from '../src/app/client/service-garage-list';
import ServiceGarageDetail from '../src/app/client/service-garage-detail';
import ServiceGarageReview from '../src/app/client/myGarageReviews';
import MyBookingGarage from '../src/app/client/mybooking-garage';
import MyBookingParts from '../src/app/client/mybooking-parts';
import MyBookingDealers  from '../src/app/client/mybooking-dealers';

import ServiceParts from '../src/app/client/service-parts';
import ServicePartsList from '../src/app/client/service-parts-list';
import ServicePartsDetail from '../src/app/client/service-parts-detail';
import ServicePartsReview from '../src/app/client/myDealerReviews';

import ServiceClientAutoSales from '../src/app/client/service-auto-sales';
import ServiceClientAutoSalesList from '../src/app/client/service-auto-sales-list';
import ServiceClientAutoSalesDetail from '../src/app/client/service-auto-sales-detail';
import ServiceClientAutoSalesReview from '../src/app/client/mySalesReviews';

import ServiceClientCorporate from '../src/app/client/service-corporate';
import ServiceClientCorporateList from '../src/app/client/service-corporate-list';
import ServiceClientCorporateDetail from '../src/app/client/service-corporate-detail';
import ServiceClientCorporateReview from '../src/app/client/myCorporateReviews';

import GarageDashboard from '../src/app/garage/dashboard';
import GarageDashboardCorporate from '../src/app/garage/dashboardCorporate';
import GarageHistory from '../src/app/garage/client-history';
import GarageHistoryDetail from '../src/app/garage/client-history-detail';
import FutureAppointmentCalendar from '../src/app/garage/future-appointment-calendar';
import FutureAppointmentCalendarDetail from '../src/app/garage/future-appointment-calendar-detail';
import GarageAccount from '../src/app/garage/account';
import GarageAccountDetails from '../src/app/garage/account_details';
import MyGarage from '../src/app/garage/mygarage';
import MyGarageReviews from '../src/app/garage/myReviews';
import Scheduling from '../src/app/garage/scheduling';
import CorporateScheduling from '../src/app/garage/corporateScheduling';
import MyCalendar from '../src/app/garage/mycalendar';
import Mechanic from '../src/app/garage/mechanic';
import CalendarDetail from '../src/app/garage/calendarDetail';
import CalendarCorporateDetail from '../src/app/garage/calendarCorporateDetail';
import CalendarAppointmentDetail from '../src/app/garage/calendarAppointmentDetail';
import GarageServiceParts from './app/garage/service-parts';
import GarageServicePartsRequest from '../src/app/garage/service-parts-request';
import GarageServicePartsRequestList from '../src/app/garage/service-parts-request-list';
import GarageServicePartsRequestDetail from './app/garage/service-parts-request-detail';

import GarageCorporatePortal from './app/garage/corporate-portal';
import GarageCorporatePortalRequest from '../src/app/garage/corporate-portal-request';
import GarageCorporatePortalRequestList from '../src/app/garage/corporate-portal-request-list';
import GarageCorporatePortalRequestDetail from './app/garage/corporate-portal-request-detail';

import DealerClientDashboard from '../src/app/dealer/dashboardClient';
import DealerAccount from '../src/app/dealer/account';
import DealerAccountDetails from '../src/app/dealer/account_details';
import MyPart from '../src/app/dealer/mypart';
import MyDealerReviews from '../src/app/dealer/myReviews';
import SubmitQuote from '../src/app/dealer/submitQuote';
import ViewQuote from '../src/app/dealer/viewQuote';
import MyDealerCalendar from '../src/app/dealer/myCalendar';
import MyDealerCalendarGarage from '../src/app/dealer/myCalendar_garage';
import CalendarDealerDetail from '../src/app/dealer/calendarDetail';

import DealerHistory from '../src/app/dealer/client-history';
import DealerHistoryDetail from '../src/app/dealer/client-history-detail';
import DealerFutureAppointmentCalendar from '../src/app/dealer/future-appointment-calendar';
import DealerFutureAppointmentCalendarDetail from '../src/app/dealer/future-appointment-calendar-detail';

import DealerGarageDashboard from '../src/app/dealer/dashboardGarage';
import SubmitGarageQuote from '../src/app/dealer/submitQuote_garage';
import ViewGarageQuote from '../src/app/dealer/viewQuote_garage';

import DealerCorporateDashboard from '../src/app/dealer/dashboardCorporate';
import SubmitCorporateQuote from '../src/app/dealer/submitQuote_corporate';
import ViewCorporateQuote from '../src/app/dealer/viewQuote_corporate';

import SalesDashboard from './app/sales/dashboard';
import SalesDashboardCorporate from './app/sales/dashboard-corporate';
import MySales from '../src/app/sales/mypart';
import MySalesReviews from '../src/app/sales/myReviews';
import SalesAccount from '../src/app/sales/account';
import SalesAccountDetails from '../src/app/sales/account_details';
import SalesMyVehicle from '../src/app/sales/my-vehicle';
import SalesScheduling from '../src/app/sales/scheduling';
import MySalesCalendar from '../src/app/sales/mycalendar';
import SalesCalendarDetail from '../src/app/sales/calendarDetail';
import CalendarSalesAppointmentDetail from '../src/app/sales/calendarSalesAppointmentDetail';
import SalesAgent from '../src/app/sales/salesAgent';

// import CorporateDashboard from './app/corporate/dashboard';
// import CorporateGarageDashboard from './app/corporate/dashboardGarage';
// import CorporateDealerDashboard from './app/corporate/dashboardDealer';
// import CorporateAccount from '../src/app/corporate/account';
// import MyCorporate from '../src/app/corporate/mycorporate';
// import MyCorporateReviews from '../src/app/corporate/myReviews';
// import MyCorporateCalendar from '../src/app/corporate/myCalendar';
// import MyCorporateGarageCalendar from '../src/app/corporate/myCalendarGarage';
// import MyCorporateDealerCalendar from '../src/app/corporate/myCalendarDealer';
// import CorporateCalendarDetail from '../src/app/corporate/calendarDetail';

import CorporateDashboard from '../src/app/corporate/dashboard';
import CorporateAccount from '../src/app/corporate/account';
import CorporateMyVehicle from '../src/app/corporate/my-vehicle';
import CorporateMyVehicleHistory from '../src/app/corporate/my-vehicle-history';
import CorporateServiceGarage from '../src/app/corporate/service-garage';
import CorporateServiceGarageList from '../src/app/corporate/service-garage-list';
import CorporateServiceGarageDetail from '../src/app/corporate/service-garage-detail';
import CorporateServiceGarageReview from '../src/app/corporate/myGarageReviews';
import CorporateMyBookingGarage from '../src/app/corporate/mybooking-garage';
import CorporateMyBookingParts from '../src/app/corporate/mybooking-parts';
import CorporateMyBookingSales from '../src/app/corporate/mybooking-sales';

import CorporateServiceParts from '../src/app/corporate/service-parts';
import CorporateServicePartsList from '../src/app/corporate/service-parts-list';
import CorporateServicePartsDetail from '../src/app/corporate/service-parts-detail';
import CorporateServicePartsReview from '../src/app/corporate/myDealerReviews';

import CorporateServiceSales from '../src/app/corporate/service-sales';
import CorporateServiceSalesList from '../src/app/corporate/service-sales-list';
import CorporateServiceSalesDetail from '../src/app/corporate/service-sales-detail';
import CorporateServiceSalesReview from '../src/app/corporate/mySalesReviews';

function App() {
  return (
  <React.Fragment>
    <HashRouter>
      <Routes>  
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/signup" element={<Signup/>} />
        <Route exact path="/service-provider-signup" element={<SignupServiceProvider/>} />
        <Route exact path="/service-provider-signup/garage" element={<SignupServiceProviderGarage/>} />
        <Route exact path="/service-provider-signup/dealer" element={<SignupServiceProviderDealer/>} />
        <Route exact path="/service-provider-signup/sales" element={<SignupServiceProviderSales/>} />
        <Route exact path="/signup/corporate" element={<SignupCorporate/>} />

        <Route exact path="/reset-password/:param1" element={<ClientResetPassword/>} />
        <Route exact path="/provider-reset-password/:param1" element={<ProviderResetPassword/>} />

        <Route exact path="/auto-repair" element={<AutoRepair/>} />
        <Route exact path="/service-auto-repair" element={<ServiceAutoRepair/>} />
        <Route exact path="/auto-parts" element={<AutoParts/>} />
        <Route exact path="/service-auto-parts" element={<ServiceAutoParts/>} />
        <Route exact path="/auto-sales" element={<AutoSales/>} />
        <Route exact path="/service-auto-sales" element={<ServiceAutoSales/>} />
        <Route exact path="/about-us" element={<AboutUs/>} />
        <Route exact path="/terms-condition" element={<TermsCondition/>} />
        <Route exact path="/privacy-policy" element={<PrivacyPolicy/>} />
        <Route exact path="/careers" element={<Careers/>} />
        <Route exact path="/contact-us" element={<ContactUs/>} />
        <Route exact path="/faq" element={<Faq/>} />
        <Route exact path="/exotics-antiques" element={<ExoticsAntiques/>} />
        <Route exact path="/parts-deal" element={<PartsDeal/>} />
        
        {/* Client */}
        <Route exact path="/client/dashboard" element={<PrivateRoute component={ClientDashboard} />} />
        <Route exact path="/client/account" element={<PrivateRoute component={ClientAccount} />} />
        <Route exact path="/client/my-vehicle" element={<PrivateRoute component={MyVehicle} />} />
        <Route exact path="/client/my-vehicle-history" element={<PrivateRoute component={MyVehicleHistory} />} />

        <Route exact path="/client/service-garage" element={<PrivateRoute component={ServiceGarage} />} />
        <Route exact path="/client/service-garage/list" element={<PrivateRoute component={ServiceGarageList} />} />
        <Route exact path="/client/service-garage/detail" element={<PrivateRoute component={ServiceGarageDetail} />} />
        <Route exact path="/client/service-garage/review" element={<PrivateRoute component={ServiceGarageReview} />} />

        <Route exact path="/client/service-parts" element={<PrivateRoute component={ServiceParts} />} />
        <Route exact path="/client/service-parts/list" element={<PrivateRoute component={ServicePartsList} />} />
        <Route exact path="/client/service-parts/detail" element={<PrivateRoute component={ServicePartsDetail} />} />
        <Route exact path="/client/service-parts/review" element={<PrivateRoute component={ServicePartsReview} />} />

        <Route exact path="/client/service-auto-sales" element={<PrivateRoute component={ServiceClientAutoSales} />} />
        <Route exact path="/client/service-auto-sales/list" element={<PrivateRoute component={ServiceClientAutoSalesList} />} />
        <Route exact path="/client/service-auto-sales/detail" element={<PrivateRoute component={ServiceClientAutoSalesDetail} />} />
        <Route exact path="/client/service-auto-sales/review" element={<PrivateRoute component={ServiceClientAutoSalesReview} />} />

        <Route exact path="/client/service-corporate" element={<PrivateRoute component={ServiceClientCorporate} />} />
        <Route exact path="/client/service-corporate/list" element={<PrivateRoute component={ServiceClientCorporateList} />} />
        <Route exact path="/client/service-corporate/detail" element={<PrivateRoute component={ServiceClientCorporateDetail} />} />
        <Route exact path="/client/service-corporate/review" element={<PrivateRoute component={ServiceClientCorporateReview} />} />

        <Route exact path="/client/my-bookings" element={<PrivateRoute component={MyBookingGarage} />} />
        <Route exact path="/client/my-bookings/garages" element={<PrivateRoute component={MyBookingGarage} />} />
        <Route exact path="/client/my-bookings/parts" element={<PrivateRoute component={MyBookingParts} />} />
        <Route exact path="/client/my-bookings/dealer" element={<PrivateRoute component={MyBookingDealers} />} />

        {/* Garage */}
        <Route exact path="/garage/dashboard" element={<PrivateProviderRoute component={GarageDashboard} />} />
        <Route exact path="/garage/dashboard/corporate" element={<PrivateProviderRoute component={GarageDashboardCorporate} />} />

        <Route exact path="/garage/history" element={<PrivateProviderRoute component={GarageHistory} />} />
        <Route exact path="/garage/history/details" element={<PrivateProviderRoute component={GarageHistoryDetail} />} />
        <Route exact path="/garage/future_appointment_calendar" element={<PrivateProviderRoute component={FutureAppointmentCalendar} />} />
        <Route exact path="/garage/future_appointment_calendar/details" element={<PrivateProviderRoute component={FutureAppointmentCalendarDetail} />} />
        <Route exact path="/garage/account" element={<PrivateProviderRoute component={GarageAccount} />} />
        <Route exact path="/garage/account/details" element={<PrivateProviderRoute component={GarageAccountDetails} />} />
        <Route exact path="/garage/my" element={<PrivateProviderRoute component={MyGarage} />} />
        <Route exact path="/garage/my/reviews" element={<PrivateProviderRoute component={MyGarageReviews} />} />
        <Route exact path="/garage/scheduling" element={<PrivateProviderRoute component={Scheduling} />} />
        <Route exact path="/garage/corporate/scheduling" element={<PrivateProviderRoute component={CorporateScheduling} />} />
        <Route exact path="/garage/mycalendar" element={<PrivateProviderRoute component={MyCalendar} />} />
        <Route exact path="/garage/mechanic" element={<PrivateProviderRoute component={Mechanic} />} />
        <Route exact path="/garage/mycalendar/detail" element={<PrivateProviderRoute component={CalendarDetail} />} />
        <Route exact path="/garage/mycalendar/corporate/detail" element={<PrivateProviderRoute component={CalendarCorporateDetail} />} />
        <Route exact path="/garage/mycalendar/appointment/detail" element={<PrivateProviderRoute component={CalendarAppointmentDetail} />} />
        <Route exact path="/garage/service-parts" element={<PrivateProviderRoute component={GarageServiceParts} />} />
        <Route exact path="/garage/service-parts-request" element={<PrivateProviderRoute component={GarageServicePartsRequest} />} />
        <Route exact path="/garage/service-parts-request/list" element={<PrivateProviderRoute component={GarageServicePartsRequestList} />} />
        <Route exact path="/garage/service-parts-request/detail" element={<PrivateProviderRoute component={GarageServicePartsRequestDetail} />} />

        <Route exact path="/garage/corporate-portal" element={<PrivateProviderRoute component={GarageCorporatePortal} />} />
        <Route exact path="/garage/corporate-portal-request" element={<PrivateProviderRoute component={GarageCorporatePortalRequest} />} />
        <Route exact path="/garage/corporate-portal-request/list" element={<PrivateProviderRoute component={GarageCorporatePortalRequestList} />} />
        <Route exact path="/garage/corporate-portal-request/detail" element={<PrivateProviderRoute component={GarageCorporatePortalRequestDetail} />} />


        {/* Dealer */}
        <Route exact path="/dealer/dashboard" element={<PrivateProviderRoute component={DealerClientDashboard} />} />
        
        <Route exact path="/dealer/history" element={<PrivateProviderRoute component={DealerHistory} />} />
        <Route exact path="/dealer/history/details" element={<PrivateProviderRoute component={DealerHistoryDetail} />} />
        <Route exact path="/dealer/future_appointment_calendar" element={<PrivateProviderRoute component={DealerFutureAppointmentCalendar} />} />
        <Route exact path="/dealer/future_appointment_calendar/details" element={<PrivateProviderRoute component={DealerFutureAppointmentCalendarDetail} />} />

        <Route exact path="/dealer/dashboard/client" element={<PrivateProviderRoute component={DealerClientDashboard} />} />
        <Route exact path="/dealer/account" element={<PrivateProviderRoute component={DealerAccount} />} />
        <Route exact path="/dealer/account/details" element={<PrivateProviderRoute component={DealerAccountDetails} />} />
        <Route exact path="/dealer/my_parts" element={<PrivateProviderRoute component={MyPart} />} />
        <Route exact path="/dealer/my/reviews" element={<PrivateProviderRoute component={MyDealerReviews} />} />
        <Route exact path="/dealer/quote/submit" element={<PrivateProviderRoute component={SubmitQuote} />} />
        <Route exact path="/dealer/quote/view" element={<PrivateProviderRoute component={ViewQuote} />} />
        <Route exact path="/dealer/mycalendar" element={<PrivateProviderRoute component={MyDealerCalendar} />} />
        <Route exact path="/dealer/mycalendar/client" element={<PrivateProviderRoute component={MyDealerCalendar} />} />
        <Route exact path="/dealer/mycalendar/garages" element={<PrivateProviderRoute component={MyDealerCalendarGarage} />} />
        <Route exact path="/dealer/mycalendar/detail" element={<PrivateProviderRoute component={CalendarDealerDetail} />} />

        <Route exact path="/dealer/dashboard/garages" element={<PrivateProviderRoute component={DealerGarageDashboard} />} />
        <Route exact path="/dealer/garage_quote/submit" element={<PrivateProviderRoute component={SubmitGarageQuote} />} />
        <Route exact path="/dealer/garage_quote/view" element={<PrivateProviderRoute component={ViewGarageQuote} />} />

        <Route exact path="/dealer/dashboard/corporate" element={<PrivateProviderRoute component={DealerCorporateDashboard} />} />
        <Route exact path="/dealer/corporate_quote/submit" element={<PrivateProviderRoute component={SubmitCorporateQuote} />} />
        <Route exact path="/dealer/corporate_quote/view" element={<PrivateProviderRoute component={ViewCorporateQuote} />} />

        {/* Sales */}
        <Route exact path="/sales/dashboard" element={<PrivateProviderRoute component={SalesDashboard} />} />
        <Route exact path="/sales/dashboard/corporate" element={<PrivateProviderRoute component={SalesDashboardCorporate} />} />
        <Route exact path="/sales/my_sales" element={<PrivateProviderRoute component={MySales} />} />
        <Route exact path="/sales/my/reviews" element={<PrivateProviderRoute component={MySalesReviews} />} />
        <Route exact path="/sales/account" element={<PrivateProviderRoute component={SalesAccount} />} />
        <Route exact path="/sales/account/details" element={<PrivateProviderRoute component={SalesAccountDetails} />} />
        <Route exact path="/sales/my-vehicles" element={<PrivateProviderRoute component={SalesMyVehicle} />} />
        <Route exact path="/sales/scheduling" element={<PrivateProviderRoute component={SalesScheduling} />} />
        <Route exact path="/sales/mycalendar" element={<PrivateProviderRoute component={MySalesCalendar} />} />
        <Route exact path="/sales/mycalendar/detail" element={<PrivateProviderRoute component={SalesCalendarDetail} />} />
        <Route exact path="/sales/mycalendar/appointment/detail" element={<PrivateProviderRoute component={CalendarSalesAppointmentDetail} />} />
        <Route exact path="/sales/agent" element={<PrivateProviderRoute component={SalesAgent} />} />

        {/* Corporate */}
        <Route exact path="/corporate/dashboard" element={<PrivateCorporateRoute component={CorporateDashboard} />} />
        <Route exact path="/corporate/account" element={<PrivateCorporateRoute component={CorporateAccount} />} />
        <Route exact path="/corporate/client/my-vehicle" element={<PrivateCorporateRoute component={CorporateMyVehicle} />} />
        <Route exact path="/corporate/client/my-vehicle-history" element={<PrivateCorporateRoute component={CorporateMyVehicleHistory} />} />

        <Route exact path="/corporate/service-garage" element={<PrivateCorporateRoute component={CorporateServiceGarage} />} />
        <Route exact path="/corporate/service-garage/list" element={<PrivateCorporateRoute component={CorporateServiceGarageList} />} />
        <Route exact path="/corporate/service-garage/detail" element={<PrivateCorporateRoute component={CorporateServiceGarageDetail} />} />
        <Route exact path="/corporate/service-garage/review" element={<PrivateCorporateRoute component={CorporateServiceGarageReview} />} />

        <Route exact path="/corporate/service-parts" element={<PrivateCorporateRoute component={CorporateServiceParts} />} />
        <Route exact path="/corporate/service-parts/list" element={<PrivateCorporateRoute component={CorporateServicePartsList} />} />
        <Route exact path="/corporate/service-parts/detail" element={<PrivateCorporateRoute component={CorporateServicePartsDetail} />} />
        <Route exact path="/corporate/service-parts/review" element={<PrivateCorporateRoute component={CorporateServicePartsReview} />} />

        <Route exact path="/corporate/service-auto-sales" element={<PrivateCorporateRoute component={CorporateServiceSales} />} />
        <Route exact path="/corporate/service-auto-sales/list" element={<PrivateCorporateRoute component={CorporateServiceSalesList} />} />
        <Route exact path="/corporate/service-auto-sales/detail" element={<PrivateCorporateRoute component={CorporateServiceSalesDetail} />} />
        <Route exact path="/corporate/service-auto-sales/review" element={<PrivateCorporateRoute component={CorporateServiceSalesReview} />} />

        <Route exact path="/corporate/my-bookings" element={<PrivateCorporateRoute component={CorporateMyBookingGarage} />} />
        <Route exact path="/corporate/my-bookings/garages" element={<PrivateCorporateRoute component={CorporateMyBookingGarage} />} />
        <Route exact path="/corporate/my-bookings/parts" element={<PrivateCorporateRoute component={CorporateMyBookingParts} />} />
        <Route exact path="/corporate/my-bookings/sales" element={<PrivateCorporateRoute component={CorporateMyBookingSales} />} />

        {/* <Route exact path="/corporate/dashboard/client" element={<PrivateProviderRoute component={CorporateDashboard} />} />
        <Route exact path="/corporate/dashboard/garage" element={<PrivateProviderRoute component={CorporateGarageDashboard} />} />
        <Route exact path="/corporate/dashboard/dealer" element={<PrivateProviderRoute component={CorporateDealerDashboard} />} />

        <Route exact path="/corporate/account" element={<PrivateProviderRoute component={CorporateAccount} />} />
        <Route exact path="/corporate/my" element={<PrivateProviderRoute component={MyCorporate} />} />
        <Route exact path="/corporate/my/reviews" element={<PrivateProviderRoute component={MyCorporateReviews} />} />
        <Route exact path="/corporate/mycalendar/client" element={<PrivateProviderRoute component={MyCorporateCalendar} />} />
        <Route exact path="/corporate/mycalendar/garage" element={<PrivateProviderRoute component={MyCorporateGarageCalendar} />} />
        <Route exact path="/corporate/mycalendar/dealer" element={<PrivateProviderRoute component={MyCorporateDealerCalendar} />} />
        <Route exact path="/corporate/mycalendar/detail" element={<PrivateProviderRoute component={CorporateCalendarDetail} />} /> */}
      </Routes>
    </HashRouter>
  </React.Fragment>
  );
}

export default App;

