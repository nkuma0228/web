import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { clientResetPassword } from "../../redux/actions/client/authAction";

import Header from "../website/header";
import Footer from "../website/footer";
import FORM from 'react-bootstrap/Form';
import Logo from "../../assets/website/images/Logo.png";

const initialState = {
    password:'',
    passwordEmpty:'',
    confirmPassword:'',
    confirmPasswordEmpty:''
}

const ClientResetPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams()

    const [cState, updateCState] = useState(initialState);
    const {
        password,
        passwordEmpty,
        confirmPassword,
        confirmPasswordEmpty,
    } = cState

    const handleInputChange = (e) => {
        const { name, value } = e.target
        updateCState({
            ...cState, [name]: value
        })
    }

    const handleValidation = () => {
        let passwordEmpty = ''
        let confirmPasswordEmpty = ''
        let formIsValid = true;

        if (!password.trim()) {
            passwordEmpty = "Please enter password";
            formIsValid = false;
        }
        if (!confirmPassword.trim()) {
            confirmPasswordEmpty = "Please enter confirm password";
            formIsValid = false;
        } else {

            if (confirmPassword.trim() != password.trim()) {
                confirmPasswordEmpty = "Confirm password and password doesn't match";
                formIsValid = false;
            }
        }
        updateCState({
            ...cState, 
            passwordEmpty,
            confirmPasswordEmpty,
        })
        return formIsValid;
    }

    let handleSubmit = (event) => {
        event.preventDefault();
        let formIsValid = handleValidation();
        if (formIsValid) {

            const data = { tokenID:params.param1, password }
            dispatch(clientResetPassword(data)).then(res => {
                if (res.code == 200) {
                    toast.success("Password updated successfully", {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    setTimeout(
                        function() {
                            navigate("/")
                        }
                        .bind(this),
                        2000
                    );
                } else {
                    
                    toast.error(res.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    
                    updateCState({
                        ...cState, 
                        errorMsg: res.message,
                        passwordEmpty: '',
                        confirmPasswordEmpty: '',
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

    return (
        <>
            <ToastContainer/>
            <Header />

            <section>
                <div className="RegisterArea">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-10 offset-sm-1">
                                <div className="RegisterForm">
                                    <h5 style={{ textAlign: "center",color: "#f2cf00" }}>Reset Password </h5>
                                    <FORM onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label style={{ color: "#ffffff" }}>Password</label>
                                            <input type="password" className="form-control" name="password" placeholder="Enter your password" value={password} onChange={handleInputChange}/>
                                            <span style={{ color: "red" }}>{passwordEmpty}</span>
                                        </div>

                                        <div className="form-group">
                                            <label style={{ color: "#ffffff" }}>Confirm Password</label>
                                            <input type="password" className="form-control" name="confirmPassword" placeholder="Enter your confirm password" value={confirmPassword} onChange={handleInputChange}/>
                                            <span style={{ color: "red" }}>{confirmPasswordEmpty}</span>
                                        </div>
                                        
                                        <div className="col-sm-12">
                                            <div className="RegisterButton">
                                                <button type="submit" className="Button">Update Password</button>
                                                <h6><Link to="/">Back to Home</Link></h6>
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

export default ClientResetPassword