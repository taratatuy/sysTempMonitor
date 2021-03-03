class StructElement {
  constructor(...args) {
    this.next = null;
    this.data = [...args];
  }

  setNext(next) {
    this.next = next;
  }
}

class Structure {
  constructor(limit = null) {
    this.start = null;
    this.current = this.start;
    this.length = 0;
    this.limit = limit;
  }

  add(time, temp) {
    let prev = this.current;
    this.current = new StructElement(time, temp);
    if (prev) prev.next = this.current;
    if (!this.start) this.start = this.current;
    this.length++;

    if (this.limit) {
      if (this.length > this.limit) this._dropFirst();
    }
  }

  _dropFirst() {
    this.start = this.start.next;
    this.length--;
  }

  toObj() {
    const outputTemps = [];
    const outputTimes = [];
    let currentIndex = this.start;
    while (currentIndex) {
      outputTimes.push(currentIndex.data[0]);
      outputTemps.push(currentIndex.data[1]);
      currentIndex = currentIndex.next;
    }
    return { temps: outputTemps, times: outputTimes };
  }
}

module.exports = Structure;
