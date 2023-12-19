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

import { manufacturerList, modelList, vehicleList, vehicleCreate, vehicleView, vehicleUpdate, vehicleDelete } from "../../redux/actions/provider/vehicleAction";

const searchInitialState = {
    search:''
}

const initialState = {
    model:'',
    make:'',
    mileage:'',
    type:'',
    imageGallery:'',
    modelEmpty:'',
    makeEmpty:'',
    mileageEmpty:'',
    typeEmpty:'',
    imageGalleryEmpty:''
}

const editState = {
    idEdit:'',
    modelEdit:'',
    makeEdit:'',
    mileageEdit:'',
    typeEdit:'',
    imageGalleryEdit:'',
    modelEditEmpty:'',
    makeEditEmpty:'',
    mileageEditEmpty:'',
    typeEditEmpty:'',
    imageGalleryEditEmpty:''
}

var imagePreview = [];
var imageFile = [];

var imageEditPreview = [];
var imageEditFile = [];

const SalesMyVehicle = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { i18n, t } = useTranslation();

    const getListData = useSelector(state => state.salesVehicle)
    const { manufacturerSalesData, modelSalesData, salesVehicleData, salesEditVehicleData } = getListData
    useEffect(() => {
        const data = {keyword:''}
        dispatch(vehicleList(data))
        dispatch(manufacturerList())
    },[])
    const [listState, setListState] = useState([]);
    const [listFilterState, setListFilterState] = useState([]);

    useEffect(() => {
        setListState(salesVehicleData)
        setListFilterState(salesVehicleData)
    },[salesVehicleData])

    useEffect(() => {
        if (!_.isEmpty(salesEditVehicleData)) {

            const updateData = _.cloneDeep(veState)
            updateData.idEdit = salesEditVehicleData._id
            updateData.modelEdit = salesEditVehicleData.model
            updateData.makeEdit = salesEditVehicleData.make
            updateData.mileageEdit = salesEditVehicleData.mileage
            updateData.typeEdit = salesEditVehicleData.type?salesEditVehicleData.type:''

            setSelectedImagePreview({ file: salesEditVehicleData.imageGallery })

            updateVEState(
                updateData
            )
        }
    },[salesEditVehicleData])

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
            var filterData = listState.filter((item) => {
                if(item.model == search || item.make == search || item.mileage == search) {
                    return item;
                }
            })
            setListFilterState(filterData)
        }
    }

    const [addVehicleShow, setAddVehicleShow] = useState(false);
    const handleAddVehicleClose = () => setAddVehicleShow(false);
    const handleAddVehicleShow = () => { setAddVehicleShow(true); }

    const [editVehicleShow, setEditVehicleShow] = useState(false);
    const handleEditVehicleClose = () => setEditVehicleShow(false);

    const [vState, updateVState] = useState(initialState);
    const {
        model,
        make,
        mileage,
        type,
        imageGallery,
        modelEmpty,
        makeEmpty,
        mileageEmpty,
        typeEmpty,
        imageGalleryEmpty,
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

        let modelEmpty = ''
        let makeEmpty = ''
        let mileageEmpty = ''
        let typeEmpty = ''

        let formIsValid = true;
        
        if (!model.trim()) {
            modelEmpty = "Please enter model";
            formIsValid = false;
        }
        if (!make.trim()) {
            makeEmpty = "Please enter make";
            formIsValid = false;
        }
        if (!mileage.trim()) {
            mileageEmpty = "Please enter mileage";
            formIsValid = false;
        }
        if (!type.trim()) {
            typeEmpty = "Please enter type";
            formIsValid = false;
        }
        updateVState({
            ...vState,
            modelEmpty,
            makeEmpty,
            mileageEmpty,
            typeEmpty
        })
        return formIsValid;
    }

    const [selectedImage, setSelectedImage] = useState([]);
    const [selectedImagePreview, setSelectedImagePreview] = useState([]);
    const imageChange = (e) => {
        
        if(imagePreview.length <3) {
            if (e.target.files && e.target.files.length > 0) {
                
                imageFile.push(e.target.files[0])
                imagePreview.push(URL.createObjectURL(e.target.files[0]))
                setSelectedImage({ file: imageFile });
                setSelectedImagePreview(imagePreview);
                e.target.value = null;
            }
        } else {
            toast.error("Image can not be upload more than 3", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }
    const removeSelectedImage = (i) => {
        imagePreview.splice(i, 1)
        imageFile.splice(i, 1)
        setSelectedImage({ file: imageFile });
        setSelectedImagePreview(imagePreview);
    };


    const [selectedEditImage, setSelectedEditImage] = useState([]);
    const [selectedEditImagePreview, setSelectedEditImagePreview] = useState([]);
    const uploadMultipleFiles = (e) => {

        if(imageEditPreview.length <3) {
            if (e.target.files && e.target.files.length > 0) {
                
                imageEditFile.push(e.target.files[0])
                imageEditPreview.push(URL.createObjectURL(e.target.files[0]))
                setSelectedEditImage({ file: imageEditFile });
                setSelectedEditImagePreview(imageEditPreview);

                e.target.value = null;
            }
        } else {
            toast.error("Image can not be upload more than 3", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }
    
    const removeSelectedEditImage = (i) => {
        imageEditPreview.splice(i, 1)
        imageEditFile.splice(i, 1)
        setSelectedEditImage({ file: imageFile });
        setSelectedImagePreview(imageEditPreview);
    };

    const [buttonDisable, setButtonDisable] = useState(false);
    let handleVehicleSubmit = (event) => {
        event.preventDefault();
        let formIsValid = handleValidation();
        if (formIsValid) {

            setButtonDisable(true)

            const data = { model, make, mileage, type, imageGallery:selectedImage?selectedImage.file:[] }
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
                        modelEmpty: '',
                        makeEmpty: '',
                        mileageEmpty: '',
                        typeEmpty: ''
                    })
                }
            }).catch(err => {

                setButtonDisable(false)
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
        modelEdit,
        makeEdit,
        mileageEdit,
        typeEdit,
        imageGalleryEdit,
        modelEditEmpty,
        makeEditEmpty,
        mileageEditEmpty,
        typeEditEmpty,
        imageGalleryEditEmpty
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

        if(name == "make") {
            let dependentData = { name:value };
            dispatch(modelList(dependentData))
        }
    }
    const handleEditValidation = () => {

        let modelEditEmpty = ''
        let makeEditEmpty = ''
        let mileageEditEmpty = ''
        let typeEditEmpty = ''

        let formIsValid = true;
        if (!modelEdit.trim()) {
            modelEditEmpty = "Please enter model";
            formIsValid = false;
        }
        if (!makeEdit.trim()) {
            makeEditEmpty = "Please enter make";
            formIsValid = false;
        }
        if (!mileageEdit.trim()) {
            mileageEditEmpty = "Please enter mileage";
            formIsValid = false;
        }
        if (!typeEdit.trim()) {
            typeEditEmpty = "Please enter type";
            formIsValid = false;
        }

        updateVEState({
            ...veState, 
            modelEditEmpty,
            makeEditEmpty,
            mileageEditEmpty,
            typeEditEmpty
        })
        return formIsValid;
    }

    let handleVehicleEditSubmit = (event) => {
        event.preventDefault();
        let formIsValid = handleEditValidation();
        if (formIsValid) {
            const data = { id:idEdit, model:modelEdit, make:makeEdit, mileage:mileageEdit, type:typeEdit, imageGalleryEdit:selectedImage?selectedImage.file:[] }
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
                        modelEditEmpty: '',
                        makeEditEmpty: '',
                        mileageEditEmpty: '',
                        typeEditEmpty: ''
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

    return (
        <>
            <ToastContainer/>
            <Header />

            <div className="WrapperArea">
                <div className="WrapperBox"> 
                    <div className="TitleBox">
                        <h4>My Vehicles</h4>
                    </div>
                    <div className="Small-Wrapper">
                        <div className="SearchBox">
                            <FORM onSubmit={handleSearchSubmit}>
                                <input type="text" name="search" placeholder="Search Vehicle" value={search} onChange={handleSearchInputChange} />
                                <button type="submit">Search</button>
                            </FORM>
                            {
                                salesVehicleData && salesVehicleData.length>20?
                                    "You can not add more than 20 vehicles"
                                : <a href="JavaScript:Void(0);" onClick={handleAddVehicleShow}>Add Vehicle</a>
                            }
                        </div>
                        <div className="TableList">
                            <table>
                                <thead>
                                    <tr>
                                        <th>S.No</th>  
                                        <th> { t('sales.vehicle.Model') } </th>
                                        <th> { t('sales.vehicle.Make') } </th>
                                        <th> { t('sales.vehicle.Mileage') } </th>
                                        <th> { t('sales.vehicle.Type') } </th>
                                        <th> { t('sales.vehicle.Addedon') } </th> 
                                        <th> { t('sales.vehicle.Action') } </th> 
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    listFilterState && listFilterState.length>0 && listFilterState.map((item, i)=>
                                        
                                        <tr key={i}>
                                            <td> {i} </td> 
                                            <td> { item.model } </td>
                                            <td> { item.make } </td>
                                            <td> { item.mileage } </td>
                                            <td> { item.type } </td>
                                            <td> { Moment(item.createdAt).format('DD-MM-YYYY') } </td>  

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

            <Modal show={addVehicleShow} className="PanelModal PanelGallery">
                <div className="modal-body">
                    <div className="Category">
                        <a href="javascript:void(0);" className="Close" onClick={handleAddVehicleClose}>×</a>
                        <h3> { t('sales.vehicle.Addvehicle') } </h3>
                        <FORM onSubmit={handleVehicleSubmit}>
                            
                            <div className="form-group">  
                                <label> { t('sales.vehicle.Make') } </label>
                                <select className="form-control" name="make" autoComplete="off" value={make} onChange={handleInputChange}>
                                    <option value=""> Select </option>
                                    {
                                        manufacturerSalesData && manufacturerSalesData.length>0? manufacturerSalesData.map((item, i)=>
                                            <option value={item._id}> {item._id} </option>
                                        )
                                        :''
                                    }
                                </select>
                                <span style={{ color: "red" }}>{makeEmpty}</span>
                            </div> 
                            <div className="form-group">  
                                <label> { t('sales.vehicle.Model') } </label>
                                <select className="form-control" name="model" value={model} onChange={handleInputChange}>
                                    <option value=""> Select Model </option>
                                    {
                                        modelSalesData && modelSalesData.length>0?
                                            modelSalesData.map((item, i) =>
                                                <option value={ item.model }> { item.model } </option>
                                            )
                                        :
                                        ''
                                    }
                                </select>
                                <span style={{ color: "red" }}>{modelEmpty}</span>
                            </div> 
                            <div className="form-group">  
                                <label> { t('sales.vehicle.Mileage') } </label>
                                <input type="text" className="form-control" placeholder="Enter Mileage" name="mileage" value={mileage} onChange={handleInputChange} />
                                <span style={{ color: "red" }}>{mileageEmpty}</span>
                            </div> 
                            <div className="form-group">  
                                <label> { t('sales.vehicle.Type') } </label>
                                <select className="form-control" name="type" value={type} onChange={handleInputChange}>
                                    <option value=""> Select Vehicle Type </option>
                                    <option value="New"> New </option>
                                    <option value="Used"> Used </option>
                                </select>
                                <span style={{ color: "red" }}>{typeEmpty}</span>
                            </div> 

                            <div className="form-group">
                                <ul className="ImaesGroup">
                                    <li>
                                        <div className="AddImages">
                                            <span><i className="fa fa-plus" aria-hidden="true"></i></span>
                                            <p>Add Images</p>
                                            <input type="file" accept="image/*" name="images" onChange={imageChange}/>
                                        </div>
                                    </li>
                                    {
                                        selectedImagePreview && (selectedImagePreview.length > 0) ? 
                                        selectedImagePreview.map((img, i) =>
                                                <li key={i}>
                                                    <button type="button" className="Close" onClick={()=>removeSelectedImage(i)}>×</button>
                                                    <img src={img} />
                                                </li>
                                            )
                                        : ""
                                    }
                                </ul>
                            </div>

                            <button type="submit" className="Accept" disabled={buttonDisable}> { t('sales.vehicle.Addvehicle') } </button>
                        </FORM>
                    </div>
                </div>
            </Modal>

            <Modal show={editVehicleShow} className="PanelModal PanelGallery">
                <div className="modal-body">
                    <div className="Category">
                        <a href="javascript:void(0);" className="Close" onClick={handleEditVehicleClose}>×</a>
                        <h3>Edit Vehicle</h3>   
                        <FORM onSubmit={handleVehicleEditSubmit}>

                            <div className="form-group">  
                                <label> { t('sales.vehicle.Make') } </label>
                                <select className="form-control" name="makeEdit" autoComplete="off" defaultValue={makeEdit} onChange={handleInputChange}>
                                    <option value=""> Select Make</option>
                                    {
                                        manufacturerSalesData && manufacturerSalesData.length>0? manufacturerSalesData.map((item, i)=>
                                            <option value={item._id}> {item._id} </option>
                                        )
                                        :''
                                    }
                                </select>
                                <span style={{ color: "red" }}>{makeEditEmpty}</span>
                            </div> 
                            <div className="form-group">  
                                <label> { t('sales.vehicle.Model') } </label>
                                <select className="form-control" name="modelEdit" defaultValue={modelEdit} onChange={handleInputChange}>
                                    <option value=""> Select Model </option>
                                    {
                                        modelSalesData && modelSalesData.length>0?
                                            modelSalesData.map((item, i) =>
                                                <option value={ item.model }> { item.model } </option>
                                            )
                                        :
                                        <option value={modelEdit}> { modelEdit } </option>
                                    }
                                </select>
                                <span style={{ color: "red" }}>{modelEditEmpty}</span>
                            </div> 
                            
                            <div className="form-group">  
                                <label> { t('sales.vehicle.Mileage') } </label>
                                <input type="text" className="form-control" placeholder="Enter mileage" name="mileageEdit" value={mileageEdit} onChange={handleEditInputChange} />
                                <span style={{ color: "red" }}>{mileageEditEmpty}</span>
                            </div>

                            <div className="form-group">  
                                <label> { t('sales.vehicle.Type') } </label>
                                <select className="form-control" name="typeEdit" value={typeEdit} onChange={handleInputChange}>
                                    <option value=""> Select Vehicle Type </option>
                                    <option value="New"> New </option>
                                    <option value="Used"> Used </option>
                                </select>
                                <span style={{ color: "red" }}>{typeEditEmpty}</span>
                            </div> 

                            <div className="form-group">
                                <ul className="ImaesGroup">
                                    <li>
                                        <div className="AddImages">
                                            <span><i className="fa fa-plus" aria-hidden="true"></i></span>
                                            <p>Edit Images</p>
                                            <input type="file" accept="image/*" name="imagesEdit" onChange={uploadMultipleFiles}/>
                                        </div>
                                    </li>
                                    {
                                        selectedImagePreview && selectedImagePreview.file && (selectedImagePreview.file.length > 0) ? 
                                        selectedImagePreview.file.map((img, i) =>
                                                <li key={i}>
                                                    <button type="button" className="Close" onClick={()=>removeSelectedEditImage(i)}>×</button>
                                                    <img src={img} />
                                                </li>
                                            )
                                        : ""
                                    }
                                </ul>
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

export default SalesMyVehicle