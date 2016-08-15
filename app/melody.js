import NoteLibrary from './note-library';

class Melody {

  constructor({name, baseNote, chords}) {
    Object.assign(this, {name, chords});
    this.baseNote = NoteLibrary.find(baseNote);
  }

  set baseNote(note) {
    const {chords} = this;
    this.sequence = chords.map((chord) => chord.map((offset) => NoteLibrary.transpose(note, offset)));
  }

}

export default Melody;
