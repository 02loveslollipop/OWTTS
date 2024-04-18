import React, { useEffect, useRef } from 'react'; 
import './Home.css';

import image from '../../assets/null.img';

async function getVehicleInfo(vehicle) {
    const url = `http://wtvehiclesapi.sgambe.serv00.net/api/vehicles/${vehicle}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

const Vehicle = ({vehicle}) => {
    const [vehicleName, setVehcileName] = React.useState(vehicle);
    const [vehicleNameStylized, setVehicleNameStylized] = React.useState('');
    const [vehicleNation, setVehicleNation] = React.useState('');
    const [vehicleType, setVehicleType] = React.useState('');
    const [vehicleImageUrl, setVehicleImageUrl] = React.useState("");
    const [vehicleArcadeBR, setVehicleArcadeBR] = React.useState(0.0);
    const [vehicleRealisticBR, setVehicleRealisticBR] = React.useState(0.0);
    const [vehicleSimulatorBR, setVehicleSimulatorBR] = React.useState(0.0);
    const vehicleRef = useRef(vehicle);
    
    useEffect(() => {
      vehicleRef.current = vehicle; 
  }, [vehicle]);

    useEffect(() => {
        const fetchParkings = setInterval(async () => {
          try {
            console.log("current vehicle: ", vehicleRef.current, " / past vehicle: ", vehicleName);
            if (vehicleRef.current === "null") {
              setVehcileName("None");
              setVehicleNameStylized("None");
              setVehicleNation("None");
              setVehicleType("None");
              setVehicleImageUrl(image);
              setVehicleArcadeBR("None");
              setVehicleRealisticBR("None");
              setVehicleSimulatorBR("None");
              return;
            }
            let past_vehicle = vehicleName;
            setVehcileName(vehicleRef.current);
            let current_vehicle = vehicleRef.current;
            
            if (past_vehicle === current_vehicle){
              console.log("vehice is the same, not fetching");
              return;
            }
            const data = await getVehicleInfo(current_vehicle);
            //set vehicleName, vehicleNation, vehicleType, vehicleEra, vehicleImageUrl, vehicleArcadeBR, vehicleRealisticBR, vehicleRealisticBR
            let Stylized = data.identifier[0].toUpperCase() + data.identifier.replace(/_/g, ' ').replace(/-/g, ' ').toLowerCase().slice(1);
            setVehcileName(data.identifier);
            setVehicleNameStylized(Stylized);
            setVehicleNation(data.country);
            setVehicleType(data.vehicle_type);
            setVehicleImageUrl(`http://${data.images.image}`);
            setVehicleArcadeBR(Number(data.arcade_br).toFixed(1));
            setVehicleRealisticBR(Number(data.realistic_br).toFixed(1));
            setVehicleSimulatorBR(Number(data.simulator_br).toFixed(1));
            return;
          } catch (error) {
            console.error('Error fetching vehicle:', error);
            return;
          }
        },1000);
        return () => clearInterval(fetchParkings);
      }, []);

    return (
        <>
            <div className='vehicle-info-container'>
              <div className='vehicle-info-title'>
                <h1>Current vehicle</h1>
              </div>
              <table className='vehicle-info-table'>
                <tr>
                  <td>
                    <div className='vehicle-image'>
                      <img src= {vehicleImageUrl} alt="" className='vehicle-image' />
                    </div>
                  </td>
                  <td>
                    <div className='vehicle-info'>
                      <p><b>Name:</b> {vehicleNameStylized}</p>
                      <p><b>Nation:</b> {vehicleNation}</p>
                      <p><b>Type:</b> {vehicleType}</p>
                      <p><b>BR:</b> Arcade: {vehicleArcadeBR} Realistic: {vehicleRealisticBR} Simulator: {vehicleSimulatorBR}</p>
                    </div>
                  </td>
                </tr>
              </table>
              
              
            </div>

            

        </>
    );

};

export default Vehicle;
