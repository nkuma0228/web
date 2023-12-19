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

import { salesAgentList, salesAgentCreate, salesAgentRemove, salesAgentUpdate } from "../../redux/actions/provider/salesAction";

const initialState = {
    name:'',
    nameEmpty:''
}
const initialUpdateState = {
    nameUpdate:'',
    nameUpdateEmpty:''
}

const SalesAgent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getListData = useSelector(state => state.salesRequestData)
    const { salesAgentListing } = getListData
    useEffect(() => {
        dispatch(salesAgentList())
    },[])
    console.log(salesAgentListing)

    const [modalAgentShow, setModalAgentShow] = useState(false);
    const handleModalAgentClose = () => {
        setModalAgentShow(false);
    }
    const handleModalAgentShow = () => {
        setModalAgentShow(true);
    }

    const [agentDelete, setAgentDelete] = useState("");
    const [modalDeleteAgentShow, setModalDeleteAgentShow] = useState(false);
    const handleModalDeleteAgentClose = () => {
        setAgentDelete("")
        setModalDeleteAgentShow(false);
    }
    const handleModalDeleteAgentShow = (item) => {
        setAgentDelete(item._id)
        setModalDeleteAgentShow(true);
    }

    const [agentEdit, setAgentEdit] = useState({});
    const [modalEditAgentShow, setModalEditAgentShow] = useState(false);
    const handleModalEditAgentClose = () => {
        setAgentEdit("")
        setModalEditAgentShow(false);
    }
    const handleModalEditAgentShow = (item) => {
        setAgentEdit(item)
        setDataUpdateState({
            ...dataUpdateState, nameUpdate: item.name
        })
        setModalEditAgentShow(true);
    }

    let handleAgentSubmit = (event) => {
        event.preventDefault();
        let formIsValid = handleValidation();
        if (formIsValid) {
            const data = { name }
            dispatch(salesAgentCreate(data)).then(res => {
                if (res.code == 201) {
                    handleModalAgentClose();
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
    const handleAgentUpdateSubmit = (e) => {
        e.preventDefault();
        var isValid = handleUpdateValidation();
        if(isValid) {
            
            var data = { id:agentEdit._id, name:nameUpdate }
            dispatch(salesAgentUpdate(data))
            handleModalEditAgentClose()
            dispatch(salesAgentList())
        }
    }

    const handleDeleteModalShow = () => {
        var data = { "id":agentDelete }
        
        dispatch(salesAgentRemove(data))
        handleModalDeleteAgentClose()
        dispatch(salesAgentList())
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
                        <h4>My Sales Agent</h4>
                        <a class="TitleLink" href="javascript:void(0);" onClick={handleModalAgentShow}>Add Sales Agent</a>
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
                                    salesAgentListing && salesAgentListing.length>0 ? salesAgentListing.map((item , i) =>
                                
                                            <tr key={i}>
                                                <td> {i+1} </td>
                                                <td> {item.name }</td>
                                                <td> { moment(item.createdAt).format('DD-MM-YYYY') } </td>
                                                <td>
                                                    <div className="Actions">
                                                        <a href="javascript:void(0)" className="Accept" onClick={()=>handleModalEditAgentShow(item)}>Edit</a>
                                                        <a href="javascript:void(0)" className="Decline" onClick={()=>handleModalDeleteAgentShow(item)}>Delete</a>
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

            <Modal show={modalAgentShow} className="PanelModal">
                <div class="modal-body">
                    <div class="Category">
                        <a href="javascript:void(0);" class="Close" onClick={handleModalAgentClose}>×</a>
                        <h3>Add Sales Agent</h3>
                        <FORM onSubmit={handleAgentSubmit}>
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

            <Modal show={modalEditAgentShow} className="PanelModal">
                <div class="modal-body">
                    <div class="Category">
                        <a href="javascript:void(0);" class="Close" onClick={handleModalEditAgentClose}>×</a>
                        <h3>Update Sales Agent</h3>
                        <FORM onSubmit={handleAgentUpdateSubmit}>
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

            <Modal show={modalDeleteAgentShow} className="PanelModal">
                <div class="modal-body">
                    <div class="Category">
                        <a href="javascript:void(0);" class="Close" onClick={handleModalDeleteAgentClose}>×</a>
                        <h3>Delete Sales Agent</h3>
                        <p> Are you sure, want to Delete this sales agent? </p>
                        
                        <div className="Actions" style={{"textAlign": "center", "marginTop": "10px" }}>
                            <button type="button" className="Accept" onClick={handleDeleteModalShow}> Yes </button> <button type="button" className="Decline" onClick={handleModalDeleteAgentClose}> No </button>
                        </div>
                    </div>
                </div>
            </Modal>

            <Footer />
        </>
    );
}

export default SalesAgent