import { React,useState,useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import _ from 'lodash'
import ModalBox from "./modal";
import Header from "../website/header";
import Footer from "../website/footer";

const PartsDeal = () => {
    const { i18n, t } = useTranslation();

    const [loginShow, setLoginShow] = useState(false);
    const handleClose = () => setLoginShow(false);
    const handleShow = () => setLoginShow(true);

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
                    <h3>{ t('website.serviceautosales.UNDERCONSTRUCTION') }</h3>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default PartsDeal