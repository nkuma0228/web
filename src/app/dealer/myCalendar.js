import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import moment from 'moment';
import Modal from 'react-bootstrap/Modal';
import Header from "./header";
import Footer from "./footer";

import { requestCalendar, requestStatusChange } from "../../redux/actions/provider/dealerAction";

const MyDealerCalendar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { i18n, t } = useTranslation();

    const getListData = useSelector(state => state.dealerRequestData)
    const { requestDealerDataCalendar } = getListData
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

    const handleDetail = (item) => {
        window.localStorage.setItem('quoteDetails', JSON.stringify(item));
        navigate("/dealer/mycalendar/detail")
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
                        <h4>{ t('vendor.sidemenu.MyOrder') }</h4>
                    </div> 

                    <div className="TableList">
                        <table style={{width:"125%"}}>
                            <tbody>
                                <tr>
                                    <th>S.No</th>
                                    <th>{ t('vendor.scheduling.CarDetails') }</th>
                                    <th>{ t('vendor.scheduling.PartsDetails') }</th>
                                    <th>{ t('vendor.scheduling.ClientDetails') }</th>
                                    <th>{ t('vendor.scheduling.Requestedon') }</th>
                                    <th>{ t('vendor.scheduling.DeliveryDetails') }</th>
                                    <th>{ t('vendor.scheduling.Status') }</th>
                                    <th>{ t('vendor.scheduling.Action') }</th>
                                </tr>

                                { requestDealerDataCalendar && requestDealerDataCalendar.length>0 ? requestDealerDataCalendar.map((item, i)=>
                                        <tr key={i}>
                                            <td> {i+1} </td>
                                            <td> {item.vehicleData.vehicleNumber } {item.vehicleData.model }  {item.vehicleData.make } {item.vehicleData.year } {item.vehicleData.type} </td>
                                            <td>
                                                { item.services &&  item.services.join(", ") }
                                                <smap><a data-toggle="modal" onClick={()=>handleViewServiceDetailShow(item)}>View Details</a></smap>
                                            </td>
                                            <td>
                                                <strong>{ t('vendor.scheduling.Name') } : </strong> {item.clientData.firstName } {item.clientData.lastName }, <br /> 
                                                <strong>{ t('vendor.scheduling.Phone') } : </strong> {item.clientData.mobile }, <br /> 
                                                <strong>{ t('vendor.scheduling.Email') } : </strong> {item.clientData.email }
                                            </td>
                                            <td> { moment(item.createdAt).format("DD MMMM 'YY") } </td>
                                            <td>
                                                <strong>Delivered to Location : </strong> { item.location }
                                            </td>
                                            <td>
                                                <select name="status" onChange={(e)=>inputHandleOption(e.target.value, item._id)}>
                                                {
                                                    item.status != "Completed" ?
                                                        <>
                                                            <option value="">Select</option>
                                                            <option value="Upcoming" selected={ item.status == "Upcoming" ? "selected":""}>Upcoming</option>
                                                            <option value="OnGoing" selected={ item.status == "OnGoing" ? "selected":""}>OnGoing</option>
                                                            <option value="Completed" selected={ item.status == "Completed" ? "selected":""}>Completed</option>
                                                        </>
                                                    :
                                                    <option value="Completed" selected={ item.status == "Completed" ? "selected":""}>Completed</option>
                                                }
                                                </select>
                                            </td> 
                                            <td>
                                                <div className="Actions"> 
                                                    <Link className="Blue" to="/dealer/mycalendar/detail" onClick={()=>handleDetail(item)}>
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
                            <p><span>Requested Parts </span> { serviceDetailState && serviceDetailState.services? serviceDetailState.services.join(", "):'' } </p>
                            <p><span>Delivery Location</span> { serviceDetailState && serviceDetailState.location?serviceDetailState.location:'' } </p>
                            <p><span>Description</span> { serviceDetailState && serviceDetailState.notes?serviceDetailState.notes:'' }</p> 
                        </div>
                    </div> 
                </div>
            </Modal>

            <Footer />
        
        </>
    );
}

export default MyDealerCalendar