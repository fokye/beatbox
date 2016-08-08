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
    }),
    new MelodyPerformer({
      instrument: new Instrument({
        audioContext,
        oscillatorType: 'sine'
      }),
      melody: new Melody({
        name: 'phryg1an',
        baseNote: NOTES.find(({octave, names}) => octave === 2 && names.includes('F')),
        chords: [[0, 7], [12], [24, 31], [36, 41, 43], [29], [36, 43], [41], [7], [19]]
      }),
      repeatCount: Infinity
    })
  ],
  tempo: 120,
  timeSignature: 4
});

performance.start();
