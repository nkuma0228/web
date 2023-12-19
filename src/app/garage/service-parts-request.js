import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import _ from 'lodash'
import FORM from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { manufacturerList, modelList, vehicleList } from "../../redux/actions/provider/searchAction";

import MapContainer from './custom-map-parts';
import Header from "./header";
import Footer from "./footer";
import { nodeName } from 'rsuite/esm/DOMHelper';

const initialState = {
    myVehicle:'',
    make:'',
    model:'',
    location:'',
    partType:'',
    services:'',
    notes:'',
    part_number:'',
    commonEmpty:'',
    makeEmpty:'',
    modelEmpty:''
}

const initialAddressState = {
    autoLocation:'',
    autoCity:'',
    autoPostalCode:'',
    autoCountries:'',
    autoProvince:''
}

const GarageServicePartsRequest = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { i18n, t } = useTranslation();

    const getListData = useSelector(state => state.garageSearching)
    const { garageVehicleData, manufacturerData, modelData } = getListData
    
    useEffect(() => {
        const data = { status: ["Accepted"] }
        //dispatch(vehicleList(data))
        dispatch(manufacturerList())
    },[])

    const [cState, updateCState] = useState(initialState);
    const {
        myVehicle,
        make,
        model,
        location,
        partType,
        services,
        notes,
        part_number,
        commonEmpty,
        makeEmpty,
        modelEmpty
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
        console.log(place.address_components)
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
            ...cState,
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

        if(name == "make") {
            let dependentData = { name:value };
            dispatch(modelList(dependentData))
        }
    }

    const handleInputAddressChange = (e) => {
        const { name, value } = e.target
        updateAddState({
            ...addState, [name]: value
        })
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
        { name:'Engine Oil', checked: false },
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
        { name:'Air Conditioning', checked: false },
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
        { name:'Transmission parts', checked: false }
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

        let makeEmpty = "";
        let modelEmpty = "";
        let formIsValid = true;
        
        if(!make.trim()) {
            toast.error("Manufacturer field is required", {
                position: toast.POSITION.TOP_RIGHT
            });
            formIsValid = false;
        }
        if(!model.trim()) {
            toast.error("Model field is required", {
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
            let randomRequestNumber = Math.round(+new Date()/1000);
            const data = {
                requestNumber:randomRequestNumber,
                myVehicle:'',
                make:make,
                model:model,
                location:autoLocation,
                city:autoCity,
                province:autoProvince,
                postalCode:autoPostalCode,
                country:autoCountries,
                partType:selectedPartType,
                services:selectedServices,
                part_number,
                notes
            }
            window.localStorage.setItem('searchingPartsStorage',  JSON.stringify(data))
            navigate("/garage/service-parts-request/list")
        }
    }

    return (
        <>
            <ToastContainer/>
            <Header />

            <div className="WrapperArea">
                <div className="WrapperBox"> 

                    <div className="TitleBox">
                        <h4>{ t('garage.serviceautoparts.Serviceparts') }</h4>
                    </div>
                
                    <div className="Small-Wrapper">
                        <div className="GaragesForm">
                            
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <h6>{ t('garage.serviceautoparts.WelcomeAutowiz') }, { t('garage.serviceautoparts.pleasetellus') }</h6>
                                        </div>
                                    </div>

                                    <div className="col-sm-12">
                                        <div className='row'>
                                            <MapContainer />
                                        </div>
                                    </div>

                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>{ t('garage.serviceautoparts.Make') }</label>
                                            <select className="form-control" name="make" autoComplete="off" value={make} onChange={handleInputChange}>
                                                <option value=""> Select </option>
                                                {
                                                    manufacturerData && manufacturerData.length>0? manufacturerData.map((item, i)=>
                                                        <option value={item._id}> {item._id} </option>
                                                    )
                                                    :''
                                                }
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>{ t('garage.serviceautoparts.Model') }</label>
                                            <select className="form-control" name="model" value={model} onChange={handleInputChange}>
                                                <option value=""> Select Model </option>
                                                {
                                                    modelData && modelData.length>0?
                                                        modelData.map((item, i) =>
                                                            <option value={ item.model }> { item.model } </option>
                                                        )
                                                    :
                                                    ''
                                                }
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <label> { t('garage.serviceautoparts.Pleasestateaddress') } </label>
                                            <input type="text" className="form-control" ref={inputRef} placeholder={ t('garage.serviceautoparts.Enterlocation') } name="autoLocation" value={autoLocation} onChange={handleInputAddressChange}/>
                                            <input type="hidden" name="autoCity" value={autoCity} onChange={handleInputAddressChange} />
                                            <input type="hidden" name="autoPostalCode" value={autoPostalCode} onChange={handleInputAddressChange} />
                                            <input type="hidden" name="autoProvince" value={autoProvince} onChange={handleInputAddressChange} />
                                            <input type="hidden" name="autoCountries" value={autoCountries} onChange={handleInputAddressChange} />
                                        </div>
                                    </div>

                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <label> { t('garage.serviceautoparts.Selectparttype') } </label>
                                            <ul>
                                                <li>
                                                    <label className="CheckBox"> { t('garage.serviceautoparts.Newparts') }
                                                        <input type="checkbox" name="partType" value="New parts" onChange={handlePartTypeChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('garage.serviceautoparts.UsedParts') }
                                                        <input type="checkbox" name="partType" value="Used parts" onChange={handlePartTypeChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('garage.serviceautoparts.RebuiltReconditioned') }
                                                        <input type="checkbox" name="partType" value="Rebuilt/Reconditioned" onChange={handlePartTypeChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <label>{ t('garage.serviceautoparts.Selectparts') }: </label>
                                            <ul>
                                                <li>
                                                    <label className="CheckBox"> { t('garage.servicePartList.EngineOil') }
                                                        <input type="checkbox" name="services" value="Engine Oil" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('garage.servicePartList.Filters') }
                                                        <input type="checkbox" name="services" value="Filters" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('garage.servicePartList.Belts') }
                                                        <input type="checkbox" name="services" value="Belts" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('garage.servicePartList.Hoses') }
                                                        <input type="checkbox" name="services" value="Hoses" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('garage.servicePartList.Tires') }
                                                        <input type="checkbox" name="services" value="Tires" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('garage.servicePartList.Battery') }
                                                        <input type="checkbox" name="services" value="Battery" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('garage.servicePartList.Shocks') }
                                                        <input type="checkbox" name="services" value="Shocks" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('garage.servicePartList.Lubricants') }
                                                        <input type="checkbox" name="services" value="Lubricants" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>

                                                <li>
                                                    <label className="CheckBox"> { t('garage.servicePartList.Wipers') }
                                                        <input type="checkbox" name="services" value="Wipers" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('garage.servicePartList.Antifreeze') }
                                                        <input type="checkbox" name="services" value="Antifreeze" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('garage.servicePartList.Heating') }
                                                        <input type="checkbox" name="services" value="Heating" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('garage.servicePartList.Autocleaningproducts') }
                                                        <input type="checkbox" name="services" value="Auto cleaning products" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('garage.servicePartList.Engineparts') }
                                                        <input type="checkbox" name="services" value="Engine Parts" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('garage.servicePartList.SparkPlugs') }
                                                        <input type="checkbox" name="services" value="Spark Plugs" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('garage.servicePartList.AirConditioning') }
                                                        <input type="checkbox" name="services" value="Air Conditioning" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('garage.servicePartList.Electricals') }
                                                        <input type="checkbox" name="services" value="Electricals" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('garage.servicePartList.Brakepads') }
                                                        <input type="checkbox" name="services" value="Brake Pads" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('garage.servicePartList.Rotors') }
                                                        <input type="checkbox" name="services" value="Rotors" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('garage.servicePartList.Wipersmodule') }
                                                        <input type="checkbox" name="services" value="Wipers Module" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('garage.servicePartList.Calipers') }
                                                        <input type="checkbox" name="services" value="Calipers" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('garage.servicePartList.Lightsbulbs') }
                                                        <input type="checkbox" name="services" value="Lights and Bulbs" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('garage.servicePartList.Autobodyparts') }
                                                        <input type="checkbox" name="services" value="Auto Body parts" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('garage.servicePartList.Paints') }
                                                        <input type="checkbox" name="services" value="Paints" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('garage.servicePartList.Startersalternators') }
                                                        <input type="checkbox" name="services" value="Starters and Alternators" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('garage.servicePartList.Roofrackscarriers') }
                                                        <input type="checkbox" name="services" value="Roof Racks and Carriers" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('garage.servicePartList.Autocovers') }
                                                        <input type="checkbox" name="services" value="Auto Covers" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="CheckBox"> { t('garage.servicePartList.Transmissionparts') }
                                                    <input type="checkbox" name="services" value="Transmission parts" onChange={handleServicesChange} />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </li> 
                                            </ul>
                                        </div>
                                    </div>
                                    
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <label> { t('garage.servicePartList.Enterpartnumber') }  </label>
                                            <input type="text" className="form-control" name="part_number" value={part_number} onChange={handleInputChange} />
                                        </div>
                                    </div>

                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <label>{ t('garage.servicePartList.Addnotes') } </label>
                                            <textarea rows="2" className="form-control" name="notes" value={notes} onChange={handleInputChange}></textarea>
                                        </div>
                                    </div>

                                    <div className="col-sm-12">
                                        <button type="submit" className="Accept">{ t('garage.servicePartList.Search') }</button>
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

export default GarageServicePartsRequest