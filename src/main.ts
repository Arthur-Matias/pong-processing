import p5 from 'p5'
import './style.css'
import pong from './core/Pong'
window.onload = ()=>{
  new p5(pong)
}