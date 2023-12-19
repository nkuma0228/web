import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css'
import _ from 'lodash'
import FORM from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction";

import Header from "./header";
import Footer from "./footer";

import { futureAppointmentList } from "../../redux/actions/provider/garageAction";

const FutureAppointmentCalendar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { i18n, t } = useTranslation();

    const getListData = useSelector(state => state.garageRequestData)
    const { futureAppointmentData } = getListData

    useEffect(() => {
        dispatch(futureAppointmentList())
    },[])

    const [eventData, setEventData] = useState([]);
    useEffect(() => {
        setEventData(futureAppointmentData);
    },[futureAppointmentData])


    const handleDetail = (id) => {
        window.localStorage.setItem('calendarDetailId', id);
        navigate("/garage/future_appointment_calendar/details")
    }

    const [modalEventShow, setModalEventShow] = useState(false);
    const handleModalEventClose = () => {
        setModalEventShow(false);
    }
    const handleModalEventShow = (selectInfo) => {
        setModalEventShow(true);
    }

    const renderEventContent = (eventInfo) => {
        return (
          <>
          <div className='VehicleEvent'>
                <p>Booking with: {eventInfo.event.title}</p>
                <Link className="Blue" to="/garage/future_appointment_calendar/details" onClick={()=>handleDetail(eventInfo.event.extendedProps.service_id)}>
                    view Details
                </Link>
            </div>
          </>
        )
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 100,
            behavior: 'auto'
        });
    },[]);

    return (
        <>
            <Header />

            <div class="WrapperArea">
                
                <div class="WrapperBox"> 

                    <div class="TitleBox">
                        <h4> { t('garage.sidemenu.MyFutureCalendar') } </h4>
                    </div> 

                    <div class="Small-Wrapper">
                        <div className='NewScheduleBox'>
                            <div>
                                <FullCalendar
                                    plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
                                    initialView="timeGridWeek"
                                    headerToolbar={{
                                        left: "prev,next today",
                                        center: "title",
                                        right: "timeGridWeek",
                                    }}
                                    slotDuration='00:30'
                                    editable={true}
                                    selectable={true}
                                    allDaySlot={false}
                                    events={eventData}
                                    eventContent={renderEventContent} // custom render function
                                    height="600px"
                                />
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            

            <Footer />
        </>
    );
}

export default FutureAppointmentCalendar