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

import { requestCalendarCorporateDetail, diagnosticCorporateQuote } from "../../redux/actions/provider/garageAction";

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

const CalendarCorporateDetail = () => {
    const dispatch = useDispatch();

    const getListData = useSelector(state => state.garageRequestData)
    const { requestDataCalendarDetail } = getListData
    useEffect(() => {
        let detailId = window.localStorage.getItem('calendarDetailId');
        let data = {id:detailId};
        dispatch(requestCalendarCorporateDetail(data))
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
            dispatch(diagnosticCorporateQuote(data)).then(res => {
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
                                    <p><strong> {requestDataCalendarDetail.corporateVehicleData.vehicleNumber } , {requestDataCalendarDetail.corporateVehicleData.model } ,  {requestDataCalendarDetail.corporateVehicleData.make } , {requestDataCalendarDetail.corporateVehicleData.type } , {requestDataCalendarDetail.corporateVehicleData.year } </strong></p> 
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
                                    <p><span>Name</span> { requestDataCalendarDetail.corporateData.firstName } </p>
                                    <p><span>Contact</span> { requestDataCalendarDetail.corporateData.mobile } </p>
                                    <p><span>Email</span> { requestDataCalendarDetail.corporateData.email } </p>
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
                            { requestDataCalendarDetail.status == "Diagnostic Completed" ?

                                requestDataCalendarDetail.repairQuoteDate ? '' :
                                    <a href="javascript:void(0)" className="Accept" onClick={()=>handleViewServiceDetailShow(requestDataCalendarDetail) }>Submit Repair Quote</a>
                                :""
                            }
                        </div>
                        :
                        ''
                    }
                    </div>

                </div>
            </div>
            
            <Modal show={viewModalShow} className="PanelModal">
                <div className="ModalBox">
                    <div className="modal-body">
                        <div className="Category">
                            <a href="javascript:void(0);" type="button" className="Close" onClick={handleViewServiceDetailClose}>×</a>
                            <h3>Submit Your Quote:</h3>
                            <FORM onSubmit={handleDetailSubmit}>
                                <div className="form-group">
                                    <label>Please enter Cost of repair</label>
                                    <input type="text" className="form-control" name="repairCost" value={repairCost} onChange={handleInputChange}/>
                                    <p className="text-danger"> { repairCostEmpty? repairCostEmpty : '' } </p>
                                </div>

                                <div className="form-group">
                                    
                                    <div className="SlotBoxx">
                                        <div className='AvailabilitySlot'>
                                            <h4> Select Time for Repair </h4>
                                            <article>
                                                <aside>
                                                    <label>Date</label>
                                                    <input type="date" className="form-control" name="repairDate" value={repairDate} onChange={handleInputChange}/>
                                                    <p className="text-danger"> { repairDateEmpty? repairDateEmpty : '' } </p>
                                                </aside>
                                                <aside>
                                                    <label>HH</label>
                                                    <select className="form-control" name="slotOneHH" value={slotOneHH} onChange={handleTimeInputChange}>
                                                        <option value="01">1</option>
                                                        <option value="02">2</option>
                                                        <option value="03">3</option>
                                                        <option value="04">4</option>
                                                        <option value="05">5</option>
                                                        <option value="06">6</option>
                                                        <option value="07">7</option>
                                                        <option value="08">8</option>
                                                        <option value="09">9</option>
                                                        <option value="10">10</option>
                                                        <option value="11">11</option>
                                                        <option value="12">12</option>
                                                    </select>
                                                </aside>
                                                <aside>
                                                    <label>MM</label>
                                                    <select className="form-control" name="slotOneMM" value={slotOneMM} onChange={handleTimeInputChange}>
                                                        <option>00</option>
                                                        <option>30</option>
                                                    </select>
                                                </aside>
                                                <aside>
                                                    <label>&nbsp;</label>
                                                    <select className="form-control" name="slotOneAA" value={slotOneAA} onChange={handleTimeInputChange}>
                                                        <option>am</option>
                                                        <option>pm</option>
                                                    </select>
                                                </aside>
                                            </article>
                                        </div>
                                        
                                    </div> 
                                </div>
                                <div className="form-group">
                                    <label>Diagnostic Problem Details</label>
                                    <textarea rows="3" className="form-control" name="problemDetail" value={problemDetail} onChange={handleInputChange}></textarea>
                                    <p className="text-danger"> { problemDetailEmpty? problemDetailEmpty : '' } </p>
                                </div>
                                <div className="form-group">
                                    <label>Parts to be Replaced</label>
                                    <ul className="Parts">
                                        {formValues.map((element, index) => (
                                            <li key={index}> <input type="text" className="form-control" value={element.parts || ""} name="parts" onChange={e => handleChange(index, e)} />  <a href="javascript:void(0);" className='Delete' onClick={() => removeFormFields(index)}><i className="fa fa-trash"></i></a> </li>
                                        ))}
                                        <li><a href="javascript:void(0);" onClick={() => addFormFields()}><i className="fa fa-plus-circle"></i> Add More</a></li>
                                    </ul>
                                </div>
                                <button type="submit" className="Accept">Submit Quote</button>
                            </FORM>
                        </div>
                    </div> 
                </div>
            </Modal>

            <Footer />
        
        </>
    );
}

export default CalendarCorporateDetail