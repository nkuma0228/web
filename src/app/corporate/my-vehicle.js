import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import _ from 'lodash'
import FORM from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Moment from 'moment';

import Header from "./header";
import Footer from "./footer";

import { manufacturerList, modelList, vehicleList, vehicleCreate, vehicleView, vehicleUpdate, vehicleDelete } from "../../redux/actions/corporate/vehicleAction";

const searchInitialState = {
    search:''
}

const initialState = {
    fileNumber:'',
    vehicleNumber:'',
    model:'',
    make:'',
    year:'',
    owner:'',
    fileNumberEmpty:'',
    vehicleNumberEmpty:'',
    modelEmpty:'',
    makeEmpty:'',
    yearEmpty:'',
    typeEmpty:'',
    ownerEmpty:'',
}

const editState = {
    idEdit:'',
    fileNumberEdit:'',
    vehicleNumberEdit:'',
    modelEdit:'',
    makeEdit:'',
    yearEdit:'',
    ownerEdit:'',
    fileNumberEditEmpty:'',
    vehicleNumberEditEmpty:'',
    modelEditEmpty:'',
    makeEditEmpty:'',
    yearEditEmpty:'',
    typeEditEmpty:'',
    ownerEditEmpty:'',
}

const CorporateMyVehicle = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { i18n, t } = useTranslation();

    const getListData = useSelector(state => state.corporateVehicle)
    const { manufacturerData, modelData, corporateVehicleData, corporateEditVehicleData } = getListData
    useEffect(() => {
        const data = {keyword:''}
        dispatch(vehicleList(data))
        dispatch(manufacturerList())
    },[])

    useEffect(() => {
        if (!_.isEmpty(corporateEditVehicleData)) {

            const updateData = _.cloneDeep(veState)
            updateData.idEdit = corporateEditVehicleData._id
            updateData.fileNumberEdit = corporateEditVehicleData.fileNumber?corporateEditVehicleData.fileNumber:''
            updateData.vehicleNumberEdit = corporateEditVehicleData.vehicleNumber?corporateEditVehicleData.vehicleNumber:''
            updateData.modelEdit = corporateEditVehicleData.model
            updateData.makeEdit = corporateEditVehicleData.make
            updateData.yearEdit = corporateEditVehicleData.year
            updateData.typeEdit = corporateEditVehicleData.type?corporateEditVehicleData.type:''
            updateData.ownerEdit = corporateEditVehicleData.owner?corporateEditVehicleData.owner:''

            updateVEState(
                updateData
            )
        }
    },[corporateEditVehicleData])

    const [searchState, updateSearchState] = useState(searchInitialState);
    const {
        search,
        searchEmpty
    } = searchState
    const handleSearchInputChange = (e) => {
        const { name, value } = e.target
        updateSearchState({
            ...searchState, [name]: value
        })
    }
    const handleSearchValidation = () => {

        let searchEmpty = ''
        let formIsValid = true;
        if (!search.trim()) {
            searchEmpty = "Please enter search";
            formIsValid = false;
        }
        updateSearchState({
            ...searchState, 
            searchEmpty,
        })
        return formIsValid;
    }
    let handleSearchSubmit = (event) => {
        event.preventDefault();

        let formIsValid = handleSearchValidation();
        if (formIsValid) {
            const data = { keyword:search }
            dispatch(vehicleList(data))
        }
    }

    const vehicleTypeChecked = [
        { "name" : "Racing"},
        { "name" : "Hybrid"},
        { "name" : "Diesel"},
        { "name" : "European Cars"},
        { "name" : "Electric"},
        { "name" : "Trucks | Vans"},
        { "name" : "Auto Trans"},
        { "name" : "Manual Trans"},
        { "name" : "American Cars"},
        { "name" : "Other"}
    ]

    const [addVehicleShow, setAddVehicleShow] = useState(false);
    const handleAddVehicleClose = () => setAddVehicleShow(false);
    const handleAddVehicleShow = () => { setAddVehicleShow(true); }

    const [editVehicleShow, setEditVehicleShow] = useState(false);
    const handleEditVehicleClose = () => setEditVehicleShow(false);

    const [vState, updateVState] = useState(initialState);
    const {
        fileNumber,
        vehicleNumber,
        model,
        make,
        year,
        type,
        owner,
        fileNumberEmpty,
        vehicleNumberEmpty,
        modelEmpty,
        makeEmpty,
        yearEmpty,
        typeEmpty,
        ownerEmpty,
    } = vState

    const handleInputChange = (e) => {
        const { name, value } = e.target
        updateVState({
            ...vState, [name]: value
        })
        if(name == "make") {
            let dependentData = { name:value };
            dispatch(modelList(dependentData))
        }
    }

    const handleValidation = () => {

        let fileNumberEmpty = ''
        let vehicleNumberEmpty = ''
        let modelEmpty = ''
        let makeEmpty = ''
        let yearEmpty = ''
        let typeEmpty = ''
        let ownerEmpty = ''

        let formIsValid = true;
        if (!fileNumber || !fileNumber.trim()) {
            fileNumberEmpty = "Please enter file number";
            formIsValid = false;
        }
        if (!vehicleNumber || !vehicleNumber.trim()) {
            vehicleNumberEmpty = "Please enter vehicle number";
            formIsValid = false;
        }
        if (!model || !model.trim()) {
            modelEmpty = "Please enter model";
            formIsValid = false;
        }
        if (!make || !make.trim()) {
            makeEmpty = "Please enter make";
            formIsValid = false;
        }
        // if (!year || !year.trim()) {
        //     yearEmpty = "Please enter year";
        //     formIsValid = false;
        // }
        // if (!type || !type.trim()) {
        //     typeEmpty = "Please enter type";
        //     formIsValid = false;
        // }
        // if (!owner || !owner.trim()) {
        //     ownerEmpty = "Please enter owner";
        //     formIsValid = false;
        // }
        
        updateVState({
            ...vState, 
            fileNumberEmpty,
            vehicleNumberEmpty,
            modelEmpty,
            makeEmpty,
            yearEmpty,
            typeEmpty,
            ownerEmpty
        })
        return formIsValid;
    }

    let handleVehicleSubmit = (event) => {
        event.preventDefault();
        let formIsValid = handleValidation();
        if (formIsValid) {
            const data = { fileNumber, vehicleNumber, model, make, year, type, owner }
            dispatch(vehicleCreate(data)).then(res => {
                if (res.code == 201) {
                    handleAddVehicleClose();
                    toast.success(res.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    setTimeout(
                        function() {
                            window.location.reload()
                        }
                        .bind(this),
                        2000
                    );
                } else {
                    toast.error(res.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    updateVState({
                        ...vState, 
                        errorMsg: res.message,
                        fileNumberEmpty: '',
                        vehicleNumberEmpty: '',
                        modelEmpty: '',
                        makeEmpty: '',
                        yearEmpty: '',
                        typeEmpty: '',
                        ownerEmpty: '',
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

    // Edit
    const [veState, updateVEState] = useState(editState);
    const {
        idEdit,
        fileNumberEdit,
        vehicleNumberEdit,
        modelEdit,
        makeEdit,
        yearEdit,
        typeEdit,
        ownerEdit,
        fileNumberEditEmpty,
        vehicleNumberEditEmpty,
        modelEditEmpty,
        makeEditEmpty,
        yearEditEmpty,
        typeEditEmpty,
        ownerEditEmpty,
    } = veState

    const handleEditVehicleShow = (id) => { 
        const data = { id:id }
        dispatch(vehicleView(data)).then(res => {
            
            if (res.code == 200) {
                setEditVehicleShow(true);
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

    const handleEditInputChange = (e) => {
        const { name, value } = e.target
        updateVEState({
            ...veState, [name]: value
        })

        if(name == "makeEdit") {
            let dependentData = { name:value };
            dispatch(modelList(dependentData))
        }
    }
    const handleEditValidation = () => {

        let fileNumberEditEmpty = ''
        let vehicleNumberEditEmpty = ''
        let modelEditEmpty = ''
        let makeEditEmpty = ''
        let yearEditEmpty = ''
        let typeEditEmpty = ''
        let ownerEditEmpty = ''

        let formIsValid = true;
        if (!fileNumberEdit.trim()) {
            fileNumberEditEmpty = "Please enter file number";
            formIsValid = false;
        }
        if (!vehicleNumberEdit.trim()) {
            vehicleNumberEditEmpty = "Please enter vehicle number";
            formIsValid = false;
        }
        if (!modelEdit.trim()) {
            modelEditEmpty = "Please enter model";
            formIsValid = false;
        }
        if (!makeEdit.trim()) {
            makeEditEmpty = "Please enter make";
            formIsValid = false;
        }
        if (!yearEdit.trim()) {
            yearEditEmpty = "Please enter year";
            formIsValid = false;
        }
        if (!typeEdit.trim()) {
            typeEditEmpty = "Please enter type";
            formIsValid = false;
        }
        if (!ownerEdit.trim()) {
            ownerEditEmpty = "Please enter owner";
            formIsValid = false;
        }

        updateVEState({
            ...veState, 
            fileNumberEditEmpty,
            vehicleNumberEditEmpty,
            modelEditEmpty,
            makeEditEmpty,
            yearEditEmpty,
            typeEditEmpty,
            ownerEditEmpty
        })
        return formIsValid;
    }

    let handleVehicleEditSubmit = (event) => {
        event.preventDefault();
        let formIsValid = handleEditValidation();
        if (formIsValid) {
            const data = { id:idEdit, fileNumber:fileNumberEdit, vehicleNumber:vehicleNumberEdit, model:modelEdit, make:makeEdit, year:yearEdit, type:typeEdit, owner:ownerEdit }
            
            dispatch(vehicleUpdate(data)).then(res => {
                
                if (res.code == 201) {

                    toast.success(res.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    
                    handleEditVehicleClose();
                    const data = {keyword:''}
                    dispatch(vehicleList(data))

                } else {
                    // console.log(res);
                    let errors = res.errors.errors
                    errors.map((item) => {
                        var newParam = item.param
                        let messageErr = item.msg +' of '+ newParam
                        toast.error(messageErr, {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    })
                    updateVEState({
                        ...veState, 
                        errorMsg: res.message,
                        fileNumberEditEmpty: '',
                        vehicleNumberEditEmpty: '',
                        modelEditEmpty: '',
                        makeEditEmpty: '',
                        yearEditEmpty: '',
                        typeEditEmpty: '',
                        ownerEditEmpty: '',
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

    const [deleteId, setDeleteIdShow] = useState();
    const [deleteShow, setDeleteShow] = useState(false);
    const handleDeleteClose = () => {
        setDeleteShow(false)
    }
    const handleDeleteShow = (id) => { 
        setDeleteShow(true)
        setDeleteIdShow(id)
    };

    const handleDeleteVehicle = () => {
        if(deleteId) {
            var data = {id: deleteId}
            dispatch(vehicleDelete(data)).then(res => {
                if (res.code == 200) {
                    toast.success(res.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    handleDeleteClose()
                    const data = {keyword:''}
                    dispatch(vehicleList(data))
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
    }

    const handleVehicleHistoryShow = (id) => { 
        window.localStorage.setItem("vehicleHistory", id)
        navigate("/corporate/client/my-vehicle-history")
    }

    return (
        <>
            <ToastContainer/>
            <Header />

            <div className="WrapperArea">
                <div className="WrapperBox"> 
                    <div className="TitleBox">
                        <h4> { t('client.vehicle.MyVehicles') } </h4>
                    </div>
                    <div className="Small-Wrapper">
                        <div className="SearchBox">
                            <FORM onSubmit={handleSearchSubmit}>
                                <input type="text" name="search" placeholder="Search Vehicle" value={search} onChange={handleSearchInputChange} />
                                <button type="submit">{ t('client.vehicle.Search') }</button>
                            </FORM>
                            <a href="JavaScript:Void(0);" onClick={handleAddVehicleShow}>{ t('client.vehicle.Addvehicle') }</a>
                        </div>
                        <div className="TableList">
                            <table>
                                <thead>
                                    <tr>
                                        <th>S.No</th>  
                                        <th> { t('client.vehicle.FileNumber') } </th> 
                                        <th> { t('client.vehicle.VehicleNumber') } </th> 
                                        <th> { t('client.vehicle.Model') } </th>
                                        <th> { t('client.vehicle.Make') } </th>
                                        <th> { t('client.vehicle.Year') } </th>
                                        <th> { t('client.vehicle.Type') } </th>
                                        <th> { t('client.vehicle.Owner') } </th> 
                                        <th> { t('client.vehicle.Addedon') } </th> 
                                        <th> { t('client.vehicle.History') } </th> 
                                        <th> { t('client.vehicle.Action') } </th> 
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    corporateVehicleData && corporateVehicleData.length>0 && corporateVehicleData.map((item, i)=>
                                        
                                        <tr key={i}>
                                            <td> {i} </td> 
                                            <td> { item.fileNumber } </td> 
                                            <td> { item.vehicleNumber } </td> 
                                            <td> { item.model } </td>
                                            <td> { item.make } </td>
                                            <td> { item.year } </td>
                                            <td> { item.type } </td>
                                            <td> { item.owner } </td> 
                                            <td> { Moment(item.createdAt).format('DD-MM-YYYY') } </td>  
                                            <td>
                                                <a href="JavaScript:Void(0);" onClick={()=>handleVehicleHistoryShow(item._id)}>
                                                    <span className="Blue">View Vehicle History</span>
                                                </a>
                                            </td>
                                            <td>
                                                <div className="Actions"> 
                                                    <a className="Green" title="Edit" href="JavaScript:Void(0);" onClick={()=>handleEditVehicleShow(item._id)}>
                                                        <i className="fa fa-pencil-square-o"></i>
                                                    </a>
                                                    <a className="Red" title="Delete" href="JavaScript:Void(0);" onClick={()=>handleDeleteShow(item._id)}>
                                                        <i className="fa fa-trash"></i>
                                                    </a>  
                                                </div>
                                            </td>      
                                        </tr>
                                    )
                                }
                                </tbody>
                            </table>  
                        </div>
                    </div>
                </div>
            </div> 

            <Modal show={addVehicleShow} className="PanelModal">
                <div className="modal-body">
                    <div className="Category">
                        <a href="javascript:void(0);" className="Close" onClick={handleAddVehicleClose}>×</a>
                        <h3> { t('client.vehicle.Addvehicle') } </h3>
                        <FORM onSubmit={handleVehicleSubmit}>
                            <div className="form-group">
                                <label> { t('client.vehicle.FileNumber') } </label>
                                <input type="text" className="form-control" placeholder="Enter File Number" name="fileNumber" value={fileNumber} onChange={handleInputChange} />
                                <span style={{ color: "red" }}>{fileNumberEmpty}</span>
                            </div> 
                            <div className="form-group">
                                <label> { t('client.vehicle.VehicleNumber') } </label>
                                <input type="text" className="form-control" placeholder="Enter Vehicle Number" name="vehicleNumber" value={vehicleNumber} onChange={handleInputChange} />
                                <span style={{ color: "red" }}>{vehicleNumberEmpty}</span>
                            </div> 
                            <div className="form-group">  
                                <label> { t('client.vehicle.Make') } </label>
                                <select className="form-control" name="make" autoComplete="off" value={make} onChange={handleInputChange}>
                                    <option value=""> Select </option>
                                    {
                                        manufacturerData && manufacturerData.length>0? manufacturerData.map((item, i)=>
                                            <option value={item._id}> {item._id} </option>
                                        )
                                        :''
                                    }
                                </select>
                                <span style={{ color: "red" }}>{makeEmpty}</span>
                            </div> 
                            <div className="form-group">  
                                <label> { t('client.vehicle.Model') } </label>
                                <select className="form-control" name="model" value={model} onChange={handleInputChange}>
                                    <option value=""> Select </option>
                                    {
                                        modelData && modelData.length>0?
                                            modelData.map((item, i) =>
                                                <option value={ item.model }> { item.model } </option>
                                            )
                                        :
                                        ''
                                    }
                                </select>
                                <span style={{ color: "red" }}>{modelEmpty}</span>
                            </div> 
                            <div className="form-group">  
                                <label> { t('client.vehicle.Year') } </label>
                                <input type="text" className="form-control" placeholder="Enter Year" name="year" value={year} onChange={handleInputChange} />
                                <span style={{ color: "red" }}>{yearEmpty}</span>
                            </div> 
                            <div className="form-group">  
                                <label> { t('client.vehicle.Type') } </label>
                                
                                <select className="form-control" name="type" value={type} onChange={handleInputChange}>
                                <option value=""> Select { t('client.vehicle.Type') } </option>
                                {
                                    vehicleTypeChecked && vehicleTypeChecked.length>0 && vehicleTypeChecked.map((item, i) => 
                                        <option value={ item.name }> { item.name } </option>
                                    )
                                }
                                </select>
                                <span style={{ color: "red" }}>{typeEmpty}</span>
                            </div> 
                            <div className="form-group">  
                                <label> { t('client.vehicle.Owner') } </label>
                                <input type="text" className="form-control" placeholder="Enter Owner Name" name="owner" value={owner} onChange={handleInputChange} />
                                <span style={{ color: "red" }}>{ownerEmpty}</span>
                            </div> 
                            <button type="submit" className="Accept"> { t('client.vehicle.Addvehicle') } </button>
                        </FORM>
                    </div>
                </div>
            </Modal>

            <Modal show={editVehicleShow} className="PanelModal">
                <div className="modal-body">
                    <div className="Category">
                        <a href="javascript:void(0);" className="Close" onClick={handleEditVehicleClose}>×</a>
                        <h3>{ t('client.vehicle.EditVehicle') }</h3>   
                        <FORM onSubmit={handleVehicleEditSubmit}>
                            <div className="form-group">
                                <label> { t('client.vehicle.FileNumber') } </label>
                                <input type="text" className="form-control" placeholder="Enter File Number" name="fileNumberEdit" value={fileNumberEdit} onChange={handleEditInputChange} />
                                <span style={{ color: "red" }}>{fileNumberEditEmpty}</span>
                            </div> 
                            <div className="form-group">
                                <label> { t('client.vehicle.VehicleNumber') } </label>
                                <input type="text" className="form-control" placeholder="Enter Vehicle Number" name="vehicleNumberEdit" value={vehicleNumberEdit} onChange={handleEditInputChange} />
                                <span style={{ color: "red" }}>{vehicleNumberEditEmpty}</span>
                            </div> 
                            <div className="form-group">  
                                <label> { t('client.vehicle.Make') } </label>
                                <select className="form-control" name="makeEdit" autoComplete="off" defaultValue={makeEdit} onChange={handleEditInputChange}>
                                    <option value=""> Select </option>
                                    {
                                        manufacturerData && manufacturerData.length>0? manufacturerData.map((item, i)=>
                                            <option value={item._id}> {item._id} </option>
                                        )
                                        :''
                                    }
                                </select>
                                <span style={{ color: "red" }}>{makeEditEmpty}</span>
                            </div> 
                            <div className="form-group">  
                                <label> { t('client.vehicle.Model') } </label>
                                <select className="form-control" name="modelEdit" defaultValue={modelEdit} onChange={handleEditInputChange}>
                                    <option value=""> Select Model </option>
                                    {
                                        modelData && modelData.length>0?
                                            modelData.map((item, i) =>
                                                <option value={ item.model }> { item.model } </option>
                                            )
                                        :
                                        <option value={modelEdit}> { modelEdit } </option>
                                    }
                                </select>
                                <span style={{ color: "red" }}>{modelEditEmpty}</span>
                            </div> 
                            
                            <div className="form-group">  
                                <label> { t('client.vehicle.Year') } </label>
                                <input type="text" className="form-control" placeholder="Enter Year" name="yearEdit" value={yearEdit} onChange={handleEditInputChange} />
                                <span style={{ color: "red" }}>{yearEditEmpty}</span>
                            </div> 
                            <div className="form-group">  
                                <label> { t('client.vehicle.Type') } </label>

                                <select className="form-control" name="typeEdit" defaultValue={typeEdit} onChange={handleEditInputChange}>
                                <option value=""> Select { t('client.vehicle.Type') } </option>
                                {
                                    vehicleTypeChecked && vehicleTypeChecked.length>0 && vehicleTypeChecked.map((item, i) => 
                                        <option value={ item.name }> { item.name } </option>
                                    )
                                }
                                </select>

                                <span style={{ color: "red" }}>{typeEditEmpty}</span>
                            </div> 
                            <div className="form-group">  
                                <label> { t('client.vehicle.Owner') } </label>
                                <input type="text" className="form-control" placeholder="Enter Owner Name" name="ownerEdit" value={ownerEdit} onChange={handleEditInputChange} />
                                <span style={{ color: "red" }}>{ownerEditEmpty}</span>
                            </div> 
                            <button type="submit" className="Accept"> Edit Vehicle</button>
                        </FORM>
                    </div>
                </div>
            </Modal>

            <Modal show={deleteShow} className="PanelModal">
                <div className="modal-body"> 
                    <div className="DeclineText">
                        <a href="javascript:void(0);" className="Close" onClick={handleDeleteClose}>×</a>
                        <h3>Delete</h3>
                        <p>Are you sure you want to delete this Vehicle ?</p>
                        <h4> 
                            <a href="javascript:void(0);" onClick={handleDeleteClose}>no</a>
                            <a href="javascript:void(0);" onClick={handleDeleteVehicle}>Yes</a>
                        </h4>
                    </div>
                </div> 
            </Modal> 

            <Footer />
        </>
    );
}

export default CorporateMyVehicle