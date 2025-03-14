import Drawer from "./Drawer";
import { CanvasRenderingContext2D } from "canvas";
import { Option } from "./@types";

class Canvas{
  public canvas: any
  public ctx: CanvasRenderingContext2D;
  public offset;
  public fixedX: number;
  public dragging: boolean;
  public dragPosition;
  public hoshii: boolean;
  public noalpha: boolean;
  public single: boolean;
  public debug: boolean;
  public drawer: Drawer;

  constructor(canvas: any,config: Option){
    this.canvas = canvas;
    
    this.ctx = canvas.getContext("2d");
    this.ctx.lineJoin = "round";
    this.ctx.lineCap = "round";
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
    
    this.offset = {
      top: { x: 0, y: 0 },
      bottom: { x: 250, y: 130 }
    };
  
    this.fixedX = 60;
  
    this.dragging = false;
    this.dragPosition = { x0: 0, y0: 0 };
  
    this.hoshii = config.hoshii;
    this.noalpha = config.noalpha;
    this.single = config.single;
    this.debug = config.debug;

    this.drawer = new Drawer(this.ctx,config);
  }

  public upperEndPosition(): number{
    return this.canvas.getBoundingClientRect().top + this.offset.bottom.y;
  }
  
  public lowerEndPosition(): number{
    return this.canvas.getBoundingClientRect().top + (this.canvas.height - 10);
  }

  public redrawTop(text: string, isRainbow: boolean): void{
    let posX = 70;
    let posY = 100;
    let order = this.noalpha ? "white" : "transparent";
    if(this.debug) order = "debug";

    if(this.single){
      posX = this.fixedX;
      posY = 100;
    }
  
    if(isRainbow){
      this.drawer.redrawTop_rainbow(text,posX,posY,order);
    }else{
      this.drawer.redrawTop(text,posX,posY,order);
    }
  
    if(this.hoshii){
      this.redrawImage();
    }else{
      this.redrawBottom(text,null,isRainbow); //fix commendouted
    }
  }
  
  public redrawBottom(txt: string,offsetX: number | null,isRainbow: boolean): void{
    const text = txt.replace(/！/,"!");
    let posX = (offsetX || this.offset.bottom.x) + 70;
    let posY = this.offset.bottom.y + 100;
    let order = this.noalpha ? "white" : "transparent";

    if(this.debug) order = "debug";
    if(this.single){
      posX = this.fixedX;
      posY = 100;
    }

    if(isRainbow){
      this.drawer.redrawBottom_rainbow(text,posX,posY,order);
    }else{
      this.drawer.redrawBottom(text,posX,posY,order);
    }
  }
  
  public redrawImage(offsetX?: number): void{
    const posX = (offsetX||this.offset.bottom.x) + 70;
    const posY = this.offset.bottom.y;
    let order = this.noalpha ? "white" : "transparent";

    if(this.debug) order = "debug";
    this.drawer.redrawImage(posX,posY,order);
  }
  
  public save(): void{
    this.drawer.save();
  }
  
  public createBuffer(type: "jpeg" | "png",callback: any,quality: number): void{
    this.drawer.createBuffer(type,callback,quality);
  }
}

export default Canvas;
