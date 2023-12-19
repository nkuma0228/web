import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';

import MapContainer from './custom-map';
import _ from 'lodash'
import FORM from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { vehicleList } from "../../redux/actions/client/searchAction";

import Header from "./header";
import Footer from "./footer";

const initialState = {
    myVehicle: '',
    services: '',
    towTruck: '',
    notes: '',
    imageGallery:'',
    commonEmpty: ''
}

const initialAddressState = {
    autoLocation: '',
    autoCity: '',
    autoPostalCode: '',
    autoCountries: '',
    autoProvince: '',
    autoLatitude:'',
    autoLongitude:'',
}

const serviceSelection = [];

const ServiceGarage = () => {
    const { i18n, t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [cState, updateCState] = useState(initialState);
    const {
        myVehicle,
        services,
        towTruck,
        notes,
        imageGallery,
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

    const [addCountry, updateCountryState] = useState("");

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

        for (var j = 0; j < place.address_components.length; j++) {
            if (place.address_components[j]['types'][0] == 'country') {
                var getCountry = place.address_components[j]['long_name'];
            }
            if (place.address_components[j]['types'][0] == 'administrative_area_level_1') {
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
            if (place.address_components[j]['types'][0] == 'postal_code') {
                var getZipcode = place.address_components[j]['long_name'];
            }
        }

        updateAddState({
            ...addState,
            autoLocation: inputRef.current.value,
            autoCity: getCity,
            autoPostalCode: getZipcode,
            autoCountries: getCountry,
            autoProvince: getState,
            autoLatitude: latitude,
            autoLongitude: longitude
        })
    }

    const child = useMemo(() => {
        
        return <MapContainer country={autoCountries} />
    }, [autoCountries]);

    const getListData = useSelector(state => state.searching)
    const { clientVehicleData } = getListData
    useEffect(() => {
        const data = { keyword: '' }
        dispatch(vehicleList(data))

        window.localStorage.removeItem('searchingStorage')
        window.localStorage.removeItem('searchingMoreStorage')
    }, [])

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

    const [servicesChecked, setServicesChecked] = useState([
        { name: 'Oil Changes', checked: false },
        { name: 'Diagnostic', checked: false },
        { name: 'Air Con / Heating', checked: false },
        { name: 'Transmission', checked: false },
        { name: 'Brakes', checked: false },
        { name: 'Glass Replacement', checked: false },
        { name: 'Suspension', checked: false },
        { name: 'Engine', checked: false },
        { name: 'Pipes & Exhaust', checked: false },
        { name: 'Electricals', checked: false },
        { name: 'Body Shop', checked: false },
        { name: 'Wheel Alignment', checked: false },
        { name: 'Tire Changes', checked: false },
        { name: 'Tank Replacement', checked: false },
        { name: 'Battery Changes', checked: false },
        { name: 'Hoses & Belts', checked: false },
        { name: 'Radiator', checked: false },
        { name: 'Wipers', checked: false },
        { name: 'Trailer Hitches', checked: false },
        { name: 'Boost', checked: false },
        { name: 'Door Locks', checked: false },
        { name: 'Gasoline', checked: false },
        { name: 'Towing', checked: false },
        { name: 'Steering', checked: false }
    ]);

    const handleServicesChange = (e) => {
        var isChecked = e.target.checked;
        const item = e.target.value;

        setServicesChecked(servicesChecked.map((type) => {
            if (type.name == item) {
                type.checked = isChecked
            }
            return { name: type.name, checked: type.checked }
        }));
    }

    const handleValidation = () => {
        let formIsValid = true;

        if (!myVehicle.trim()) {
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
            let selectedService = [];
            servicesChecked.map((item) => {
                if (item.checked == true) {
                    selectedService.push(item.name)
                }
            })
            let vehicleDetail = clientVehicleData.filter(function (item) {
                if (item._id == myVehicle) {
                    return item;
                }
            })
            let randomRequestNumber = Math.round(+new Date() / 1000);


            var data = {
                requestNumber: randomRequestNumber,
                myVehicle,
                location: autoLocation,
                city: autoCity,
                province: autoProvince,
                postalCode: autoPostalCode,
                country: autoCountries,
                latitude: autoLatitude,
                longitude: autoLongitude,
                services: selectedService,
                towTruck,
                notes,
                vehicleDetail: vehicleDetail
            }

            window.localStorage.setItem('searchingStorage', JSON.stringify(data))
            navigate("/client/service-garage/list")
        }
    }

    return (
        <>
            <ToastContainer />
            <Header />

            <div className="WrapperArea">
                <div className="WrapperBox">

                    <div className="TitleBox">
                        <h4>Service Garages</h4>
                    </div>

                    <div className="Small-Wrapper">
                        <div className="GaragesForm">
                            <div className="row">

                                <form onSubmit={handleSubmit}>

                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <h6> { t('client.search.WelcometoAutowizpleaseprovide') } </h6>
                                        </div>
                                    </div>

                                    <div className="col-sm-12">
                                        <div className='row'>
                                            {child}
                                        </div>
                                    </div>

                                    <div className="col-sm-12" style={{ marginTop: "20px" }}>
                                        <div className='row'>
                                            <div className="col-sm-6">
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

                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label>{ t('client.search.Pleasestateaddress') }</label>
                                                    <input type="text" className="form-control" ref={inputRef} placeholder="Enter Location" name="autoLocation" value={autoLocation} onChange={handleInputAddressChange} />
                                                    <input type="hidden" name="autoCity" value={autoCity} onChange={handleInputAddressChange} />
                                                    <input type="hidden" name="autoPostalCode" value={autoPostalCode} onChange={handleInputAddressChange} />
                                                    <input type="hidden" name="autoProvince" value={autoProvince} onChange={handleInputAddressChange} />
                                                    <input type="hidden" name="autoCountries" value={autoCountries} onChange={handleInputAddressChange} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <label> { t('client.search.Selectservices') } </label>
                                            <ul>
                                                <li>
                                                    <label className="CheckBox"> { t('website.repairType.OilChanges') }
                                                        <input type="checkbox" name="services" value="Oil Changes" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('website.repairType.Diagnostic') }
                                                        <input type="checkbox" name="services" value="Diagnostic" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('website.repairType.AirConHeating') }
                                                        <input type="checkbox" name="services" value="Air Con / Heating" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('website.repairType.Transmission') }
                                                        <input type="checkbox" name="services" value="Transmission" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('website.repairType.Brakes') }
                                                        <input type="checkbox" name="services" value="Brakes" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('website.repairType.GlassReplacement') }
                                                        <input type="checkbox" name="services" value="Glass Replacement" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('website.repairType.Suspension') }
                                                        <input type="checkbox" name="services" value="Suspension" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('website.repairType.Engine') }
                                                        <input type="checkbox" name="services" value="Engine" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>

                                                <li>
                                                    <label className="CheckBox"> { t('website.repairType.PipesExhaust') }
                                                        <input type="checkbox" name="services" value="Pipes & Exhaust" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('website.repairType.Electricals') }
                                                        <input type="checkbox" name="services" value="Electricals" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('website.repairType.BodyShop') }
                                                        <input type="checkbox" name="services" value="Body Shop" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('website.repairType.WheelAlignment') }
                                                        <input type="checkbox" name="services" value="Wheel Alignment" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('website.repairType.TireChanges') }
                                                        <input type="checkbox" name="services" value="Tire Changes" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('website.repairType.TankReplacement') }
                                                        <input type="checkbox" name="services" value="Tank Replacement" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('website.repairType.BatteryChanges') }
                                                        <input type="checkbox" name="services" value="Battery Changes" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('website.repairType.HosesBelts') }
                                                        <input type="checkbox" name="services" value="Hoses & Belts" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('website.repairType.Radiator') }
                                                        <input type="checkbox" name="services" value="Radiator" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('website.repairType.Wipers') }
                                                        <input type="checkbox" name="services" value="Wipers" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('website.repairType.TrailerHitches') }
                                                        <input type="checkbox" name="services" value="Trailer Hitches" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('website.repairType.Boost') }
                                                        <input type="checkbox" name="services" value="Boost" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('website.repairType.DoorLocks') }
                                                        <input type="checkbox" name="services" value="Door Locks" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('website.repairType.Gasoline') }
                                                        <input type="checkbox" name="services" value="Gasoline" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('website.repairType.Towing') }
                                                        <input type="checkbox" name="services" value="Towing" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('website.repairType.Steering') }
                                                        <input type="checkbox" name="services" value="Steering" onChange={handleServicesChange} />
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
                                            <label> { t('client.search.Doyouneedtowtruck') } </label>
                                            <ul>
                                                <li>
                                                    <label className="Radio"> { t('client.search.Yes') }
                                                        <input type="radio" name="towTruck" value="yes" onChange={handleInputChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="Radio"> { t('client.search.No') }
                                                        <input type="radio" name="towTruck" value="no" onChange={handleInputChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                            </ul>
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

                                </form>

                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <Footer />
        </>
    );
}

export default ServiceGarage