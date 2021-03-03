const fs = require('fs');
const eventEmitter = require('events').EventEmitter;

const Structure = require('./Structure.js');

const tempListener = new eventEmitter();

const tempArray24h = new Structure(28800); //24 hours
const tempArray30m = new Structure(600); //3sec * 20 * 30 = 30min

const pathToTemp = '/sys/class/thermal/thermal_zone0/temp';

const highestTemp = { temp: 0, date: undefined, time: undefined };
const lowestTemp = { temp: Infinity, date: undefined, time: undefined };

function getTemp() {
  let currentTemp =
    Math.round(
      parseInt(fs.readFileSync(pathToTemp, { encoding: 'UTF8' })) / 100
    ) / 10;

  const timestamp = formateDate(new Date());

  tempArray24h.add(timestamp.time, currentTemp);
  tempArray30m.add(timestamp.time, currentTemp);

  if (highestTemp.temp <= currentTemp) {
    highestTemp.temp = currentTemp;
    highestTemp.date = timestamp.date;
    highestTemp.time = timestamp.time;
  }

  if (lowestTemp.temp >= currentTemp) {
    lowestTemp.temp = currentTemp;
    lowestTemp.date = timestamp.date;
    lowestTemp.time = timestamp.time;
  }

  tempListener.emit('tempChange', {
    newTemp: currentTemp,
    newDate: timestamp,
    highestTemp,
    lowestTemp,
    avg30m: getAvg(tempArray30m),
  });

  setTimeout(() => {
    getTemp();
  }, 3000);
}

tempListener.on('getArray', () => {
  tempListener.emit('sendArray', {
    h24: tempArray24h.toObj(),
    m30: tempArray30m.toObj(),
  });
});

function getAvg(struct) {
  let currentIndex = struct.start;
  let avg = 0;
  while (currentIndex) {
    avg += +currentIndex.data[1];
    currentIndex = currentIndex.next;
  }
  return Math.floor((avg / struct.length) * 10) / 10;
}

function formateDate(date) {
  const str = date.toLocaleDateString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  });
  return {
    time: str.match(/\d+:\d+(?=:)/)[0],
    date: str.match(/\d+\/\d+\/\d+/)[0],
  };
}

getTemp();

module.exports = { tempListener };
