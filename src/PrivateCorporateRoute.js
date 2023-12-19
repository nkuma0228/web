import {  Navigate  } from 'react-router-dom'
import { isCorporateLoggedIn } from './utils';

export default function PrivateCorporateRoute({ component: Component, ...rest }) {

    let isLogged = false;
    const checkAuth = () => {
        return isCorporateLoggedIn('corporateLogin');
    }

    if(checkAuth()) {
        isLogged = true;
    }
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return isLogged ? <Component /> : <Navigate to="/" />;
}