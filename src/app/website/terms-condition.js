import { React,useState,useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom"; 
import { useTranslation } from 'react-i18next';

import _ from 'lodash'
import ModalBox from "./modal";
import Header from "../website/header";
import Footer from "../website/footer";

import { pageContent } from "../../redux/actions/static/contentAction";

const initialState = {
    pageTitle:'',
    pageTitle_fr:'',
    content:'',
    content_fr:''
}

const TermsCondition = () => {
    const dispatch = useDispatch();

    const { i18n, t } = useTranslation();
    let lang  = i18n.language

    const [loginShow, setLoginShow] = useState(false);
    const handleClose = () => setLoginShow(false);
    const handleShow = () => setLoginShow(true);

    const [cState, updateCState] = useState(initialState);
    const getStaticData = useSelector(state => state.staticPage)
    const {staticData} = getStaticData
    const {
        pageTitle,
        pageTitle_fr,
        content,
        content_fr
    } = cState

    useEffect(() => {
        let data = {pageName:'terms condition'};
        dispatch(pageContent(data))
    },[])

    useEffect(() => {
        if (!_.isEmpty(staticData)) {
            const updateData = _.cloneDeep(cState)
            updateData.pageTitle = staticData.pageTitle
            updateData.pageTitle_fr = staticData.pageTitle_fr
            updateData.content = staticData.content
            updateData.content_fr = staticData.content_fr
            updateCState(
                updateData
            )
        }
    },[staticData])

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 100,
            behavior: 'auto'
        });
    },[]);

    const createMarkup = () => {
        if(lang == "en") {
            console.log("en", content)
            return { __html: content };
        } else {
            console.log("fr", content_fr)
            return { __html: content_fr };
        }
    }

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
                    <h3> { lang == "en"?pageTitle:pageTitle_fr } </h3>
                    <ul>
                        <li><Link to="/">{ t('website.aboutus.Home') }</Link></li>
                        <li class="active"><a href="javascript:void(0);"> { lang == "en"?pageTitle:pageTitle_fr } </a></li>
                    </ul>
                </div>
            </section>

            <section>
                <div class="AboutArea">
                    <div class="container">
                        <div class="row">
                            <div class="col-sm-10 offset-sm-1">
                                
                                <div dangerouslySetInnerHTML={createMarkup()} className='editor'></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default TermsCondition