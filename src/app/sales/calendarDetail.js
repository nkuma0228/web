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

import { requestCalendarDetail, diagnosticQuote } from "../../redux/actions/provider/salesAction";

const initialState = {
    repairCost:'',
    repairDate:'',
    repairTime:'',
    problemDetail:'',
    partsReplaced:'',
    repairCostEmpty:'',
    repairDateEmpty:'',
    repairTimeEmpty:'',
    problemDetailEmpty:'',
    partsReplacedEmpty:'',
}

const format = 'h:mm a';
const now = moment().hour(0).minute(0);

const SalesCalendarDetail = () => {
    const dispatch = useDispatch();

    const getListData = useSelector(state => state.garageRequestData)
    const { requestDataCalendarDetail } = getListData
    useEffect(() => {
        let detailId = window.localStorage.getItem('calendarDetailId');
        let data = {id:detailId};
        dispatch(requestCalendarDetail(data))
    },[])

    const [viewModalShow, setViewModalShow] = useState(false);
    const [serviceDetailState, setServiceDetail] = useState({});
    const handleViewServiceDetailClose = () => {
        setViewModalShow(false)
    }
    const handleViewServiceDetailShow = (item) => {
        setViewModalShow(true)
        setServiceDetail(item)
    };

    const [formValues, setFormValues] = useState([{ parts: ""}])
    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
     }
        
    let addFormFields = () => {
        setFormValues([...formValues, { parts: "" }])
     }
    
    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }

    const [aState, updateAState] = useState(initialState);
    const {
        repairCost,
        repairDate,
        repairTime,
        problemDetail,
        partsReplaced,
        repairCostEmpty,
        repairDateEmpty,
        repairTimeEmpty,
        problemDetailEmpty,
        partsReplacedEmpty,
    } = aState
    const handleInputChange = (e) => {
        const { name, value } = e.target
        updateAState({
            ...aState, [name]: value
        })
    }
    const handleTimeChange = (value) => {
        let time = value.format(format);
        updateAState({
            ...aState, ['repairTime']: time
        })
    }

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
                                    <p><strong> Model: </strong> {requestDataCalendarDetail.vehicleData.model }</p> 
                                    <p><strong> Make: </strong> {requestDataCalendarDetail.vehicleData.make }</p> 
                                    <p><strong> Mileage: </strong> {requestDataCalendarDetail.vehicleData.mileage }</p> 
                                    <p><strong> Type: </strong> {requestDataCalendarDetail.vehicleData.type }</p> 
                                </aside> 
                            </article>


                            <article>
                                <aside>
                                    <h4>Service Details</h4>
                                    <p><span>Requested vehicle Type</span> { requestDataCalendarDetail.vehicleType &&  requestDataCalendarDetail.vehicleType } </p>
                                </aside> 
                                <aside>
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

export default SalesCalendarDetail