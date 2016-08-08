class Performer {

  constructor({instrument}) {
    Object.assign(this, {instrument});
  }

  perform(measure, beat) {
    // Override this to do your own thing.
  }

  connect(target) {
    this.instrument.connect(target);
  }

  start() {
    this.instrument.start();
  }

  stop() {
    this.instrument.stop();
  }

}

export default Performer;
