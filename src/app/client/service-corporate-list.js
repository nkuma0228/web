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

import { requestCorporateCreate } from "../../redux/actions/client/providerAction";
import { corporateSearch } from "../../redux/actions/client/searchAction";

const initialSearchState = {
    corporateName:'',
    corporateNameEmpty:''
}

const ServiceClientCorporateList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getListData = useSelector(state => state.searching)
    const { corporateSearchData } = getListData
    
    let searchingStorage = window.localStorage.getItem('searchingCorporateStorage')
    searchingStorage = JSON.parse(searchingStorage)

    if(window.localStorage.getItem('searchingCorporateMoreStorage')) {
        var searchingCorporateMoreStorage = window.localStorage.getItem('searchingCorporateMoreStorage')
        searchingCorporateMoreStorage = JSON.parse(searchingCorporateMoreStorage)
    } else {
        var searchingCorporateMoreStorage = {};
    }

    const [removeObject, setRemoveObject] = useState([]);

    useEffect(() => {
        if(Object.keys(searchingCorporateMoreStorage).length>0) {
            setRemoveObject([]);
            var data = { corporateName:searchingCorporateMoreStorage.corporateName, removeID:removeObject }
        } else {
            var data = {
                myVehicle:searchingStorage.myVehicle, 
                vehicleType:searchingStorage.vehicleDetail[0].type?searchingStorage.vehicleDetail[0].type:'',
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

    const handleDetail = (id) => {
        window.localStorage.setItem("corporateDetailID", id)
    }

    const [confirmationShow, setConfirmationShow] = useState(false);
    const handleConfirmationClose = () => {
        setConfirmationShow(false);
        if(Object.keys(searchingCorporateMoreStorage).length>0) {
            var data = { corporateName:searchingCorporateMoreStorage.corporateName, removeID:removeObject }
        } else {
            var data = {
                myVehicle:searchingStorage.myVehicle, 
                vehicleType:searchingStorage.vehicleDetail[0].type?searchingStorage.vehicleDetail[0].type:'',
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
        if(Object.keys(searchingCorporateMoreStorage).length>0) {
            var data = { corporateName:searchingCorporateMoreStorage.corporateName, removeID:removeObject }
        } else {
            var data = {
                myVehicle:searchingStorage.myVehicle, 
                vehicleType:searchingStorage.vehicleDetail[0].type?searchingStorage.vehicleDetail[0].type:'',
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
        if(Object.keys(searchingCorporateMoreStorage).length>0) {
            var data = { 
                provider_id:id, 
                request_number:searchingStorage.requestNumber, 
                provider_type:'corporate', 
                myVehicle:searchingStorage.myVehicle, 
                vehicleType:searchingStorage.vehicleDetail[0].type?searchingStorage.vehicleDetail[0].type:'',
                location:searchingStorage.location, 
                notes:searchingStorage.notes, 
                corporateName:searchingCorporateMoreStorage.corporateName, 
                removeID:removeObject 
            }
        } else {
            var data = { 
                provider_id:id, 
                request_number:searchingStorage.requestNumber, 
                provider_type:'corporate', 
                myVehicle:searchingStorage.myVehicle, 
                vehicleType:searchingStorage.vehicleDetail[0].type?searchingStorage.vehicleDetail[0].type:'',
                location:searchingStorage.location, 
                notes:searchingStorage.notes,
                removeID:removeObject 
            }
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
            //console.log(err, 'err')
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
            window.localStorage.setItem('searchingCorporateMoreStorage',  JSON.stringify(data))
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
                        removeObject.length < 5 ?
                        corporateSearchData && corporateSearchData.getProviders && corporateSearchData.getProviders.length>0 ? corporateSearchData.getProviders.map( (item, i) => 
                                <div key={i} className="GaragesBox">
                                    <div className="GaragesHead">
                                        <figure>
                                            <img src={ item.imageGallery.length>0 ? item.imageGallery[0] : Product_Placeholder} />
                                            <span className="Rates"> { item.avgRating ? item.avgRating : 0 } <i className="fa fa-star"></i></span>
                                        </figure>
                                        <figcaption>
                                            <article>
                                                <aside class="garageViewProfile">
                                                    <h4> { item.business }</h4>
                                                    <h5>Owned by <span>{ item.firstName } { item.lastName } </span> </h5>
                                                </aside>
                                                <aside>
                                                    <Link to="/client/service-corporate/detail" className="views" target="_blank" onClick={() => handleDetail(item._id)}> View Profile  </Link>
                                                    <a href="javascript:void(0);" className="Accept" onClick={() => handleConfirmationShow(item._id)}>Request Quote</a>
                                                    <a href="javascript:void(0);" className="Decline" onClick={() => handleRemove(item._id)}>Decline</a>
                                                </aside>
                                            </article>                            
                                            <article>
                                                <aside>
                                                    <h6>Corporate Contact Info</h6>
                                                    <div>
                                                    <p><b>Email Address:</b> { item.email }  <b>Mobile Number:</b> { item.telephone } </p>
                                                    </div>
                                                </aside>
                                            </article>
                                            
                                        </figcaption>
                                    </div>
                                    <div className="GaragesMiddle">
                                        <aside>
                                        {  searchingStorage.vehicleDetail ?  <p>Vehicle: <span> { searchingStorage.vehicleDetail[0].vehicleNumber } { searchingStorage.vehicleDetail[0].model } { searchingStorage.vehicleDetail[0].make } { searchingStorage.vehicleDetail[0].type } { searchingStorage.vehicleDetail[0].year } </span></p> : '' }
                                        </aside>
                                    </div> 
                                </div>
                            )
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
                        <h4>Thank you for submitting your Request!</h4>
                        <p> Your request has been sent to the Corporate, The corporate will contact you shortly with a reply. </p>
                        <div className="text-center">
                            <a href="javascript:void(0);" className="Accept" onClick={handleConfirmationClose}>Okay</a>
                        </div>
                    </div>
                </div>
            </Modal>

            <Footer />
        </>
    );
}

export default ServiceClientCorporateList