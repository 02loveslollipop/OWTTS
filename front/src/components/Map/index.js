import React, { useState, useEffect } from 'react';
import './Map.css';
import Header from './Header';

async function getMapImage(ipAddress) {
    
}

const Map = ({ ipAddress }) => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
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
                    <div className='component-container-small'>hola2</div>
                </div>
                <div className="grid-item-small-2">
                    <div className='component-container-small'>hola3</div>
                </div>
            </div>
        </div>
    
        <div className="wallpaper"></div>
    </div>
    
  );
};

export default Map;
