import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import moment from 'moment';
import Modal from 'react-bootstrap/Modal';
import Header from "./header";
import Footer from "./footer";

import { requestCalendar, mechanicList, requestStatusChange, requestMechanicAssign } from "../../redux/actions/provider/garageAction";

const Scheduling = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { i18n, t } = useTranslation();

    const getListData = useSelector(state => state.garageRequestData)
    const { requestDataCalendar, mechanicListing } = getListData
    useEffect(() => {
        dispatch(requestCalendar())
    },[])
    useEffect(() => {
        dispatch(mechanicList())
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

    const handleDetail = (id) => {
        window.localStorage.setItem('calendarDetailId', id);
        navigate("/garage/mycalendar/detail")
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

    const inputHandleMechanic = (assignTo, id) => {
        const data = { id:id, assignTo:assignTo };
        dispatch(requestMechanicAssign(data)).then(res => {
            if (res.code == 200) {
                toast.success("Mechanic assign successfully", {
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
                        <h4> { t('garage.sidemenu.GarageScheduling') } </h4>
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
                                    <th> { t('garage.scheduling.AssignTo') } </th>
                                    <th> { t('garage.scheduling.Status') } </th>
                                    <th> { t('garage.scheduling.Action') } </th>
                                </tr>

                                { requestDataCalendar && requestDataCalendar.length>0 ? requestDataCalendar.map((item, i)=>
                                        <tr key={i}>
                                            <td> {i+1} </td>
                                            <td> {item.vehicleData.vehicleNumber } {item.vehicleData.model }  {item.vehicleData.make } {item.vehicleData.year } {item.vehicleData.type } </td>
                                            <td>
                                                { item.services &&  item.services.map((item) => item + ', ' ) }
                                                <smap>
                                                    <Link className="Blue" to="/garage/mycalendar/detail" onClick={()=>handleDetail(item._id)}>
                                                        <i className="fa fa-eye"></i>
                                                    </Link>
                                                </smap>
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
                                            {/* {
                                                (item.status != "Completed") ?
                                                    (item.status == "Accepted") ?
                                                        <select name="mechanic" onChange={(e)=>inputHandleMechanic(e.target.value, item._id)}>
                                                            <option value="">Select</option>
                                                            {
                                                            
                                                                mechanicListing && mechanicListing.length>0 && mechanicListing.map((mechanic, i)=>
                                                                    <option value={mechanic.name} selected={ mechanic.name == item.assignTo ? "selected":""}> {mechanic.name} </option>
                                                                )
                                                            }
                                                        </select>
                                                    : "N/A"
                                                : item.assignTo
                                            } */}
                                            
                                            <select name="mechanic" onChange={(e)=>inputHandleMechanic(e.target.value, item._id)}>
                                                <option value="">Select</option>
                                                {
                                                
                                                    mechanicListing && mechanicListing.length>0 && mechanicListing.map((mechanic, i)=>
                                                        <option value={mechanic.name} selected={ mechanic.name == item.assignTo ? "selected":""}> {mechanic.name} </option>
                                                    )
                                                }
                                            </select>

                                            </td>
                                            <td>
                                            {
                                                (item.status != "Completed") ?
                                                    <select name="status" onChange={(e)=>inputHandleOption(e.target.value, item._id)}>
                                                    {
                                                        (item.status == "Upcoming") ?
                                                            <>
                                                                <option value="Upcoming" selected={ item.status == "Upcoming" ? "selected":""}>Upcoming</option>
                                                                <option value="Diagnostic" selected={ item.status == "Diagnostic" ? "selected":""}>Diagnostic</option>
                                                            </>
                                                        : (item.status == "Diagnostic") ?
                                                            <>
                                                                <option value="Diagnostic" selected={ item.status == "Diagnostic" ? "selected":""}>Diagnostic</option>
                                                                <option value="Diagnostic Completed" selected={ item.status == "Diagnostic Completed" ? "selected":""}>Diagnostic Completed</option>
                                                            </>

                                                        : (item.status == "Diagnostic Completed") ?
                                                            <option value="Diagnostic Completed" selected={ item.status == "Diagnostic Completed" ? "selected":""}>Diagnostic Completed (Repair Cost)</option>

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
                                                    <Link className="Blue" to="/garage/mycalendar/detail" onClick={()=>handleDetail(item._id)}>
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
            
            <Modal show={viewServiceDetailShow} className="PanelModal">
                <div className="ModalBox">
                    <div className="modal-body">
                        <div className="ServiceBox">
                            <a href="javascript:void(0);" type="button" className="Close" onClick={handleViewServiceDetailClose}>&times;</a> 
                            <h4>Service Details:</h4>
                            <p><span>Requested Services </span> { serviceDetailState && serviceDetailState.services? serviceDetailState.services.join(", "):'' } </p>
                            <p><span>Tow Truck Required</span> { serviceDetailState && serviceDetailState.towTruck?serviceDetailState.towTruck:'' } </p>
                            <p><span>Description</span> { serviceDetailState && serviceDetailState.notes?serviceDetailState.notes:'' }</p> 
                        </div>
                    </div> 
                </div>
            </Modal>

            <Footer />
        
        </>
    );
}

export default Scheduling