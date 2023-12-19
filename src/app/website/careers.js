import { React,useState,useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom"; 
import { useTranslation } from 'react-i18next';

import ModalBox from "./modal";
import Header from "../website/header";
import Footer from "../website/footer";

import Career from "../../assets/website/images/Career.png";
import { getCareer } from "../../redux/actions/static/careerAction";

const Careers = () => {
    const { i18n, t } = useTranslation();
    const dispatch = useDispatch();

    let lang  = i18n.language

    const [loginShow, setLoginShow] = useState(false);
    const handleClose = () => setLoginShow(false);
    const handleShow = () => setLoginShow(true);

    const getCareerData = useSelector(state => state.career)
    const {careerData} = getCareerData

    useEffect(() => {
        dispatch(getCareer())
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
                    <h3>{ t('website.career.Growyourcareerwithus') }</h3>
                    <ul>
                        <li><Link to="/">{ t('website.career.Home') }</Link></li>
                        <li class="active"><a href="javascript:void(0);">{ t('website.career.Career') }</a></li>
                    </ul>
                </div>
            </section>

            <section>
                <div class="AssistanceArea"> 
                    <div class="container">
                        <figcaption>
                            <h3> { t('website.career.Workwithus') } </h3>
                            <p> { t('website.career.Autowizisexpanding') } </p>
                        </figcaption>
                        <figure>
                            <img src={Career} />
                        </figure>
                    </div>
                </div>
            </section>

            <section>
                <div class="VacanciesArea">
                    <div class="container">
                        <h3> { t('website.career.JobVacancies') } </h3>
                        <div class="row">
                            <div class="col-sm-10 offset-sm-1">
                            {
                                careerData && careerData.length > 0 && careerData.map((item, i)=> (
                                    <div class="VacanciesBox">
                                        <aside>
                                            <p> { t('website.career.Position') } </p>
                                            <h6> { (lang == "en")?item.position:item.position_fr } </h6>
                                        </aside>
                                        <aside>
                                            <p>{ t('website.career.Department') }</p>
                                            <h6> { (lang == "en")?item.department:item.department_fr } </h6>
                                        </aside>
                                        <aside>
                                            <p>{ t('website.career.Location') }</p>
                                            <h6> { (lang == "en")?item.location:item.location_fr } </h6>
                                        </aside>
                                    </div>
                                ))
                            }   
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default Careers