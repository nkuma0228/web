import { corporateAction } from "../../actionTypes";
import { url } from "../../../config/config";
import axios from "axios";
import {isCorporateLoggedIn} from "../../../utils";

//--------------------CLIENT-VEHICLE-------------------------

export const manufacturerListInitiate = () => ({
    type: corporateAction.MANUFACTURER_LIST_INITIATE
})
export const manufacturerListSuccess = (data) => ({
    type: corporateAction.MANUFACTURER_LIST_SUCCESS,
    payload:data
})
export const manufacturerListFailure = (data) => ({
    type: corporateAction.MANUFACTURER_LIST_FAILURE
})

export const modelListInitiate = () => ({
    type: corporateAction.MODEL_LIST_INITIATE
})
export const modelListSuccess = (data) => ({
    type: corporateAction.MODEL_LIST_SUCCESS,
    payload:data
})
export const modelListFailure = (data) => ({
    type: corporateAction.MODEL_LIST_FAILURE
})

export const vehicleListInitiate = () => ({
    type: corporateAction.VEHICLE_LIST_INITIATE
})
export const vehicleListSuccess = (data) => ({
    type: corporateAction.VEHICLE_LIST_SUCCESS,
    payload:data
})
export const vehicleListFailure = (data) => ({
    type: corporateAction.VEHICLE_LIST_FAILURE
})

export const vehicleCreateInitiate = () => ({
    type: corporateAction.VEHICLE_CREATE_INITIATE
})
export const vehicleCreateSuccess = () => ({
    type: corporateAction.VEHICLE_CREATE_SUCCESS
})
export const vehicleCreateFailure = (data) => ({
    type: corporateAction.VEHICLE_CREATE_FAILURE
})

export const vehicleViewInitiate = () => ({
    type: corporateAction.VEHICLE_VIEW_INITIATE
})
export const vehicleViewSuccess = (data) => ({
    type: corporateAction.VEHICLE_VIEW_SUCCESS,
    payload:data
})
export const vehicleViewFailure = (data) => ({
    type: corporateAction.VEHICLE_VIEW_FAILURE
})

export const vehicleUpdateInitiate = () => ({
    type: corporateAction.VEHICLE_UPDATE_INITIATE
})
export const vehicleUpdateSuccess = () => ({
    type: corporateAction.VEHICLE_UPDATE_SUCCESS
})
export const vehicleUpdateFailure = (data) => ({
    type: corporateAction.VEHICLE_UPDATE_FAILURE
})

export const vehicleDeleteInitiate = () => ({
    type: corporateAction.VEHICLE_DELETE_INITIATE
})
export const vehicleDeleteSuccess = () => ({
    type: corporateAction.VEHICLE_DELETE_SUCCESS,
})
export const vehicleDeleteFailure = (data) => ({
    type: corporateAction.VEHICLE_DELETE_FAILURE
})

export const vehicleHistoryGarageInitiate = () => ({
    type: corporateAction.VEHICLE_HISTORY_GARAGE_INITIATE
})
export const vehicleHistoryGarageSuccess = (data) => ({
    type: corporateAction.VEHICLE_HISTORY_GARAGE_SUCCESS,
    payload:data
})
export const vehicleHistoryGarageFailure = (data) => ({
    type: corporateAction.VEHICLE_HISTORY_GARAGE_FAILURE
})

export const vehicleHistoryDealerInitiate = () => ({
    type: corporateAction.VEHICLE_HISTORY_DEALER_INITIATE
})
export const vehicleHistoryDealerSuccess = (data) => ({
    type: corporateAction.VEHICLE_HISTORY_DEALER_SUCCESS,
    payload:data
})
export const vehicleHistoryDealerFailure = (data) => ({
    type: corporateAction.VEHICLE_HISTORY_DEALER_FAILURE
})

export function manufacturerList(payload,type) {
    let user=''
    return dispatch => {
       dispatch(manufacturerListInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.get(`${url}corporate/manufacturer/list`)
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
            axios.post(`${url}corporate/model/list`, payload)
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
    const token = isCorporateLoggedIn('corporateLogin')
    return dispatch => {
       dispatch(vehicleListInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}corporate/vehicle`, payload, {
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
    const token = isCorporateLoggedIn('corporateLogin')
    console.log(payload)
    return dispatch => {
        dispatch(vehicleCreateInitiate(payload))
            return new Promise((resolve, reject) =>
                axios.post(`${url}corporate/vehicle/add`, payload, {
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
    const token = isCorporateLoggedIn('corporateLogin')
    return dispatch => {
       dispatch(vehicleViewInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.get(`${url}corporate/vehicle/detail/${payload.id}`, {
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
    const token = isCorporateLoggedIn('corporateLogin')
    return dispatch => {
        dispatch(vehicleUpdateInitiate(payload))
            return new Promise((resolve, reject) =>
                axios.post(`${url}corporate/vehicle/update/${payload.id}`, payload, {
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
    const token = isCorporateLoggedIn('corporateLogin')
    return dispatch => {
        dispatch(vehicleDeleteInitiate(payload))
            return new Promise((resolve, reject) =>
                axios.delete(`${url}corporate/vehicle/delete/${payload.id}`, {
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

export function vehicleGarageHistory(payload, type) {
    const token = isCorporateLoggedIn('corporateLogin')
    return dispatch => {
       dispatch(vehicleHistoryGarageInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}corporate/vehicle/garage_history`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                console.log(data)
                if (data.code == 200) {
                    dispatch(vehicleHistoryGarageSuccess(data))
                }
                else {
                    dispatch(vehicleHistoryGarageFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(vehicleHistoryGarageFailure(err))
                reject(err);
            })
        );
    }
} 

export function vehicleDealerHistory(payload, type) {
    const token = isCorporateLoggedIn('corporateLogin')
    return dispatch => {
       dispatch(vehicleHistoryDealerInitiate(payload))
        return new Promise((resolve, reject) =>
            axios.post(`${url}corporate/vehicle/dealer_history`, payload, {
                headers: { Authorization: `${token}` }
            })
            .then(response => {
                const data = response.data
                console.log(data)
                if (data.code == 200) {
                    dispatch(vehicleHistoryDealerSuccess(data))
                }
                else {
                    dispatch(vehicleHistoryDealerFailure(data))
                }
                resolve(data);
            })
            .catch(err => {
                dispatch(vehicleHistoryDealerFailure(err))
                reject(err);
            })
        );
    }
}