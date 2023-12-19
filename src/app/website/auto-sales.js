import { React,useState,useEffect } from "react";
import { Link } from "react-router-dom"; 
import { Player } from 'video-react';
import { useTranslation } from 'react-i18next';

import ModalBox from "./modal";
import Header from "../website/header";
import Footer from "../website/footer";

import { isCommonLoggedIn } from "../../utils"

import Auto from "../../assets/website/images/new_car_showroom.jpg";
import VideoClient from "../../assets/website/video/Autowiz1-Garages.mp4";

const AutoSales = () => {
    const { i18n, t } = useTranslation();
    const [isOpen, setOpen] = useState(false)

    const [loginShow, setLoginShow] = useState(false);
    const handleClose = () => setLoginShow(false);
    const handleShow = () => setLoginShow(true);

    const [headerLogin, setHeaderLogin] = useState({});
    useEffect(() => {
        let getHeaderLogin = isCommonLoggedIn()
        setHeaderLogin(getHeaderLogin)
    },[])

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
            <link
                rel="stylesheet"
                href="https://video-react.github.io/assets/video-react.css"
            />
            <ModalBox 
                loginShow={loginShow}
                handleClose={handleClose}
                handleShow={handleShow}
                aciveShow={true}
            />

            <section>
                <div class="BannerArea">
                    <h3> { t('website.autosales.AutoSales') } </h3>
                    <ul>
                        <li><Link to="/"> { t('website.autosales.Home') } </Link></li>
                        <li class="active"><a href="javascript:void(0);"> { t('website.autosales.AutoSales') } </a></li>
                    </ul>
                </div>
            </section>

            <section>
                <div class="BenefitsArea">
                    <div class="container">
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="BenefitsLeft">
                                    <h3> { t('website.autosales.YourCarisanimportantInvestment') } </h3>
                                    <p> { t('website.autosales.Ifyouareinthemarket') } </p>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="BenefitsRight">
                                    <img src={Auto} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div class="VideoArea">
                    <div class="container">
                        <div class="row">
                            <div class="col-sm-10 offset-sm-1">
                                <div class="VideoBox">
                                    <div class="VideoHead">
                                        <Player>
                                            <source src={VideoClient} />
                                        </Player>
                                    </div>
                                    <div class="VideoBody">
                                        <h3> { t('website.autosales.Viewthevideoabove') } </h3>
                                        <p> { t('website.autosales.TojointheAutowizfamily') } </p>
                                        <ul>
                                        {
                                            headerLogin && (Object.getOwnPropertyNames(headerLogin).length != 0)?

                                                <li>
                                                    <Link to={headerLogin.url}>
                                                        { headerLogin.firstName } { headerLogin.lastName }
                                                    </Link>
                                                </li>
                                            :
                                                <>
                                                    <li><Link to="/signup"> { t('website.autosales.SignUpNow') } </Link></li>
                                                    <li><Link to="" onClick={handleShow}> { t('website.autosales.ExistingClientLogin') } </Link></li>
                                                </>
                                        }
                                        </ul>
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

export default AutoSales