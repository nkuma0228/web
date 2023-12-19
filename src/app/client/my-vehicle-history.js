import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import _ from 'lodash'
import moment from 'moment';

import Header from "./header";
import Footer from "./footer";
import Product_Placeholder from "../../assets/client/images/Product_Placeholder.png"

import { vehicleGarageHistory, vehicleDealerHistory } from "../../redux/actions/client/vehicleAction";

const MyVehicleHistory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const vehicleHistoryID = window.localStorage.getItem("vehicleHistory")

    const getListData = useSelector(state => state.clientVehicle)
    const { vehicleHistoryGarageData, vehicleHistoryDealerData } = getListData
    
    useEffect(() => {
        const data = {vehicleHistoryID: vehicleHistoryID}
        dispatch(vehicleGarageHistory(data))
    },[])

    const handleGarageQuotes = () => {
        const data = {vehicleHistoryID: vehicleHistoryID}
        dispatch(vehicleGarageHistory(data))
    }

    const handlePartsQuotes = () => {
        const data = {vehicleHistoryID: vehicleHistoryID}
        dispatch(vehicleDealerHistory(data))
    }

    const handleDetail = (id) => {
        window.localStorage.setItem("garageDetailID", id)
    }

    return (
        <>
            <ToastContainer/>
            <Header />

            <div className="WrapperArea">
                <div className="WrapperBox"> 
                    <div className="TitleBox">
                        <h4>Dashboard</h4>
                    </div>
                    <div className="CommonTabs">
                        <ul className="nav nav-tabs">
                            <li className="nav-item" onClick={handleGarageQuotes}>
                                <a className="nav-link active" data-toggle="tab" href="#Service">Service Garages</a>
                            </li>
                            <li className="nav-item" onClick={handlePartsQuotes}>
                                <a className="nav-link" data-toggle="tab" href="#Parts">Parts Services</a>
                            </li>
                        </ul>

                        <div className="tab-content">
                            
                            <div className="tab-pane active" id="Service">

                                { vehicleHistoryGarageData && vehicleHistoryGarageData.length>0 ? vehicleHistoryGarageData.map( (item, i) =>
                                        
                                        <div className="GaragesBox">
                                            <div className="GaragesHead">
                                                <figure>
                                                    <img src={ item.providerData.imageGallery.length>0 ? item.providerData.imageGallery[0] : Product_Placeholder} />
                                                    <span className="Rates"> { item.providerData.avgRating ? item.providerData.avgRating : 0 } <i className="fa fa-star"></i></span>
                                                </figure>
                                                <figcaption>
                                                    <h4><Link to="/client/service-garage/detail" onClick={() => handleDetail(item.providerData._id)}> { item.providerData.business }  </Link></h4>
                                                    <h5>Owned by { item.providerData.firstName } { item.providerData.lastName }</h5>
                                                    <article>
                                                        <aside>
                                                            <h6>Garage Contact Info</h6>
                                                            <p>Email Address: { item.providerData.email }</p>
                                                            <p>Mobile Number: { item.providerData.telephone }</p>
                                                            <p>Address: { item.providerData.number }, { item.providerData.street }, { item.providerData.city }, { item.providerData.province } </p> 
                                                        </aside>
                                                        <aside>
                                                            {
                                                                item.providerData.specialityService ?
                                                                    <>
                                                                        <h6>Special Services:</h6>
                                                                        <p>
                                                                            {   
                                                                                item.providerData.specialityService && item.providerData.specialityService.map((special) => 
                                                                                    (special.checked == true) ?
                                                                                        special.name + ', '
                                                                                    : ''
                                                                                )
                                                                            }
                                                                        </p>
                                                                    </>
                                                                : ''
                                                            }
                                                        </aside>
                                                    </article>
                                                </figcaption>
                                            </div>
                                            <div className="GaragesMiddle">
                                                <aside>
                                                    { item.services ? <p>Requested Services: <span> { item.services && item.services.map((item)=> item+ ', ' )} </span></p> : '' }
                                                </aside>
                                                <aside>
                                                    {  item.vehicleDetail ?  <p>Vehicle: <span> { item.vehicleDetail[0].vehicleNumber } { item.vehicleDetail[0].model } { item.vehicleDetail[0].make } { item.vehicleDetail[0].year } { item.vehicleDetail[0].type } </span></p> : '' }
                                                </aside>
                                            </div>
                                            <div className="QuoteBox">
                                                <h4>Quote Details : <span>Requested on { moment(item.createdAt).format("LL") }  </span></h4>
                                                <blockquote>
                                                    <aside>
                                                        <h5>Cost of Estimate </h5>
                                                        <p>$ { item.cost } </p>
                                                    </aside>
                                                    <aside>
                                                        <h5>Select your visit Schedule</h5>
                                                        <p> { moment(item.serviceDate).format("LL") } At { item.serviceTime } </p>
                                                    </aside>   
                                                </blockquote>  
                                            </div>
                                        </div>
                                    )
                                    : "No result found"
                                }

                            </div>

                            <div className="tab-pane" id="Parts">
                            { vehicleHistoryDealerData && vehicleHistoryDealerData.length>0 ? vehicleHistoryDealerData.map( (item, i) =>
                                    
                                    <div className="GaragesBox">
                                        <div className="GaragesHead">
                                            <figure>
                                                <img src={ item.providerData.imageGallery.length>0 ? item.providerData.imageGallery[0] : Product_Placeholder} />
                                                <span className="Rates"> { item.providerData.avgRating ? item.providerData.avgRating : 0 } <i className="fa fa-star"></i></span>
                                            </figure>
                                            <figcaption>
                                                <h4><Link to="/client/service-garage/detail" onClick={() => handleDetail(item.providerData._id)}> { item.providerData.business }  </Link></h4>
                                                <h5>Owned by { item.providerData.firstName } { item.providerData.lastName }</h5>
                                                <article>
                                                    <aside>
                                                        <h6>Contact Info</h6>
                                                        <p>Email Address: { item.providerData.email }</p>
                                                        <p>Mobile Number: { item.providerData.telephone }</p>
                                                        <p>Address: { item.providerData.number }, { item.providerData.street }, { item.providerData.city }, { item.providerData.province } </p> 
                                                    </aside>
                                                    <aside>
                                                        {
                                                            item.providerData.serviceAvailable ?
                                                                <>
                                                                    <h6>Special Services:</h6>
                                                                    <p>
                                                                        {   
                                                                            item.providerData.serviceAvailable && item.providerData.serviceAvailable.map((special) => 
                                                                                (special.checked == true) ?
                                                                                    special.name + ', '
                                                                                : ''
                                                                            )
                                                                        }
                                                                    </p>
                                                                </>
                                                            : ''
                                                        }
                                                    </aside>
                                                </article>
                                            </figcaption>
                                        </div>
                                        <div className="GaragesMiddle">
                                            <aside>
                                                { item.services ? <p>Requested Services: <span> { item.services && item.services.map((item)=> item+ ', ' )} </span></p> : '' }
                                            </aside>
                                            <aside>
                                                {  item.vehicleData ?  <p>Vehicle: <span> { item.vehicleData.vehicleNumber } { item.vehicleData.model } { item.vehicleData.make } { item.vehicleData.year } { item.vehicleData.type } </span></p> : '' }
                                            </aside>
                                        </div>
                                        <div className="QuoteBox">
                                            <h4>Quote Details : <span>Requested on { moment(item.createdAt).format("LL") }  </span></h4>
                                            <div className="QuotePartBoxx">
                                            {
                                                item.partQuotes && item.partQuotes.length>0 && item.partQuotes.map((item, i) => 
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
                                                                        <p><span>Availability Date :</span> { partItem.availableDate } </p>
                                                                        <p><span>Condition :</span> { partItem.condition } </p> 
                                                                        <p><span>You get it by :</span> { (partItem.pickUp == "on" )? "Pickup" : (partItem.delivery == "on" )? "Delivery" : "" } </p> 
                                                                    </li>
                                                                </>
                                                            ) }
                                                        </ul>
                                                    </div>
                                                )
                                            }
                                            </div>
                                        </div>
                                    </div>
                                )
                                : "No result found"
                            }
                            </div>

                        </div>

                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default MyVehicleHistory