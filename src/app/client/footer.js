import React from "react";
import {Link} from "react-router-dom";
import { useTranslation } from 'react-i18next';

import Sucessfull from "../../assets/client/images/sucessfull.png";
import Cancel from "../../assets/client/images/Cancel.png";

const Footer = () => {
    const { i18n, t } = useTranslation();

    return (
        <>
            <div className="ModalBox">
                <div className="modal fade" id="WelcomeModal">
                    <div className="modal-dialog">
                        <div className="modal-content"> 
                            <div className="modal-body">
                                <div className="CongratulationsBox Welcome">
                                    <a href="javascript:void(0);" type="button" className="Close" data-dismiss="modal">&times;</a>
                                
                                    <h4>Welcome To Autowiz</h4>
                                    <p> { t('client.footer.HowCanWeHelp') } </p>
                                    <ul>
                                        <li><a href="service-garages.html">Services  Garage</a></li>
                                        <li><a href="service-parts.html">Services Auto-Parts</a></li>
                                        <li><a href="javascript:void(0);">Services Auto Sales</a></li>
                                    </ul>
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>


                <div className="modal fade" id="TimeAcceptModal">
                    <div className="modal-dialog">
                        <div className="modal-content"> 
                            <div className="modal-body">
                                <div className="CongratulationsBox">
                                    <a href="javascript:void(0);" type="button" className="Close" data-dismiss="modal">&times;</a>
                                    <figure><img src={Sucessfull} /></figure>
                                    <h4>Thank you! Your request has been submitted to the Garage, We will update you once garage accept your request.</h4>
                                    <p><span>Requested Booking Date</span> 02 Feb 2022</p>
                                    <p><span>Requested Booking Time</span> 3:00 PM</p>
                                    <p><span>Required Services</span> Breaks, Service 2.</p>
                                    <p><span>Cost of Estimate</span> $40</p>
                                </div>
                            </div> 
                        </div>
                    </div>
                </div> 
                <div className="modal fade" id="DeclineModal">
                    <div className="modal-dialog">
                        <div className="modal-content"> 
                            <div className="modal-body">
                                <div className="DeclineBox">
                                    <a href="javascript:void(0);" type="button" className="Close" data-dismiss="modal">&times;</a>
                                    <figure><img src={Cancel} /></figure>
                                    <h4>Sorry for the inconvenience, Kindly share the reason of declining the quote.</h4>
                                    <form>
                                        <div className="form-group">
                                            <label>Please enter your reason here</label>
                                            <textarea rows="4" className="form-control" placeholder="Enter your reason"></textarea>
                                        </div>
                                        <button>Confirm</button>
                                    </form>  
                                </div>
                            </div> 
                        </div>
                    </div>
                </div> 
            </div>
        </>
    );
}

export default Footer