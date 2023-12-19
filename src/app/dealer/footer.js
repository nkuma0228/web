import React from "react";
import {Link} from "react-router-dom";
import Modal from 'react-bootstrap/Modal';

import Successfull from "../../assets/dealer/images/sucessfull.png"
const Footer = () => {

    return (
        <>
            <div className="ModalBox">
                <div className="modal fade" id="ServiceModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="ServiceBox">
                                    <a href="javascript:void(0);" type="button" className="Close" data-dismiss="modal">&times;</a>
                                    <h4>Service Details:</h4>
                                    <p><span> Requested Parts </span> Breaks, Filters </p>
                                    <p><span>Delivery Location</span> 346-A, Elger Avennue, Malvern,23451, PA</p>
                                    <p><span>Description</span> My car AC is not working properly.</p>
                                    <div className="text-center">
                                        <a className="Okay" href="available-new-quotes.html">Submit Quote</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
                <div className="modal fade" id="CongratulationsModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="CongratulationsBox">
                                    <a href="javascript:void(0);" type="button" className="Close" data-dismiss="modal">&times;</a>
                                    <figure><img src={Successfull} /></figure>
                                    <h4>Congratulations! Your Quote has been Submitted. We will notify you once client confirms
                                        the booking.</h4>
                                    <div className="text-center">
                                        <a className="Okay" data-dismiss="modal">Great</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="BookingConfirm">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="CongratulationsBox">
                                    <a href="javascript:void(0);" type="button" className="Close" data-dismiss="modal">&times;</a>
                                    <figure><img src={Successfull} /></figure>
                                    <h4>Congratulations! Your booking has been confirmed with Riya Jain.</h4>
                                    <div className="text-center">
                                        <a className="Okay" data-dismiss="modal">Great</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="NewSlotModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="ServiceBox">
                                    <a href="javascript:void(0);" type="button" className="Close" data-dismiss="modal">&times;</a>
                                    <h4>Client Requested Slot :</h4>
                                    <p><span>Requested Date</span> 2 Feb 2022</p>
                                    <p><span>Requested Time</span> 2:00 PM</p>
                                    <div className="text-center">
                                        <a className="Accept" data-dismiss="modal" data-toggle="modal"
                                            data-target="#SlotConfrimModal">Confirm Booking</a>
                                        <a className="Decline" data-dismiss="modal">Decline</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="SlotConfrimModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="CongratulationsBox">
                                    <a href="javascript:void(0);" type="button" className="Close" data-dismiss="modal">&times;</a>
                                    <figure><img src={Successfull} /></figure>
                                    <h4>Congratulations! Your booking has been confirmed with Riya Jain</h4>
                                    <p><span>Date of Booking </span> 2 Feb 2022 </p>
                                    <p><span>Time of Booking</span> 4:00 PM</p>
                                    <p><span>Cost of Estimate</span> $ 40</p>
                                    <div className="text-center">
                                        <a className="Okay" data-dismiss="modal">Great</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="QuoteDetailsModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">

                                <a href="javascript:void(0);" type="button" className="Close" data-dismiss="modal">×</a>

                                <div className="QuoteDetailsBox">
                                    <h4>Parts Details <span>Requested on 22 Feb 2022; 2:15 PM</span></h4>
                                    <p><span>Requested Services </span> Breaks, Heating & AC problem</p>
                                    
                                    <p><span>Description</span> My car AC is not working properly.</p>
                                </div>

                                <div className="QuoteDetailsBox">
                                    <h4>Quote Details <span>Quote Submitted On 22 Feb 2022 ; 2:15 PM</span></h4>
                                    <p><span>Cost of Estimate</span> $ 40</p>
                                    <p><span>Slot 1 </span> 2-Feb-2022 at 3:00 PM</p>
                                    <p><span>Slot 2</span> 3 Feb-2022 at 4:00 PM</p>
                                </div>

                                <div className="QuoteDetailsBox">
                                    <h4>Client Details</h4>
                                    <p><span>Name</span> Riya Jain</p>
                                    <p><span>Contact Number</span> +1 5643435322</p>
                                    <p><span>Email</span> riya@gmail.com</p>
                                </div>

                                <div className="QuoteDetailsBox">
                                    <h4>Client Requested Slot </h4>
                                    <p><span>Requested Date</span> 2 Feb 2022</p>
                                    <p><span>Requested Time</span> 2:00 PM</p>
                                </div>

                                <div className="text-center">
                                    <a className="Accept" data-dismiss="modal">Confirm Booking</a>
                                    <a className="Decline" data-dismiss="modal">Decline</a>
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