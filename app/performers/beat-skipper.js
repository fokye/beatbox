import Performer from './performer';

class BeatSkipper extends Performer {

  constructor(wrappedPerformer, {beatsToSkip = 1} = {}) {
    super({instrument: wrappedPerformer.instrument});
    Object.assign(this, {
      beatsToSkip,
      wrappedPerformer,
      skippedBeats: beatsToSkip
    });
  }

  perform(measure, beat) {
    if(this.skippedBeats >= this.beatsToSkip) {
      this.wrappedPerformer.perform(...arguments);
      this.skippedBeats = 0;
    } else {
      this.skippedBeats++;
    }
  }

  start() {
    this.wrappedPerformer.start(...arguments);
  }

  stop() {
    this.wrappedPerformer.stop(...arguments);
  }

}

export default BeatSkipper;
