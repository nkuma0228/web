import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import _ from 'lodash'
import FORM from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { salesView } from "../../redux/actions/client/providerAction";

import Slider from "../../assets/client/images/Slider.png"
import Header from "./header";
import Footer from "./footer";

const ServiceClientAutoSalesDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getListData = useSelector(state => state.clientProviderData)
    const { salesData } = getListData
    const salesDetailID = window.localStorage.getItem("salesDetailID")
    
    useEffect(() => {
        dispatch(salesView({ id:salesDetailID }))
    },[])

    const handleReviewView = () => {
        window.localStorage.setItem("salesReviewID",  salesDetailID);
    }
    //console.log(salesData)

    return (
        <>
            <ToastContainer/>
            <Header />

            <div className="WrapperArea">
                <div className="WrapperBox"> 
                    <div className="TitleBox">
                    <Link to="/client/service-auto-sales/list"><i class="fa fa-long-arrow-left" aria-hidden="true"></i> Back</Link> <h4> { salesData.business } </h4>
                    </div>
                    <div className="DealerDetails">
                        <div className="Small-Wrapper"> 
                            <div className="DealerSlider">
                                <div id="demo" className="carousel slide" data-ride="carousel"> 
                                    <ul className="carousel-indicators">
                                    { salesData && Object.keys(salesData).length>0 && salesData.imageGallery.length>0? salesData.imageGallery.map((item, i) => 

                                        <li data-target="#demo" data-slide-to={i} className={ (i == 0)?'active':'' }></li>
                                        ) 
                                        :''
                                    }
                                    </ul>
                
                                    <div className="carousel-inner">
                                    { salesData && Object.keys(salesData).length>0 && salesData.imageGallery.length>0? salesData.imageGallery.map((item, i) => 
                                            
                                            <div className={ (i == 0)?'carousel-item active':'carousel-item' }>
                                                <img src={item} />
                                            </div>
                                        ) 
                                        :''
                                    }
                                    </div> 
                                </div>
                                {/* <span className="Rates">4 <i className="fa fa-star"></i></span> */}
                            </div>
                            <div className="GaragesBox">
                                <div className="GaragesHead"> 
                                    <figcaption>
                                        <article>
                                            <aside>
                                                <h5>Owned by { salesData.firstName } { salesData.lastName }</h5>
                                            </aside>
                                            {/* <aside>
                                                <h5>Website Link : <a href="javascript:void(0);">www.gmail.com</a></h5>
                                            </aside>  */}
                                        </article>
                                            
                                        <article>
                                            <aside>
                                                <h6>Auto Delaer Contact Info</h6>
                                                <p>Email Address: { salesData.email } </p>
                                                <p>Mobile Number: { salesData.telephone }</p>
                                                <p>Address: { salesData.number }, { salesData.street }, { salesData.city }, { salesData.province }</p> 
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
                            <div className="PartBox">
                                <h3>Business Provided by Auto Dealer:</h3> 
                                <ul>
                                    {
                                        salesData.businessType && salesData.businessType.length > 0 && salesData.businessType.map((item)=> (
                                            (item.checked==true)?
                                                <li> {item.name } </li>
                                            :''
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>

                        <div className="Small-Wrapper">
                            <div className="PartBox">
                                <h3>Vehicle Facilities Offered by Auto Dealer</h3> 
                                <ul>
                                    {
                                        salesData.salesVehicleType && salesData.salesVehicleType.length > 0 && salesData.salesVehicleType.map((item)=> (
                                            (item.checked==true)?
                                                <li> {item.name } </li>
                                            :''
                                        ))
                                    }
                                </ul>
                            </div> 
                        </div>

                        <div className="Small-Wrapper">
                            <div className="PaymentBox">
                                <h4>Payment Method Acceptedon Auto Dealer:</h4>
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
                                    <Link to="/client/service-auto-sales/review" onClick={handleReviewView} className="reviewButtonView">
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

export default ServiceClientAutoSalesDetail