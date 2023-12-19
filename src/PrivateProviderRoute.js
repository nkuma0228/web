import {  Navigate  } from 'react-router-dom'
import { isProviderLoggedIn } from './utils';

export default function PrivateProviderRoute({ component: Component, ...rest }) {

    let isLogged = false;
    const checkAuth = () => {
        return isProviderLoggedIn('providerLogin');
    }

    if(checkAuth()) {
        isLogged = true;
    }
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return isLogged ? <Component /> : <Navigate to="/" />;
}