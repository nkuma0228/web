import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import _ from 'lodash'
import FORM from 'react-bootstrap/Form';

import Header from "./header";
import Footer from "./footer";

import { providerDetails } from "../../redux/actions/provider/authAction";

import Slider from "../../assets/garage/images/Slider.png";
import Slider1 from "../../assets/garage/images/Slider1.png";
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
    serviceAvailable:'',
    paymentType:''
}

const MyPart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { i18n, t } = useTranslation();

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
        serviceAvailable,
        paymentType
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
            updateData.paymentType = providerData.paymentType
            updateCState(
                updateData
            )
        }

    },[providerData])

    const handleReviewView = () => {
        window.localStorage.setItem("garageReviewID",  providerData._id);
    }

    return (
        <>
            <Header />

            <div class="WrapperArea">
                <div class="WrapperBox"> 

                    <div class="TitleBox">
                        <h4>{companyName}</h4>
                    </div>

                    <div class="DealerDetails">

                        <div class="Small-Wrapper"> 
                            <div class="DealerSlider">
                                <div id="demo" class="carousel slide" data-ride="carousel"> 
                                    <ul class="carousel-indicators">
                                        { providerData && Object.keys(providerData).length>0? providerData.imageGallery.map((item, i) => 

                                                <li data-target="#demo" data-slide-to={i} className={ (i == 0)?'active':'' }></li>
                                            ) 
                                            :''
                                        }
                                    </ul>
                
                                    <div class="carousel-inner">
                                        { providerData && Object.keys(providerData).length>0? providerData.imageGallery.map((item, i) => 
                                            
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
                                                <h5>{ t('vendor.MyParts.Ownedby') } {firstName} {lastName}</h5>
                                            </aside>
                                            <aside>
                                                <h6> { t('vendor.MyParts.SpecialServices') } :</h6>
                                                <p>
                                                {
                                                    serviceAvailable && serviceAvailable.length > 0 && serviceAvailable.map((item, i)=> (
                                                        (item.checked==true)?
                                                            
                                                            t(`website.ServicesAvailable.${item.name.replaceAll(" ", "")}`) + " ,"
                                                            
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

                                    <div class="Small-Wrapper">
                                        <div class="PartBox">
                                            <h3>{ t(`vendor.VehiclesType.${item.name.replaceAll(" ", "")}`) } { t('vendor.MyParts.PartsProvidedbyDealer') } :</h3>
                                            <h4> <span> {
                                                    partType && partType.length > 0 && partType.map((item, i)=> (
                                                        (item.checked==true)?
                                                            (i==0) ?
                                                                t(`vendor.serviceautoparts.${item.name.replaceAll(" ", "")}`)
                                                            : 
                                                                ' ,' + t(`vendor.serviceautoparts.${item.name.replaceAll(" ", "")}`)
                                                        :''
                                                    ))
                                                } Available</span></h4>
                                            <ul>
                                                {
                                                    offeredService && offeredService.length > 0 && offeredService.map((item)=> (
                                                        (item.checked==true)?
                                                            <li> { t(`vendor.servicePartList.${item.name.replaceAll(" ", "")}`) } </li>
                                                        :''
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                : ''
                            ))
                        }

                        <div class="Small-Wrapper">
                            <div class="PaymentBox">
                                <h4> { t('vendor.MyParts.PaymentMethodAcceptedParts') } :</h4>
                                <ul>
                                    {
                                        paymentType && paymentType.length > 0 && paymentType.map((item)=> (
                                            (item.checked==true)?
                                                <li> {item.name } </li>
                                            :''
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>

                        <div class="Small-Wrapper">
                            <div class="CommentBox">
                                <h2>
                                    { t('vendor.MyParts.RatingsReviews') } :
                                    <Link to="/dealer/my/reviews" onClick={handleReviewView} class="reviewButtonView">
                                        <span><i className="fa fa-star-o"></i></span>
                                        { t('vendor.MyParts.ViewReview') }
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

export default MyPart