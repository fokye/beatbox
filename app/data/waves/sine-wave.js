class SineWave {

  constructor() {
    this.real = new Float32Array(2);
    this.imag = new Float32Array(2);
    this.real[0] = 0;
    this.imag[0] = 0;
    this.real[1] = 1;
    this.imag[1] = 0;
  }

  generate(audioContext) {
    return audioContext.createPeriodicWave(this.real, this.imag);
  }

}

export default SineWave;
