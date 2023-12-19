import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import _ from 'lodash'
import Modal from 'react-bootstrap/Modal';
import Sucessfull from "../../assets/client/images/sucessfull.png"
import Product_Placeholder from "../../assets/client/images/Product_Placeholder.png"
import AutowizLoader from "../../assets/website/autowiz-loader.gif"

import Header from "./header";
import Footer from "./footer";

import { requestSalesCreate } from "../../redux/actions/corporate/providerAction";
import { salesSearch } from "../../redux/actions/corporate/searchAction";

const initialSearchState = {
    salesName:'',
    salesNameEmpty:''
}

const CorporateServiceSalesList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getListData = useSelector(state => state.searching)
    const { salesSearchData } = getListData
    
    let searchingStorage = window.localStorage.getItem('searchingSalesStorage')
    searchingStorage = JSON.parse(searchingStorage)

    if(window.localStorage.getItem('searchingSalesMoreStorage')) {
        var searchingSalesMoreStorage = window.localStorage.getItem('searchingSalesMoreStorage')
        searchingSalesMoreStorage = JSON.parse(searchingSalesMoreStorage)
    } else {
        var searchingSalesMoreStorage = {};
    }

    const [checkLoader, setCheckLoader] = useState("yes");

    const [removeObject, setRemoveObject] = useState([]);
    useEffect(() => {
        if(Object.keys(searchingSalesMoreStorage).length>0) {
            setRemoveObject([]);
            var data = { salesName:searchingSalesMoreStorage.salesName, removeID:removeObject }
        } else {
            var data = {
                location:searchingStorage.location, 
                city:searchingStorage.city, 
                province:searchingStorage.province, 
                postalCode:searchingStorage.postalCode, 
                country:searchingStorage.country, 
                latitude:searchingStorage.latitude, 
                longitude:searchingStorage.longitude, 
                vehicleSalesType:searchingStorage.vehicleSalesType, 
                make:searchingStorage.make, 
                notes:searchingStorage.notes,
                removeID:removeObject 
            }
        }
        dispatch(salesSearch(data)).then(res => {
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
        window.localStorage.setItem("salesDetailID", id)
    }

    const [confirmationShow, setConfirmationShow] = useState(false);
    const handleConfirmationClose = () => {
        setConfirmationShow(false);
        if(Object.keys(searchingSalesMoreStorage).length>0) {
            var data = { salesName:searchingSalesMoreStorage.salesName, removeID:removeObject }
        } else {
            var data = {
                location:searchingStorage.location, 
                city:searchingStorage.city, 
                province:searchingStorage.province, 
                postalCode:searchingStorage.postalCode, 
                country:searchingStorage.country,  
                latitude:searchingStorage.latitude, 
                longitude:searchingStorage.longitude, 
                vehicleSalesType:searchingStorage.vehicleSalesType, 
                make:searchingStorage.make,
                notes:searchingStorage.notes, 
                removeID:removeObject 
            }
        }
        dispatch(salesSearch(data)).then(res => {
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
        if(Object.keys(searchingSalesMoreStorage).length>0) {
            var data = { salesName:searchingSalesMoreStorage.salesName, removeID:removeObject }
        } else {
            var data = {
                location:searchingStorage.location, 
                city:searchingStorage.city, 
                province:searchingStorage.province, 
                postalCode:searchingStorage.postalCode, 
                country:searchingStorage.country,  
                latitude:searchingStorage.latitude, 
                longitude:searchingStorage.longitude, 
                vehicleSalesType:searchingStorage.vehicleSalesType, 
                make:searchingStorage.make,
                notes:searchingStorage.notes, 
                removeID:removeObject 
            }
        }
        dispatch(salesSearch(data)).then(res => {
            if (res.code == 200) {
                setCheckLoader("no")
            } else {
                setCheckLoader("empty")
            }
        }).catch(err => {
            setCheckLoader("empty")
        })
    }

    const handleConfirmationShow = (pid, vid) => { 
        if(Object.keys(searchingSalesMoreStorage).length>0) {
            var data = { provider_id:pid, vehicle_id:vid, request_number:searchingStorage.requestNumber, provider_type:'sales', location:searchingStorage.location, vehicleSalesType:searchingStorage.vehicleSalesType, make:searchingStorage.make, notes:searchingStorage.notes, salesName:searchingSalesMoreStorage.salesName, removeID:removeObject }
        } else {
            var data = { provider_id:pid, vehicle_id:vid, request_number:searchingStorage.requestNumber, provider_type:'sales', location:searchingStorage.location, vehicleSalesType:searchingStorage.vehicleSalesType, make:searchingStorage.make, notes:searchingStorage.notes, removeID:removeObject }
        }
        dispatch(requestSalesCreate(data)).then(res => {
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
        salesName,
        salesNameEmpty,
    } = searchState

    const handleInputSearchChange = (e) => {
        const { name, value } = e.target
        updateSearchState({
            ...searchState, [name]: value
        })
    }
    const handleValidation = () => {

        let formIsValid = true;

        if(!salesName.trim()) {
            toast.error("Please enter auto dealer name", {
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
                salesName
            }
            window.localStorage.setItem('searchingSalesMoreStorage',  JSON.stringify(data))
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
                        <h4>Request Quotes from nearby Auto Dealer</h4>
                    </div>
                    {
                        (checkLoader=="no")?
                            salesSearchData && salesSearchData && salesSearchData.length>0 ? 
                                
                                removeObject.length < 5 ?
                                    salesSearchData.map( (item, i) => 
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
                                                            <Link to="/corporate/service-auto-sales/detail" className="views" target="_blank" onClick={() => handleDetail(item._id)}> View Profile  </Link>
                                                            <a href="javascript:void(0);" className="Accept" onClick={() => handleConfirmationShow(item._id, item._id)}>Request Quote</a>
                                                            <a href="javascript:void(0);" className="Decline" onClick={() => handleRemove(item._id)}>Decline</a>
                                                        </aside>
                                                    </article>                            
                                                    <article>
                                                        <aside>
                                                            <h6>Auto Dealer Contact Info</h6>
                                                            <div>
                                                            <p><b>Email Address:</b> { item.email }  <b>Mobile Number:</b> { item.telephone } </p>
                                                            </div>
                                                        </aside>
                                                    </article>
                                                    <article>
                                                        <aside>
                                                            <h5>Manufacture: <span> { item.manufacturer.join(", ") } </span></h5>
                                                        </aside>
                                                    </article>
                                                </figcaption>
                                            </div>
                                            <div className="GaragesMiddle">
                                                {/* <aside>
                                                    {  <p>Vehicle Model: <span> { item.model }</span> Vehicle Make: <span>{ item.make } </span> Vehicle Mileage: <span> { item.mileage } </span></p> }
                                                </aside> */}
                                            </div> 
                                        </div>
                                    )
                                :
                                    <div className='row'>
                                        <div class="col-md-12">
                                            <form onSubmit={handleSearchSubmit}>
                                                <div class="col-sm-6">
                                                    <div class="form-group">
                                                        <label>Search by auto sales business name</label>
                                                        <input type="text" class="form-control" placeholder="Enter Auto Sales business name" name="salesName" value={salesName} onChange={handleInputSearchChange}/>
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
                        <p> Your request has been sent to the Auto Dealer, The auto delaer will contact you shortly with a reply. </p>
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

export default CorporateServiceSalesList