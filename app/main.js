import AudioContext from './audio-context';
import Instrument from './instrument';
import Melody from './melody';
import MelodyPerformer from './performers/melody-performer';
import Performance from './performance';

import {sineWave} from './data/waves';
import {melodyA, melodyB} from './data/melodies';

const audioContext = new AudioContext();

const performance = new Performance({
  audioContext,
  performers: [
    {repeatMode: 'restart', baseNote: 'D3', chords: melodyA, volume: 100},
    {repeatMode: 'reverse', baseNote: 'G2', chords: melodyA, volume: 100},
    {repeatMode: 'reverse', baseNote: 'G2', chords: melodyB, volume: 1}
  ].map(({repeatMode, baseNote, chords, volume}) => new MelodyPerformer({
    instrument: new Instrument({audioContext, volume, wave: sineWave}),
    melody: new Melody({baseNote, chords}),
    repeatMode,
    repeatCount: Infinity
  })),
  tempo: 180,
  timeSignature: 4
});

performance.start();
