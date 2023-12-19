import { React,useState,useEffect,useRef } from "react";
import { Link } from "react-router-dom"; 
import { Player } from 'video-react';
import { useTranslation } from 'react-i18next';

import ModalBox from "./modal";
import Header from "../website/header";
import Footer from "../website/footer";

import { isCommonLoggedIn } from "../../utils"

import Auto from "../../assets/website/images/Auto.png";
import VideoClient from "../../assets/website/video/Autowiz1-Garages.mp4";
import VideoClientFR from "../../assets/website/video/Autowiz_1_Fr.mp4";

const ServiceAutoRepair = () => {
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
    const handleShow = () => { setLoginShow(true); setSignupTextShow('Garage'); }

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
                    <h3>{ t('website.serviceautorepair.AutoRepair') }</h3>
                    <ul>
                        <li><Link to="/">{ t('website.serviceautorepair.Home') }</Link></li>
                        <li class="active"><a href="javascript:void(0);">{ t('website.serviceautorepair.AutoRepair') }</a></li>
                    </ul>
                </div>
            </section>

            <section>
                <div class="BenefitsArea">
                    <div class="container">
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="BenefitsLeft">
                                    <h3>{ t('website.serviceautorepair.Yourbusinessimportantinvestment') }</h3>

                                    <h4>{ t('website.serviceautorepair.Benefitsforyou') }</h4>

                                    <p>{ t('website.serviceautorepair.BenefitsLineone') }</p>

                                    <p>{ t('website.serviceautorepair.BenefitsLineTwo') }</p>

                                    <p>{ t('website.serviceautorepair.BenefitsLineThree') }</p>  

                                    <p>{ t('website.serviceautorepair.BenefitsLineFour') }</p>

                                    <p>{ t('website.serviceautorepair.BenefitsLineFive') }</p>

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
                                    <div className="VideoHead">
                                        <video ref={videoRef} width="900" height="500" controls>
                                            <source src={videoShow} type="video/mp4" />
                                        </video> 
                                    </div>
                                    <div class="VideoBody">
                                        <h3>{ t('website.serviceautorepair.Viewthevideoabove') } : </h3>
                                        <p>{ t('website.serviceautorepair.TojointheAutowizfamily') }</p>
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
                                                    <li><Link to="/service-provider-signup/garage">{ t('website.serviceautorepair.Registertocontinue') } </Link></li>
                                                    <li><Link to="" onClick={handleShow}>{ t('website.serviceautorepair.ExistingGarageLogin') }</Link></li>
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

export default ServiceAutoRepair