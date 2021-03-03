class ChartBuilder {
  constructor(title, selector) {
    const canvas = document.querySelector(selector).getContext('2d');

    this.currentConfig = this._getConfig();
    this.currentConfig.options.title.text = title;

    this.chart = new Chart(canvas, this.currentConfig);
  }

  load(times, temps) {
    this.currentConfig.data.labels = times;
    this.currentConfig.data.datasets[0].data = temps;
    this.chart.update();
  }

  update(time, temp) {
    this.currentConfig.data.labels.push(time);
    this.currentConfig.data.datasets[0].data.push(temp);
    this.chart.update();
  }

  _getConfig() {
    return {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: '# temperatire',
            data: [],
            backgroundColor: ['rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)'],
            borderWidth: 1,
            pointRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          fontSize: 18,
          text: '',
        },
        tooltips: {
          enabled: false,
        },
        animation: {
          duration: 0, // general animation time
        },
        hover: {
          animationDuration: 0, // duration of animations when hovering an item
        },
        responsiveAnimationDuration: 0, // animation duration after a resize
        elements: {
          line: {
            cubicInterpolationMode: 'monotone',
            tension: 0, // disables bezier curves
          },
        },
        // showLines: false, // disable lines for all datasets
        scales: {
          xAxes: [
            {
              ticks: {
                autoSkip: true,
                autoSkipPadding: 25,
                maxRotation: 0,
              },
            },
          ],
          yAxes: [
            {
              caleLabel: {
                display: true,
                labelString: 'value',
              },
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    };
  }
}
