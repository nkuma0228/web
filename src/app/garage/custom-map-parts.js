import React, { useState, useEffect, Component } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

import { partsMarkerList } from "../../redux/actions/provider/searchAction";
import { providerDetails } from "../../redux/actions/provider/authAction";

import MapIcon from "../../assets/client/images/map-icon.png"

const MapContainer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getListData = useSelector(state => state.garageSearching)
    const { partsMarkerData } = getListData
    const getProfileData = useSelector(state => state.provider)
    const {providerData} = getProfileData

    useEffect(() => {
        dispatch(partsMarkerList())
        dispatch(providerDetails())
    }, [])

    const [ locationData, setLocationData ] = useState([]);

    useEffect(() => {
      var markerArray = [];
      //console.log(partsMarkerData)
      if(partsMarkerData && partsMarkerData.length>0) {
          partsMarkerData.filter((item) => {
              if(item.hasOwnProperty('latitude')) {
                var loc = {lat:parseFloat(item.latitude), lng:parseFloat(item.longitude)}
                markerArray.push({ name: item.location, id:item._id, location:loc })
              }
          });
      }
      setLocationData(markerArray)
    }, [partsMarkerData])

    const mapStyles = {
        height: "50vh",
        width: "100%"
    };
    
    const defaultCenter = {
        lat: providerData?providerData.latitude?parseFloat(providerData.latitude):54.6979975:54.6979975,
        lng: providerData?providerData.longitude?parseFloat(providerData.longitude):-113.7168657:-113.7168657,
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
                <p><Link to="/client/service-garage/detail" className="views markerlocation" target="_blank" onClick={() => handleDetail(selected.id)}>{selected.name}</Link></p>
                </InfoWindow>
              )
            }
       </GoogleMap>
    )
}

export default MapContainer