import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import _ from 'lodash'
import FORM from 'react-bootstrap/Form';

import Header from "./header";
import Footer from "./footer";

import { providerDetailsUpdate } from "../../redux/actions/provider/authAction";

const GarageAccountDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const providerDetails = JSON.parse(window.localStorage.getItem("providerDetails"));

    const [repairTypeChecked, setRepairTypeChecked] = useState(providerDetails.repairType);
    const handleRepairChange = (e) => {
        var isChecked = e.target.checked;
        const item = e.target.value;
        setRepairTypeChecked(repairTypeChecked.map( (type) => {
            if(type.name == item) {
                type.checked = isChecked
            }
            return { name:type.name, checked:type.checked }
        }));
    }

    const [nearServiceChecked, setNearServiceChecked] = useState(providerDetails.nearService);
    const handleNearServiceChange = (e) => {
        var isChecked = e.target.checked;
        const item = e.target.value;
        setNearServiceChecked(nearServiceChecked.map( (type) => {
            if(type.name == item) {
                type.checked = isChecked
            }
            return { name:type.name, checked:type.checked }
        }));
    }
    const [specialityServiceChecked, setSpecialityServiceChecked] = useState(providerDetails.specialityService);
    const handleSpecialityServiceChange = (e) => {
        var isChecked = e.target.checked;
        const item = e.target.value;
        setSpecialityServiceChecked(specialityServiceChecked.map( (type) => {
            if(type.name == item) {
                type.checked = isChecked
            }
            return { name:type.name, checked:type.checked }
        }));
    }

    const [vehicleTypeChecked, setVehicleTypeChecked] = useState(providerDetails.garageVehicleType);
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

    let handleDetailUpdate = () => {
        
        const data = {
            signupFor:'garage',
            repairType:repairTypeChecked,
            nearService:nearServiceChecked,
            specialityService:specialityServiceChecked,
            garageVehicleType:vehicleTypeChecked
        }
        dispatch(providerDetailsUpdate(data)).then(res => {
            if (res.code == 200) {
                toast.success(res.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
                setTimeout(
                    function() {
                        navigate("/garage/account")
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

            <div class="WrapperArea">
                <div class="WrapperBox"> 

                    <div class="TitleBox">
                        <h4>Edit Garage</h4>
                    </div>

                    <div class="DealerDetails">

                        <div class="Small-Wrapper">
                            <div class="PartBox">
                                <h3>Select type of repairs you can perform:</h3> 
                            
                                <div class="GaragesForm">
                                    <div class="form-group">    
                                        <ul>
                                        {
                                            repairTypeChecked && repairTypeChecked.length>0 && repairTypeChecked.map((item, i) => 
                                                
                                                <li key={i}>
                                                    <input type="checkbox" name="repairType" value={ item.name } checked={item.checked} onChange={handleRepairChange} />
                                                    <span> { item.name } </span>
                                                </li>
                                            )
                                        }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="Small-Wrapper">
                            <div class="PartBox">
                                <h3>Select services at or near your business:</h3> 
                            
                                <div class="GaragesForm">
                                    <div class="form-group">
                                        <ul>
                                        {
                                            nearServiceChecked && nearServiceChecked.length>0 && nearServiceChecked.map((item, i) => 
                                                
                                                <li key={i}>
                                                    <input type="checkbox" name="nearService" value={ item.name } checked={item.checked} onChange={handleNearServiceChange} />
                                                    <span> { item.name } </span>
                                                </li>
                                            )
                                        }
                                        </ul>
                                    </div>
                                </div>
                            </div> 
                        </div>

                        <div class="Small-Wrapper">
                            <div class="PartBox">
                                <h3>Speciality Service</h3> 
                                <div class="GaragesForm">
                                    <div class="form-group">
                                        <ul>
                                        {
                                            specialityServiceChecked && specialityServiceChecked.length>0 && specialityServiceChecked.map((item, i) => 
                                                
                                                <li key={i}>
                                                    <input type="checkbox" name="specialityService" value={ item.name } checked={item.checked} onChange={handleSpecialityServiceChange} />
                                                    <span> { item.name } </span>
                                                </li>
                                            )
                                        } 
                                        </ul>
                                    </div>
                                </div>
                            </div> 
                        </div>

                        <div class="Small-Wrapper">
                            <div class="PartBox">
                                <h3>Select Vehicle Type</h3> 
                            
                                <div class="GaragesForm">
                                    <div class="form-group">
                                        <ul>
                                        {
                                            vehicleTypeChecked && vehicleTypeChecked.length>0 && vehicleTypeChecked.map((item, i) => 
                                                
                                                <li key={i}>
                                                    <input type="checkbox" name="garageVehicleType" value={ item.name } checked={item.checked} onChange={handleVehicleTypeChange} />
                                                    <span> { item.name } </span>
                                                </li>
                                            )
                                        } 
                                        </ul>
                                    </div>
                                </div>
                            </div> 
                        </div>

                        <div class="Small-Wrapper">
                            <div class="PartBox">
                                <div class="GaragesForm">
                                    <div class="form-group text-center">
                                        <button type="button" className="Accept" onClick={handleDetailUpdate}> Update </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            <Footer />
        </>
    )
}

export default GarageAccountDetails