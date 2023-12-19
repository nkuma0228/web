import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import Pagination from "react-js-pagination";
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

import FORM from 'react-bootstrap/Form';
import moment from 'moment';
import Modal from 'react-bootstrap/Modal';
import Header from "./header";
import Footer from "./footer";
import JsPDF from 'jspdf';

import { requestHistory, territoryListing, manufacturerList, requestFutureAppointment } from "../../redux/actions/provider/garageAction";

const initialState = {
    keyword:'',
    startDate:'',
    endDate:'',
    territory:'',
    make:'',
}

const initialAvailableState = {
    id:'',
    date1:'',
    date1Empty:'',
}

const initialTimeState = {
    slotOneHH:'01',
    slotOneMM:'00',
    slotOneAA:'am',
}

const GarageHistory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { i18n, t } = useTranslation();

    const getListData = useSelector(state => state.garageRequestData)
    const { requestDataHistory, territoryData, manufacturerData } = getListData
    
    const [cState, updateCState] = useState(initialState);
    const {
        keyword,
        startDate, 
        endDate,
        territory,
        make
    } = cState

    const [activePage, updateActivePage] = useState(1);
    const [serialNo, updateSerialNo] = useState(10);

    useEffect(() => {

        dispatch(territoryListing());
        dispatch(manufacturerList())

        const data = { pageNumber:1, territory:territory, make:make, startDate:'', endDate:'', keyword:''}
        dispatch(requestHistory(data))
    },[])

    const [viewServiceDetailShow, setViewServiceDetailShow] = useState(false);
    const [serviceDetailState, setServiceDetail] = useState({});
    const handleViewServiceDetailClose = () => {
        setViewServiceDetailShow(false)
        setServiceDetail({})
    }

    const handlePageChange = (pageNumber) => {
        let ser = pageNumber * 10;
        updateSerialNo(ser);
        updateActivePage(pageNumber);
        
        dispatch(requestHistory({ pageNumber:pageNumber, territory:territory, make:make, startDate:'', endDate:'', keyword:''}));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target
        updateCState({
            ...cState, [name]: value
        })
    }

    let handleSubmitFilter = (event) => {
        event.preventDefault();

        if (keyword || make || territory || startDate || endDate) {
            const data = { pageNumber:1, territory, make, startDate, endDate, keyword }
            dispatch(requestHistory(data))
        } else {
            toast.error("For filter value is required", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }

    const handleDetail = (id) => {
        window.localStorage.setItem('historyDetailId', id);
        navigate("/garage/history/details")
    }

    const [quotesModalShow, setQuotesModalShow] = useState(false);
    const handleQuotesModalClose = () => {
        setQuotesModalShow(false)
    }
    const handleQuotesModalShow = (item) => {
        setQuotesModalShow(true)
        setServiceDetail(item)
    };

    const [buttonDisable,  setSubmitDisable] = useState(false)
    const [aState, updateAState] = useState(initialAvailableState);
    const {
        id,
        date1,
        date1Empty
    } = aState
    const handleFutureInputChange = (e) => {
        const { name, value } = e.target
        updateAState({
            ...aState, [name]: value
        })
    }

    const [timeState, updateTimeState] = useState(initialTimeState);
    const {
        slotOneHH,
        slotOneMM,
        slotOneAA,
    } = timeState
    const handleTimeInputChange = (e) => {
        const { name, value } = e.target
        updateTimeState({
            ...timeState, [name]: value
        })
    }

    const handleAvailableValidation = () => {

        let date1Empty = ''
        
        let formIsValid = true;
        if (!date1.trim()) {
            date1Empty = "Please enter slot-1 date";
            formIsValid = false;
        }
        
        updateAState({
            ...aState,
            date1Empty
        })
        return formIsValid;
    }

    const handleAvailableSubmit = (event) => {
        event.preventDefault()
        const formIsValid = handleAvailableValidation()
        if(formIsValid) {
            setSubmitDisable(true);

            var time1 = slotOneHH+':'+slotOneMM+' '+slotOneAA

            const data = { request_id:serviceDetailState._id, user_id:serviceDetailState.user_id, provider_id:serviceDetailState.provider_id, date1, time1, services:servicesChecked };
            dispatch(requestFutureAppointment(data)).then(res => {
                //console.log("res", res)
                if (res.code == 201) {
                    setServiceDetail({})
                    handleQuotesModalClose();
                    toast.success(res.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    setSubmitDisable(false);
                    setTimeout(
                        function() {
                            window.location.reload()
                        }
                        .bind(this),
                        2000
                    );
                } else {
                    setSubmitDisable(false);
                    let errors = res.errors.errors
                    errors.map((item) => {
                        var newParam = item.param
                        let messageErr = item.msg +' of '+ newParam
                        toast.error(messageErr, {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    })
                    updateAState({
                        ...aState, 
                        errorMsg: res.message,
                        date1Empty: '',
                        time1Empty: '',
                    })
                }
            }).catch(err => {
                setSubmitDisable(false);
                console.log(err, 'err')
                const message = err && err.response && err.response.data ? err.response.data.message : "Something went wrong."
                toast.error(message, {
                    position: toast.POSITION.TOP_RIGHT
                });
            })
        }
    }

    const [servicesChecked, setServicesChecked] = useState([
        { name: 'Oil Changes', checked: false },
        { name: 'Diagnostic', checked: false },
        { name: 'Air Con / Heating', checked: false },
        { name: 'Transmission', checked: false },
        { name: 'Brakes', checked: false },
        { name: 'Glass Replacement', checked: false },
        { name: 'Suspension', checked: false },
        { name: 'Engine', checked: false },
        { name: 'Pipes & Exhaust', checked: false },
        { name: 'Electricals', checked: false },
        { name: 'Body Shop', checked: false },
        { name: 'Wheel Alignment', checked: false },
        { name: 'Tire Changes', checked: false },
        { name: 'Tank Replacement', checked: false },
        { name: 'Battery Changes', checked: false },
        { name: 'Hoses & Belts', checked: false },
        { name: 'Radiator', checked: false },
        { name: 'Wipers', checked: false },
        { name: 'Trailer Hitches', checked: false },
        { name: 'Boost', checked: false },
        { name: 'Door Locks', checked: false },
        { name: 'Gasoline', checked: false },
        { name: 'Towing', checked: false },
        { name: 'Steering', checked: false }
    ]);
    const handleServicesChange = (e) => {
        var isChecked = e.target.checked;
        const item = e.target.value;

        setServicesChecked(servicesChecked.map((type) => {
            if (type.name == item) {
                type.checked = isChecked
            }
            return { name: type.name, checked: type.checked }
        }));
    }
    // const generatePDF = async () => {

    //     const report = new JsPDF('landscape','px','a4');
    //     const data = await document.querySelector("#pdfreport");
    //     report.html(data).then(() => {
    //         report.save('report.pdf');
    //     });
    // }


    return (
        <>
            <Header />
            <ToastContainer/>

            <div className="WrapperArea">
                <div className="WrapperBox"> 

                    <div className="TitleBox">
                        <h4> { t('garage.sidemenu.History') } </h4>
                    </div> 

                    <div className="SearchBox">
                        <div className="Filter">
                            <FORM onSubmit={handleSubmitFilter}>
                            <div className="form-group">
                                    <label>Search</label>
                                    <input type="text" className="form-control" name="keyword" value={keyword} onChange={handleInputChange} />
                                </div>  
                                <div className="form-group">
                                    <label>From</label>
                                    <input type="date" className="form-control" name="startDate" value={startDate} onChange={handleInputChange} />
                                </div>  
                                <div className="form-group">
                                    <label>To</label>
                                    <input type="date" className="form-control" name="endDate" value={endDate} onChange={handleInputChange} />
                                </div>

                                {
                                    manufacturerData && manufacturerData.length>0 ?
                                        <div className="form-group">
                                            <label>Select Make</label>
                                            <select className="form-control" name="make" value={make} onChange={handleInputChange}>
                                                <option>Select</option>
                                                {
                                                    manufacturerData.map((item) => 
                                                        item._id.length>0?
                                                            <option value={item._id}> {item._id} </option>
                                                        :''
                                                )}
                                            </select>
                                        </div>
                                    :
                                    ''
                                }

                                {
                                    territoryData && territoryData.length>0 ?
                                        <div className="form-group">
                                            <label>Select Territory</label>
                                            <select className="form-control" name="territory" value={territory} onChange={handleInputChange}>
                                                <option>Select</option>
                                                {
                                                    territoryData.map((item) => 
                                                        item._id.length>0?
                                                            <option name={item._id}> { item._id} </option>
                                                        :''
                                                )}
                                            </select>
                                        </div>
                                    :
                                    ''
                                }
                                
                                <div className="form-group">
                                    <label>&nbsp;</label>
                                    <button type="submit">Apply</button>
                                </div>

                                {/* <div className="form-group">
                                    <label>&nbsp;</label>
                                    <button onClick={generatePDF} type="button">Export PDF</button>
                                </div> */}
                            </FORM>
                        </div>
                    </div>

                    <div className="TableList" id="pdfreport">
                        <table style={{width:"125%"}} >
                            <tbody>
                                <tr>
                                    <th>S.No</th>
                                    <th> { t('garage.scheduling.Action') } </th>
                                    <th> { t('garage.scheduling.CarDetails') } </th>
                                    <th> { t('garage.scheduling.ServiceDetails') } </th>
                                    <th> { t('garage.scheduling.ClientDetails') } </th>
                                    <th> { t('garage.scheduling.Requestedon') } </th>
                                    <th> { t('garage.scheduling.BookingDateTime') } </th>
                                    <th> { t('garage.scheduling.Status') } </th>
                                    <th> { t('garage.scheduling.futureAppointment') } </th>
                                </tr>

                                { 
                                    requestDataHistory && Object.keys(requestDataHistory).length>0 && requestDataHistory.lists.length>0 ? requestDataHistory.lists.map((item, i)=>
                                        <tr key={i}>
                                            <td> {i+1} </td>
                                            <td>
                                                <div className="Actions"> 
                                                    <Link className="Blue" to="/garage/history/details" onClick={()=>handleDetail(item._id)}>
                                                        <i className="fa fa-eye"></i>
                                                    </Link>
                                                </div>
                                            </td>
                                            <td> {item.vehicleData.vehicleNumber } {item.vehicleData.model }  {item.vehicleData.make } {item.vehicleData.year } {item.vehicleData.type } </td>
                                            <td>
                                                { item.services &&  item.services.map((item) => item + ', ' ) }
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
                                            
                                            <td> { item.status } </td> 
                                            <td> 
                                                {
                                                    item.status == "Completed"? 
                                                    <div className="Actions">
                                                        <a href="javascript:void(0)" className="Accept" onClick={()=>handleQuotesModalShow(item)}>Schedule</a>
                                                    </div>
                                                    : ""
                                                }

                                            </td>
                                        </tr>
                                    )
                                    : <tr> <td colSpan={9}> No result found </td> </tr>
                                }
                            </tbody>
                        </table>
                    </div>

                    <div className="Pagination">
                        {   
                            Object.keys(requestDataHistory).length>0 && requestDataHistory.lists.length>0 ?
                            <Pagination
                                activePage={activePage}
                                itemsCountPerPage={10}
                                totalItemsCount={requestDataHistory?.total??1}
                                pageRangeDisplayed={5}
                                onChange={handlePageChange}
                                itemclassName="page-item"
                                linkclassName="page-link"
                            />
                            :''
                        }
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

            <Modal show={quotesModalShow} className="PanelModal MediumModal">
                <div className="ModalBox">
                    <div className="modal-body">
                        <div className="Category">
                            <a href="javascript:void(0);" type="button" className="Close" onClick={handleQuotesModalClose}>&times;</a>
                                
                            <h3>Submit Future Appoinment:</h3>

                            <form onSubmit={handleAvailableSubmit}>
                                
                                <div className="form-group">

                                    <div className='AvailabilitySlot'>
                                        <article>
                                            <aside>
                                                <label>Date</label>
                                                <input type="date" className="form-control" name="date1" value={date1} onChange={handleFutureInputChange}/>
                                            </aside>
                                            <aside>
                                                <label>HH</label>
                                                <select className="form-control" name="slotOneHH" value={slotOneHH} onChange={handleTimeInputChange}>
                                                    <option value="01">1</option>
                                                    <option value="02">2</option>
                                                    <option value="03">3</option>
                                                    <option value="04">4</option>
                                                    <option value="05">5</option>
                                                    <option value="06">6</option>
                                                    <option value="07">7</option>
                                                    <option value="08">8</option>
                                                    <option value="09">9</option>
                                                    <option value="10">10</option>
                                                    <option value="11">11</option>
                                                    <option value="12">12</option>
                                                </select>
                                            </aside>
                                            <aside>
                                                <label>MM</label>
                                                <select className="form-control" name="slotOneMM" value={slotOneMM} onChange={handleTimeInputChange}>
                                                    <option>00</option>
                                                    <option>30</option>
                                                </select>
                                            </aside>
                                            <aside>
                                                <label>&nbsp;</label>
                                                <select className="form-control" name="slotOneAA" value={slotOneAA} onChange={handleTimeInputChange}>
                                                    <option>am</option>
                                                    <option>pm</option>
                                                </select>
                                            </aside>
                                        </article>
                                    </div>

                                    <div className='AvailabilitySlot'>
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <label> { t('client.search.Selectservices') } </label>
                                                <ul>
                                                    <li>
                                                        <label className="CheckBox"> { t('website.repairType.OilChanges') }
                                                            <input type="checkbox" name="services" value="Oil Changes" onChange={handleServicesChange} />
                                                            <span className="checkmark"></span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label className="CheckBox"> { t('website.repairType.Diagnostic') }
                                                            <input type="checkbox" name="services" value="Diagnostic" onChange={handleServicesChange} />
                                                            <span className="checkmark"></span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label className="CheckBox"> { t('website.repairType.AirConHeating') }
                                                            <input type="checkbox" name="services" value="Air Con / Heating" onChange={handleServicesChange} />
                                                            <span className="checkmark"></span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label className="CheckBox"> { t('website.repairType.Transmission') }
                                                            <input type="checkbox" name="services" value="Transmission" onChange={handleServicesChange} />
                                                            <span className="checkmark"></span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label className="CheckBox"> { t('website.repairType.Brakes') }
                                                            <input type="checkbox" name="services" value="Brakes" onChange={handleServicesChange} />
                                                            <span className="checkmark"></span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label className="CheckBox"> { t('website.repairType.GlassReplacement') }
                                                            <input type="checkbox" name="services" value="Glass Replacement" onChange={handleServicesChange} />
                                                            <span className="checkmark"></span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label className="CheckBox"> { t('website.repairType.Suspension') }
                                                            <input type="checkbox" name="services" value="Suspension" onChange={handleServicesChange} />
                                                            <span className="checkmark"></span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label className="CheckBox"> { t('website.repairType.Engine') }
                                                            <input type="checkbox" name="services" value="Engine" onChange={handleServicesChange} />
                                                            <span className="checkmark"></span>
                                                        </label>
                                                    </li>

                                                    <li>
                                                        <label className="CheckBox"> { t('website.repairType.PipesExhaust') }
                                                            <input type="checkbox" name="services" value="Pipes & Exhaust" onChange={handleServicesChange} />
                                                            <span className="checkmark"></span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label className="CheckBox"> { t('website.repairType.Electricals') }
                                                            <input type="checkbox" name="services" value="Electricals" onChange={handleServicesChange} />
                                                            <span className="checkmark"></span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label className="CheckBox"> { t('website.repairType.BodyShop') }
                                                            <input type="checkbox" name="services" value="Body Shop" onChange={handleServicesChange} />
                                                            <span className="checkmark"></span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label className="CheckBox"> { t('website.repairType.WheelAlignment') }
                                                            <input type="checkbox" name="services" value="Wheel Alignment" onChange={handleServicesChange} />
                                                            <span className="checkmark"></span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label className="CheckBox"> { t('website.repairType.TireChanges') }
                                                            <input type="checkbox" name="services" value="Tire Changes" onChange={handleServicesChange} />
                                                            <span className="checkmark"></span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label className="CheckBox"> { t('website.repairType.TankReplacement') }
                                                            <input type="checkbox" name="services" value="Tank Replacement" onChange={handleServicesChange} />
                                                            <span className="checkmark"></span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label className="CheckBox"> { t('website.repairType.BatteryChanges') }
                                                            <input type="checkbox" name="services" value="Battery Changes" onChange={handleServicesChange} />
                                                            <span className="checkmark"></span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label className="CheckBox"> { t('website.repairType.HosesBelts') }
                                                            <input type="checkbox" name="services" value="Hoses & Belts" onChange={handleServicesChange} />
                                                            <span className="checkmark"></span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label className="CheckBox"> { t('website.repairType.Radiator') }
                                                            <input type="checkbox" name="services" value="Radiator" onChange={handleServicesChange} />
                                                            <span className="checkmark"></span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label className="CheckBox"> { t('website.repairType.Wipers') }
                                                            <input type="checkbox" name="services" value="Wipers" onChange={handleServicesChange} />
                                                            <span className="checkmark"></span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label className="CheckBox"> { t('website.repairType.TrailerHitches') }
                                                            <input type="checkbox" name="services" value="Trailer Hitches" onChange={handleServicesChange} />
                                                            <span className="checkmark"></span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label className="CheckBox"> { t('website.repairType.Boost') }
                                                            <input type="checkbox" name="services" value="Boost" onChange={handleServicesChange} />
                                                            <span className="checkmark"></span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label className="CheckBox"> { t('website.repairType.DoorLocks') }
                                                            <input type="checkbox" name="services" value="Door Locks" onChange={handleServicesChange} />
                                                            <span className="checkmark"></span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label className="CheckBox"> { t('website.repairType.Gasoline') }
                                                            <input type="checkbox" name="services" value="Gasoline" onChange={handleServicesChange} />
                                                            <span className="checkmark"></span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label className="CheckBox"> { t('website.repairType.Towing') }
                                                            <input type="checkbox" name="services" value="Towing" onChange={handleServicesChange} />
                                                            <span className="checkmark"></span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label className="CheckBox"> { t('website.repairType.Steering') }
                                                            <input type="checkbox" name="services" value="Steering" onChange={handleServicesChange} />
                                                            <span className="checkmark"></span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label className="CheckBox"> { t('client.search.Dontknow') }
                                                            <input type="checkbox"/>
                                                            <span className="checkmark"></span>
                                                        </label>
                                                    </li> 
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button className="Accept" type="submit" disabled={buttonDisable}>Submit Quote</button>
                            </form>
                        </div>
                    </div>
                </div> 
            </Modal>

            <Footer />
        
        </>
    );
}

export default GarageHistory