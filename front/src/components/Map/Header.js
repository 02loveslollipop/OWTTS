import React from 'react';
import './Map.css';

const Header = () => {
  return (
      <div id="menu">
        <nav class="navbar">
          <h1 class="navbar__title">OWTTS</h1>
            <div class="navbar__links-container">
              <ul class = "navbar__links">
                 
                <li><button id='navbar__button' onClick={() => {}}>Telemetry</button></li>
                <li><button id='navbar__button' onClick={() => {}}>RAW</button></li>
                <li><button id='navbar__button' onClick={() => {}}>Map</button></li>
                <li><button id='navbar__button' onClick={() => {}}>Map + Telemetry</button></li>
                <li><button id='navbar__button' onClick={() => {}}>Settings</button></li>
                <li><button id='navbar__button' onClick={() => {}}></button></li>
                
              </ul>
            </div>
          <div class="login_container">

          </div>
        </nav>
      </div>

  );
};

export default Header;
