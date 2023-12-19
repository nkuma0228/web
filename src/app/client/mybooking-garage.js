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

import { upcomingBookings, ongoingBookings, completedBookings, AcceptBooking, ratingCreate } from "../../redux/actions/client/providerAction";

const initialState = {
    rating:'',
    comment:'',
    ratingEmpty:'',
    commentEmpty:'',
}

const MyBookingGarage = () => {
    const { i18n, t } = useTranslation();
    let lang  = i18n.language
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getListData = useSelector(state => state.clientProviderData)
    const { requestGarageUpcomingData, requestGarageOngoingData, requestGarageCompletedData } = getListData
    
    useEffect(() => {
        const data = { "status": ["Upcoming"] }
        dispatch(upcomingBookings(data))
    },[])

    const handleUpcomingFetch = () => {
        const data = { "status": ["Upcoming"] }
        dispatch(upcomingBookings(data))
    }

    const handleOngoingFetch = () => {
        const data = { "status": ["Diagnostic", "Diagnostic Completed", "Accepted"] }
        dispatch(ongoingBookings(data))
    }

    const handleCompletedFetch = () => {
        const data = { "status": ["Completed"] }
        dispatch(completedBookings(data))
    }

    const handleDetail = (id) => {
        window.localStorage.setItem("garageDetailID", id)
    }

    const handleAccept = (id) => {
        const data = { id:id }
        console.log(data)
        dispatch(AcceptBooking(data)).then(res => {
            if (res.code == 200) {
                toast.success(res.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
            } else {
                toast.error(res.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
            setTimeout(
                function() {
                    navigate("/client/my-bookings/garages")
                }
                .bind(this),
                1000
            );
        }).catch(err => {
            console.log(err, 'err')
            const message = err && err.response && err.response.data ? err.response.data.message : "Something went wrong."
            toast.error(message, {
                position: toast.POSITION.TOP_RIGHT
            });
        })
    }   

    const handleCompetitveQuote = (item) => {
        
        const data = { 
            requestNumber: item.request_number,
            myVehicle: item.vehicle,
            location: item.location,
            services: item.services,
            towTruck: item.towTruck,
            notes: item.notes,
            vehicleDetail: [item.vehicleData]
        }
        window.localStorage.removeItem('searchingMoreStorage')
        window.localStorage.setItem('searchingStorage',  JSON.stringify(data))
        navigate("/client/service-garage/list")
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
                        <h4>{ t('client.sidebar.Mybookings') }</h4>
                    </div>
                    <div className="CommonTabs">
                        <ul className="nav nav-tabs">
                            <li className="nav-item" onClick={handleUpcomingFetch}>
                                <a className="nav-link active" data-toggle="tab" href="#Upcoming">{ t('client.sidebar.Upcomingbookings') }</a>
                            </li>
                            <li className="nav-item" onClick={handleOngoingFetch}>
                                <a className="nav-link" data-toggle="tab" href="#Ongoing">{ t('client.sidebar.Ongoingbookings') }</a>
                            </li> 
                            <li className="nav-item" onClick={handleCompletedFetch}>
                                <a className="nav-link" data-toggle="tab" href="#Completed">{ t('client.sidebar.Completedbookings') }</a>
                            </li>
                        </ul>
                        <div className="tab-content">
                            <div className="tab-pane active" id="Upcoming">
                            { requestGarageUpcomingData && requestGarageUpcomingData.length>0 ? requestGarageUpcomingData.map( (item, i) =>
                                    
                                    <div className="GaragesBox">
                                        <div className="GaragesHead">
                                            <figure>
                                                <img src={ item.providerData.imageGallery.length>0 ? item.providerData.imageGallery[0] : Product_Placeholder} />
                                                <span className="Rates"> { item.providerData.avgRating ? item.providerData.avgRating : 0 } <i className="fa fa-star"></i></span>
                                            </figure>
                                            <figcaption>
                                                <h4><Link to="/client/service-garage/detail" onClick={() => handleDetail(item.providerData._id)}> { item.providerData.business }  </Link></h4>
                                                <h5>Owned by { item.providerData.firstName } { item.providerData.lastName }</h5>
                                                <article>
                                                    <aside>
                                                        <h6>Garage Contact Info</h6>
                                                        <p>Email Address: { item.providerData.email }</p>
                                                        <p>Mobile Number: { item.providerData.telephone }</p>
                                                        <p>Address: { item.providerData.number }, { item.providerData.street }, { item.providerData.city }, { item.providerData.province } </p> 
                                                    </aside>
                                                    <aside>
                                                        {
                                                            item.providerData.specialityService ?
                                                                <>
                                                                    <h6>Special Services:</h6>
                                                                    <p>
                                                                        {   
                                                                            item.providerData.specialityService && item.providerData.specialityService.map((special) => 
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
                                                {  item.vehicleDetail ?  <p>Vehicle: <span> { item.vehicleDetail[0].vehicleNumber } { item.vehicleDetail[0].model } { item.vehicleDetail[0].make } { item.vehicleDetail[0].year } { item.vehicleDetail[0].type } </span></p> : '' }
                                            </aside>
                                        </div>
                                        <div className="QuoteBox">
                                            <h4>Quote Details : <span>Requested on { moment(item.createdAt).format("LL") }  </span></h4>
                                            <blockquote>
                                                <aside>
                                                    <h5>Cost of Estimate </h5>
                                                    <p>$ { item.cost } </p>
                                                </aside>
                                                <aside>
                                                    <h5>Booked Appointment</h5>
                                                    <p> { moment(item.serviceDate).format("MMMM Do YYYY") } At { item.serviceTime } </p>
                                                </aside>   
                                            </blockquote>  
                                        </div>
                                    </div>
                                )
                                : "No result found"
                            }
                            </div>

                            <div className="tab-pane fade" id="Ongoing">
                                { requestGarageOngoingData && Object.keys(requestGarageOngoingData).length>0 ? requestGarageOngoingData.map( (item, i) =>
                                        <div className="GaragesBox">
                                            <div className="GaragesHead">
                                                <figure>
                                                    <img src={ item.providerData.imageGallery.length>0 ? item.providerData.imageGallery[0] : Product_Placeholder} />
                                                    <span className="Rates"> { item.providerData.avgRating ? item.providerData.avgRating : 0 } <i className="fa fa-star"></i></span>
                                                </figure>
                                                <figcaption>
                                                    <h4><Link to="/client/service-garage/detail" onClick={() => handleDetail(item.providerData._id)}> { item.providerData.business }  </Link></h4>
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
                                                                    item.providerData.specialityService ?
                                                                        <>
                                                                            <h6>Special Services:</h6>
                                                                            <p>
                                                                                {   
                                                                                    item.providerData.specialityService && item.providerData.specialityService.map((special) => 
                                                                                        (special.checked == true) ?
                                                                                            special.name + ', '
                                                                                        : ''
                                                                                    )
                                                                                }
                                                                            </p>
                                                                        </>
                                                                    : ''
                                                                }
                                                            </p>
                                                        </aside>
                                                    </article>
                                                </figcaption>
                                            </div>
                                            <div className="GaragesMiddle">
                                                <aside>
                                                    { item.services ? <p>Requested Services: <span> { item.services && item.services.join(", ")} </span></p> : '' }
                                                </aside>
                                                <aside>
                                                    {  item.vehicleDetail ?  <p>Vehicle: <span> { item.vehicleData.vehicleNumber } { item.vehicleData.model } { item.vehicleData.make } { item.vehicleData.year } { item.vehicleData.type } </span></p> : '' }
                                                </aside>
                                            </div>
                                            <div className="QuoteBox QuoteBox2">
                                                <h4>Booking Details : <span>Requested on { moment(item.createdAt).format("LL") }</span></h4>
                                                <blockquote>
                                                    <aside>
                                                        <h5>Cost of Estimate </h5>
                                                        <p>$ { item.cost }</p>
                                                    </aside>
                                                    <aside>
                                                        <h5>Visit Date & time </h5>
                                                        <p> { moment(item.serviceDate).format("L") } At { item.serviceTime } </p>
                                                    </aside>   
                                                    <aside>
                                                        <h5> Status </h5>
                                                        <p> { item.status } </p>
                                                    </aside>
                                                </blockquote>  
                                            </div>
                                            {  item.repairCost ?
                                                <div className="QuoteBox">
                                                    <h4>Repair Quote Details : <span>Requested on { item.repairQuoteDate && item.repairQuoteDate.length>0? moment(item.repairQuoteDate).format("DD MMMM 'YY") : '' }</span></h4>
                                                    <blockquote>
                                                        <aside>
                                                            <h5>Cost of Repair </h5>
                                                            <p>$ {item.repairCost} </p>
                                                        </aside>
                                                        <aside>
                                                            <h5>Repair Date & time :</h5>
                                                            <p> { moment(item.repairDate).format("DD MMMM 'YY") }  At { item.repairTime } </p>
                                                        </aside>   
                                                        <aside>
                                                            <h5>Parts to be Replaced </h5>
                                                            <p> { item.partsReplaced && item.partsReplaced.map((item)=> item.parts+ ', ' )} </p>
                                                        </aside>
                                                    
                                                    </blockquote>  
                                                    <blockquote>
                                                        <aside>
                                                        </aside> 
                                                        
                                                        { item.status == "Diagnostic Completed" ?
                                                            <>
                                                                <aside>
                                                                    <a href="javascript:void(0);" onClick={()=>handleCompetitveQuote(item)} className="Accept">Need Competitive Quote</a>
                                                                </aside> 
                                                                <aside>
                                                                    <a href="javascript:void(0);" onClick={()=>handleAccept(item._id)} className="Rates">Accept Quote</a>
                                                                </aside>
                                                            </>
                                                            : ''
                                                        }
                                                    
                                                    </blockquote> 
                                                
                                                </div>
                                                :''
                                            }
                                        </div>
                                    )
                                    : "No result found"
                                }
                            </div>

                            <div className="tab-pane fade" id="Completed">
                                { requestGarageCompletedData && Object.keys(requestGarageCompletedData).length>0 ? requestGarageCompletedData.map( (item, i) =>
                                        <div className="GaragesBox">
                                            <div className="GaragesHead">
                                                <figure>
                                                    <img src={ item.providerData.imageGallery.length>0 ? item.providerData.imageGallery[0] : Product_Placeholder} />
                                                    <span className="Rates"> { item.providerData.avgRating ? item.providerData.avgRating : 0 } <i className="fa fa-star"></i></span>
                                                </figure>
                                                <figcaption>
                                                    <h4><Link to="/client/service-garage/detail" onClick={() => handleDetail(item.providerData._id)}> { item.providerData.business }  </Link></h4>
                                                    <h5>Owned by { item.providerData.firstName } { item.providerData.lastName }</h5>
                                                    <article>
                                                        <aside>
                                                            <h6>Garage Contact Info</h6>
                                                            <p>Email Address: { item.providerData.email }</p>
                                                            <p>Mobile Number: { item.providerData.telephone }</p>
                                                            <p>Address: { item.providerData.number }, { item.providerData.street }, { item.providerData.city }, { item.providerData.province } </p> 
                                                        </aside>
                                                        <aside>
                                                            {
                                                                item.providerData.specialityService ?
                                                                    <>
                                                                        <h6>Special Services:</h6>
                                                                        <p>
                                                                            {   
                                                                                item.providerData.specialityService && item.providerData.specialityService.map((special) => 
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
                                                    {  item.vehicleData ?  <p>Vehicle: <span> { item.vehicleData.vehicleNumber } { item.vehicleData.model } { item.vehicleData.make } { item.vehicleData.year } { item.vehicleData.type } </span></p> : '' }
                                                </aside>
                                            </div>
                                                <div className="QuoteBox">
                                                    <h4>Quote Details : <span>Requested on { moment(item.createdAt).format("LL") }</span></h4>
                                                    <blockquote>
                                                        <aside>
                                                            <h5>Cost of Estimate </h5>
                                                            <p>$ { item.repairCost }</p>
                                                        </aside>
                                                        <aside>
                                                            <h5>Select your visit Schedule</h5>
                                                            <p> { moment(item.serviceDate).format("L") } At { item.serviceTime } </p>
                                                        </aside>   
                                                        <aside>
                                                            {
                                                                item.rating != "Yes" ?
                                                                    <a href="javascript:void(0);" onClick={()=>handleRateModalShow(item._id, item.provider_id)} className="Rates">Rate your Service</a>
                                                                :
                                                                    ""
                                                            }
                                                        </aside>
                                                    </blockquote>
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

export default MyBookingGarage