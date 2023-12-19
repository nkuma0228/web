import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import _ from 'lodash'
import FORM from 'react-bootstrap/Form';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

import Header from "./header";
import Footer from "./footer";

import { manufacturerList, providerDetails, providerUpdate, providerPaymentUpdate, providerGalleryUpdate, providerGalleryRemoveUpdate, providerPasswordUpdate } from "../../redux/actions/provider/authAction";

const initialState = {
    companyName:'',
    business:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
    telephoneNumber:'',
    extension:'',
    image:'',
    businessType:'',
    companyNameEmpty:'',
    businessEmpty:'',
    firstNameEmpty:'',
    lastNameEmpty:'',
    phoneEmpty:'',
    telephoneNumberEmpty:'',
    businessTypeEmpty:'',
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

const SalesAccount = () => {
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

    useEffect(() => {
        dispatch(providerDetails())
        dispatch(manufacturerList())
    },[])

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

            if(providerData.paymentType && providerData.paymentType.length>0) {
                setPaymentTypeChecked(providerData.paymentType)
            }
            setSelectedImagePreview({ file: providerData.imageGallery })
            updateCState(updateData)
        }
        if (!_.isEmpty(providerData)) {
            const updateData = _.cloneDeep(addState)
            updateData.autoLocation = providerData.location
            updateData.number = providerData.number
            updateData.street = providerData.street
            updateData.autoCity = providerData.city
            updateData.autoPostalCode = providerData.postalCode
            updateData.autoProvince = providerData.province
            updateData.autoCountries = providerData.country
            updateData.autoLatitude = providerData.latitude
            updateData.autoLongitude = providerData.longitude
            updateAddState(updateData)

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

    const [cState, updateCState] = useState(initialState);
    const [addState, updateAddState] = useState(initialAddressState);
    const [gState, updateGState] = useState(initialStateGallery);
    const [pState, updatePState] = useState(initialStatePassword);

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
        emailEmpty,
        phoneEmpty,
        telephoneNumberEmpty,
    } = cState

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

    const {
        imageGallery
    } = gState

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
        let phoneEmpty = ''
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
            telephoneNumberEmpty
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
                phone,

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
                                navigate("/sales/account")
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
                            numberEmpty : '',
                            streetEmpty : '',
                            cityEmpty : '',
                            postalCodeEmpty : '',
                            provinceEmpty : '',
                            telephoneNumberEmpty : '',
                            //extensionEmpty : '',
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
                            navigate("/sales/account")
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

    const handleGarageDetails = (providerDetails) => {
        window.localStorage.setItem("providerDetails",  JSON.stringify(providerDetails));
    }

    const handleReviewView = () => {
        window.localStorage.setItem("salesReviewID",  providerData._id);
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
                        navigate("/sales/account")
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
            <ToastContainer/>
            <div className="WrapperArea">
                <div className="WrapperBox"> 

                    <div className="Small-Wrapper">
                        <div className="TitleBox">
                            <h4> { t('sales.account.AccountSettings') } </h4>
                        </div>

                        <div className="StaticBoxArea">

                            <div className="panel-group" id="accordion">
                                <div className="panel">
                                    <div className="panel-heading" data-toggle="collapse" data-parent="#accordion" href="#collapse2">
                                        <h4><span><i className="fa fa-user"></i></span> { t('sales.account.PersonalDetails') } </h4> 
                                    </div>
                                    <div id="collapse2" className="panel-collapse collapse">
                                        <div className="panel-body">
                                            <div className="ProfileBox">
                                                <div className="" style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                                                    <div className="EditNext">
                                                        <Link to="/sales/account/details" onClick={()=>handleGarageDetails(providerData)} className="Edit">
                                                            Edit Auto Dealer Services<i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                                                        </Link>
                                                    </div> 
                                                </div>

                                                <FORM onSubmit={handleSubmit}>
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <div className="form-group">
                                                                <label>Company Leagal Name</label>
                                                                <input type="text" className="form-control" name="companyName" value={companyName} onChange={handleInputChange} />
                                                                <span style={{ color: "red" }}>{companyNameEmpty}</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <div className="form-group">
                                                                <label>Doing Business As</label>
                                                                <input type="text" className="form-control" name="business" value={business} onChange={handleInputChange} />
                                                                <span style={{ color: "red" }}>{businessEmpty}</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <div className="form-group">
                                                                <label>Owner's Legal First Name</label>
                                                                <input type="text" className="form-control" name="firstName" value={firstName} onChange={handleInputChange} />
                                                                <span style={{ color: "red" }}>{firstNameEmpty}</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <div className="form-group">
                                                                <label>Owner's Legal Last Name</label>
                                                                <input type="text" className="form-control" name="lastName" value={lastName} onChange={handleInputChange} />
                                                                <span style={{ color: "red" }}>{lastNameEmpty}</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <div className="form-group">
                                                                <label>Email Address</label>
                                                                <input type="text" className="form-control" name="email" value={email} readOnly/>
                                                            </div>
                                                        </div>

                                                        <div className="col-sm-6">
                                                            <div className="form-group">
                                                                <label>Telephone Business Number</label>
                                                                <input type="text" className="form-control" name="telephoneNumber" value={telephoneNumber} onChange={handleInputChange} />
                                                                <span style={{ color: "red" }}>{telephoneNumberEmpty}</span>
                                                            </div>
                                                        </div>

                                                        <div class="col-sm-6">
                                                            <div class="form-group">
                                                                <label>Location</label>
                                                                <input type="text" class="form-control" ref={inputRef} name="autoLocation" value={autoLocation} onChange={handleInputAddressChange} />
                                                                <span style={{ color: "red" }}>{autoLocationEmpty}</span>
                                                            </div>
                                                        </div>

                                                        <div className="col-sm-6">
                                                            <div className="form-group">
                                                                <label>Number</label>
                                                                <input type="text" className="form-control" name="number" value={number} onChange={handleInputAddressChange} />
                                                                <span style={{ color: "red" }}>{numberEmpty}</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <div className="form-group">
                                                                <label>Street</label>
                                                                <input type="text" className="form-control" name="street" value={street} onChange={handleInputAddressChange} />
                                                                <span style={{ color: "red" }}>{streetEmpty}</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <div className="form-group">
                                                                <label>City</label>
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
                                                                <label> { t('website.signup.BusinessType') } </label>
                                                                <select className="form-control" name="businessType" value={businessType} defaultValue={businessType} onChange={handleInputChange}>
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
                                                        
                                                        <div className="col-sm-6">
                                                            <div className="form-group">
                                                                <label> { t('client.account.Country') } </label>
                                                                <select className="form-control" name="autoCountries" value={autoCountries} defaultValue={autoCountries} onChange={handleInputAddressChange}>
                                                                    <option value=""> Select Country </option>
                                                                    <option value="USA"> USA </option>
                                                                    <option value="Canada"> Canada </option>
                                                                </select>
                                                                <span style={{ color: "red" }}>{numberEmpty}</span>
                                                            </div>
                                                        </div>

                                                        <div className="col-sm-12">
                                                            <div className="text-center">
                                                                <button type="submit" className="Accept">Update</button>
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
                                        <h4><span><i className="fa fa-picture-o" aria-hidden="true"></i></span> { t('sales.account.Gallery') } </h4> 
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
                                                        <button type="button" className="Accept" onClick={uploadGalleryImages}>Update Gallery</button>
                                                    </div>
                                                </div> 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="panel">
                                    <div className="panel-heading" data-toggle="collapse" data-parent="#accordion" href="#collapse333">
                                        <h4><span><i className="fa fa-money" aria-hidden="true"></i></span> { t('sales.account.PaymentMethod') } </h4> 
                                    </div>
                                    <div id="collapse333" className="panel-collapse collapse">
                                        <div className="panel-body">
                                            <h4 style={{ "marginBottom":"20px"}}>Payment Method Accepted on Auto Dealer:</h4>
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
                                                                <button type="submit" className="Accept">Update</button>
                                                            </div> 
                                                        </div>
                                                    </div>
                                                </div>
                                            </FORM>
                                        </div>
                                    </div>
                                </div>

                                <div className="panel">
                                    <div className="panel-heading" data-toggle="collapse" data-parent="#accordion" href="#collapse4">
                                        <h4><span><i className="fa fa-unlock-alt" aria-hidden="true"></i></span> { t('sales.account.Password') } </h4> 
                                    </div>
                                    <div id="collapse4" className="panel-collapse collapse">
                                        <div className="panel-body">
                                            <div className="CommonForm">
                                                <FORM onSubmit={handlePasswordSubmit}>
                                                    <div className="form-group">
                                                        <div className="row">
                                                            <div className="col-sm-3">
                                                                <label>Enter your old Password</label>
                                                            </div>
                                                            <div className="col-sm-9">
                                                                <input type="password" className="form-control" name="oldPassword" placeholder="Enter your old Password" value={oldPassword} onChange={handleInputPasswordChange}/>
                                                                <span style={{ color: "red" }}>{oldPasswordEmpty}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <div className="row">
                                                            <div className="col-sm-3">
                                                                <label>Create New Password</label>
                                                            </div>
                                                            <div className="col-sm-9">
                                                                <input type="password" className="form-control" name="password" placeholder="Enter New Password" value={password} onChange={handleInputPasswordChange} />
                                                                <span style={{ color: "red" }}>{passwordEmpty}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <div className="row">
                                                            <div className="col-sm-3">
                                                                <label>Confirm New Password</label>
                                                            </div>
                                                            <div className="col-sm-9">
                                                                <input type="password" className="form-control" name="confirmPassword" placeholder="Re-enter your password" value={confirmPassword} onChange={handleInputPasswordChange} />
                                                                <span style={{ color: "red" }}>{confirmPasswordEmpty}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-center">
                                                        <button type="submit" className="Accept">Update Password</button>
                                                    </div>
                                                </FORM>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="PannelTwo">
                                <Link to="/sales/my/reviews" onClick={handleReviewView}>
                                    <span><i className="fa fa-star-o"></i></span>
                                    { t('sales.account.Review') }
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

export default SalesAccount