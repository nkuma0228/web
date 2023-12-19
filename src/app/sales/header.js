import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash'
import { providerLogout, providerDetails } from "../../redux/actions/provider/authAction";
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import Dropdown from 'react-bootstrap/Dropdown'

import "../../assets/common-css.css";

import Logo from "../../assets/garage/images/Logo.png"
import Flag1 from "../../assets/website/images/Flag-1.png";
import Flag2 from "../../assets/website/images/Flag-2.png";
import Flag3 from "../../assets/website/images/Flag-3.jpg";
import Profile from "../../assets/garage/images/profile.png"
import Nav1 from "../../assets/garage/images/Nav-1.svg"
import Nav2 from "../../assets/garage/images/Nav-2.svg"
import Nav3 from "../../assets/garage/images/Nav-3.svg"
import Nav4 from "../../assets/garage/images/Nav-4.svg"
import Nav5 from "../../assets/garage/images/Nav-5.svg"
import Nav6 from "../../assets/garage/images/Nav-6.svg"
import Nav9 from "../../assets/client/images/Nav-9.svg";

const initialState = {
    companyName:'',
    business:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
    image:'',
}

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { i18n, t } = useTranslation();
    
    const [flagShow, setFlagShow] = useState(Flag1);
    var lang  = i18n.language

    useEffect(() => {
        
        if(lang == "fr") {
            setFlagShow(Flag3)
        } else {
            setFlagShow(Flag1)
        }
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
        e.preventDefault()
        dispatch(providerLogout()).then(res => {
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
        companyName,
        business,
        firstName,
        lastName,
        email,
        phone,
        image,
    } = cState

    const getProfileData = useSelector(state => state.provider)
    const { providerData } = getProfileData
    
    useEffect(() => {
        dispatch(providerDetails())
    },[])

    useEffect(() => {
        if (!_.isEmpty(providerData)) {
            const updateData = _.cloneDeep(cState)
            updateData.companyName = providerData.companyName
            updateData.business = providerData.business
            updateData.firstName = providerData.firstName
            updateData.lastName = providerData.lastName
            updateData.email = providerData.email
            updateData.phone = providerData.phone
            updateData.image = providerData.image
            updateCState(
                updateData
            )
            
            if(providerData.translate && providerData.translate.length>0) {
                if(providerData.translate == "en") {
                    setFlagShow(Flag1)
                } else {
                    setFlagShow(Flag3)
                }
            } else {
                setFlagShow(Flag1)
            }
            if(providerData.translate && providerData.translate.length>0) {
                i18n.changeLanguage(providerData.translate);
            }
        }
    },[providerData])

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
                    <h6>{firstName} {lastName} </h6>
                    <p> {email} </p>
                </div>

                <ul>
                    <li className={pathMatch=="dashboard"? "active" : ''}>
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic"> <span><img src={Nav1} /></span>  { t('vendor.sidemenu.Dashboard') } </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#/sales/dashboard"> { t('vendor.sidemenu.Client') }  </Dropdown.Item>
                                <Dropdown.Item href="#/sales/dashboard/corporate"> { t('vendor.sidemenu.Corporate') } </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>

                    <li className={pathMatch=="scheduling"? "active" : ''}>
                        <Link to="/sales/scheduling">
                            <span><img src={Nav5} /></span> { t('sales.sidemenu.GarageScheduling') }
                        </Link>
                    </li>
                    
                    <li className={pathMatch=="mycalendar"? "active" : ''}>
                        <Link to="/sales/mycalendar">
                            <span><img src={Nav2} /></span> { t('sales.sidemenu.MyCalendar') }
                        </Link>
                    </li>
                    
                    <li className={pathMatch=="my_sales"? "active" : ''}>
                        <Link to="/sales/my_sales">
                            <span><img src={Nav3} /></span> { t('sales.sidemenu.MyDealer') }
                        </Link>
                    </li>

                    <li className={pathMatch=="my-vehicles"? "active" : ''}>
                        <Link to="/sales/my-vehicles">
                            <span><img src={Nav3} /></span> { t('sales.sidemenu.MyVehicles') }
                        </Link>
                    </li>
                    
                    <li className={pathMatch=="account"? "active" : ''}>
                        <Link to="/sales/account">
                            <span><img src={Nav4} /></span> { t('sales.sidemenu.AccountSettings') }
                        </Link>
                    </li> 
                    
                    {/* <li className={pathMatch=="service-parts"? "active" : ''}>
                        <Link to="/garage/service-parts">
                            <span><img src={Nav6} /></span> { t('sales.sidemenu.ServiceParts') }
                        </Link>
                    </li>    */}
                    <li>
                        <Link to="" onClick={handleLogout}>
                            <span><img src={Nav9} /></span> { t('sales.sidemenu.Logout') }
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
                        <a href="javascript:void(0);">
                            <figure>
                                {
                                    image && image.length>0 ?
                                        <img src={image} />
                                    :
                                        <img src={Profile} />
                                }
                            </figure> {firstName} {lastName}
                        </a>
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