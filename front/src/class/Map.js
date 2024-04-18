class Map{
    constructor(gridSizeX,gridSizeY,gridStepsX,gridStepsY,hudType,mapGeneration,mapMinX,mapMinY,mapMaxX,mapMaxY){
        this.gridSizeX = gridSizeX;
        this.gridSizeY = gridSizeY;
        this.gridStepsX = gridStepsX;
        this.gridStepsY = gridStepsY;
        this.hudType = hudType;
        this.mapGeneration = mapGeneration;
        this.mapMinX = mapMinX;
        this.mapMinY = mapMinY;
        this.mapMaxX = mapMaxX; 
        this.mapMaxY = mapMaxY;
    }

    static fromJson(decoded){
        let map = new Map(decoded.grid_size[0],decoded.grid_size[1],decoded.grid_steps[0],decoded.grid_steps[1],decoded.hud_type,decoded.map_generation,decoded.map_min[0],decoded.map_min[1],decoded.map_max[0],decoded.map_max[1]);
        return map;
    }
}

export default Map;