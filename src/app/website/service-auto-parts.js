import { React,useState,useEffect, useRef } from "react";
import { Link } from "react-router-dom"; 
import { Player } from 'video-react';
import { useTranslation } from 'react-i18next';

import ModalBox from "./modal";
import Header from "../website/header";
import Footer from "../website/footer";

import { isCommonLoggedIn } from "../../utils"

import Auto from "../../assets/website/images/Auto.png";
import VideoClient from "../../assets/website/video/Autowiz_Auto_Parts.mp4";
import VideoClientFR from "../../assets/website/video/Autowiz_FR_Auto_Parts.mp4";

const ServiceAutoParts = () => {
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

    const [loginShow, setLoginShow] = useState(false);
    const [signupTextShow, setSignupTextShow] = useState('Client');
    const handleClose = () => setLoginShow(false);
    const handleShow = () => { setLoginShow(true); setSignupTextShow('Vendor'); }

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
                aciveShow={false}
                signupTextShow={signupTextShow}
            />

            <section>
                <div class="BannerArea">
                    <h3>{ t('website.serviceautoparts.AutoParts') }</h3>
                    <ul>
                        <li><Link to="/">{ t('website.serviceautoparts.Home') }</Link></li>
                        <li class="active"><a href="javascript:void(0);">{ t('website.serviceautoparts.AutoParts') }</a></li>
                    </ul>
                </div>
            </section>

            <section>
                <div class="BenefitsArea">
                    <div class="container">
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="BenefitsLeft">
                                    <h3>{ t('website.serviceautoparts.Yourbusinessimportantinvestment') }</h3>

                                    <h4>{ t('website.serviceautoparts.Benefitsforyou') }</h4>

                                    <p>{ t('website.serviceautoparts.BenefitsLineone') }</p>

                                    <p>{ t('website.serviceautoparts.BenefitsLineTwo') }</p>

                                    <p>{ t('website.serviceautoparts.BenefitsLineThree') }</p>  

                                    <p>{ t('website.serviceautoparts.BenefitsLineFour') }</p>

                                    <p>{ t('website.serviceautoparts.BenefitsLineFive') }</p>

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
                                        <video ref={videoRef} width="900" height="500" controls>
                                            <source src={videoShow} type="video/mp4" />
                                        </video> 
                                    </div>
                                    <div class="VideoBody">
                                        <h3>{ t('website.serviceautoparts.Viewthevideoabove') } : </h3>
                                        <p>{ t('website.serviceautoparts.TojointheAutowizfamily') }</p>
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
                                                    <li><Link to="/service-provider-signup/dealer">{ t('website.serviceautoparts.Registertocontinue') }</Link></li>
                                                    <li><Link to="" onClick={handleShow}>{ t('website.serviceautoparts.ExistingVendorLogin') } </Link></li>
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

export default ServiceAutoParts