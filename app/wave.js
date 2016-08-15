class Wave {

  constructor(data) {
    this.real = new Float32Array(data[0].length);
    this.imag = new Float32Array(data[1].length);
    for(let i = 0; i < data[0].length; i++) {
      this.real[i] = data[0][i];
    }
    for(let i = 0; i < data[1].length; i++) {
      this.imag[i] = data[1][i];
    }
  }

  generate(audioContext) {
    return audioContext.createPeriodicWave(this.real, this.imag);
  }

}

export default Wave;
