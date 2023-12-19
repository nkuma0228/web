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

import { requestCalendarDetail, diagnosticQuote } from "../../redux/actions/provider/garageAction";

const initialState = {
    repairCost:'',
    repairDate:'',
    problemDetail:'',
    partsReplaced:'',
    repairCostEmpty:'',
    repairDateEmpty:'',
    problemDetailEmpty:'',
    partsReplacedEmpty:'',
}
const initialTimeState = {
    slotOneHH:'01',
    slotOneMM:'00',
    slotOneAA:'am',
}

const format = 'h:mm a';
const now = moment().hour(0).minute(0);

const GarageHistoryDetail = () => {
    const dispatch = useDispatch();

    const getListData = useSelector(state => state.garageRequestData)
    const { requestDataCalendarDetail } = getListData

    useEffect(() => {
        let detailId = window.localStorage.getItem('historyDetailId');
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
        problemDetail,
        partsReplaced,
        repairCostEmpty,
        repairDateEmpty,
        problemDetailEmpty,
        partsReplacedEmpty,
    } = aState
    const handleInputChange = (e) => {
        const { name, value } = e.target
        updateAState({
            ...aState, [name]: value
        })
    }
    const [timeState, updateTimeState] = useState(initialTimeState);
    const {
        slotOneHH,
        slotOneMM,
        slotOneAA
    } = timeState
    const handleTimeInputChange = (e) => {
        const { name, value } = e.target
        updateTimeState({
            ...timeState, [name]: value
        })
    }

    const handleDetailsValidation = () => {
        let repairCostEmpty = ''
        let repairDateEmpty = ''
        let problemDetailEmpty = ''
        let partsReplacedEmpty = ''
        
        let formIsValid = true;
        if (!repairCost.trim()) {
            repairCostEmpty = "Please enter repair cost";
            formIsValid = false;
        }
        if (!repairDate.trim()) {
            repairDateEmpty = "Please enter repair date";
            formIsValid = false;
        }
        if (!problemDetail.trim()) {
            problemDetailEmpty = "Please enter problem detail";
            formIsValid = false;
        }
        updateAState({
            ...aState, 
            repairCostEmpty,
            repairDateEmpty,
            problemDetailEmpty,
            partsReplacedEmpty
        })
        return formIsValid;
    }

    const handleDetailSubmit = (event) => {
        event.preventDefault()
        const formIsValid = handleDetailsValidation()
        if(formIsValid) {
            var repairTime = slotOneHH+':'+slotOneMM+' '+slotOneAA
            const data = { id:requestDataCalendarDetail._id, repairCost, repairDate, repairTime, problemDetail, partsReplaced:formValues };
            dispatch(diagnosticQuote(data)).then(res => {
                if (res.code == 200) {
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
                    updateAState({
                        ...aState, 
                        errorMsg: res.message,
                        repairCostEmpty:'',
                        repairDateEmpty:'',
                        problemDetailEmpty:'',
                        partsReplacedEmpty:''
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

export default GarageHistoryDetail