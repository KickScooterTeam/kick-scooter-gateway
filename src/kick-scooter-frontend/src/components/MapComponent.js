import React, {useEffect, useState} from "react";
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import axios from "axios";
import L from 'leaflet';
import point from "../icons/point.svg";
import tokenDecoder from "../utils/tokenDecoder";


export default function MapComponent() {

    const size = {width: "100vw", height: "100vh"}
    const [scooters, setScooters] = useState([])
    const [ownScooter, setOwnScooter] = useState({})
    const [chosenScooter, setChosen] = useState({})
    const [pointNewScooter, setNewScooterPoint] = useState({
        stLat: '',
        stLon: '',
        battery: 0
    })
    const [scenarioDestination, setDestination] = useState({
        destLat: '',
        destLon: '',
        dischInd: 3,
        scooterId: ''
    })
    const [simulationMode, setSimMode] = useState();
    const [createScooterMode, setCreateScooterMode] = useState(false);

    const token = tokenDecoder();

    useEffect(() => {

        const interval = setInterval(() => {
            axios.get('/vehicle-service/scooters/status/free')
                .then(response => {
                    setScooters(response.data)
                })
                .catch((error) =>
                    console.log(error)
                )
            axios.get(API_BASE_URL + 'trip-service/trips/show-position', token)
                .then(response => {
                    console.log(response.data)
                    if (response.status === 200) {
                        setOwnScooter(response.data)
                    }
                })
                .catch((error) =>
                    console.log(error)
                )

        }, 1000);

        return () => clearInterval(interval);

    });


    const handleChooseScooterClick = (id) => {
        setChosen(id);
    };


    const addTestScooter = (e) => {
        if (createScooterMode) {
            setNewScooterPoint()
        }
        //console.log(coordinates)

    }

    const coordinates = [48.464970, 35.046537]

    const customIcon=L.icon({
        iconUrl: point,
        iconSize:     [44, 51], // size of the icon
        iconAnchor:   [22, 52], // point of the icon which will correspond to marker's location
        popupAnchor:  [-3, -76],
    });

    return (
        <>
            <Map
                center={coordinates}
                onClick={addTestScooter}
                zoom={13}
                style={size}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />
                <Marker position={ownScooter.coordinates}>
                <Popup>
                    <span>
                    Battery: {ownScooter.battery}<br/>
                    Id: {ownScooter.id}<br/>
                    Own!
                    </span> 
                </Popup>
                </Marker>

                {scooters.map((p) => (
                    <Marker position={p.coordinates} icon={customIcon}>
                        <Popup>
                    <span>
                    Battery: {p.battery}<br/>
                    Id: {p.id}
                    </span>
                        </Popup>
                    </Marker>
                ))}

            </Map>
        </>
    );
}

