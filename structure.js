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
//    this.prev = null;
    this.length = 0;
  }

  add(newElementData) {
    let prev = this.current;
    this.current = new StructElement(newElementData);
    if (prev) prev.next = this.current;
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

  toArray() {
    let output = [[], []];
    let currentIndex = this.start;
    while (currentIndex) {
      output[0].push( currentIndex.data[0] )
      output[1].push( currentIndex.data[1] )
      currentIndex = currentIndex.next;
    }
    return output;
  }
}

module.exports = Structure;
