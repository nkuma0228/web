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
    repairType:'',
    nearService:'',
    specialityService:'',
    garageVehicleType:'',
    paymentType:'',
}

const MyGarage = () => {
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
        repairType,
        nearService,
        specialityService,
        garageVehicleType,
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
            updateData.repairType = providerData.repairType
            updateData.nearService = providerData.nearService
            updateData.specialityService = providerData.specialityService
            updateData.garageVehicleType = providerData.garageVehicleType
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
                                <div id="demo" class="carousel slide pointer-event" data-ride="carousel"> 
                                    <ul class="carousel-indicators">
                                    { providerData && Object.keys(providerData).length>0? providerData.imageGallery.length>0 && providerData.imageGallery.map((i) => 

                                            <li data-target="#demo" data-slide-to={i} className={ (i == 0)?'active':'' }></li>
                                        )
                                        :
                                            <li data-target="#demo" data-slide-to={0} className='active'></li>
                                    }
                                    </ul>
                
                                    <div class="carousel-inner">
                                    { providerData && Object.keys(providerData).length>0 && providerData.imageGallery.length>0 ? providerData.imageGallery.map((item, i) => 
                                            
                                            <div className={ (i == 0)?'carousel-item active':'carousel-item' }>
                                                <img src={item} />
                                            </div>
                                        ) 
                                        :
                                            <div className='carousel-item active'>
                                                <img src={Slider} />
                                            </div>
                                    }
                                    </div> 
                                </div>
                                <span class="Rates"> { providerData.avgRating ? providerData.avgRating : 0 } <i class="fa fa-star"></i></span>
                            </div>
                            <div class="GaragesBox">
                                <div class="GaragesHead"> 
                                    <figcaption>
                                        <article>
                                            <aside>
                                                <h5>Owned by {firstName} {lastName} </h5>
                                            </aside>
                                            <aside>
                                                <h6> { t('garage.MyGarage.SpecialServices') } :</h6>
                                                <p>
                                                {
                                                    specialityService && specialityService.length > 0 && specialityService.map((item)=> (
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

                        <div class="Small-Wrapper">
                            <div class="PartBox">
                                <h3> { t('garage.MyGarage.ServicesProvidedGarage') } :</h3> 
                                <ul>
                                    {
                                        repairType && repairType.length > 0 && repairType.map((item)=> (
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
                                <h3> { t('garage.MyGarage.FacilitiesOfferedGarage') } </h3> 
                                <ul>
                                    {
                                        nearService && nearService.length > 0 && nearService.map((item)=> (
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
                                <h3> { t('garage.MyGarage.SpecialServicesOfferedRarage') } </h3> 
                                <ul>
                                    {
                                        specialityService && specialityService.length > 0 && specialityService.map((item)=> (
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
                                <h3> { t('garage.MyGarage.CarType') } </h3> 
                                <ul>
                                    {
                                        garageVehicleType && garageVehicleType.length > 0 && garageVehicleType.map((item)=> (
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
                                <h4> { t('garage.MyGarage.PaymentMethodAcceptedGarage') } :</h4>
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
                                { t('garage.MyGarage.RatingsReviews') } 
                                    <Link to="/garage/my/reviews" onClick={handleReviewView} class="reviewButtonView">
                                        <span><i className="fa fa-star-o"></i></span>
                                        { t('garage.MyGarage.ViewReview') } 
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

export default MyGarage