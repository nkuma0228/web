import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import _ from 'lodash'
import moment from 'moment';
import FORM from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { requestPartsQuotes, submitPartsReject, partsQuoteAccept, requestPartsBookings } from "../../redux/actions/provider/garageAction";

import Header from "./header";
import Footer from "./footer";
import Sucessfull from "../../assets/client/images/sucessfull.png"

const GarageServiceParts = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { i18n, t } = useTranslation();
    
    const getListData = useSelector(state => state.garageRequestData)
    const { requestGaragePartListingData, requestGaragePartBookingListingData } = getListData
    
    useEffect(() => {
        const data = { status:["Available"] }
        dispatch(requestPartsQuotes(data))
    },[])

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 100,
            behavior: 'auto'
        });
    },[]);

    const handlePartQuotes = () => {
        const data = { status:["Available"] }
        dispatch(requestPartsQuotes(data))
    }

    const handlePartBookings = () => {
        const data = { status:["Upcoming", "OnGoing", "Completed"] }
        dispatch(requestPartsBookings(data))
    }

    const [rejectShow, setRejectShow] = useState(false);
    const handleRejectClose = () => {
        setRejectShow(false);
        window.location.reload()
    }
    const handleRejectShow = () => {
        setRejectShow(true);
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

    return (
        <>
            <Header />
                <div className="WrapperArea">
                    <div className="WrapperBox"> 

                        <div className="TitleBox">
                            <h4> { t('garage.autoparts.Autoparts') } </h4>
                            <Link className="TitleLink" to="/garage/service-parts-request"> { t('garage.autoparts.CreatePartsOrder') } </Link>
                        </div> 

                        <div className="CommonTabs">
                            <ul className="nav nav-tabs">
                                <li className="nav-item" onClick={handlePartQuotes}>
                                    <a className="nav-link active" data-toggle="tab" href="#Quotes"> { t('garage.autoparts.Partsquotes') } </a>
                                </li>
                                <li className="nav-item" onClick={handlePartBookings}>
                                    <a className="nav-link" data-toggle="tab" href="#Bookings"> { t('garage.autoparts.Partsbookings') } </a>
                                </li> 
                            </ul>

                            <div className="tab-content">
                                <div className="tab-pane active" id="Quotes">
                                {
                                    requestGaragePartListingData && requestGaragePartListingData.length>0 ? requestGaragePartListingData.map((item, i) =>
                                    
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
                                                </aside>
                                                <aside>
                                                    <p>Vehicle: <span> {item.otherVehicle } </span></p>
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
                                                                            <p><span>Model : </span> { subPartItem.make } </p>
                                                                            <p><span>Availability Date :</span> { subPartItem.availableDate } </p>
                                                                            <p><span>Condition :</span> { subPartItem.condition } </p> 
                                                                            <p><span>Description :</span> { subPartItem.description } </p> 
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
                                    ) : 'No result found'
                                }
                                </div>

                                <div className="tab-pane fade" id="Bookings">
                                {
                                    requestGaragePartBookingListingData && requestGaragePartBookingListingData.length>0 ? requestGaragePartBookingListingData.map((item, i) =>
                                    
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
                                                </aside>
                                                <aside>
                                                    <p>Vehicle: <span> {item.otherVehicle } </span></p>
                                                </aside>
                                            </div>
                                            <div className="QuoteBox">
                                                <h4>Quote Details : <span>Requested on { moment(item.quoteDate).format("DD MMMM 'YY") }</span></h4>
                                                <div className="QuotePartBoxx">
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
                                                                            <p><span>Model : </span> { subPartItem.make } </p>
                                                                            <p><span>Availability Date :</span> { subPartItem.availableDate } </p>
                                                                            <p><span>Condition :</span> { subPartItem.condition } </p> 
                                                                            <p><span>Description :</span> { subPartItem.description } </p> 
                                                                            <p><span>You get it by :</span> { (subPartItem.pickUp == "on" )? "Pickup" : (subPartItem.delivery == "on" )? "Delivery" : "" } </p> 
                                                                        </li>
                                                                    </>
                                                                ) }
                                                            </ul>
                                                        </div>
                                                    )
                                                }
                                                </div>
                                            </div>
                                        </div>
                                    ) : 'No result found'
                                }
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

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

export default GarageServiceParts