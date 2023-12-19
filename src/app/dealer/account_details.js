import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import _ from 'lodash'
import FORM from 'react-bootstrap/Form';

import Header from "./header";
import Footer from "./footer";

import { providerDetailsUpdate } from "../../redux/actions/provider/authAction";

const DealerAccountDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const providerDetails = JSON.parse(window.localStorage.getItem("providerDetails"));

    const [partTypeChecked, setPartTypeChecked] = useState(providerDetails.partType);
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

    const [vehicleTypeChecked, setVehicleTypeChecked] = useState(providerDetails.vehicleType);
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

    const [offeredServiceChecked, setOfferedServiceChecked] = useState(providerDetails.offeredService);
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

    const [serviceAvailableChecked, setServiceAvailableChecked] = useState(providerDetails.serviceAvailable);
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

    let handleDetailUpdate = () => {
        
        const data = {
            signupFor:'dealer',
            partType:partTypeChecked,
            vehicleType:vehicleTypeChecked,
            offeredService:offeredServiceChecked,
            serviceAvailable:serviceAvailableChecked
        }
        dispatch(providerDetailsUpdate(data)).then(res => {
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
            <ToastContainer/>

            <div class="WrapperArea">
                <div class="WrapperBox"> 

                    <div class="TitleBox">
                        <h4>Edit Dealer</h4>
                    </div>

                    <div class="DealerDetails">

                        <div class="Small-Wrapper">
                            <div class="PartBox">
                                <h3>Select Parts Type :</h3> 
                            
                                <div class="GaragesForm">
                                    <div class="form-group">    
                                        <ul>
                                        {
                                            partTypeChecked && partTypeChecked.length>0 && partTypeChecked.map((item, i) => 
                                                
                                                <li key={i}>
                                                    <input type="checkbox" name="partType" value={ item.name } checked={item.checked} onChange={handlePartTypeChange} />
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
                                <h3>Select vehicle Type :</h3> 
                            
                                <div class="GaragesForm">
                                    <div class="form-group">
                                        <ul>
                                        {
                                            vehicleTypeChecked && vehicleTypeChecked.length>0 && vehicleTypeChecked.map((item, i) => 
                                                
                                                <li key={i}>
                                                    <input type="checkbox" name="vehicleType" value={ item.name } checked={item.checked} onChange={handleVehicleTypeChange} />
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
                                <h3>Select Parts Offered by vender:</h3> 
                                <ul>
                                {
                                    offeredServiceChecked && offeredServiceChecked.length>0 && offeredServiceChecked.map((item, i) => 
                                        
                                        <li key={i}>
                                            <input type="checkbox" name="offeredService" value={ item.name } checked={item.checked} onChange={handleOfferedServiceChange} />
                                            <span> { item.name } </span>
                                        </li>
                                    )
                                } 
                                </ul>
                            </div> 
                        </div>

                        <div class="Small-Wrapper">
                            <div class="PartBox">
                                <h3>Services Available :</h3> 
                            
                                <div class="GaragesForm">
                                    <div class="form-group">
                                        <ul>
                                        {
                                            serviceAvailableChecked && serviceAvailableChecked.length>0 && serviceAvailableChecked.map((item, i) => 
                                                
                                                <li key={i}>
                                                    <input type="checkbox" name="repairType" value={ item.name } checked={item.checked} onChange={handleServiceAvailableChange} />
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

export default DealerAccountDetails