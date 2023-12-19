import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import MapContainer from './custom-map-corporate';
import { useTranslation } from 'react-i18next';

import _ from 'lodash'
import FORM from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { vehicleList } from "../../redux/actions/client/searchAction";

import Header from "./header";
import Footer from "./footer";

const initialState = {
    myVehicle: '',
    location:'',
    notes:'',
    commonEmpty:''
}

const initialAddressState = {
    autoLocation:'',
    autoCity:'',
    autoPostalCode:'',
    autoCountries:'',
    autoProvince:''
}

const ServiceClientCorporate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { i18n, t } = useTranslation();

    const getListData = useSelector(state => state.clientVehicle)
    const { clientVehicleData } = getListData
    useEffect(() => {
        const data = {keyword:''}
        dispatch(vehicleList(data))

        window.localStorage.removeItem('searchingStorage')
        window.localStorage.removeItem('searchingMoreStorage')
    },[])

    const [cState, updateCState] = useState(initialState);
    const {
        myVehicle,
        location,
        notes,
        commonEmpty
    } = cState

    const [addState, updateAddState] = useState(initialAddressState);
    const {
        autoLocation,
        autoCity,
        autoPostalCode,
        autoCountries,
        autoProvince
    } = addState

    const autoCompleteRef = useRef();
    const inputRef = useRef();
    const options = {
        fields: ["address_components", "geometry", "icon", "name"],
        types: ["establishment"]
    };
    useEffect(() => {
        autoCompleteRef.current = new window.google.maps.places.Autocomplete(
            inputRef.current,
            options
        );

        autoCompleteRef.current.addListener("place_changed", handleLocationData);
    }, []);

    const handleLocationData = () => {
        const place = autoCompleteRef.current.getPlace();

        for(var j=0;j<place.address_components.length;j++) {
            if(place.address_components[j]['types'][0] == 'country') {
                var getCountry = place.address_components[j]['long_name'];
            }
            if(place.address_components[j]['types'][0] == 'administrative_area_level_1') {
                var getState = place.address_components[j]['long_name'];
            }

            if(place.address_components[j]['types'][0] == 'locality') {
                var getCity = place.address_components[j]['long_name'];
            } else {
                if (place.address_components[j]['types'][0] == 'administrative_area_level_4') {
                    if(getCity.length <= 0) {
                        var getCity = place.address_components[j]['long_name'];
                    }
                } else {
                    if (place.address_components[j]['types'][0] == 'administrative_area_level_3') {
                        if(getCity.length <= 0) {
                            var getCity = place.address_components[j]['long_name'];
                        }
                    }
                }
            }
            if(place.address_components[j]['types'][0] == 'postal_code') {
                var getZipcode = place.address_components[j]['long_name'];
            }
        }

        updateAddState({
            ...addState,
            autoLocation:inputRef.current.value,
            autoCity:getCity, 
            autoPostalCode:getZipcode,
            autoCountries:getCountry,
            autoProvince: getState
        })
    }
    
    const handleInputChange = (e) => {
        const { name, value } = e.target
        updateCState({
            ...cState, [name]: value
        })
    }

    const handleInputAddressChange = (e) => {
        const { name, value } = e.target
        var previousAutoLocation = autoLocation

        updateAddState({
            ...addState, [name]: value
        })

        if(name === "autoLocation") {
            
            if(previousAutoLocation != value) {
                customHandleLocation(value)
            }
        }
        if(name === "autoCountries") {
            if(!autoCity && !autoProvince) {
                customHandleLocation(autoLocation)
            }
        }
    }

    const customHandleLocation = async (location) => {
        var getCountry = ""
        var getState = ""
        var getCity = ""
        var getZipcode = "" 
        var geocoder = new window.google.maps.Geocoder();
        try {
            await geocoder.geocode({ 'address': location }, function handleResults(results, status) {
                
                if (status === window.google.maps.GeocoderStatus.OK) {
                    
                    for(var j=0;j<results[0].address_components.length;j++) {
                        if(results[0].address_components[j]['types'][0] == 'country') {
                            var getCountry = results[0].address_components[j]['long_name'];
                        }
                        if(results[0].address_components[j]['types'][0] == 'administrative_area_level_1') {
                            var getState = results[0].address_components[j]['long_name'];
                        }
                        if(results[0].address_components[j]['types'][0] == 'locality') {
                            var getCity = results[0].address_components[j]['long_name'];
                        } else {
                            if (results[0].address_components[j]['types'][0] == 'administrative_area_level_4') {
                                if(getCity.length <= 0) {
                                    var getCity = results[0].address_components[j]['long_name'];
                                }
                            } else {
                                if (results[0].address_components[j]['types'][0] == 'administrative_area_level_3') {
                                    if(getCity.length <= 0) {
                                        var getCity = results[0].address_components[j]['long_name'];
                                    }
                                }
                            }
                        }
                        if(results[0].address_components[j]['types'][0] == 'postal_code') {
                            var getZipcode = results[0].address_components[j]['long_name'];
                        }
                    }
                    updateAddState({
                        ...addState,
                        autoLocation:inputRef.current.value,
                        autoCity:getCity, 
                        autoPostalCode:getZipcode,
                        autoCountries:getCountry,
                        autoProvince: getState
                    })
                }
            });
        } catch(error) {
        }
        if(!getCity && !getState) {
            try {
                await geocoder.geocode({ 'address': addState.autoCity }, function handleResults(results, status) {
                    
                    if (status === window.google.maps.GeocoderStatus.OK) {

                        for(var j=0;j<results[0].address_components.length;j++) {
                            if(results[0].address_components[j]['types'][0] == 'country') {
                                var getCountry = results[0].address_components[j]['long_name'];
                            }
                            if(results[0].address_components[j]['types'][0] == 'administrative_area_level_1') {
                                var getState = results[0].address_components[j]['long_name'];
                            }
                            if(results[0].address_components[j]['types'][0] == 'locality') {
                                var getCity = results[0].address_components[j]['long_name'];
                            } else {
                                if (results[0].address_components[j]['types'][0] == 'administrative_area_level_4') {
                                    if(getCity.length <= 0) {
                                        var getCity = results[0].address_components[j]['long_name'];
                                    }
                                } else {
                                    if (results[0].address_components[j]['types'][0] == 'administrative_area_level_3') {
                                        if(getCity.length <= 0) {
                                            var getCity = results[0].address_components[j]['long_name'];
                                        }
                                    }
                                }
                            }
                            if(results[0].address_components[j]['types'][0] == 'postal_code') {
                                var getZipcode = results[0].address_components[j]['long_name'];
                            }
                        }
                        updateAddState({
                            ...addState,
                            autoLocation:inputRef.current.value,
                            autoCity:getCity, 
                            autoPostalCode:getZipcode,
                            autoCountries:getCountry,
                            autoProvince: getState
                        })
                    }
                });
            } catch(error) {}
        }
    }

    const handleValidation = () => {
        let formIsValid = true;
        
        if(!autoLocation.trim()) {
            toast.error("Please select location", {
                position: toast.POSITION.TOP_RIGHT
            });
            formIsValid = false;
        }

        if(autoCity == undefined) {
            toast.error("Please select location from auto suggestion list", {
                position: toast.POSITION.TOP_RIGHT
            });
            formIsValid = false;
        } else {
            if(!autoCity.trim()) {
                toast.error("Please select location from auto suggestion list", {
                    position: toast.POSITION.TOP_RIGHT
                });
                formIsValid = false;
            }
        }
        return formIsValid;
    }

    let handleSubmit = async (event) => {   
        event.preventDefault();
        let formIsValid = handleValidation();
        if (formIsValid) {

            let vehicleDetail = clientVehicleData.filter(function (item) {
                if (item._id == myVehicle) {
                    return item;
                }
            })

            let randomRequestNumber = Math.round(+new Date()/1000);
            
            const data = {
                requestNumber:randomRequestNumber,
                myVehicle,
                location:autoLocation,
                city:autoCity,
                province:autoProvince,
                postalCode:autoPostalCode,
                country:autoCountries,
                notes,
                vehicleDetail: vehicleDetail
            }
            window.localStorage.setItem('searchingCorporateStorage',  JSON.stringify(data))
            navigate("/client/service-corporate/list")
        }
    }

    return (
        <>
            <ToastContainer/>
            <Header />

            <div className="WrapperArea">
                <div className="WrapperBox"> 

                    <div className="TitleBox">
                        <h4>{ t('client.search.ServiceCorporate') }</h4>
                    </div>
                
                    <div className="Small-Wrapper">
                        <div className="GaragesForm">
                            
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <h6>{ t('client.search.WelcomeAutowizCorporate') }</h6>
                                        </div>
                                    </div>

                                    <div className="col-sm-12">
                                        <div className='row'>
                                            <MapContainer />
                                        </div>
                                    </div>

                                    <div className="col-sm-6" style={{ marginTop: "20px" }}>
                                        <div className="form-group">
                                            <label>{ t('client.search.Selectyourvehicle') }</label>
                                            <select className="form-control" name="myVehicle" onChange={handleInputChange}>
                                                <option value=""> Select </option>
                                                {
                                                    clientVehicleData && clientVehicleData.map((item) =>
                                                        <option value={item._id}> {item.vehicleNumber} {item.model} {item.make} {item.year} {item.type} </option>        
                                                    )
                                                }
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-sm-12" style={{ marginTop: "20px" }}>
                                        <div className="form-group">
                                            <label>{ t('client.search.Pleasestateaddress') }</label>
                                            <input type="text" className="form-control" ref={inputRef} placeholder="Enter Location" name="autoLocation" value={autoLocation} onChange={handleInputAddressChange}/>
                                            <input type="hidden" name="autoCity" value={autoCity} onChange={handleInputAddressChange} />
                                            <input type="hidden" name="autoPostalCode" value={autoPostalCode} onChange={handleInputAddressChange} />
                                            <input type="hidden" name="autoProvince" value={autoProvince} onChange={handleInputAddressChange} />
                                            <input type="hidden" name="autoCountries" value={autoCountries} onChange={handleInputAddressChange} />
                                        </div>
                                    </div>

                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <label> { t('client.search.Addnotes') } </label>
                                            <textarea rows="2" className="form-control" name="notes" value={notes} onChange={handleInputChange}></textarea>
                                        </div>
                                    </div>

                                    <div className="col-sm-12">
                                        <button type="submit" className="Accept">{ t('client.search.Search') }</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div> 

            <Footer />
        </>
    );
}

export default ServiceClientCorporate