import React, {useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import Modal from 'react-bootstrap/Modal';
import TimePicker from 'rc-time-picker';

import Header from "./header";
import Footer from "./footer";
import Sucessfull from "../../assets/client/images/sucessfull.png"
import Car from "../../assets/client/images/Car.png";

import { 
    requestGarages, 
    submitSchedule, 
    submitReject, 
    submitReSchedule, 
    requestPartsQuotes, 
    submitPartsReject, 
    partsQuoteAccept, 
    requestSalesQuotes, 
    submitSalesReject, 
    salesQuoteAccept,
    requestCorporateQuotes,
    corporateQuoteAccept,
    submitCorporateReject } from "../../redux/actions/client/providerAction";
import { template } from 'lodash';

const initialAvailableState = {
    date:'',
    time:'',
    dateEmpty:'',
    timeEmpty:'',
}
const format = 'h:mm a';

const ClientDashboard = () => {
    const dispatch = useDispatch();
    const { i18n, t } = useTranslation();
    let lang  = i18n.language

    const getListData = useSelector(state => state.clientProviderData)
    const { requestGarageListingData, requestPartListingData, requestSalesListingData, requestCorporateListingData } = getListData

    useEffect(() => {
        const data = { status:["Available"] }
        dispatch(requestGarages(data))
    },[])

    const handleGarageQuotes = () => {
        const data = { status:["Available"] }
        dispatch(requestGarages(data))
    }
    const handlePartsQuotes = () => {
        const data = { status:["Available"] }
        dispatch(requestPartsQuotes(data))
    }
    const handleSalesQuotes = () => {
        const data = { status:["Available"] }
        dispatch(requestSalesQuotes(data))
    }
    const handleCorporateQuotes = () => {
        const data = { status:["Available"] }
        dispatch(requestCorporateQuotes(data))
    }

    const [welcomeModalShow, setWelcomeModalShow] = useState(true);
    const handleWelcomeModalClose = () => {
        setWelcomeModalShow(false)
    }

    const [scheduleState, setScheduleState] = useState({});
    const [scheduleIDState, setScheduleIDState] = useState('');
    const handleSchedule = (item, id) => {
        handleReScheduleClose()
        setScheduleState(item)
        setScheduleIDState(id)
    }

    const [confirmationAcceptShow, setConfirmationAcceptShow] = useState(false);
    const handleConfirmationAcceptClose = () => {
        setConfirmationAcceptShow(false);
    }
    const handleConfirmationAcceptShow = () => {
        setConfirmationAcceptShow(true);
    }

    const handleAcceptRequest = () => {
        let scheduleStateDate = scheduleState.date;
        let scheduleStateTime = scheduleState.time;

        if(typeof scheduleStateDate !== "undefined" && typeof scheduleStateTime !== "undefined") {
            const data = { id:scheduleIDState, serviceDate:scheduleStateDate, serviceTime:scheduleStateTime }
            dispatch(submitSchedule(data)).then(res => {
                if (res.code == 200) {
                    
                    setScheduleState({})
                    setScheduleIDState('')
                    handleConfirmationAcceptShow();
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
        } else {
            toast.error("Please select schedule!", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }

    const [aState, updateAState] = useState(initialAvailableState);
    const {
        date,
        time,
        dateEmpty,
        timeEmpty,
    } = aState
    const handleInputChange = (e) => {
        const { name, value } = e.target
        updateAState({
            ...aState, [name]: value
        })
    }

    const handleTime1Change = (value) => {
        let time1 = value.format(format);
        updateAState({
            ...aState, ['time']: time1
        })
    }

    const [reScheduleShow, setReScheduleShow] = useState('none');
    const handleReScheduleClose = () => {
        setReScheduleShow('none')
    }
    const handleReScheduleShow = (item) => { 
        setReScheduleShow('block')
        setScheduleState({})
        setScheduleIDState('')
    };

    const [confirmationReScheduleShow, setConfirmationReScheduleShow] = useState(false);
    const handleConfirmationReScheduleClose = () => {
        setConfirmationReScheduleShow(false)
    }
    const handleConfirmationReScheduleShow = (item) => { 
        setConfirmationReScheduleShow(true)
    };

    const handleReSubmitQuote = (id) => {
        if(typeof date !== "undefined" && typeof time !== "undefined") {
            const data = {id:id, date:date, time:time }
            dispatch(submitReSchedule(data)).then(res => {
                if (res.code == 200) {
                    
                    handleConfirmationReScheduleShow();
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
        } else {
            toast.error("Please select schedule!", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }


    const [rejectShow, setRejectShow] = useState(false);
    const handleRejectClose = () => {
        setRejectShow(false);
        window.location.reload()
    }
    const handleRejectShow = () => {
        setRejectShow(true);
    }
    const handleRejectRequest = (id) => {
        const data = {id:id}
        dispatch(submitReject(data)).then(res => {
            if (res.code == 200) {
                handleRejectShow();
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

    const handlePartsRejectRequest = (id) => {
        const data = {id:id}
        dispatch(submitPartsReject(data)).then(res => {
            if (res.code == 200) {
                handleRejectShow();
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

    const [confirmationPartsAcceptShow, setConfirmationPartsAcceptShow] = useState(false);
    const handleConfirmationPartsAcceptClose = () => {
        setConfirmationPartsAcceptShow(false);
    }
    const handleConfirmationPartsAcceptShow = () => {
        setConfirmationPartsAcceptShow(true);
    }

    const handlePartsAcceptRequest = (id) => {

        const data = { id:id }
        dispatch(partsQuoteAccept(data)).then(res => {
            if (res.code == 200) {
                
                handleConfirmationPartsAcceptShow();
                setTimeout(
                    function() {
                        window.location.reload()
                    }
                    .bind(this),
                    2000
                );
            } else {
                toast.error(res.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        }).catch(err => {
            console.log(err, 'err')
            const message = err && err.response && err.response.data ? err.response.data.message : "Something went wrong."
            toast.error(message, {
                position: toast.POSITION.TOP_RIGHT
            });
        })
    }

    const handleSalesAcceptRequest = () => {
        let scheduleStateDate = scheduleState.date;
        let scheduleStateTime = scheduleState.time;

        if(typeof scheduleStateDate !== "undefined" && typeof scheduleStateTime !== "undefined") {
            const data = { id:scheduleIDState, serviceDate:scheduleStateDate, serviceTime:scheduleStateTime }
            dispatch(salesQuoteAccept(data)).then(res => {
                if (res.code == 200) {
                    
                    setScheduleState({})
                    setScheduleIDState('')
                    handleConfirmationAcceptShow();
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
        } else {
            toast.error("Please select schedule!", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }
    const handleSalesRejectRequest = (id) => {
        const data = {id:id}
        dispatch(submitSalesReject(data)).then(res => {
            if (res.code == 200) {
                handleRejectShow();
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

    const handleCorporateAcceptRequest = () => {
        let scheduleStateDate = scheduleState.date;
        let scheduleStateTime = scheduleState.time;

        if(typeof scheduleStateDate !== "undefined" && typeof scheduleStateTime !== "undefined") {
            const data = { id:scheduleIDState, serviceDate:scheduleStateDate, serviceTime:scheduleStateTime }
            dispatch(corporateQuoteAccept(data)).then(res => {
                if (res.code == 200) {
                    
                    setScheduleState({})
                    setScheduleIDState('')
                    handleConfirmationAcceptShow();
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
        } else {
            toast.error("Please select schedule!", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }
    const handleCorporateRejectRequest = (id) => {
        const data = {id:id}
        dispatch(submitCorporateReject(data)).then(res => {
            if (res.code == 200) {
                handleRejectShow();
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
    
    return (
        <>
            <Header />

            <div className="WrapperArea">
                <div className="WrapperBox"> 
                    <div className="TitleBox">
                        <h4>Dashboard</h4>
                    </div>
                    <div className="CommonTabs">
                        <ul className="nav nav-tabs">
                            <li className="nav-item" onClick={handleGarageQuotes}>
                                <a className="nav-link active" data-toggle="tab" href="#Service">{ t('client.dashboard.Servicegaragesquotes') }</a>
                            </li>
                            <li className="nav-item" onClick={handlePartsQuotes}>
                                <a className="nav-link" data-toggle="tab" href="#Parts">{ t('client.dashboard.ServiceParts') }</a>
                            </li>
                            <li className="nav-item" onClick={handleSalesQuotes}>
                                <a className="nav-link" data-toggle="tab" href="#Tow">{ t('client.dashboard.Servicevehicle') }</a>
                            </li>
                            {/* <li className="nav-item" onClick={handleCorporateQuotes}>
                                <a className="nav-link" data-toggle="tab" href="#corporate">{ t('client.dashboard.Servicecorporate') }</a>
                            </li> */}
                        </ul>

                        <div className="tab-content">
                            <div className="tab-pane active" id="Service">
                            {
                                requestGarageListingData && requestGarageListingData.length>0 ? requestGarageListingData.map((item, i) =>
                                    <div className="GaragesBox" key={i}>
                                        <div className="GaragesHead">
                                            <figure>
                                                <img src={ item.providerData.image } />
                                                <span className="Rates"> { item.providerData.avgRating ? item.providerData.avgRating : 0 } <i className="fa fa-star"></i></span>
                                            </figure>
                                            <figcaption>
                                                <h4> { item.providerData.business } <span>Requested on { moment(item.createdAt).format("DD MMMM 'YY") } </span></h4>
                                                <h5>Owned by { item.providerData.firstName } { item.providerData.lastName }</h5>
                                                <article>
                                                    <aside>
                                                        <h6>Garage Contact Info</h6>
                                                        <p>Email Address: { item.providerData.email }</p>
                                                        <p>Mobile Number: { item.providerData.telephone }</p>
                                                        <p>Address: { item.providerData.number }, { item.providerData.street }, { item.providerData.city }, { item.providerData.province } </p> 
                                                    </aside>
                                                    <aside>
                                                        <h6>Special Services:</h6>
                                                        <p>
                                                        {
                                                            item.providerData.specialityService && item.providerData.specialityService.length > 0 && item.providerData.specialityService.map((item)=> (
                                                                (item.checked==true)?
                                                                    item.name + ', '
                                                                :''
                                                            ))
                                                        }
                                                        </p>
                                                    </aside>
                                                </article>
                                            </figcaption>
                                        </div>
                                        <div className="GaragesMiddle">
                                            <aside>
                                                <p>Requested Services: <span> { item.services &&  item.services.join(", ") } </span></p>
                                            </aside>
                                            <aside>
                                                <p>Vehicle: <span> {item.vehicleData.vehicleNumber?item.vehicleData.vehicleNumber+',':'' } {item.vehicleData.model?item.vehicleData.model+',':'' }  {item.vehicleData.make?item.vehicleData.make+',':''} {item.vehicleData.year?item.vehicleData.year+'':''} {item.vehicleData.type?item.vehicleData.type+'':''} </span></p>
                                                <p>Tow Truck: <span> { item.towTruck } </span> </p>
                                            </aside>
                                        </div>
                                        <div className="QuoteBox">
                                            <h4>Quote Details : <span>Requested on { moment(item.quoteDate).format("DD MMMM 'YY") } </span></h4>
                                            <blockquote>
                                                <aside>
                                                    <h5>Cost of Estimate </h5>
                                                    <p>$ { item.cost }</p>
                                                </aside>
                                                <article>
                                                    <h5>Select your visit Schedule</h5>
                                                    <ul>
                                                    { item.availableSlots && item.availableSlots.map((schedule, i) =>
                                                            <li key={i}>
                                                                {
                                                                    (i == 0) ?
                                                                        <label className="Radio" name="schedule"> { schedule.date } { schedule.time }
                                                                            <input type="radio" name="visit" onClick={ () => handleSchedule(schedule, item._id) } />
                                                                            <span className="checkmark"></span>
                                                                        </label>
                                                                    :
                                                                        <label className="Radio" name="schedule"> { schedule.date } { schedule.time }
                                                                            <input type="radio" name="visit" onClick={ () => handleSchedule(schedule, item._id) } />
                                                                            <span className="checkmark"></span>
                                                                        </label>
                                                                }
                                                            </li>
                                                        )
                                                    }
                                                        <li>
                                                            <label className="Radio"> Request Schedule as per your Availability
                                                                <input type="radio" name="visit" onClick={handleReScheduleShow} />
                                                                <span className="checkmark"></span>
                                                                <div className="Times" style={ (reScheduleShow=="block") ? {display:"block"} : {display:"none"} }>
                                                                    <input type="date" name="date" value={date} onChange={handleInputChange}/>
                                                                    <TimePicker
                                                                        showSecond={false}
                                                                        //defaultValue={now}
                                                                        className="xxx"
                                                                        name="time"
                                                                        onChange={handleTime1Change}
                                                                        format={format}
                                                                        use12Hours
                                                                        inputReadOnly
                                                                    />
                                                                </div>
                                                            </label>
                                                        </li>
                                                    </ul>
                                                </article>  
                                            </blockquote> 
                                            <figcaption>
                                                {
                                                    reScheduleShow=="block" ?
                                                        <a href="javascript:void(0);" className="Accept" onClick={()=>handleReSubmitQuote(item._id)}>Submit Quote</a>
                                                    :
                                                        <a href="javascript:void(0);" className="Accept" onClick={handleAcceptRequest}>Accept Quote</a>
                                                }
                                                <a href="javascript:void(0);" className="Decline" onClick={() => handleRejectRequest(item._id)}>Reject</a>
                                            </figcaption>
                                        </div>
                                    </div>
                                )
                                : 
                                <p>{ t('client.dashboard.Pleaseuseentrieslocatedbelowleft') } <Link to="/client/service-garage">Service Garages</Link> </p>
                            }
                            </div>
                            
                            <div className="tab-pane fade" id="Parts">
                            {
                                requestPartListingData && requestPartListingData.length>0 ? requestPartListingData.map((item, i) =>
                                
                                    <div className="GaragesBox">
                                        <div className="GaragesHead">
                                            <figure>
                                                <img src={ item.providerData.image } />
                                                <span className="Rates"> { item.providerData.avgRating } <i className="fa fa-star"></i></span>
                                            </figure>
                                            <figcaption>
                                                <h4> { item.providerData.business } <span>Requested on { moment(item.createdAt).format("DD MMMM 'YY") } </span></h4>
                                                <h5>Owned by { item.providerData.firstName } { item.providerData.lastName } </h5>
                                                <article>
                                                    <aside>
                                                        <h6>Vendors Contact Info</h6>
                                                        <p>Email Address: { item.providerData.email }  </p>
                                                        <p>Mobile Number: { item.providerData.telephone } </p>
                                                        <p>Address: { item.providerData.number }, { item.providerData.street }, { item.providerData.city }, { item.providerData.province }, { item.providerData.postalCode } </p> 
                                                    </aside>
                                                    <aside>
                                                        <h6>Special Services:</h6>
                                                        <p> 
                                                        {
                                                            item.providerData.serviceAvailable && item.providerData.serviceAvailable.length > 0 && item.providerData.serviceAvailable.map((item)=> (
                                                                (item.checked==true)?
                                                                    item.name + ', '
                                                                :''
                                                            ))
                                                        }
                                                        </p>
                                                    </aside>
                                                </article>
                                            </figcaption>
                                        </div>
                                        <div className="GaragesMiddle">
                                            <aside>
                                                <p>Requested Services: <span> { item.services.join(", ") } </span></p>
                                                <p>Requested Services: <span> { item.services.join(", ") } </span></p>
                                            </aside>
                                            <aside>
                                                <p>Vehicle: <span> {item.vehicleData.vehicleNumber?item.vehicleData.vehicleNumber+',':'' } {item.vehicleData.model?item.vehicleData.model+',':'' }  {item.vehicleData.make?item.vehicleData.make+',':''} {item.vehicleData.year?item.vehicleData.year+'':''}  {item.vehicleData.type?item.vehicleData.type+'':''} </span></p>
                                                <p>Tow Truck: <span> { item.towTruck } </span> </p>
                                            </aside>
                                        </div>
                                        <div className="QuoteBox">
                                            <h4>Quote Details : <span>Requested on { moment(item.quoteDate).format("DD MMMM 'YY") }</span></h4>
                                            {
                                                item.partQuotes && item.partQuotes.length>0 && item.partQuotes.map((partItem, i) => 
                                                    <div className="QuotePart">
                                                        <h4>Part: { partItem.service } </h4>
                                                        <h5>Select Part from the options:</h5>
                                                        <ul>
                                                            { partItem.parts.map((subPartItem, i) => 
                                                                <>
                                                                    <li key={i}>
                                                                        <label className="Radio">
                                                                            <input type="checkbox" name="brandSelected" />
                                                                            <span className="checkmark"></span>
                                                                        </label>
                                                                        <h6>$ { subPartItem.availablePrice } </h6>
                                                                        <p><span>Brand : </span> { subPartItem.brand } </p>
                                                                        <p><span>Availability Date :</span> { subPartItem.availableDate } </p>
                                                                        <p><span>Condition :</span> { subPartItem.condition } </p> 
                                                                        <p><span>You get it by :</span> { (subPartItem.pickUp == "on" )? "Pickup" : (subPartItem.delivery == "on" )? "Delivery" : "" } </p> 
                                                                    </li>
                                                                </>
                                                            ) }
                                                        </ul>
                                                    </div>
                                                )
                                            }
                                            <figcaption>
                                                <a href="javascript:void(0);" className="Accept" onClick={() => handlePartsAcceptRequest(item._id)}>Accept Quote</a>
                                                <a href="javascript:void(0);" className="Decline"  onClick={() => handlePartsRejectRequest(item._id)}>Decline</a>
                                            </figcaption>
                                        </div>
                                    </div>
                                ) : 
                                <p>Not available any quotes for you, you can find Parts to here <Link to="/client/service-parts">Service Parts</Link> </p>
                            }
                            </div>

                            <div className="tab-pane fade" id="Tow">
                            {
                                requestSalesListingData && requestSalesListingData.length>0 ? requestSalesListingData.map((item, i) =>
                                
                                    <div className="GaragesBox">
                                        <div className="GaragesHead">
                                            <figure>
                                                <img src={ item.providerData.image } />
                                                <span className="Rates"> { item.providerData.avgRating } <i className="fa fa-star"></i></span>
                                            </figure>
                                            <figcaption>
                                                <h4> { item.providerData.business } <span>Requested on { moment(item.createdAt).format("DD MMMM 'YY") } </span></h4>
                                                <h5>Owned by { item.providerData.firstName } { item.providerData.lastName } </h5>
                                                <article>
                                                    <aside>
                                                        <h6>Vendors Contact Info</h6>
                                                        <p>Email Address: { item.providerData.email }  </p>
                                                        <p>Mobile Number: { item.providerData.telephone } </p>
                                                        <p>Address: { item.providerData.number }, { item.providerData.street }, { item.providerData.city }, { item.providerData.province }, { item.providerData.postalCode } </p> 
                                                    </aside>
                                                </article>
                                            </figcaption>
                                        </div>
                                        <div className="GaragesMiddle">
                                            
                                        </div>
                                        <div className="QuoteBox">
                                            <h4>Quote Details : <span>Requested on { moment(item.quoteDate).format("DD MMMM 'YY") }</span></h4>
                                            <blockquote>
                                                <aside>
                                                    <h5>Requested Make: </h5>
                                                    <p> { item.make }</p>
                                                </aside>
                                                <article>
                                                    <h5>Select your visit Schedule</h5>
                                                    <ul>
                                                    { item.availableSlots && item.availableSlots.map((schedule, i) =>
                                                            <li key={i}>
                                                                {
                                                                    (i == 0) ?
                                                                        <label className="Radio" name="schedule"> { schedule.date } { schedule.time }
                                                                            <input type="radio" name="visit" onClick={ () => handleSchedule(schedule, item._id) } />
                                                                            <span className="checkmark"></span>
                                                                        </label>
                                                                    :
                                                                        <label className="Radio" name="schedule"> { schedule.date } { schedule.time }
                                                                            <input type="radio" name="visit" onClick={ () => handleSchedule(schedule, item._id) } />
                                                                            <span className="checkmark"></span>
                                                                        </label>
                                                                }
                                                            </li>
                                                        )
                                                    }
                                                        <li>
                                                            <label className="Radio"> Request Schedule as per your Availability
                                                                <input type="radio" name="visit" onClick={handleReScheduleShow} />
                                                                <span className="checkmark"></span>
                                                                <div className="Times" style={ (reScheduleShow=="block") ? {display:"block"} : {display:"none"} }>
                                                                    <input type="date" name="date" value={date} onChange={handleInputChange}/>
                                                                    <TimePicker
                                                                        showSecond={false}
                                                                        //defaultValue={now}
                                                                        className="xxx"
                                                                        name="time"
                                                                        onChange={handleTime1Change}
                                                                        format={format}
                                                                        use12Hours
                                                                        inputReadOnly
                                                                    />
                                                                </div>
                                                            </label>
                                                        </li>
                                                    </ul>
                                                </article>  
                                            </blockquote> 
                                            <figcaption>
                                                <a href="javascript:void(0);" className="Accept" onClick={() => handleSalesAcceptRequest(item._id)}>Accept Quote</a>
                                                <a href="javascript:void(0);" className="Decline"  onClick={() => handleSalesRejectRequest(item._id)}>Decline</a>
                                            </figcaption>
                                        </div>
                                    </div>
                                ) : 
                                <p>Not available any quotes for you, you can find Vehicles to here <Link to="/client/service-auto-sales">Service Auto Dealer</Link> </p>
                            }
                            </div>

                            <div className="tab-pane fade" id="corporate">
                            {
                                requestCorporateListingData && requestCorporateListingData.length>0 ? requestCorporateListingData.map((item, i) =>
                                
                                    <div className="GaragesBox">
                                        <div className="GaragesHead">
                                            <figure>
                                                <img src={ item.vehicleData.image } />
                                                <span className="Rates"> { item.providerData.avgRating } <i className="fa fa-star"></i></span>
                                            </figure>
                                            <figcaption>
                                                <h4> { item.providerData.business } <span>Requested on { moment(item.createdAt).format("DD MMMM 'YY") } </span></h4>
                                                <h5>Owned by { item.providerData.firstName } { item.providerData.lastName } </h5>
                                                <article>
                                                    <aside>
                                                        <h6>Vendors Contact Info</h6>
                                                        <p>Email Address: { item.providerData.email }  </p>
                                                        <p>Mobile Number: { item.providerData.telephone } </p>
                                                        <p>Address: { item.providerData.number }, { item.providerData.street }, { item.providerData.city }, { item.providerData.province }, { item.providerData.postalCode } </p> 
                                                    </aside>
                                                </article>
                                            </figcaption>
                                        </div>
                                        <div className="GaragesMiddle">
                                            <aside>
                                                <p>Vehicle Model: <span> {item.vehicleData.model } </span> Vehicle Make: <span> {item.vehicleData.make } </span> Vehicle Type: <span> {item.vehicleData.type }</span> Vehicle Mileage: <span> {item.vehicleData.mileage } </span></p>
                                            </aside>
                                        </div>
                                        <div className="QuoteBox">
                                            <h4>Quote Details : <span>Requested on { moment(item.quoteDate).format("DD MMMM 'YY") }</span></h4>
                                            <blockquote>
                                                <aside>
                                                    <h5>Cost of Estimate </h5>
                                                    <p>$ { item.cost }</p>
                                                </aside>
                                                <article>
                                                    <h5>Select your visit Schedule</h5>
                                                    <ul>
                                                    { item.availableSlots && item.availableSlots.map((schedule, i) =>
                                                            <li key={i}>
                                                                {
                                                                    (i == 0) ?
                                                                        <label className="Radio" name="schedule"> { schedule.date } { schedule.time }
                                                                            <input type="radio" name="visit" onClick={ () => handleSchedule(schedule, item._id) } />
                                                                            <span className="checkmark"></span>
                                                                        </label>
                                                                    :
                                                                        <label className="Radio" name="schedule"> { schedule.date } { schedule.time }
                                                                            <input type="radio" name="visit" onClick={ () => handleSchedule(schedule, item._id) } />
                                                                            <span className="checkmark"></span>
                                                                        </label>
                                                                }
                                                            </li>
                                                        )
                                                    }
                                                        <li>
                                                            <label className="Radio"> Request Schedule as per your Availability
                                                                <input type="radio" name="visit" onClick={handleReScheduleShow} />
                                                                <span className="checkmark"></span>
                                                                <div className="Times" style={ (reScheduleShow=="block") ? {display:"block"} : {display:"none"} }>
                                                                    <input type="date" name="date" value={date} onChange={handleInputChange}/>
                                                                    <TimePicker
                                                                        showSecond={false}
                                                                        //defaultValue={now}
                                                                        className="xxx"
                                                                        name="time"
                                                                        onChange={handleTime1Change}
                                                                        format={format}
                                                                        use12Hours
                                                                        inputReadOnly
                                                                    />
                                                                </div>
                                                            </label>
                                                        </li>
                                                    </ul>
                                                </article>  
                                            </blockquote> 
                                            <figcaption>
                                                <a href="javascript:void(0);" className="Accept" onClick={() => handleCorporateAcceptRequest(item._id)}>Accept Quote</a>
                                                <a href="javascript:void(0);" className="Decline"  onClick={() => handleCorporateRejectRequest(item._id)}>Decline</a>
                                            </figcaption>
                                        </div>
                                    </div>
                                ) : 
                                <p>Not available any quotes for you, you can find Vehicles to here <Link to="/client/service-corporate">Service Corporate</Link> </p>
                            }
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
            
            <Modal show={confirmationAcceptShow} className="PanelModal">
                <div className="modal-body">
                    <div className="CongratulationsBox">
                        <a href="javascript:void(0);" type="button" className="Close" onClick={handleConfirmationAcceptClose}>&times;</a>
                        <figure><img src={Sucessfull} /></figure>
                        <h4>Congratulations! Your booking has been confirmed.</h4>
                    </div>
                </div>
            </Modal>

            <Modal show={rejectShow} className="PanelModal">
                <div className="modal-body">
                    <div className="CongratulationsBox">
                        <a href="javascript:void(0);" type="button" className="Close" onClick={handleRejectClose}>&times;</a>
                        <figure><img src={Sucessfull} /></figure>
                        <h4>Your request has been rejected</h4>
                    </div>
                </div>
            </Modal>

            <Modal show={confirmationReScheduleShow} className="PanelModal">
                <div className="modal-body">
                    <div className="CongratulationsBox">
                        <a href="javascript:void(0);" type="button" className="Close" onClick={handleConfirmationReScheduleClose}>&times;</a>
                        <figure><img src={Sucessfull} /></figure>
                        <h4>Your request has been submitted</h4>
                    </div>
                </div>
            </Modal>

            <Modal show={welcomeModalShow} className="PanelModal">
                <div className="modal-body">
                    <div className="CongratulationsBox Welcome">
                        <a href="javascript:void(0);" type="button" className="Close" onClick={handleWelcomeModalClose}>&times;</a>
                    
                        <h4>{ t('client.dashboard.WelcometoAutowiz') }</h4>
                        <p> { t('client.dashboard.howcanwehelpyoutoday') } </p>
                        <ul>
                            <li><Link to="/client/service-garage">Services Garage</Link></li>
                            <li><Link to="/client/service-parts">{ t('client.dashboard.ServicesAutoParts') }</Link></li>
                            <li><Link to="/client/service-auto-sales">{ t('client.dashboard.ServicesAutoSales') }</Link></li>
                            {/* <li><Link to="/client/service-corporate">Services Corporate</Link></li> */}
                        </ul>
                    </div>
                </div>
            </Modal>
            
            <Modal show={confirmationPartsAcceptShow} className="PanelModal">
                <div className="modal-body">
                    <div className="CongratulationsBox">
                        <a href="javascript:void(0);" type="button" className="Close" onClick={handleConfirmationPartsAcceptClose}>&times;</a>
                        <figure><img src={Sucessfull} /></figure>
                        <h4>Congratulations! Your booking has been confirmed.</h4>
                    </div>
                </div>
            </Modal>

            <Footer />
        </>
    );
}

export default ClientDashboard