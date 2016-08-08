class Instrument {

  constructor({audioContext, oscillatorType = 'sine', volume = 100, wave}) {
    Object.assign(this, {
      audioContext,
      oscillatorType,
      oscillators: [],
      volume,
      wave,
      gain: audioContext.createGain(),
      patch: audioContext.createChannelMerger(6)
    });
    for(let i = 0; i < 6; i++) {
      let oscillator = audioContext.createOscillator();
      let gain = audioContext.createGain();
      gain.gain.value = volume;
      oscillator.gain = gain;
      if(wave) {
        oscillator.periodicWave = wave.generate(audioContext);
      } else {
        oscillator.type = oscillatorType;
      }
      oscillator.connect(gain);
      gain.connect(this.patch);
      this.oscillators.push(oscillator);
    }
    this.patch.connect(this.gain);
  }

  connect(target) {
    this.gain.connect(target);
  }

  set notes(notes = []) {
    for(let i = 0; i < this.oscillators.length; i++) {
      let note = notes[i];
      let oscillator = this.oscillators[i];
      if(note) {
        oscillator.gain.gain.value = this.volume;
        oscillator.frequency.value = note.frequency;
      } else {
        oscillator.gain.gain.value = 0;
      }
    }
  }

  start() {
    for(let oscillator of this.oscillators) {
      oscillator.start();
    }
  }

  stop() {
    for(let oscillator of this.oscillators) {
      oscillator.stop();
    }
  }

}

export default Instrument;
