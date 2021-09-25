import React from 'react';
import ReactDOM from 'react-dom';
import './styles/global.css';
import App from './App';
import Header from './components/Header'
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
function Canvas(){
  
  var c= document.querySelector('.avaliation');
  var ctx=c.getContext('2d');
  var txt = document.querySelector('.popularity')
  var z = 20
  ctx.beginPath();    
  ctx.arc(77,32,25,0,2*Math.PI);
  ctx.fillStyle="transparent";
  var grd = ctx.createLinearGradient(0, 0, 200, 0);
  grd.addColorStop(0.2, "#038eb1");
  grd.addColorStop(0.1, "#040333");
  ctx.strokeStyle = grd
  ctx.lineWidth = 5;
  ctx.fill();
  ctx.stroke();
  
  console.log(txt.textContent)
  ctx.beginPath();    
  ctx.font="25px Lato";
  ctx.fillStyle="white";
  ctx.fillText(`${txt.id}`,62,42);
}
function Add(){
  var card = document.querySelector('.card')
  var cards = document.querySelector('.cards')
  console.log(cards)
}
Canvas()
Add()

