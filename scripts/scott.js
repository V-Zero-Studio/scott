class Buffer {
  constructor(size) {
    this.buffer = [];
    this.index = 0;
    this.size = size;
  }

  add(element) {
    if (this.index < this.size) {
      this.buffer.push(element);
      this.index += 1;
    } else {
      this.buffer[this.index % this.buffer.length] = element;
      this.index = (this.index + 1) % this.buffer.length;
    }
  }

  at(index) {
    return this.buffer[index];
  }

  all() {
    return this.buffer
  }
}

const BUFFER_SIZE = 128

let _bufferMouseMove = new Buffer(BUFFER_SIZE)

const onMouseMove = (e) => {
    const entry = {
        timeStamp: e.timeStamp,
        x: e.clientX,
        y: e.clientY
    }
    _bufferMouseMove.add(entry)
}

const onMouseUp = (e) => {
    console.log(_bufferMouseMove.all())
}

(function () {
  document.addEventListener("mousemove", onMouseMove)
  document.addEventListener("mouseup", onMouseUp)
})();
