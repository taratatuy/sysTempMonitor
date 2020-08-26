const fs = require('fs');
const eventEmitter = require('events').EventEmitter;

const Structure = require('./structure.js');
const channel = new eventEmitter();

const pathToTemp = '/sys/class/thermal/thermal_zone0/temp';
const tempArray = new Structure();
let highestTemp = [0, undefined];
let lowestTemp = [Infinity, undefined];

const GMT = +0;

function getTemp() {
  let currentTemp =
    parseInt(fs.readFileSync(pathToTemp, { encoding: 'UTF8' })) / 1000;

  const date = new Date();
  date.setHours(date.getHours() + GMT);

  tempArray.add([currentTemp, date]);

  if (tempArray.length > 28800) {
    tempArray.dropFirst();
  }

  if (highestTemp[0] <= currentTemp) {
    highestTemp[0] = currentTemp;
    highestTemp[1] = date;
  }

  if (lowestTemp[0] >= currentTemp) {
    lowestTemp[0] = currentTemp;
    lowestTemp[1] = date;
  }

  channel.emit('tempChange', [currentTemp, date, highestTemp, lowestTemp]);

  setTimeout(() => {
    getTemp();
  }, 3000);
}

channel.on('getArray', () => {
  channel.emit('sendArray', tempArray.toArray());
});

getTemp();

module.exports = { channel };
