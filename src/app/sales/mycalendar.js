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

import { salesAgentCreate, salesAgentList, schedulingList, appointmentCreate } from "../../redux/actions/provider/salesAction";

const initialState = {
    name:'',
    nameEmpty:''
}

const initialAppointState = {
    fullname:'',
    email:'',
    phone:'',
    note:'',
    assignTo:'',
    assignDate:'',
    fullnameEmpty:'',
    emailEmpty:'',
    phoneEmpty:'',
    noteEmpty:'',
    assignToEmpty:'',
}

const MySalesCalendar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { i18n, t } = useTranslation();

    const getListData = useSelector(state => state.salesRequestData)
    const { salesAgentListing, schedulingListing } = getListData

    useEffect(() => {
        dispatch(salesAgentList())
        dispatch(schedulingList())
    },[])

    const [eventData, setEventData] = useState([]);
    useEffect(() => {
        setEventData(schedulingListing);
    },[schedulingListing])

    const [modalAgentShow, setModalAgentShow] = useState(false);
    const handleModalAgentClose = () => {
        setModalAgentShow(false);
    }
    const handleModalAgentShow = () => {
        setModalAgentShow(true);
    }

    const [dataState, setDataState] = useState(initialState);
    const {
        name,
        nameEmpty
    } = dataState
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setDataState({
            ...dataState, [name]: value
        })
    }
    const handleValidation = () => {
        let nameEmpty = ''
        let formIsValid = true;
        if (!name.trim()) {
            nameEmpty = "Please enter name";
            formIsValid = false;
        }
        setDataState({
            ...dataState, 
            nameEmpty
        })
        return formIsValid;
    }

    let handleAgentSubmit = (event) => {
        event.preventDefault();
        let formIsValid = handleValidation();
        if (formIsValid) {
            const data = { name }
            dispatch(salesAgentCreate(data)).then(res => {
                if (res.code == 201) {
                    handleModalAgentClose();
                    toast.success(res.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    setTimeout(
                        function() {
                            window.location.reload()
                        }
                        .bind(this),
                        2000
                    );
                } else {
                    let errors = res.errors.errors
                    errors.map((item) => {
                        var newParam = item.param
                        let messageErr = item.msg +' of '+ newParam
                        toast.error(messageErr, {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    })
                    setDataState({
                        ...dataState,
                        errorMsg: res.message,
                        nameEmpty: '',
                    })
                }
            }).catch(err => {
                console.log(err, 'err')
                const message = err && err.response && err.response.data ? err.response.data.message : "Something went wrong."
                toast.error(message, {
                    position: toast.POSITION.TOP_RIGHT
                });
            })
        }
    }

    const [appointState, setAppointState] = useState(initialAppointState);
    const {
        fullname,
        email,
        phone,
        note,
        assignTo,
        assignDate,
        fullnameEmpty,
        emailEmpty,
        phoneEmpty,
        noteEmpty,
        assignToEmpty
    } = appointState
    const handleAppointInputChange = (e) => {
        const { name, value } = e.target
        setAppointState({
            ...appointState, [name]: value
        })
    }

    const handleDetail = (id) => {
        window.localStorage.setItem('calendarDetailId', id);
        navigate("/sales/mycalendar/detail")
    }

    const handleAppointmentDetail = (id) => {
        window.localStorage.setItem('calendarDetailId', id);
        navigate("/garage/mycalendar/appointment/detail")
    }

    const [modalEventShow, setModalEventShow] = useState(false);
    const handleModalEventClose = () => {
        setModalEventShow(false);
    }
    const handleModalEventShow = (selectInfo) => {
        var dateFormat = new Date(selectInfo.start)
        setAppointState({
            ...dataState, assignDate: dateFormat
        })
        setModalEventShow(true);
    }

    const renderEventContent = (eventInfo) => {
        return (
            <>
            {
                eventInfo.event.extendedProps.quoteType == "appoint" ?
                    <div className='VehicleEvent'>
                        <p>Booking with: {eventInfo.event.title}</p>
                        <Link className="Blue" to="/sales/mycalendar/appointment/detail" onClick={()=>handleAppointmentDetail(eventInfo.event.extendedProps.service_id)}>
                            view Details
                        </Link>
                    </div>
                : 
                
                    <div className='VehicleEvent'>
                        <p>Booking with: {eventInfo.event.title}</p>
                        <Link className="Blue" to="/sales/mycalendar/detail" onClick={()=>handleDetail(eventInfo.event.extendedProps.service_id)}>
                            view Details
                        </Link>
                    </div>
            }
          </>
        )
    }

    const handleAppointValidation = () => {
        let fullnameEmpty = ''
        let emailEmpty = ''
        let noteEmpty = ''
        let phoneEmpty = ''
        let assignToEmpty = ''

        let formIsValid = true;
        if (!fullname) {
            fullnameEmpty = "Please enter name";
            formIsValid = false;
        }
        if (!email) {
            emailEmpty = "Please enter email";
            formIsValid = false;
        }
        if (!phone) {
            phoneEmpty = "Please enter phone";
            formIsValid = false;
        }
        if (!assignTo) {
            assignToEmpty = "Please select sales Agent";
            formIsValid = false;
        }
        setAppointState({
            ...appointState, 
            fullnameEmpty,
            emailEmpty,
            phoneEmpty,
            noteEmpty,
            assignToEmpty,
        })
        return formIsValid;
    }

    let handleAppointmentSubmit = (event) => {
        event.preventDefault();
        let formIsValid = handleAppointValidation();
        if (formIsValid) {
            const data = { name:fullname, email,phone,note,assignTo,assignDate }
            
            dispatch(appointmentCreate(data)).then(res => {
                if (res.code == 201) {
                    handleModalEventClose();
                    toast.success(res.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    setTimeout(
                        function() { window.location.reload() }
                        .bind(this),
                        2000
                    );

                } else {
                    let errors = res.errors.errors
                    errors.map((item) => {
                        var newParam = item.param
                        let messageErr = item.msg +' of '+ newParam
                        toast.error(messageErr, {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    })
                    setAppointState({
                        ...appointState,
                        errorMsg: res.message,
                        fullnameEmpty: '',
                        phoneEmpty: '',
                        emailEmpty: '',
                        noteEmpty: '',
                    })
                }
            }).catch(err => {
                console.log(err, 'err')
                const message = err && err.response && err.response.data ? err.response.data.message : "Something went wrong."
                toast.error(message, {
                    position: toast.POSITION.TOP_RIGHT
                });
            })
        }
    }

    return (
        <>
            <Header />

            <div className="WrapperArea">
                
                <div className="WrapperBox"> 

                    <div class="TitleBox">
                        <h4> { t('garage.sidemenu.MyCalendar') } </h4>
                        <Link class="TitleLink" to="/sales/agent"> { t('sales.MyCalendar.SalesAgent') } </Link>
                    </div> 

                    <div className="Mechanic">
                        <div className="MechanicLeft">
                        </div>
                        <div className="MechanicRight">
                        <p>{ t('sales.MyCalendar.AgentList') }: <select name="mechanic"> { salesAgentListing && salesAgentListing.length>0 && salesAgentListing.map((item, i)=> <option value={item._id}> {item.name} </option> ) } </select></p>
                        </div>
                    </div>

                    <div className="Small-Wrapper"> 
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
                                    select={handleModalEventShow}
                                    events={eventData}
                                    eventContent={renderEventContent} // custom render function
                                    height="600px"
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <Modal show={modalEventShow} className="PanelModal">
                <div class="modal-body">
                    <div class="Category">
                        <a href="javascript:void(0);" class="Close" onClick={handleModalEventClose}>×</a>
                        <h3>Add Appointment</h3>
                        <FORM onSubmit={handleAppointmentSubmit}>
                            <div class="form-group">
                                <label> Name </label>
                                <input type="text" class="form-control" placeholder="Enter name" name="fullname" value={fullname} onChange={handleAppointInputChange} />
                                <span style={{ color: "red" }}>{fullnameEmpty}</span>
                            </div>
                            <div class="form-group">
                                <label> Email </label>
                                <input type="text" class="form-control" placeholder="Enter email" name="email" value={email} onChange={handleAppointInputChange} />
                                <span style={{ color: "red" }}>{emailEmpty}</span>
                            </div>
                            <div class="form-group">
                                <label> Phone number </label>
                                <input type="text" class="form-control" placeholder="Enter phone number" name="phone" value={phone} onChange={handleAppointInputChange} />
                                <span style={{ color: "red" }}>{phoneEmpty}</span>
                            </div>
                            <div class="form-group">
                                <label> Note </label>
                                <textarea class="form-control" placeholder="Enter details" name="note" value={note} onChange={handleAppointInputChange} ></textarea>
                                <span style={{ color: "red" }}>{noteEmpty}</span>
                            </div>
                            <div class="form-group">
                                <label> Assign Sales Agent </label>
                                <select class="form-control" name="assignTo" value={assignTo} onChange={handleAppointInputChange}>
                                    <option value=""> Select </option>
                                    { salesAgentListing && salesAgentListing.length>0 && salesAgentListing.map((item, i)=> <option value={item._id}> {item.name} </option> ) }
                                </select>
                                <span style={{ color: "red" }}>{assignToEmpty}</span>
                            </div>
                            <button type="submit" class="Accept">Add</button>
                        </FORM>
                    </div>
                </div>
            </Modal>

            <Footer />
        </>
    );
}

export default MySalesCalendar