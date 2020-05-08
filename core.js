const fs = require('fs');
const eventEmitter = require( 'events' ).EventEmitter;

const Structure = require('./structure.js')
const channel = new eventEmitter(); 

const pathToTemp = '/sys/class/thermal/thermal_zone0/temp'
const tempArray = new Structure();
let highestTemp = [0, undefined];
let lowestTemp = [Infinity, undefined];

const GMT = +3;

function getTemp() {
  let currentTemp = parseInt(fs.readFileSync(pathToTemp, { encoding: 'UTF8' })) / 1000

  tempArray.add(currentTemp);

  if ( tempArray.length > 28800 ) { 
    tempArray.dropFirst(); 
  }

  if ( highestTemp[0] <= currentTemp ) { 
    highestTemp[0] = currentTemp;
    const date = new Date();
    date.setHours( date.getHours() + GMT );
    highestTemp[1] = date;
  }

  if ( lowestTemp[0] >= currentTemp ) { 
    lowestTemp[0] = currentTemp;
    const date = new Date();
    date.setHours( date.getHours() + GMT );
    lowestTemp[1] = date;
  }

  channel.emit('tempChange', tempArray)

//  console.log(tempArray.print());
//  console.log(highestTemp);
//  console.log(lowestTemp);
  setTimeout(() => { getTemp() }, 3000)
}

getTemp();

module.exports = { channel }
