class StructElement {
  constructor(data) {
    this.next = null;
    this.data = data;
  }

  setNext(next) {
    this.next = next;
  }
}

class Structure {
  constructor() {
    this.start = null;
    this.current = this.start;
    this.prev = null;
    this.length = 0;
  }

  add(newElementData) {
    this.prev = this.current;
    this.current = new StructElement(newElementData);
    if (this.prev) this.prev.next = this.current;
    if (!this.start) this.start = this.current;
    this.length++;
  }

  dropFirst() {
    this.start = this.start.next;
    this.length--;
  }

  print() {
    let output = '[ ';
    let currentIndex = this.start;
    while (currentIndex) {
      output += `${currentIndex.data}, `;
      currentIndex = currentIndex.next;
    }
    output += ']';
    return output;
  }
}

module.exports = Structure;
