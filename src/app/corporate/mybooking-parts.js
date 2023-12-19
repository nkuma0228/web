import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import _ from 'lodash'
import moment from 'moment';
import FORM from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ReactStars from "react-rating-stars-component";

import Product_Placeholder from "../../assets/client/images/Product_Placeholder.png"
import Header from "./header";
import Footer from "./footer";

import { upcomingPartsBookings, ongoingPartsBookings, completedPartsBookings, AcceptBooking, ratingCreate } from "../../redux/actions/corporate/providerAction";

const initialState = {
    rating:'',
    comment:'',
    ratingEmpty:'',
    commentEmpty:'',
}

const CorporateMyBookingParts = () => {
    const { i18n, t } = useTranslation();
    let lang  = i18n.language
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getListData = useSelector(state => state.corporateProviderData)
    const { requestPartsUpcomingData, requestPartsOngoingData, requestPartsCompletedData } = getListData
    
    useEffect(() => {
        const data = { "status": ["Upcoming"] }
        dispatch(upcomingPartsBookings(data))
    },[])
    console.log(requestPartsUpcomingData)
    const handleUpcomingFetch = () => {
        const data = { "status": ["Upcoming"] }
        dispatch(upcomingPartsBookings(data))
    }

    const handleOngoingFetch = () => {
        const data = { "status": ["OnGoing"] }
        dispatch(ongoingPartsBookings(data))
    }

    const handleCompletedFetch = () => {
        const data = { "status": ["Completed"] }
        dispatch(completedPartsBookings(data))
    }

    const handleDetail = (id) => {
        window.localStorage.setItem("garageDetailID", id)
    }

    const handleAccept = (id) => {
        const data = { id:id }
        dispatch(AcceptBooking(data))
    }   

    const [rateID, setRateID] = useState({});
    const [rateModal, setRateModal] = useState(false);
    const handleRateModalShow = (id, provider_id) => {
        setRateModal(true)
        setRateID({ id:id, provider_id:provider_id })
    }
    const handleRateModalClose = () => {
        setRateModal(false)
        setRateID({})
    }
    const ratingChanged = (newRating) => {
        updateVState({
            ...vState, "rating": newRating
        })
    };

    const [vState, updateVState] = useState(initialState);
    const {
        rating,
        comment,
        ratingEmpty,
        commentEmpty,
    } = vState
    const handleInputChange = (e) => {
        const { name, value } = e.target
        updateVState({
            ...vState, [name]: value
        })
    }
    const handleValidation = () => {

        let ratingEmpty = ''
        let commentEmpty = ''
        let formIsValid = true;

        if (!rating) {
            ratingEmpty = "Please select rating";
            formIsValid = false;
        }
        if (!comment.trim()) {
            commentEmpty = "Please enter comment";
            formIsValid = false;
        }
        updateVState({
            ...vState, 
            ratingEmpty,
            commentEmpty
        })
        return formIsValid;
    }
    const handleRateSubmit = (event) => {
        event.preventDefault();
        let formIsValid = handleValidation();
        if (formIsValid) {
            const data = { request_id:rateID.id, provider_id:rateID.provider_id, rating, comment }
            dispatch(ratingCreate(data)).then(res => {
                if (res.code == 201) {
                    handleRateModalClose();
                    setRateID({})
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
                    toast.error(res.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    updateVState({
                        ...vState, 
                        errorMsg: res.message,
                        ratingEmpty: '',
                        commentEmpty: ''
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
            <ToastContainer/>
            <Header />

            <div className="WrapperArea">
                <div className="WrapperBox"> 
                    <div className="TitleBox">
                        <h4>{ t('client.sidebar.MySalesParts') }</h4>
                    </div>
                    <div className="CommonTabs">
                        <ul className="nav nav-tabs">
                            <li className="nav-item" onClick={handleUpcomingFetch}>
                                <a className="nav-link active" data-toggle="tab" href="#Upcoming">{ t('client.sidebar.UpcomingSales') }</a>
                            </li>
                            <li className="nav-item" onClick={handleOngoingFetch}>
                                <a className="nav-link" data-toggle="tab" href="#Ongoing">{ t('client.sidebar.OngoingSales') }</a>
                            </li> 
                            <li className="nav-item" onClick={handleCompletedFetch}>
                                <a className="nav-link" data-toggle="tab" href="#Completed">{ t('client.sidebar.CompletedSales') }</a>
                            </li>
                        </ul>
                        <div className="tab-content">
                            <div className="tab-pane active" id="Upcoming">
                            { requestPartsUpcomingData && requestPartsUpcomingData.length>0 ? requestPartsUpcomingData.map( (item, i) =>
                                    
                                    <div className="GaragesBox">
                                        <div className="GaragesHead">
                                            <figure>
                                                <img src={ item.providerData.imageGallery.length>0 ? item.providerData.imageGallery[0] : Product_Placeholder} />
                                                <span className="Rates"> { item.providerData.avgRating ? item.providerData.avgRating : 0 } <i className="fa fa-star"></i></span>
                                            </figure>
                                            <figcaption>
                                                <h4><Link to="/corporate/service-garage/detail" onClick={() => handleDetail(item.providerData._id)}> { item.providerData.business }  </Link></h4>
                                                <h5>Owned by { item.providerData.firstName } { item.providerData.lastName }</h5>
                                                <article>
                                                    <aside>
                                                        <h6>Contact Info</h6>
                                                        <p>Email Address: { item.providerData.email }</p>
                                                        <p>Mobile Number: { item.providerData.telephone }</p>
                                                        <p>Address: { item.providerData.number }, { item.providerData.street }, { item.providerData.city }, { item.providerData.province } </p> 
                                                    </aside>
                                                    <aside>
                                                        {
                                                            item.providerData.serviceAvailable ?
                                                                <>
                                                                    <h6>Special Services:</h6>
                                                                    <p>
                                                                        {   
                                                                            item.providerData.serviceAvailable && item.providerData.serviceAvailable.map((special) => 
                                                                                (special.checked == true) ?
                                                                                    special.name + ', '
                                                                                : ''
                                                                            )
                                                                        }
                                                                    </p>
                                                                </>
                                                            : ''
                                                        }
                                                    </aside>
                                                </article>
                                            </figcaption>
                                        </div>
                                        <div className="GaragesMiddle">
                                            <aside>
                                                { item.services ? <p>Requested Services: <span> { item.services && item.services.map((item)=> item+ ', ' )} </span></p> : '' }
                                            </aside>
                                            <aside>
                                                {  item.corporateVehicleData ?  <p>Vehicle: <span> { item.corporateVehicleData.vehicleNumber } { item.corporateVehicleData.model } { item.corporateVehicleData.make } { item.corporateVehicleData.year } { item.corporateVehicleData.type } </span></p> : '' }
                                            </aside>
                                        </div>
                                        <div className="QuoteBox">
                                            <h4>Quote Details : <span>Requested on { moment(item.createdAt).format("LL") }  </span></h4>
                                            <div className="QuotePartBoxx">
                                            {
                                                item.partQuotes && item.partQuotes.length>0 && item.partQuotes.map((item, i) => 
                                                    <div className="QuotePart">
                                                        <h4>Part: { item.service } </h4>
                                                        <h5>Select Part from the options:</h5>
                                                        <ul>
                                                            { item.parts.map((partItem, i) => 
                                                                <>
                                                                    <li key={i}>
                                                                        <label className="Radio">
                                                                            <span className="checkmark"></span>
                                                                        </label>
                                                                        <h6>$ { partItem.availablePrice } </h6>
                                                                        <p><span>Brand : </span> { partItem.brand } </p>
                                                                        <p><span>Availability Date :</span> { partItem.availableDate } </p>
                                                                        <p><span>Condition :</span> { partItem.condition } </p> 
                                                                        <p><span>You get it by :</span> { (partItem.pickUp == "on" )? "Pickup" : (partItem.delivery == "on" )? "Delivery" : "" } </p> 
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
                                )
                                : "No result found"
                            }
                            </div>

                            <div className="tab-pane fade" id="Ongoing">
                            { requestPartsOngoingData && requestPartsOngoingData.length>0 ? requestPartsOngoingData.map( (item, i) =>
                                    
                                    <div className="GaragesBox">
                                        <div className="GaragesHead">
                                            <figure>
                                                <img src={ item.providerData.imageGallery.length>0 ? item.providerData.imageGallery[0] : Product_Placeholder} />
                                                <span className="Rates"> { item.providerData.avgRating ? item.providerData.avgRating : 0 } <i className="fa fa-star"></i></span>
                                            </figure>
                                            <figcaption>
                                                <h4><Link to="/corporate/service-garage/detail" onClick={() => handleDetail(item.providerData._id)}> { item.providerData.business }  </Link></h4>
                                                <h5>Owned by { item.providerData.firstName } { item.providerData.lastName }</h5>
                                                <article>
                                                    <aside>
                                                        <h6>Contact Info</h6>
                                                        <p>Email Address: { item.providerData.email }</p>
                                                        <p>Mobile Number: { item.providerData.telephone }</p>
                                                        <p>Address: { item.providerData.number }, { item.providerData.street }, { item.providerData.city }, { item.providerData.province } </p> 
                                                    </aside>
                                                    <aside>
                                                        {
                                                            item.providerData.serviceAvailable ?
                                                                <>
                                                                    <h6>Special Services:</h6>
                                                                    <p>
                                                                        {   
                                                                            item.providerData.serviceAvailable && item.providerData.serviceAvailable.map((special) => 
                                                                                (special.checked == true) ?
                                                                                    special.name + ', '
                                                                                : ''
                                                                            )
                                                                        }
                                                                    </p>
                                                                </>
                                                            : ''
                                                        }
                                                    </aside>
                                                </article>
                                            </figcaption>
                                        </div>
                                        <div className="GaragesMiddle">
                                            <aside>
                                                { item.services ? <p>Requested Services: <span> { item.services && item.services.map((item)=> item+ ', ' )} </span></p> : '' }
                                            </aside>
                                            <aside>
                                                {  item.corporateVehicleData ?  <p>Vehicle: <span> { item.corporateVehicleData.vehicleNumber } { item.corporateVehicleData.model } { item.corporateVehicleData.make } { item.corporateVehicleData.year } { item.corporateVehicleData.type } </span></p> : '' }
                                            </aside>
                                        </div>
                                        <div className="QuoteBox">
                                            <h4>Quote Details : <span>Requested on { moment(item.createdAt).format("LL") }  </span></h4>
                                            <div className="QuotePartBoxx">
                                            {
                                                item.partQuotes && item.partQuotes.length>0 && item.partQuotes.map((item, i) => 
                                                    <div className="QuotePart">
                                                        <h4>Part: { item.service } </h4>
                                                        <h5>Select Part from the options:</h5>
                                                        <ul>
                                                            { item.parts.map((partItem, i) => 
                                                                <>
                                                                    <li key={i}>
                                                                        <label className="Radio">
                                                                            <span className="checkmark"></span>
                                                                        </label>
                                                                        <h6>$ { partItem.availablePrice } </h6>
                                                                        <p><span>Brand : </span> { partItem.brand } </p>
                                                                        <p><span>Availability Date :</span> { partItem.availableDate } </p>
                                                                        <p><span>Condition :</span> { partItem.condition } </p> 
                                                                        <p><span>You get it by :</span> { (partItem.pickUp == "on" )? "Pickup" : (partItem.delivery == "on" )? "Delivery" : "" } </p> 
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
                                )
                                : "No result found"
                            }
                            </div>

                            <div className="tab-pane fade" id="Completed">
                            { requestPartsCompletedData && requestPartsCompletedData.length>0 ? requestPartsCompletedData.map( (item, i) =>
                                    
                                    <div className="GaragesBox">
                                        <div className="GaragesHead">
                                            <figure>
                                                <img src={ item.providerData.imageGallery.length>0 ? item.providerData.imageGallery[0] : Product_Placeholder} />
                                                <span className="Rates"> { item.providerData.avgRating ? item.providerData.avgRating : 0 } <i className="fa fa-star"></i></span>
                                            </figure>
                                            <figcaption>
                                                <h4><Link to="/corporate/service-garage/detail" onClick={() => handleDetail(item.providerData._id)}> { item.providerData.business }  </Link></h4>
                                                <h5>Owned by { item.providerData.firstName } { item.providerData.lastName }</h5>
                                                <article>
                                                    <aside>
                                                        <h6>Contact Info</h6>
                                                        <p>Email Address: { item.providerData.email }</p>
                                                        <p>Mobile Number: { item.providerData.telephone }</p>
                                                        <p>Address: { item.providerData.number }, { item.providerData.street }, { item.providerData.city }, { item.providerData.province } </p> 
                                                    </aside>
                                                    <aside>
                                                        {
                                                            item.providerData.serviceAvailable ?
                                                                <>
                                                                    <h6>Special Services:</h6>
                                                                    <p>
                                                                        {   
                                                                            item.providerData.serviceAvailable && item.providerData.serviceAvailable.map((special) => 
                                                                                (special.checked == true) ?
                                                                                    special.name + ', '
                                                                                : ''
                                                                            )
                                                                        }
                                                                    </p>
                                                                </>
                                                            : ''
                                                        }
                                                    </aside>
                                                </article>
                                            </figcaption>
                                        </div>
                                        <div className="GaragesMiddle">
                                            <aside>
                                                { item.services ? <p>Requested Services: <span> { item.services && item.services.map((item)=> item+ ', ' )} </span></p> : '' }
                                            </aside>
                                            <aside>
                                                {  item.corporateVehicleData ?  <p>Vehicle: <span> { item.corporateVehicleData.vehicleNumber } { item.corporateVehicleData.model } { item.corporateVehicleData.make } { item.corporateVehicleData.year } { item.corporateVehicleData.type } </span></p> : '' }
                                            </aside>
                                        </div>
                                        <div className="QuoteBox">
                                            <h4>Quote Details : <span>Requested on { moment(item.createdAt).format("LL") }  </span></h4>
                                            <div className="QuotePartBoxx">
                                            {
                                                item.partQuotes && item.partQuotes.length>0 && item.partQuotes.map((item, i) => 
                                                    <div className="QuotePart">
                                                        <h4>Part: { item.service } </h4>
                                                        <h5>Select Part from the options:</h5>
                                                        <ul>
                                                            { item.parts.map((partItem, i) => 
                                                                <>
                                                                    <li key={i}>
                                                                        <label className="Radio">
                                                                            <span className="checkmark"></span>
                                                                        </label>
                                                                        <h6>$ { partItem.availablePrice } </h6>
                                                                        <p><span>Brand : </span> { partItem.brand } </p>
                                                                        <p><span>Availability Date :</span> { partItem.availableDate } </p>
                                                                        <p><span>Condition :</span> { partItem.condition } </p> 
                                                                        <p><span>You get it by :</span> { (partItem.pickUp == "on" )? "Pickup" : (partItem.delivery == "on" )? "Delivery" : "" } </p> 
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
                                )
                                : "No result found"
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={rateModal} className="PanelModal">
                <div className="modal-body">
                    <div className="Category">
                        <a href="javascript:void(0);" className="Close" onClick={handleRateModalClose}>×</a>
                        <h3>Please Rate</h3>   
                        <FORM onSubmit={handleRateSubmit}>
                            <div className="form-group">
                                <label> Rating </label>
                                <ReactStars
                                    count={5}
                                    onChange={ratingChanged}
                                    size={30}
                                    activeColor="#ffd700"
                                />
                                <span style={{ color: "red" }}>{ratingEmpty}</span>
                            </div> 
                            <div className="form-group">  
                                <label>Comment </label>
                                <input type="text" className="form-control" placeholder="Enter Comment" name="comment" value={comment} onChange={handleInputChange} />
                                <span style={{ color: "red" }}>{commentEmpty}</span>
                            </div>
                            <button type="submit" className="Accept">Submit</button>
                        </FORM>
                    </div>
                </div>
            </Modal>

            <Footer />
        </>
    );
}

export default CorporateMyBookingParts