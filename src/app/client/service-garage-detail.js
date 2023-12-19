import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import _ from 'lodash'
import FORM from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { garageView } from "../../redux/actions/client/providerAction";

import Slider from "../../assets/client/images/Slider.png"
import Header from "./header";
import Footer from "./footer";

const ServiceGarageDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getListData = useSelector(state => state.clientProviderData)
    const { garageData } = getListData
    const garageDetailID = window.localStorage.getItem("garageDetailID")
    useEffect(() => {
        dispatch(garageView({ id:garageDetailID }))
    },[])

    const handleReviewView = () => {
        window.localStorage.setItem("garageReviewID",  garageDetailID);
    }

    return (
        <>
            <ToastContainer/>
            <Header />

            <div class="WrapperArea">
                <div class="WrapperBox"> 
                    <div class="TitleBox">
                        <Link to="/client/service-garage/list"><i class="fa fa-long-arrow-left" aria-hidden="true"></i> Back</Link> <h4> { garageData.business } </h4>
                    </div>
                    <div class="DealerDetails">
                        <div class="Small-Wrapper"> 
                            <div class="DealerSlider">
                                <div id="demo" class="carousel slide" data-ride="carousel"> 
                                    <ul class="carousel-indicators">
                                    { garageData && Object.keys(garageData).length>0 && garageData.imageGallery.length>0? garageData.imageGallery.map((item, i) => 

                                        <li data-target="#demo" data-slide-to={i} className={ (i == 0)?'active':'' }></li>
                                        ) 
                                        :''
                                    }
                                    </ul>
                
                                    <div class="carousel-inner">
                                    { garageData && Object.keys(garageData).length>0 && garageData.imageGallery.length>0? garageData.imageGallery.map((item, i) => 
                                            
                                            <div className={ (i == 0)?'carousel-item active':'carousel-item' }>
                                                <img src={item} />
                                            </div>
                                        ) 
                                        :''
                                    }
                                    </div> 
                                </div>
                                {/* <span class="Rates">4 <i class="fa fa-star"></i></span> */}
                            </div>
                            <div class="GaragesBox">
                                <div class="GaragesHead"> 
                                    <figcaption>
                                        <article>
                                            <aside>
                                                <h5>Owned by { garageData.firstName } { garageData.lastName }</h5>
                                            </aside>
                                            {/* <aside>
                                                <h5>Website Link : <a href="javascript:void(0);">www.gmail.com</a></h5>
                                            </aside>  */}
                                        </article>
                                            
                                        <article>
                                            <aside>
                                                <h6>Garage Contact Info</h6>
                                                <p>Email Address: { garageData.email } </p>
                                                <p>Mobile Number: { garageData.telephone }</p>
                                                <p>Address: { garageData.number }, { garageData.street }, { garageData.city }, { garageData.province }</p> 
                                            </aside>
                                            <aside>
                                                <h6>Special Services:</h6>
                                                <p>
                                                {
                                                    garageData.specialityService && garageData.specialityService.length > 0 && garageData.specialityService.map((item)=> (
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
                                {/* <div class="QuoteBox">
                                    <figcaption>
                                        <a href="javascript:void(0);" class="Accept" onClick={() => handleConfirmationShow(garageData._id)}>Request Quote</a>
                                    </figcaption>
                                </div> */}
                            </div> 
                        </div>

                        <div class="Small-Wrapper">
                            <div class="PartBox">
                                <h3>Services Provided by Garage:</h3> 
                                <ul>
                                    {
                                        garageData.repairType && garageData.repairType.length > 0 && garageData.repairType.map((item)=> (
                                            (item.checked==true)?
                                                <li> {item.name } </li>
                                            :''
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>

                        <div class="Small-Wrapper">
                            <div class="PartBox">
                                <h3>Facilities Offered by Garage</h3> 
                                <ul>
                                    {
                                        garageData.nearService && garageData.nearService.length > 0 && garageData.nearService.map((item)=> (
                                            (item.checked==true)?
                                                <li> {item.name } </li>
                                            :''
                                        ))
                                    }
                                </ul>
                            </div> 
                        </div>

                        <div class="Small-Wrapper">
                            <div class="PartBox">
                                <h3>Special Service Offered by Garage</h3> 
                                <ul>
                                    {
                                        garageData.specialityService && garageData.specialityService.length > 0 && garageData.specialityService.map((item)=> (
                                            (item.checked==true)?
                                                <li> {item.name } </li>
                                            :''
                                        ))
                                    }
                                </ul>
                            </div> 
                        </div>

                        <div class="Small-Wrapper">
                            <div class="PartBox">
                                <h3>Car Type</h3> 
                                <ul>
                                    {
                                        garageData.garageVehicleType && garageData.garageVehicleType.length > 0 && garageData.garageVehicleType.map((item)=> (
                                            (item.checked==true)?
                                                <li> {item.name } </li>
                                            :''
                                        ))
                                    }
                                </ul>
                            </div> 
                        </div>

                        <div class="Small-Wrapper">
                            <div class="PaymentBox">
                                <h4>Payment Method Acceptedon Garage:</h4>
                                <ul>
                                    <li>
                                        <a href="javascript:void(0);">
                                            <i class="fa fa-credit-card"></i>
                                            Credit Card | Debit Card
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);">
                                            <i class="fa fa-paypal "></i>
                                            PayPal 
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div class="Small-Wrapper">
                            <div class="CommentBox">
                                <h2>
                                    Ratings & Reviews:
                                    <Link to="/client/service-garage/review" onClick={handleReviewView} class="reviewButtonView">
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

export default ServiceGarageDetail