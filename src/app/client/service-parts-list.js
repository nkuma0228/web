import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import _ from 'lodash'
import { useTranslation } from 'react-i18next';

import Modal from 'react-bootstrap/Modal';
import Sucessfull from "../../assets/client/images/sucessfull.png"
import Product_Placeholder from "../../assets/client/images/Product_Placeholder.png"
import AutowizLoader from "../../assets/website/autowiz-loader.gif"

import Header from "./header";
import Footer from "./footer";

import { requestDealerCreate } from "../../redux/actions/client/providerAction";
import { dealerSearch } from "../../redux/actions/client/searchAction";

const initialSearchState = {
    dealerName:'',
    dealerNameEmpty:''
}

var imagePreview = [];
var imageFile = [];

const ServicePartsList = () => {
    const { i18n, t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getListData = useSelector(state => state.searching)
    const { dealerSearchData } = getListData
    let searchingStorage = window.localStorage.getItem('searchingPartsStorage')
    searchingStorage = JSON.parse(searchingStorage)
    
    if(window.localStorage.getItem('searchingMoreStorage')) {
        var searchingMoreStorage = window.localStorage.getItem('searchingMoreStorage')
        searchingMoreStorage = JSON.parse(searchingMoreStorage)
    } else {
        var searchingMoreStorage = {};
    }

    const [checkLoader, setCheckLoader] = useState("yes");

    const [removeObject, setRemoveObject] = useState([]);
    useEffect(() => {
        if(Object.keys(searchingMoreStorage).length>0) {
            setRemoveObject([]);
            var data = { dealerName:searchingMoreStorage.dealerName, removeID:removeObject}
        } else {
            var data = { 
                myVehicle:searchingStorage.myVehicle, 
                vehicleType:searchingStorage.vehicleDetail[0].type?searchingStorage.vehicleDetail[0].type:'',
                vehicleManufacturer:searchingStorage.vehicleDetail[0].make?searchingStorage.vehicleDetail[0].make:'',
                location:searchingStorage.location, 
                city:searchingStorage.city,
                province:searchingStorage.province,
                postalCode:searchingStorage.postalCode, 
                country:searchingStorage.country, 
                latitude:searchingStorage.latitude, 
                longitude:searchingStorage.longitude,
                partType:searchingStorage.partType,
                services:searchingStorage.services, 
                notes:searchingStorage.notes, 
                removeID:removeObject 
            }
        }
        dispatch(dealerSearch(data)).then(res => {
            if (res.code == 200) {
                setCheckLoader("no")
            } else {
                setCheckLoader("no")
            }
        }).catch(err => {
            setCheckLoader("no")
        })
    },[])

    useEffect(() => {
        if(dealerSearchData && dealerSearchData.length<=0) {
            window.localStorage.removeItem("searchingMoreStorage")
        }
    },[dealerSearchData])

    const handleDetail = (id) => {
        window.localStorage.setItem("dealerDetailID", id)
    }
    
    const [confirmationShow, setConfirmationShow] = useState(false);
    const handleConfirmationClose = () => {
        setConfirmationShow(false);
        if(Object.keys(searchingMoreStorage).length>0) {
            var data = { garageName:searchingMoreStorage.dealerName, removeID:removeObject }
        } else {
            var data = { 
                myVehicle:searchingStorage.myVehicle, 
                vehicleType:searchingStorage.vehicleDetail[0].type?searchingStorage.vehicleDetail[0].type:'',
                vehicleManufacturer:searchingStorage.vehicleDetail[0].make?searchingStorage.vehicleDetail[0].make:'',
                location:searchingStorage.location, 
                city:searchingStorage.city, 
                province:searchingStorage.province, 
                postalCode:searchingStorage.postalCode, 
                country:searchingStorage.country, 
                latitude:searchingStorage.latitude, 
                longitude:searchingStorage.longitude, 
                partType:searchingStorage.partType, 
                services:searchingStorage.services, 
                notes:searchingStorage.notes, 
                removeID:removeObject 
            }
        }
        dispatch(dealerSearch(data)).then(res => {
            if (res.code == 200) {
                setCheckLoader("no")
            } else {
                setCheckLoader("no")
            }
        }).catch(err => {
            setCheckLoader("no")
        })
    }

    const handleRemove = (id) => {
        setCheckLoader("yes")
        var ids = removeObject
        ids.push(id)
        setRemoveObject(ids)
        if(Object.keys(searchingMoreStorage).length>0) {
            var data = { dealerName:searchingMoreStorage.dealerName, removeID:removeObject }
        } else {
            var data = { 
                myVehicle:searchingStorage.myVehicle, 
                vehicleType:searchingStorage.vehicleDetail[0].type?searchingStorage.vehicleDetail[0].type:'',
                vehicleManufacturer:searchingStorage.vehicleDetail[0].make?searchingStorage.vehicleDetail[0].make:'',
                location:searchingStorage.location, 
                city:searchingStorage.city, 
                province:searchingStorage.province, 
                postalCode:searchingStorage.postalCode, 
                country:searchingStorage.country,  
                latitude:searchingStorage.latitude, 
                longitude:searchingStorage.longitude, 
                partType:searchingStorage.partType, 
                services:searchingStorage.services, 
                notes:searchingStorage.notes, 
                removeID:removeObject 
            }
        }
        dispatch(dealerSearch(data)).then(res => {
            if (res.code == 200) {
                setCheckLoader("no")
            } else {
                setCheckLoader("empty")
            }
        }).catch(err => {
            setCheckLoader("empty")
        })
    }

    
    const handleConfirmationShow = (id) => { 
        if(Object.keys(searchingMoreStorage).length>0) {
            var data = { 
                provider_id:id, 
                request_number:searchingStorage.requestNumber, 
                provider_type:'dealer', 
                dealerName:searchingMoreStorage.dealerName, 
                removeID:removeObject,
                imageGallery:selectedImage?selectedImage.file:[]
            }
        } else {
            var data = { 
                provider_id:id, 
                request_number:searchingStorage.requestNumber, 
                provider_type:'dealer', 
                myVehicle:searchingStorage.myVehicle, 
                vehicleType:searchingStorage.vehicleDetail[0].type?searchingStorage.vehicleDetail[0].type:'', 
                vehicleManufacturer:searchingStorage.vehicleDetail[0].make?searchingStorage.vehicleDetail[0].make:'',
                location:searchingStorage.location, 
                latitude:searchingStorage.latitude, 
                longitude:searchingStorage.longitude, 
                partType:searchingStorage.partType, 
                services:searchingStorage.services, 
                part_number:searchingStorage.part_number, 
                notes:searchingStorage.notes, 
                removeID:removeObject,
                imageGallery:selectedImage?selectedImage.file:[]
            }
        }
        dispatch(requestDealerCreate(data)).then(res => {
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
        dealerName,
        dealerNameEmpty,
    } = searchState

    const handleInputSearchChange = (e) => {
        const { name, value } = e.target
        updateSearchState({
            ...searchState, [name]: value
        })
    }
    const handleValidation = () => {

        let formIsValid = true;

        if(!dealerName.trim()) {
            toast.error("Please enter dealer name", {
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
                dealerName
            }
            
            window.localStorage.setItem('searchingMoreStorage',  JSON.stringify(data))
            window.location.reload()
        }
    }

    const [imgShow, setImgShow] = useState(true);
    const handleImgClose = () => {
        setImgShow(false);
    }
    const handleImgOpen = () => {
        setImgShow(true);
    }

    const [selectedImage, setSelectedImage] = useState([]);
    const [selectedImagePreview, setSelectedImagePreview] = useState([]);
    const imageChange = (e) => {
        
        if(imagePreview.length <3) {
            if (e.target.files && e.target.files.length > 0) {
                
                imageFile.push(e.target.files[0])
                //const file = e.target.files[0]
                imagePreview.push(URL.createObjectURL(e.target.files[0]))
                setSelectedImage({ file: imageFile });
                setSelectedImagePreview(imagePreview);

                e.target.value = null;
            }
        } else {
            toast.error("Image can not be upload more than 3", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }

    const removeSelectedImage = (i) => {
        imagePreview.splice(i, 1)
        imageFile.splice(i, 1)
        setSelectedImage({ file: imageFile });
        setSelectedImagePreview(imagePreview);
    };

    return (
        <>
            <ToastContainer/>
            <Header />

            <div className="WrapperArea">
                <div className="WrapperBox"> 
                    <div className="TitleBox">
                        <h4>
                            Request Quotes from nearby Dealers
                        </h4>
                        {
                                dealerSearchData && dealerSearchData && dealerSearchData.length>0 ?
                                    <a href="javascript:void(0);" className="Accept" onClick={handleImgOpen}>Upload Part Images</a> 
                                :
                                ""
                            }
                    </div>
                    {   
                        (checkLoader=="no")?
                            dealerSearchData && dealerSearchData && dealerSearchData.length>0 ?  

                                removeObject.length < 5 ?
                                    dealerSearchData.map( (item, i) => 
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
                                                            <h5>Owned by <span>{ item.firstName } { item.lastName }</span></h5>
                                                        </aside>
                                                        <aside>
                                                            <Link to="/client/service-parts/detail" className="views" onClick={() => handleDetail(item._id)}> View Profile  </Link>
                                                            <a href="javascript:void(0);" className="Accept" onClick={() => handleConfirmationShow(item._id)}>Request Quote</a>
                                                            <a href="javascript:void(0);" className="Decline" onClick={() => handleRemove(item._id)}>Decline</a>
                                                        </aside>
                                                    </article>
                                                    <article>
                                                        <aside>
                                                            <h6>Garage Contact Info</h6>
                                                            <p><b>Email Address:</b> { item.email }</p>
                                                            <p><b>Mobile Number:</b> { item.telephone }</p>
                                                            {/* <p>Address: { item.number }, { item.street }, { item.city }, { item.province } </p>  */}
                                                        </aside>
                                                    </article>
                                                    <article>
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
                                                    { searchingStorage.services ? <p>Requested Services: <span> { searchingStorage.services && searchingStorage.services.map((item)=> item+ ', ' )} </span></p> : '' }
                                                </aside>
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
                                                        <label>Search by dealer business name</label>
                                                        <input type="text" class="form-control" placeholder="Enter Dealer business name" name="dealerName" value={dealerName} onChange={handleInputSearchChange}/>
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
                                    <div class="col-md-12" style={{"textAlign":"center"}}>
                                        No Result Found
                                    </div>
                                </div>
                        :
                            (checkLoader=="empty")?
                                <div className='row'>
                                    <div class="col-md-12" style={{"textAlign":"center"}}>
                                        No Result Found
                                    </div>
                                </div>
                            :
                                <div className='row'>
                                    <div class="col-md-12" style={{"textAlign":"center"}}>
                                        <img src={AutowizLoader} />
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
                        <p>Your request has been sent to the Dealer, The dealer will contact you shortly with a reply.</p>
                    </div>
                </div>
            </Modal>
            
            {
                dealerSearchData && dealerSearchData && dealerSearchData.length>0 ?
            
                    <Modal show={imgShow} className="PanelModal ImageModal">
                        <div className="modal-body">
                            <div className="CongratulationsBox">
                                <a href="javascript:void(0);" type="button" className="Close" onClick={handleImgClose}>&times;</a>
                                
                                <h4>You can upload a images of your car parts (Its optional)</h4>
                                <div>
                                    <div className="form-group">
                                        <ul className="ImaesGroup">
                                            <li>
                                                <div className="AddImages">
                                                    <span><i className="fa fa-plus" aria-hidden="true"></i></span>
                                                    <p>{ t('website.signup.AddImages') }</p>
                                                    <input type="file" accept="image/*" name="images" onChange={imageChange}/>
                                                </div>
                                            </li>
                                            {
                                                selectedImagePreview && (selectedImagePreview.length > 0) ? 
                                                selectedImagePreview.map((img, i) =>
                                                        <li key={i}>
                                                            <button type="button" className="Close" onClick={()=>removeSelectedImage(i)}>×</button>
                                                            <img src={img} />
                                                        </li>
                                                    )
                                                : ""
                                            }
                                        </ul>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <a href="javascript:void(0);" className="Accept" onClick={handleImgClose}>Upload (Required)</a>
                                    <a href="javascript:void(0);" className="Decline" onClick={handleImgClose}>Close (Not Required)</a>
                                </div>
                            </div>
                        </div>
                    </Modal>
                :
                ""
            }

            <Footer />
        </>
    );
}

export default ServicePartsList