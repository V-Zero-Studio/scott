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
const INTERVAL_ACTIVITY_LOG = 1000

let _bufferActivities = new Buffer(BUFFER_SIZE)
let _distMove = 0
let _xPrev, _yPrev
let _distWheel = 0
let _cntMouseDown = 0
let _cntKeyDown = 0

const onMouseDown = (e) => {
  _cntMouseDown++
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
}

const onKeyDown = (e) => {
  _cntKeyDown++
}

const logActivities = () => {
  let entry = {
    timeStamp: Date.now(),
    distMove: Math.floor(_distMove),
    distWheel: _distWheel,
    cntMouseDown: _cntMouseDown,
    cntKeyDown: _cntKeyDown
  }
  
  console.log(entry)
  _bufferActivities.add(entry)
  _distMove = 0
  _distWheel = 0
  _cntMouseDown = 0
  _cntKeyDown = 0

  setTimeout(() => {
    logActivities()
  }, INTERVAL_ACTIVITY_LOG);
}

(function () {
  document.addEventListener("mousedown", onMouseDown)
  document.addEventListener("mousemove", onMouseMove)
  document.addEventListener("mouseup", onMouseUp)
  document.addEventListener("wheel", onWheel)
  document.addEventListener("keydown", onKeyDown)

  logActivities()

})();
