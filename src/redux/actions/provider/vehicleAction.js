import { vehicleAction } from "../../actionTypes";
import { url } from "../../../config/config";
import axios from "axios";
import {isProviderLoggedIn , multiPartData} from "../../../utils";

//--------------------CLIENT-VEHICLE-------------------------

export const manufacturerListInitiate = () => ({
    type: vehicleAction.MANUFACTURER_LIST_INITIATE
})
export const manufacturerListSuccess = (data) => ({
    type: vehicleAction.MANUFACTURER_LIST_SUCCESS,
    payload:data
})
export const manufacturerListFailure = (data) => ({
    type: vehicleAction.MANUFACTURER_LIST_FAILURE
})

export const modelListInitiate = () => ({
    type: vehicleAction.MODEL_LIST_INITIATE
})
export const modelListSuccess = (data) => ({
    type: vehicleAction.MODEL_LIST_SUCCESS,
    payload:data
})
export const modelListFailure = (data) => ({
    type: vehicleAction.MODEL_LIST_FAILURE
})

export const vehicleListInitiate = () => ({
    type: vehicleAction.VEHICLE_LIST_INITIATE
})
export const vehicleListSuccess = (data) => ({
    type: vehicleAction.VEHICLE_LIST_SUCCESS,
    payload:data
})
export const vehicleListFailure = (data) => ({
    type: vehicleAction.VEHICLE_LIST_FAILURE
})

export const vehicleCreateInitiate = () => ({
    type: vehicleAction.VEHICLE_CREATE_INITIATE
})
export const vehicleCreateSuccess = () => ({
    type: vehicleAction.VEHICLE_CREATE_SUCCESS
})
export const vehicleCreateFailure = (data) => ({
    type: vehicleAction.VEHICLE_CREATE_FAILURE
})

export const vehicleViewInitiate = () => ({
    type: vehicleAction.VEHICLE_VIEW_INITIATE
})
export const vehicleViewSuccess = (data) => ({
    type: vehicleAction.VEHICLE_VIEW_SUCCESS,
    payload:data
})
export const vehicleViewFailure = (data) => ({
    type: vehicleAction.VEHICLE_VIEW_FAILURE
})

export const vehicleUpdateInitiate = () => ({
    type: vehicleAction.VEHICLE_UPDATE_INITIATE
})
export const vehicleUpdateSuccess = () => ({
    type: vehicleAction.VEHICLE_UPDATE_SUCCESS
})
export const vehicleUpdateFailure = (data) => ({
    type: vehicleAction.VEHICLE_UPDATE_FAILURE
})

export const vehicleDeleteInitiate = () => ({
    type: vehicleAction.VEHICLE_DELETE_INITIATE
})
export const vehicleDeleteSuccess = () => ({
    type: vehicleAction.VEHICLE_DELETE_SUCCESS,
})
export const vehicleDeleteFailure = (data) => ({
    type: vehicleAction.VEHICLE_DELETE_FAILURE
})

export function manufacturerList(payload,type) {
    let user=''
    return dispatch => {
       dispatch(manufacturerListInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.get(`${url}provider/sales/manufacturer/list`)
                .then(response => {
                  const data = response.data
                    if (data.code && data.code == 200) {
                        dispatch(manufacturerListSuccess(data))
                    }
                    else{
                      dispatch(manufacturerListFailure(data))
                    }
                    resolve(data);
                })
                .catch(err => {
                    dispatch(manufacturerListFailure(err))
                    reject(err);
                })
        );
    }
}

export function modelList(payload,type) {
    let user=''
    return dispatch => {
       dispatch(modelListInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/sales/model/list`, payload)
                .then(response => {
                  const data = response.data
                    if (data.code && data.code == 200) {
                        dispatch(modelListSuccess(data))
                    }
                    else{
                      dispatch(modelListFailure(data))
                    }
                    resolve(data);
                })
                .catch(err => {
                    dispatch(modelListFailure(err))
                    reject(err);
                })
        );
    }
}

export function vehicleList(payload, type) {
    const token = isProviderLoggedIn('providerLogin')
    return dispatch => {
       dispatch(vehicleListInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}provider/sales/vehicle`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code == 200) {
                    dispatch(vehicleListSuccess(data))
                }
                else {
                    dispatch(vehicleListFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(vehicleListFailure(err))
                reject(err);
            })
        );
    }
}

export function vehicleCreate(payload,type) {
    const token = isProviderLoggedIn('providerLogin')
    
    const formData = multiPartData(payload);

    return dispatch => {
        dispatch(vehicleCreateInitiate(payload))
            return new Promise((resolve, reject) =>
                axios.post(`${url}provider/sales/vehicle/add`, formData, {
                    headers: { Authorization: `${token}` }
                })
                .then(response => {
                    const data = response.data
                    if (data.status && data.status == 200) {
                        dispatch(vehicleCreateSuccess())
                    }
                    else{
                    dispatch(vehicleCreateFailure(data))
                    }
                    resolve(data);
                })
                .catch(err => {
                    dispatch(vehicleCreateFailure(err))
                    reject(err);
                })
            );
    }
}

export function vehicleView(payload,type) {
    const token = isProviderLoggedIn('providerLogin')
    return dispatch => {
       dispatch(vehicleViewInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.get(`${url}provider/sales/vehicle/detail/${payload.id}`, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                if (data.code && data.code == 200) {
                    dispatch(vehicleViewSuccess(data))
                }
                else {
                    dispatch(vehicleViewFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(vehicleViewFailure(err))
                reject(err);
            })
        );
    }
}

export function vehicleUpdate(payload,type) {
    const token = isProviderLoggedIn('providerLogin')
    return dispatch => {
        dispatch(vehicleUpdateInitiate(payload))
            return new Promise((resolve, reject) =>
                axios.post(`${url}provider/sales/vehicle/update/${payload.id}`, payload, {
                    headers: { Authorization: `${token}` }
                })
                .then(response => {
                    const data = response.data
                    if (data.status && data.status == 200) {
                        dispatch(vehicleUpdateSuccess())
                    }
                    else{
                        dispatch(vehicleUpdateFailure(data))
                    }
                    resolve(data);
                })
                .catch(err => {
                    dispatch(vehicleUpdateFailure(err))
                    reject(err);
                })
            );
    }
}

export function vehicleDelete(payload,type) {
    const token = isProviderLoggedIn('providerLogin')
    return dispatch => {
        dispatch(vehicleDeleteInitiate(payload))
            return new Promise((resolve, reject) =>
                axios.delete(`${url}provider/sales/vehicle/delete/${payload.id}`, {
                    headers: { Authorization: `${token}` }
                })
                .then(response => {
                    const data = response.data
                    if (data.code && data.code == 200) {
                        dispatch(vehicleDeleteSuccess(data))
                    }
                    else {
                        dispatch(vehicleDeleteFailure(data))
                    }
                    resolve(data);
                })
                .catch(err => {
                    dispatch(vehicleDeleteFailure(err))
                    reject(err);
                })
            );
    }
}