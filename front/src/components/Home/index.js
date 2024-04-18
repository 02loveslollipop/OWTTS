import React, { useState, useEffect } from 'react';
import './Home.css';
import Header from './Header';
import Vehicle from './Vehicle';

async function getVehicleNameFromHost() {
    const url = "http://localhost:8111/indicators";
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



const Home = ({ ipAddress }) => {

    const [vehicleName, setVehicleName] = React.useState('yak-7b');
    
    useEffect(() => {
        let interval = setInterval(async () => {
            try {
                const data = await getVehicleNameFromHost();
                setVehicleName(data);
                console.log("vehicle name set to: ", data);
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
                <div className="grid-container">
                    <div className="grid-item-big">
                        <div className='component-container-big'>hola</div>
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
            </div>
        
            <div className="wallpaper"></div>
        </div>
        
    );
};

export default Home;
