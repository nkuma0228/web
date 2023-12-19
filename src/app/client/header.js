import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import _ from 'lodash'
import { clientLogout, clientDetails, clientLangUpdate } from "../../redux/actions/client/authAction";
import { ToastContainer, toast } from 'react-toastify';
import Dropdown from 'react-bootstrap/Dropdown'

import "../../assets/common-css.css";

import Logo from "../../assets/client/images/Logo.png";
import Flag1 from "../../assets/website/images/Flag-1.png";
import Flag2 from "../../assets/website/images/Flag-2.png";
import Flag3 from "../../assets/website/images/Flag-3.jpg";
import Profile from "../../assets/client/images/profile.png";
import Nav1 from "../../assets/client/images/Nav-1.svg";
import Nav2 from "../../assets/client/images/Nav-2.svg";
import Nav3 from "../../assets/client/images/Nav-3.svg";
import Nav4 from "../../assets/client/images/Nav-4.svg";
import Nav5 from "../../assets/client/images/Nav-5.svg";
import Nav7 from "../../assets/client/images/Nav-7.svg";
import Nav8 from "../../assets/client/images/Nav-8.svg";
import Nav9 from "../../assets/client/images/Nav-9.svg";

const initialState = {
    firstName:'',
    lastName:'',
    email:'',
    mobile:'',
    image:'',
}

const Header = () => {
    const { i18n, t } = useTranslation();
    let lang  = i18n.language
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [flagShow, setFlagShow] = useState(Flag1);

    useEffect(() => {
        if(lang == "fr") {
            setFlagShow(Flag3)
        } else {
            setFlagShow(Flag1)
        }

        var data = {lang:lang}
        clientLangUpdate(data)

    },[lang])

    function changeLanguage(e) {
        i18n.changeLanguage(e.target.value);
        if(e.target.value == "en") {
            setFlagShow(Flag1)
        } else {
            setFlagShow(Flag3)
        }
    }

    let path = window.location.href.split('/');
    let pathLength = parseInt(path.length) - 1;
    let pathMatch = path[pathLength];

    const handleLogout = (e) => {
        //console.log("in logout")
        e.preventDefault()
        dispatch(clientLogout()).then(res => {
            if (res.code && res.code == 200) {
                navigate("/")
            } else {
                toast.error("Something went wrong", {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        })
    }

    const [cState, updateCState] = useState(initialState);
    const {
        firstName,
        lastName,
        email,
        mobile,
        image,
    } = cState

    const getProfileData = useSelector(state => state.client)
    const { clientData } = getProfileData
    
    useEffect(() => {
        dispatch(clientDetails()).then((response)=>{

        }).catch((response)=>{
            if(response.message == "Invalid token") {
                navigate("/");
            }
        })
    },[])

    useEffect(() => {
        if (!_.isEmpty(clientData)) {
            const updateData = _.cloneDeep(cState)
            updateData.firstName = clientData.firstName
            updateData.lastName = clientData.lastName
            updateData.email = clientData.email
            updateData.mobile = clientData.mobile
            updateData.image = clientData.image
            updateCState(
                updateData
            )
            
            if(clientData.translate && clientData.translate.length>0) {
                if(clientData.translate == "en") {
                    setFlagShow(Flag1)
                } else {
                    setFlagShow(Flag3)
                }
            } else {
                setFlagShow(Flag1)
            }
            
            if(clientData.translate && clientData.translate.length>0) {
                i18n.changeLanguage(clientData.translate);
            }
        }
    },[clientData])

    return (
        <>
        	<ToastContainer/>
            <div className="SideNavBar">
                <div className="SideNavHead">
                    <img src={Logo} />
                </div>
                <div className="SideNavMiddle">
                    <figure>
                        {
                            image && image.length>0 ?
                                <img src={image} />
                            :
                                <img src={Profile} />
                        }
                    </figure>
                    <h6>{firstName} {lastName}</h6>
                    <p> { email } </p>
                </div>

                <ul>
                    <li className={pathMatch=="dashboard"? "active" : ''}>
                        <Link to="/client/dashboard">
                            <span><img src={Nav1} /></span> { t('client.sidebar.Dashboard') }
                        </Link>
                    </li>
                    
                    <li className={pathMatch=="service-garage"? "active" : ''}>
                        <Link to="/client/service-garage">
                            <span><img src={Nav2} /></span> Service Garages
                        </Link>
                    </li>
                    
                    <li className={pathMatch=="service-parts"? "active" : ''}>
                        <Link to="/client/service-parts">
                            <span><img src={Nav3} /></span> { t('client.sidebar.ServiceParts') }
                        </Link>
                    </li>

                    <li className={pathMatch=="service-auto-sales"? "active" : ''}>
                        <Link to="/client/service-auto-sales">
                            <span><img src={Nav3} /></span> { t('client.sidebar.ServiceAutoSales') }
                        </Link>
                    </li>

                    <li className={pathMatch=="service-corporate"? "active" : ''}>
                        <Link to="/client/service-corporate">
                            <span><img src={Nav3} /></span> { t('client.sidebar.ServicesCorporate') }
                        </Link>
                    </li>
                    
                    <li className={pathMatch=="my-vehicle"? "active" : ''}>
                        <Link to="/client/my-vehicle">
                            <span><img src={Nav4} /></span> { t('client.sidebar.Vehiclehistory') }
                        </Link>
                    </li>

                    <li>
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic"> <span><img src={Nav5} /></span>  { t('client.sidebar.Mybookings') } </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#/client/my-bookings/garages"> Service Garages </Dropdown.Item>
                                <Dropdown.Item href="#/client/my-bookings/parts"> { t('client.sidebar.ServiceParts') } </Dropdown.Item>
                                <Dropdown.Item href="#/client/my-bookings/dealer"> { t('client.sidebar.ServiceAutoSales') } </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>

                    
                    <li className={pathMatch=="account"? "active" : ''}>
                        <Link to="/client/account">
                            <span><img src={Nav8} /></span> { t('client.sidebar.Accountsettings') }
                        </Link>
                    </li> 
                    
                    <li>
                        <Link to="" onClick={handleLogout}>
                            <span><img src={Nav9} /></span> { t('client.sidebar.Logout') }
                        </Link>
                    </li> 
                </ul>
            </div>

        <div className="DashboardHeader"> 
            <div className="HeaderToggle">
                <a href="javascript:void(0);">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" fit="" height="100%" width="100%" preserveAspectRatio="xMidYMid meet" focusable="false">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </a>
            </div>
            <div className="Navigation">
                
                <div className="LanguageSelect">
                    <a class="nav-link" href="javascript:void(0);">
                        <span>{ t('website.header.Language') } : </span>
                        <img src={flagShow} /> 
                        <select onChange={changeLanguage}>
                            <option value="en" style={{ color:"#000" }} selected={(lang=="en")?"selected":""}>ENG</option>
                            <option value="fr" style={{ color:"#000" }} selected={(lang=="fr")?"selected":""}>FR</option>
                        </select>
                    </a>
                </div>

                <div className="Avater">
                    <Link to="">
                        <figure>
                            {
                                image && image.length>0 ?
                                    <img src={image} />
                                :
                                    <img src={Profile} />
                            }
                        </figure> {firstName} {lastName}
                    </Link>
                    <ul>
                        <li>
                            <figure>
                            {
                                image && image.length>0 ?
                                    <img src={image} />
                                :
                                    <img src={Profile} />
                            }
                            </figure>
                            <h4> {firstName} {lastName} </h4>
                        </li> 
                        <li><Link to="" onClick={handleLogout}><span><i className="fa fa-sign-out"></i></span> Logout</Link></li>
                    </ul>
                </div>
                <div className="clear"></div>
            </div>
        </div> 

        </>
    );
}

export default Header