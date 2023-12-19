    import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import _ from 'lodash'
import moment from 'moment';

import Header from "./header";
import Footer from "./footer";
import { __esModule } from 'react-rating-stars-component';

import { fetchUser } from "../../redux/actions/provider/dealerAction";

const ViewQuote = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getListData = useSelector(state => state.dealerRequestData)
    const { requestDealerUserData } = getListData

    const quoteDetails = JSON.parse(window.localStorage.getItem("quoteDetails"))
    var totalFees = 0;
    for(let quoteDetail of quoteDetails.partQuotes) {
        
        for(let quoteD of quoteDetail.parts) {
            totalFees = totalFees + parseInt(quoteD.availablePrice)
        }   
    }
    useEffect(() => {
        const data = { user_id: quoteDetails.user_id }
        dispatch(fetchUser(data))
    },[])

    return (
        <>
            <Header />

            <div className="WrapperArea">
                <div className="WrapperBox"> 

                    <div className="TitleBox">
                        <h4>Parts Details</h4>
                    </div> 
                    <div className="GaragesBox">
                        <div className="GaragesHead">

                            <figcaption>
                                <h4>Petal Garages <span>Requested on { quoteDetails && Object.keys(quoteDetails).length>0? moment(quoteDetails.createdAt).format("LLL") : '' } </span></h4>
                                <article>
                                    <aside>
                                        <h6>Vendor Contact Info</h6>
                                        <p>Requested Services: { quoteDetails && Object.keys(quoteDetails).length>0? quoteDetails.services.join(', ') : '' } </p>
                                        <p>Description: { quoteDetails && Object.keys(quoteDetails).length>0? quoteDetails.notes : '' }  </p>
                                    </aside>
                                </article>
                            </figcaption>
                        </div>
                        <div className="QuoteBox">
                            <h3>Quote Details <span>Quote Submitted On { quoteDetails && Object.keys(quoteDetails).length>0? moment(quoteDetails.quoteDate).format("LLL") : '' } </span></h3>
                            
                            { quoteDetails && Object.keys(quoteDetails).length>0? quoteDetails.partQuotes.map((item, i) =>

                                    <div className="QuotePart">
                                        <h4>Part: { item.service } </h4>
                                        <h5>Select Part from the options:</h5>
                                        <ul>
                                            { item.parts.map((partItem, i) => 
                                                <>
                                                    <li key={i}>
                                                        <label className="Radio">
                                                            <span className="checkmark"></span>
                                                        </label>
                                                        <h6>$ { partItem.availablePrice } </h6>
                                                        <p><span>Brand : </span> { partItem.brand } </p>
                                                        <p><span>Model : </span> { partItem.make } </p>
                                                        <p><span>Availability Date :</span> { partItem.availableDate } </p>
                                                        <p><span>Condition :</span> { partItem.condition } </p> 
                                                        <p><span>Description :</span> { partItem.description } </p> 
                                                        <p><span>You get it by :</span> { (partItem.pickUp == "on" )? "Pickup" : (partItem.delivery == "on" )? "Delivery" : "" } </p> 
                                                    </li>
                                                </>
                                            ) }
                                        </ul>
                                    </div>
                                )
                            :'' }

                            <div className="GaragesHead">

                                <figcaption>
                                    <h4>Client Details:</h4>
                                
                                    <article>
                                        <aside>
                                            <p>Name: { requestDealerUserData && Object.keys(requestDealerUserData).length>0?requestDealerUserData.firstName + ' '+requestDealerUserData.lastName :'' } </p>
                                            <p>Mob: { requestDealerUserData && Object.keys(requestDealerUserData).length>0?requestDealerUserData.mobile :'' } </p>
                                            <p>Email Id: { requestDealerUserData && Object.keys(requestDealerUserData).length>0?requestDealerUserData.email :'' } </p>
                                            <p>Delivery Location: { requestDealerUserData && Object.keys(requestDealerUserData).length>0?requestDealerUserData.number+', '+requestDealerUserData.street+', '+requestDealerUserData.city+', '+requestDealerUserData.province+', '+requestDealerUserData.postalCode :'' } </p>
                                        </aside>
                                    
                                    </article>
                                </figcaption>
                            </div>

                            <div className="Cost">
                                <p>Total Cost: ${ totalFees }</p>
                            </div>

                            <div className='ServiceImages'>
                                <ul>
                                { 
                                    quoteDetails.imageGallery && quoteDetails.imageGallery.length>0 ? quoteDetails.imageGallery.map((itemImg) => 
                                        <li>
                                            <img src={itemImg}  />
                                        </li>
                                    )
                                    : 
                                    ''
                                }
                                </ul>
                            </div>

                        </div>    
                    </div>
                </div>
            </div>

        </>
    );

}

export default ViewQuote;