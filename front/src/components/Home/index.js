import React, { useState, useEffect } from 'react';
import './Home.css';
import Header from './Header';
import Vehicle from '../Vehicle/Vehicle';
import Map from '../Map/Map';

async function getVehicleNameFromHost() {
    let url = localStorage.getItem('url');
    if (url === null) {
        url = 'http://localhost:8111';
    }
    url = `${url}/indicators`;
    console.log("url: ", url);
    try{
        const response = await fetch(url);
        const data = await response.json();
        if (data.valid === false) {
            return "null";
        }else{
            return data.type;
        }
    }
    catch(error){
        return "null";
    }
    
    
}

const Home = ({ game }) => {

    const [vehicleName, setVehicleName] = React.useState('yak-7b');
    const [isIpSet, setIsIpSet] = React.useState(false);
    const [ip, setIp] = React.useState("localhost");
    const [port, setPort] = React.useState("8111");	
    const [isConfiguring, setIsConfiguring] = React.useState(false);
    const [isTelemetry, setIsTelemetry] = React.useState(false);
    const [isMap, setIsMap] = React.useState(false);
    const [isMapTelemetry, setIsMapTelemetry] = React.useState(false);
    
    const handleIpSubmit = async e => {
        e.preventDefault();
        console.log("ip: ", ip, " / port: ", port);
        try{
            localStorage.setItem('url', `http://${ip}:${port}`);
            localStorage.setItem('isIpAvailable', true);
            
            setIsIpSet(true);
        }
        catch(error){
            console.error("error setting ip in localStorage: ", error);
        }        
    }
    
    useEffect( () => {
        setIsIpSet(JSON.parse(localStorage.getItem('isIpAvailable')));
    }, []);


    useEffect(() => {
        let interval = setInterval(async () => {
            try {
                const data = await getVehicleNameFromHost();
                setVehicleName(data);
                return;
            } catch (error) {
                console.error('Error fetching vehicle:', error);
                return;
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    

    return (
        <div id="table-main-screen">
            <div className='header-container'>
                <Header/>
            </div>

            <div style={{ marginTop: '6vh' }}></div>

            <div className="content">
                {isIpSet ? (
                    <div className="grid-container">
                    <div className="grid-item-big">
                        <div className='component-container-big'>
                            <Map />
                        </div>
                    </div>
                    <div className="grid-item-small-1">
                        <div className='component-container-small-1'>
                            <Vehicle vehicle={vehicleName}/>
                        </div>
                    </div>
                    <div className="grid-item-small-2">
                        <div className='component-container-small-2'>hola3</div>
                    </div>
                </div>
                ) : (
                    //request ip address
                    <div className='ip-form-container'>
                        <h1>OWTTS</h1>
                        <p>Enter the IP address and port of the War Thunder API to use the application</p>

                        <div style={{ marginTop: '2.5vh' }}></div>

                        <div className='ip-form-box'>
                            <form onSubmit={handleIpSubmit}>
                                <label>IP Address</label>
                                <input 
                                    type="text" 
                                    name="ip_address"
                                    value={ip}
                                    onChange={e => setIp(e.target.value)}
                                />
                                <label>Port</label>	
                                <input 
                                    type="text" 
                                    name="port"
                                    value={port}
                                    onChange={e => setPort(e.target.value)}
                                />
                                
                                <input type="submit" value="Set" />
                            </form>
                        </div>
                    </div>
                )}
            </div>
        
            <div className="wallpaper"></div>
        </div>
        
    );
};

export default Home;
