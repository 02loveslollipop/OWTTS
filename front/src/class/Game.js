import Entity from "./Entity";
import Map from "./Map";

class Game{
    constructor(){
        this.inGame = false;
        this.url = null;
        this.map = null;
        this.mapInfo = null;
        this.type = null;
        this.speed = null;
        this.altitude = null;
        this.roll = null;
        this.pitch = null;
        this.bank = null;
        this.turn = null;
        this.compass = null;
        this.fuel = null;
        this.gear = null;
        this.flaps = null;
        this.throttle = null;
        this.mach = null;
        this.g = null;
        this.aoa = null;
        this.entities = [];
    }

    async setUrl(){
        this.url = await localStorage.getItem('url');
        if (this.url === null) {
            this.url = null;
        }
    }

    async setUrl(url){
        this.url = url;
    }

    async getIndicators(){ //Always executed to update inGame status
        let indicatorsUrl = `${this.url}/indicators`;
        const response = await fetch(indicatorsUrl);
        const data = await response.json();
        if (data.valid === false) {
            this.type = "null";
            this.speed = "null";
            this.altitude = "null";
            this.roll = "null";
            this.pitch = "null";
            this.bank = "null";
            this.turn = "null";
            this.compass = "null";
            this.fuel = "null";
            this.gear = "null";
            this.flaps = "null";
            this.throttle = "null";
            this.mach = "null";
            this.g = "null";
            this.aoa = "null";
            this.inGame = false;
            return;
        }
        this.type = data.type;
        this.speed = data.speed;
        this.altitude = data.radio_altitude;
        this.roll = data.aviahorizon_roll;
        this.pitch = data.aviahorizon_pitch;
        this.bank = data.bank;
        this.turn = data.turn;
        this.compass = data.compass;
        this.fuel = data.fuel;
        this.gear = data.gear;
        this.flaps = data.flaps;
        this.throttle = data.throttle*100;
        this.mach = data.mach;
        this.g = data.g_meter;
        this.aoa = data.aoa;
        this.inGame = true;
        return;
    }

    async getEntities(){ //Executed only if inGame is true
        if (!this.inGame){
            return;
        }
        let entitiesUrl = `${this.url}/map_obj.json`;
        const response = await fetch(entitiesUrl);
        const data = await response.json();
        let decoded = JSON.parse(data);
        this.entities = Entity.fromJson(decoded);
        return;
    }

    async getMapInfo(){ //Executed only if inGame is true
        if (!this.inGame){
            return;
        }
        let mapInfoUrl = `${this.url}/map_info.json`;
        const response = await fetch(mapInfoUrl);
        const data = await response.json();
        let decoded = JSON.parse(data);
        if (decoded.valid === false) {
            this.map = "../assets/null.img";
            this.mapInfo = null;
            return;
        }
        this.map = `${this.url}/map.img`;
        this.mapInfo = Map.fromJson(decoded);
        return;
    }
}

export default Game;