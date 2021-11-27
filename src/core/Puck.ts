import p5 from "p5";
import Paddle from "./Paddle";

export default class Puck{

    p: p5
    pos: p5.Vector
    initialVelocity: p5.Vector;
    xSpeed!:number;
    ySpeed!:number;
    r:number = 12;
    angle!: number;

    leftScore: number = 0;
    rightScore: number = 0;
    constructor(p: p5){
        this.p = p
        this.pos = this.p.createVector(p.width/2, p.height/2)
        this.initialVelocity = this.p.createVector(5,this.p.random(0,5))
        
        this.reset()

    }
    show():void{
        this.p.fill(255);
        this.p.ellipse(this.pos.x,this.pos.y, this.r*2, this.r*2)
    }
    update():void{
        this.pos.x = this.pos.x + this.xSpeed
        this.pos.y = this.pos.y + this.ySpeed
    }
    edges():void{
        if (this.pos.y < 0 || this.pos.y > this.p.height) {
            this.ySpeed *= -1;
        }
        if (this.pos.x - this.r > this.p.width) {
            this.leftScore++
            this.reset();
        }
        if (this.pos.x + this.r < 0) {
            this.rightScore++
            this.reset();
        }
    }
    reset(){
        this.pos.set(this.p.width/2, this.p.height/2)
        this.angle = this.p.random(-this.p.PI/4, this.p.PI/4);
        this.xSpeed = 5* this.p.cos(this.angle)
        this.ySpeed = 5* this.p.sin(this.angle)

        if (this.p.random(1) < 0.5) {
            this.xSpeed *= -1
        }
    }
    checkPaddle(pad: Paddle){
        if (this.pos.y < pad.pos.y + pad.h/2 && this.pos.y > pad.pos.y - pad.h/2) {
            if (pad.isLeft) {
                if ( this.pos.x - this.r < pad.pos.x + pad.w) {
                    if (this.pos.x > pad.pos.x) {
                        let rad = this.p.radians(45)
                        let diff = this.pos.y - (pad.pos.y - pad.h/2);
                        let angle = this.p.map(diff, 0, pad.h, -rad, rad)
                        this.xSpeed = 5*this.p.cos(angle)
                        this.ySpeed = 5*this.p.sin(angle)

                        this.pos.x = pad.pos.x + pad.w/2 + this.r;
                        // this.xSpeed *= -1
                    }
                }
            }else {
                if (this.pos.x + this.r > pad.pos.x - pad.w) {
                    if (this.pos.x < pad.pos.x) {
                        let rad = this.p.radians(135)
                        let diff = this.pos.y - (pad.pos.y - pad.h/2);
                        let angle = this.p.map(diff, 0, pad.h, -rad, rad)
                        this.xSpeed = 5*this.p.cos(angle)
                        this.ySpeed = 5*this.p.sin(angle)
                        this.pos.x = pad.pos.x - pad.w/2 - this.r
                        // this.xSpeed *= -1
                    }
                }
            }
        }
    }
}