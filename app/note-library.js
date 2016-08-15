import NOTES from './data/notes';

const constrain = function(low, n, high) {
  return Math.max(low, Math.min(n, high));
};

class NoteLibrary {

  static get all() {
    return NOTES;
  }

  static find(notation) {
    const pattern = /^([A-G][♯♭]?)(\d+)$/g;
    const name = notation.replace(pattern, '$1');
    const octave = parseInt(notation.replace(pattern, '$2'));
    return this.all.find((note) => note.octave === octave && note.names.includes(name));
  }

  static transpose(baseNote, offset) {
    const {all} = this;
    return all[constrain(0, all.indexOf(baseNote) + offset, all.length - 1)];
  }

}

export default NoteLibrary;
