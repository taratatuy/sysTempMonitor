class Stat {
  constructor(selector) {
    this.elementTemp = document.querySelector(selector + ' .value');
    this.elementDate = document.querySelector(selector + ' .date');
  }

  update(newTemp, newDate = null, newTime = null) {
    this.elementTemp.textContent = newTemp;
    if (newDate && newTime)
      this.elementDate.textContent = `(${newTime} ${newDate})`;
  }
}
