import { url } from "../src/config/config";
import axios from "axios";

export function isLoggedIn(userType) {

    let session = getObject(userType) || {};
    session = Object.keys(session).length && JSON.parse(session)
    let accessToken = session && session && session['token'] || false;
    return accessToken;
}

export function isProviderLoggedIn(userType) {

    let session = getObject(userType) || {};
    session = Object.keys(session).length && JSON.parse(session)
    let accessToken = session && session && session['token'] || false;
    return accessToken;
}

export function isCorporateLoggedIn(userType) {

    let session = getObject(userType) || {};
    session = Object.keys(session).length && JSON.parse(session)
    let accessToken = session && session && session['token'] || false;
    return accessToken;
}

export function isCommonLoggedIn() {
    let userType = "clientLogin"
    let session = getObject(userType) || {};
    session = Object.keys(session).length && JSON.parse(session)
    if(session) {
        
        let profileData = {"signpFor": "client", "url":"/client/dashboard", "firstName": session['firstName'], "lastName": session['lastName'] }
        return profileData

    } else {

        let userType = "corporateLogin"
        let session = getObject(userType) || {};
        session = Object.keys(session).length && JSON.parse(session)
        if(session) {
            
            let profileData = {"signpFor": "corporate", "url":"/corporate/dashboard", "firstName": session['firstName'], "lastName": session['lastName'], "business": session['business'] }
            return profileData
        } else {
            
            let userType = "providerLogin"
            let urlfor = "";
            let session = getObject(userType) || {};
            session = Object.keys(session).length && JSON.parse(session)
            if(session) {
                if(session['signupFor'] == "dealer") {
                    urlfor = "/dealer/dashboard"
                } else if(session['signupFor'] == "sales") {
                    urlfor = "/sales/dashboard"
                } else if(session['signupFor'] == "garage") {
                    urlfor = "/garage/dashboard"
                }
                let profileData = {"signupFor": session['signupFor'], "url":urlfor, "firstName": session['firstName'], "lastName": session['lastName'], "business": session['business'] }
                return profileData
            } else {
                let profileData=false;
                return profileData
            }
        }
        
    }
}
  
export function getObject(key) {
    if (window && window.localStorage) {
        return window.localStorage.getItem(key);
    }
}

export function multiPartData(data, type='') {
    let multiPart = new FormData();
    for (let key in data) {
        
        if(key === 'imageGallery') {
            //console.log(data[key])
            if(data[key] != undefined) {
                data[key].forEach(file=>{
                    multiPart.append(key, file);
                });
            }
       
        } else if(key !== 'imageGallery') {
            
            if(key === 'partType' || key === 'vehicleType' || key === 'offeredService' || key === 'serviceAvailable' || key === 'repairType' || key === 'nearService' || key === 'specialityService' || key === 'garageVehicleType' || key === 'salesVehicleType' || key === 'businessType' || key === 'serviceType') {
                multiPart.append(key, JSON.stringify(data[key]))
            } else {
                multiPart.append(key, data[key])
            }
        }
    }
  
    return multiPart
  }