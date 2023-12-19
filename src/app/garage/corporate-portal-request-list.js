import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import _ from 'lodash'
import Modal from 'react-bootstrap/Modal';
import Sucessfull from "../../assets/client/images/sucessfull.png"
import Product_Placeholder from "../../assets/client/images/Product_Placeholder.png"

import Header from "./header";
import Footer from "./footer";

import { requestCorporateCreate } from "../../redux/actions/provider/searchAction";
import { corporateSearch } from "../../redux/actions/provider/searchAction";

const initialSearchState = {
    corporateName:'',
    corporateNameEmpty:''
}

const GarageCorporatePortalRequestList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getListData = useSelector(state => state.searching)
    const { dealerSearchData } = getListData
    let searchingStorage = window.localStorage.getItem('searchingCorporateStorage')
    searchingStorage = JSON.parse(searchingStorage)
    
    if(window.localStorage.getItem('searchingMoreStorage')) {
        var searchingMoreStorage = window.localStorage.getItem('searchingMoreStorage')
        searchingMoreStorage = JSON.parse(searchingMoreStorage)
    } else {
        var searchingMoreStorage = {};
    }

    const [removeObject, setRemoveObject] = useState([]);

    useEffect(() => {
        if(Object.keys(searchingMoreStorage).length>0) {
            setRemoveObject([]);
            var data = { corporateName:searchingMoreStorage.corporateName, removeID:removeObject}
        } else {
            var data = { 
                myVehicle:searchingStorage.myVehicle, 
                location:searchingStorage.location, 
                city:searchingStorage.city, 
                province:searchingStorage.province, 
                postalCode:searchingStorage.postalCode, 
                country:searchingStorage.country, 
                notes:searchingStorage.notes, 
                removeID:removeObject 
            }
        }
        dispatch(corporateSearch(data))
    },[])

    useEffect(() => {
        if(dealerSearchData && dealerSearchData.length<=0) {
            window.localStorage.removeItem("searchingMoreStorage")
        }
    },[dealerSearchData])

    const handleDetail = (id) => {
        window.localStorage.setItem("corporateDetailID", id)
    }
    
    const [confirmationShow, setConfirmationShow] = useState(false);
    const handleConfirmationClose = () => {
        setConfirmationShow(false);
        if(Object.keys(searchingMoreStorage).length>0) {
            var data = { corporateName:searchingMoreStorage.corporateName, removeID:removeObject }
        } else {
            var data = { 
                myVehicle:searchingStorage.myVehicle,
                location:searchingStorage.location, 
                city:searchingStorage.city, 
                province:searchingStorage.province, 
                postalCode:searchingStorage.postalCode, 
                country:searchingStorage.country, 
                notes:searchingStorage.notes, 
                removeID:removeObject 
            }
        }
        dispatch(corporateSearch(data))
    }

    const handleRemove = (id) => {
        var ids = removeObject
        ids.push(id)
        setRemoveObject(ids)
        if(Object.keys(searchingMoreStorage).length>0) {
            var data = { corporateName:searchingMoreStorage.corporateName, removeID:removeObject }
        } else {
            var data = { 
                myVehicle:searchingStorage.myVehicle, 
                location:searchingStorage.location, 
                city:searchingStorage.city, 
                province:searchingStorage.province, 
                postalCode:searchingStorage.postalCode, 
                country:searchingStorage.country,  
                notes:searchingStorage.notes, 
                removeID:removeObject 
            }
        }
        dispatch(corporateSearch(data))
    }

    const handleConfirmationShow = (id) => { 

        if(Object.keys(searchingMoreStorage).length>0) {
            var data = { provider_id:id, request_number:searchingStorage.requestNumber, provider_type:'garage', corporateName:searchingMoreStorage.corporateName, removeID:removeObject }
        } else {
            var data = { provider_id:id, request_number:searchingStorage.requestNumber, provider_type:'garage', myVehicle:searchingStorage.myVehicle, location:searchingStorage.location, notes:searchingStorage.notes, removeID:removeObject }
        }
        
        dispatch(requestCorporateCreate(data)).then(res => {
            if (res.code == 201) {
                setConfirmationShow(true);
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

    const [searchState, updateSearchState] = useState(initialSearchState);
    const {
        corporateName,
        corporateNameEmpty,
    } = searchState

    const handleInputSearchChange = (e) => {
        const { name, value } = e.target
        updateSearchState({
            ...searchState, [name]: value
        })
    }
    const handleValidation = () => {

        let formIsValid = true;

        if(!corporateName.trim()) {
            toast.error("Please enter corporate name", {
                position: toast.POSITION.TOP_RIGHT
            });
            formIsValid = false;
        }
        return formIsValid;
    }
    let handleSearchSubmit = (event) => {
        event.preventDefault();
        let formIsValid = handleValidation();
        if (formIsValid) {

            let randomRequestNumber = Math.round(+new Date()/1000);
            const data = { 
                requestNumber:randomRequestNumber,
                corporateName
            }
            
            window.localStorage.setItem('searchingMoreStorage',  JSON.stringify(data))
            window.location.reload()
        }
    }

    return (
        <>
            <ToastContainer/>
            <Header />

            <div className="WrapperArea">
                <div className="WrapperBox"> 
                    <div className="TitleBox">
                        <h4>Request Quotes from nearby Corporate</h4>
                    </div>
                    {   
                        dealerSearchData && dealerSearchData && dealerSearchData.length>0 ?
                            removeObject.length <= 5 ?
                                dealerSearchData && dealerSearchData && dealerSearchData.length>0 ?  dealerSearchData.map( (item, i) => 
                                    <div key={i} className="GaragesBox">
                                        <div className="GaragesHead">
                                            <figure>
                                                <img src={ item.imageGallery.length>0 ? item.imageGallery[0] : Product_Placeholder} />
                                                <span className="Rates"> { item.avgRating ? item.avgRating : 0 } <i className="fa fa-star"></i></span>
                                            </figure>
                                            <figcaption>
                                                <article>
                                                    <aside>
                                                        <h4><Link to="/garage/service-corporate-request/detail" onClick={() => handleDetail(item._id)}> { item.business } </Link></h4>
                                                        <h5>Owned by { item.firstName } { item.lastName }</h5>
                                                    </aside>
                                                    <aside>
                                                        <a href="javascript:void(0);" className="Accept" onClick={() => handleConfirmationShow(item._id)}>Send Quote</a>
                                                        <a href="javascript:void(0);" className="Decline" onClick={() => handleRemove(item._id)}>Decline</a>
                                                    </aside>
                                                </article>
                                                <article>
                                                    <aside>
                                                        <h6>Garage Contact Info</h6>
                                                        <p>Email Address: { item.email }</p>
                                                        <p>Mobile Number: { item.telephone }</p>
                                                        <p>Address: { item.number }, { item.street }, { item.city }, { item.province } </p> 
                                                    </aside>
                                                    <aside>
                                                        {
                                                            item.serviceAvailable ?
                                                                <>
                                                                    <h6>Special Services:</h6>
                                                                    <p>
                                                                        {   
                                                                            item.serviceAvailable && item.serviceAvailable.map((special) => 
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
                                            {  searchingStorage.vehicleDetail ?  <p>Vehicle: <span> { searchingStorage.vehicleDetail.vehicleNumber } { searchingStorage.vehicleDetail.model } { searchingStorage.vehicleDetail.make } { searchingStorage.vehicleDetail.year } </span></p> : '' }
                                            </aside>
                                        </div> 
                                    </div>
                                )
                                :'No result found'
                            :
                            <div className='row'>
                                <div class="col-md-12">
                                    <form onSubmit={handleSearchSubmit}>
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label>Search by corporate business name</label>
                                                <input type="text" class="form-control" placeholder="Enter Corporate business name" name="corporateName" value={corporateName} onChange={handleInputSearchChange}/>
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <button type="submit" class="Accept">Search</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        :
                            <div className='row'>
                                <div class="col-md-12">
                                    <form onSubmit={handleSearchSubmit}>
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label>Search by corporate business name</label>
                                                <input type="text" class="form-control" placeholder="Enter Corporate business name" name="corporateName" value={corporateName} onChange={handleInputSearchChange}/>
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <button type="submit" class="Accept">Search</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                    }
                </div>
            </div>

            <Modal show={confirmationShow} className="PanelModal">
                <div className="modal-body">
                    <div className="CongratulationsBox">
                        <a href="javascript:void(0);" type="button" className="Close" onClick={handleConfirmationClose}>&times;</a>
                        <figure><img src={Sucessfull} /></figure>
                        <h4 style={{color:"#01a601"}}>Thank you for submitting your Request!</h4>
                        <p>Your request has been sent to the Dealer, We will notify once you received the quote from Dealer.</p>
                    </div>
                </div>
            </Modal>

            <Footer />
        </>
    );
}

export default GarageCorporatePortalRequestList