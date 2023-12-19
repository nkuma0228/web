import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import {Link} from "react-router-dom";
import FORM from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';

import { clientLogin, clientForgot } from "../../redux/actions/client/authAction";
import { corporateLogin, corporateForgot } from "../../redux/actions/corporate/authAction";
import { providerLogin, providerForgot } from "../../redux/actions/provider/authAction";

import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';

import Check from "../../assets/website/images/Check.png";
import Confirmation from "../../assets/website/images/Confirmation.png";

const initialState = {
    email:'',
    password:'',
    emailEmpty:'',
    passwordEmpty:'',
}
const initialProviderState = {
    emailProvider:'',
    passwordProvider:'',
    emailProviderEmpty:'',
    passwordProviderEmpty:'',
}
const initialForgotField = {
    emailForgot:'',
    emailForgotEmpty:'',
}

const ModalBox = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { i18n, t } = useTranslation();

    const {loginShow, handleClose, handleShow, corporateShow, handleCorporateClose, handleCorporateShow, confirmationShow, handleConfirmationClose, confirmationSignupShow, handleConfirmationSignupClose, confirmationContactShow, handleConfirmationContactClose, aciveShow, signupTextShow } = props
    const activeTabShow = aciveShow ? "Client": "Service"
    
    const [providerLoginShow, setProviderLoginShow] = useState(false);
    const handleProviderClose = () => setProviderLoginShow(false);
    const handleProviderShow = () => setProviderLoginShow(true);

    const [forgotShow, setForgotShow] = useState(false);
    const handleForgotClose = () => {
        setForgotShow(false)
    }
    const handleForgotShow = () => { 
        setForgotShow(true) 
        handleClose()
    };

    const [providerForgotShow, setProviderForgotShow] = useState(false);
    const handleProviderForgotClose = () => {
        setProviderForgotShow(false)
    }
    const handleProviderForgotShow = () => { 
        setProviderForgotShow(true)
        handleClose()
    };

    const handleBackToLogin = () => {
        handleShow()
        setForgotShow(false)
    }

    const [cState, updateCState] = useState(initialState);
    const {
        email,
        password,
        emailEmpty,
        passwordEmpty,
    } = cState

    const handleInputChange = (e) => {
        const { name, value } = e.target
        updateCState({
            ...cState, [name]: value
        })
    }

    const handleValidation = () => {
        let emailEmpty = ''
        let passwordEmpty = ''
        let formIsValid = true;

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
        if (!password.trim()) {
            passwordEmpty = "Please enter password";
            formIsValid = false;
        } else {
            if(password.length < 5) {  
                passwordEmpty = "Password length must be atleast 5 characters";
                formIsValid = false;
            }
        }

        updateCState({
            ...cState, 
            emailEmpty, 
            passwordEmpty,
        })
        return formIsValid;
    }

    let handleSubmit = (event) => {
        event.preventDefault();
        let formIsValid = handleValidation();
        if (formIsValid) {
            const data = { email, password }
            
            dispatch(clientLogin(data)).then(res => {
                if (res.code == 200) {
                    toast.success(res.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    navigate('/client/dashboard')
                } else {
                    toast.error(res.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    updateCState({
                        ...cState, 
                        errorMsg: res.message,
                        emailEmpty: '',
                        passwordEmpty: '',
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

    let handleCorporateSubmit = (event) => {
        event.preventDefault();
        let formIsValid = handleValidation();
        if (formIsValid) {
            const data = { email, password }
            
            dispatch(corporateLogin(data)).then(res => {
                if (res.code == 200) {
                    toast.success(res.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    navigate('/corporate/dashboard')
                } else {
                    toast.error(res.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    updateCState({
                        ...cState, 
                        errorMsg: res.message,
                        emailEmpty: '',
                        passwordEmpty: '',
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

    const [pState, updatePState] = useState(initialProviderState);
    const {
        emailProvider,
        passwordProvider,
        emailProviderEmpty,
        passwordProviderEmpty,
    } = pState

    const handleProviderInputChange = (e) => {
        const { name, value } = e.target
        updatePState({
            ...pState, [name]: value
        })
    }

    const handleProviderValidation = () => {
        let emailProviderEmpty = ''
        let passwordProviderEmpty = ''
        let formIsValid = true;

        if (!emailProvider.trim()) {
            emailProviderEmpty = "Please enter email id";
            formIsValid = false;
        } else {
            var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if (emailProvider.match(validRegex)) {
            } else {
                emailProviderEmpty = "Please enter valid email id";
                formIsValid = false;
            }
        }
        if (!passwordProvider.trim()) {
            passwordProviderEmpty = "Please enter password";
            formIsValid = false;
        } else {
            if(passwordProvider.length < 5) {  
                passwordProviderEmpty = "Password length must be atleast 5 characters";
                formIsValid = false;
            }
        }
        updatePState({
            ...pState, 
            emailProviderEmpty, 
            passwordProviderEmpty,
        })
        return formIsValid;
    }

    let handleProviderSubmit = (event) => {
        event.preventDefault();
        let formIsValid = handleProviderValidation();
        if (formIsValid) {
            const data = { email:emailProvider, password:passwordProvider }
            //updateSubmitDisable(true)
            dispatch(providerLogin(data)).then(res => {
                if (res.code == 200) {
                    toast.success(res.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    if(res.data.signupFor == "garage") {
                        navigate('/garage/dashboard')
                    } else if(res.data.signupFor == "sales") {
                        navigate('/sales/dashboard')
                    } else if(res.data.signupFor == "dealer") {
                        navigate('/dealer/dashboard')
                    } else {
                        navigate('/corporate/dashboard/client')
                    }
                } else {
                    toast.error(res.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    updateCState({
                        ...cState, 
                        errorMsg: res.message,
                        emailProviderEmpty: '',
                        passwordProviderEmpty: '',
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

    const [fState, updateFState] = useState(initialForgotField);
    const {
        emailForgot,
        emailForgotEmpty,
    } = fState
    const handleForgotChange = (e) => {
        const { name, value } = e.target
        updateFState({
            ...fState, [name]: value
        })
    }
    const handleForgotValidation = () => {
        let emailForgotEmpty = ''
        let formIsValid = true;

        if (!emailForgot.trim()) {
            emailForgotEmpty = "Please enter email id";
            formIsValid = false;
        }
        updateFState({
            ...fState, 
            emailForgotEmpty,
        })
        return formIsValid;
    }
    let handleForgotSubmit = (event) => {
        event.preventDefault();
        let formIsValid = handleForgotValidation();
        if (formIsValid) {
            const data = { email:emailForgot }
            //updateSubmitDisable(true)
            dispatch(clientForgot(data)).then(res => {
                if (res.code == 200) {
                    toast.success(res.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    updateFState({
                        ...fState,
                        errorMsg: res.message,
                        emailForgot: '',
                        emailForgotEmpty: '',
                    })

                    handleForgotClose()

                } else {
                    toast.error(res.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    updateFState({
                        ...fState,
                        errorMsg: res.message,
                        emailForgotEmpty: '',
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
    let handleProviderForgotSubmit = (event) => {
        event.preventDefault();
        let formIsValid = handleForgotValidation();
        if (formIsValid) {
            const data = { email:emailForgot }
            //updateSubmitDisable(true)
            dispatch(providerForgot(data)).then(res => {
                if (res.code == 200) {
                    toast.success(res.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    updateFState({
                        ...fState,
                        errorMsg: res.message,
                        emailForgot: '',
                        emailForgotEmpty: '',
                    })

                    handleProviderForgotClose()

                } else {
                    toast.error(res.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    updateFState({
                        ...fState,
                        errorMsg: res.message,
                        emailForgotEmpty: '',
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

            <Modal show={loginShow}>
                <div className="ModalBox">
                    <div className="modal-body">
                        <button className="Close" onClick={handleClose} >&times;</button> 
                        <div className="LoginForm">
                            <h3>{ t('website.login.Login') }</h3>
                            <h5>{ t('website.login.WelcomeToAutowiz') }, { t('website.login.PleasePutYourLogin') }.</h5>

                            <Tab.Container id="left-tabs-example" defaultActiveKey={activeTabShow}>
                                <Nav variant="pills">
                                    <Nav.Item>
                                    <Nav.Link eventKey="Client">{ t('website.login.Clientlogin') }</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                    <Nav.Link eventKey="Service">{ t('website.login.ServiceProviderLogin') }</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                <Tab.Content>
                                    <Tab.Pane eventKey="Client">
                                        <div className="">
                                            <FORM onSubmit={handleSubmit}>
                                                <div className="form-group">
                                                    <input type="text" className="form-control" name="email" placeholder={ t('website.login.EnterEmailAddress') } autoComplete="off" value={email} onChange={handleInputChange}/>
                                                    <span style={{ color: "red" }}>{emailEmpty}</span>
                                                </div>
                                                <div className="form-group">
                                                    <input type="password" className="form-control" name="password" placeholder={ t('website.login.EnterYourPassword') } autoComplete="off" value={password} onChange={handleInputChange}/>
                                                    <span style={{ color: "red" }}>{passwordEmpty}</span>
                                                </div>  
                                                <div className="form-group">
                                                    <p> 
                                                        <a href="javascript:void(0);" onClick={handleForgotShow}>{ t('website.login.ForgotPassword') }</a>
                                                    </p>
                                                </div>
                                                <div className="form-group text-center">
                                                    <button type="submit">{ t('website.login.Login') }</button>
                                                </div>
                                            </FORM>
                                        </div>

                                        <h6>{ t('website.login.NoAccount') } <Link to="/signup" onClick={handleClose} > { (signupTextShow == "Client") ? t('website.login.Client')  : t('website.login.Client') }</Link></h6>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="Service">
                                        <div className="">
                                            <FORM onSubmit={handleProviderSubmit}>
                                                <div className="form-group">
                                                    <input type="text" className="form-control" name="emailProvider" placeholder={ t('website.login.EnterEmailAddress') } value={emailProvider} onChange={handleProviderInputChange} />
                                                    <span style={{ color: "red" }}>{emailProviderEmpty}</span>
                                                </div>
                                                <div className="form-group">
                                                    <input type="password" className="form-control" name="passwordProvider" placeholder={ t('website.login.EnterYourPassword') } value={passwordProvider} onChange={handleProviderInputChange} />
                                                    <span style={{ color: "red" }}>{passwordProviderEmpty}</span>
                                                </div>  
                                                <div className="form-group">
                                                    <p> 
                                                        <a href="javascript:void(0);" onClick={handleProviderForgotShow} >{ t('website.login.ForgotPassword') }</a>
                                                    </p>
                                                </div>
                                                <div className="form-group text-center">
                                                    <button type="submit">{ t('website.login.Login') }</button>
                                                </div>

                                                <h6>{ t('website.login.NoAccount') }
                                                    {
                                                        (signupTextShow == "Garage" ?
                                                            <Link to="/service-provider-signup/garage" onClick={handleClose} > { (signupTextShow == "Client") ? t('website.login.SignUpasaProvider')  : t('website.login.SignUpasaProvider') }</Link>
                                                        :
                                                            signupTextShow == "Dealer" ?
                                                                <Link to="/service-provider-signup/dealer" onClick={handleClose} > { (signupTextShow == "Client") ? t('website.login.SignUpasaProvider')  : t('website.login.SignUpasaProvider') }</Link>
                                                            :
                                                            <Link to="/service-provider-signup" onClick={handleClose} > { (signupTextShow == "Client") ? t('website.login.SignUpasaProvider')  : t('website.login.SignUpasaProvider') }</Link>
                                                        )
                                                    }
                                                </h6>
                                            </FORM>
                                        </div>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Tab.Container>
                        </div>
                    </div> 
                </div>
            </Modal>

            <Modal show={providerLoginShow}>
                <div className="ModalBox">
                    <div className="modal-body">
                        <button className="Close" onHide={handleProviderClose}>&times;</button> 
                        <div className="LoginForm">
                        <h3>{ t('website.login.Login') }</h3>
                            <h5>{ t('website.login.WelcomeToAutowiz') }, { t('website.login.PleasePutYourLogin') }.</h5>

                            <Tab.Container id="left-tabs-example" defaultActiveKey="Service">
                                <Nav variant="pills">
                                    <Nav.Item>
                                    <Nav.Link eventKey="Client">{ t('website.login.Clientlogin') }</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                    <Nav.Link eventKey="Service">{ t('website.login.ServiceProviderLogin') }</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                <Tab.Content>
                                    <Tab.Pane eventKey="Client">
                                        <div className="">
                                            <form>
                                                <div className="form-group">
                                                    <input type="text" className="form-control" placeholder="Enter Email Address" />
                                                </div>
                                                <div className="form-group">
                                                    <input type="text" className="form-control" placeholder="Enter your password..." />
                                                </div>  
                                                <div className="form-group">
                                                    <p> 
                                                        <a href="javascript:void(0);" onClick={handleForgotShow}>Forgot password</a>
                                                    </p>
                                                </div>
                                                <div className="form-group text-center">
                                                    <button>Login</button>
                                                </div>
                                            </form>
                                        </div>

                                        <h6>No account with us yet ? <Link to="/signup">Sign Up as a Client</Link></h6>

                                    </Tab.Pane>
                                    <Tab.Pane eventKey="Service">
                                        <div className="">
                                            <form>
                                                <div className="form-group">
                                                    <input type="text" className="form-control" placeholder="Enter Email Address" />
                                                </div>
                                                <div className="form-group">
                                                    <input type="text" className="form-control" placeholder="Enter your password..." />
                                                </div>  
                                                <div className="form-group">
                                                    <p> 
                                                        <a href="javascript:void(0);" onClick={handleProviderForgotShow}>Forgot password</a>
                                                    </p>
                                                </div>
                                                <div className="form-group text-center">
                                                    <button>Login</button>
                                                </div>
                                            </form>
                                        </div>

                                        <h6>No account with us yet ? <Link to="/service-provider-signup">Sign Up as a Client</Link></h6>

                                    </Tab.Pane>
                                </Tab.Content>
                            </Tab.Container>

                        </div>
                    </div> 
                </div>
            </Modal>

            <Modal show={corporateShow}>
                <div className="ModalBox">
                    <div className="modal-body">
                        <button className="Close" onClick={handleCorporateClose} >&times;</button> 
                        <div className="LoginForm">
                            <h3>Corporate { t('website.login.Login') }</h3>
                            <h5>{ t('website.login.WelcomeToAutowiz') }, { t('website.login.PleasePutYourLogin') }.</h5>

                            <div className="">
                                <FORM onSubmit={handleCorporateSubmit}>
                                    <div className="form-group">
                                        <input type="text" className="form-control" name="email" placeholder={ t('website.login.EnterEmailAddress') } autoComplete="off" value={email} onChange={handleInputChange}/>
                                        <span style={{ color: "red" }}>{emailEmpty}</span>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control" name="password" placeholder={ t('website.login.EnterYourPassword') } autoComplete="off" value={password} onChange={handleInputChange}/>
                                        <span style={{ color: "red" }}>{passwordEmpty}</span>
                                    </div>  
                                    <div className="form-group">
                                        <p> <a href="javascript:void(0);" onClick={handleForgotShow}>{ t('website.login.ForgotPassword') }</a> </p>
                                    </div>
                                    <div className="form-group text-center">
                                        <button type="submit">{ t('website.login.Login') }</button>
                                    </div>
                                </FORM>
                            </div>
                        </div>
                    </div> 
                </div>
            </Modal>

            <Modal show={forgotShow}>
                <div className="ModalBox">
                    <div className="modal-body">
                        <button className="Close" onClick={handleForgotClose}>&times;</button> 
                        <div className="LoginForm">
                            <h3>Forgot Password</h3>
                            <h5>Please fill in the email you've used to create a new password,  we'll send you a reset link.</h5>

                            <FORM onSubmit={handleForgotSubmit}>
                                <div className="form-group">
                                    <input type="text" name="emailForgot" className="form-control" placeholder="Enter Email Address" value={emailForgot} onChange={handleForgotChange}/>
                                </div> 
                                <br />
                                <div className="form-group text-center">
                                    <button type="submit">Send Link</button>
                                </div>
                            </FORM>

                            <h6><a href="javascript:void(0);" onClick={handleBackToLogin}>Back to Login</a></h6>
                        </div>
                    </div> 
                </div>
            </Modal>

            <Modal show={providerForgotShow}>
                <div className="ModalBox">
                    <div className="modal-body">
                        <button className="Close" onClick={handleProviderForgotClose}>&times;</button> 
                        <div className="LoginForm">
                            <h3>Forgot Password</h3>
                            <h5>Please fill in the email you've used to create a new password,  we'll send you a reset link.</h5>

                            <FORM onSubmit={handleProviderForgotSubmit}>
                                <div className="form-group">
                                    <input type="text" name="emailForgot" className="form-control" placeholder="Enter Email Address" value={emailForgot} onChange={handleForgotChange}/>
                                </div> 
                                <br />
                                <div className="form-group text-center">
                                    <button type="submit">Send Link</button>
                                </div>
                            </FORM>

                            <h6><a href="javascript:void(0);" onClick={handleBackToLogin}>Back to Login</a></h6>
                        </div>
                    </div> 
                </div>
            </Modal>

            <Modal show={confirmationShow}>
                <div className="ModalBox">
                    <div className="modal-body">
                        <button className="Close" onClick={handleConfirmationClose}>&times;</button> 
                        <div className="ConfirmationBox">
                            <span><img src={Confirmation} /></span>
                            <p> { t('website.modal.Thankyouforsubmitting') } </p>
                        </div>
                    </div> 
                </div>
            </Modal>

            <Modal show={confirmationSignupShow}>
                <div className="ModalBox">
                    <div className="modal-body">
                        <button className="Close" onClick={handleConfirmationSignupClose}>&times;</button> 
                        <div className="ConfirmationBox">
                            <span><img src={Confirmation} /></span>
                            <p> { t('website.modal.ThankRegistration') } </p>
                        </div>
                    </div> 
                </div>
            </Modal>

            <Modal show={confirmationContactShow}>
                <div className="ModalBox">
                    <div className="modal-body">
                        <button className="Close" onClick={handleConfirmationContactClose}>&times;</button> 
                        <div className="ConfirmationBox">
                            <span><img src={Confirmation} /></span>
                            <p> { t('website.modal.Thankyoucontact') } </p>
                        </div>
                    </div> 
                </div>
            </Modal>
            
        </>

    );
}

export default ModalBox