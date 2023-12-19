import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'rc-time-picker/assets/index.css';
import TimePicker from 'rc-time-picker';

import moment from 'moment';
import FORM from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Header from "./header";
import Footer from "./footer";

import { requestCalendarDetail } from "../../redux/actions/provider/dealerAction";

const format = 'h:mm a';
const now = moment().hour(0).minute(0);

const DealerHistoryDetail = () => {
    const dispatch = useDispatch();

    const getListData = useSelector(state => state.dealerRequestData)
    const { requestDataCalendarDetail } = getListData

    useEffect(() => {
        let detailId = window.localStorage.getItem('historyDetailId');
        let data = {id:detailId};
        dispatch(requestCalendarDetail(data))
    },[])

    return (
        <>
            <Header />
            <ToastContainer/>

            <div className="WrapperArea">
                <div className="WrapperBox"> 

                    <div className="TitleBox">
                        <h4>Booking Details:</h4>
                    </div> 

                    <div className="Small-Wrapper">
                    {
                        requestDataCalendarDetail && Object.keys(requestDataCalendarDetail).length>0 ?
                        <div className="BookingDetails">
                            <article>
                                <aside>
                                    <h4>Car Details</h4>
                                    <p><strong> {requestDataCalendarDetail.vehicleData.vehicleNumber } , {requestDataCalendarDetail.vehicleData.model } ,  {requestDataCalendarDetail.vehicleData.make } , {requestDataCalendarDetail.vehicleData.type } , {requestDataCalendarDetail.vehicleData.year } </strong></p> 
                                </aside> 
                            </article>


                            <article>
                                <aside>
                                    <h4>Service Details</h4>
                                    <p><span>Requested Services</span> { requestDataCalendarDetail.services &&  requestDataCalendarDetail.services.map((item) => item+', ' ) } </p>
                                    <p><span>Tow Truck Required</span> { requestDataCalendarDetail.towTruck?requestDataCalendarDetail.towTruck:"no" } </p> 
                                </aside> 
                                <aside>
                                    <h4>Assign to : { requestDataCalendarDetail.assignTo ? <span className="Green"> {requestDataCalendarDetail.assignTo} </span> :""} </h4> 
                                    <h4>Status : <span className="Green"> { requestDataCalendarDetail.status } </span></h4> 
                                </aside> 
                            </article>

                            <article>
                                <aside>
                                    <h4>Client Details :</h4>
                                    <p><span>Name</span> { requestDataCalendarDetail.clientData.firstName } </p>
                                    <p><span>Contact</span> { requestDataCalendarDetail.clientData.mobile } </p>
                                    <p><span>Email</span> { requestDataCalendarDetail.clientData.email } </p>
                                </aside>
                                <aside>
                                    <h4>Cost of Estimate :</h4>
                                    <p><strong>$ { requestDataCalendarDetail.cost } </strong> </p> 
                                </aside>
                            </article>
                            <article>
                                <aside>
                                    <h4>Booking Date & Time</h4>
                                    <p><span>Date of Booking</span> { moment(requestDataCalendarDetail.serviceDate).format("DD MMMM 'YY") } </p>
                                    <p><span>Time of Booking</span> { requestDataCalendarDetail.serviceTime }</p> 
                                </aside>
                                <aside>
                                    <h4>Quote Submitted On</h4>
                                    <p><strong> { moment(requestDataCalendarDetail.quoteDate).format("LLL") } </strong></p> 
                                </aside>
                            </article>
                            
                        </div>
                        :
                        ''
                    }
                    </div>

                </div>
            </div>

            <Footer />
        
        </>
    );
}

export default DealerHistoryDetail