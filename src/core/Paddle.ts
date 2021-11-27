import p5 from "p5";

export default class Paddle{
    
    pos: p5.Vector;
    w: number = 20;
    h: number = 100;

    p: p5;

    yChange: number = 0;

    isLeft: boolean;

    constructor(p: p5, left: boolean){
        this.p = p
        this.isLeft = left;
        if (left) {
            this.pos = this.p.createVector( this.w, this.p.height/2 )
        }else{
            this.pos = this.p.createVector( this.p.width - this.w, this.p.height/2)
        }
    }
    move(steps: number):void{
        this.yChange = steps
    }
    show(){
        this.p.fill(255)
        this.p.rectMode(this.p.CENTER)
        this.p.rect(this.pos.x, this.pos.y, this.w, this.h);
    }
    update(){
        this.pos.y += this.yChange
        this.pos.y = this.p.constrain(this.pos.y, this.h/2, this.p.height - this.h/2)
    }
}