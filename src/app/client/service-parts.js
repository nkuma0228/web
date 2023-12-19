import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import MapContainer from './custom-map-parts';
import _ from 'lodash'
import FORM from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { vehicleList } from "../../redux/actions/client/searchAction";

import Header from "./header";
import Footer from "./footer";

const initialState = {
    myVehicle:'',
    location:'',
    partType:'',
    services:'',
    notes:'',
    part_number:'',
    commonEmpty:''
}

const initialAddressState = {
    autoLocation:'',
    autoCity:'',
    autoPostalCode:'',
    autoCountries:'',
    autoProvince:'',
    autoLatitude:'',
    autoLongitude:'',
}

const ServiceParts = () => {
    const { i18n, t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [cState, updateCState] = useState(initialState);
    const {
        myVehicle,
        location,
        partType,
        services,
        notes,
        part_number,
        commonEmpty,
    } = cState

    const [addState, updateAddState] = useState(initialAddressState);
    const {
        autoLocation,
        autoCity,
        autoPostalCode,
        autoCountries,
        autoProvince,
        autoLatitude,
        autoLongitude,
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

        var latitude = place.geometry.location.lat();
        var longitude = place.geometry.location.lng();

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
            autoProvince: getState,
            autoLatitude: latitude,
            autoLongitude: longitude
        })
    }

    const getListData = useSelector(state => state.searching)
    const { clientVehicleData } = getListData
    useEffect(() => {
        const data = {keyword:''}
        dispatch(vehicleList(data))
    },[])
    
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
        var getLatitude = "" 
        var getLongitude = ""

        var geocoder = new window.google.maps.Geocoder();
        try {
            await geocoder.geocode({ 'address': location }, function handleResults(results, status) {
                
                if (status === window.google.maps.GeocoderStatus.OK) {

                    getLatitude = results[0].geometry.location.lat();
                    getLongitude = results[0].geometry.location.lng();
                    
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
                        autoProvince: getState,
                        autoLatitude: getLatitude,
                        autoLongitude: getLongitude
                    })
                }
            });
        } catch(error) {
        }
        if(!getCity && !getState) {
            try {
                await geocoder.geocode({ 'address': addState.autoCity }, function handleResults(results, status) {
                    
                    if (status === window.google.maps.GeocoderStatus.OK) {

                        getLatitude = results[0].geometry.location.lat();
                        getLongitude = results[0].geometry.location.lng();

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
                            autoProvince: getState,
                            autoLatitude: getLatitude,
                            autoLongitude: getLongitude
                        })
                    }
                });
            } catch(error) {}
        }
    }

    const [partTypeChecked, setPartTypeChecked] = useState([
        { name:'New parts', checked: false },
        { name:'Used parts', checked: false },
        { name:'Rebuilt/Reconditioned', checked: false }
    ]);
    const handlePartTypeChange = (e) => {
        var isChecked = e.target.checked;
        const item = e.target.value;
        setPartTypeChecked(partTypeChecked.map( (type) => {
            if(type.name == item) {
                type.checked = isChecked
            }
            return { name:type.name, checked:type.checked }
        }));
    }
    const [servicesChecked, setServicesChecked] = useState([
        { name:'Oil Changes', checked: false },
        { name:'Filters', checked: false },
        { name:'Belts', checked: false },
        { name:'Hoses', checked: false },
        { name:'Tires', checked: false },
        { name:'Battery', checked: false },
        { name:'Shocks', checked: false },
        { name:'Lubricants', checked: false },
        { name:'Wipers', checked: false },
        { name:'Antifreeze', checked: false },
        { name:'Heating', checked: false },
        { name:'Auto cleaning products', checked: false },
        { name:'Engine Parts', checked: false },
        { name:'Spark Plugs', checked: false },
        { name:'Air Con / Heating', checked: false },
        { name:'Electricals', checked: false },
        { name:'Brake Pads', checked: false },
        { name:'Rotors', checked: false },
        { name:'Wipers Module', checked: false },
        { name:'Calipers', checked: false },
        { name:'Lights and Bulbs', checked: false },
        { name:'Auto Body parts', checked: false },
        { name:'Paints', checked: false },
        { name:'Starters and Alternators', checked: false },
        { name:'Roof Racks and Carriers', checked: false },
        { name:'Auto Covers', checked: false },
        { name:'Exhaust Systems', checked: false }
    ]);
    const handleServicesChange = (e) => {
        var isChecked = e.target.checked;
        const item = e.target.value;
        setServicesChecked(servicesChecked.map( (type) => {
            if(type.name == item) {
                type.checked = isChecked
            }
            return { name:type.name, checked:type.checked }
        }));
    }

    const handleValidation = () => {

        let formIsValid = true;
        if(!myVehicle.trim()) {
            toast.error("Please select vehicle", {
                position: toast.POSITION.TOP_RIGHT
            });
            formIsValid = false;
        }
        return formIsValid;
    }

    let handleSubmit = async (event) => {   
        event.preventDefault();
        let formIsValid = handleValidation();
        if (formIsValid) {
            let selectedServices = [];
            servicesChecked.map((item) => {
                if(item.checked == true) {
                    selectedServices.push(item.name)
                }
            })
            let selectedPartType = [];
            partTypeChecked.map((item) => {
                if(item.checked == true) {
                    selectedPartType.push(item.name)
                }
            })
            let vehicleDetail = clientVehicleData.filter(function(item) {
                if(item._id == myVehicle) {
                    return item;
                }
            })
            let randomRequestNumber = Math.round(+new Date()/1000);
            
            var data = {
                requestNumber:randomRequestNumber,
                myVehicle,
                location:autoLocation,
                city:autoCity,
                province:autoProvince,
                postalCode:autoPostalCode,
                country:autoCountries,
                latitude: autoLatitude,
                longitude: autoLongitude,
                partType:selectedPartType,
                services:selectedServices,
                part_number,
                notes,
                vehicleDetail:vehicleDetail
            }

            window.localStorage.setItem('searchingPartsStorage',  JSON.stringify(data))
            navigate("/client/service-parts/list")
        }
    }

    return (
        <>
            <ToastContainer/>
            <Header />

            <div className="WrapperArea">
                <div className="WrapperBox"> 

                    <div className="TitleBox">
                        <h4> { t('client.sidebar.ServiceParts') } </h4>
                    </div>
                
                    <div className="Small-Wrapper">
                        <div className="GaragesForm">
                            
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <h6> { t('client.search.WelcometoAutowizHoware') } </h6>
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

                                    <div className="col-sm-6" style={{ marginTop: "20px" }}>
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
                                            <label>{ t('client.search.Selectparttype') }</label>
                                            <ul>
                                                <li>
                                                    <label className="CheckBox"> { t('website.PartsType.NewParts') }
                                                        <input type="checkbox" name="partType" value="New parts" onChange={handlePartTypeChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('website.PartsType.UsedParts') }
                                                        <input type="checkbox" name="partType" value="Used parts" onChange={handlePartTypeChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('website.PartsType.RebuiltReconditioned') }
                                                        <input type="checkbox" name="partType" value="Rebuilt/Reconditioned" onChange={handlePartTypeChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <label> { t('client.search.Selectservices') } </label>
                                            <ul>
                                                <li>
                                                    <label className="CheckBox"> { t('website.PartsOffered.OilChanges') }
                                                        <input type="checkbox" name="services" value="Oil Changes" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('website.PartsOffered.Filters') }
                                                        <input type="checkbox" name="services" value="Filters" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('website.PartsOffered.Belts') }
                                                        <input type="checkbox" name="services" value="Belts" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('website.PartsOffered.Hoses') }
                                                        <input type="checkbox" name="services" value="Hoses" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('website.PartsOffered.Tires') }
                                                        <input type="checkbox" name="services" value="Tires" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('website.PartsOffered.Battery') }
                                                        <input type="checkbox" name="services" value="Battery" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('website.PartsOffered.Shocks') }
                                                        <input type="checkbox" name="services" value="Shocks" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('website.PartsOffered.Lubricants') }
                                                        <input type="checkbox" name="services" value="Lubricants" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>

                                                <li>
                                                    <label className="CheckBox"> { t('website.PartsOffered.Wipers') }
                                                        <input type="checkbox" name="services" value="Wipers" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('website.PartsOffered.Antifreeze') }
                                                        <input type="checkbox" name="services" value="Antifreeze" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('website.PartsOffered.Heating') }
                                                        <input type="checkbox" name="services" value="Heating" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('website.PartsOffered.Autocleaningproducts') }
                                                        <input type="checkbox" name="services" value="Auto cleaning products" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('website.PartsOffered.EngineParts') }
                                                        <input type="checkbox" name="services" value="Engine Parts" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('website.PartsOffered.SparkPlugs') }
                                                        <input type="checkbox" name="services" value="Spark Plugs" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('website.PartsOffered.AirConHeating') }
                                                        <input type="checkbox" name="services" value="Air Con / Heating" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('website.PartsOffered.Electricals') }
                                                        <input type="checkbox" name="services" value="Electricals" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('website.PartsOffered.BrakePads') }
                                                        <input type="checkbox" name="services" value="Brake Pads" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('website.PartsOffered.Rotors') }
                                                        <input type="checkbox" name="services" value="Rotors" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('website.PartsOffered.WipersModule') }
                                                        <input type="checkbox" name="services" value="Wipers Module" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('website.PartsOffered.Calipers') }
                                                        <input type="checkbox" name="services" value="Calipers" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('website.PartsOffered.LightsandBulbs') }
                                                        <input type="checkbox" name="services" value="Lights and Bulbs" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('website.PartsOffered.AutoBodyparts') }
                                                        <input type="checkbox" name="services" value="Auto Body parts" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('website.PartsOffered.Paints') }
                                                        <input type="checkbox" name="services" value="Paints" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('website.PartsOffered.StartersandAlternators') }
                                                        <input type="checkbox" name="services" value="Starters and Alternators" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('website.PartsOffered.RoofRacksandCarriers') }
                                                        <input type="checkbox" name="services" value="Roof Racks and Carriers" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('website.PartsOffered.AutoCovers') }
                                                        <input type="checkbox" name="services" value="Auto Covers" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('client.search.Dontknow') }
                                                        <input type="checkbox"/>
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li> 
                                            </ul>
                                        </div>
                                    </div>
                                    
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <label> { t('client.search.Enterpartnumber') }: (Optional)  </label>
                                            <input type="text" className="form-control" name="part_number" value={part_number} onChange={handleInputChange} />
                                        </div>
                                    </div>

                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <label>{ t('client.search.Addnotes') } </label>
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

export default ServiceParts