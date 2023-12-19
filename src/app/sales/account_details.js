import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import _ from 'lodash'
import FORM from 'react-bootstrap/Form';

import Header from "./header";
import Footer from "./footer";

import { providerDetailsUpdate } from "../../redux/actions/provider/authAction";

const SalesAccountDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const providerDetails = JSON.parse(window.localStorage.getItem("providerDetails"));

    const [vehicleTypeChecked, setVehicleTypeChecked] = useState(providerDetails.salesVehicleType);
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

    const [businessTypeChecked, setBusinessTypeChecked] = useState(providerDetails.businessType);
    const handleBusinessTypeChange = (e) => {
        var isChecked = e.target.checked;
        const item = e.target.value;
        setBusinessTypeChecked(businessTypeChecked.map( (type) => {
            if(type.name == item) {
                type.checked = isChecked
            }
            return { name:type.name, checked:type.checked }
        }));
    }

    let handleDetailUpdate = () => {
        
        const data = {
            signupFor:'sales',
            salesVehicleType:vehicleTypeChecked,
            businessType:businessTypeChecked
        }
        dispatch(providerDetailsUpdate(data)).then(res => {
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

            <div class="WrapperArea">
                <div class="WrapperBox"> 

                    <div class="TitleBox">
                        <h4>Edit Auto dealer</h4>
                    </div>

                    <div class="DealerDetails">

                        <div class="Small-Wrapper">
                            <div class="PartBox">
                                <h3>Select type of vehicles:</h3> 
                            
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
                                <h3>Select type of business at or near:</h3> 
                            
                                <div class="GaragesForm">
                                    <div class="form-group">
                                        <ul>
                                        {
                                            businessTypeChecked && businessTypeChecked.length>0 && businessTypeChecked.map((item, i) => 
                                                
                                                <li key={i}>
                                                    <input type="checkbox" name="businessType" value={ item.name } checked={item.checked} onChange={handleBusinessTypeChange} />
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

export default SalesAccountDetails