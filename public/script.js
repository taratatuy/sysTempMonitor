function init() {
  const chart24h = new ChartBuilder('24h graph', '.dayChart');
  const chart30m = new ChartBuilder('30min graph', '.halfHourChart');

  const highestTemp = new Stat('.info__highest');
  const lowestTemp = new Stat('.info__lowest');
  const currentTemp = new Stat('.info__current');
  const avgTemp = new Stat('.info__avg');

  myIO = io.connect(window.location.host);

  myIO.on('load', (data) => {
    chart24h.load(data.h24.times, data.h24.temps);
    chart30m.load(data.m30.times, data.m30.temps);
  });

  myIO.on('update', (data) => {
    chart24h.update(data.newDate.time, data.newTemp);
    chart30m.update(data.newDate.time, data.newTemp);
    highestTemp.update(
      data.highestTemp.temp,
      data.highestTemp.date,
      data.highestTemp.time
    );
    lowestTemp.update(
      data.lowestTemp.temp,
      data.lowestTemp.date,
      data.lowestTemp.time
    );
    currentTemp.update(data.newTemp);
    avgTemp.update(data.avg30m);
  });
}

init();
