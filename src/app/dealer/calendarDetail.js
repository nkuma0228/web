import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import _ from 'lodash'
import moment from 'moment';

import Header from "./header";
import Footer from "./footer";
import { __esModule } from 'react-rating-stars-component';

const CalendarDealerDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const quoteDetails = JSON.parse(window.localStorage.getItem("quoteDetails"))
    var totalFees = 0;
    for(let quoteDetail of quoteDetails.partQuotes) {
        
        for(let quoteD of quoteDetail.parts) {
            totalFees = totalFees + parseInt(quoteD.availablePrice)
        }   
    }

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
                            <div className="QuotePartBoxx">
                            { quoteDetails && Object.keys(quoteDetails).length>0? quoteDetails.partQuotes.map((item, i) =>
                                
                                    <div className="QuotePart">
                                        <h4>Part: { item.service } </h4>
                                        <h5>Select Part from the options:</h5>
                                        <ul>
                                            { item.parts.map((partItem, i) => 

                                                partItem.brand.length>0 ? 
                                                    <>
                                                        <li key={i}>
                                                            <label className="Radio">
                                                                <span className="checkmark"></span>
                                                            </label>
                                                            <h6>$ { partItem.availablePrice } </h6>
                                                            <p><span>Brand : </span> { partItem.brand } </p>
                                                            <p><span>Availability Date :</span> { partItem.availableDate } </p>
                                                            <p><span>Condition :</span> { partItem.condition } </p> 
                                                            <p><span>You get it by :</span> { (partItem.pickUp == "on" )? "Pickup" : (partItem.delivery == "on" )? "Delivery" : "" } </p> 
                                                        </li>
                                                    </>
                                                : <>N/A</>
                                            ) }
                                        </ul>
                                    </div>
                                
                                )
                            :'' }
                            </div>

                        </div>    
                    </div>
                </div>
            </div>

        </>
    );

}

export default CalendarDealerDetail;