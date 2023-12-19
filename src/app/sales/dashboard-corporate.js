import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import 'rc-time-picker/assets/index.css';

import moment from 'moment';
import Modal from 'react-bootstrap/Modal';
import TimePicker from 'rc-time-picker';
import Header from "./header";
import Footer from "./footer";

import { requestCorporatePending, requestCorporateAvailable, requestCorporateRejected, requestCorporateAvailableStatus, requestCorporateAccepted, requestCorporateRejectedSataus } from "../../redux/actions/provider/salesAction";

const format = 'h:mm a';
const now = moment().hour(0).minute(0);

const initialAvailableState = {
    id:'',
    cost:'',
    date1:'',
    date2:'',
    costEmpty:'',
    date1Empty:'',
    date2Empty:'',
}

const initialTimeState = {
    slotOneHH:'01',
    slotOneMM:'00',
    slotOneAA:'am',

    slotTwoHH:'01',
    slotTwoMM:'00',
    slotTwoAA:'am',
}

const SalesDashboardCorporate = () => {
    const dispatch = useDispatch();
    const { i18n, t } = useTranslation();

    const getListData = useSelector(state => state.garageRequestData)
    const { requestDataPending, requestDataAvailable, requestDataReject } = getListData
    useEffect(() => {
        const data = { status:["Pending"] }
        dispatch(requestCorporatePending(data))
    },[])

    const handleQuotes = () => {
        const data = { status:["Pending"] }
        dispatch(requestCorporatePending(data))
    }
    const handleSubmitted = () => {
        const data = { status:["Available", "Submitted"] }
        dispatch(requestCorporateAvailable(data))
    }
    const handleReject = () => {
        const data = { status:["Rejected"] }
        dispatch(requestCorporateRejected(data))
    }

    // const [welcomeModalShow, setWelcomeModalShow] = useState(true);
    // const handleWelcomeModalClose = () => {
    //     setWelcomeModalShow(false)
    // }

    const time_ago = (time) => {

        switch (typeof time) {
          case 'number':
            break;
          case 'string':
            time = +new Date(time);
            break;
          case 'object':
            if (time.constructor === Date) time = time.getTime();
            break;
          default:
            time = +new Date();
        }
        var time_formats = [
          [60, 'seconds', 1], // 60
          [120, '1 minute ago', '1 minute from now'], // 60*2
          [3600, 'minutes', 60], // 60*60, 60
          [7200, '1 hour ago', '1 hour from now'], // 60*60*2
          [86400, 'hours', 3600], // 60*60*24, 60*60
          [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
          [604800, 'days', 86400], // 60*60*24*7, 60*60*24
          [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
          [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
          [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
          [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
          [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
          [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
          [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
          [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
        ];
        var seconds = (+new Date() - time) / 1000,
          token = 'ago',
          list_choice = 1;
      
        if (seconds == 0) {
          return 'Just now'
        }
        if (seconds < 0) {
          seconds = Math.abs(seconds);
          token = 'from now';
          list_choice = 2;
        }
        var i = 0,
          format;
        while (format = time_formats[i++])
          if (seconds < format[0]) {
            if (typeof format[2] == 'string')
              return format[list_choice];
            else
              return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
          }
        return time;
    }

    const [viewServiceDetailShow, setViewServiceDetailShow] = useState(false);
    const [serviceDetailState, setServiceDetail] = useState({});
    const handleViewServiceDetailClose = () => {
        setViewServiceDetailShow(false)
        setServiceDetail({})
    }
    const handleViewServiceDetailShow = (item) => { 
        setServiceDetail(item);
        setViewServiceDetailShow(true)
    };

    const [viewVehicleDetailShow, setViewVehicleDetailShow] = useState(false);
    const [vehicleDetailState, setVehicleDetail] = useState({});
    const handleViewVehicleDetailClose = () => {
        setViewVehicleDetailShow(false)
        setVehicleDetail({})
    }
    const handleViewVehicleDetailShow = (item) => { 
        setVehicleDetail(item);
        setViewVehicleDetailShow(true)
    };

    const [buttonDisable,  setSubmitDisable] = useState(false)

    const [quotesModalShow, setQuotesModalShow] = useState(false);
    const handleQuotesModalClose = () => {
        setQuotesModalShow(false)
        setServiceDetail({})
        setSubmitDisable(false);
    }
    const handleQuotesModalShow = (item) => { 
        setServiceDetail(item);
        setQuotesModalShow(true)
    };

    const [aState, updateAState] = useState(initialAvailableState);
    const {
        id,
        cost,
        date1,
        date2,
        costEmpty,
        date1Empty,
        date2Empty,
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
        slotOneAA,

        slotTwoHH,
        slotTwoMM,
        slotTwoAA,
    } = timeState
    const handleTimeInputChange = (e) => {
        const { name, value } = e.target
        updateTimeState({
            ...timeState, [name]: value
        })
    }

    const handleAvailableValidation = () => {

        let date1Empty = ''
        let date2Empty = ''

        let formIsValid = true;
        if (!date1.trim()) {
            date1Empty = "Please enter model";
            formIsValid = false;
        }
        if (!date2.trim()) {
            date2Empty = "Please enter year";
            formIsValid = false;
        }
        updateAState({
            ...aState,
            date1Empty,
            date2Empty
        })
        return formIsValid;
    }

    const handleAvailableSubmit = (event) => {
        event.preventDefault()
        const formIsValid = handleAvailableValidation()
        if(formIsValid) {
            setSubmitDisable(true);

            var time1 = slotOneHH+':'+slotOneMM+' '+slotOneAA
            var time2 = slotTwoHH+':'+slotTwoMM+' '+slotTwoAA

            const data = { id:serviceDetailState._id, date1, time1, date2, time2 };
            dispatch(requestCorporateAvailableStatus(data)).then(res => {
                if (res.code == 200) {
                    setServiceDetail({})
                    handleQuotesModalClose();
                    toast.success(res.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    setSubmitDisable(false);
                    setTimeout(
                        function() {
                            window.location.reload()
                        }
                        .bind(this),
                        2000
                    );
                } else {
                    setSubmitDisable(false);
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
                        costEmpty: '',
                        date1Empty: '',
                        date2Empty: '',
                    })
                }
            }).catch(err => {
                setSubmitDisable(false);
                console.log(err, 'err')
                const message = err && err.response && err.response.data ? err.response.data.message : "Something went wrong."
                toast.error(message, {
                    position: toast.POSITION.TOP_RIGHT
                });
            })
        }
    }

    const [rejectModalShow, setRejectModalShow] = useState(false);
    const handleRejectModalClose = () => {
        setRejectModalShow(false)
        setServiceDetail({})
    }
    const handleRejectModalShow = (item) => { 
        setServiceDetail(item);
        setRejectModalShow(true)
    };

    const handleRejectRequest = () => {
        const data = {id:serviceDetailState._id}
        dispatch(requestCorporateRejectedSataus(data)).then(res => {
            if (res.code == 200) {
                handleRejectModalClose()
                setServiceDetail({})
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
            }
        }).catch(err => {
            console.log(err, 'err')
            const message = err && err.response && err.response.data ? err.response.data.message : "Something went wrong."
            toast.error(message, {
                position: toast.POSITION.TOP_RIGHT
            });
        })
    }

    const [confirmationSubmittedShow, setConfirmationSubmittedShow] = useState(false);
    const handleConfirmationSubmittedClose = () => {
        setConfirmationSubmittedShow(false)
        setServiceDetail({});
    }
    const handleConfirmationSubmittedShow = (item) => {
        setServiceDetail(item);
        setConfirmationSubmittedShow(true)
    };

    const handleAcceptedRequest = () => {
        
        const data = { id:serviceDetailState._id }
        dispatch(requestCorporateAccepted(data)).then(res => {
            if (res.code == 200) {
                setTimeout(
                    function() {
                        window.location.reload()
                    }
                    .bind(this),
                    1000
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
            }
        }).catch(err => {
            console.log(err, 'err')
            const message = err && err.response && err.response.data ? err.response.data.message : "Something went wrong."
            toast.error(message, {
                position: toast.POSITION.TOP_RIGHT
            });
        })
    }

    const [requestViewShow, setRequestViewShow] = useState(false);
    const handleRequestViewClose = () => {
        setRequestViewShow(false)
        setServiceDetail({})
    }
    const handleRequestViewShow = (item) => {
        setServiceDetail(item)
        setRequestViewShow(true)
    };

    return (
        <>
            <Header />
            <ToastContainer/>

            <div className="WrapperArea">
                <div className="WrapperBox">

                    <div className="TitleBox">
                        <h4>{ t('sales.sidemenu.Dashboard') }</h4>
                    </div>

                    <div className="CommonTabs">
                        <ul className="nav nav-tabs">
                            <li className="nav-item" onClick={handleQuotes}>
                                <a className="nav-link active" data-toggle="tab" href="#Quotes"> { t('sales.dashboard.NewQuote') } </a>
                            </li>
                            <li className="nav-item" onClick={handleSubmitted}>
                                <a className="nav-link" data-toggle="tab" href="#Submitted"> { t('sales.dashboard.SubmittedQuote') } </a>
                            </li>
                            <li className="nav-item" onClick={handleReject}>
                                <a className="nav-link" data-toggle="tab" href="#Rejected"> { t('sales.dashboard.RejectedQuote') } </a>
                            </li>
                        </ul>

                        <div className="tab-content">
                            <div className="tab-pane active" id="Quotes"> 
                                
                                <div className="TitleBox">
                                    <h5> { t('sales.dashboard.RequestQuoteAvailable') } :</h5>
                                </div>
                                <div className="TableList">
                                    <table>
                                        <tr>
                                            <th>S.No</th>
                                            <th> { t('sales.dashboard.CarDetails') } </th>
                                            <th> { t('garage.dashboard.ServiceDetails') } </th>
                                            <th> { t('sales.dashboard.ClientDetails') } </th>
                                            <th> { t('sales.dashboard.Requestedon') } </th>
                                            <th> { t('sales.dashboard.Action') } </th>
                                        </tr>
                                        {
                                            requestDataPending && requestDataPending.length>0 ? requestDataPending.map((item , i) =>
                                        
                                                    <tr key={i}>
                                                        <td> {i+1} </td>
                                                        <td>
                                                            <strong>Make : </strong>{item.make}
                                                        </td>
                                                        <td>
                                                            <smap><a href="javascript:void(0)" onClick={() => handleViewServiceDetailShow(item)}>View Details</a></smap>
                                                        </td>
                                                        <td>
                                                            <strong>Name : </strong> {item.clientData.firstName } {item.clientData.lastName }, <br /> 
                                                            <strong>Mobile : </strong> {item.clientData.mobile }, <br /> 
                                                            <strong>Email : </strong> {item.clientData.email }
                                                        </td>
                                                        <td> { time_ago(item.createdAt) } </td>
                                                        <td>
                                                            <div className="Actions">
                                                                <a href="javascript:void(0)" className="Decline" onClick={()=>handleRejectModalShow(item)}>Unavailable</a>
                                                                <a href="javascript:void(0)" className="Accept" onClick={()=>handleQuotesModalShow(item)}>Available</a>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            :
                                                <tr> <td colspan="6"> No result found </td> </tr>
                                        }
                                        
                                    </table>
                                </div> 
                            </div>

                            <div className="tab-pane fade" id="Submitted"> 
                                <div className="TitleBox">
                                    <h5>{ t('sales.dashboard.RequestQuoteAvailable') } :</h5>
                                </div>
                                <div className="TableList">
                                    <table style={{ width: "115%" }}>
                                        <tr>
                                            <th>S.No</th>
                                            <th> { t('sales.dashboard.CarDetails') } </th>
                                            <th> { t('garage.dashboard.ServiceDetails') } </th>
                                            <th> { t('sales.dashboard.ClientDetails') } </th>
                                            <th> { t('sales.dashboard.Requestedon') } </th>
                                            <th>Submitted On</th>
                                            <th>Status</th>
                                            
                                        </tr>
                                        {
                                            requestDataAvailable && requestDataAvailable.length>0 ? requestDataAvailable.map((item , i) =>
                                        
                                                <tr key={i}>
                                                    <td> {i} </td>
                                                    <td>
                                                        <strong>Make : </strong>{item.make}
                                                    </td>
                                                    <td>
                                                        <smap><a href="javascript:void(0)" onClick={() => handleViewServiceDetailShow(item)}>View Details</a></smap>
                                                    </td>
                                                    <td>
                                                        <strong>Name : </strong> {item.clientData.firstName } {item.clientData.lastName }, <br /> 
                                                        <strong>Mobile : </strong> {item.clientData.mobile }, <br /> 
                                                        <strong>Email : </strong> {item.clientData.email }
                                                    </td>
                                                    <td> { time_ago(item.createdAt) } </td>
                                                    <td> { time_ago(item.quoteDate) } </td>
                                                    <td> 
                                                        { item.status == "Available"?"Pending": item.status == "Submitted"?item.status:"New Slot Requested" } 

                                                        { item.status == "Available"?
                                                            ""
                                                          : item.status == "Submitted"?
                                                                <smap><a data-toggle="modal" onClick={()=>handleConfirmationSubmittedShow(item)}>View Details</a></smap>
                                                            : "" 
                                                        }
                                                    </td>
                                                    
                                                </tr>
                                            )
                                            :
                                                <tr> <td colspan="8"> No result found</td></tr>
                                        }
                                    </table>
                                </div>
                            </div>

                            <div className="tab-pane fade" id="Rejected"> 
                                <div className="TitleBox">
                                    <h5> Rejected Quotes by Client:</h5>
                                </div>
                                <div className="TableList">
                                    <table>
                                        <tr>
                                            <th>S.No</th>
                                            <th> { t('sales.dashboard.CarDetails') } </th>
                                            <th> { t('garage.dashboard.ServiceDetails') } </th>
                                            <th> { t('sales.dashboard.ClientDetails') } </th>
                                            <th> { t('sales.dashboard.Requestedon') } </th>
                                            <th>Submitted On</th>
                                            <th>Status</th>
                                        </tr>
                                        {
                                            requestDataReject && requestDataReject.length>0 ? requestDataReject.map((item , i) =>
                                        
                                                <tr key={i}>
                                                    <td> {i} </td>
                                                    <td>
                                                    <strong>Make : </strong>{item.make}
                                                    </td>
                                                    
                                                    <td>
                                                        <smap><a href="javascript:void(0)" onClick={() => handleViewServiceDetailShow(item)}>View Details</a></smap>
                                                    </td>
                                                    <td>
                                                        <strong>Name : </strong> {item.clientData.firstName } {item.clientData.lastName }, <br /> 
                                                        <strong>Mobile : </strong> {item.clientData.mobile }, <br /> 
                                                        <strong>Email : </strong> {item.clientData.email }
                                                    </td>
                                                    <td> { time_ago(item.createdAt) } </td>
                                                    <td> { time_ago(item.updatedAt) } </td>
                                                    <td> { item.status }  </td>
                                                    
                                                </tr>
                                            ) : 
                                                <tr><td colSpan="8">No result found</td></tr>
                                        }
                                    </table>
                                </div>
                            </div>

                        </div>
                    </div>  
                </div>
            </div>

            {/* <Modal show={welcomeModalShow} className="PanelModal">
                <div className="modal-body">
                    <div className="CongratulationsBox Welcome">
                        <a href="javascript:void(0);" type="button" className="Close" onClick={handleWelcomeModalClose}>&times;</a>
                    
                        <h4>{ t('client.dashboard.WelcometoAutowiz') }</h4>
                        <p> Please add vehicles to listed down in Autowiz Auto Sales</p>
                        <ul>
                            <li><Link to="/sales/my-vehicles"> { t('sales.sidemenu.MyVehicles') }</Link></li>
                        </ul>
                    </div>
                </div>
            </Modal> */}
            
            <Modal show={viewVehicleDetailShow} className="PanelModal">
                <div className="ModalBox">
                    <div className="modal-body">
                        <div className="ServiceBox">
                            <a href="javascript:void(0);" type="button" className="Close" onClick={handleViewVehicleDetailClose}>&times;</a> 
                            <h4>Vehicle Details:</h4>
                            <p><span>Modal :</span> { vehicleDetailState && vehicleDetailState.model? vehicleDetailState.model:'' } </p>
                            <p><span>Make :</span> { vehicleDetailState && vehicleDetailState.make?vehicleDetailState.make:'' } </p>
                            <p><span>Mileage :</span> { vehicleDetailState && vehicleDetailState.mileage?vehicleDetailState.mileage:'' }</p> 
                            <p><span>Type :</span> { vehicleDetailState && vehicleDetailState.type?vehicleDetailState.type:'' }</p> 
                        </div>
                    </div> 
                </div>
            </Modal>

            <Modal show={viewServiceDetailShow} className="PanelModal">
                <div className="ModalBox">
                    <div className="modal-body">
                        <div className="ServiceBox">
                            <a href="javascript:void(0);" type="button" className="Close" onClick={handleViewServiceDetailClose}>&times;</a> 
                            <h4>Service Details:</h4>
                            <p><span>Vehicle Type </span> { serviceDetailState && serviceDetailState.vehicleType? serviceDetailState.vehicleType.join(", "):'' } </p>
                            { serviceDetailState && serviceDetailState.notes?
                                <p><span>Description</span> { serviceDetailState.notes?serviceDetailState.notes:'' }</p> 
                                :""
                            }
                        </div>
                    </div> 
                </div>
            </Modal>

            <Modal show={quotesModalShow} className="PanelModal">
                <div className="ModalBox">
                    <div className="modal-body">
                        <div className="Category">
                            <a href="javascript:void(0);" type="button" className="Close" onClick={handleQuotesModalClose}>&times;</a>
                                
                            <h3>Submit Your Quote:</h3>

                            <form onSubmit={handleAvailableSubmit}>

                                <div className="form-group">
                                    <h4>Select your Availability:</h4>

                                    <div className='AvailabilitySlot'>
                                        <h5>Slot 1</h5>
                                        <article>
                                            <aside>
                                                <label>Date</label>
                                                <input type="date" className="form-control" name="date1" value={date1} onChange={handleInputChange}/>
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

                                    <div className='AvailabilitySlot'>
                                        <h5>Slot 2</h5>
                                        <article>
                                            <aside>
                                                <label>Date</label>
                                                <input type="date" className="form-control" name="date2" value={date2} onChange={handleInputChange}/>
                                            </aside>
                                            <aside>
                                                <label>HH</label>
                                                <select className="form-control" name="slotTwoHH" value={slotTwoHH} onChange={handleTimeInputChange}>
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
                                                <select className="form-control" name="slotTwoMM" value={slotTwoMM} onChange={handleTimeInputChange}>
                                                    <option>00</option>
                                                    <option>30</option>
                                                </select>
                                            </aside>
                                            <aside>
                                                <label>&nbsp;</label>
                                                <select className="form-control" name="slotTwoAA" value={slotTwoAA} onChange={handleTimeInputChange}>
                                                    <option>am</option>
                                                    <option>pm</option>
                                                </select>
                                            </aside>
                                        </article>
                                    </div>
                                </div>
                                <button className="Accept" type="submit" disabled={buttonDisable}>Submit Quote</button>
                            </form>
                        </div>
                    </div>
                </div> 
            </Modal>

            <Modal show={rejectModalShow} className="PanelModal">
                <div className="ModalBox">
                    <div className="modal-body">
                        <div className="ServiceBox">
                            <a href="javascript:void(0);" type="button" className="Close" onClick={handleRejectModalClose}>&times;</a> 
                            <h4>Service Unavailable:</h4>
                            <p><span>Vehicle Type </span> { serviceDetailState && serviceDetailState.vehicleType? serviceDetailState.vehicleType.join(", "):'' } </p>
                            { 
                                serviceDetailState && serviceDetailState.notes?
                                    <p><span>Description</span> { serviceDetailState.notes?serviceDetailState.notes:'' }</p> 
                                :""
                            }
                            <div className="text-center">
                                <a className="Accept" href="javascript:void(0)" onClick={handleRejectRequest}>Confirm</a>
                                <a className="Decline" onClick={handleRejectModalClose}>Decline</a>
                            </div>
                        </div>
                    </div> 
                </div>
            </Modal>

            <Modal show={confirmationSubmittedShow} className="PanelModal">
                <div className="modal-body">
                    <div className="ServiceBox">
                        <a href="javascript:void(0);" type="button" className="Close" onClick={handleConfirmationSubmittedClose}>&times;</a> 
                        <h4>Client Requested Slot :</h4>
                        <p><span>Requested Date</span> { moment(serviceDetailState.serviceDate).format("DD-MM-YYYY") } </p>
                        <p><span>Requested Time</span> { serviceDetailState.serviceTime } </p>
                    </div>
                </div>
            </Modal>

            <Modal show={requestViewShow} className="PanelModal viewRequest">
                <div className="modal-body">                
                    <a href="javascript:void(0);" type="button" className="Close" onClick={handleRequestViewClose}>×</a> 
                    { (Object.keys(serviceDetailState).length > 0) ?
                        <>
                            <div className="QuoteDetailsBox">
                                <h4>Service Details <span>Requested on { moment(serviceDetailState.createdAt).format("MMMM Do YYYY, h:mm:ss a") } </span></h4>
                                <p><span>Vehicle Type </span> { serviceDetailState && serviceDetailState.vehicleType? serviceDetailState.vehicleType.join(", "):'' } </p>
                                {
                                    serviceDetailState && serviceDetailState.notes?
                                        <p><span>Description</span> { serviceDetailState.notes?serviceDetailState.notes:'' }</p>
                                    :""
                                }
                            </div>

                            <div className="QuoteDetailsBox">  
                                <h4>Quote Details <span>Quote Submitted On { moment(serviceDetailState.quoteDate).format("MMMM Do YYYY, h:mm:ss a") } </span></h4>
                                <p><span>Cost of Estimate</span> $ { serviceDetailState.cost }</p> 
                                {   serviceDetailState.availableSlots && serviceDetailState.availableSlots.map((schedule, i) =>
                                        <p><span>Slot {i+1} </span> { schedule.date } { schedule.time } </p>
                                    )
                                }
                            </div>

                            <div className="QuoteDetailsBox"> 
                                <h4>Client Details</h4>
                                <p><span>Name</span> { serviceDetailState.clientData.firstName } { serviceDetailState.clientData.lastName } </p>
                                <p><span>Contact Number</span> { serviceDetailState.clientData.mobile } </p>  
                                <p><span>Email</span> { serviceDetailState.clientData.email } </p>  
                            </div>
                            { 
                                serviceDetailState.status == "Submitted" ?

                                    serviceDetailState.clientRequestedSlot ?
                                        <div className="QuoteDetailsBox"> 
                                            <h4>Client Requested Slot </h4>
                                            <p><span>Requested Date</span> { serviceDetailState.clientRequestedSlot.length>0?serviceDetailState.clientRequestedSlot[0].date:serviceDetailState.serviceDate } </p>
                                            <p><span>Requested Time</span> { serviceDetailState.clientRequestedSlot.length>0?serviceDetailState.clientRequestedSlot[0].time:serviceDetailState.serviceTime } </p>
                                        </div>
                                    : ''
                                : 
                                ''
                            }
                            { 
                                serviceDetailState.status == "Submitted" ?

                                    <div className="text-center">
                                        {/* <a href="javascript:void(0)" className="Accept" onClick={handleAcceptedRequest}>Confirm Booking</a>
                                        <a href="javascript:void(0)" className="Decline" onClick={()=>handleRejectRequest(serviceDetailState)}>Decline</a> */}
                                    </div>
                                : 
                                ''
                            }
                        </>
                    : "" }
                </div>
            </Modal>

            <Footer />
        
        </>
    );
}

export default SalesDashboardCorporate