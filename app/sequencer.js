class Sequencer {

  constructor({tempo = 120, timeSignature = 4} = {}) {
    Object.assign(this, {
      tempo,
      timeSignature,
      beat: 0,
      measure: 0,
      isStarted: false,
      callbacks: []
    });
  }

  get beatsPerMinute() {
    return this.tempo * 2;
  }

  get beatsPerSecond() {
    return this.beatsPerMinute / 60;
  }

  get beatsPerMillisecond() {
    return this.beatsPerSecond / 1000;
  }

  get stepDelay() {
    return 1 / this.beatsPerMillisecond;
  }

  register(callback) {
    this.callbacks.push(callback);
  }

  start() {
    this.isStarted = true;
    for(let callback of this.callbacks) {
      callback.call({}, 'start');
    }
    this.step();
  }

  step() {
    if(!this.isStarted) {
      return;
    }
    for(let callback of this.callbacks) {
      callback.call({}, 'step', {
        measure: this.measure,
        beat: this.beat
      });
    }
    if(this.beat >= (this.timeSignature - 1)) {
      this.beat = 0;
      this.measure++;
    } else {
      this.beat++;
    }
    this.stepTimeout = setTimeout(::this.step, this.stepDelay);
  }

  stop() {
    this.isStarted = false;
    if(this.stepTimeout) {
      clearTimeout(this.stepTimeout);
    }
    for(let callback of this.callbacks) {
      callback.call({}, 'stop');
    }
  }

}

export default Sequencer;
