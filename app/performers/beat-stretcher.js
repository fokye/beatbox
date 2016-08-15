import Performer from './performer';

class BeatStretcher extends Performer {

  constructor(wrappedPerformer, {beatsToStretch = 1} = {}) {
    super({instrument: wrappedPerformer.instrument});
    Object.assign(this, {
      beatsToStretch,
      wrappedPerformer,
      stretchedBeats: beatsToStretch
    });
  }

  perform(measure, beat) {
    if(this.stretchedBeats >= this.beatsToStretch) {
      this.wrappedPerformer.perform(...arguments);
      this.stretchedBeats = 0;
    } else {
      this.stretchedBeats++;
    }
  }

  start() {
    this.wrappedPerformer.start(...arguments);
  }

  stop() {
    this.wrappedPerformer.stop(...arguments);
  }

}

export default BeatStretcher;
