import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import _ from 'lodash'
import FORM from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { corporateView } from "../../redux/actions/client/providerAction";

import Slider from "../../assets/client/images/Slider.png"
import Header from "./header";
import Footer from "./footer";

const ServiceClientCorporateDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getListData = useSelector(state => state.clientProviderData)
    const { corporateData } = getListData
    const corporateDetailID = window.localStorage.getItem("corporateDetailID")
    
    useEffect(() => {
        dispatch(corporateView({ id:corporateDetailID }))
    },[])

    const handleReviewView = () => {
        window.localStorage.setItem("corporateReviewID",  corporateDetailID);
    }

    return (
        <>
            <ToastContainer/>
            <Header />

            <div className="WrapperArea">
                <div className="WrapperBox"> 
                    <div className="TitleBox">
                    <Link to="/client/service-corporate/list"><i class="fa fa-long-arrow-left" aria-hidden="true"></i> Back</Link> <h4> { corporateData.business } </h4>
                    </div>
                    <div className="DealerDetails">
                        <div className="Small-Wrapper"> 
                            <div className="DealerSlider">
                                <div id="demo" className="carousel slide" data-ride="carousel"> 
                                    <ul className="carousel-indicators">
                                    { corporateData && Object.keys(corporateData).length>0 && corporateData.imageGallery.length>0? corporateData.imageGallery.map((item, i) => 

                                        <li data-target="#demo" data-slide-to={i} className={ (i == 0)?'active':'' }></li>
                                        ) 
                                        :''
                                    }
                                    </ul>
                
                                    <div className="carousel-inner">
                                    { corporateData && Object.keys(corporateData).length>0 && corporateData.imageGallery.length>0? corporateData.imageGallery.map((item, i) => 
                                            
                                            <div className={ (i == 0)?'carousel-item active':'carousel-item' }>
                                                <img src={item} />
                                            </div>
                                        ) 
                                        :''
                                    }
                                    </div> 
                                </div>
                                
                            </div>
                            <div className="GaragesBox">
                                <div className="GaragesHead"> 
                                    <figcaption>
                                        <article>
                                            <aside>
                                                <h5>Owned by { corporateData.firstName } { corporateData.lastName }</h5>
                                            </aside>
                                        </article>
                                            
                                        <article>
                                            <aside>
                                                <h6>Auto Delaer Contact Info</h6>
                                                <p>Email Address: { corporateData.email } </p>
                                                <p>Mobile Number: { corporateData.telephone }</p>
                                                <p>Address: { corporateData.number }, { corporateData.street }, { corporateData.city }, { corporateData.province }</p> 
                                            </aside>
                                            <aside>
                                                
                                            </aside>
                                        </article>
                                    </figcaption>
                                </div> 
                                <div className="QuoteBox">
                                </div>
                            </div> 
                        </div>

                        <div className="Small-Wrapper">
                            <div className="PaymentBox">
                                <h4>Payment Method Acceptedon Corporate:</h4>
                                <ul>
                                    <li>
                                        <a href="javascript:void(0);">
                                            <i className="fa fa-credit-card"></i>
                                            Credit Card | Debit Card
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);">
                                            <i className="fa fa-paypal "></i>
                                            PayPal 
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="Small-Wrapper">
                            <div className="CommentBox">
                                <h2>
                                    Ratings & Reviews:
                                    <Link to="/client/service-corporate/review" onClick={handleReviewView} className="reviewButtonView">
                                        <span><i className="fa fa-star-o"></i></span>
                                        View Review
                                    </Link>
                                </h2> 
                            </div>
                        </div>

                    </div>

                </div>
            </div> 

            <Footer />
        </>
    );
}

export default ServiceClientCorporateDetail