import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import 'rc-time-picker/assets/index.css';

import moment from 'moment';
import Modal from 'react-bootstrap/Modal';
import TimePicker from 'rc-time-picker';

import Header from "./header";
import Footer from "./footer";

import { requestPending, requestAvailable, requestRejected, requestRejectedStatus } from "../../redux/actions/provider/dealerAction";

const DealerClientDashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { i18n, t } = useTranslation();

    const getListData = useSelector(state => state.dealerRequestData)
    const { requestDealerDataPending, requestDealerDataAvailable, requestDealerDataReject } = getListData

    useEffect(() => {
        const data = { status:["Pending"] }
        dispatch(requestPending(data))
    },[])

    const handleQuotes = () => {
        const data = { status:["Pending"] }
        dispatch(requestPending(data))
    }
    const handleSubmitted = () => {
        const data = { status:["Available", "Submitted"] }
        dispatch(requestAvailable(data))
    }
    const handleReject = () => {
        const data = { status:["Rejected"] }
        dispatch(requestRejected(data))
    }

    const time_ago = (time) => {

        switch (typeof time) {
          case 'number':
            break;
          case 'string':
            time = +new Date(time);
            break;
          case 'object':
            if (time.constructor === Date) time = time.getTime();
            break;
          default:
            time = +new Date();
        }
        var time_formats = [
          [60, 'seconds', 1], // 60
          [120, '1 minute ago', '1 minute from now'], // 60*2
          [3600, 'minutes', 60], // 60*60, 60
          [7200, '1 hour ago', '1 hour from now'], // 60*60*2
          [86400, 'hours', 3600], // 60*60*24, 60*60
          [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
          [604800, 'days', 86400], // 60*60*24*7, 60*60*24
          [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
          [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
          [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
          [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
          [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
          [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
          [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
          [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
        ];
        var seconds = (+new Date() - time) / 1000,
          token = 'ago',
          list_choice = 1;
      
        if (seconds == 0) {
          return 'Just now'
        }
        if (seconds < 0) {
          seconds = Math.abs(seconds);
          token = 'from now';
          list_choice = 2;
        }
        var i = 0,
          format;
        while (format = time_formats[i++])
          if (seconds < format[0]) {
            if (typeof format[2] == 'string')
              return format[list_choice];
            else
              return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
          }
        return time;
    }

    const [viewServiceDetailShow, setViewServiceDetailShow] = useState(false);
    const [serviceDetailState, setServiceDetail] = useState({});
    const handleViewServiceDetailClose = () => {
        setViewServiceDetailShow(false)
        setServiceDetail({})
    }
    const handleViewServiceDetailShow = (item) => { 
        setServiceDetail(item);
        setViewServiceDetailShow(true)
    };

    const [rejectModalShow, setRejectModalShow] = useState(false);
    const handleRejectModalClose = () => {
        setRejectModalShow(false)
        setServiceDetail({})
    }
    const handleRejectModalShow = (item) => { 
        setServiceDetail(item);
        setRejectModalShow(true)
    };

    const handleRejectRequest = () => {
        const data = {id:serviceDetailState._id}
        dispatch(requestRejectedStatus(data)).then(res => {
            if (res.code == 200) {
                handleRejectModalClose()
                setServiceDetail({})
                setTimeout(
                    function() {
                        window.location.reload()
                    }
                    .bind(this),
                    2000
                );
            } else {
                let errors = res.errors.errors
                errors.map((item) => {
                    var newParam = item.param
                    let messageErr = item.msg +' of '+ newParam
                    toast.error(messageErr, {
                        position: toast.POSITION.TOP_RIGHT
                    });
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

    const handleQuotesNavigate = (item) => { 
        window.localStorage.setItem('quoteDetails', JSON.stringify(item))

        let service = item.services
        let partsIndexWise = []

        for (let index = 0; index < service.length; index++) {

            partsIndexWise.push({
                index: index,
                service: service[index],
                parts: [{ available: "", availableDate: "", brand: "", model: "", availablePrice: "", condition: "", pickUp: "", delivery: "" }]
            })
        }
        window.localStorage.setItem('partsIndexWise', JSON.stringify(partsIndexWise))
        navigate('/dealer/quote/submit');
    };

    const [confirmationSubmittedShow, setConfirmationSubmittedShow] = useState(false);
    const handleConfirmationSubmittedClose = () => {
        setConfirmationSubmittedShow(false)
        setServiceDetail({});
    }
    const handleConfirmationSubmittedShow = (item) => {
        setServiceDetail(item);
        setConfirmationSubmittedShow(true)
    };

    const handleQuoteView = (item) => {
        window.localStorage.setItem("quoteDetails", JSON.stringify(item))
        navigate("/dealer/quote/view")
    }

    return (
        <>
            <Header />
            <ToastContainer/>

            <div className="WrapperArea">
                <div className="WrapperBox">

                    <div className="TitleBox">
                        <h4> { t('vendor.dashboard.ClientQuote') } </h4>
                    </div>

                    <div className="CommonTabs">
                        <ul className="nav nav-tabs">
                            <li className="nav-item" onClick={handleQuotes}>
                                <a className="nav-link active" data-toggle="tab" href="#Quotes"> { t('vendor.dashboard.NewQuote') } </a>
                            </li>
                            <li className="nav-item" onClick={handleSubmitted}>
                                <a className="nav-link" data-toggle="tab" href="#Submitted"> { t('vendor.dashboard.SubmittedQuote') } </a>
                            </li>
                            <li className="nav-item" onClick={handleReject}>
                                <a className="nav-link" data-toggle="tab" href="#Rejected"> { t('vendor.dashboard.RejectedQuote') } </a>
                            </li>
                            <li className="nav-item ActiveTab">
                                <Link to="../dealer/history" className="nav-link"> { t('garage.sidemenu.History') } </Link>
                            </li>
                        </ul>

                        <div className="tab-content">
                            <div className="tab-pane active" id="Quotes">

                                <div className="TitleBox">
                                    <h5> { t('vendor.dashboard.RequestQuoteAvailable') } :</h5>
                                    <Link to="../dealer/future_appointment_calendar" className='TitleLink'>Future appointment Calendar</Link>
                                </div>
                                <div className="TableList">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>S.No</th>
                                                <th> { t('vendor.dashboard.CarDetails') } </th>
                                                <th> { t('vendor.dashboard.PartsDetails') } </th>
                                                <th> { t('vendor.dashboard.ClientDetails') } </th>
                                                <th> { t('vendor.dashboard.Requestedon') } </th>
                                                <th> { t('vendor.dashboard.Action') } </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                         {
                                            requestDealerDataPending && requestDealerDataPending.length>0 ? requestDealerDataPending.map((item , i) =>
                                        
                                                    <tr key={i}>
                                                        <td> {i+1} </td>
                                                        <td> {item.otherVehicle } </td>
                                                        <td>
                                                            { item.services &&  item.services.join(', ') }
                                                            <smap><a href="javascript:void(0)" onClick={() => handleQuoteView(item)}>View Details</a></smap>
                                                        </td>     
                                                        <td>
                                                            <strong>{ t('vendor.dashboard.Name') } : </strong> {item.clientData.firstName } {item.clientData.lastName }, <br /> 
                                                            <strong>{ t('vendor.dashboard.Phone') } : </strong> {item.clientData.mobile }, <br /> 
                                                            <strong>{ t('vendor.dashboard.Email') } : </strong> {item.clientData.email }
                                                        </td>
                                                        <td> { time_ago(item.createdAt) } </td>
                                                        <td>
                                                            <div class="Actions">
                                                                <a href="javascript:void(0)" class="Decline" onClick={()=>handleRejectModalShow(item)}>Unavailable</a>
                                                                <a href="javascript:void(0)" class="Accept" onClick={()=>handleQuotesNavigate(item)}>Available</a>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            :
                                                <tr> <td colspan="6"> No result found </td> </tr>
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="tab-pane fade" id="Submitted">
                                <div className="TitleBox">
                                    <h5>{ t('vendor.dashboard.RequestQuoteAvailable') } :</h5>
                                </div>
                                <div className="TableList">
                                    <table style={{ width: "115%" }}>
                                        <tr>
                                            <th>S.No</th>
                                            <th> { t('vendor.dashboard.Action') } </th>
                                            <th> { t('vendor.dashboard.CarDetails') } </th>
                                            <th> { t('vendor.dashboard.PartsDetails') } </th>
                                            <th> { t('vendor.dashboard.ClientDetails') } </th>
                                            <th> { t('vendor.dashboard.Requestedon') } </th>
                                            <th> { t('vendor.dashboard.SubmittedOn') } </th>
                                            <th> { t('vendor.dashboard.Status') } </th>
                                        </tr>
                                        {
                                            requestDealerDataAvailable && requestDealerDataAvailable.length>0 ? requestDealerDataAvailable.map((item , i) =>
                                        
                                                <tr key={i}>
                                                    <td> {i} </td>
                                                    <td>
                                                        <div class="Actions">
                                                            <a href="javascript:void(0)" onClick={() => handleQuoteView(item)} class="Blue">
                                                                <i class="fa fa-eye"></i>
                                                            </a>
                                                        </div>
                                                    </td>
                                                    <td> {item.otherVehicle }</td>
                                                    <td>
                                                        { item.services &&  item.services.join(", ") }
                                                        <smap><a data-toggle="modal" onClick={()=>handleViewServiceDetailShow(item)}>View Details</a></smap>
                                                    </td>
                                                    <td>
                                                        <strong>{ t('vendor.dashboard.Name') } : </strong> {item.clientData.firstName } {item.clientData.lastName }, <br /> 
                                                        <strong>{ t('vendor.dashboard.Phone') } : </strong> {item.clientData.mobile }, <br /> 
                                                        <strong>{ t('vendor.dashboard.Email') } : </strong> {item.clientData.email }
                                                    </td>
                                                    <td> { time_ago(item.createdAt) } </td>
                                                    <td> { time_ago(item.quoteDate) } </td>
                                                    <td> 
                                                        { item.status == "Available"?"Pending": item.status == "Submitted"?item.status:"" } 
                                                    </td>
                                                    
                                                </tr>
                                            )
                                            :
                                                <tr> <td colspan="8"> No result found</td></tr>
                                        }
                                    </table>
                                </div>
                            </div>

                            <div className="tab-pane fade" id="Rejected">
                                <div className="TitleBox">
                                    <h5>{ t('vendor.dashboard.RejectedQuoteClient') } :</h5>
                                </div>
                                <div className="TableList">
                                    <table>
                                        <tr>
                                            <th>S.No</th>
                                            <th> { t('vendor.dashboard.Action') } </th>
                                            <th> { t('vendor.dashboard.CarDetails') } </th>
                                            <th>{ t('vendor.dashboard.PartsDetails') }</th>
                                            <th>{ t('vendor.dashboard.ClientDetails') }</th>
                                            <th>{ t('vendor.dashboard.SubmittedOn') }</th>
                                            <th>{ t('vendor.dashboard.Rejectedon') }</th>
                                            <th> { t('vendor.dashboard.ReasonRejection') }</th>
                                            
                                        </tr>
                                        {
                                            requestDealerDataReject && requestDealerDataReject.length>0 ? requestDealerDataReject.map((item , i) =>
                                        
                                                <tr key={i}>
                                                    <td> {i} </td>
                                                    <td>
                                                        <div class="Actions">
                                                            <a href="javascript:void(0)" onClick={() => handleQuoteView(item)} class="Blue">
                                                                <i class="fa fa-eye"></i>
                                                            </a>
                                                        </div>
                                                    </td>
                                                    <td> {item.otherVehicle }</td>
                                                    <td>
                                                        { item.services &&  item.services.join(", ") }
                                                        <smap><a data-toggle="modal" onClick={()=>handleViewServiceDetailShow(item)}>View Details</a></smap>
                                                    </td>     
                                                    <td>
                                                        <strong>{ t('vendor.dashboard.Name') } : </strong> {item.clientData.firstName } {item.clientData.lastName }, <br /> 
                                                        <strong>{ t('vendor.dashboard.Phone') } : </strong> {item.clientData.mobile }, <br /> 
                                                        <strong>{ t('vendor.dashboard.Email') } : </strong> {item.clientData.email }
                                                    </td>
                                                    <td> { time_ago(item.createdAt) } </td>
                                                    <td> { time_ago(item.updatedAt) } </td>
                                                    <td> { item.status }  </td>
                                                </tr>
                                            ) : 
                                                <tr><td colSpan="8">No result found</td></tr>
                                        }
                                    </table>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <Modal show={viewServiceDetailShow} className="PanelModal">
                <div class="ModalBox">
                    <div class="modal-body">
                        <div class="ServiceBox">
                            <a href="javascript:void(0);" type="button" class="Close" onClick={handleViewServiceDetailClose}>&times;</a> 
                            <h4>Service Details:</h4>
                            <p><span>Requested Parts </span> { serviceDetailState && serviceDetailState.services? serviceDetailState.services.join(", ") : '' } </p>
                            <p><span>Delivery Location</span> { serviceDetailState && serviceDetailState.location?serviceDetailState.location:'N/A' } </p>

                            { serviceDetailState && serviceDetailState.notes?
                                <p><span>Description</span> { serviceDetailState.notes?serviceDetailState.notes:'' }</p> 
                                :""
                            }
                        </div>
                    </div> 
                </div>
            </Modal>

            <Modal show={rejectModalShow} className="PanelModal">
                <div class="ModalBox">
                    <div class="modal-body">
                        <div class="ServiceBox">
                            <a href="javascript:void(0);" type="button" class="Close" onClick={handleRejectModalClose}>&times;</a> 
                            <h4>Service Unavailable:</h4>
                            <p><span> Requested Parts </span> { serviceDetailState && serviceDetailState.services? serviceDetailState.services.join(", "):'' } </p>
                            <p><span> Delivery Location </span> { serviceDetailState && serviceDetailState.location?serviceDetailState.location:'N/A' } </p>

                            { serviceDetailState && serviceDetailState.notes?
                                <p><span>Description</span> { serviceDetailState && serviceDetailState.notes?serviceDetailState.notes:'' }</p>
                                :""
                            }
                            <div class="text-center">
                            <a class="Accept" href="javascript:void(0)" onClick={handleRejectRequest}>Confirm</a>
                            <a class="Decline" onClick={handleRejectModalClose}>Decline</a>
                        </div>
                        </div>
                    </div> 
                </div>
            </Modal>

            <Modal show={confirmationSubmittedShow} className="PanelModal">
                <div class="modal-body">
                    <div class="ServiceBox">
                        <a href="javascript:void(0);" type="button" class="Close" onClick={handleConfirmationSubmittedClose}>&times;</a> 
                        <h4>Client Requested Slot :</h4>
                        <p><span>Requested Date</span> { moment(serviceDetailState.serviceDate).format("DD-MM-YYYY") } </p>
                        <p><span>Requested Time</span> { serviceDetailState.serviceTime } </p> 
                        {/* <div class="text-center">
                            <a class="Accept" href="javascript:void(0)" onClick={handleAcceptedRequest}>Confirm Booking</a>
                            <a class="Decline" onClick={()=>handleRejectRequest(serviceDetailState)}>Decline</a>
                        </div> */}
                    </div>
                </div>
            </Modal>

            <Footer />
        </>
    );
}

export default DealerClientDashboard