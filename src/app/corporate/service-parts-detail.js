import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import _ from 'lodash'
import FORM from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { dealerView } from "../../redux/actions/corporate/providerAction";

import Slider from "../../assets/client/images/Slider.png"
import Header from "./header";
import Footer from "./footer";

const CorporateServicePartsDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getListData = useSelector(state => state.clientProviderData)
    const { dealerData } = getListData
    const dealerDetailID = window.localStorage.getItem("dealerDetailID")

    useEffect(() => {
        dispatch(dealerView({ id:dealerDetailID }))
    },[])

    const handleReviewView = () => {
        window.localStorage.setItem("dealerReviewID",  dealerDetailID);
    }

    return (
        <>
            <ToastContainer/>
            <Header />

            <div className="WrapperArea">
                <div className="WrapperBox"> 

                    <div className="TitleBox">
                        <Link to="/corporate/service-parts/list"><i class="fa fa-long-arrow-left" aria-hidden="true"></i> Back</Link><h4> { dealerData.business } </h4>
                    </div>

                    <div className="DealerDetails">

                        <div className="Small-Wrapper"> 
                            <div className="DealerSlider">
                                <div id="demo" className="carousel slide" data-ride="carousel"> 
                                    <ul className="carousel-indicators">
                                    { dealerData && Object.keys(dealerData).length>0? dealerData.imageGallery.map((item, i) => 

                                        <li data-target="#demo" data-slide-to={i} className={ (i == 0)?'active':'' }></li>
                                        ) 
                                        :''
                                    }
                                    </ul>
                
                                    <div className="carousel-inner">
                                    { dealerData && Object.keys(dealerData).length>0? dealerData.imageGallery.map((item, i) => 
                                            
                                            <div className={ (i == 0)?'carousel-item active':'carousel-item' }>
                                                <img src={item} />
                                            </div>
                                        ) 
                                        :''
                                    }
                                    </div> 
                                </div>
                                <span className="Rates">4 <i className="fa fa-star"></i></span>
                            </div>
                            <div className="GaragesBox">
                                <div className="GaragesHead"> 
                                    <figcaption>
                                        <article>
                                            <aside>
                                                <h5>Owned by { dealerData.firstName } { dealerData.lastName }</h5>
                                            </aside> 
                                        </article>
                                            
                                        <article>
                                            <aside>
                                                <h6>Garage Contact Info</h6>
                                                <p>Email Address: { dealerData.email }</p>
                                                <p>Mobile Number: { dealerData.telephone }</p>
                                                <p>Address: { dealerData.number }, { dealerData.street }, { dealerData.city }, { dealerData.province }</p> 
                                            </aside>
                                            <aside>
                                                <h6>Special Services:</h6>
                                                <p> 
                                                {
                                                    dealerData.serviceAvailable && dealerData.serviceAvailable.length > 0 && dealerData.serviceAvailable.map((item)=> (
                                                        (item.checked==true)?
                                                            item.name + ', '
                                                        :''
                                                    ))
                                                }
                                                </p>
                                            </aside>
                                        </article>
                                    </figcaption>
                                </div> 
                                <div className="QuoteBox">
                                </div>
                            </div> 
                        </div>

                        {
                            dealerData.vehicleType && dealerData.vehicleType.length > 0 && dealerData.vehicleType.map((item)=> (

                                (item.checked==true)?

                                    <div className="Small-Wrapper">
                                        <div className="PartBox">
                                            <h3>{item.name } Parts Provided by Dealer:</h3>
                                            <h4>Tesla, GM, Fort <span> {
                                                    dealerData.partType && dealerData.partType.length > 0 && dealerData.partType.map((item)=> (
                                                        (item.checked==true)?
                                                            item.name
                                                        :''
                                                    ))
                                                } Available</span></h4>
                                            <ul>
                                                {
                                                    dealerData.offeredService && dealerData.offeredService.length > 0 && dealerData.offeredService.map((item)=> (
                                                        (item.checked==true)?
                                                            <li> {item.name } </li>
                                                        :''
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                : ''
                            ))
                        }

                        <div className="Small-Wrapper">
                            <div className="PaymentBox">
                                <h4>Payment Method Acceptedon Garage:</h4>
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
                                    <Link to="/corporate/service-parts/review" onClick={handleReviewView} class="reviewButtonView">
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

export default CorporateServicePartsDetail