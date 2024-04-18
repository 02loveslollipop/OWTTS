import React, { useEffect, useRef } from 'react'; 
import './Map.css';

const Map = () => {
    let url = localStorage.getItem('url');
    if (url === null) {
        url = 'http://localhost:8111';
    }
    url = `${url}/map.img`;
    const [map, setMap] = React.useState(url);

    return (
        <div className='map-container'>
            <div className='map-title'>
                <h1>Current map</h1>
            </div>
            <img src={map} alt="map" className='map-image'/>
        </div>
    );

};

export default Map;
