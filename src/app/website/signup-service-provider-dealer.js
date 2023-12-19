import React, {useState, useEffect, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import FORM from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';

import Select from 'react-select'
import makeAnimated from 'react-select/animated';

import { manufacturerList, providerSignup,providerEmailCheck } from "../../redux/actions/provider/authAction";

import Header from "../website/header";
import Footer from "./footer";
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
    businessType:'',
    imageGallery:'',
    companyNameEmpty:'',
    businessEmpty:'',
    firstNameEmpty:'',
    lastNameEmpty:'',
    emailEmpty:'',
    referredByEmpty:'',
    telephoneNumberEmpty:'',
    passwordEmpty:'',
    businessTypeEmpty:'',
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

let imagePreview = [];
let imageFile = [];

const SignupServiceProviderDealer = () => {
    const { i18n, t } = useTranslation();
    var lang  = i18n.language

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const animatedComponents = makeAnimated();

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
        businessType,
        imageGallery,
        companyNameEmpty,
        businessEmpty,
        firstNameEmpty,
        lastNameEmpty,
        emailEmpty,
        referredByEmpty,
        telephoneNumberEmpty,
        passwordEmpty,
        confirmPasswordEmpty,
        businessTypeEmpty
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
        //componentRestrictions: { country: "ng" },
        fields: ["address_components", "geometry", "icon", "name"],
        types: ["establishment"]
    };
    useEffect(() => {
        dispatch(manufacturerList())

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
    const { manufacturerData, countryData } = country

    const [loginShow, setLoginShow] = useState(false);
    const handleClose = () => setLoginShow(false);
    const handleShow = () => setLoginShow(true);

    const [confirmationShow, setConfirmationShow] = useState(false);
    const handleConfirmationClose = () => {setConfirmationShow(false); navigate("/") }
    const handleConfirmationShow = () => setConfirmationShow(true);

    const [oneFormShow, setOneFormShow] = useState('flex');
    const [twoFormShow, setTwoFormShow] = useState('none');
    const [threeFormShow, setThreeFormShow] = useState('none');
    const [oneStepShow, setOneStepShow] = useState('block');
    const [twoStepShow, setTwoStepShow] = useState('none');

    const [manufacturerDataSelected, setManufacturerDataSelected] = useState([]);
    const [manufacturerSelected, setManufacturerSelected] = useState([]);
    const handleManufacturerChange = (selectedOption) => {
        if(selectedOption) {
            let vtArr= selectedOption.map((item) => item.value);
            setManufacturerSelected(vtArr);
        } else {
            setManufacturerSelected([]); 
        }
    };
    useEffect(() => {
        if(manufacturerData && manufacturerData.length > 0) {
            let manuData = manufacturerData.map((item) => {
                return { value : item._id, label: item._id}
            })
            setManufacturerDataSelected(manuData)
        }
    },[manufacturerData]);

    const handleOneFormShow = () => {
        setOneFormShow('block'); setTwoFormShow('none'); setThreeFormShow('none');
    }

    const handleThreeFormShow = () => {
        let formIsValid = handleServicesValidation();
        if(formIsValid) {
            setThreeFormShow('block'); setOneFormShow('none'); setTwoFormShow('none');
            setTwoStepShow('block'); setOneStepShow('none');
            window.scrollTo({
                top: 0,
                left: 100,
                behavior: 'auto'
            });
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

    const [vehicleTypeChecked, setVehicleTypeChecked] = useState([
        { name:'Racing', checked: false },
        { name:'Hybrid', checked: false },
        { name:'Diesel', checked: false },
        { name:'European Cars', checked: false },
        { name:'Electric', checked: false },
        { name:'Trucks | Vans', checked: false },
        { name:'Auto Trans', checked: false },
        { name:'Manual Trans', checked: false },
        { name:'American Cars', checked: false },
        { name:'Asian Cars', checked: false },
        { name:'Other', checked: false }
    ]);
    const handleVehicleTypeChange = (e) => {
        var isChecked = e.target.checked;
        const item = e.target.value;
        setVehicleTypeChecked(vehicleTypeChecked.map( (type) => {
            if(type.name == item) {
                type.checked = isChecked
            }
            return { name:type.name, checked:type.checked }
        }));
    }

    const [offeredServiceChecked, setOfferedServiceChecked] = useState([
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
    const handleOfferedServiceChange = (e) => {
        var isChecked = e.target.checked;
        const item = e.target.value;
        setOfferedServiceChecked(offeredServiceChecked.map( (type) => {
            if(type.name == item) {
                type.checked = isChecked
            }
            return { name:type.name, checked:type.checked }
        }));
    }

    const [serviceAvailableChecked, setServiceAvailableChecked] = useState([
        { name:'Oil Changes', checked: false },
        { name:'Diagnostic', checked: false },
        { name:'Tire Changes', checked: false },
        { name:'Brake Replacement', checked: false },
        { name:'Wholesale', checked: false }
    ]);
    const handleServiceAvailableChange = (e) => {
        var isChecked = e.target.checked;
        const item = e.target.value;
        setServiceAvailableChecked(serviceAvailableChecked.map( (type) => {
            if(type.name == item) {
                type.checked = isChecked
            }
            return { name:type.name, checked:type.checked }
        }));
    }
    
    const [manufacturerHide, setManufacturerHide] = useState("block");
    const handleInputChange = (e) => {
        const { name, value } = e.target
        updateCState({
            ...cState, [name]: value
        })
        if(name == "businessType") {
            if(value == "Independent Dealer") { setManufacturerHide("none")
            } else { setManufacturerHide("block") }
        }
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

    const handleServicesValidation = () => {
        let formIsValid = false;
        for (let x in partTypeChecked) {
            if(partTypeChecked[x].checked == true) {
                formIsValid = true;
            }
        }
        if(!formIsValid) {
            toast.error("Please select part type:", {
                position: toast.POSITION.TOP_RIGHT
            });
        }

        let formOneIsValid = false;
        for (let x in vehicleTypeChecked) {
            if(vehicleTypeChecked[x].checked == true) {
                formOneIsValid = true;
            }
        }
        if(!formOneIsValid) {
            toast.error("Please select vehicle type:", {
                position: toast.POSITION.TOP_RIGHT
            });
        }

        let formTwoIsValid = false;
        for (let x in offeredServiceChecked) {
            if(offeredServiceChecked[x].checked == true) {
                formTwoIsValid = true;
            }
        }
        if(!formTwoIsValid) {
            toast.error("Please select offered Services in your Garage:", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        // let formThreeIsValid = false;
        // for (let x in serviceAvailableChecked) {
        //     if(serviceAvailableChecked[x].checked == true) {
        //         formThreeIsValid = true;
        //     }
        // }
        // if(!formThreeIsValid) {
        //     toast.error("Please select services Available", {
        //         position: toast.POSITION.TOP_RIGHT
        //     });
        // }
        
        if(formIsValid == true && formOneIsValid == true && formTwoIsValid == true) {
            return true
        } else {
            return false
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
            streetEmpty
        })
        return formIsValid;
    }

    const handleTwoFormShow = async() => {
        let formIsValid = handleValidation();
        let addressFormIsValid = handleAddressValidation();
        if (formIsValid && addressFormIsValid) {
            
            if(autoLatitude && autoLongitude) {
                const data = { email:email}
                dispatch(providerEmailCheck(data)).then(res => {
                    if (res.code == 200) {

                        //console.log("email-check", res)
                        setTwoFormShow('flex'); setOneFormShow('none'); setThreeFormShow('none');
                        window.scrollTo({
                            top: 0,
                            left: 100,
                            behavior: 'auto'
                        });
                    } else {

                        //console.log("email-check", res)
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

    let handleSubmit = (event) => {
        event.preventDefault();
        // let formIsValid = handleValidation();
        // if (formIsValid) {

            if(manufacturerSelected.length>0) {
                var manufacturerS = manufacturerSelected;
            } else {
                var manufacturerS = ["other"];
            }
        
            handleSubmitDisable()

            const data = { 
                signupFor:'dealer',
                companyName,
                business,
                firstName,
                lastName,
                email,
                referredBy,
                telephone:telephoneNumber,
                extension:'',
                password,
                lang:lang,
                businessType,
                manufacturer:manufacturerS,

                location:autoLocation,
                number,
                street,
                city:autoCity,
                postalCode:autoPostalCode,
                country:autoCountries,
                province:autoProvince,
                latitude:autoLatitude,
                longitude:autoLongitude,
                partType:partTypeChecked,
                vehicleType:vehicleTypeChecked,
                offeredService:offeredServiceChecked,
                serviceAvailable:serviceAvailableChecked,
                imageGallery:selectedImage.file
            }
            dispatch(providerSignup(data)).then(res => {

                if (res.code == 201) {
                    toast.success(res.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    handleConfirmationShow()

                    setSelectedImage([]);
                    setSelectedImagePreview([]);
                    
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
                        // if(item.param == "mobile"){
                        //     newParam = "telephone number"
                        // }
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
                        numberEmpty : '',
                        streetEmpty : '',
                        cityEmpty : '',
                        postalCodeEmpty : '',
                        provinceEmpty : '',
                        telephoneNumberEmpty : '',
                        //extensionEmpty : '',
                        passwordEmpty : '',
                        confirmPasswordEmpty : ''
                    })
                }
            }).catch(err => {
                handleSubmitEnable()
                const message = err && err.response && err.response.data ? err.response.data.message : "Something went wrong."
                toast.error(message, {
                    position: toast.POSITION.TOP_RIGHT
                });
            })
        //}
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

    return (
        <>
            <Header />
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
                    <h3>{ t('website.signup.ServicesProviderSignupVendor') }</h3>
                    <ul>
                        <li><Link to="/">{ t('website.signup.Home') }</Link></li>
                        <li className="active"><a href="javascript:void(0);">{ t('website.signup.ServicesProviderSignupVendor') }</a></li>
                    </ul>
                </div>
            </section>

            <section>
                <div className="RegisterArea">
                    <div className="container">

                        <div className="StepBox">
                            <div id="showSteps" style={{ display: oneStepShow }}>
                                <h3> { t('website.signup.AutoPartsVendor') } </h3>
                                <ul>
                                    <li className={ (oneFormShow == 'flex' || twoFormShow == 'flex')? 'active' : ''}>
                                        <span><i className="fa fa-check" aria-hidden="true"></i></span>
                                        <label>{ t('website.signup.step1') }</label>
                                    </li> 
                                    <li className={ (twoFormShow == 'flex')? 'active' : ''}>
                                        <span><i className="fa fa-check" aria-hidden="true"></i></span>
                                        <label>{ t('website.signup.step2') }</label>
                                    </li>
                                </ul>
                            </div>
                            <div id="showInfo" style={{ display: twoStepShow }}>
                                <h3> { t('website.signup.AutoPartsVendor') } </h3> 
                            </div>
                        </div>

                        <div className="RegisterForm">
                            <FORM onSubmit={handleSubmit} enctype="multipart/form-data">
                                <div style={{display: oneFormShow }}>
                                    <div className="row" id="firstFormView">
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <input type="text" className="form-control" name="companyName" autoComplete="off" placeholder={ t('website.signup.Companylegalname') } value={companyName} onChange={handleInputChange}/>
                                                <span style={{ color: "red" }}>{companyNameEmpty}</span>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <input type="text" className="form-control" name="business" autoComplete="off" placeholder={ t('website.signup.Doingbusinessas') } value={business} onChange={handleInputChange}/>
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
                                                    {/* <input type="text" className="form-control" name="extension" placeholder="Extn." value={extension} onChange={handleInputChange}/> */}
                                                
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
                                            </div>
                                        </div>

                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <select className="form-control" name="businessType" value={businessType} onChange={handleInputChange}>
                                                    <option value=""> { t('website.signup.BusinessType') } </option>
                                                    <option value="Franchise"> Franchise </option>
                                                    <option value="Independent Dealer"> Independent Dealer </option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-sm-6" style={{ display:manufacturerHide }}>
                                            <div className="form-group">
                                                <Select 
                                                    //menuIsOpen={true}
                                                    closeMenuOnSelect={false}
                                                    components={animatedComponents}
                                                    isMulti
                                                    options={manufacturerDataSelected} 
                                                    onChange={handleManufacturerChange}
                                                />
                                            </div>
                                        </div>

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
                                </div>
                                <div style={{display: twoFormShow }}>
                                    <div id="secondFormView">
                                        <div className="RepairsBox">
                                            <p>{ t('website.PartsType.SelectPartsType') } :</p>
                                            <ul>
                                                <li>
                                                    <input type="checkbox" name="partType" value="New parts" onChange={handlePartTypeChange} />
                                                    <span>{ t('website.PartsType.NewParts') }</span>
                                                </li>
                                                <li>
                                                    <input type="checkbox" name="partType" value="Used parts" onChange={handlePartTypeChange} />
                                                    <span>{ t('website.PartsType.UsedParts') }</span>
                                                </li>
                                                <li>
                                                    <input type="checkbox" name="partType" value="Rebuilt/Reconditioned" onChange={handlePartTypeChange} />
                                                    <span>{ t('website.PartsType.RebuiltReconditioned') }</span>
                                                </li>
                                            </ul> 
                                        </div>
                                        <div className="RepairsBox">
                                            <p> { t('website.VehiclesType.SelectVehiclesType') } :</p>
                                            <ul>
                                                <li>
                                                    <input type="checkbox" name="vehicleType" value="Racing" onChange={handleVehicleTypeChange}  />
                                                    <span>{ t('website.vehicletype.Racing') }</span>
                                                </li> 
                                                <li>
                                                    <input type="checkbox" name="vehicleType" value="Hybrid" onChange={handleVehicleTypeChange} />
                                                    <span>{ t('website.vehicletype.Hybrid') }</span>
                                                </li> 
                                                <li>
                                                    <input type="checkbox" name="vehicleType" value="Diesel" onChange={handleVehicleTypeChange} />
                                                    <span>{ t('website.vehicletype.Diesel') }</span>
                                                </li> 
                                                <li>
                                                    <input type="checkbox" name="vehicleType" value="European Cars" onChange={handleVehicleTypeChange} />
                                                    <span>{ t('website.vehicletype.Europeancars') }</span>
                                                </li> 
                                                <li>
                                                    <input type="checkbox" name="vehicleType" value="Electric" onChange={handleVehicleTypeChange} />
                                                    <span>{ t('website.vehicletype.Electric') }</span>
                                                </li> 
                                                <li>
                                                    <input type="checkbox" name="vehicleType" value="Trucks | Vans" onChange={handleVehicleTypeChange} />
                                                    <span>{ t('website.vehicletype.TrucksVans') }</span>
                                                </li> 
                                                <li>
                                                    <input type="checkbox" name="vehicleType" value="Auto Trans" onChange={handleVehicleTypeChange} />
                                                    <span>{ t('website.vehicletype.AutoTrans') }</span>
                                                </li> 
                                                <li>
                                                    <input type="checkbox" name="vehicleType" value="Manual Trans" onChange={handleVehicleTypeChange} />
                                                    <span>{ t('website.vehicletype.ManualTrans') }</span>
                                                </li> 
                                                <li>
                                                    <input type="checkbox" name="vehicleType" value="American Cars" onChange={handleVehicleTypeChange} />
                                                    <span>{ t('website.vehicletype.AmericanCars') }</span>
                                                </li> 
                                                <li>
                                                    <input type="checkbox" name="vehicleType" value="Asian Cars" onChange={handleVehicleTypeChange} />
                                                    <span>{ t('website.vehicletype.AsianCars') }</span>
                                                </li>
                                                <li>
                                                    <input type="checkbox" name="vehicleType" value="Other" onChange={handleVehicleTypeChange} />
                                                    <span>{ t('website.vehicletype.Other') }</span>
                                                </li>  
                                            </ul>
                                        </div>
                                        <div className="RepairsBox">
                                            <p> { t('website.PartsOffered.SELECTPARTSOFFEREDBYVENDOR') }:</p>
                                            <ul>
                                                <li>
                                                    <input type="checkbox" name="offeredService" value="Oil Changes" onChange={handleOfferedServiceChange} />
                                                    <span>{ t('website.PartsOffered.OilChanges') }</span>
                                                </li>
                                                <li>
                                                    <input type="checkbox" name="offeredService" value="Filters" onChange={handleOfferedServiceChange} />
                                                    <span>{ t('website.PartsOffered.Filters') }</span>
                                                </li>
                                                <li>
                                                    <input type="checkbox" name="offeredService" value="Belts" onChange={handleOfferedServiceChange} />
                                                    <span>{ t('website.PartsOffered.Belts') }</span>
                                                </li>
                                                <li>
                                                    <input type="checkbox" name="offeredService" value="Hoses" onChange={handleOfferedServiceChange} />
                                                    <span>{ t('website.PartsOffered.Hoses') }</span>
                                                </li> 
                                                <li>
                                                    <input type="checkbox" name="offeredService" value="Tires" onChange={handleOfferedServiceChange} />
                                                    <span>{ t('website.PartsOffered.Tires') }</span>
                                                </li> 
                                                <li>
                                                    <input type="checkbox" name="offeredService" value="Battery" onChange={handleOfferedServiceChange} />
                                                    <span>{ t('website.PartsOffered.Battery') }</span>
                                                </li> 
                                                <li>
                                                    <input type="checkbox" name="offeredService" value="Shocks" onChange={handleOfferedServiceChange} />
                                                    <span>{ t('website.PartsOffered.Shocks') }</span>
                                                </li> 
                                                <li>
                                                    <input type="checkbox" name="offeredService" value="Lubricants" onChange={handleOfferedServiceChange} />
                                                    <span>{ t('website.PartsOffered.Lubricants') }</span>
                                                </li> 
                                                <li>
                                                    <input type="checkbox" name="offeredService" value="Wipers" onChange={handleOfferedServiceChange} />
                                                    <span>{ t('website.PartsOffered.Wipers') }</span>
                                                </li> 
                                                <li>
                                                    <input type="checkbox" name="offeredService" value="Antifreeze" onChange={handleOfferedServiceChange} />
                                                    <span>{ t('website.PartsOffered.Antifreeze') }</span>
                                                </li> 
                                                <li>
                                                    <input type="checkbox" name="offeredService" value="Heating" onChange={handleOfferedServiceChange} />
                                                    <span>{ t('website.PartsOffered.Heating') }</span>
                                                </li> 
                                                <li>
                                                    <input type="checkbox" name="offeredService" value="Auto cleaning products" onChange={handleOfferedServiceChange} />
                                                    <span>{ t('website.PartsOffered.Autocleaningproducts') }</span>
                                                </li> 
                                                <li>
                                                    <input type="checkbox" name="offeredService" value="Engine Parts" onChange={handleOfferedServiceChange} />
                                                    <span>{ t('website.PartsOffered.EngineParts') }</span>
                                                </li> 
                                                <li>
                                                    <input type="checkbox" name="offeredService" value="Spark Plugs" onChange={handleOfferedServiceChange} />
                                                    <span>{ t('website.PartsOffered.SparkPlugs') }</span>
                                                </li> 
                                                <li>
                                                    <input type="checkbox" name="offeredService" value="Air Con / Heating" onChange={handleOfferedServiceChange} />
                                                    <span>{ t('website.PartsOffered.AirConHeating') }</span>
                                                </li> 
                                                <li>
                                                    <input type="checkbox" name="offeredService" value="Electricals" onChange={handleOfferedServiceChange} />
                                                    <span>{ t('website.PartsOffered.Electricals') }</span>
                                                </li> 
                                                <li>
                                                    <input type="checkbox" name="offeredService" value="Brake Pads" onChange={handleOfferedServiceChange} />
                                                    <span>{ t('website.PartsOffered.BrakePads') }</span>
                                                </li> 
                                                <li>
                                                    <input type="checkbox" name="offeredService" value="Rotors" onChange={handleOfferedServiceChange} />
                                                    <span>{ t('website.PartsOffered.Rotors') }</span>
                                                </li> 
                                                <li>
                                                    <input type="checkbox" name="offeredService" value="Wipers Module" onChange={handleOfferedServiceChange} />
                                                    <span>{ t('website.PartsOffered.WipersModule') }</span>
                                                </li> 
                                                <li>
                                                    <input type="checkbox" name="offeredService" value="Calipers" onChange={handleOfferedServiceChange} />
                                                    <span> { t('website.PartsOffered.Calipers') }</span>
                                                </li> 
                                                <li>
                                                    <input type="checkbox" name="offeredService" value="Lights and Bulbs" onChange={handleOfferedServiceChange} />
                                                    <span> { t('website.PartsOffered.LightsandBulbs') }</span>
                                                </li> 
                                                <li>
                                                    <input type="checkbox" name="offeredService" value="Auto Body parts" onChange={handleOfferedServiceChange} />
                                                    <span>{ t('website.PartsOffered.AutoBodyparts') }</span>
                                                </li> 
                                                <li>
                                                    <input type="checkbox" name="offeredService" value="Paints" onChange={handleOfferedServiceChange} />
                                                    <span>{ t('website.PartsOffered.Paints') }</span>
                                                </li> 
                                                <li>
                                                    <input type="checkbox" name="offeredService" value="Starters and Alternators" onChange={handleOfferedServiceChange} />
                                                    <span>{ t('website.PartsOffered.StartersandAlternators') }</span>
                                                </li> 
                                                <li>
                                                    <input type="checkbox" name="offeredService" value="Roof Racks and Carriers" onChange={handleOfferedServiceChange} />
                                                    <span>{ t('website.PartsOffered.RoofRacksandCarriers') }</span>
                                                </li> 
                                                <li>
                                                    <input type="checkbox" name="offeredService" value="Auto Covers" onChange={handleOfferedServiceChange} />
                                                    <span>{ t('website.PartsOffered.AutoCovers') }</span>
                                                </li> 
                                                <li>
                                                    <input type="checkbox" name="offeredService" value="Exhaust Systems" onChange={handleOfferedServiceChange} />
                                                    <span>{ t('website.PartsOffered.ExhaustSystems') }</span>
                                                </li>  
                                            </ul>
                                        </div>

                                        <div className="RepairsBox">
                                            <p> { t('website.ServicesAvailable.ServicesAvailable') } :</p>
                                            <ul>
                                                <li>
                                                    <input type="checkbox" name="serviceAvailable" value="Oil Changes" onChange={handleServiceAvailableChange} />
                                                    <span> { t('website.ServicesAvailable.OilChanges') } </span>
                                                </li>
                                                <li>
                                                    <input type="checkbox" name="serviceAvailable" value="Diagnostic" onChange={handleServiceAvailableChange} />
                                                    <span> { t('website.ServicesAvailable.Diagnostic') } </span>
                                                </li>
                                                <li>
                                                    <input type="checkbox" name="serviceAvailable" value="Tire Changes" onChange={handleServiceAvailableChange} />
                                                    <span> { t('website.ServicesAvailable.TireChanges') } </span>
                                                </li>
                                                <li>
                                                    <input type="checkbox" name="serviceAvailable" value="Brake Replacement" onChange={handleServiceAvailableChange} />
                                                    <span> { t('website.ServicesAvailable.Brakereplacement') } </span>
                                                </li>
                                                <li>
                                                    <input type="checkbox" name="serviceAvailable" value="Wholesale" onChange={handleServiceAvailableChange} />
                                                    <span> { t('website.ServicesAvailable.Wholesale') } </span>
                                                </li> 
                                            </ul>
                                        </div>
                                        
                                        <div className="RegisterButton"> 
                                            <Link className="Submit" to="" onClick={handleThreeFormShow}>{ t('website.signup.Continue') }</Link>
                                            <h5>{ t('website.signup.AlreadyHaveaccount') } <a href="javascript:void(0);" onClick={handleShow}>{ t('website.signup.Login') }</a></h5>
                                            <h6><Link to="/">{ t('website.signup.BacktoHome') }</Link></h6>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: threeFormShow }}>
                                    <div id="thirdFormView" >
                                        <div className="GarageInformation">
                                            <div className="RegisterForm">
                                                <div className="row">
                                                    <div className="col-sm-5">
                                                        <div className="InformationBox">
                                                            <h4>{ t('website.signup.YourInformation') } <Link to="" onClick={handleOneFormShow}> { t('website.signup.Edit') } </Link></h4>
                                                            <ul>
                                                                <li>
                                                                    <h6>{ t('website.signup.Companylegalname') }</h6>
                                                                    <p> { companyName } </p>
                                                                </li>
                                                                <li>
                                                                    <h6>{ t('website.signup.Doingbusinessas') }</h6>
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
                                                            <h4> { t('website.signup.BusinessAddress') } <Link to="" onClick={handleOneFormShow}> { t('website.signup.Edit') } </Link></h4>
                                                            <address>
                                                                <p>{ number }, { street },  <br />
                                                                    { autoCity }, { autoProvince }, { autoPostalCode }</p>
                                                                <p>{ telephoneNumber } </p>
                                                            </address>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="RegisterButton"> 
                                                    <h4><img src={Check} /> { t('website.signup.ByProceeding') } </h4>

                                                    <button type="submit" disabled={submitDisable}>{ t('website.signup.Submit') }</button>

                                                    <h5>{ t('website.signup.AlreadyHaveaccount') } <a href="javascript:void(0);" onClick={handleShow}>{ t('website.signup.Login') }</a></h5>

                                                    <h6><Link to="/">{ t('website.signup.BacktoHome') }</Link></h6>
                                                </div> 
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

export default SignupServiceProviderDealer