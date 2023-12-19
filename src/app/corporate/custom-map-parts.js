import React, { useState, useEffect, Component } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

import { partsMarkerList } from "../../redux/actions/corporate/searchAction";
import { corporateDetails } from "../../redux/actions/corporate/authAction";

import MapIcon from "../../assets/client/images/map-icon.png"

const MapContainer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getListData = useSelector(state => state.searching)
    const { partsMarkerData } = getListData
    const getProfileData = useSelector(state => state.corporate)
    const {corporateData} = getProfileData

    useEffect(() => {
        dispatch(partsMarkerList())
        dispatch(corporateDetails())
    }, [])

    const [ locationData, setLocationData ] = useState([]);

    useEffect(() => {
      var markerArray = [];
      console.log(partsMarkerData)
      if(partsMarkerData && partsMarkerData.length>0) {
          partsMarkerData.filter((item) => {
            //if(item.hasOwnProperty('latitude')) {
              var loc = {lat:parseFloat(item.location.coordinates[1]), lng:parseFloat(item.location.coordinates[0])}
              markerArray.push({ business: item.business, name: item.address, id:item._id, location:loc })
            //}
          });
      }
      setLocationData(markerArray)
    }, [partsMarkerData])

    const mapStyles = {
        height: "50vh",
        width: "100%"
    };
    
    const defaultCenter = {
      lat: corporateData?corporateData.latitude?parseFloat(corporateData.latitude):54.6979975:54.6979975,
      lng: corporateData?corporateData.longitude?parseFloat(corporateData.longitude):-113.7168657:-113.7168657,
  }

    const [ selected, setSelected ] = useState({});
    const onSelect = item => {
      setSelected(item);
    }

    const locations = locationData
    const handleDetail = (id) => {
        window.localStorage.setItem("garageDetailID", id)
    }

    return (
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={11}
            options={{ styles: [{ elementType: "labels", featureType: "poi", stylers: [{ visibility: "off", }], }], }}
            center={defaultCenter}>
           {
              locations.map(item => {
                return (
                  <Marker 
                    key={item.name} 
                    position={item.location} 
                    icon={MapIcon}
                    onClick={() => onSelect(item)} 
                  />
                )
              })
           }
           {
              selected.location && 
              (
                <InfoWindow
                  position={selected.location}
                  clickable={true}
                  onCloseClick={() => setSelected({})}
                >
                <p><Link to="/client/service-parts/detail" className="views markerlocation" target="_blank" onClick={() => handleDetail(selected.id)}>Business Name: {selected.business} <br/> Location: {selected.name}</Link></p>
                </InfoWindow>
              )
            }
       </GoogleMap>
    )
}

export default MapContainer