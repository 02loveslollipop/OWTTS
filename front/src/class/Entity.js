class Entity {
  constructor(type,color,blink,icon,icon_bg,sx,sy,ex,ey) {
    this.type = type;
    this.color = color;
    this.blink = blink;
    this.icon = icon;
    this.icon_bg = icon_bg;
    this.sx = sx;
    this.sy = sy;
    this.ex = ex;
    this.ey = ey;
  }

  static fromJson(decoded) {
    let entities = [];
    for (let i = 0; i < decoded.length; i++) {
      let entity = new Entity(decoded[i].type, decoded[i].color, decoded[i].blink, decoded[i].icon, decoded[i].icon_bg, decoded[i].sx, decoded[i].sy, decoded[i].ex, decoded[i].ey);
      entities.push(entity);
    }
    return entities;
  }
}

export default Entity;