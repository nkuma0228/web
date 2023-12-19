import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import _ from 'lodash'

import Header from "./header";
import Footer from "./footer";

import { providerDetails } from "../../redux/actions/provider/searchAction";

import Review from "../../assets/dealer/images/review.webp";

const initialState = {
    companyName:'',
    business:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
    number:'',
    street:'',
    city:'',
    postalCode:'',
    province:'',
    telephoneNumber:'',
    extension:'',
    partType:'',
    vehicleType:'',
    offeredService:'',
    serviceAvailable:''
}

const GarageServicePartsDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [cState, updateCState] = useState(initialState);
    const {
        companyName,
        business,
        firstName,
        lastName,
        email,
        phone,
        number,
        street,
        city,
        postalCode,
        province,
        telephoneNumber,
        extension,
        partType,
        vehicleType,
        offeredService,
        serviceAvailable
    } = cState

    const getProfileData = useSelector(state => state.provider)
    const { providerData } = getProfileData

    useEffect(() => {

        var provider_id = window.localStorage.setItem("dealerDetailID")

        dispatch(providerDetails({ provider_id:provider_id }))
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
            updateData.number = providerData.number
            updateData.street = providerData.street
            updateData.city = providerData.city
            updateData.postalCode = providerData.postalCode
            updateData.province = providerData.province
            updateData.telephoneNumber = providerData.telephone
            updateData.extension = providerData.extension
            updateData.partType = providerData.partType
            updateData.vehicleType = providerData.vehicleType
            updateData.offeredService = providerData.offeredService
            updateData.serviceAvailable = providerData.serviceAvailable
            updateCState(
                updateData
            )
        }

    },[providerData])
    return (
        <>
            <Header />

            <div className="WrapperArea">
                <div className="WrapperBox"> 

                    <div className="TitleBox">
                        <h4>Petal Dealer</h4>
                    </div>

                    <div className="DealerDetails">

                        <div className="Small-Wrapper"> 
                            <div className="DealerSlider">
                                <div id="demo" className="carousel slide" data-ride="carousel"> 
                                    <ul className="carousel-indicators">
                                        { providerData && Object.keys(providerData).length>0? providerData.imageGallery.map((item, i) => 

                                                <li data-target="#demo" data-slide-to={i} className={ (i == 0)?'active':'' }></li>
                                            ) 
                                            :''
                                        }
                                    </ul>
                
                                    <div className="carousel-inner">
                                        { providerData && Object.keys(providerData).length>0? providerData.imageGallery.map((item, i) => 
                                            
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
                                                <h5>Owned by {firstName} {lastName}</h5>
                                            </aside>
                                            <aside>
                                                <h6>Special Services:</h6>
                                                <p>
                                                {
                                                    serviceAvailable && serviceAvailable.length > 0 && serviceAvailable.map((item)=> (
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
                            </div> 
                        </div>
                        {
                            vehicleType && vehicleType.length > 0 && vehicleType.map((item)=> (

                                (item.checked==true)?

                                    <div className="Small-Wrapper">
                                        <div className="PartBox">
                                            <h3>{item.name } Parts Provided by Dealer:</h3>
                                            <h4>Tesla, GM, Fort <span> {
                                                    partType && partType.length > 0 && partType.map((item)=> (
                                                        (item.checked==true)?
                                                            item.name
                                                        :''
                                                    ))
                                                } Available</span></h4>
                                            <ul>
                                                {
                                                    offeredService && offeredService.length > 0 && offeredService.map((item)=> (
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
                                <h4>Payment Method Accepted on Garage:</h4>
                                <ul>
                                    <li>
                                        <a href="javascript:void(0);">
                                            <i className="fa fa-credit-card"></i>
                                            Credit Card | Debit Card
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);">
                                        <i className="fa fa-paypal" aria-hidden="true"></i>
                                            PayPal
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="Small-Wrapper">
                            <div className="CommentBox">
                                <h2>Ratings & Reviews:</h2>
                                <ul>
                                    <li>
                                        <figure><img src={Review} /></figure>
                                        <h4>Paul Walker</h4>
                                        <h5>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                        </h5>
                                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal.</p>
                                        <h6>4 Hours Ago</h6> 
                                    </li> 

                                </ul>
                            </div>
                        </div>

                    </div>

                </div>
            </div> 

            <Footer />
        </>
    );
}

export default GarageServicePartsDetail