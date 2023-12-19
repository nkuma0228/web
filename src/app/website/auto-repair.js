import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Player } from 'video-react';
import { useTranslation } from 'react-i18next';

import ModalBox from "./modal";
import Header from "../website/header";
import Footer from "../website/footer";

import { isCommonLoggedIn } from "../../utils"

import Auto from "../../assets/website/images/Auto.png";
import VideoClient from "../../assets/website/video/Autowiz2.mp4";
import VideoClientFR from "../../assets/website/video/Autowiz_2_Fr.mp4";

const AutoRepair = () => {
    const { i18n, t } = useTranslation();
    let lang  = i18n.language
    
    const videoRef = useRef();
    const [videoShow, setVideoShow] = useState(VideoClient);

    useEffect(() => {
        if(lang == "fr") {
            setVideoShow(VideoClientFR)
        } else {
            setVideoShow(VideoClient)
        }
    },[lang]);
    useEffect(() => {
        videoRef.current?.load();
    }, [videoShow]);

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

            <ModalBox 
                loginShow={loginShow}
                handleClose={handleClose}
                handleShow={handleShow}
                aciveShow={true}
            />

            <section>
                <div class="BannerArea">
                    <h3>{ t('website.autorepair.AutoRepair') }</h3>
                    <ul>
                        <li><Link to="/">{ t('website.autorepair.Home') }</Link></li>
                        <li class="active"><a href="javascript:void(0);"> { t('website.autorepair.AutoRepair') } </a></li>
                    </ul>
                </div>
            </section>

            <section>
                <div class="BenefitsArea">
                    <div class="container">
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="BenefitsLeft">
                                    <h3> { t('website.autorepair.YourCarisanimportantInvestment') } </h3>

                                    <h4> { t('website.autorepair.Benefitsforyou') } </h4>

                                    <p> { t('website.autorepair.Inyourtimeofneed') } </p>

                                    <p> { t('website.autorepair.Makeyourlifeeasierdealing') } </p>

                                    <p> { t('website.autorepair.TryAutowizforfree') } </p>

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
                                        <video ref={videoRef} width="900" height="500" controls>
                                            <source src={videoShow} type="video/mp4" />
                                        </video> 

                                    <div class="VideoBody">
                                        <h3> { t('website.autorepair.Viewthevideoabove') } </h3>
                                        <p> { t('website.autorepair.Viewthevideoabove') } </p>
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
                                                    <li><Link to="/signup"> { t('website.autorepair.SignUpNow') } </Link></li>
                                                    <li><Link to="" onClick={handleShow}> { t('website.autorepair.ExistingClientLogin') } </Link></li>
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

export default AutoRepair