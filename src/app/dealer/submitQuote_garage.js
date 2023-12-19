import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import _ from 'lodash'
import FORM from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import Header from "./header";
import Footer from "./footer";
import { __esModule } from 'react-rating-stars-component';
import Sucessfull from "../../assets/dealer/images/sucessfull.png";

import { manufacturerList, modelList, requestAvailableStatus } from "../../redux/actions/provider/dealerAction";

const SubmitGarageQuote = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getListData = useSelector(state => state.dealerRequestData)
    const { manufacturerData, modelData } = getListData

    const getPartsIndexWise = JSON.parse(window.localStorage.getItem('partsGarageIndexWise'));

    const [quoteDetails, setQuoteDetails] = useState({})
    const [partsIndexWise, setPartsIndexWise] = useState(getPartsIndexWise)
    
    useEffect(() => {
        const getQuoteDetails = JSON.parse(window.localStorage.getItem('quoteGarageDetails'));
        setQuoteDetails(getQuoteDetails)

        dispatch(manufacturerList())
    }, []);

    let handleChange = (i, index, e) => {
        const { name, value } = e.target
        let partsIndexWiselocal = [...partsIndexWise];
        partsIndexWiselocal[i].parts[index][name] = value;
        setPartsIndexWise(partsIndexWiselocal);

        if(name == "brand") {
            let dependentData = { name:value };
            dispatch(modelList(dependentData))
        }
    }

    let addFormFields = (i) => {

        let partsIndexWiselocal = [...partsIndexWise]
        let parts=partsIndexWiselocal[i].parts

        parts.push({ available: "", availableDate: "", brand: "", model: "", availablePrice: "", condition: "", pickUp: "", delivery: "" })
        partsIndexWiselocal[i].parts=parts
        setPartsIndexWise(partsIndexWiselocal)
    }
    let removeFormFields = (i) => {
        let partsIndexWiselocal = [...partsIndexWise];
        let parts = partsIndexWiselocal[i].parts
        parts.splice(i, 1);
        partsIndexWiselocal[i].parts=parts
        setPartsIndexWise(partsIndexWiselocal)
    }

    const handleQuoteSubmit = (event) => {
        event.preventDefault();
        const data = { id: quoteDetails._id, quotes:partsIndexWise  }

        dispatch(requestAvailableStatus(data)).then(res => {
            if (res.code == 200) {

                toast.success(res.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
                handleQuoteModelShow()
                setTimeout(
                    function() {
                        navigate("/dealer/dashboard/garages")
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

    const [quoteModelShow, setQuoteModelShow] = useState(false);
    const handleQuoteModelClose = () => {
        setQuoteModelShow(false)
        setQuoteDetails({});
        setPartsIndexWise({});
    }
    const handleQuoteModelShow = () => {
        setQuoteModelShow(true)
    };

    return (
        <>
            <Header />

            <div className="WrapperArea">
                <div className="WrapperBox">

                    <div className="TitleBox">
                        <h4>Submit Your Quote:</h4>
                    </div>
                    <div className="Small-Wrapper">

                        <FORM onSubmit={handleQuoteSubmit}>

                            <div className="Category">
                                <div className="Delivery">
                                    <h5>Delivery Location :</h5>
                                    <p> {quoteDetails && Object.keys(quoteDetails).length > 0 && quoteDetails ? quoteDetails.location : ''}  </p>
                                </div>

                                {partsIndexWise && partsIndexWise.length > 0 && partsIndexWise.map((item, i) => {
                                    
                                    return (
                                        <div key={i} className="MainPart">
                                            <h3>Part: {item.service} </h3>

                                            {item.parts.map((element, index) => (
                                                
                                                <div class="parts-details_append">
                                                    <div className="row">
                                                        <div className="col-sm-3">
                                                            <div className="Delivery">
                                                                <div className="form-group">
                                                                    <label>Available</label>
                                                                    <select className="form-control" name="available" onChange={e => handleChange(i,index, e)}>
                                                                        <option value="">Select</option>
                                                                        <option value="Yes">Yes</option>
                                                                        <option value="No">No</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-sm-3">
                                                            <div className="Delivery">
                                                                <div className="form-group">
                                                                    <label> Available Date</label>
                                                                    <input type="date" className="form-control" name="availableDate" onChange={e => handleChange(i,index, e)} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-sm-8">
                                                            <div className="Delivery ">
                                                                <h5> Provide it by:</h5>
                                                                <div className="CheckboxMain">
                                                                    <label className="CheckBox"> Pick Up
                                                                        <input type="checkbox" name="pickUp" onChange={e => handleChange(i,index, e)} />
                                                                        <span className="checkmark"></span>
                                                                    </label>
                                                                    <label className="CheckBox"> Delivery
                                                                        <input type="checkbox" name="delivery" onChange={e => handleChange(i,index, e)} />
                                                                        <span className="checkmark"></span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-sm-3">
                                                            <div className="Delivery">
                                                                <div className="form-group">
                                                                    <label>Select Brand</label>
                                                                    <input type="text" className="form-control" name="brand" onChange={e => handleChange(i,index, e)} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-3">
                                                            <div className="Delivery">
                                                                <div className="form-group">
                                                                    <label>Select Model</label>
                                                                    <input type="text" className="form-control" name="make" onChange={e => handleChange(i,index, e)} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-3">
                                                            <div className="Delivery">
                                                                <div className="form-group">
                                                                    <label>Year</label>
                                                                    <input type="text" className="form-control" name="year"  onChange={e => handleChange(i,index, e)} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-3">
                                                            <div className="Delivery">
                                                                <div className="form-group">
                                                                    <label>Select Condition</label>
                                                                    <select className="form-control" name="condition" onChange={e => handleChange(i,index, e)}>
                                                                        <option value="">Select</option>
                                                                        <option value="New parts">New parts</option>
                                                                        <option value="Used parts">Used parts</option>
                                                                        <option value="Rebuilt/Reconditioned">Rebuilt/Reconditioned</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-sm-12">
                                                            <div className="Delivery">
                                                                <div className="form-group">
                                                                    <label>Part Description</label>
                                                                    <textarea className="form-control" name="description"  onChange={e => handleChange(i,index, e)} ></textarea>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="col-sm-3">
                                                            <div className="Delivery">
                                                                <div className="form-group">
                                                                    <label>Available Price INCL Tax</label>
                                                                    <input type="text" className="form-control" name="availablePrice"  onChange={e => handleChange(i,index, e)} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {
                                                        index ?
                                                            <button type="button" className="Parts_remove" onClick={() => removeFormFields(i)}><i className='fa fa-trash'></i></button>
                                                            : null
                                                    }
                                                </div>
                                            ))}

                                            <div className="Parts_Add">
                                                <button className="button add" type="button" onClick={() => addFormFields(i)}> + Add Brand </button>
                                            </div>
                                        </div>
                                    )
                                }
                                )}
                            </div>

                            <div className="MainPart">
                                <button type="submit" className="Accept">Submit Quote</button>
                            </div>
                        
                        </FORM>

                    </div>

                </div>
            </div>

            <Modal show={quoteModelShow} className="PanelModal">
                <div class="ModalBox">
                    <div class="modal-body">
                        <div class="CongratulationsBox">
                            <a href="javascript:void(0);" type="button" class="Close" onClick={handleQuoteModelClose}>&times;</a> 

                            <figure><img src={Sucessfull} /></figure>
                            <h4>Congratulations! Your Quote has been Submitted. We will notify you once client confirms
                                the booking.</h4>

                            <div class="text-center">
                                <a href="javascript:void(0)" class="Okay" onClick={handleQuoteModelClose}>Great</a>
                            </div>

                        </div>
                    </div> 
                </div>
            </Modal>

        </>
    );

}

export default SubmitGarageQuote;