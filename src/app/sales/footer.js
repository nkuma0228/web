import React from "react";
import {Link} from "react-router-dom";
import Modal from 'react-bootstrap/Modal';

import Successfull from "../../assets/garage/images/sucessfull.png"
const Footer = () => {

    return (
        <>
            <div className="ModalBox">
                
                <div className="modal fade" id="CongratulationsModal">
                    <div className="modal-dialog">
                        <div className="modal-content"> 
                            <div className="modal-body">
                                <div className="CongratulationsBox">
                                    <a href="javascript:void(0);" type="button" className="Close" data-dismiss="modal">&times;</a> 
                                    <figure><img src={Successfull} /></figure>
                                    <h4>Congratulations! Your Quote has been Submitted. We will notify you once client confirms the booking.</h4>
                                    <p><span>Slot 1 </span> 2-Feb-2022 at 3:00 PM</p>
                                    <p><span>Slot 2</span> 3 Feb-2022  at 4:00 PM</p>
                                    <p><span>Cost of Estimate</span> $ 40</p> 
                                    <div className="text-center">
                                        <a className="Okay" data-dismiss="modal">Great</a>
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
                                    <p><span>Date of Booking </span> 2 Feb 2022  </p>
                                    <p><span>Time of Booking</span>  4:00 PM</p>
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
                                    <h4>Service Details <span>Requested on 22 Feb 2022; 2:15 PM</span></h4>
                                    <p><span>Requested Services </span> Breaks, Heating & AC problem</p>
                                    <p><span>Tow Truck Required</span> No</p>
                                    <p><span>Description</span> My car AC is not working properly.</p>  
                                </div>

                                <div className="QuoteDetailsBox">  
                                    <h4>Quote Details <span>Quote Submitted On 22 Feb 2022 ; 2:15 PM</span></h4>
                                    <p><span>Cost of Estimate</span> $ 40</p> 
                                    <p><span>Slot 1 </span> 2-Feb-2022 at 3:00 PM</p>
                                    <p><span>Slot 2</span> 3 Feb-2022  at 4:00 PM</p> 
                                </div>

                                <div className="QuoteDetailsBox"> 
                                    <h4>Client Details</h4>
                                    <p><span>Name</span> Riya Jain</p>
                                    <p><span>Contact Number</span> +1 5643435322</p>  
                                    <p><span>Email</span> riya@gmail.com</p>  
                                </div>

                                <div className="QuoteDetailsBox"> 
                                    <h4>Client Requested Slot </h4>
                                    <p><span>Requested Date</span> 2 Feb  2022</p>
                                    <p><span>Requested Time</span> 2:00 PM</p>  
                                </div>

                                <div className="text-center">
                                    <a className="Accept" data-dismiss="modal" data-toggle="modal" data-target="#MechanicModal">Confirm Booking</a>
                                    <a className="Decline" data-dismiss="modal">Decline</a>
                                </div>

                            </div> 
                        </div>
                    </div>
                </div> 
            </div>
            <div className="modal fade" id="MechanicModal">
                <div className="modal-dialog">
                    <div className="modal-content"> 
                        <div className="modal-body">
                            <a href="javascript:void(0);" type="button" className="Close" data-dismiss="modal">×</a> 
                            <div className="Category">
                                <h3>Submit Your Quote:</h3>
                                <form>
                                    <div className="form-group">
                                        <label>Mechanic</label>
                                        <select className="form-control">
                                            <option>Select Mechanic</option>
                                        </select>
                                    </div>
                                    <button className="Accept" data-dismiss="modal">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>    

        </>

    );
}

export default Footer