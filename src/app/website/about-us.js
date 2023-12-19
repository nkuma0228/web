import { React,useState,useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom"; 
import { useTranslation } from 'react-i18next';

import _ from 'lodash'
import ModalBox from "./modal";
import Header from "../website/header";
import Footer from "../website/footer";

import About from "../../assets/website/images/About.png";
import { pageContent } from "../../redux/actions/static/contentAction";
const initialState = {
    pageTitle:'',
    content:'',
    content_fr:'',
}

const AboutUs = () => {
    const { i18n, t } = useTranslation();
    const dispatch = useDispatch();

    let lang  = i18n.language

    const [loginShow, setLoginShow] = useState(false);
    const handleClose = () => setLoginShow(false);
    const handleShow = () => setLoginShow(true);

    const [cState, updateCState] = useState(initialState);
    const getStaticData = useSelector(state => state.staticPage)
    const {staticData} = getStaticData
    const {
        pageTitle,
        content,
        content_fr,
    } = cState

    useEffect(() => {
        let data = {pageName:'about'};
        dispatch(pageContent(data))
    },[])

    useEffect(() => {
        if (!_.isEmpty(staticData)) {
            const updateData = _.cloneDeep(cState)
            updateData.pageTitle = staticData.pageTitle
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
            return { __html: content };
        } else {
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
                    <h3>{ t('website.aboutus.AboutUs') }</h3>
                    <ul>
                        <li><Link to="/">{ t('website.aboutus.Home') }</Link></li>
                        <li class="active"><a href="javascript:void(0);">{ t('website.aboutus.AboutUs') }</a></li>
                    </ul>
                </div>
            </section>

            <section>
                <div class="AboutArea">
                    <div class="container">
                        <div class="row">
                            <div class="col-sm-10 offset-sm-1">
                                <div class="AboutBox">
                                    <figure>
                                        <img src={About} />
                                    </figure>
                                    <figcaption>
                                        <div dangerouslySetInnerHTML={createMarkup()} className='editor'></div>
                                    </figcaption>
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

export default AboutUs