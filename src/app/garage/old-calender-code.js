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

import { mechanicCreate, mechanicList, schedulingList } from "../../redux/actions/provider/garageAction";

const initialState = {
    name:'',
    nameEmpty:''
}

const MyCalendar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { i18n, t } = useTranslation();

    const { combine, allowedMaxDays, beforeToday } = DateRangePicker;

    const getListData = useSelector(state => state.garageRequestData)
    const { mechanicListing, schedulingListing } = getListData

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    useEffect(() => {
        dispatch(mechanicList())

        let todayDate = moment().format('YYYY-MM-DD');
        setStartDate(todayDate)
        let addedDate = moment().add(5, 'days').format('YYYY-MM-DD');
        setEndDate(addedDate)
        var data = { "from":todayDate, "to":addedDate }
        dispatch(schedulingList(data))
    },[])

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

    const [filterStart, setFilterStart] = useState();
    const [filterEnd, setFilterEnd] = useState();
    const datepik = (e) => {
        
        let todayDate = moment(e[0]).format('YYYY-MM-DD');
        setStartDate(todayDate)
        let addedDate = moment(e[1]).format('YYYY-MM-DD');
        setFilterEnd(addedDate)
        let startTimezone = Date.parse(todayDate);
        let endTimezone = Date.parse(addedDate);
        
        setFilterStart(startTimezone)
        setFilterEnd(endTimezone)

        var data = { "from":todayDate, "to":addedDate }
        dispatch(schedulingList(data))
    }

    const handleDetail = (id) => {
        window.localStorage.setItem('calendarDetailId', id);
        navigate("/garage/mycalendar/detail")
    }

    const handleWeekPreviousChange = () => {
        let todayDate = moment(startDate).format('YYYY-MM-DD');
        let addedDate = moment(startDate).subtract(5, "days").format('YYYY-MM-DD');

        setStartDate(addedDate)
        setEndDate(todayDate)

        var data = { "from":addedDate, "to":todayDate }
        dispatch(schedulingList(data))
    }

    const handleWeekNextChange = () => {
        console.log("endDate", endDate)
        let todayDate = moment(endDate).format('YYYY-MM-DD');
        let addedDate = moment(todayDate).add(5, "days").format('YYYY-MM-DD');

        setStartDate(todayDate)
        setEndDate(addedDate)

        var data = { "from":todayDate, "to": addedDate}
        console.log(data)
        dispatch(schedulingList(data))
    }

    const handleMechanicChange = () => {
    }

    const [modalEventShow, setModalEventShow] = useState(false);
    const handleModalEventClose = () => {
        setModalEventShow(false);
    }
    const handleModalEventShow = (selectInfo) => {
        console.log("selectInfo", selectInfo)
        setModalEventShow(true);
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 100,
            behavior: 'auto'
        });
    },[]);

    const events = [{ title: "Today", date: new Date() }]; 

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
                            <p>{ t('garage.MyCalendar.SelectDateRange') }: <DateRangePicker placeholder={ t('garage.MyCalendar.SelectDateRange') } disabledDate={allowedMaxDays(5)} onOk={datepik}/> </p>
                        </div>
                        <div class="MechanicRight">
                            <p>{ t('garage.MyCalendar.MechanicList') }: <select name="mechanic" onChange={handleMechanicChange}> { mechanicListing && mechanicListing.length>0 && mechanicListing.map((item, i)=> <option value={item._id}> {item.name} </option> ) } </select></p>
                        </div>
                    </div>

                    <div className="week_filterBox">
                        <div class="weekLeft">
                            <p> <Link to="" onClick={handleWeekPreviousChange} style={{fontWeight: "700"}}> {"<< "} { t('garage.MyCalendar.previousWeek') } </Link> </p>
                        </div>
                        <div class="weekRight">
                            <p> <Link to="" onClick={handleWeekNextChange} style={{fontWeight: "700"}}> { t('garage.MyCalendar.nextWeek') } {" >>"} </Link> </p>
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
                                    events={events}
                                    height="600px"
                                />
                            </div>

                            <div className='NewScheduleHead'>
                                <div className='NewScheduleTime'>
                                    
                                </div>
                                <div className='NewScheduleDate'>
                                {
                                    schedulingListing.getDate && schedulingListing.getDate.length>0 && schedulingListing.getDate.map((itemDate, i) => 

                                        <aside>
                                            <h4> { moment(itemDate).format('MMMM Do YYYY') } </h4>
                                        </aside>
                                    )
                                }
                                </div>
                            </div>

                            <div className='NewScheduleBody'>
                            {
                                schedulingListing.getTime && schedulingListing.getTime.length>0 && schedulingListing.getTime.map((itemTime, i) => 
                                
                                    <ul>
                                        <li>
                                            <label> { itemTime._id } </label>
                                        </li>
                                        {
                                            schedulingListing.getProviders && schedulingListing.getProviders.length>0 && schedulingListing.getProviders.map((itemData, j) => 

                                                itemData.length>0?itemData.map((moreItem, k) =>

                                                        moreItem._id.repairTime == itemTime._id && moreItem._id.repairDate == schedulingListing.getDate[j] ?
                                                            <li>
                                                                <aside>
                                                                    <Link className="Blue" to="/garage/mycalendar/detail" onClick={()=>handleDetail(moreItem.data[0]._id)}>
                                                                        <i className="fa fa-eye"></i>
                                                                    </Link>
                                                                    <span> { moreItem.data[0].vehicleData[0]?.vehicleNumber }</span>
                                                                    <span> Assign To: { moreItem.data[0].assignTo }</span>

                                                                    
                                                                </aside>
                                                                
                                                            </li>
                                                        :
                                                            moreItem._id.repairTime != itemTime._id && moreItem._id.repairDate == schedulingListing.getDate[j] ?
                                                                ""
                                                            : 
                                                                ""
                                                    )
                                                :
                                                    <li>
                                                        <span></span>
                                                    </li>
                                            )
                                        }
                                        
                                        
                                    </ul>

                                )
                            }
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
                        <h3>Add Services</h3>
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

            <Footer />
        </>
    );
}

export default MyCalendar