import React, {useState,useEffect,useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import FORM from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';

import { corporateSignup, corporateEmailCheck } from "../../redux/actions/corporate/authAction";

import Header from "../website/header";
import Footer from "../website/footer";
import ModalBox from "./modal";

import Check from "../../assets/website/images/Check.png";

const initialState = {
    companyName:'',
    business:'',
    firstName:'',
    lastName:'',
    email:'',
    referredBy:'',
    telephoneNumber:'',
    password:'',
    confirmPassword:'',
    imageGallery:'',
    companyNameEmpty:'',
    businessEmpty:'',
    firstNameEmpty:'',
    lastNameEmpty:'',
    emailEmpty:'',
    referredByEmpty:'',
    telephoneNumberEmpty:'',
    passwordEmpty:'',
    confirmPasswordEmpty:''
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
    autoProvinceEmpty:'',
    autoLatitudeEmpty:'',
    autoLongitudeEmpty:''
}

var imagePreview = [];
var imageFile = [];

const SignupCorporate = () => {
    const { i18n, t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [cState, updateCState] = useState(initialState);
    const {
        companyName,
        business,
        firstName,
        lastName,
        email,
        referredBy,
        telephoneNumber,
        password,
        confirmPassword,
        companyNameEmpty,
        businessEmpty,
        firstNameEmpty,
        lastNameEmpty,
        emailEmpty,
        referredByEmpty,
        telephoneNumberEmpty,
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
        autoProvinceEmpty,
        autoLatitudeEmpty,
        autoLongitudeEmpty
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
            ...cState,
            autoLocation:inputRef.current.value,
            number:addState.number,
            street:addState.street,
            autoCity:getCity, 
            autoPostalCode:getZipcode,
            autoCountries:getCountry,
            autoProvince: getState,
            autoLatitude: latitude,
            autoLongitude: longitude
        })

        if(getCountry == "Canada") {
            setCountryCodeState("CA")
        } else {
            setCountryCodeState("USA")
        }
    }

    const country = useSelector(state => state.provider)
    const { countryData } = country

    const [loginShow, setLoginShow] = useState(false);
    const handleClose = () => setLoginShow(false);
    const handleShow = () => setLoginShow(true);

    const [confirmationShow, setConfirmationShow] = useState(false);
    const handleConfirmationClose = () => {setConfirmationShow(false); navigate("/") }
    const handleConfirmationShow = () => setConfirmationShow(true);

    const [oneFormShow, setOneFormShow] = useState('flex');
    const [fourthFormShow, setFourthFormShow] = useState('none');

    const handleOneFormShow = () => {
        setOneFormShow('flex'); setFourthFormShow('none');
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

        let companyNameEmpty = ''
        let businessEmpty = ''
        let firstNameEmpty = ''
        let lastNameEmpty = ''
        let emailEmpty = ''
        let telephoneNumberEmpty = ''
        let passwordEmpty = ''
        let confirmPasswordEmpty = ''
        let formIsValid = true;

        if (!companyName.trim()) {
            companyNameEmpty = "Please enter company name.";
            formIsValid = false;
        }
        if (!business.trim()) {
            businessEmpty = "Please enter business name.";
            formIsValid = false;
        }
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
        if (!telephoneNumber.trim()) {
            telephoneNumberEmpty = "Please enter telephone number";
            formIsValid = false;
        } else {
            if(telephoneNumber.match(/^[0-9]+$/)) {
            } else {
                telephoneNumberEmpty = "Please enter only number values";
                formIsValid = false;
            }
        }
        if (!password.trim()) {
            passwordEmpty = "Please enter password";
            formIsValid = false;
        } else {
            if(password.length < 5) {  
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
            companyNameEmpty,
            businessEmpty,
            firstNameEmpty,
            lastNameEmpty,
            emailEmpty,
            referredByEmpty,
            telephoneNumberEmpty,
            passwordEmpty,
            confirmPasswordEmpty
        })
        return formIsValid;
    }
    const handleAddressValidation = () => {

        let autoLocationEmpty = ''
        let numberEmpty = ''
        let streetEmpty = ''
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
        updateAddState({
            ...addState, 
            autoLocationEmpty,
            numberEmpty,
            streetEmpty,
        })
        return formIsValid;
    }

    const handleTwoFormShow = async () => {
        let formIsValid = handleValidation();
        let addressFormIsValid = handleAddressValidation();
        
        if (formIsValid && addressFormIsValid) {            

            if(autoLatitude && autoLongitude) {
                const data = { email:email}
                dispatch(corporateEmailCheck(data)).then(res => {
                    if (res.code == 200) {
                        setOneFormShow('none'); setFourthFormShow('flex');
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
                    //console.log(err, 'err')
                    const message = err && err.response && err.response.data ? err.response.data.message : "Something went wrong."
                    toast.error(message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                })
            } else {
                toast.error("Please enter valid location", {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
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

    let handleSubmit = async(event) => {
        event.preventDefault();

        var data = {
            companyName,
            business,
            firstName,
            lastName,
            email,
            referredBy,
            phone:'',
            telephone:telephoneNumber,
            extension:'',
            password,

            location:autoLocation,
            number,
            street,
            city:autoCity,
            postalCode:autoPostalCode,
            country:autoCountries,
            province:autoProvince,
            latitude:autoLatitude,
            longitude:autoLongitude,
            imageGallery:selectedImage?selectedImage.file:[]
        }
        handleSubmitDisable();

        dispatch(corporateSignup(data)).then(res => {
            if (res.code == 201) {
                toast.success(res.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
                handleConfirmationShow()
                setTimeout(
                    function() {
                        window.location.href="/"
                    }
                    .bind(this),
                    5000
                );
            } else {

                handleSubmitEnable()

                let errors = res.errors.errors
                errors.map((item) => {
                    var newParam = item.param
                    
                    let messageErr = item.msg +' of '+ newParam
                    toast.error(messageErr, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                })
                updateCState({
                    ...cState, 
                    errorMsg: res.message,
                    companyNameEmpty : '',
                    businessEmpty : '',
                    firstNameEmpty : '',
                    lastNameEmpty : '',
                    emailEmpty : '',
                    telephoneNumberEmpty : '',
                    passwordEmpty : '',
                    confirmPasswordEmpty : ''
                })
                updateAddState({
                    ...addState, 
                    autoLocationEmpty:'',
                    numberEmpty:'',
                    streetEmpty:'',
                    autoCityEmpty:'',
                    autoPostalCodeEmpty:'',
                    autoCountriesEmpty:'',
                    autoProvinceEmpty:'',
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

    const [submitDisable, setSubmitDisable] = useState(false);
    const handleSubmitDisable = () => { setConfirmationShow(true); }
    const handleSubmitEnable = () => { setConfirmationShow(false); }

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 100,
            behavior: 'auto'
        });
    },[]);

    let setCountryWise = window.localStorage.getItem("setCountry");
    
    return (
        <>
        <Header />
        <ToastContainer/>
        <ModalBox 
            loginShow={loginShow}
            handleClose={handleClose}
            handleShow={handleShow}
            confirmationShow={confirmationShow}
            handleConfirmationClose={handleConfirmationClose}
            aciveShow={false}
        />
        <section>
            <div className="BannerArea">
                <h3> { t('website.signup.CorporateSignup') } </h3>
                <ul>
                    <li><Link to="/"> { t('website.signup.Home') } </Link></li>
                    <li className="active"><a href="javascript:void(0);"> { t('website.signup.CorporateSignup') } </a></li>
                </ul>
            </div>
        </section>

        <section>
            <div className="RegisterArea">
                <div className="container">

                    <div className="StepBox">
                        <div id="showSteps" style={{ display: oneFormShow }}>
                            <h3>{ t('website.signup.SIGNUPASACorporate') }</h3>
                        </div>
                        <div id="showInfo" style={{ display: fourthFormShow }}>
                            <h3>{ t('website.signup.CorporateConfirmationRegistration') }</h3> 
                        </div>
                    </div>

                    <div className="RegisterForm">
                        <FORM onSubmit={handleSubmit}>
                            <div className="row" id="firstFormView" style={{display: oneFormShow }}>
                                <div className="col-sm-4">
                                    <div className="form-group">
                                        <input type="text" className="form-control" name="companyName" autoComplete="off" placeholder={ t('website.signup.Companylegalname') } value={companyName} onChange={handleInputChange}/>
                                        <span style={{ color: "red" }}>{companyNameEmpty}</span>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="form-group">
                                        <input type="text" className="form-control" name="business" autoComplete="off" placeholder={ t('website.signup.Typebusinessas') } value={business} onChange={handleInputChange}/>
                                        <span style={{ color: "red" }}>{businessEmpty}</span>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="form-group">
                                        <input type="text" className="form-control" name="firstName" autoComplete="off" placeholder={ t('website.signup.Ownersfirstname') } value={firstName} onChange={handleInputChange}/>
                                        <span style={{ color: "red" }}>{firstNameEmpty}</span>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="form-group">
                                        <input type="text" className="form-control" name="lastName" autoComplete="off" placeholder={ t('website.signup.Ownerslastname') } value={lastName} onChange={handleInputChange}/>
                                        <span style={{ color: "red" }}>{lastNameEmpty}</span>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="form-group">
                                        <input type="text" className="form-control" name="email" autoComplete="off" placeholder={ t('website.signup.EmailAddress') } value={email} onChange={handleInputChange} />
                                        <span style={{ color: "red" }}>{emailEmpty}</span>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="form-group">
                                        <input type="text" className="form-control" name="referredBy" autoComplete="off" placeholder={ t('website.signup.Referredby') } value={referredBy} onChange={handleInputChange}/>
                                    </div>
                                </div>  

                                <div className="col-sm-4">
                                    <div className="form-group">
                                            <input type="text" className="form-control" name="telephoneNumber" autoComplete="off" placeholder={ t('website.signup.Téléphonebusiness') } value={telephoneNumber} onChange={handleInputChange}/>
                                            
                                        <span style={{ color: "red" }}>{telephoneNumberEmpty}</span>
                                    </div>
                                </div> 
                                <div className="col-sm-4">
                                    <div className="form-group">
                                        <input type="password" className="form-control" name="password" autoComplete="off" placeholder={ t('website.signup.CreatePassword') } value={password} onChange={handleInputChange} />
                                        <span style={{ color: "red" }}>{passwordEmpty}</span>
                                    </div>
                                </div> 
                                <div className="col-sm-4">
                                    <div className="form-group">
                                        <input type="password" className="form-control" name="confirmPassword" autoComplete="off" placeholder={ t('website.signup.ConfirmPassword') }  value={confirmPassword} onChange={handleInputChange}/>
                                        <span style={{ color: "red" }}>{confirmPasswordEmpty}</span>
                                    </div>
                                </div> 

                                <div className="col-sm-12">
                                    <div className="form-group">
                                        
                                    </div>
                                </div>

                                <div className="col-sm-8">
                                    <div className="form-group">
                                        <input type="text" className="form-control" ref={inputRef} name="autoLocation" placeholder={ t('website.signup.LOCATIONTEXT') } value={autoLocation} onChange={handleInputAddressChange}/>
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

                                <div className="col-sm-12">
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

                                <div className="col-sm-12">
                                    <div className="RegisterButton"> 
                                        <Link className="Submit" to="" onClick={handleTwoFormShow}>{ t('website.signup.Continue') }</Link>
                                        <h5>{ t('website.signup.AlreadyHaveaccount') } <a href="javascript:void(0);" onClick={handleShow}>{ t('website.signup.Login') }</a></h5>
                                        <h6><Link to="/">{ t('website.signup.BacktoHome') }</Link></h6>
                                    </div>
                                </div> 
                            </div>

                            <div className="row" id="fourthFormView" style={{ display: fourthFormShow }}>
                                <div className="GarageInformation">
                                    <div className="RegisterForm">
                                        <div className="row">
                                            <div className="col-sm-5">
                                                <div className="InformationBox">
                                                    <h4>{ t('website.signup.YourInformation') } <Link to="" onClick={handleOneFormShow}>{ t('website.signup.Edit') }</Link></h4>
                                                    <ul>
                                                        <li>
                                                            <h6>{ t('website.signup.Companylegalname') }  *</h6>
                                                            <p> { companyName } </p>
                                                        </li>
                                                        <li>
                                                            <h6>{ t('website.signup.Doingbusinessas') } *</h6>
                                                            <p> { business } </p>
                                                        </li>
                                                        <li>
                                                            <h6>{ t('website.signup.Ownersfirstname') }</h6>
                                                            <p> { firstName } </p>
                                                        </li>
                                                        <li>
                                                            <h6>{ t('website.signup.Ownerslastname') }</h6>
                                                            <p> { lastName } </p>
                                                        </li>
                                                        <li>
                                                            <h6>{ t('website.signup.EmailAddress') }</h6>
                                                            <p> { email } </p>
                                                        </li>
                                                        <li>
                                                            <h6>{ t('website.signup.Referredby') }</h6>
                                                            <p> { referredBy } </p>
                                                        </li> 
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="col-sm-5 offset-sm-1">
                                                <div className="InformationBox">
                                                    <h4>{ t('website.signup.BusinessAddress') } <Link to="" onClick={handleOneFormShow}>{ t('website.signup.Edit') }</Link></h4>
                                                    <address>
                                                        <p>{ number }, { street },  <br />
                                                            { autoCity }, { autoProvince }, { autoPostalCode }</p>
                                                        <p>{ telephoneNumber } </p>
                                                    </address>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="RegisterButton">
                                            <h4><img src={Check} /> { t('website.signup.ByProceeding') }</h4>

                                            <button type="submit" disabled={submitDisable}>{ t('website.signup.Submit') }</button>

                                            <h5>{ t('website.signup.AlreadyHaveaccount') } <a href="javascript:void(0);" onClick={handleShow}>{ t('website.signup.Login') }</a></h5>

                                            <h6><Link to="/">{ t('website.signup.BacktoHome') }</Link></h6>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                        </FORM>
                    </div>

                </div>
            </div>
        </section>

        <Footer />
        </>
    );
}

export default SignupCorporate