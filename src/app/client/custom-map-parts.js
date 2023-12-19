import React, { useState, useEffect, Component } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

import { partsMarkerList } from "../../redux/actions/client/searchAction";
import { clientDetails } from "../../redux/actions/client/authAction";

import MapIcon from "../../assets/client/images/map-icon.png"

const MapContainer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getListData = useSelector(state => state.searching)
    const { partsMarkerData } = getListData
    const getProfileData = useSelector(state => state.client)
    const {clientData} = getProfileData

    useEffect(() => {
        dispatch(partsMarkerList())
        dispatch(clientDetails())
    }, [])

    const [ locationData, setLocationData ] = useState([]);

    useEffect(() => {
      var markerArray = [];
      
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
    
    let clientLat = clientData.location?clientData.location.coordinates[1]:54.6979975;
    let clientLong = clientData.location?clientData.location.coordinates[0]:-113.7168657;

    const defaultCenter = {
        lat: clientLat,
        lng: clientLong,
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