import p5 from "p5";
import Paddle from "./Paddle";
import Puck from "./Puck";

export default function Pong(p:p5){
    
    let puck: Puck;

    let paddleRight: Paddle;
    let paddleLeft: Paddle;

    p.setup = ()=>{
        p.createCanvas(p.windowWidth, p.windowHeight)
        puck = new Puck(p)
        paddleLeft = new Paddle(p, true);
        paddleRight = new Paddle(p, false)
    }
    p.draw = ()=>{
        p.background(0)

        paddleLeft.show()
        paddleRight.show()
        paddleLeft.update()
        paddleRight.update()

        puck.checkPaddle(paddleRight)
        puck.checkPaddle(paddleLeft)
        puck.update()
        puck.edges()
        puck.show()

        p.fill(255)
        p.textSize(32);
        p.text(puck.leftScore, 32, 40);
        p.text(puck.rightScore, p.width-64, 40)
    }
    p.keyPressed = ()=>{
        const steps = 10;
        if (p.key == "w") {
            paddleLeft.move(-steps);
        }else if (p.key == "s") {
            paddleLeft.move(steps);
        }
        if (p.keyCode == p.UP_ARROW) {
            paddleRight.move(-steps);
        }else if (p.keyCode == p.DOWN_ARROW) {
            paddleRight.move(steps);
        }
    }
    p.keyReleased = ()=>{
        paddleLeft.move(0)
        paddleRight.move(0)
    }
}