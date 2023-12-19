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

import { requestCreate } from "../../redux/actions/client/providerAction";
import { garageSearch } from "../../redux/actions/client/searchAction";

const initialSearchState = {
    garageName:'',
    garageNameEmpty:''
}
var imagePreview = [];
var imageFile = [];

const ServiceGarageList = () => {
    const { i18n, t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getListData = useSelector(state => state.searching)
    const { garageSearchData } = getListData
 
    let searchingStorage = window.localStorage.getItem('searchingStorage')
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
            var data = { garageName:searchingMoreStorage.garageName, removeID:removeObject, imageGallery:searchingStorage.imageGallery }
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
                services:searchingStorage.services, 
                towTruck:searchingStorage.towTruck, 
                notes:searchingStorage.notes, 
                imageGallery:searchingStorage.imageGallery, 
                removeID:removeObject 
            }
        }
        dispatch(garageSearch(data)).then(res => {
            if (res.code == 200) {
                setCheckLoader("no")
            } else {
                setCheckLoader("no")
            }
        }).catch(err => {
            setCheckLoader("no")
        })
    },[])

    const handleDetail = (id) => {
        window.localStorage.setItem("garageDetailID", id)
    }

    const [imgShow, setImgShow] = useState(false);
    const handleImgClose = () => {
        setImgShow(false);
    }
    const [confirmationShow, setConfirmationShow] = useState(false);
    const handleConfirmationClose = () => {
        setConfirmationShow(false);
        if(Object.keys(searchingMoreStorage).length>0) {
            var data = { garageName:searchingMoreStorage.garageName, removeID:removeObject, imageGallery:searchingStorage.imageGallery }
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
                services:searchingStorage.services, 
                towTruck:searchingStorage.towTruck, 
                notes:searchingStorage.notes, 
                imageGallery:searchingStorage.imageGallery, 
                removeID:removeObject 
            }
        }
        dispatch(garageSearch(data)).then(res => {
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
            var data = { garageName:searchingMoreStorage.garageName, removeID:removeObject, imageGallery:searchingStorage.imageGallery }
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
                services:searchingStorage.services, 
                towTruck:searchingStorage.towTruck, 
                notes:searchingStorage.notes, 
                imageGallery:searchingStorage.imageGallery,
                removeID:removeObject 
            }
        }
        dispatch(garageSearch(data)).then(res => {
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
                provider_type:'garage', 
                myVehicle:searchingStorage.myVehicle, 
                vehicleType:searchingStorage.vehicleDetail[0].type?searchingStorage.vehicleDetail[0].type:'',
                vehicleManufacturer:searchingStorage.vehicleDetail[0].make?searchingStorage.vehicleDetail[0].make:'',
                location:searchingStorage.location, 
                services:searchingStorage.services, 
                towTruck:searchingStorage.towTruck, 
                notes:searchingStorage.notes, 
                imageGallery:searchingStorage.imageGallery,
                garageName:searchingMoreStorage.garageName, 
                removeID:removeObject,
                imageGallery:selectedImage?selectedImage.file:[]
            }
        } else {
            var data = { 
                provider_id:id, 
                request_number:searchingStorage.requestNumber, 
                provider_type:'garage', 
                myVehicle:searchingStorage.myVehicle, 
                vehicleType:searchingStorage.vehicleDetail[0].type?searchingStorage.vehicleDetail[0].type:'',
                vehicleManufacturer:searchingStorage.vehicleDetail[0].make?searchingStorage.vehicleDetail[0].make:'',
                location:searchingStorage.location, 
                services:searchingStorage.services, 
                towTruck:searchingStorage.towTruck, 
                notes:searchingStorage.notes, 
                imageGallery:searchingStorage.imageGallery,
                removeID:removeObject,
                imageGallery:selectedImage?selectedImage.file:[]
            }
        }
        dispatch(requestCreate(data)).then(res => {
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
        garageName,
        garageNameEmpty,
    } = searchState

    const handleInputSearchChange = (e) => {
        const { name, value } = e.target
        updateSearchState({
            ...searchState, [name]: value
        })
    }
    const handleValidation = () => {

        let formIsValid = true;

        if(!garageName.trim()) {
            toast.error("Please enter garage name", {
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
                garageName,
                imageGallery:searchingStorage.imageGallery,
            }
            window.localStorage.setItem('searchingMoreStorage',  JSON.stringify(data))
            window.location.reload()
        }
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
                        <h4>Request Quotes from nearby garages</h4>
                    </div>
                    
                    {
                        (checkLoader=="no")?
                            garageSearchData && garageSearchData.getProviders && garageSearchData.getProviders.length>0 ? 
                                
                                removeObject.length < 5 ?
                                    garageSearchData.getProviders.map( (item, i) => 
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
                                                            <h5> { t('client.search.Ownedby') } <span>{ item.firstName } { item.lastName } </span> </h5>
                                                        </aside>
                                                        <aside>
                                                            <Link to="/client/service-garage/detail" className="views" target="_blank" onClick={() => handleDetail(item._id)}> View Profile  </Link>
                                                            <a href="javascript:void(0);" className="Accept" onClick={() => handleConfirmationShow(item._id)}>Request Quote</a>
                                                            <a href="javascript:void(0);" className="Decline" onClick={() => handleRemove(item._id)}>Decline</a>
                                                        </aside>
                                                    </article>                            
                                                    <article>
                                                        <aside>
                                                            <h6>Garage Contact Info</h6>
                                                            <div>
                                                            <p><b>{ t('client.account.EmailAddress') }:</b> { item.email }</p>
                                                            <p><b>{ t('client.account.Phonenumber') }:</b> { item.telephone }</p>
                                                            {/* <p><b>Address:</b> { item.number }, { item.street }, { item.city }, { item.province } </p>  */}
                                                            </div>
                                                        </aside>
                                                    </article>
                                                    <article>
                                                        <aside>
                                                            {
                                                                item.specialityService ?
                                                                    <>
                                                                        <h6>Special Services:</h6>
                                                                        <p>
                                                                            {   
                                                                                item.specialityService && item.specialityService.map((special) => 
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
                                                        <label>Search by garage business name</label>
                                                        <input type="text" class="form-control" placeholder="Enter Garage business name" name="garageName" value={garageName} onChange={handleInputSearchChange}/>
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
                        <h4>Thank you for submitting your Request!</h4>
                        <p> Your request has been sent to the Garage, The garage will contact you shortly with a reply. </p>
                        <div className="text-center">
                            <a href="javascript:void(0);" className="Accept" onClick={handleConfirmationClose}>Okay</a>
                        </div>
                    </div>
                </div>
            </Modal>

            <Modal show={imgShow} className="PanelModal ImageModal">
                <div className="modal-body">
                    <div className="CongratulationsBox">
                        <a href="javascript:void(0);" type="button" className="Close" onClick={handleImgClose}>&times;</a>
                        
                        <h4>Please upload images of your car</h4>
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
                            <a href="javascript:void(0);" className="Accept" onClick={handleImgClose}>Okay</a>
                        </div>
                    </div>
                </div>
            </Modal>

            <Footer />
        </>
    );
}

export default ServiceGarageList