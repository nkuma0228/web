import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import _ from 'lodash'
import S3FileUpload from 'react-s3';
import FORM from 'react-bootstrap/Form';

import Header from "./header";
import Footer from "./footer";

import { clientDetails, clientUpdate, clientPasswordUpdate } from "../../redux/actions/client/authAction";

import Profile from "../../assets/client/images/profile.png";

window.Buffer = window.Buffer || require("buffer").Buffer;

const initialState = {
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
    image:'',
    firstNameEmpty:'',
    lastNameEmpty:'',
    emailEmpty:'',
    phoneEmpty:'',
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

const initialStatePassword = {
    oldPassword:'',
    password:'',
    confirmPassword:'',
    oldPasswordEmpty:'',
    passwordEmpty:'',
    confirmPasswordEmpty:'',
}
var imagePreview = "";
var imageFile = "";

const ClientAccount = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { i18n, t } = useTranslation();

    const [cState, updateCState] = useState(initialState);
    const {
        firstName,
        lastName,
        email,
        phone,
        image,
        firstNameEmpty,
        lastNameEmpty,
        emailEmpty,
        phoneEmpty,
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

    const [pState, updatePState] = useState(initialStatePassword);
    const {
        oldPassword,
        password,
        confirmPassword,
        oldPasswordEmpty,
        passwordEmpty,
        confirmPasswordEmpty,
    } = pState

    const getProfileData = useSelector(state => state.client)
    const {clientData} = getProfileData

    const country = useSelector(state => state.provider)
    const { countryData } = country

    useEffect(() => {
        dispatch(clientDetails())
    },[])

    useEffect(() => {

        if (!_.isEmpty(clientData)) {
            const updateData = _.cloneDeep(cState)
            updateData.firstName = clientData.firstName
            updateData.lastName = clientData.lastName
            updateData.email = clientData.email
            updateData.phone = clientData.mobile
            updateData.image = clientData.image
            updateCState(
                updateData
            )
        }
        if (!_.isEmpty(clientData)) {
            const updateData = _.cloneDeep(addState)
            updateData.autoLocation = clientData.address
            updateData.number = clientData.number
            updateData.street = clientData.street
            updateData.autoCity = clientData.city
            updateData.autoPostalCode = clientData.postalCode
            updateData.autoProvince = clientData.province
            updateData.autoCountries = clientData.country
            updateData.autoLatitude = clientData.latitude
            updateData.autoLongitude = clientData.longitude
            updateAddState(
                updateData
            )
        }
    },[clientData])

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

    const [countryCodeState, setCountryCodeState] = useState("USA");

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
            number: addState.number,
            street: addState.street,
            autoLatitude: latitude,
            autoLongitude: longitude
        })

        if(getCountry == "Canada") {
            setCountryCodeState("CA")
        } else {
            setCountryCodeState("USA")
        }
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

    const handleValidation = () => {
        let firstNameEmpty = ''
        let lastNameEmpty = ''
        let emailEmpty = ''
        let phoneEmpty = ''
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
        }
        if (!phone.trim()) {
            phoneEmpty = "Please enter mobile";
            formIsValid = false;
        }
        
        updateCState({
            ...cState, 
            firstNameEmpty,
            lastNameEmpty,
            emailEmpty,
            phoneEmpty,
        })
        return formIsValid;
    }

    const handleAddressValidation = () => {

        let autoLocationEmpty = ''
        let numberEmpty = ''
        let streetEmpty = ''
        let autoCityEmpty = ''
        let autoPostalCodeEmpty = ''
        let autoCountriesEmpty = ''
        let autoProvinceEmpty = ''
        let formIsValid = true;
    
        if (!autoLocation.trim()) {
            autoLocationEmpty = "Please enter location";
            formIsValid = false;
        }
        if(number == undefined) {
            numberEmpty = "Please enter number";
            formIsValid = false;
        } else {
            if (!number.trim()) {
                numberEmpty = "Please enter number";
                formIsValid = false;
            }
        }
        if (street == undefined) {
            streetEmpty = "Please enter street";
            formIsValid = false;
        } else {
            if (!street.trim()) {
                streetEmpty = "Please enter street";
                formIsValid = false;
            }
        }
        if (!autoCity.trim()) {
            autoCityEmpty = "Please enter city";
            formIsValid = false;
        }
        if (!autoPostalCode.trim()) {
            autoPostalCodeEmpty = "Please enter postal code";
            formIsValid = false;
        }
        if (!autoCountries.trim()) {
            autoCountriesEmpty = "Please enter Country";
            formIsValid = false;
        }
        if (!autoProvince.trim()) {
            autoProvinceEmpty = "Please enter province";
            formIsValid = false;
        } else {
            if(autoProvince.match(/^[A-Za-z ]+$/)) {
            } else {
                autoProvinceEmpty = "Please enter only alphabets";
                formIsValid = false;
            }
        }
    
        updateAddState({
            ...addState, 
            autoLocationEmpty,
            numberEmpty,
            streetEmpty,
            autoCityEmpty,
            autoPostalCodeEmpty,
            autoCountriesEmpty,
            autoProvinceEmpty,
        })
        return formIsValid;
    }

    let handleSubmit = async (event) => {
        event.preventDefault();
        let formIsValid = handleValidation();
        let formAddressIsValid = handleAddressValidation();
        if (formIsValid && formAddressIsValid) {
            var data = {
                firstName,
                lastName,
                email,
                mobile:phone,
                location:autoLocation,
                number,
                street,
                city:autoCity,
                postalCode: autoPostalCode,
                province: autoProvince,
                country: autoCountries,
                latitude:autoLatitude,
                longitude:autoLongitude
            }
            if(!autoLatitude && !autoLongitude) {
                toast.error("Please enter valid location", {
                    position: toast.POSITION.TOP_RIGHT
                });
            } else {
                dispatch(clientUpdate(data)).then(res => {
                    if (res.code == 200) {
                        toast.success(res.message, {
                            position: toast.POSITION.TOP_RIGHT
                        });
                        setTimeout(
                            function() {
                                navigate("/client/account")
                            }
                            .bind(this),
                            3000
                        );
                    } else {
                        toast.error(res.message, {
                            position: toast.POSITION.TOP_RIGHT
                        });
                        updateCState({
                            ...cState, 
                            errorMsg: res.message,
                            firstNameEmpty : '',
                            lastNameEmpty : '',
                            emailEmpty : '',
                            phoneEmpty : '',
                            autoLocationEmpty : '',
                            numberEmpty : '',
                            streetEmpty : '',
                            autoCityEmpty : '',
                            autoPostalCodeEmpty : '',
                            autoProvinceEmpty : '',
                            autoCountriesEmpty : '',
                        })
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
    }

    const handleInputPasswordChange = (e) => {
        const { name, value } = e.target
        updatePState({
            ...pState, [name]: value
        })
    }

    const handlePasswordValidation = () => {
        let oldPasswordEmpty = ''
        let passwordEmpty = ''
        let confirmPasswordEmpty = ''
        let formIsValid = true;

        if (!oldPassword.trim()) {
            oldPasswordEmpty = "Please enter old password.";
            formIsValid = false;
        } else {
            if(oldPassword.length < 5) {  
                oldPasswordEmpty = "Old Password length must be atleast 5 characters";
                formIsValid = false;
            }
        }
        if (!password.trim()) {
            passwordEmpty = "Please enter new password.";
            formIsValid = false;
        } else {
            if(password.length < 5) {  
                passwordEmpty = "Password length must be atleast 5 characters";
                formIsValid = false;
            }
        }
        if (!confirmPassword.trim()) {
            confirmPasswordEmpty = "Please enter confirm password.";
            formIsValid = false;
        }
        if (password && confirmPassword && (password !== confirmPassword)) {
            confirmPasswordEmpty = "Confirm password must be same as password";
            formIsValid = false;
        }
        updatePState({
            ...pState, 
            oldPasswordEmpty,
            passwordEmpty,
            confirmPasswordEmpty,
        })
        return formIsValid;
    }
    
    let handlePasswordSubmit = (event) => {
        event.preventDefault();
        let formIsValid = handlePasswordValidation();
        if (formIsValid) {
            const data = {
                old_password:oldPassword,
                new_password:password
            }
            //updateSubmitDisable(true)
            dispatch(clientPasswordUpdate(data)).then(res => {
                if (res.code == 200) {
                    toast.success(res.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    setTimeout(
                        function() {
                            navigate("/client/account")
                        }
                        .bind(this),
                        3000
                    );
                } else {
                    toast.error(res.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    updateCState({
                        ...pState, 
                        errorMsg: res.message,
                        oldPasswordEmpty : '',
                        passwordEmpty : '',
                        confirmPasswordEmpty : '',
                    })
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

    const [selectedImage, setSelectedImage] = useState();
    const [selectedImagePreview, setSelectedImagePreview] = useState();
    const imageChange = (e) => {
    
        if (e.target.files && e.target.files.length > 0) {
            imageFile = e.target.files[0]
            imagePreview = URL.createObjectURL(e.target.files[0])
            setSelectedImage(imageFile);
            setSelectedImagePreview(imagePreview);
            e.target.value = null;
        }
    }

    return (
        <>
            <Header />

            <div class="WrapperArea">
                <div class="WrapperBox"> 

                    <div class="Small-Wrapper">
                        <div class="TitleBox">
                            <h4> { t('client.account.AccountSettings') } </h4>
                        </div>

                        <div class="StaticBoxArea">
                            <div class="PannelOne">
                                <h4><span><i class="fa fa-bell-o" aria-hidden="true"></i></span> { t('client.account.Notifications') } </h4>
                                <label class="switch">
                                    <input type="checkbox" />
                                    <span class="slider"></span>
                                </label>
                            </div>

                            <div class="panel-group" id="accordion">
                                <div class="panel">
                                    <div class="panel-heading" data-toggle="collapse" data-parent="#accordion" href="#collapse2">
                                        <h4><span><i class="fa fa-user"></i></span> { t('client.account.PersonalDetails') } </h4> 
                                    </div>
                                    <div id="collapse2" class="panel-collapse collapse">
                                        <div class="panel-body">
                                            <div class="ProfileBox">
                                                <div class="" style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                                                    <div class="ProfileHead">
                                                        <figure>
                                                            {
                                                                selectedImagePreview && (selectedImagePreview.length > 0) ? 
                                                                    <img src={selectedImagePreview} />
                                                                :
                                                                    image && image.length>0 ?
                                                                        <img src={image} />
                                                                    :
                                                                        <img src={Profile} />
                                                            }
                                                        </figure>
                                                        <div className="ProfileEdit">
                                                            <a class="Edit" href="javascript:void(0);"> { t('client.account.Edit') } </a>
                                                            <input type="file" name="profileImage" onChange={imageChange}/>
                                                        </div>
                                                    </div>
                                                    <div class="EditNext">
                                                        
                                                    </div> 
                                                </div>

                                                <FORM onSubmit={handleSubmit}>
                                                    <div class="row">
                                                        
                                                        <div class="col-sm-6">
                                                            <div class="form-group">
                                                                <label> { t('client.account.firstname') } </label>
                                                                <input type="text" class="form-control" name="firstName" value={firstName} onChange={handleInputChange} />
                                                                <span style={{ color: "red" }}>{firstNameEmpty}</span>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <div class="form-group">
                                                                <label> { t('client.account.lastname') } </label>
                                                                <input type="text" class="form-control" name="lastName" value={lastName} onChange={handleInputChange} />
                                                                <span style={{ color: "red" }}>{lastNameEmpty}</span>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <div class="form-group">
                                                                <label> { t('client.account.EmailAddress') } </label>
                                                                <input type="text" class="form-control" name="email" value={email} onChange={handleInputChange} />
                                                                <span style={{ color: "red" }}>{emailEmpty}</span>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <div class="form-group">
                                                                <label> { t('client.account.Phonenumber') } </label>
                                                                <input type="text" class="form-control" name="phone" value={phone} onChange={handleInputChange} />
                                                                <span style={{ color: "red" }}>{phoneEmpty}</span>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <div class="form-group">
                                                                <label> { t('client.account.Location') } </label>
                                                                <input type="text" class="form-control" ref={inputRef} name="autoLocation" value={autoLocation} onChange={handleInputAddressChange} />
                                                                <span style={{ color: "red" }}>{autoLocationEmpty}</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <div className="form-group">
                                                                <label> { t('client.account.Country') } </label>
                                                                <select className="form-control" name="autoCountries" value={autoCountries} defaultValue={autoCountries} onChange={handleInputAddressChange}>
                                                                    <option value=""> Select Country </option>
                                                                    <option value="USA"> USA </option>
                                                                    <option value="Canada"> Canada </option>
                                                                </select>
                                                            </div>
                                                        </div>

                                                        <div class="col-sm-6">
                                                            <div class="form-group">
                                                                <label> { t('client.account.Number') } </label>
                                                                <input type="text" class="form-control" name="number" value={number} onChange={handleInputAddressChange} />
                                                                <span style={{ color: "red" }}>{numberEmpty}</span>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <div class="form-group">
                                                                <label> { t('client.account.Street') } </label>
                                                                <input type="text" class="form-control" name="street" value={street} onChange={handleInputAddressChange} />
                                                                <span style={{ color: "red" }}>{streetEmpty}</span>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <div class="form-group">
                                                                <label> { t('client.account.City') } </label>
                                                                <input type="text" class="form-control" name="autoCity" value={autoCity} onChange={handleInputAddressChange} />
                                                                <span style={{ color: "red" }}>{autoCityEmpty}</span>
                                                            </div>
                                                        </div>
                                                        
                                                        {
                                                            countryCodeState == 'CA'?
                                                            <>
                                                                <div className="col-sm-6">
                                                                    <div className="form-group">
                                                                        <label> { t('client.account.Province') } </label>
                                                                        <input type="text" className="form-control" name="autoProvince" autoComplete="off" placeholder={ t('website.signup.Province') } value={autoProvince} onChange={handleInputAddressChange}/>
                                                                        <span style={{ color: "red" }}>{autoProvinceEmpty}</span>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-6">
                                                                    <div className="form-group">
                                                                        <label> { t('client.account.PostalCode') } </label>
                                                                        <input type="text" className="form-control" name="autoPostalCode" autoComplete="off" value={autoPostalCode} onChange={handleInputAddressChange}/>
                                                                        <span style={{ color: "red" }}>{autoPostalCodeEmpty}</span>
                                                                    </div>
                                                                </div>
                                                            </>
                                                            :
                                                            <>
                                                                <div className="col-sm-6">
                                                                    <div className="form-group">
                                                                        <label> { t('client.account.State') } </label>
                                                                        <input type="text" className="form-control" name="autoProvince" autoComplete="off" placeholder={ t('website.signup.State') } value={autoProvince} onChange={handleInputAddressChange}/>
                                                                        <span style={{ color: "red" }}>{autoProvinceEmpty}</span>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-6">
                                                                    <div className="form-group">
                                                                        <label> { t('client.account.ZipCode') } </label>
                                                                        <input type="text" className="form-control" name="autoPostalCode" autoComplete="off" value={autoPostalCode} onChange={handleInputAddressChange}/>
                                                                        <span style={{ color: "red" }}>{autoPostalCodeEmpty}</span>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        }
                                                        
                                                        <div class="col-sm-12">
                                                            <div class="text-center">
                                                                <button type="submit" class="Accept"> { t('client.account.Update') } </button>
                                                            </div> 
                                                        </div>
                                                    </div>
                                                </FORM>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="panel">
                                    <div class="panel-heading" data-toggle="collapse" data-parent="#accordion" href="#collapse3">
                                        <h4><span><i class="fa fa-unlock-alt" aria-hidden="true"></i></span> { t('client.account.Password') } </h4> 
                                    </div>
                                    <div id="collapse3" class="panel-collapse collapse">
                                        <div class="panel-body">
                                            <div class="CommonForm">
                                                <FORM onSubmit={handlePasswordSubmit}>
                                                    <div class="form-group">
                                                        <div class="row">
                                                            <div class="col-sm-3">
                                                                <label> { t('client.account.oldpassword') } </label>
                                                            </div>
                                                            <div class="col-sm-9">
                                                                <input type="password" class="form-control" name="oldPassword" placeholder="Enter your old Password" value={oldPassword} onChange={handleInputPasswordChange}/>
                                                                <span style={{ color: "red" }}>{oldPasswordEmpty}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="form-group">
                                                        <div class="row">
                                                            <div class="col-sm-3">
                                                                <label> { t('client.account.newpassword') } </label>
                                                            </div>
                                                            <div class="col-sm-9">
                                                                <input type="password" class="form-control" name="password" placeholder="Enter New Password" value={password} onChange={handleInputPasswordChange} />
                                                                <span style={{ color: "red" }}>{passwordEmpty}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="form-group">
                                                        <div class="row">
                                                            <div class="col-sm-3">
                                                                <label> { t('client.account.Confirmpassword') } </label>
                                                            </div>
                                                            <div class="col-sm-9">
                                                                <input type="password" class="form-control" name="confirmPassword" placeholder="Re-enter your password" value={confirmPassword} onChange={handleInputPasswordChange} />
                                                                <span style={{ color: "red" }}>{confirmPasswordEmpty}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="text-center">
                                                        <button type="submit" class="Accept"> { t('client.account.Updatepassword') } </button>
                                                    </div>
                                                </FORM>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>   
                </div>
            </div>

            <Footer />
        </>
    );
}

export default ClientAccount