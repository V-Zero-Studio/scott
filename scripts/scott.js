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

  last() {
    return this.buffer[this.buffer.length - 1]
  }
}

const BUFFER_SIZE = 128
const INTERVAL_MOUSE = 1000

let _bufferMouseMove = new Buffer(BUFFER_SIZE)
let _distMove = 0
let _xPrev, _yPrev
let _distWheel = 0

const onMouseDown = (e) => {
}

const onMouseMove = (e) => {
  if (_xPrev != undefined && _yPrev != undefined) {
    let delta = Math.sqrt(Math.pow(e.clientX - _xPrev, 2) + Math.pow(e.clientY - _yPrev, 2))

    _distMove += delta
  }

  _xPrev = e.clientX
  _yPrev = e.clientY
}

const onMouseUp = (e) => {
}

const onWheel = (e) => {
  _distWheel += Math.abs(e.wheelDelta)
  // console.log("wheel", _distWheel)
}

const logMouseMoveActivities = () => {
  let entry = {
    timeStamp: Date.now(),
    distMove: _distMove
  }
  // console.log(entry)
  _bufferMouseMove.add(entry)
  _distMove = 0

  setTimeout(() => {
    logMouseMoveActivities()
  }, INTERVAL_MOUSE);
}

(function () {
  document.addEventListener("mousedown", onMouseDown)
  document.addEventListener("mousemove", onMouseMove)
  document.addEventListener("mouseup", onMouseUp)
  document.addEventListener("wheel", onWheel)

  logMouseMoveActivities()

})();
