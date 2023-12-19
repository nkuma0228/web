import { React,useState,useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom"; 
import { useTranslation } from 'react-i18next';

import _ from 'lodash'
import ModalBox from "./modal";
import Header from "../website/header";
import Footer from "../website/footer";

import { getFaq } from "../../redux/actions/static/faqAction";

const Faq = () => {
    const { i18n, t } = useTranslation();
    const dispatch = useDispatch();

    let lang  = i18n.language

    const [loginShow, setLoginShow] = useState(false);
    const handleClose = () => setLoginShow(false);
    const handleShow = () => setLoginShow(true);

    const getFaqData = useSelector(state => state.faq)
    const {faqData} = getFaqData

    useEffect(() => {
        dispatch(getFaq())
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
                    <h3>{ t('website.faq.FAQs') }</h3>
                    <ul>
                        <li><Link to="/">{ t('website.faq.Home') }</Link></li>
                        <li class="active"><a href="javascript:void(0);">{ t('website.faq.FAQs') }</a></li>
                    </ul>
                </div>
            </section>

            <section>
                <div class="FAQArea">
                    <div class="container">
                        <br/>
                        <h3> { t('website.faq.FrequentlyAskedQuestions') } </h3>
                        <div id="accordion">
                        {
                            faqData && faqData.length > 0 && faqData.map((item, i)=> (
                                
                                <div class="card" key={i}>
                                    <div class="card-header collapsed" data-toggle="collapse" href={ '#collapse'+i }>
                                        <h4> { (lang == 'en')?item.title:item.title_fr } </h4>
                                    </div>
                                    <div id={ 'collapse'+i } class="collapse" data-parent="#accordion">
                                        <div class="card-body">
                                            <p> { (lang == 'en')?item.description:item.description_fr } </p>
                                        </div>
                                    </div>
                                </div>    
                            ))
                        }
                        </div> 
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default Faq