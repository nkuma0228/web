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

import { requestAppointmentCalendarDetail } from "../../redux/actions/provider/garageAction";


const CalendarAppointmentDetail = () => {
    const dispatch = useDispatch();

    const getListData = useSelector(state => state.garageRequestData)
    const { requestDataCalendarDetail } = getListData

    useEffect(() => {
        let detailId = window.localStorage.getItem('calendarDetailId');
        let data = {id:detailId};
        dispatch(requestAppointmentCalendarDetail(data))
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
                                    <h4>Assign to : { requestDataCalendarDetail.assignTo ? <span className="Green"> {requestDataCalendarDetail.mechanicData.name} </span> :""} </h4> 
                                    
                                </aside> 
                            </article>

                            <article>
                                <aside>
                                    <h4>Client Details :</h4>
                                    <p><span>Name</span> { requestDataCalendarDetail.name } </p>
                                    <p><span>Contact</span> { requestDataCalendarDetail.phone } </p>
                                    <p><span>Email</span> { requestDataCalendarDetail.email } </p>
                                </aside>
                            </article>
                            <article>
                                <aside>
                                    <h4>Added Date & Time</h4>
                                    <p><span>Date</span> { moment(requestDataCalendarDetail.createdAt).format("DD MMMM 'YY") } </p>
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

export default CalendarAppointmentDetail