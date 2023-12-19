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

import { mechanicCreate, mechanicList, schedulingList, appointmentCreate } from "../../redux/actions/provider/garageAction";

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
    mechanic:'',
    fullnameEmpty:'',
    emailEmpty:'',
    phoneEmpty:'',
    noteEmpty:'',
    assignToEmpty:'',
}

const MyCalendar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { i18n, t } = useTranslation();

    const getListData = useSelector(state => state.garageRequestData)
    const { mechanicListing, schedulingListing } = getListData
    
    useEffect(() => {
        dispatch(mechanicList())
        var data = { "from":'', "to":'', "mechanic":"" }
        dispatch(schedulingList(data))
    },[])

    const [eventData, setEventData] = useState([]);
    useEffect(() => {
        setEventData(schedulingListing);
    },[schedulingListing])

    const [modalMechanicShow, setModalMechanicShow] = useState(false);
    const handleModalMechanicClose = () => {
        setModalMechanicShow(false);
    }
    const handleModalMechanicShow = () => {
        setModalMechanicShow(true);
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

    let handleMechanicSubmit = (event) => {
        event.preventDefault();
        let formIsValid = handleValidation();
        if (formIsValid) {
            const data = { name }
            dispatch(mechanicCreate(data)).then(res => {
                if (res.code == 201) {
                    handleModalMechanicClose();
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
        mechanic,
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
        navigate("/garage/mycalendar/detail")
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
        //console.log("selectInfo", selectInfo.start)
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
                        <Link className="Blue" to="/garage/mycalendar/appointment/detail" onClick={()=>handleAppointmentDetail(eventInfo.event.extendedProps.service_id)}>
                            view Details
                        </Link>
                    </div>
                : 
                
                    <div className='VehicleEvent'>
                        <p>Booking with: {eventInfo.event.title}</p>
                        <Link className="Blue" to="/garage/mycalendar/detail" onClick={()=>handleDetail(eventInfo.event.extendedProps.service_id)}>
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
        if (!fullname || !fullname.trim()) {
            fullnameEmpty = "Please enter name";
            formIsValid = false;
        }
        
        if (!note || !note.trim()) {
            noteEmpty = "Please enter note";
            formIsValid = false;
        }
        if (!assignTo || !assignTo.trim()) {
            assignToEmpty = "Please select mechanic";
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
            //console.log("dataaaaaa", data)
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
    
    let handleFilterMechanic = (event) => {
        var data = { "from":'', "to":'', "mechanic":event.target.value }
        dispatch(schedulingList(data))
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
                        <h4> { t('garage.sidemenu.MyCalendar') } </h4>
                        <Link class="TitleLink" to="/garage/mechanic"> { t('garage.MyCalendar.Mechanic') } </Link>
                    </div> 

                    <div class="Mechanic">
                        <div class="MechanicLeft">
                        </div>
                        <div class="MechanicRight">
                            <p>{ t('garage.MyCalendar.MechanicList') }: <select name="mechanic" onChange={handleFilterMechanic}> <option value="">Select</option> { mechanicListing && mechanicListing.length>0 && mechanicListing.map((item, i)=> <option value={item.name}> {item.name} </option> ) } </select></p>
                        </div>
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

            <Modal show={modalMechanicShow} className="PanelModal">
                <div class="modal-body">
                    <div class="Category">
                        <a href="javascript:void(0);" class="Close" onClick={handleModalMechanicClose}>×</a>
                        <h3>Add Mechanic</h3>
                        <FORM onSubmit={handleMechanicSubmit}>
                            <div class="form-group">
                                <label> Name </label>
                                <input type="text" class="form-control" placeholder="Enter name" name="name" value={name} onChange={handleInputChange} />
                                <span style={{ color: "red" }}>{nameEmpty}</span>
                            </div>
                            <button type="submit" class="Accept">Add</button>
                        </FORM>
                    </div>
                </div>
            </Modal>

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
                                <textarea class="form-control" placeholder="Enter service details" name="note" value={note} onChange={handleAppointInputChange} ></textarea>
                                <span style={{ color: "red" }}>{noteEmpty}</span>
                            </div>
                            <div class="form-group">
                                <label> Assign Mechanic </label>
                                <select class="form-control" name="assignTo" value={assignTo} onChange={handleAppointInputChange}>
                                    <option value="">Select</option>
                                    { mechanicListing && mechanicListing.length>0 && mechanicListing.map((item, i)=> <option value={item._id}> {item.name} </option> ) }
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

export default MyCalendar