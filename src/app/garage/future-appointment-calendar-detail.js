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

import { requestFutureCalendarDetail } from "../../redux/actions/provider/garageAction";

const format = 'h:mm a';
const now = moment().hour(0).minute(0);

const FutureAppointmentCalendarDetail = () => {
    const dispatch = useDispatch();

    const getListData = useSelector(state => state.garageRequestData)
    const { requestDataFutureCalendarDetail } = getListData

    useEffect(() => {
        let detailId = window.localStorage.getItem('calendarDetailId');
        let data = {id:detailId};
        dispatch(requestFutureCalendarDetail(data))
    },[])
     

    return (
        <>
            <Header />
            <ToastContainer/>

            <div className="WrapperArea">
                <div className="WrapperBox"> 

                    <div className="TitleBox">
                        <h4>Future Booking Details:</h4>
                    </div> 

                    <div className="Small-Wrapper">
                    {
                        requestDataFutureCalendarDetail && Object.keys(requestDataFutureCalendarDetail).length>0 ?
                        <div className="BookingDetails">

                            <article>
                                <aside>
                                    <h4>Client Details :</h4>
                                    <p><span>Name</span> { requestDataFutureCalendarDetail.clientData.firstName } </p>
                                    <p><span>Contact</span> { requestDataFutureCalendarDetail.clientData.mobile } </p>
                                    <p><span>Email</span> { requestDataFutureCalendarDetail.clientData.email } </p>
                                </aside>
                            </article>
                            <article>
                                <aside>
                                    <h4>Booking Date & Time</h4>
                                    <p><span>Date of Booking</span> { moment(requestDataFutureCalendarDetail.serviceDate).format("DD MMMM 'YY") } </p>
                                    <p><span>Time of Booking</span> { requestDataFutureCalendarDetail.serviceTime }</p> 
                                </aside>
                                <aside>
                                    <h4>Quote Submitted On</h4>
                                    <p><strong> { moment(requestDataFutureCalendarDetail.createdAt).format("LLL") } </strong></p> 
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

export default FutureAppointmentCalendarDetail