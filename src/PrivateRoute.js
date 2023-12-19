import {  Navigate  } from 'react-router-dom'
import { isLoggedIn } from './utils';

export default function PrivateRoute({ component: Component, ...rest }) {

    let isLogged = false;
    const checkAuth = () => {
        // console.log(isLoggedIn('clientLogin'))
        return isLoggedIn('clientLogin');
    }
    console.log('checkdf',checkAuth())

    if(checkAuth()) {
        isLogged = true;
        console.log("======>", isLogged)
    }
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return isLogged ? <Component checkAuth={checkAuth}/> : <Navigate to="/" />;
}