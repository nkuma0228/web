import React, {useState,useEffect} from "react";
import {Link} from "react-router-dom";
import { useTranslation } from 'react-i18next';

import Header from "../website/header";
import Footer from "../website/footer";
import ModalBox from "./modal";

const SignupServiceProvider = () => {
    const { i18n, t } = useTranslation();

    const [loginShow, setLoginShow] = useState(false);
    const handleClose = () => setLoginShow(false);
    const handleShow = () => setLoginShow(true);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 100,
            behavior: 'auto'
        });
    },[]);

    return (
        <>
        <Header />
        <ModalBox 
            loginShow={loginShow}
            handleClose={handleClose}
            handleShow={handleShow}
            aciveShow={false}
        />
        <section>
            <div className="BannerArea">
                <h3> { t('website.signup.ServicesProviderSignup') } </h3>
                <ul>
                    <li><Link to="/"> { t('website.signup.Home') } </Link></li>
                    <li className="active"><a href="javascript:void(0);"> { t('website.signup.ServicesProviderSignup') } </a></li>
                </ul>
            </div>
        </section>

        <section>
            <div className="RegisterArea">
                <div className="container">

                    <div className="RegisterLinks">
                        <ul>
                            <li><Link to="/signup"> { t('website.signup.ClientSignup') } </Link></li>
                            <li className="active"><Link to="/service-provider-signup"> { t('website.signup.ServicesProviderSignup') } </Link></li>
                        </ul>
                    </div>
                    
                    <div className="row">
                        <div className="col-sm-6 offset-sm-3">
                            <div className="RegisterForm">
                                    
                                <div className="RegisterRole">
                                    <h3> { t('website.signup.SelectyourroletoContinue') } </h3>
                                    <ul>
                                        <li><Link to="/service-provider-signup/garage"> { t('website.signup.Signupasgarageowner') } </Link></li>
                                        <li><Link to="/service-provider-signup/dealer"> { t('website.signup.Signupasautopartvendors') } </Link></li>
                                        <li><Link to="/service-provider-signup/sales"> { t('website.signup.Signupasautosalesdealer') } </Link></li>
                                    </ul>
                                </div>

                                <div className="RegisterButton"> 
                                    {/* <button>Continue</button> */}
                                    <h5> { t('website.signup.AlreadyHaveaccount') } <a href="javascript:void(0);" onClick={handleShow}> { t('website.signup.Login') } </a></h5>
                                    <h6><Link to="/"> { t('website.signup.BacktoHome') } </Link></h6>
                                </div>
                            </div> 
                        </div>
                    </div>

                </div>
            </div>
        </section>

        <Footer />
        </>
    );
}

export default SignupServiceProvider