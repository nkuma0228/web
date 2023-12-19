import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import Select from 'react-select'
import makeAnimated from 'react-select/animated';

import _ from 'lodash'
import FORM from 'react-bootstrap/Form';

import Header from "./header";
import Footer from "./footer";

import { manufacturerList, providerDetails, providerUpdate, providerPaymentUpdate, providerPasswordUpdate, providerGalleryRemoveUpdate, providerGalleryUpdate } from "../../redux/actions/provider/authAction";

import Profile from "../../assets/garage/images/profile.jpg";

const initialState = {
    companyName:'',
    business:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
    telephoneNumber:'',
    extension:'',
    businessType:'',
    image:'',
    
    companyNameEmpty:'',
    businessEmpty:'',
    firstNameEmpty:'',
    lastNameEmpty:'',
    phoneEmpty:'',
    telephoneNumberEmpty:'',
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
const initialStateGallery = {
    imageGallery:'',
}
const initialStatePassword = {
    oldPassword:'',
    password:'',
    confirmPassword:'',
    oldPasswordEmpty:'',
    passwordEmpty:'',
    confirmPasswordEmpty:'',
}
var imagePreview = [];
var imageFile = [];

const DealerAccount = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { i18n, t } = useTranslation();
    const animatedComponents = makeAnimated();

    const [paymentTypeChecked, setPaymentTypeChecked] = useState([
        { name:'Cash', checked: false },
        { name:'Visa', checked: false },
        { name:'Mastercard', checked: false },
        { name:'American Express', checked: false },
        { name:'Interact', checked: false },
        { name:'Discover', checked: false },
        { name:'Other', checked: false }
    ]);

    const getProfileData = useSelector(state => state.provider)
    const {manufacturerData, providerData} = getProfileData
    
    const [cState, updateCState] = useState(initialState);
    const {
        companyName,
        business,
        firstName,
        lastName,
        email,
        phone,
        telephoneNumber,
        extension,
        businessType,
        image,
        companyNameEmpty,
        businessEmpty,
        firstNameEmpty,
        lastNameEmpty,
        phoneEmpty,
        telephoneNumberEmpty,
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

    const [gState, updateGState] = useState(initialStateGallery);
    const {
        imageGallery
    } = gState

    const [pState, updatePState] = useState(initialStatePassword);
    const {
        oldPassword,
        password,
        confirmPassword,
        oldPasswordEmpty,
        passwordEmpty,
        confirmPasswordEmpty,
    } = pState

    useEffect(() => {
        if(gState.imageGallery.length>0) {
            gState.imageGallery.map((item, i) => {
                //console.log("loop i", i)
                if(imagePreview.includes(item)) {} else {
                    imagePreview.push(item)
                }
            })
        }
        if(imagePreview.length>0) {
            setSelectedImagePreview(imagePreview)
        }
    },[gState])

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

    useEffect(() => {
        dispatch(providerDetails())
    },[])

    useEffect(() => {
        if (!_.isEmpty(providerData)) {

            const updateData = _.cloneDeep(cState)
            updateData.companyName = providerData.companyName
            updateData.business = providerData.business
            updateData.firstName = providerData.firstName
            updateData.lastName = providerData.lastName
            updateData.email = providerData.email
            updateData.phone = providerData.phone
            updateData.telephoneNumber = providerData.telephone
            updateData.extension = providerData.extension
            updateData.image = providerData.image
            updateData.businessType = providerData.businessType
            
            if(providerData.manufacturer && providerData.manufacturer.length>0) {
                let splitdata = providerData.manufacturer;

                let manuData = splitdata.map((item) => {
                    return { value : item, label: item}
                })
                setManufacturerSelected(manuData)
            }

            if(providerData.paymentType) {
                setPaymentTypeChecked(providerData.paymentType)
            }
            setSelectedImagePreview({ file: providerData.imageGallery })
            updateCState(updateData)
        }
        if (!_.isEmpty(providerData)) {
            const updateAddData = _.cloneDeep(addState)
            updateAddData.autoLocation = providerData.location
            updateAddData.number = providerData.number
            updateAddData.street = providerData.street
            updateAddData.autoCity = providerData.city
            updateAddData.autoPostalCode = providerData.postalCode
            updateAddData.autoProvince = providerData.province
            updateAddData.autoCountries = providerData.country
            updateAddData.autoLatitude = providerData.latitude
            updateAddData.autoLongitude = providerData.longitude
            updateAddState(updateAddData)
            if(providerData.country == "Canada") {
                setCountryCodeState("CA")
            } else {
                setCountryCodeState("USA")
            }
        }
        
        if (!_.isEmpty(providerData)) {
            const updateGalleryData = _.cloneDeep(gState)
            updateGalleryData.imageGallery = providerData.imageGallery
            updateGState(
                updateGalleryData
            )
        }

    },[providerData])
    
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
        let telephoneNumberEmpty = ''
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
        if (!telephoneNumber.trim()) {
            telephoneNumberEmpty = "Please enter telephone number";
            formIsValid = false;
        }
     
        updateCState({
            ...cState, 
            companyNameEmpty,
            businessEmpty,
            firstNameEmpty,
            lastNameEmpty,
            phoneEmpty,
            telephoneNumberEmpty,
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
        // console.log("autoPostalCode", autoPostalCode)
        // if (!autoPostalCode.trim()) {
        //     autoPostalCodeEmpty = "Please enter postal code";
        //     formIsValid = false;
        // }
        // if (!autoCountries.trim()) {
        //     autoCountriesEmpty = "Please enter Country";
        //     formIsValid = false;
        // }
        // if (!autoProvince.trim()) {
        //     autoProvinceEmpty = "Please enter province";
        //     formIsValid = false;
        // } else {
        //     if(autoProvince.match(/^[A-Za-z ]+$/)) {
        //     } else {
        //         autoProvinceEmpty = "Please enter only alphabets";
        //         formIsValid = false;
        //     }
        // }
    
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
                companyName,
                business,
                firstName,
                lastName,
                phone:'',

                businessType,
                manufacturer:JSON.stringify(manufacturerSelected),

                location:autoLocation,
                number,
                street,
                city:autoCity,
                postalCode: autoPostalCode,
                province: autoProvince,
                country: autoCountries,
                latitude: autoLatitude,
                longitude: autoLongitude,
                telephone:telephoneNumber,
                
                extension:'',
            }
            if(!autoLatitude && !autoLongitude) {
                toast.error("Please enter valid location", {
                    position: toast.POSITION.TOP_RIGHT
                });
            } else {
                //updateSubmitDisable(true)
                dispatch(providerUpdate(data)).then(res => {
                    if (res.code == 200) {
                        toast.success(res.message, {
                            position: toast.POSITION.TOP_RIGHT
                        });
                        setTimeout(
                            function() {
                                navigate("/dealer/account")
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
                            companyNameEmpty : '',
                            businessEmpty : '',
                            firstNameEmpty : '',
                            lastNameEmpty : '',
                            phoneEmpty : '',
                            telephoneNumberEmpty : '',
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
            dispatch(providerPasswordUpdate(data)).then(res => {
                if (res.code == 200) {
                    toast.success(res.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    setTimeout(
                        function() {
                            navigate("/dealer/account")
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

    const [selectedImage, setSelectedImage] = useState([]);
    const [selectedImagePreview, setSelectedImagePreview] = useState([]);
    const uploadMultipleFiles = (e) => {

        if(imagePreview.length <3) {
            if (e.target.files && e.target.files.length > 0) {
                
                imageFile.push(e.target.files[0])
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
    const removeSelectedImage = (i, img) => {
        imagePreview.splice(i, 1)
        imageFile.splice(i, 1)
        setSelectedImage({ file: imageFile });
        setSelectedImagePreview(imagePreview);
        if(img.includes("https://autowiz.us:8080/")) {
            const data = {
                removeIndex:i
            }
            console.log("removeIndex", data)
            dispatch(providerGalleryRemoveUpdate(data)).then(res => {
                if (res.code == 200) {
                    window.location.reload()
                } else {
                    toast.error(res.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }
            }).catch(err => {
                const message = err && err.response && err.response.data ? err.response.data.message : "Something went wrong."
                toast.error(message, {
                    position: toast.POSITION.TOP_RIGHT
                });
            })
        }
    };

    const uploadGalleryImages = async (e) => {
        e.preventDefault()
        if(selectedImage.file.length > 0) {
            
            const data = {
                imageGallery:selectedImage.file
            }
            dispatch(providerGalleryUpdate(data)).then(res => {
                if (res.code == 200) {
                    toast.success(res.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    window.location.reload()
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

        } else {
            if(selectedImage.file.length > 0) {
            } else {
                toast.error("Please upload image for update", {
                    position: toast.POSITION.TOP_RIGHT
                });   
            }
        }
    }

    const handleDealerDetails = (providerDetails) => {
        window.localStorage.setItem("providerDetails",  JSON.stringify(providerDetails));
    }

    const handleReviewView = () => {
        window.localStorage.setItem("dealerReviewID",  providerData._id);
    }

    const handlePaymentChange = (e) => {
        var isChecked = e.target.checked;
        const item = e.target.value;
        setPaymentTypeChecked(paymentTypeChecked.map( (type) => {
            if(type.name == item) {
                type.checked = isChecked
            }
            return { name:type.name, checked:type.checked }
        }));
    }
    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        const data = {
            paymentType:paymentTypeChecked,
        }
        dispatch(providerPaymentUpdate(data)).then(res => {
            if (res.code == 200) {
                toast.success(res.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
                setTimeout(
                    function() {
                        navigate("/dealer/account")
                    }
                    .bind(this),
                    2000
                );
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

    return (
        <>
            <Header />

            <div class="WrapperArea">
                <div class="WrapperBox"> 

                    <div class="Small-Wrapper">
                        <div class="TitleBox">
                            <h4> { t('vendor.account.AccountSettings') } </h4>
                        </div>

                        <div class="StaticBoxArea">

                            <div class="panel-group" id="accordion">
                                <div class="panel">
                                    <div class="panel-heading" data-toggle="collapse" data-parent="#accordion" href="#collapse2">
                                        <h4><span><i class="fa fa-user"></i></span> { t('vendor.account.PersonalDetails') } </h4> 
                                    </div>
                                    <div id="collapse2" class="panel-collapse collapse">
                                        <div class="panel-body">
                                            <div class="ProfileBox">
                                                <div class="" style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                                                    <div class="ProfileHead">
                                                    </div>
                                                    <div class="EditNext">
                                                        <Link to="/dealer/account/details" onClick={()=>handleDealerDetails(providerData)} class="Edit">
                                                            { t('vendor.account.EditDealerServices') } <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
                                                        </Link>
                                                    </div> 
                                                </div>

                                                <FORM onSubmit={handleSubmit}>
                                                    <div class="row">
                                                        <div class="col-sm-6">
                                                            <div class="form-group">
                                                                <label> { t('website.signup.Companylegalname') } </label>
                                                                <input type="text" class="form-control" name="companyName" value={companyName} onChange={handleInputChange} />
                                                                <span style={{ color: "red" }}>{companyNameEmpty}</span>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <div class="form-group">
                                                                <label> { t('website.signup.Doingbusinessas') } </label>
                                                                <input type="text" class="form-control" name="business" value={business} onChange={handleInputChange} />
                                                                <span style={{ color: "red" }}>{businessEmpty}</span>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <div class="form-group">
                                                                <label>{ t('website.signup.Ownersfirstname') }</label>
                                                                <input type="text" class="form-control" name="firstName" value={firstName} onChange={handleInputChange} />
                                                                <span style={{ color: "red" }}>{firstNameEmpty}</span>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <div class="form-group">
                                                                <label>{ t('website.signup.Ownerslastname') }</label>
                                                                <input type="text" class="form-control" name="lastName" value={lastName} onChange={handleInputChange} />
                                                                <span style={{ color: "red" }}>{lastNameEmpty}</span>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <div class="form-group">
                                                                <label> { t('website.signup.EmailAddress') } </label>
                                                                <input type="text" class="form-control" name="email" value={email} readOnly />
                                                                
                                                            </div>
                                                        </div>

                                                        <div class="col-sm-6">
                                                            <div class="form-group">
                                                                <label> { t('website.signup.TelephoneNumber') } </label>
                                                                <input type="text" class="form-control" name="telephoneNumber" value={telephoneNumber} onChange={handleInputChange} />
                                                                <span style={{ color: "red" }}>{telephoneNumberEmpty}</span>
                                                            </div>
                                                        </div>

                                                        <div class="col-sm-6">
                                                            <div class="form-group">
                                                                <label> { t('website.signup.SearchLocation') } </label>
                                                                <input type="text" class="form-control" ref={inputRef} name="autoLocation" value={autoLocation} onChange={handleInputAddressChange} />
                                                                <span style={{ color: "red" }}>{autoLocationEmpty}</span>
                                                            </div>
                                                        </div>

                                                        <div class="col-sm-6">
                                                            <div class="form-group">
                                                                <label> { t('website.signup.Number') } </label>
                                                                <input type="text" class="form-control" name="number" value={number} onChange={handleInputAddressChange} />
                                                                <span style={{ color: "red" }}>{numberEmpty}</span>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <div class="form-group">
                                                                <label> { t('website.signup.Street') } </label>
                                                                <input type="text" class="form-control" name="street" value={street} onChange={handleInputAddressChange} />
                                                                <span style={{ color: "red" }}>{streetEmpty}</span>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="col-sm-6">
                                                            <div className="form-group">
                                                                <label> { t('website.signup.City') } </label>
                                                                <input type="text" className="form-control" name="autoCity" value={autoCity} onChange={handleInputAddressChange} />
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

                                                        <div className="col-sm-6">
                                                            <div className="form-group">
                                                            <label> { t('website.signup.BusinessType') } </label>
                                                                <select className="form-control" name="businessType" value={businessType} onChange={handleInputChange}>
                                                                    <option value=""> { t('website.signup.BusinessType') } </option>
                                                                    <option value="Franchise"> Franchise </option>
                                                                    <option value="Independent Dealer"> Independent Dealer </option>
                                                                </select>
                                                            </div>
                                                        </div>

                                                        <div className="col-sm-6">
                                                            <div className="form-group">

                                                                <label> { t('website.signup.MANUFACTURIER') } </label>
                                                                <Select
                                                                    value={manufacturerSelected}
                                                                    closeMenuOnSelect={false}
                                                                    components={animatedComponents}
                                                                    isMulti
                                                                    options={manufacturerDataSelected} 
                                                                    onChange={handleManufacturerChange}
                                                                />
                                                            </div>
                                                        </div>
                                                        
                                                        <div class="col-sm-12">
                                                            <div class="text-center">
                                                                <button type="submit" class="Accept"> { t('vendor.account.Update') }  </button>
                                                            </div> 
                                                        </div>
                                                    </div>
                                                </FORM>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="panel">
                                    <div className="panel-heading" data-toggle="collapse" data-parent="#accordion" href="#collapse3">
                                        <h4><span><i className="fa fa-picture-o" aria-hidden="true"></i></span> { t('vendor.account.Gallery') } </h4> 
                                    </div>
                                    <div id="collapse3" className="panel-collapse collapse">
                                        <div className="panel-body">
                                            <div className="CommonForm">
                                                <div className="col-sm-12">
                                                    <div className="form-group">
                                                        <ul className="ImaesGroup">
                                                            <li>
                                                                <div className="AddImages">
                                                                    <span><i className="fa fa-plus" aria-hidden="true"></i></span>
                                                                    <p>Add Images</p>
                                                                    <input type="file" accept="image/*" name="images" onChange={uploadMultipleFiles}/>
                                                                </div>
                                                            </li>

                                                            {
                                                                selectedImagePreview && selectedImagePreview.length > 0 ? 
                                                                selectedImagePreview.map((img, i) =>
                                                                        <li key={i}>
                                                                            <button type="button" className="Close" onClick={()=>removeSelectedImage(i, img)}>×</button>
                                                                            <img src={img} />
                                                                        </li>
                                                                    )
                                                                : ""
                                                            }
                                                        </ul>
                                                    </div>
                                                    <div className="text-center">
                                                        <button type="button" className="Accept" onClick={uploadGalleryImages}> { t('vendor.account.Update') }  </button>
                                                    </div>
                                                </div> 
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="panel">
                                    <div className="panel-heading" data-toggle="collapse" data-parent="#accordion" href="#collapse333">
                                        <h4><span><i className="fa fa-money" aria-hidden="true"></i></span> { t('vendor.account.PaymentMethod') } </h4> 
                                    </div>
                                    <div id="collapse333" className="panel-collapse collapse">
                                        <div className="panel-body">
                                            <h4 style={{ "marginBottom":"20px"}}> { t('vendor.account.Paymentmethodaccepted') } :</h4>
                                            <FORM onSubmit={handlePaymentSubmit}>
                                                <div class="GaragesForm">
                                                    <div class="form-group"> 
                                                        <ul>
                                                        {
                                                            paymentTypeChecked && paymentTypeChecked.length>0 && paymentTypeChecked.map((item, i) => 
                                                                <li key={i}>
                                                                    <label class="CheckBox"> { item.name }
                                                                        <input type="checkbox" name="pamentMode" value={ item.name } checked={item.checked} onChange={handlePaymentChange} />
                                                                        <span class="checkmark"></span>
                                                                    </label>
                                                                </li> 
                                                        )}
                                                        </ul>
                                                        <div className="col-sm-12">
                                                            <div className="text-center">
                                                                <button type="submit" className="Accept"> { t('vendor.account.Update') }  </button>
                                                            </div> 
                                                        </div>
                                                    </div>
                                                </div>
                                            </FORM>
                                        </div>
                                    </div>
                                </div>

                                <div class="panel">
                                    <div class="panel-heading" data-toggle="collapse" data-parent="#accordion" href="#collapse3">
                                        <h4><span><i class="fa fa-unlock-alt" aria-hidden="true"></i></span> { t('vendor.account.Password') } </h4> 
                                    </div>
                                    <div id="collapse3" class="panel-collapse collapse">
                                        <div class="panel-body">
                                            <div class="CommonForm">
                                                <FORM onSubmit={handlePasswordSubmit}>
                                                    <div class="form-group">
                                                        <div class="row">
                                                            <div class="col-sm-3">
                                                                <label> { t('vendor.account.EnteryouroldPassword') } </label>
                                                            </div>
                                                            <div class="col-sm-9">
                                                                <input type="password" class="form-control" name="oldPassword" placeholder={ t('vendor.account.EnteryouroldPassword') } value={oldPassword} onChange={handleInputPasswordChange}/>
                                                                <span style={{ color: "red" }}>{oldPasswordEmpty}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="form-group">
                                                        <div class="row">
                                                            <div class="col-sm-3">
                                                                <label> { t('vendor.account.Createnewpassword') } </label>
                                                            </div>
                                                            <div class="col-sm-9">
                                                                <input type="password" class="form-control" name="password" placeholder={ t('vendor.account.Createnewpassword') } value={password} onChange={handleInputPasswordChange} />
                                                                <span style={{ color: "red" }}>{passwordEmpty}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="form-group">
                                                        <div class="row">
                                                            <div class="col-sm-3">
                                                                <label> { t('vendor.account.Confirmnewpassword') } </label>
                                                            </div>
                                                            <div class="col-sm-9">
                                                                <input type="password" class="form-control" name="confirmPassword" placeholder={ t('vendor.account.Confirmnewpassword') } value={confirmPassword} onChange={handleInputPasswordChange} />
                                                                <span style={{ color: "red" }}>{confirmPasswordEmpty}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="text-center">
                                                        <button type="submit" class="Accept"> { t('vendor.account.Updatepassword') } </button>
                                                    </div>
                                                </FORM>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="PannelTwo">
                                <Link to="/dealer/my/reviews" onClick={handleReviewView}>
                                    <span><i className="fa fa-star-o"></i></span>
                                    { t('vendor.account.Review') }
                                </Link>
                            </div>

                        </div>
                    </div>   
                </div>
            </div>

            <Footer />
        </>
    );
}

export default DealerAccount