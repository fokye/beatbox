import NOTES from './data/notes';

class Melody {

  constructor({name, baseNote, chords}) {
    Object.assign(this, {name, chords});
    this.baseNote = baseNote;
  }

  set baseNote(note) {
    let baseNoteIndex = NOTES.indexOf(note);
    this.sequence = this.chords.map((chord) => chord.map((offset) => NOTES[baseNoteIndex + offset]).filter(Boolean));
  }

}

export default Melody;
