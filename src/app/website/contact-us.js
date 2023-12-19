import { React,useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import FORM from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';

import ModalBox from "./modal";
import Header from "../website/header";
import Footer from "../website/footer";

import Contact from "../../assets/website/images/contact.png";
import { contactSave } from "../../redux/actions/static/contactAction";

const initialState = {
    name:'',
    email:'',
    company:'',
    phone:'',
    message:'',
    nameEmpty : '',
    emailEmpty : '',
    messageEmpty : '',
}

const ContactUs = () => {
    const { i18n, t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loginShow, setLoginShow] = useState(false);
    const handleClose = () => setLoginShow(false);
    const handleShow = () => setLoginShow(true);

    const [confirmationContactShow, setConfirmationContactShow] = useState(false);
    const handleConfirmationContactClose = () => setConfirmationContactShow(false);
    const handleConfirmationContactShow = () => setConfirmationContactShow(true);

    const [cState, updateCState] = useState(initialState);
    const {
        name,
        email,
        company,
        phone,
        message,
        nameEmpty,
        emailEmpty,
        messageEmpty,
    } = cState

    const handleInputChange = (e) => {
        const { name, value } = e.target
        updateCState({
            ...cState, [name]: value
        })
    }

    const handleValidation = () => {
        let nameEmpty = ''
        let emailEmpty = ''
        let messageEmpty = ''
        let formIsValid = true;

        if (!name.trim()) {
            nameEmpty = "Please enter name.";
            formIsValid = false;
        } else {
            if(name.match(/^[A-Za-z ]+$/)) {
            } else {
                nameEmpty = "Please enter only alphabets";
                formIsValid = false;
            }
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
        
        if (!message.trim()) {
            messageEmpty = "Please enter message.";
            formIsValid = false;
        }

        updateCState({
            ...cState, 
            nameEmpty, 
            emailEmpty,
            messageEmpty,
        })
        return formIsValid;
    }

    let handleSubmit = (event) => {
        event.preventDefault();
        let formIsValid = handleValidation();
        if (formIsValid) {
            const data = { name, email, company, phone, message }
            //updateSubmitDisable(true)
            dispatch(contactSave(data)).then(res => {
                if (res.code == 201) {

                    toast.success(res.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    handleConfirmationContactShow()
                    
                    updateCState({
                        name: '',
                        email: '',
                        company: '',
                        phone: '',
                        message: '',
                        nameEmpty: '',
                        emailEmpty: '',
                        messageEmpty: '',
                    })

                } else {
                    toast.error(res.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    
                    updateCState({
                        ...cState, 
                        errorMsg: res.message,
                        nameEmpty: '',
                        emailEmpty: '',
                        messageEmpty: '',
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
                confirmationContactShow={confirmationContactShow}
                handleConfirmationContactClose={handleConfirmationContactClose}
            />

            <section>
                <div class="BannerArea">
                    <h3>{ t('website.contactus.ContactUs') }</h3>
                    <ul>
                        <li><Link to="/">{ t('website.contactus.Home') }</Link></li>
                        <li class="active"><a href="javascript:void(0);">{ t('website.contactus.ContactUs') }</a></li>
                    </ul>
                </div>
            </section>

            <section>
                <div class="AssistanceArea">
                    <div class="container">
                        <figcaption> 
                            <h3>{ t('website.contactus.Needassistance') }</h3>
                            <p>{ t('website.contactus.Ourcustomersandgarages') }</p>
                        </figcaption>  
                        <figure>
                            <img src={Contact} />
                        </figure>
                    </div>
                </div>
            </section>

            <section>
                <div class="ContactArea">
                    <div class="container">  
                        <h3>{ t('website.contactus.ContactUs') }</h3>
                        <div class="row">
                            <div class="col-sm-8 offset-sm-2">
                                <FORM onSubmit={handleSubmit}>
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <input type="text" class="form-control" placeholder={ t('website.contactus.Name') } autoComplete="off" name="name" value={name} onChange={handleInputChange} />
                                                <span style={{ color: "red" }}>{nameEmpty}</span>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <input type="text" class="form-control" placeholder={ t('website.contactus.Email') } autoComplete="off" name="email" value={email} onChange={handleInputChange} />
                                                <span style={{ color: "red" }}>{emailEmpty}</span>
                                            </div>
                                        </div> 
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <input type="text" class="form-control" placeholder={ t('website.contactus.Company') } autoComplete="off" name="company" value={company} onChange={handleInputChange} />
                                                
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <input type="text" class="form-control" placeholder={ t('website.contactus.Phone') } autoComplete="off" name="phone" value={phone} onChange={handleInputChange} />
                                                
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <div class="form-group">
                                                <textarea rows="4" class="form-control" placeholder={ t('website.contactus.Message') } name="message" value={message} onChange={handleInputChange} ></textarea>
                                                <span style={{ color: "red" }}>{messageEmpty}</span>
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <div class="form-group text-center">
                                                <button type="submit">{ t('website.contactus.ContactUs') }</button>
                                            </div>
                                        </div>
                                    </div>
                                </FORM>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <Footer />
        </>
    );
}

export default ContactUs