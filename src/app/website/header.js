import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next';

import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import ModalBox from "./modal";

import "../../assets/common-css.css";

import { isCommonLoggedIn } from "../../utils"
import { setCountryInitiate } from "../../redux/actions/provider/authAction";

import Logo from "../../assets/website/images/Logo.png";
import Flag1 from "../../assets/website/images/Flag-1.png";
import Flag2 from "../../assets/website/images/Flag-2.png";
import Flag3 from "../../assets/website/images/Flag-3.jpg";

const Header = () => {
    const dispatch = useDispatch();
    const { i18n, t } = useTranslation();

    const [flagShow, setFlagShow] = useState(Flag1);
    var lang  = i18n.language

    useEffect(() => {
        if(lang == "fr") {
            setFlagShow(Flag3)
        } else {
            setFlagShow(Flag1)
        }
    },[lang])

    function changeLanguage(e) {
        i18n.changeLanguage(e.target.value);
        if(e.target.value == "en") {
            setFlagShow(Flag1)
        } else {
            setFlagShow(Flag3)
        }
    }

    const [loginShow, setLoginShow] = useState(false);
    const [signupTextShow, setSignupTextShow] = useState('Client');

    const handleClose = () => setLoginShow(false);
    const handleShow = () => { setSignupTextShow('Client'); setLoginShow(true); }

    const [headerLogin, setHeaderLogin] = useState({});
    
    useEffect(() => {
        let getHeaderLogin = isCommonLoggedIn()
        setHeaderLogin(getHeaderLogin)
    },[])
    
    //const [CountryShow, setCountryShow] = useState("USA");
    const handleCountryUSA = () => {
        //setCountryShow("USA");
        dispatch(setCountryInitiate("USA"))
        //window.localStorage.setItem("setCountry", "USA")
    }
    const handleCountryCA = () => {
        //setCountryShow("CA");
        dispatch(setCountryInitiate("CA"))
        //window.localStorage.setItem("setCountry", "CA")
    }

    return (
        <>
            <header>
                <div className="Header">
                    <div className="container">
                        <nav className="navbar navbar-expand">
                            <Link className="navbar-brand" to="/"><img src={Logo} /></Link>

                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <a className="nav-link" href={void(0)} onClick={handleCountryUSA}>
                                            <img src={Flag1} />
                                            { t('website.header.US') }
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href={void(0)} onClick={handleCountryCA}>
                                            <img src={Flag2} />
                                            { t('website.header.Canada') }
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a class="nav-link" href={void(0)}>
                                            <span>{ t('website.header.Language') } : </span>
                                            <img src={flagShow} /> 
                                            <select onChange={changeLanguage}>
                                                <option value="en" style={{ color:"#000" }} selected={(lang=="en")?"selected":""}>ENG</option>
                                                <option value="fr" style={{ color:"#000" }} selected={(lang=="fr")?"selected":""}>FR</option>
                                            </select>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        {
                                            headerLogin && (Object.getOwnPropertyNames(headerLogin).length != 0)?

                                                <Link className="nav-link" to={headerLogin.url}>
                                                    { (headerLogin.signpFor == "client")? headerLogin.firstName: headerLogin.business }
                                                </Link>
                                            :
                                                <a className="nav-link" href={void(0)} onClick={handleShow}>
                                                    { t('website.header.LoginorRegister') }
                                                </a>
                                        }
                                    </li>
                                </ul> 
                            </div>
                        </nav>
                    </div>
                </div>
            
                <ModalBox 
                    loginShow={loginShow}
                    handleClose={handleClose}
                    handleShow={handleShow}
                    aciveShow={true}
                    signupTextShow={signupTextShow}
                />
            </header>
            
        </>
    );
}

export default Header