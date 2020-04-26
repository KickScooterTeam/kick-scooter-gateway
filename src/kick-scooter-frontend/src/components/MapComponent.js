import React, {useEffect, useState} from "react";
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import axios from "axios";
import L from 'leaflet';
import point from "../icons/point.svg";

export default function MapComponent() {

    const size = {width: "100vw", height: "100vh"};
    const [scooters, setScooters] = useState([]);
    const [chosenScooter, setChosen] = useState({});
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


    useEffect(() => {

        const interval = setInterval(() => {
            axios.get('/vehicle-service/scooters/status/free')
                .then(response => {
                    setScooters(response.data)
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
        console.log(coordinates)

    }

    const coordinates = [48.464970, 35.046537]

    // const customIcon=L.icon({
    //     iconUrl: point,
    //     iconSize:     [44, 51], // size of the icon
    //     iconAnchor:   [55, 55], // point of the icon which will correspond to marker's location
    //     popupAnchor:  [-3, -76],
    // });

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

                {scooters.map((p) => (
                    <Marker position={p.coordinates}>
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