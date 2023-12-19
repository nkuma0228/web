import React, {useState, useEffect, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import FORM from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import _ from 'lodash'

import { manufacturerList, modelList, clientSignup, clientEmailCheck, clientAddressCheck } from "../../redux/actions/client/authAction";

import Header from "../website/header";
import Footer from "../website/footer";
import ModalBox from "./modal";

import Check from '../../assets/website/images/Check.png';

const initialState = {
    firstName:'',
    lastName:'',
    email:'',
    referredBy:'',
    manufacturer:'',
    model:'',
    vehicleYear:'',
    vehicleType:'',
    mobile:'',
    password:'',
    confirmPassword:'',
    firstNameEmpty : '',
    lastNameEmpty : '',
    emailEmpty : '',
    manufacturerEmpty:'',
    modelEmpty:'',
    vehicleYearEmpty:'',
    vehicleTypeEmpty:'',
    mobileEmpty : '',
    passwordEmpty : '',
    confirmPasswordEmpty : ''
}
const initialAddressState = {
    autoLocation:'',
    number:'',
    street:'',
    autoCity:'',
    autoPostalCode:'',
    autoCountries:'',
    autoProvince:'',
    autoLatitude:'',
    autoLongitude:'',
    autoLocationEmpty:'',
    numberEmpty:'',
    streetEmpty:'',
    autoCityEmpty:'',
    autoPostalCodeEmpty:'',
    autoCountriesEmpty:'',
    autoProvinceEmpty:''
}

const Signup = (Props) => {
    const { i18n, t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let lang  = i18n.language

    const [cState, updateCState] = useState(initialState);
    const {
        firstName,
        lastName,
        email,
        referredBy,
        manufacturer,
        model,
        vehicleYear,
        vehicleType,
        mobile,
        password,
        confirmPassword,
        firstNameEmpty,
        lastNameEmpty,
        emailEmpty,
        manufacturerEmpty,
        modelEmpty,
        vehicleYearEmpty,
        vehicleTypeEmpty,
        mobileEmpty,
        passwordEmpty,
        confirmPasswordEmpty
    } = cState

    const [addState, updateAddState] = useState(initialAddressState);
    const {
        autoLocation,
        number,
        street,
        autoCity,
        autoPostalCode,
        autoCountries,
        autoProvince,
        autoLatitude,
        autoLongitude,
        autoLocationEmpty,
        numberEmpty,
        streetEmpty,
        autoCityEmpty,
        autoPostalCodeEmpty,
        autoCountriesEmpty,
        autoProvinceEmpty
    } = addState

    const [countryCodeState, setCountryCodeState] = useState("USA");

    const autoCompleteRef = useRef();
    const inputRef = useRef();
    const options = {
        //componentRestrictions: { country: "ng" },
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
            ...cState,
            autoLocation:inputRef.current.value,
            number:addState.number,
            street:addState.street,
            autoCity:getCity,
            autoPostalCode:getZipcode,
            autoCountries:getCountry,
            autoProvince: getState,
            autoLatitude: latitude,
            autoLongitude: longitude,
        })

        if(getCountry == "Canada") {
            setCountryCodeState("CA")
        } else {
            setCountryCodeState("USA")
        }
    }

    const getStoreData = useSelector(state => state.client)
    const { manufacturerData, modelData } = getStoreData

    const country = useSelector(state => state.provider)
    const { countryData } = country

    useEffect(() => {
        dispatch(manufacturerList())
    },[])

    const [loginShow, setLoginShow] = useState(false);
    const handleClose = () => setLoginShow(false);
    const handleShow = () => setLoginShow(true);

    const [oneFormShow, setOneFormShow] = useState('flex');
    const [twoFormShow, setTwoFormShow] = useState('none');
    
    const [confirmationSignupShow, setConfirmationSignupShow] = useState(false);
    const handleConfirmationSignupClose = () => setConfirmationSignupShow(false);
    const handleConfirmationSignupShow = () => setConfirmationSignupShow(true);


    const handleInputChange = (e) => {
        const { name, value } = e.target
        updateCState({
            ...cState, [name]: value
        })
        if(name == "manufacturer") {
            let dependentData = { name:value };
            dispatch(modelList(dependentData))
        }
    }
    const handleInputAddressChange = (e) => {
        const { name, value } = e.target

        var previousAutoLocation = autoLocation
        //console.log("previousAutoLocation", previousAutoLocation)
        updateAddState({
            ...addState, [name]: value
        })

        if(name === "autoLocation") {
            
            if(previousAutoLocation != value) {
                customHandleLocation(value)
            }
        }
        if(name === "autoCountries") {
            if(value == "Canada") {
                setCountryCodeState("CA")
            } else {
                setCountryCodeState("USA")
            }
            if(!autoLatitude && !autoLongitude) {
                customHandleLocation(autoLocation)
            }
        }
    }

    const customHandleLocation = async (location) => {
        
        var latitude = ""
        var longitude = ""
        var getCountry = ""
        var getState = ""
        var getCity = ""
        var getZipcode = "" 
        var geocoder = new window.google.maps.Geocoder();
        try {
            await geocoder.geocode({ 'address': location }, function handleResults(results, status) {
                
                if (status === window.google.maps.GeocoderStatus.OK) {
                    latitude = results[0].geometry.location.lat();
                    longitude = results[0].geometry.location.lng();
                    
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
                        autoLatitude: latitude,
                        autoLongitude: longitude,
                    })
                }
            });
        } catch(error) {
        }
        if(!latitude && !longitude) {
            try {
                await geocoder.geocode({ 'address': addState.autoCity }, function handleResults(results, status) {
                    
                    if (status === window.google.maps.GeocoderStatus.OK) {
                        latitude = results[0].geometry.location.lat();
                        longitude = results[0].geometry.location.lng();

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
                            autoLatitude: latitude,
                            autoLongitude: longitude,
                        })
                    }
                });
            } catch(error) {}
        }
    }
    
    const vehicleTypeChecked = [
        { "name" : "Racing"},
        { "name" : "Hybrid"},
        { "name" : "Diesel"},
        { "name" : "European Cars"},
        { "name" : "Electric"},
        { "name" : "Trucks | Vans"},
        { "name" : "Auto Trans"},
        { "name" : "Manual Trans"},
        { "name" : "American Cars"},
        { "name" : "Asian Cars"},
        { "name" : "Japaneses Korean Cars"},
        { "name" : "Other"}
    ]

    const handleOneValidation = () => {
        let firstNameEmpty = ''
        let lastNameEmpty = ''
        let emailEmpty = ''
        let manufacturerEmpty= ''
        let modelEmpty=''
        let formIsValid = true;

        if (!firstName.trim()) {
            firstNameEmpty = "Please enter first name.";
            formIsValid = false;
        }

        if (!lastName.trim()) {
            lastNameEmpty = "Please enter last name.";
            formIsValid = false;
        }

        if (!email.trim()) {
            emailEmpty = "Please enter email id";
            formIsValid = false;
        } else {
            var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if (email.match(validRegex)) {
            } else {
                emailEmpty = "Please enter valid email id";
                formIsValid = false;
            }
        }

        if (!manufacturer.trim()) {
            manufacturerEmpty = "Please select manufacturer";
            formIsValid = false;
        }
        if (!model.trim()) {
            modelEmpty = "Please select model";
            formIsValid = false;
        }
        if (!vehicleYear.trim()) {
            modelEmpty = "Please select model";
            formIsValid = false;
        }
        
        updateCState({
            ...cState, 
            firstNameEmpty, 
            lastNameEmpty,
            emailEmpty,
            manufacturerEmpty,
            modelEmpty,
            vehicleYearEmpty
        })
        return formIsValid;
    }

    const handleTwoFormShow = () => {
        let formIsValid = handleOneValidation();
        if (formIsValid) {

            const data = { email:email}
            dispatch(clientEmailCheck(data)).then(res => {
                if (res.code == 200) {
                    //formIsValid = true;
                    setTwoFormShow('flex'); setOneFormShow('none'); 
                    window.scrollTo({
                        top: 0,
                        left: 100,
                        behavior: 'auto'
                    });
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
    }

    const handleValidation = () => {

        let mobileEmpty = ''
        let passwordEmpty = ''
        let confirmPasswordEmpty = ''
        let formIsValid = true;

        if (!mobile.trim()) {
            mobileEmpty = "Please enter telephone number";
            formIsValid = false;
        }
        if (!password.trim()) {
            passwordEmpty = "Please enter password";
            formIsValid = false;
        } else {
            if(password.length < 3) {
                passwordEmpty = "Password length must be atleast 5 characters";
                formIsValid = false;
            }
        }
        if (!confirmPassword.trim()) {
            confirmPasswordEmpty = "Please enter confirm password";
            formIsValid = false;
        }
        if (password && confirmPassword && (password !== confirmPassword)) {
            confirmPasswordEmpty = "Confirm password must be same as password";
            formIsValid = false;
        }
     
        updateCState({
            ...cState, 
            mobileEmpty,
            passwordEmpty,
            confirmPasswordEmpty
        })
        return formIsValid;
    }

    const handleAddressValidation = () => {

        let autoLocationEmpty = ''
        let numberEmpty = ''
        let streetEmpty = ''
        let autoCityEmpty = ''
        let formIsValid = true;
    
        if (!autoLocation.trim()) {
            autoLocationEmpty = "Please enter location";
            formIsValid = false;
        }
        if(number == undefined) {
            if(lang == "fr") {
                numberEmpty = "Veuillez écrire le numéro";
            } else {
                numberEmpty = "Please enter number";
            }
            formIsValid = false;
        } else {
            if (!number.trim()) {
                if(lang == "fr") {
                    numberEmpty = "Veuillez écrire le numéro";
                } else {
                    numberEmpty = "Please enter number";
                }
                formIsValid = false;
            }
        }
        if (street == undefined) {
            if(lang == "fr") {
                streetEmpty = "Veuillez écrire le nom de la rue";
            } else {
                streetEmpty = "Please enter street";
            }
            formIsValid = false;
        } else {
            if (!street.trim()) {
                if(lang == "fr") {
                    streetEmpty = "Veuillez écrire le nom de la rue";
                } else {
                    streetEmpty = "Please enter street";
                }
                formIsValid = false;
            }
        }
        // if(autoCity == undefined) {
        //     autoLocationEmpty = "Please select location from auto suggestion list";
        //     formIsValid = false;
        // } else {
        //     if (!autoCity.trim()) {
        //         autoLocationEmpty = "Please select location from auto suggestion list";
        //         formIsValid = false;
        //     }
        // }

        updateAddState({
            ...addState, 
            autoLocationEmpty,
            numberEmpty,
            streetEmpty,
            autoCityEmpty
        })
        return formIsValid;
    }

    let handleSubmit = async (event) => {
        event.preventDefault();
        let formValid = handleValidation();
        let formIsValid = handleAddressValidation();
        //console.log(formValid, formIsValid)
        if (formValid && formIsValid) {
            
            var data = { 
                firstName, 
                lastName, 
                email, 
                manufacturer, 
                model, 
                vehicleYear, 
                vehicleType, 
                mobile,
                password,
                lang:lang,
                location:autoLocation,
                number,
                street,
                city:autoCity,
                postalCode:autoPostalCode,
                country:autoCountries,
                province:autoProvince,
                latitude:autoLatitude,
                longitude:autoLongitude,
            }    
            if(!autoLatitude && !autoLongitude) {
                toast.error("Please enter valid location", {
                    position: toast.POSITION.TOP_RIGHT
                });
            } else {
                dispatch(clientSignup(data)).then(res => {
                    if (res.code == 201) {
                        toast.success(res.message, {
                            position: toast.POSITION.TOP_RIGHT
                        });
                        handleConfirmationSignupShow()
                        setTimeout(
                            function() {
                                navigate("/client/dashboard")
                            }
                            .bind(this),
                            4000
                        );
                    } else {
                        let errors = res.errors.errors
                        errors.map((item) => {
                            var newParam = item.param
                            if(item.param == "mobile"){
                                newParam = "telephone number"
                            }
                            let messageErr = item.msg +' of '+ newParam
                            toast.error(messageErr, {
                                position: toast.POSITION.TOP_RIGHT
                            });
                        })
                        
                        updateCState({
                            ...cState, 
                            errorMsg: res.message,
                            firstNameEmpty: '',
                            lastNameEmpty: '',
                            emailEmpty: '',
                            manufacturerEmpty: '',
                            modelEmpty: '',
                            vehicleYearEmpty: '',
                            vehicleTypeEmpty: '',
                            numberEmpty: '',
                            streetEmpty: '',
                            cityEmpty: '',
                            provinceEmpty: '',
                            mobileEmpty: '',
                            postalCodeEmpty: '',
                            passwordEmpty: '',
                            confirmPasswordEmpty: '',
                        })
                    }
                }).catch(err => {
                    //console.log(err, 'err')
                    const message = err && err.response && err.response.data ? err.response.data.message : "Something went wrong."
                    toast.error(message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                })
            }
        }
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 100,
            behavior: 'auto'
        });
    },[]);

    return (
        <>
        <ToastContainer/>
        <Header />
        <ModalBox 
            loginShow={loginShow}
            handleClose={handleClose}
            handleShow={handleShow}
            aciveShow={true}
            confirmationSignupShow={confirmationSignupShow}
            handleConfirmationSignupClose={handleConfirmationSignupClose}
        />
        <section>
            <div className="BannerArea">
                <h3> { t('website.signup.ClientSignup') }</h3>
                <ul>
                    <li><Link to="/"> { t('website.signup.Home') } </Link></li>
                    <li className="active"><a href="javascript:void(0);">{ t('website.signup.ClientSignup') }</a></li>
                </ul>
            </div>
        </section>

        <section>
            <div className="RegisterArea">
                <div className="container">

                    <div className="RegisterLinks">
                        <ul>
                            <li className="active"><Link to="/signup">{ t('website.signup.ClientSignup') }</Link></li>
                            <li><Link to="/service-provider-signup">{ t('website.signup.ServicesProviderSignup') }</Link></li>
                        </ul>
                    </div>

                    <div className="row">
                        <div className="col-sm-10 offset-sm-1">
                            <div className="RegisterForm">
                                <FORM onSubmit={handleSubmit}>
                                    <div className="row" id="firstFormView" style={{ display: oneFormShow }}>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <input type="text" className="form-control" name="firstName" autoComplete="off" placeholder={ t('website.signup.FirstName') } value={firstName} onChange={handleInputChange} />
                                                <span style={{ color: "red" }}>{firstNameEmpty}</span>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <input type="text" className="form-control" name="lastName" autoComplete="off" placeholder={ t('website.signup.LastName') } value={lastName} onChange={handleInputChange} />
                                                <span style={{ color: "red" }}>{lastNameEmpty}</span>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <input type="text" className="form-control" name="email" autoComplete="off" placeholder={ t('website.signup.EmailAddress') } value={email} onChange={handleInputChange}/>
                                                <span style={{ color: "red" }}>{emailEmpty}</span>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <input type="text" className="form-control" name="referredBy" autoComplete="off" placeholder={ t('website.signup.Referredby') } value={referredBy} onChange={handleInputChange}/>
                                            </div>
                                        </div>

                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <select className="form-control" name="manufacturer" autoComplete="off" value={manufacturer} onChange={handleInputChange}>
                                                    <option value=""> { t('website.signup.SelectManufacturer') } </option>
                                                    {
                                                        manufacturerData && manufacturerData.length>0? manufacturerData.map((item, i)=>
                                                            <option value={item._id}> {item._id} </option>
                                                        )
                                                        :''
                                                    }
                                                </select>
                                                <span style={{ color: "red" }}>{manufacturerEmpty}</span>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <select className="form-control" name="model" value={model} onChange={handleInputChange}>
                                                    <option value=""> { t('website.signup.SelectModel') } </option>
                                                    {
                                                        modelData && modelData.length>0?
                                                            modelData.map((item, i) =>
                                                                <option value={ item.model }> { item.model } </option>
                                                            )
                                                        :
                                                        ''
                                                    }
                                                </select>
                                                {/* <input type="text" className="form-control" name="model" autoComplete="off" placeholder={ t('website.signup.SelectModel') } value={model} onChange={handleInputChange} />
                                                <span style={{ color: "red" }}>{modelEmpty}</span> */}
                                            </div>
                                        </div>

                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <input type="text" className="form-control" name="vehicleYear" autoComplete="off" placeholder={ t('website.signup.VehicleYear') } value={vehicleYear} onChange={handleInputChange}/>

                                                <span style={{ color: "red" }}>{vehicleYearEmpty}</span>
                                            </div>
                                        </div>

                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                {/* <select className="form-control" name="vehicleType" value={vehicleType} onChange={handleInputChange}>
                                                <option value=""> Select { t('website.signup.VehicleType') } </option>
                                                {
                                                    vehicleTypeChecked && vehicleTypeChecked.length>0 && vehicleTypeChecked.map((item, i) => 
                                                        <option value={ item.name }> { item.name } </option>
                                                    )
                                                }
                                                </select> */}
                                                <input type="text" className="form-control" name="vehicleType" autoComplete="off" placeholder={ t('website.signup.VehicleType') } value={vehicleType} onChange={handleInputChange} />
                                                <span style={{ color: "red" }}>{vehicleTypeEmpty}</span>
                                            </div>
                                        </div>

                                        <div className="col-sm-12">
                                            <div className="RegisterButton">
                                                <Link className="Submit" to="" onClick={handleTwoFormShow}> { t('website.signup.NEXT') } </Link>
                                                
                                                <h5> { t('website.signup.AlreadyHaveaccount') } <Link to="javascript:void(0);" onClick={handleShow}>{ t('website.signup.Login') }</Link></h5>
                                                <h6><Link to="/">{ t('website.signup.BacktoHome') }</Link></h6>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row" id="secondFormView" style={{display: twoFormShow}}>
                                        <div className="col-sm-8">
                                            <div className="form-group">
                                                <input type="text" className="form-control" ref={inputRef} name="autoLocation" placeholder={ t('website.signup.SearchLocation') } value={autoLocation} onChange={handleInputAddressChange}/>
                                                <span style={{ color: "red" }}>{autoLocationEmpty}</span>
                                            </div>
                                        </div>
                                        
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <select className="form-control" name="autoCountries" value={autoCountries} onChange={handleInputAddressChange}>
                                                    <option value=""> { t('website.signup.SELECTCOUNTRY') } </option>
                                                    <option value="USA"> USA </option>
                                                    <option value="Canada"> Canada </option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* <div className="col-sm-12">
                                            <div className="form-group">
                                                <p style={{color:"red"}}>{ t('website.signup.ForCanadianbusinesses') }</p>
                                            </div>
                                        </div> */}

                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <input type="text" className="form-control" name="number" autoComplete="off" placeholder={ t('website.signup.Number') } value={number} onChange={handleInputAddressChange}/>
                                                <span style={{ color: "red" }}>{numberEmpty}</span>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <input type="text" className="form-control" name="street" autoComplete="off" placeholder={ t('website.signup.Street') } value={street} onChange={handleInputAddressChange}/>
                                                <span style={{ color: "red" }}>{streetEmpty}</span>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <input type="text" className="form-control" name="autoCity" autoComplete="off" placeholder={ t('website.signup.City') } value={autoCity} onChange={handleInputAddressChange}/>
                                                <span style={{ color: "red" }}>{autoCityEmpty}</span>
                                            </div>
                                        </div>

                                        {
                                            countryCodeState == 'CA'?
                                            <>
                                                <div className="col-sm-4">
                                                    <div className="form-group">
                                                        <input type="text" className="form-control" name="autoProvince" autoComplete="off" placeholder={ t('website.signup.Province') } value={autoProvince} onChange={handleInputAddressChange}/>
                                                        <span style={{ color: "red" }}>{autoProvinceEmpty}</span>
                                                    </div>
                                                </div>
                                                <div className="col-sm-4">
                                                    <div className="form-group">
                                                        <input type="text" className="form-control" name="autoPostalCode" autoComplete="off" placeholder={ t('website.signup.PostalCode') } value={autoPostalCode} onChange={handleInputAddressChange}/>
                                                        <span style={{ color: "red" }}>{autoPostalCodeEmpty}</span>
                                                    </div>
                                                </div>
                                            </>
                                            :
                                            <>
                                                <div className="col-sm-4">
                                                    <div className="form-group">
                                                        <input type="text" className="form-control" name="autoProvince" autoComplete="off" placeholder={ t('website.signup.State') } value={autoProvince} onChange={handleInputAddressChange}/>
                                                        <span style={{ color: "red" }}>{autoProvinceEmpty}</span>
                                                    </div>
                                                </div>
                                                <div className="col-sm-4">
                                                    <div className="form-group">
                                                        <input type="text" className="form-control" name="autoPostalCode" autoComplete="off" placeholder={ t('website.signup.ZipCode') } value={autoPostalCode} onChange={handleInputAddressChange}/>
                                                        <span style={{ color: "red" }}>{autoPostalCodeEmpty}</span>
                                                    </div>
                                                </div>
                                            </>
                                        }

                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <input type="text" className="form-control" name="mobile" autoComplete="off" placeholder={ t('website.signup.TelephoneNumber') } value={mobile} onChange={handleInputChange}/>
                                                <span style={{ color: "red" }}>{mobileEmpty}</span>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <input type="password" className="form-control" name="password" autoComplete="off" placeholder={ t('website.signup.CreatePassword') } value={password} onChange={handleInputChange}/>
                                                <span style={{ color: "red" }}>{passwordEmpty}</span>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <input type="password" className="form-control" name="confirmPassword" autoComplete="off" placeholder={ t('website.signup.ConfirmPassword') } value={confirmPassword} onChange={handleInputChange}/>
                                                <span style={{ color: "red" }}>{confirmPasswordEmpty}</span>
                                            </div>
                                        </div>

                                        <div className="col-sm-12">
                                            <div className="RegisterButton">
                                                {/* <h4><img src={Check} /> { t('website.signup.Pleasecompletetheinformation') } </h4> */}
                                                <h4><img src={Check} /> { t('website.signup.ByProceeding') }</h4>
                                                <button type="submit"> { t('website.signup.SIGNUP') }</button>
                                                <h5> { t('website.signup.AlreadyHaveaccount') } <Link to="" onClick={handleShow}> { t('website.signup.Login') } </Link></h5>
                                                <h6><Link to="/"> { t('website.signup.BacktoHome') } </Link></h6>
                                            </div>
                                        </div>

                                    </div>
                                </FORM>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <Footer />
        </>
    );
}

export default Signup