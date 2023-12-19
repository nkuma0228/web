import React, {useState,useEffect} from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import FORM from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';

import { isCommonLoggedIn } from "../../utils"
import { newsletterSave } from "../../redux/actions/static/contentAction";

import ModalBox from "./modal";
import Icon1 from "../../assets/website/images/Icon-1.png";
import Icon2 from "../../assets/website/images/Icon-2.png";
import Icon3 from "../../assets/website/images/Icon-3.png";

const newsletterState = {
    email:'',
    emailEmpty:''
}

const Footer = () => {
    const { i18n, t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [headerLogin, setHeaderLogin] = useState({});
    
    useEffect(() => {
        let getHeaderLogin = isCommonLoggedIn()
        setHeaderLogin(getHeaderLogin)
    },[])

    const [cState, updateCState] = useState(newsletterState);
    const {
        email,
        emailEmpty
    } = cState

    const handleInputChange = (e) => {
        const { name, value } = e.target
        updateCState({
            ...cState, [name]: value
        })
    }

    const handleValidation = () => {
        let emailEmpty = ''
        let formIsValid = true;

        if (!email.trim()) {
            emailEmpty = "Please enter email id";
            formIsValid = false;
        } else {
            var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if (email.match(validRegex)) {
            } else {
                emailEmpty = "Please enter valid email id";
                formIsValid = false;
            }
        }
        updateCState({
            ...cState, 
            emailEmpty,
        })
        return formIsValid;
    }

    let handleNewsletterSubmit = (event) => {
        event.preventDefault();
        let formIsValid = handleValidation();
        if (formIsValid) {
            const data = { email }
            dispatch(newsletterSave(data)).then(res => {
                if (res.code == 200) {

                    toast.success(res.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });

                    updateCState({
                        ...cState,
                        email: '',
                    })
                    // setTimeout(
                    //     function() {
                    //         navigate("/")
                    //     }
                    //     .bind(this),
                    //     3000
                    // );
                } else {
                    toast.error(res.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    
                    updateCState({
                        ...cState, 
                        errorMsg: res.message,
                        emailEmpty: '',
                    })
                }
            }).catch(err => {
                console.log(err, 'err')
                const message = err && err.response && err.response.data ? err.response.data.message : "Something went wrong."
                toast.error(message, {
                    position: toast.POSITION.TOP_RIGHT
                });
            })
        }
    }

    const [loginShow, setLoginShow] = useState(false);
    const handleClose = () => setLoginShow(false);
    const handleShow = () => setLoginShow(true);

    const [corporateShow, setCorporateShow] = useState(false);
    const handleCorporateClose = () => setCorporateShow(false);
    const handleCorporateShow = () => setCorporateShow(true);

    return (
        <>
            <ModalBox 
                loginShow={loginShow}
                handleClose={handleClose}
                handleShow={handleShow}
                corporateShow={corporateShow}
                handleCorporateClose={handleCorporateClose}
                handleCorporateShow={handleCorporateShow}
                aciveShow={false}
            />
            <footer>
                <div className="SubscribeArea">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-5">
                                <div className="SubscribeBox">
                                    <h6> { t('website.footer.Subscribetoournewsletter') } </h6>
                                    <p> { t('website.footer.Letsstayupdated') } </p>
                                    <form onSubmit={handleNewsletterSubmit}>
                                        <input type="text" placeholder={ t('website.footer.Enteryouremail') } name="email" value={email} onChange={handleInputChange}/>
                                        <button type="submit">{ t('website.footer.Subscribe') }</button>
                                    </form>
                                </div>                        
                            </div>
                            <div className="col-sm-7">
                                <div className="SubscribeBox">
                                    <h6>{ t('website.footer.ContactInfo') }</h6>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="InfoBox">
                                                <span className="Icon"><img src={Icon1} /></span>
                                                <p>{ t('website.footer.Hotline') } : </p>
                                                <h5>1-613-282-5558 </h5>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="InfoBox">
                                                <span className="Icon"><img src={Icon2} /></span>
                                                <p>{ t('website.footer.Email') } : </p>
                                                <h5> <a href="mailto:sales@autowiz.us" style={{color:"#fff"}}>sales@autowiz.us</a> <br/> <a href="mailto:info@autowiz.us" style={{color:"#fff"}}>info@autowiz.us</a> </h5>
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Copyright">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-3">
                                <div className="CopyBox">
                                    <h4>AUTOWIZ</h4>
                                    <ul>
                                        <li><Link to="/about-us">{ t('website.footer.Aboutus') }</Link></li>
                                        <li><Link to="/careers">{ t('website.footer.Careers') }</Link></li>
                                        <li><Link to="/faq">{ t('website.footer.Faqs') }</Link></li>
                                        <li><Link to="/contact-us">{ t('website.footer.Contactus') }</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-2">
                                <div className="CopyBox">
                                    <h4>{ t('website.footer.Parts') }</h4>
                                    <ul>
                                        <li><Link to="/parts-deal">{ t('website.footer.PartsDeal') }</Link></li>
                                    </ul>
                                </div>
                            </div>

                            {
                                headerLogin && (Object.getOwnPropertyNames(headerLogin).length != 0)?

                                    (headerLogin.signpFor = "client")?"":
                                    <div className="col-sm-2">
                                        <div className="CopyBox">
                                            <h4 style={{color:"red", fontSize:"18px"}}>{ t('website.footer.CorporatePortal') }</h4>
                                            <ul>
                                                {
                                                    headerLogin && (Object.getOwnPropertyNames(headerLogin).length != 0)?
                                                        <li className="LoginButton">
                                                            <Link className="nav-link" to={headerLogin.url}>
                                                            { headerLogin.business }
                                                            </Link>
                                                        </li>
                                                    :
                                                        <>
                                                            <li className="LoginButton"><Link to="/signup/corporate"> { t('website.footer.Register') } </Link></li>
                                                            <li className="LoginButton"><Link to="" onClick={handleCorporateShow}> { t('website.footer.Login') } </Link></li>
                                                        </>
                                                }
                                                
                                            </ul>
                                        </div>
                                    </div>
                                :
                                <div className="col-sm-2">
                                    <div className="CopyBox">
                                        <h4 style={{color:"red", fontSize:"18px"}}>{ t('website.footer.CorporatePortal') }</h4>
                                        <ul>
                                            <li className="LoginButton"><Link to="/signup/corporate"> { t('website.footer.Register') } </Link></li>
                                            <li className="LoginButton"><Link to="" onClick={handleCorporateShow}> { t('website.footer.Login') } </Link></li>
                                        </ul>
                                    </div>
                                </div>
                            }
                            <div className="col-sm-2">
                                <div className="CopyBox">
                                    <h4>{ t('website.footer.Legal') }</h4>
                                    <ul>
                                        <li><Link to="/terms-condition">{ t('website.footer.TermsofUse') }</Link></li>
                                        <li><Link to="/privacy-policy">{ t('website.footer.Privacypolicy') }</Link></li> 
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-2">
                                <div className="CopyBox">
                                    <h4>{ t('website.footer.Explore') }</h4>
                                    <ul>
                                        <li><a href="https://autowiz.us/blog/">{ t('website.footer.Blog') }</a></li>
                                        <li><Link to="/exotics-antiques">{ t('website.footer.ExoticsandAntiques') }</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="CopyLabel">
                                    <ul>
                                        <li><a href="javascript:void(0);"><i className="fa fa-facebook"></i></a></li>
                                        <li><a href="javascript:void(0);"><i className="fa fa-instagram"></i></a></li>
                                        <li><a href="javascript:void(0);"><i className="fa fa-twitter"></i></a></li>
                                        <li><a href="javascript:void(0);"><i className="fa fa-linkedin"></i></a></li>
                                    </ul>
                                    <p>© 2022 AutoWiz.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

        </>

    );
}

export default Footer