import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import _ from 'lodash'
import FORM from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment';

import Header from "./header";
import Footer from "./footer";

import { mechanicList, mechanicCreate, mechanicRemove, mechanicUpdate } from "../../redux/actions/provider/garageAction";

const initialState = {
    name:'',
    nameEmpty:''
}
const initialUpdateState = {
    nameUpdate:'',
    nameUpdateEmpty:''
}

const Mechanic = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getListData = useSelector(state => state.garageRequestData)
    const { mechanicListing } = getListData
    useEffect(() => {
        dispatch(mechanicList())
    },[])

    const [modalMechanicShow, setModalMechanicShow] = useState(false);
    const handleModalMechanicClose = () => {
        setModalMechanicShow(false);
    }
    const handleModalMechanicShow = () => {
        setModalMechanicShow(true);
    }

    const [mechanicDelete, setMechanicDelete] = useState("");
    const [modalDeleteMechanicShow, setModalDeleteMechanicShow] = useState(false);
    const handleModalDeleteMechanicClose = () => {
        setMechanicDelete("")
        setModalDeleteMechanicShow(false);
    }
    const handleModalDeleteMechanicShow = (item) => {
        setMechanicDelete(item._id)
        setModalDeleteMechanicShow(true);
    }

    const [mechanicEdit, setMechanicEdit] = useState({});
    const [modalEditMechanicShow, setModalEditMechanicShow] = useState(false);
    const handleModalEditMechanicClose = () => {
        setMechanicEdit("")
        setModalEditMechanicShow(false);
    }
    const handleModalEditMechanicShow = (item) => {
        setMechanicEdit(item)
        setDataUpdateState({
            ...dataUpdateState, nameUpdate: item.name
        })
        setModalEditMechanicShow(true);
    }

    let handleMechanicSubmit = (event) => {
        event.preventDefault();
        let formIsValid = handleValidation();
        if (formIsValid) {
            const data = { name }
            dispatch(mechanicCreate(data)).then(res => {
                if (res.code == 201) {
                    handleModalMechanicClose();
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
                    let errors = res.errors.errors
                    errors.map((item) => {
                        var newParam = item.param
                        let messageErr = item.msg +' of '+ newParam
                        toast.error(messageErr, {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    })
                    setDataState({
                        ...dataState,
                        errorMsg: res.message,
                        nameEmpty: '',
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

    const [dataState, setDataState] = useState(initialState);
    const {
        name,
        nameEmpty
    } = dataState
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setDataState({
            ...dataState, [name]: value
        })
    }
    const handleValidation = () => {
        let nameEmpty = ''
        let formIsValid = true;
        if (!name.trim()) {
            nameEmpty = "Please enter name";
            formIsValid = false;
        }
        setDataState({
            ...dataState, 
            nameEmpty
        })
        return formIsValid;
    }

    const [dataUpdateState, setDataUpdateState] = useState(initialUpdateState);
    const {
        nameUpdate,
        nameUpdateEmpty
    } = dataUpdateState
    const handleUpdateInputChange = (e) => {
        const { name, value } = e.target
        setDataUpdateState({
            ...dataUpdateState, [name]: value
        })
    }
    const handleUpdateValidation = () => {
        let nameUpdateEmpty = ''
        let formIsValid = true;
        if (!nameUpdate.trim()) {
            nameUpdateEmpty = "Please enter name";
            formIsValid = false;
        }
        setDataUpdateState({
            ...dataUpdateState, 
            nameUpdateEmpty
        })
        return formIsValid;
    }
    const handleMechanicUpdateSubmit = (e) => {
        e.preventDefault();
        var isValid = handleUpdateValidation();
        if(isValid) {
            
            var data = { id:mechanicEdit._id, name:nameUpdate }
            dispatch(mechanicUpdate(data))
            handleModalEditMechanicClose()
            dispatch(mechanicList())
        }
    }

    const handleDeleteModalShow = () => {
        var data = { "id":mechanicDelete }
        console.log("delete", data)
        dispatch(mechanicRemove(data))
        handleModalDeleteMechanicClose()
        dispatch(mechanicList())
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 100,
            behavior: 'auto'
        });
    },[]);
    
    return (
        <>
            <Header />

            <div class="WrapperArea">
                
                <div class="WrapperBox"> 

                    <div class="TitleBox">
                        <h4>My Mechanic</h4>
                        <a class="TitleLink" href="javascript:void(0);" onClick={handleModalMechanicShow}>Add Mechanic</a>
                    </div> 

                    <div class="Small-Wrapper"> 
                        
                        <div className="TableList">
                            
                            <table  style={{ width: "100%" }}>
                                <tr>
                                    <th>S.No</th>
                                    <th>Name</th>
                                    <th>Added On</th>
                                    <th>Action</th>
                                </tr>
                                {
                                    mechanicListing && mechanicListing.length>0 ? mechanicListing.map((item , i) =>
                                
                                            <tr key={i}>
                                                <td> {i+1} </td>
                                                <td> {item.name }</td>
                                                <td> { moment(item.createdAt).format('DD-MM-YYYY') } </td>
                                                <td>
                                                    <div className="Actions">
                                                        <a href="javascript:void(0)" className="Accept" onClick={()=>handleModalEditMechanicShow(item)}>Edit</a>
                                                        <a href="javascript:void(0)" className="Decline" onClick={()=>handleModalDeleteMechanicShow(item)}>Delete</a>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    :
                                        <tr> <td colspan="6"> No result found </td> </tr>
                                }
                                
                            </table>
                        </div> 
                        
                    </div>

                </div>
            </div>

            <Modal show={modalMechanicShow} className="PanelModal">
                <div class="modal-body">
                    <div class="Category">
                        <a href="javascript:void(0);" class="Close" onClick={handleModalMechanicClose}>×</a>
                        <h3>Add Mechanic</h3>
                        <FORM onSubmit={handleMechanicSubmit}>
                            <div class="form-group">
                                <label> Name </label>
                                <input type="text" class="form-control" placeholder="Enter name" name="name" value={name} onChange={handleInputChange} />
                                <span style={{ color: "red" }}>{nameEmpty}</span>
                            </div>
                            <button type="submit" class="Accept">Add</button>
                        </FORM>
                    </div>
                </div>
            </Modal>

            <Modal show={modalEditMechanicShow} className="PanelModal">
                <div class="modal-body">
                    <div class="Category">
                        <a href="javascript:void(0);" class="Close" onClick={handleModalEditMechanicClose}>×</a>
                        <h3>Update Mechanic</h3>
                        <FORM onSubmit={handleMechanicUpdateSubmit}>
                            <div class="form-group">
                                <label> Name </label>
                                <input type="text" class="form-control" placeholder="Enter name" name="nameUpdate" value={nameUpdate} onChange={handleUpdateInputChange} />
                                <span style={{ color: "red" }}>{nameEmpty}</span>
                            </div>
                            <button type="submit" class="Accept">Update</button>
                        </FORM>
                    </div>
                </div>
            </Modal>

            <Modal show={modalDeleteMechanicShow} className="PanelModal">
                <div class="modal-body">
                    <div class="Category">
                        <a href="javascript:void(0);" class="Close" onClick={handleModalDeleteMechanicClose}>×</a>
                        <h3>Delete Mechanic</h3>
                        <p> Are you sure, want to Delete this mechanic? </p>
                        
                        <div className="Actions" style={{"textAlign": "center", "marginTop": "10px" }}>
                            <button type="button" className="Accept" onClick={handleDeleteModalShow}> Yes </button> <button type="button" className="Decline" onClick={handleModalDeleteMechanicClose}> No </button>
                        </div>
                    </div>
                </div>
            </Modal>

            <Footer />
        </>
    );
}

export default Mechanic