import Performer from './performer';

class MelodyPerformer extends Performer {

  constructor({melody, repeatMode = 'restart', repeatCount = 1}) {
    super(...arguments);
    Object.assign(this, {
      melody,
      melodyIndex: 0,
      repeatCount,
      repeatMode,
      direction: 1,
      iterationCount: 1
    });
  }

  get currentNotes() {
    if(this.isFinished) {
      return [];
    }
    return this.melody.sequence[this.melodyIndex];
  }

  get isAtStart() {
    return this.melodyIndex <= 0;
  }

  get isAtEnd() {
    return (this.melody.sequence.length - 1) <= this.melodyIndex;
  }

  get isFinished() {
    return this.repeatCount < this.iterationCount;
  }

  get isForward() {
    return 0 < this.direction;
  }

  get isBackward() {
    return this.direction < 0;
  }

  get melodyIndexOffset() {
    return this.direction;
  }

  nextStep() {
    if(this.isBackward && this.isAtStart) {
      this.iterationCount++;// We just completed an iteration.
      this.direction = 1;// Let's go forward again.
    } else if(this.isForward && this.isAtEnd) {
      this.iterationCount++;// We just completed an iteration.
      if(this.repeatMode === 'reverse') {
        this.direction = -1;// Let's go backwards.
      }
      if(this.repeatMode === 'restart') {
        this.melodyIndex = -1;// Let's go back to the beginning.
      }
    }
    this.melodyIndex += this.direction;
  }

  perform(measure, beat) {
    this.instrument.notes = this.currentNotes;
    this.nextStep();
  }

}

export default MelodyPerformer;
