import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import moment from 'moment';
import Modal from 'react-bootstrap/Modal';
import Header from "./header";
import Footer from "./footer";

import { requestCalendar, requestStatusChange } from "../../redux/actions/provider/salesAction";

const SalesScheduling = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { i18n, t } = useTranslation();

    const getListData = useSelector(state => state.salesRequestData)
    const { requestDataCalendar, mechanicListing } = getListData
    useEffect(() => {
        dispatch(requestCalendar())
    },[])

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

    const [viewVehicleDetailShow, setViewVehicleDetailShow] = useState(false);
    const [vehicleDetailState, setVehicleDetail] = useState({});
    const handleViewVehicleDetailClose = () => {
        setViewVehicleDetailShow(false)
        setVehicleDetail({})
    }
    const handleViewVehicleDetailShow = (item) => { 
        setVehicleDetail(item);
        setViewVehicleDetailShow(true)
    };

    const handleDetail = (id) => {
        window.localStorage.setItem('calendarDetailId', id);
        navigate("/sales/mycalendar/detail")
    }

    const inputHandleOption = (status, id) => {
        
        const data = { id:id, status:status };
        dispatch(requestStatusChange(data)).then(res => {
            if (res.code == 200) {
                toast.success("Status updated successfully", {
                    position: toast.POSITION.TOP_RIGHT
                });
                setTimeout(
                    function() {
                        window.location.reload()
                    }
                    .bind(this),
                    1000
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

    return (
        <>
            <Header />
            <ToastContainer/>

            <div className="WrapperArea">
                <div className="WrapperBox"> 

                    <div className="TitleBox">
                        <h4>Auto Dealer Scheduling</h4>
                    </div> 

                    <div className="TableList">
                        <table style={{width:"125%"}}>
                            <tbody>
                                <tr>
                                    <th>S.No</th>
                                    <th> { t('garage.scheduling.CarDetails') } </th>
                                    <th> { t('garage.scheduling.ServiceDetails') } </th>
                                    <th> { t('garage.scheduling.ClientDetails') } </th>
                                    <th> { t('garage.scheduling.Requestedon') } </th>
                                    <th> { t('garage.scheduling.BookingDateTime') } </th>
                                    <th> { t('garage.scheduling.Status') } </th>
                                    <th> { t('garage.scheduling.Action') } </th>
                                </tr>

                                { requestDataCalendar && requestDataCalendar.length>0 ? requestDataCalendar.map((item, i)=>
                                        <tr key={i}>
                                            <td> {i+1} </td>
                                            <td>
                                                <smap><a data-toggle="modal" onClick={()=>handleViewVehicleDetailShow(item.vehicleData)}>View Details</a></smap>
                                            </td>
                                            <td>
                                                <smap><a data-toggle="modal" onClick={()=>handleViewServiceDetailShow(item)}>View Details</a></smap>
                                            </td>
                                            <td>
                                                <strong>Name : </strong> {item.clientData.firstName } {item.clientData.lastName }, <br /> 
                                                <strong>Mobile : </strong> {item.clientData.mobile }, <br /> 
                                                <strong>Email : </strong> {item.clientData.email }
                                            </td>
                                            <td> { moment(item.createdAt).format("DD MMMM 'YY") } </td>
                                            <td>
                                                <strong>Date : </strong> { item.serviceDate } <br /> 
                                                <strong>Time : </strong> { item.serviceTime }
                                            </td>
                                            <td>
                                            {
                                                (item.status != "Completed") ?
                                                    <select name="status" onChange={(e)=>inputHandleOption(e.target.value, item._id)}>
                                                    {
                                                        (item.status == "Upcoming") ?
                                                            <>
                                                                <option value="Upcoming" selected={ item.status == "Upcoming" ? "selected":""}>Upcoming</option>
                                                                <option value="Accepted" selected={ item.status == "Accepted" ? "selected":""}>Accepted</option>
                                                            </>
                                                        : (item.status == "Accepted") ?
                                                            <>
                                                                <option value="" selected={ item.status == "Accepted" ? "selected":""}>Accepted</option>
                                                                <option value="Completed" selected={ item.status == "Completed" ? "selected":""}>Completed</option>
                                                            </>
                                                        : ""
                                                    }
                                                    </select>
                                                : "Completed"
                                            }
                                            </td> 
                                            <td>
                                                <div className="Actions"> 
                                                    <Link className="Blue" to="/sales/mycalendar/detail" onClick={()=>handleDetail(item._id)}>
                                                        <i className="fa fa-eye"></i>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                    : <tr> <td colSpan={9}> No result found </td> </tr>
                                }
                            </tbody>
                        </table>
                    </div>             
                </div>
            </div>
                            
            <Modal show={viewVehicleDetailShow} className="PanelModal">
                <div className="ModalBox">
                    <div className="modal-body">
                        <div className="ServiceBox">
                            <a href="javascript:void(0);" type="button" className="Close" onClick={handleViewVehicleDetailClose}>&times;</a> 
                            <h4>Vehicle Details:</h4>
                            <p><span>Modal :</span> { vehicleDetailState && vehicleDetailState.model? vehicleDetailState.model:'' } </p>
                            <p><span>Make :</span> { vehicleDetailState && vehicleDetailState.make?vehicleDetailState.make:'' } </p>
                            <p><span>Mileage :</span> { vehicleDetailState && vehicleDetailState.mileage?vehicleDetailState.mileage:'' }</p> 
                            <p><span>Type :</span> { vehicleDetailState && vehicleDetailState.type?vehicleDetailState.type:'' }</p> 
                        </div>
                    </div> 
                </div>
            </Modal>
            <Modal show={viewServiceDetailShow} className="PanelModal">
                <div className="ModalBox">
                    <div className="modal-body">
                        <div className="ServiceBox">
                            <a href="javascript:void(0);" type="button" className="Close" onClick={handleViewServiceDetailClose}>&times;</a> 
                            <h4>Service Details:</h4>
                            <p><span>Vehicle Type </span> { serviceDetailState && serviceDetailState.vehicleType? serviceDetailState.vehicleType.join(", "):'' } </p>
                            <p><span>Description</span> { serviceDetailState && serviceDetailState.notes?serviceDetailState.notes:'' }</p> 
                        </div>
                    </div> 
                </div>
            </Modal>

            <Footer />
        
        </>
    );
}

export default SalesScheduling