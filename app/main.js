import AudioContext from './audio-context';
import BeatSkipper from './performers/beat-skipper';
import MelodyPerformer from './performers/melody-performer';
import Performance from './performance';
import Melody from './melody';
import Instrument from './instrument';

import NOTES from './data/notes';

import {phrygian, dorian} from './data/modes';
import {SineWave} from './data/waves';
import {melodyA} from './data/melodies';

const audioContext = new AudioContext();

const performance = new Performance({
  audioContext,
  performers: [
    new MelodyPerformer({
      instrument: new Instrument({
        audioContext,
        oscillatorType: 'square'
      }),
      melody: new Melody({
        name: 'phryg1an',
        baseNote: NOTES.find(({octave, names}) => octave === 2 && names.includes('F')),
        chords: melodyA
      }),
      repeatCount: Infinity
    })
  ],
  tempo: 120,
  timeSignature: 4
});

performance.start();
